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

function App() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState("");
  const [selectedRaceIndex, setSelectedRaceIndex] = React.useState(0);
  const [selectedDrivers, setSelectedDrivers] = React.useState([]);
  const [selectedTeam, setSelectedTeam] = React.useState("");

  React.useEffect(() => {
    fetch("./recommendations.json")
      .then((res) => {
        if (!res.ok) throw new Error("Impossibile leggere recommendations.json");
        return res.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <main className="container"><div className="card">Errore: {error}</div></main>;
  if (!data) return <main className="container"><div className="card">Caricamento risultati...</div></main>;

  const races = data.upcoming_races_2026 || [];
  const selectedRace = races[selectedRaceIndex] || races[0];
  const driverNames = Object.keys(data.driver_values);
  const teamNames = Object.keys(data.constructor_values);

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

  const selectedDriverCost = selectedDrivers.reduce(
    (sum, name) => sum + data.driver_values[name].price,
    0
  );
  const selectedTeamCost = selectedTeam ? data.constructor_values[selectedTeam].price : 0;
  const totalCost = selectedDriverCost + selectedTeamCost;
  const budgetLeft = (data.config?.budget || 100) - totalCost;

  function globalNormDriver(name) {
    const values = Object.values(data.driver_values).map((d) => d.score);
    const min = Math.min(...values);
    const max = Math.max(...values);
    if (max === min) return 0.5;
    return (data.driver_values[name].score - min) / (max - min);
  }

  function globalNormTeam(name) {
    const values = Object.values(data.constructor_values).map((d) => d.score);
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

    const avgDriverNorm = driverNorms.reduce((sum, value) => sum + value, 0) / driverNorms.length;
    const strength = 0.78 * avgDriverNorm + 0.22 * teamNorm;
    const probability = Math.round(100 / (1 + Math.exp(-5.5 * (strength - 0.5))));

    return {
      probability,
      strength,
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

        <section className="row">
          <div className="card">
            <h2>Seleziona 5 piloti</h2>
            <p className="muted">Selezionati: {selectedDrivers.length}/5</p>
            <div className="selectorGrid">
              {driverNames.map((name) => {
                const checked = selectedDrivers.includes(name);
                const disabled = !checked && selectedDrivers.length >= 5;
                return (
                  <label key={name} className={`chip ${checked ? "chipOn" : ""} ${disabled ? "chipDisabled" : ""}`}>
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
            <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} className="select">
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
            {budgetLeft < 0 && <p className="warning">Sei oltre il budget di {Math.abs(budgetLeft).toFixed(1)}M</p>}
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
              <p className="muted">Fonte modello: {prediction.source} (ultimi 10 anni con peso ai più recenti)</p>
              {!prediction.hasTrackData && (
                <p className="warning">Storico specifico pista non disponibile: uso fallback globale.</p>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
