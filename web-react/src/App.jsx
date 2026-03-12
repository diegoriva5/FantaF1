import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const DRIVER_META = {
  Verstappen: { number: "3", countryCode: "NL" },
  Russell: { number: "63", countryCode: "GB" },
  Norris: { number: "1", countryCode: "GB" },
  Piastri: { number: "81", countryCode: "AU" },
  Antonelli: { number: "12", countryCode: "IT" },
  Leclerc: { number: "16", countryCode: "MC" },
  Alonso: { number: "14", countryCode: "ES" },
  Hamilton: { number: "44", countryCode: "GB" },
  Hadjar: { number: "6", countryCode: "FR" },
  Gasly: { number: "10", countryCode: "FR" },
  Stroll: { number: "18", countryCode: "CA" },
  Sainz: { number: "55", countryCode: "ES" },
  Lawson: { number: "30", countryCode: "NZ" },
  Albon: { number: "23", countryCode: "TH" },
  Hulkenberg: { number: "27", countryCode: "DE" },
  Bortoleto: { number: "5", countryCode: "BR" },
  Bearman: { number: "87", countryCode: "GB" },
  Ocon: { number: "31", countryCode: "FR" },
  Bottas: { number: "77", countryCode: "FI" },
  Perez: { number: "11", countryCode: "MX" },
  Colapinto: { number: "43", countryCode: "AR" },
  Lindblad: { number: "41", countryCode: "SE" },
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

const CIRCUIT_COUNTRY_FLAG = {
  albert_park: "AU",
  shanghai: "CN",
  suzuka: "JP",
  bahrain: "BH",
  jeddah: "SA",
  miami: "US",
  villeneuve: "CA",
  monaco: "MC",
  catalunya: "ES",
  red_bull_ring: "AT",
  silverstone: "GB",
  spa: "BE",
  hungaroring: "HU",
  zandvoort: "NL",
  monza: "IT",
  baku: "AZ",
  marina_bay: "SG",
  americas: "US",
  rodriguez: "MX",
  interlagos: "BR",
  vegas: "US",
  losail: "QA",
  yas_marina: "AE",
};

const RACE_RESULTS_URL =
  "https://raw.githubusercontent.com/toUpperCase78/formula1-datasets/master/Formula1_2026Season_RaceResults.csv";

// Maps CSV track name → image file + metadata for live 2026 data
const LIVE_TRACK_META = {
  Australia: { round: 1, date: "2026-03-08", track_image: "australia.png", country_code: "AU" },
  China: { round: 2, date: "2026-03-15", track_image: "china.png", country_code: "CN" },
  Japan: { round: 3, date: "2026-03-29", track_image: "japan.png", country_code: "JP" },
  Bahrain: { round: 4, date: "2026-04-12", track_image: "bahrain.png", country_code: "BH" },
  "Saudi Arabia": { round: 5, date: "2026-04-19", track_image: "saudi-arabia.png", country_code: "SA" },
  Miami: { round: 6, date: "2026-05-03", track_image: "miami.png", country_code: "US" },
  Canada: { round: 7, date: "2026-05-24", track_image: "canada.png", country_code: "CA" },
  Monaco: { round: 8, date: "2026-06-07", track_image: "monaco.png", country_code: "MC" },
  Spain: { round: 9, date: "2026-06-14", track_image: "barcelona.png", country_code: "ES" },
  Austria: { round: 10, date: "2026-06-28", track_image: "austria.png", country_code: "AT" },
  "Great Britain": { round: 11, date: "2026-07-05", track_image: "great-britain.png", country_code: "GB" },
  Belgium: { round: 12, date: "2026-07-19", track_image: "belgium.png", country_code: "BE" },
  Hungary: { round: 13, date: "2026-07-26", track_image: "hungary.png", country_code: "HU" },
  Netherlands: { round: 14, date: "2026-08-23", track_image: "netherlands.png", country_code: "NL" },
  Italy: { round: 15, date: "2026-09-06", track_image: "italy.png", country_code: "IT" },
  Azerbaijan: { round: 17, date: "2026-09-26", track_image: "azerbaijan.png", country_code: "AZ" },
  Singapore: { round: 18, date: "2026-10-11", track_image: "singapore.png", country_code: "SG" },
  "United States": { round: 19, date: "2026-10-25", track_image: "united-states.png", country_code: "US" },
  Mexico: { round: 20, date: "2026-10-31", track_image: "mexico.png", country_code: "MX" },
  Brazil: { round: 21, date: "2026-11-08", track_image: "brazil.png", country_code: "BR" },
  "Las Vegas": { round: 22, date: "2026-11-22", track_image: "las-vegas.png", country_code: "US" },
  Qatar: { round: 23, date: "2026-11-29", track_image: "qatar.png", country_code: "QA" },
  "Abu Dhabi": { round: 24, date: "2026-12-06", track_image: "abu-dhabi.png", country_code: "AE" },
};

// Maps full driver name from CSV → app surname key
const CSV_DRIVER_TO_KEY = {
  "George Russell": "Russell",
  "Lando Norris": "Norris",
  "Oscar Piastri": "Piastri",
  "Kimi Antonelli": "Antonelli",
  "Charles Leclerc": "Leclerc",
  "Lewis Hamilton": "Hamilton",
  "Max Verstappen": "Verstappen",
  "Isack Hadjar": "Hadjar",
  "Pierre Gasly": "Gasly",
  "Lance Stroll": "Stroll",
  "Carlos Sainz": "Sainz",
  "Liam Lawson": "Lawson",
  "Alexander Albon": "Albon",
  "Nico Hulkenberg": "Hulkenberg",
  "Gabriel Bortoleto": "Bortoleto",
  "Oliver Bearman": "Bearman",
  "Esteban Ocon": "Ocon",
  "Valtteri Bottas": "Bottas",
  "Sergio Perez": "Perez",
  "Franco Colapinto": "Colapinto",
  "Arvid Lindblad": "Lindblad",
  "Fernando Alonso": "Alonso",
};

const CSV_TEAM_TO_FANTASY = {
  Mercedes: "Mercedes",
  Ferrari: "Ferrari",
  "McLaren Mercedes": "McLaren",
  "Red Bull Racing Red Bull Ford": "RedBull",
  "Racing Bulls Red Bull Ford": "Racing Bulls",
  Audi: "Audi",
  "Alpine Mercedes": "Alpine",
  "Williams Mercedes": "Williams",
  "Aston Martin Honda": "Aston Martin",
  "Cadillac Ferrari": "Cadillac",
  "Haas Ferrari": "Haas",
};

function parseRaceCSV(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length < 4) continue;
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = (values[idx] || "").trim();
    });
    rows.push(row);
  }
  return rows;
}

function buildRaceResults(trackRows) {
  return trackRows
    .map((row) => {
      const fullName = row.Driver || "";
      const driverKey = CSV_DRIVER_TO_KEY[fullName] || fullName.split(" ").pop();
      const points = parseFloat(row.Points) || 0;
      const position = row.Position === "NC" ? null : parseInt(row.Position, 10) || null;
      const timeRetired = row["Time/Retired"] || "";
      let status = "Finished";
      if (timeRetired === "DNF") status = "DNF";
      else if (timeRetired === "DNS") status = "DNS";
      else if (timeRetired.includes("lap")) status = timeRetired;

      return {
        position,
        position_text: row.Position || "–",
        driver_surname: driverKey,
        driver_forename: fullName.split(" ").slice(0, -1).join(" "),
        constructor_name: row.Team || "",
        points,
        grid: parseInt(row["Starting Grid"], 10) || null,
        status,
      };
    })
    .sort((left, right) => {
      if (left.position === null) return 1;
      if (right.position === null) return -1;
      return left.position - right.position;
    });
}

function extractLastRace2026(rows) {
  if (rows.length === 0) return null;
  const tracks = [...new Set(rows.map((r) => r.Track).filter(Boolean))];
  if (tracks.length === 0) return null;
  const lastTrack = tracks[tracks.length - 1];
  const meta = LIVE_TRACK_META[lastTrack];
  if (!meta) return null;

  const trackRows = rows.filter((r) => r.Track === lastTrack);
  const results = buildRaceResults(trackRows);

  return {
    race_name: lastTrack + " Grand Prix",
    date: meta.date,
    year: 2026,
    round: meta.round,
    circuit_name: "",
    country_code: meta.country_code,
    track_image: meta.track_image,
    results,
  };
}

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

const CIRCUIT_REF_TO_TRACK_IMAGE = {
  albert_park: "australia.png",
  shanghai: "china.png",
  suzuka: "japan.png",
  bahrain: "bahrain.png",
  jeddah: "saudi-arabia.png",
  miami: "miami.png",
  villeneuve: "canada.png",
  monaco: "monaco.png",
  catalunya: "barcelona.png",
  red_bull_ring: "austria.png",
  silverstone: "great-britain.png",
  spa: "belgium.png",
  hungaroring: "hungary.png",
  zandvoort: "netherlands.png",
  monza: "italy.png",
  baku: "azerbaijan.png",
  marina_bay: "singapore.png",
  americas: "united-states.png",
  rodriguez: "mexico.png",
  interlagos: "brazil.png",
  vegas: "las-vegas.png",
  losail: "qatar.png",
  yas_marina: "abu-dhabi.png",
};

function raceSlug(raceName) {
  return raceName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function normalizeConstructorName(teamName) {
  return CSV_TEAM_TO_FANTASY[teamName] || teamName;
}

function formatPoints(points) {
  return Number.isInteger(points) ? String(points) : points.toFixed(1);
}

function buildLiveDriverStandings(rows) {
  const totals = new Map();

  rows.forEach((row) => {
    const fullName = row.Driver || "";
    const driverKey = CSV_DRIVER_TO_KEY[fullName] || fullName.split(" ").pop() || fullName;
    const points = parseFloat(row.Points) || 0;
    const teamName = normalizeConstructorName(row.Team || "");
    const current = totals.get(driverKey) || {
      name: driverKey,
      fullName,
      teamName,
      points: 0,
    };

    current.points += points;
    current.teamName = teamName;
    totals.set(driverKey, current);
  });

  return Array.from(totals.values()).sort(
    (left, right) => right.points - left.points || left.name.localeCompare(right.name),
  );
}

function buildLiveConstructorStandings(rows) {
  const totals = new Map();

  rows.forEach((row) => {
    const teamName = normalizeConstructorName(row.Team || "");
    const points = parseFloat(row.Points) || 0;
    totals.set(teamName, (totals.get(teamName) || 0) + points);
  });

  return Array.from(totals.entries())
    .map(([name, points]) => ({ name, points }))
    .sort((left, right) => right.points - left.points || left.name.localeCompare(right.name));
}

function computeFormationSummary({ data, race, selectedDrivers, selectedTeam }) {
  const budget = data?.config?.budget || 100;
  const driverValues = data?.driver_values || {};
  const constructorValues = data?.constructor_values || {};

  const selectedDriverCost = selectedDrivers.reduce(
    (sum, name) => sum + (driverValues[name]?.price || 0),
    0,
  );
  const selectedTeamCost = selectedTeam ? constructorValues[selectedTeam]?.price || 0 : 0;
  const totalCost = selectedDriverCost + selectedTeamCost;
  const budgetLeft = budget - totalCost;

  if (!race || selectedDrivers.length !== 5 || !selectedTeam) {
    return {
      totalCost,
      budgetLeft,
      probability: null,
      source: null,
      circuitName: race?.name || "",
      hasTrackData: false,
    };
  }

  const globalNorm = (collection, key) => {
    const values = Object.values(collection).map((item) => item.score);
    const min = Math.min(...values);
    const max = Math.max(...values);
    if (max === min) return 0.5;
    return (collection[key].score - min) / (max - min);
  };

  const track = race.circuit_ref ? data.track_profiles?.[race.circuit_ref] : null;
  const driverNorms = selectedDrivers.map((driverName) => {
    if (track?.drivers?.[driverName]) {
      return track.drivers[driverName].normalized;
    }
    return globalNorm(driverValues, driverName);
  });

  const teamNorm = track?.constructors?.[selectedTeam]
    ? track.constructors[selectedTeam].normalized
    : globalNorm(constructorValues, selectedTeam);

  const avgDriverNorm =
    driverNorms.reduce((sum, currentValue) => sum + currentValue, 0) / driverNorms.length;
  const strength = 0.78 * avgDriverNorm + 0.22 * teamNorm;
  const probability = Math.round(100 / (1 + Math.exp(-5.5 * (strength - 0.5))));

  return {
    totalCost,
    budgetLeft,
    probability,
    source: track ? "storico pista" : "fallback globale",
    circuitName: track ? track.circuit_name : race.name,
    hasTrackData: Boolean(track),
  };
}

function TeamRecommendations({ teams }) {
  if (teams.length === 0) {
    return <p className="muted">Nessuna raccomandazione disponibile.</p>;
  }

  return (
    <div className="top3Cards">
      {teams.map((team, index) => (
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
                <article key={`${team.constructor}-${driverName}`} className="f1DriverCard">
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
  );
}

function DriverSelectionPanel({
  raceName,
  driverNames,
  driverValues,
  teamNames,
  constructorValues,
  selectedDrivers,
  selectedTeam,
  onToggleDriver,
  onSelectTeam,
  summary,
}) {
  return (
    <section className="card selectionPanel">
      <div className="selectionHeader">
        <h3>La mia formazione</h3>
        <span className="muted">{raceName}</span>
      </div>
      <p className="muted">Selezionati: {selectedDrivers.length}/5</p>

      {selectedDrivers.length > 0 && (
        <div className="selectedDriversRow">
          {selectedDrivers.map((name) => (
            <span key={`selected-${raceName}-${name}`} className="selectedDriverBadge">
              {name}
            </span>
          ))}
        </div>
      )}

      <div className="teamSelectionRow">
        <label className="teamSelectionLabel" htmlFor={`team-${raceName}`}>
          Team
        </label>
        <select
          id={`team-${raceName}`}
          value={selectedTeam}
          onChange={(event) => onSelectTeam(event.target.value)}
          className="select"
        >
          <option value="">-- scegli team --</option>
          {teamNames.map((team) => (
            <option key={`${raceName}-${team}`} value={team}>
              {team} ({constructorValues?.[team]?.price}M)
            </option>
          ))}
        </select>
      </div>

      <div className="selectorGrid">
        {driverNames.map((name) => {
          const checked = selectedDrivers.includes(name);
          const disabled = !checked && selectedDrivers.length >= 5;
          const price = driverValues?.[name]?.price;

          return (
            <label
              key={`${raceName}-${name}`}
              className={`chip ${checked ? "chipOn" : ""} ${disabled ? "chipDisabled" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => onToggleDriver(name)}
              />
              <span>{name}</span>
              {typeof price === "number" && <small>{price}M</small>}
            </label>
          );
        })}
      </div>

      <div className="formationMetrics">
        <p>
          <strong>Totale:</strong> {summary.totalCost.toFixed(1)}M
        </p>
        <p>
          <strong>Residuo:</strong> {summary.budgetLeft.toFixed(1)}M
        </p>
        {summary.budgetLeft < 0 && (
          <p className="warning">
            Sei oltre il budget di {Math.abs(summary.budgetLeft).toFixed(1)}M
          </p>
        )}
      </div>

      <div className="predictionCard">
        {!summary.probability && (
          <p className="muted">Seleziona 5 piloti e 1 team per ottenere la stima.</p>
        )}
        {summary.probability && (
          <>
            <p>
              <strong>Pista:</strong> {summary.circuitName}
            </p>
            <p>
              <strong>Probabilita stimata:</strong>{" "}
              <span className="bigScore">{summary.probability}%</span>
            </p>
            <p className="muted">Fonte modello: {summary.source}</p>
            {!summary.hasTrackData && (
              <p className="warning">Storico pista non disponibile: uso fallback globale.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function StandingsTable({ title, rows, type }) {
  return (
    <section className="card standingsCard">
      <div className="standingsHeader">
        <h2>{title}</h2>
        <span className="muted">2026 live</span>
      </div>

      {rows.length === 0 && <p className="muted">Classifica non disponibile.</p>}

      {rows.length > 0 && (
        <div className="standingsTable">
          {rows.map((row, index) => (
            <div key={`${title}-${row.name}`} className="standingsRow">
              <span className="standingsPos">{index + 1}</span>

              {type === "driver" && (
                <img
                  src={driverImageUrl(row.name)}
                  alt={row.name}
                  className="standingsThumb"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=111827&color=ffffff&size=128&bold=true`;
                  }}
                />
              )}

              <div className="standingsNameBlock">
                <strong>{row.name}</strong>
                {type === "driver" && <span className="muted">{row.teamName}</span>}
              </div>

              <span className="standingsPoints">{formatPoints(row.points)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [screen, setScreen] = useState(window.location.pathname === "/" ? "welcome" : "main");
  const [isLeavingWelcome, setIsLeavingWelcome] = useState(false);
  const [liveLastRace, setLiveLastRace] = useState(null);
  const [liveRaceRows, setLiveRaceRows] = useState([]);
  const [liveDataLoading, setLiveDataLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [lastRaceOpen, setLastRaceOpen] = useState(false);
  const [nextRaceOpen, setNextRaceOpen] = useState(false);
  const [detailTeamsOpen, setDetailTeamsOpen] = useState(false);
  const [selectedDriversByRace, setSelectedDriversByRace] = useState({});
  const [selectedTeamByRace, setSelectedTeamByRace] = useState({});
  const welcomeTimerRef = useRef(null);

  const displayLastRace = useMemo(() => {
    if (liveLastRace) return liveLastRace;
    if (data?.last_race) {
      return {
        ...data.last_race,
        country_code: CIRCUIT_COUNTRY_FLAG[data.last_race.circuit_ref] || "",
      };
    }
    return null;
  }, [liveLastRace, data]);

  const driverNames = useMemo(
    () => (data ? Object.keys(data.driver_values) : Object.keys(DRIVER_META)),
    [data],
  );

  const teamNames = useMemo(
    () => (data ? Object.keys(data.constructor_values) : []),
    [data],
  );

  const driverStandings = useMemo(
    () => buildLiveDriverStandings(liveRaceRows),
    [liveRaceRows],
  );

  const constructorStandings = useMemo(
    () => buildLiveConstructorStandings(liveRaceRows),
    [liveRaceRows],
  );

  useEffect(() => {
    return () => {
      if (welcomeTimerRef.current) window.clearTimeout(welcomeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    fetch("/recommendations.json")
      .then((res) => {
        if (!res.ok) throw new Error("Manca recommendations.json. Esegui: npm run refresh:data");
        return res.json();
      })
      .then(setData)
      .catch((fetchError) => setError(fetchError.message));
  }, []);

  useEffect(() => {
    setLiveDataLoading(true);
    fetch(RACE_RESULTS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("live CSV non disponibile");
        return res.text();
      })
      .then((text) => {
        const rows = parseRaceCSV(text);
        setLiveRaceRows(rows);
        const parsed = extractLastRace2026(rows);
        if (parsed) setLiveLastRace(parsed);
      })
      .catch(() => {})
      .finally(() => setLiveDataLoading(false));
  }, []);

  useEffect(() => {
    const handler = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  useEffect(() => {
    setDetailTeamsOpen(false);
  }, [currentPath]);

  function navigate(path) {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  }

  function toggleDriverForRace(raceName, driverName) {
    setSelectedDriversByRace((current) => {
      const currentSelection = current[raceName] || [];
      if (currentSelection.includes(driverName)) {
        return {
          ...current,
          [raceName]: currentSelection.filter((name) => name !== driverName),
        };
      }

      if (currentSelection.length >= 5) {
        return current;
      }

      return {
        ...current,
        [raceName]: [...currentSelection, driverName],
      };
    });
  }

  function selectTeamForRace(raceName, teamName) {
    setSelectedTeamByRace((current) => ({
      ...current,
      [raceName]: teamName,
    }));
  }

  function handleStartClick() {
    if (isLeavingWelcome) return;
    setIsLeavingWelcome(true);
    welcomeTimerRef.current = window.setTimeout(() => {
      setScreen("main");
      setIsLeavingWelcome(false);
    }, 260);
  }

  // ── Welcome ─────────────────────────────────────────────────────────────
  if (screen === "welcome") {
    return (
      <main className={`welcomeScreen ${isLeavingWelcome ? "welcomeExit" : ""}`}>
        <div className="welcomeContent">
          <div className="welcomeBrand">
            <h1>Benvenuto al FantaF1</h1>
            <span className="welcomeAccent" aria-hidden="true" />
          </div>
        </div>
        <div className="welcomeFooter">
          <button className="startButton" onClick={handleStartClick}>
            Iniziamo!
          </button>
        </div>
      </main>
    );
  }

  // ── SPA routing — race detail page ───────────────────────────────────────
  const slugFromPath = currentPath === "/" ? null : currentPath.replace(/^\//, "");

  if (slugFromPath) {
    const races = data?.upcoming_races_2026 || [];
    const raceForPage = races.find((r) => raceSlug(r.name) === slugFromPath);
    const teams =
      raceForPage && data
        ? data.track_team_recommendations?.[raceForPage.name]?.teams || []
        : [];
    const liveTrackName = raceForPage
      ? Object.entries(LIVE_TRACK_META).find(([, meta]) => meta.round === raceForPage.round)?.[0]
      : null;
    const raceResults = liveTrackName
      ? buildRaceResults(liveRaceRows.filter((row) => row.Track === liveTrackName))
      : [];
    const trackImage = raceForPage?.circuit_ref
      ? CIRCUIT_REF_TO_TRACK_IMAGE[raceForPage.circuit_ref]
      : null;
    const selectedDrivers = raceForPage ? selectedDriversByRace[raceForPage.name] || [] : [];
    const selectedTeam = raceForPage ? selectedTeamByRace[raceForPage.name] || "" : "";
    const summary = raceForPage
      ? computeFormationSummary({
          data,
          race: raceForPage,
          selectedDrivers,
          selectedTeam,
        })
      : null;

    return (
      <>
        <header className="topbar">
          <button className="backButton" onClick={() => navigate("/")}>
            ← Indietro
          </button>
          <span>FantaF1</span>
        </header>
        <main className="container appStage">
          {!data && <section className="card">Caricamento...</section>}
          {data && !raceForPage && <section className="card">Gara non trovata.</section>}
          {raceForPage && (
            <>
              <section className="raceDetailHero card">
                {trackImage ? (
                  <img
                    src={`/tracks_pictures/${trackImage}`}
                    alt={raceForPage.name}
                    className="raceDetailTrackImage"
                  />
                ) : (
                  <div className="lastRaceTrackPlaceholder">🏁</div>
                )}
                <div className="raceDetailInfo">
                  <div className="lastRaceBadge">Round {raceForPage.round}</div>
                  <h2>{raceForPage.name}</h2>
                  <p className="muted">
                    {countryFlag(raceForPage.country_code)} {formatDate(raceForPage.date)}
                  </p>
                </div>
              </section>

              {raceResults.length > 0 && (
                <section className="card lastRaceResults">
                  <h3>Classifica gara</h3>
                  <div className="lastRaceTable">
                    {raceResults.map((result) => (
                      <div
                        key={`${raceForPage.name}-${result.position_text}-${result.driver_surname}`}
                        className={`lastRaceRow ${
                          result.position === 1
                            ? "p1"
                            : result.position === 2
                              ? "p2"
                              : result.position === 3
                                ? "p3"
                                : ""
                        }`}
                      >
                        <span className="lrPos">{result.position_text}</span>
                        <img
                          src={driverImageUrl(result.driver_surname)}
                          alt={result.driver_surname}
                          className="lrDriverThumb"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(result.driver_surname)}&background=111827&color=ffffff&size=128&bold=true`;
                          }}
                        />
                        <span className="lrDriverName">
                          <span className="lrDriverSurname">{result.driver_surname}</span>
                          <span className="lrConstructor muted">{result.constructor_name}</span>
                        </span>
                        <span className="lrPoints">
                          {result.points > 0
                            ? `+${result.points}`
                            : result.status !== "Finished"
                              ? result.status
                              : "–"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="accordionSection">
                <button
                  className="accordionBanner"
                  onClick={() => setDetailTeamsOpen((open) => !open)}
                  aria-expanded={detailTeamsOpen}
                >
                  <span className="accordionTitle">3 team consigliati</span>
                  <span className="accordionChevron">{detailTeamsOpen ? "▲" : "▼"}</span>
                </button>

                {detailTeamsOpen && (
                  <div className="accordionBody card">
                    <TeamRecommendations teams={teams} />
                  </div>
                )}
              </section>

              <DriverSelectionPanel
                raceName={raceForPage.name}
                driverNames={driverNames}
                driverValues={data?.driver_values}
                teamNames={teamNames}
                constructorValues={data?.constructor_values}
                selectedDrivers={selectedDrivers}
                selectedTeam={selectedTeam}
                onToggleDriver={(driverName) => toggleDriverForRace(raceForPage.name, driverName)}
                onSelectTeam={(teamName) => selectTeamForRace(raceForPage.name, teamName)}
                summary={summary}
              />
            </>
          )}
        </main>
      </>
    );
  }

  // ── Main screen ──────────────────────────────────────────────────────────
  if (error) {
    return (
      <>
        <header className="topbar">FantaF1</header>
        <main className="container appStage">
          <section className="card">Errore: {error}</section>
        </main>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <header className="topbar">FantaF1</header>
        <main className="container appStage">
          <section className="card">Caricamento dati...</section>
        </main>
      </>
    );
  }

  const races = data.upcoming_races_2026 || [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextRace = races.find((r) => new Date(r.date) >= today) || races[0];
  const nextRaceTrackImage = nextRace?.circuit_ref
    ? CIRCUIT_REF_TO_TRACK_IMAGE[nextRace.circuit_ref]
    : null;
  const trackTeamRecommendations = data.track_team_recommendations || {};
  const nextRaceRec = nextRace ? trackTeamRecommendations[nextRace.name] : null;
  const recommendedTeams = nextRaceRec?.teams || [];
  const nextRaceSelectedDrivers = nextRace ? selectedDriversByRace[nextRace.name] || [] : [];
  const nextRaceSelectedTeam = nextRace ? selectedTeamByRace[nextRace.name] || "" : "";
  const nextRaceSummary = nextRace
    ? computeFormationSummary({
        data,
        race: nextRace,
        selectedDrivers: nextRaceSelectedDrivers,
        selectedTeam: nextRaceSelectedTeam,
      })
    : null;

  return (
    <>
      <header className="topbar">FantaF1</header>
      <main className="container appStage">

        {/* ── Ultima gara accordion ── */}
        <section className="accordionSection">
          <button
            className="accordionBanner"
            onClick={() => setLastRaceOpen((o) => !o)}
            aria-expanded={lastRaceOpen}
          >
            <span className="accordionTitle">
              {displayLastRace
                ? `${countryFlag(displayLastRace.country_code || "")} Ultima gara · ${displayLastRace.race_name}`
                : "Ultima gara"}
              {liveLastRace && <span className="liveDot" title="Dati live" />}
            </span>
            <span className="accordionChevron">{lastRaceOpen ? "▲" : "▼"}</span>
          </button>

          {lastRaceOpen && (
            <div className="accordionBody card">
              {liveDataLoading && !displayLastRace && (
                <p className="muted">Caricamento dati live...</p>
              )}
              {displayLastRace && (
                <>
                  <div className="lastRaceHero">
                    {displayLastRace.track_image && (
                      <img
                        src={`/tracks_pictures/${displayLastRace.track_image}`}
                        alt={displayLastRace.race_name}
                        className="lastRaceTrackImage"
                      />
                    )}
                    <div className="lastRaceInfo">
                      <h3>{displayLastRace.race_name}</h3>
                      <p className="muted">
                        Round {displayLastRace.round} · {displayLastRace.year} ·{" "}
                        {formatDate(displayLastRace.date)}
                      </p>
                    </div>
                  </div>
                  {displayLastRace.results && (
                    <div className="lastRaceTable">
                      {displayLastRace.results.map((r) => (
                        <div
                          key={`${r.position_text}-${r.driver_surname}`}
                          className={`lastRaceRow ${
                            r.position === 1 ? "p1" : r.position === 2 ? "p2" : r.position === 3 ? "p3" : ""
                          }`}
                        >
                          <span className="lrPos">{r.position_text}</span>
                          <img
                            src={driverImageUrl(r.driver_surname)}
                            alt={r.driver_surname}
                            className="lrDriverThumb"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(r.driver_surname)}&background=111827&color=ffffff&size=128&bold=true`;
                            }}
                          />
                          <span className="lrDriverName">
                            <span className="lrDriverSurname">{r.driver_surname}</span>
                            <span className="lrConstructor muted">{r.constructor_name}</span>
                          </span>
                          <span className="lrPoints">
                            {r.points > 0
                              ? `+${r.points}`
                              : r.status !== "Finished"
                              ? r.status
                              : "–"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </section>

        {/* ── Prossima gara accordion ── */}
        <section className="accordionSection">
          <button
            className="accordionBanner"
            onClick={() => setNextRaceOpen((o) => !o)}
            aria-expanded={nextRaceOpen}
          >
            <span className="accordionTitle">
              {nextRace
                ? `${countryFlag(nextRace.country_code)} Prossima gara · ${nextRace.name} · Round ${nextRace.round}`
                : "Prossima gara"}
            </span>
            <span className="accordionChevron">{nextRaceOpen ? "▲" : "▼"}</span>
          </button>

          {nextRaceOpen && (
            <div className="accordionBody card">
              {nextRace && (
                <div className="lastRaceHero">
                  {nextRaceTrackImage ? (
                    <img
                      src={`/tracks_pictures/${nextRaceTrackImage}`}
                      alt={nextRace.name}
                      className="lastRaceTrackImage"
                    />
                  ) : (
                    <div className="lastRaceTrackPlaceholder">🏁</div>
                  )}
                  <div className="lastRaceInfo">
                    <h3>{nextRace.name}</h3>
                    <p className="muted">
                      Round {nextRace.round} · {formatDate(nextRace.date)}
                    </p>
                  </div>
                </div>
              )}
              {recommendedTeams.length === 0 && (
                <p className="muted">Nessuna raccomandazione disponibile.</p>
              )}
              {recommendedTeams.length > 0 && (
                <TeamRecommendations teams={recommendedTeams} />
              )}

              {nextRace && (
                <DriverSelectionPanel
                  raceName={nextRace.name}
                  driverNames={driverNames}
                  driverValues={data.driver_values}
                  teamNames={teamNames}
                  constructorValues={data.constructor_values}
                  selectedDrivers={nextRaceSelectedDrivers}
                  selectedTeam={nextRaceSelectedTeam}
                  onToggleDriver={(driverName) => toggleDriverForRace(nextRace.name, driverName)}
                  onSelectTeam={(teamName) => selectTeamForRace(nextRace.name, teamName)}
                  summary={nextRaceSummary}
                />
              )}
            </div>
          )}
        </section>

        <section className="row standingsGrid">
          <StandingsTable title="Classifica piloti" rows={driverStandings} type="driver" />
          <StandingsTable
            title="Classifica costruttori"
            rows={constructorStandings}
            type="constructor"
          />
        </section>

        {/* ── Tutte le gare ── */}
        <section className="card">
          <h2>Tutte le gare</h2>
          <div className="raceGrid">
            {races.map((race) => {
              const slug = raceSlug(race.name);
              const isPast = new Date(race.date) < today;
              const isNext = nextRace && race.round === nextRace.round;
              return (
                <button
                  key={`${race.round}-${race.name}`}
                  className={`raceCard ${isNext ? "raceCardNext" : ""} ${isPast ? "raceCardPast" : ""}`}
                  onClick={() => navigate(`/${slug}`)}
                >
                  <div className="raceTop">
                    <span>{countryFlag(race.country_code)}</span>
                    <span>Round {race.round}</span>
                  </div>
                  <strong>{race.name}</strong>
                  <div className="muted">{formatDate(race.date)}</div>
                  {isNext && <div className="raceNextLabel">Prossima</div>}
                </button>
              );
            })}
          </div>
        </section>

      </main>
    </>
  );
}

export default App;
