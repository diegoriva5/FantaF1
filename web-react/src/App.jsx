import { useEffect, useMemo, useState } from "react";
import "./App.css";

const DRIVER_META = {
  Verstappen: { number: "33", countryCode: "NL" },
  Russell: { number: "63", countryCode: "GB" },
  Norris: { number: "4", countryCode: "GB" },
  Piastri: { number: "81", countryCode: "AU" },
  Antonelli: { number: "--", countryCode: "IT" },
  Leclerc: { number: "16", countryCode: "MC" },
  Alonso: { number: "14", countryCode: "ES" },
  Hamilton: { number: "44", countryCode: "GB" },
  Hadjar: { number: "--", countryCode: "FR" },
  Gasly: { number: "10", countryCode: "FR" },
  Stroll: { number: "18", countryCode: "CA" },
  Sainz: { number: "55", countryCode: "ES" },
  Lawson: { number: "30", countryCode: "NZ" },
  Albon: { number: "23", countryCode: "TH" },
  Hulkenberg: { number: "27", countryCode: "DE" },
  Bortoleto: { number: "--", countryCode: "BR" },
  Bearman: { number: "38", countryCode: "GB" },
  Ocon: { number: "31", countryCode: "FR" },
  Bottas: { number: "77", countryCode: "FI" },
  Perez: { number: "11", countryCode: "MX" },
  Colapinto: { number: "43", countryCode: "AR" },
  Lindblad: { number: "--", countryCode: "SE" },
};

const DRIVER_IMAGE_MAP = {
  Verstappen: "max_verstappen.png",
  Russell: "george_russell.png",
  Norris: "lando_norris.png",
  Piastri: "oscar_piastri.png",
  Antonelli: "kimi_antonelli.png",
  Leclerc: "charles_leclerc.png",
  Alonso: "fernando_alonso.png",
  Hamilton: "lewis_hamilton.png",
  Hadjar: "isack_hadjar.png",
  Gasly: "pierre_gasly.png",
  Stroll: "lance_stroll.png",
  Sainz: "carlos_sainz.png",
  Lawson: "liam_lawson.png",
  Albon: "alexander_albon.png",
  Hulkenberg: "nico_hulkenberg.png",
  Bortoleto: "gabriel_bortoleto.png",
  Bearman: "oliver_bearman.png",
  Ocon: "esteban_ocon.png",
  Bottas: "valtteri_bottas.png",
  Perez: "sergio_perez.png",
  Colapinto: "franco_colapinto.png",
  Lindblad: "arvid_lindblad.png",
};

function countryFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2) return "🏁";
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function driverImageUrl(driverName) {
  const localImage = DRIVER_IMAGE_MAP[driverName];
  if (localImage) {
    return `/drivers_pictures/${localImage}`;
  }
  const encoded = encodeURIComponent(driverName);
  return `https://ui-avatars.com/api/?name=${encoded}&background=111827&color=ffffff&size=256&bold=true`;
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [selectedRaceIndex, setSelectedRaceIndex] = useState(0);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    fetch("/recommendations.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Manca recommendations.json. Esegui: npm run refresh:data");
        }
        return res.json();
      })
      .then(setData)
      .catch((fetchError) => setError(fetchError.message));
  }, []);

  const driverNames = useMemo(() => (data ? Object.keys(data.driver_values) : []), [data]);
  const teamNames = useMemo(() => (data ? Object.keys(data.constructor_values) : []), [data]);

  function toggleDriver(driverName) {
    setSelectedDrivers((current) => {
      if (current.includes(driverName)) {
        return current.filter((name) => name !== driverName);
      }
      if (current.length >= 5) {
        return current;
      }
      return [...current, driverName];
    });
  }

  if (error) {
    return (
      <main className="container">
        <section className="card">Errore: {error}</section>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="container">
        <section className="card">Caricamento dati...</section>
      </main>
    );
  }

  const races = data.upcoming_races_2026 || [];
  const selectedRace = races[selectedRaceIndex] || races[0];
  const trackTeamRecommendations = data.track_team_recommendations || {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextRace = races.find((race) => new Date(race.date) >= today) || races[0];
  const nextRaceRecommendations = nextRace ? trackTeamRecommendations[nextRace.name] : null;
  const recommendedTeams = nextRaceRecommendations?.teams || [];

  const selectedDriverCost = selectedDrivers.reduce(
    (sum, name) => sum + data.driver_values[name].price,
    0,
  );
  const selectedTeamCost = selectedTeam ? data.constructor_values[selectedTeam].price : 0;
  const totalCost = selectedDriverCost + selectedTeamCost;
  const budgetLeft = (data.config?.budget || 100) - totalCost;

  function globalNormDriver(name) {
    const values = Object.values(data.driver_values).map((item) => item.score);
    const min = Math.min(...values);
    const max = Math.max(...values);
    if (max === min) return 0.5;
    return (data.driver_values[name].score - min) / (max - min);
  }

  function globalNormTeam(name) {
    const values = Object.values(data.constructor_values).map((item) => item.score);
    const min = Math.min(...values);
    const max = Math.max(...values);
    if (max === min) return 0.5;
    return (data.constructor_values[name].score - min) / (max - min);
  }

  function computeProbability() {
    if (selectedDrivers.length !== 5 || !selectedTeam || !selectedRace) return null;

    const trackRef = selectedRace.circuit_ref;
    const track = trackRef ? data.track_profiles?.[trackRef] : null;

    const driverNorms = selectedDrivers.map((driverName) => {
      if (track && track.drivers?.[driverName]) {
        return track.drivers[driverName].normalized;
      }
      return globalNormDriver(driverName);
    });

    const teamNorm =
      track && track.constructors?.[selectedTeam]
        ? track.constructors[selectedTeam].normalized
        : globalNormTeam(selectedTeam);

    const avgDriverNorm =
      driverNorms.reduce((sum, currentValue) => sum + currentValue, 0) / driverNorms.length;
    const strength = 0.78 * avgDriverNorm + 0.22 * teamNorm;
    const probability = Math.round(100 / (1 + Math.exp(-5.5 * (strength - 0.5))));

    return {
      probability,
      source: track ? "storico pista" : "fallback globale",
      circuitName: track ? track.circuit_name : "Pista non mappata",
      hasTrackData: Boolean(track),
    };
  }

  const prediction = computeProbability();

  return (
    <>
      <header className="topbar">FantaF1</header>
      <main className="container">
        <section className="card">
          <h2>Prossime gare</h2>
          <div className="raceGrid">
            {races.map((race, index) => (
              <button
                key={`${race.round}-${race.name}`}
                className={`raceCard ${index === selectedRaceIndex ? "active" : ""}`}
                onClick={() => setSelectedRaceIndex(index)}
              >
                <div className="raceTop">
                  <span>{countryFlag(race.country_code)}</span>
                  <span>Round {race.round}</span>
                </div>
                <strong>{race.name}</strong>
                <div className="muted">{formatDate(race.date)}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="recommendedHeader">
            <h2>3 team consigliati</h2>
            {nextRace && (
              <div className="muted">
                {countryFlag(nextRace.country_code)} Round {nextRace.round} · {nextRace.name} · {formatDate(nextRace.date)}
              </div>
            )}
          </div>

          {recommendedTeams.length === 0 && (
            <p className="muted">Nessuna raccomandazione disponibile per la prossima gara.</p>
          )}

          {recommendedTeams.length > 0 && (
            <div className="top3Cards">
              {recommendedTeams.map((team, index) => (
                <article key={`top3-${index}-${team.constructor}`} className="top3TeamCard">
                  <div className="top3TeamHeader">
                    <div className="top3Title">
                      #{index + 1} {team.constructor}
                    </div>
                    <div className="top3Probability">{team.probability}%</div>
                  </div>

                  <div className="top3Meta muted">
                    Costo: {team.total_price}M · Budget residuo: {team.budget_left}M
                  </div>

                  <div className="top3DriverGrid">
                    {team.drivers.map((driverName) => {
                      const meta = DRIVER_META[driverName] || { number: "--", countryCode: "" };
                      return (
                        <article key={`driver-${index}-${driverName}`} className="f1DriverCard">
                          <div className="f1DriverTop">
                            <span className="f1DriverNumber">#{meta.number}</span>
                            <span className="f1DriverFlag">{countryFlag(meta.countryCode)}</span>
                          </div>
                          <img
                            src={driverImageUrl(driverName)}
                            alt={driverName}
                            className="f1DriverImage"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driverName)}&background=111827&color=ffffff&size=256&bold=true`;
                            }}
                          />
                          <div className="f1DriverName">{driverName}</div>
                        </article>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="row">
          <div className="card">
            <h2>Seleziona 5 piloti</h2>
            <p className="muted">Selezionati: {selectedDrivers.length}/5</p>
            <div className="selectorGrid">
              {driverNames.map((name) => {
                const checked = selectedDrivers.includes(name);
                const disabled = !checked && selectedDrivers.length >= 5;
                return (
                  <label
                    key={name}
                    className={`chip ${checked ? "chipOn" : ""} ${disabled ? "chipDisabled" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleDriver(name)}
                    />
                    <span>{name}</span>
                    <small>{data.driver_values[name].price}M</small>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="card">
            <h2>Seleziona 1 team</h2>
            <select
              value={selectedTeam}
              onChange={(event) => setSelectedTeam(event.target.value)}
              className="select"
            >
              <option value="">-- scegli team --</option>
              {teamNames.map((team) => (
                <option key={team} value={team}>
                  {team} ({data.constructor_values[team].price}M)
                </option>
              ))}
            </select>

            <h3>Budget</h3>
            <p>
              <strong>Totale:</strong> {totalCost.toFixed(1)}M
            </p>
            <p>
              <strong>Residuo:</strong> {budgetLeft.toFixed(1)}M
            </p>
            {budgetLeft < 0 && (
              <p className="warning">Sei oltre il budget di {Math.abs(budgetLeft).toFixed(1)}M</p>
            )}
          </div>
        </section>

        <section className="card">
          <h2>Probabilità di successo</h2>
          {!prediction && <p className="muted">Seleziona 5 piloti e 1 team per ottenere la stima.</p>}
          {prediction && (
            <>
              <p>
                <strong>Gara:</strong> {selectedRace.name} · <strong>Pista:</strong> {prediction.circuitName}
              </p>
              <p>
                <strong>Probabilità stimata:</strong> <span className="bigScore">{prediction.probability}%</span>
              </p>
              <p className="muted">Fonte modello: {prediction.source} (ultimi 10 anni, pesi recenti più alti)</p>
              {!prediction.hasTrackData && (
                <p className="warning">Storico pista non disponibile: uso fallback globale.</p>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
