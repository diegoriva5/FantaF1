import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { CIRCUIT_COUNTRY_FLAG, DRIVER_META, RACE_RESULTS_URL } from "./data/constants";
import {
  raceSlug,
  driverSlug,
  driverKeyFromSlug,
  constructorSlug,
  constructorKeyFromSlug,
} from "./utils/format";
import { parseRaceCSV, extractLastRace2026 } from "./utils/raceData";
import {
  buildLastRaceFantasyStandings,
  buildLiveDriverStandings,
  buildLiveConstructorStandings,
  computeFormationSummary,
} from "./utils/standings";
import WelcomeScreen from "./components/WelcomeScreen";
import HomeHubPage from "./components/HomeHubPage";
import RaceDetailPage from "./components/RaceDetailPage";
import MainScreen from "./components/MainScreen";
import DriverPage from "./components/DriverPage";
import ConstructorPage from "./components/ConstructorPage";
import CircuitsPage from "./components/CircuitsPage";
import CircuitDetailPage from "./components/CircuitDetailPage";
import { HistoricDrivers, GenerationTimeline } from "./pages";
import {
  getDefaultLanguage,
  I18nProvider,
  isSupportedLanguage,
  translate,
} from "./i18n";

const EMPTY_ADJUSTMENT = {};
const START_PATH = "/start";
const HOME_PATH = "/home";
const DRIVER_ROUTE_PATTERN = /^\/(\d{4})\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const CONSTRUCTOR_ROUTE_PATTERN = /^\/(\d{4})\/scuderia\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const CIRCUITS_PATH = "/circuiti";
const FANTAF1_PATH = "/FantaF1";
const CIRCUIT_ROUTE_PATTERN = new RegExp(`^${CIRCUITS_PATH}\/([a-z0-9_-]+)$`);
const LANGUAGE_STORAGE_KEY = "fantaf1-language";

function resolveInitialLanguage() {
  const fallback = getDefaultLanguage();

  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return START_PATH;

  // Se il path è già assoluto (es: /FantaF1, /circuiti, /start, /home, ecc.), restituiscilo così com'è
  if (pathname.startsWith("/FantaF1") || pathname.startsWith("/circuiti") || pathname.startsWith("/historic-drivers") || pathname === START_PATH || pathname === HOME_PATH) {
    return pathname;
  }

  const trimmed = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  if (trimmed === START_PATH || trimmed === HOME_PATH || trimmed.startsWith(`${HOME_PATH}/`)) {
    return trimmed;
  }

  if (CONSTRUCTOR_ROUTE_PATTERN.test(trimmed)) {
    return trimmed;
  }

  if (DRIVER_ROUTE_PATTERN.test(trimmed)) {
    return trimmed;
  }

  // Backward compatibility for legacy race URLs like "/monaco-grand-prix"
  if (
    trimmed.startsWith("/")
    && !trimmed.startsWith(START_PATH)
    && !trimmed.startsWith(HOME_PATH)
  ) {
    return `${HOME_PATH}${trimmed}`;
  }

  return HOME_PATH;
}

function playAudio(audio) {
  if (!audio) return;
  audio.currentTime = 0;
  const playback = audio.play();
  if (playback && typeof playback.catch === "function") {
    playback.catch(() => {});
  }
}

function stopAudio(audio) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}

function App() {
  const initialPath = normalizePath(window.location.pathname);
  if (window.location.pathname !== initialPath) {
    window.history.replaceState({}, "", initialPath);
  }

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [screen, setScreen] = useState(initialPath === START_PATH ? "welcome" : "main");
  const [isLeavingWelcome, setIsLeavingWelcome] = useState(false);
  const [liveLastRace, setLiveLastRace] = useState(null);
  const [liveRaceRows, setLiveRaceRows] = useState([]);
  const [liveDataLoading, setLiveDataLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [lastRaceOpen, setLastRaceOpen] = useState(false);
  const [nextRaceOpen, setNextRaceOpen] = useState(false);
  const [detailTeamsOpen, setDetailTeamsOpen] = useState(false);
  const [selectedDriversByRace, setSelectedDriversByRace] = useState({});
  const [selectedTeamByRace, setSelectedTeamByRace] = useState({});
  const [language, setLanguage] = useState(resolveInitialLanguage);
  const welcomeTimerRef = useRef(null);
  const introSoundTimerRef = useRef(null);
  const welcomeSoundRef = useRef(null);
  const radioSoundRef = useRef(null);
  const t = useMemo(
    () => (key, params) => translate(language, key, params),
    [language],
  );
  const localizedError = useMemo(() => {
    if (!error) return "";
    if (error === "Missing recommendations.json. Run: npm run refresh:data") {
      return t("app.missingRecommendations");
    }
    if (error === "Live CSV not available") {
      return t("app.liveCsvUnavailable");
    }
    return error;
  }, [error, t]);

  

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

  const salaryAdjustment = data?.config?.salary_adjustment || EMPTY_ADJUSTMENT;

  const lastRaceFantasyStandings = useMemo(
    () => buildLastRaceFantasyStandings(salaryAdjustment, displayLastRace?.results || []),
    [salaryAdjustment, displayLastRace],
  );

  const driverStandings = useMemo(
    () => buildLiveDriverStandings(liveRaceRows, data?.driver_values, salaryAdjustment),
    [liveRaceRows, data?.driver_values, salaryAdjustment],
  );

  const constructorStandings = useMemo(
    () => buildLiveConstructorStandings(liveRaceRows),
    [liveRaceRows],
  );

  useEffect(() => {
    const welcomeSound = new Audio("/f1-speeding-sound.mp3");
    welcomeSound.preload = "auto";
    const radioSound = new Audio("/f1-radio-sound.mp3");
    radioSound.preload = "auto";
    welcomeSoundRef.current = welcomeSound;
    radioSoundRef.current = radioSound;
    return () => {
      stopAudio(welcomeSound);
      stopAudio(radioSound);
      welcomeSoundRef.current = null;
      radioSoundRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (welcomeTimerRef.current) window.clearTimeout(welcomeTimerRef.current);
      if (introSoundTimerRef.current) window.clearTimeout(introSoundTimerRef.current);
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage errors (private mode/quota) and keep runtime state only.
    }
  }, [language]);

  useEffect(() => {
    if (screen !== "welcome") {
      if (introSoundTimerRef.current) {
        window.clearTimeout(introSoundTimerRef.current);
        introSoundTimerRef.current = null;
      }
      stopAudio(welcomeSoundRef.current);
      return;
    }
    introSoundTimerRef.current = window.setTimeout(() => {
      playAudio(welcomeSoundRef.current);
      introSoundTimerRef.current = null;
    }, 1000);
    return () => {
      if (introSoundTimerRef.current) {
        window.clearTimeout(introSoundTimerRef.current);
        introSoundTimerRef.current = null;
      }
    };
  }, [screen]);

  useEffect(() => {
    fetch("/recommendations.json")
      .then((res) => {
        if (!res.ok) throw new Error("Missing recommendations.json. Run: npm run refresh:data");
        return res.json();
      })
      .then(setData)
      .catch((fetchError) => setError(fetchError.message));
  }, []);

  useEffect(() => {
    fetch(RACE_RESULTS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Live CSV not available");
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
    const handler = () => {
      const nextPath = normalizePath(window.location.pathname);
      if (window.location.pathname !== nextPath) {
        window.history.replaceState({}, "", nextPath);
      }
      setCurrentPath(nextPath);
      setScreen(nextPath === START_PATH ? "welcome" : "main");
      setDetailTeamsOpen(false);
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  function navigate(path, options = {}) {
    const nextPath = normalizePath(path);
    const state = options?.state && typeof options.state === "object" ? options.state : {};
    window.history.pushState(state, "", nextPath);
    setCurrentPath(nextPath);
    setScreen(nextPath === START_PATH ? "welcome" : "main");
    setDetailTeamsOpen(false);
  }

  function toggleDriverForRace(raceName, driverName) {
    setSelectedDriversByRace((current) => {
      const currentSelection = current[raceName] || [];
      if (currentSelection.includes(driverName)) {
        return { ...current, [raceName]: currentSelection.filter((n) => n !== driverName) };
      }
      if (currentSelection.length >= 5) return current;
      return { ...current, [raceName]: [...currentSelection, driverName] };
    });
  }

  function selectTeamForRace(raceName, teamName) {
    setSelectedTeamByRace((current) => ({ ...current, [raceName]: teamName }));
  }

  function openDriverPage(driverName) {
    if (!driverName) return;
    const seasonYear = data?.config?.current_season_year || new Date().getFullYear();
    navigate(`/${seasonYear}/${driverSlug(driverName)}`, {
      state: { fromPath: currentPath },
    });
  }

  function openConstructorPage(constructorName) {
    if (!constructorName) return;
    const seasonYear = data?.config?.current_season_year || new Date().getFullYear();
    navigate(`/${seasonYear}/scuderia/${constructorSlug(constructorName)}`, {
      state: { fromPath: currentPath },
    });
  }

  function handleStartClick() {
    if (isLeavingWelcome) return;
    if (introSoundTimerRef.current) {
      window.clearTimeout(introSoundTimerRef.current);
      introSoundTimerRef.current = null;
    }
    stopAudio(welcomeSoundRef.current);
    playAudio(radioSoundRef.current);
    setIsLeavingWelcome(true);
    welcomeTimerRef.current = window.setTimeout(() => {
      navigate(HOME_PATH);
      setIsLeavingWelcome(false);
    }, 260);
  }

  // ── Welcome ──────────────────────────────────────────────────────────────
  if (screen === "welcome") {
    return (
      <I18nProvider language={language} setLanguage={setLanguage}>
        <WelcomeScreen isLeavingWelcome={isLeavingWelcome} onStartClick={handleStartClick} />
      </I18nProvider>
    );
  }

  // Route per /home che mostra HomeHubPage
  if (currentPath === "/home") {
    return (
      <I18nProvider language={language} setLanguage={setLanguage}>
        <HomeHubPage
          onOpenFanta={() => navigate(FANTAF1_PATH, { state: { fromPath: currentPath } })}
          onOpenCircuits={() => navigate(CIRCUITS_PATH, { state: { fromPath: currentPath } })}
          onOpenHistoricDrivers={() => navigate("/historic-drivers", { state: { fromPath: currentPath } })}
        />
      </I18nProvider>
    );
  }

    // Route per /FantaF1 che mostra la schermata principale del gioco
  if (currentPath === FANTAF1_PATH) {
    return (
      <I18nProvider language={language} setLanguage={setLanguage}>
        <MainScreen
          data={data}
          error={localizedError}
          displayLastRace={displayLastRace}
          liveDataLoading={liveDataLoading}
          liveLastRace={liveLastRace}
          driverStandings={driverStandings}
          constructorStandings={constructorStandings}
          lastRaceFantasyStandings={lastRaceFantasyStandings}
          selectedDriversByRace={selectedDriversByRace}
          selectedTeamByRace={selectedTeamByRace}
          onToggleDriver={toggleDriverForRace}
          onSelectTeam={selectTeamForRace}
          onNavigate={navigate}
          onOpenDriver={openDriverPage}
          onOpenConstructor={openConstructorPage}
          lastRaceOpen={lastRaceOpen}
          setLastRaceOpen={setLastRaceOpen}
          nextRaceOpen={nextRaceOpen}
          setNextRaceOpen={setNextRaceOpen}
        />
      </I18nProvider>
    );
  }


  // ── Constructor page routing ─────────────────────────────────────────────
  const constructorRouteMatch = currentPath.match(CONSTRUCTOR_ROUTE_PATTERN);
  if (constructorRouteMatch) {
    const constructorRouteSlug = constructorRouteMatch[2];
    const availableConstructorNames = data ? Object.keys(data.constructor_values || {}) : [];
    const constructorName = constructorKeyFromSlug(constructorRouteSlug, availableConstructorNames);
    const fromPathRaw = window.history.state?.fromPath;
    const fromPath = typeof fromPathRaw === "string" ? normalizePath(fromPathRaw) : "";
    const hasBackTarget = Boolean(fromPath && fromPath !== currentPath);
    const backToDriver = Boolean(fromPath && DRIVER_ROUTE_PATTERN.test(fromPath));

    function handleConstructorBack() {
      if (hasBackTarget) {
        window.history.back();
        return;
      }
      navigate(HOME_PATH);
    }

    return (
      <I18nProvider language={language} setLanguage={setLanguage}>
        <ConstructorPage
          data={data}
          error={localizedError}
          constructorName={constructorName}
          onNavigateBack={handleConstructorBack}
          backLabel={backToDriver ? t("common.driver") : hasBackTarget ? t("common.back") : t("common.home")}
          onOpenDriver={openDriverPage}
        />
      </I18nProvider>
    );
  }

  // ── Driver page routing ───────────────────────────────────────────────────
  const driverRouteMatch = currentPath.match(DRIVER_ROUTE_PATTERN);
  if (driverRouteMatch) {
    const driverRouteSlug = driverRouteMatch[2];
    const driverName = driverKeyFromSlug(driverRouteSlug);
    const fromPathRaw = window.history.state?.fromPath;
    const fromPath = typeof fromPathRaw === "string" ? normalizePath(fromPathRaw) : "";
    const hasBackTarget = Boolean(fromPath && fromPath !== currentPath);
    const backToConstructor = Boolean(fromPath && CONSTRUCTOR_ROUTE_PATTERN.test(fromPath));

    function handleDriverBack() {
      if (hasBackTarget) {
        window.history.back();
        return;
      }
      navigate(HOME_PATH);
    }

    return (
      <I18nProvider language={language} setLanguage={setLanguage}>
        <DriverPage
          data={data}
          error={localizedError}
          driverName={driverName}
          onNavigateBack={handleDriverBack}
          backLabel={backToConstructor ? t("common.constructor") : hasBackTarget ? t("common.back") : t("common.home")}
          onOpenConstructor={openConstructorPage}
        />
      </I18nProvider>
    );
  }

  // ── Circuits routes ───────────────────────────────────────────────────────
  const circuitRouteMatch = currentPath.match(CIRCUIT_ROUTE_PATTERN);
  if (circuitRouteMatch) {
    const circuitRef = circuitRouteMatch[1];
    function handleCircuitBack() {
      navigate(CIRCUITS_PATH);
    }
    return (
      <I18nProvider language={language} setLanguage={setLanguage}>
        <CircuitDetailPage
          data={data}
          error={localizedError}
          circuitRef={circuitRef}
          onNavigateBack={handleCircuitBack}
          onNavigateHome={() => navigate(HOME_PATH)}
          onOpenDriver={openDriverPage}
          onOpenConstructor={openConstructorPage}
        />
      </I18nProvider>
    );
  }

  if (currentPath === CIRCUITS_PATH) {
    return (
      <I18nProvider language={language} setLanguage={setLanguage}>
        <CircuitsPage
          data={data}
          error={localizedError}
          onNavigateHome={() => navigate(HOME_PATH)}
          onOpenCircuit={(circuitRef) => {
            if (!circuitRef) return;
            navigate(`${CIRCUITS_PATH}/${circuitRef}`);
          }}
        />
      </I18nProvider>
    );
  }

  // ── Historic Drivers page ───────────────────────────────────────────────
  if (currentPath === "/historic-drivers") {
    return <HistoricDrivers navigate={navigate} />;
  }
  // ── Historic Drivers Era Timeline ───────────────────────────────────────
  if (currentPath.startsWith("/historic-drivers/")) {
    const eraSlug = currentPath.replace("/historic-drivers/", "");
    return <GenerationTimeline eraSlug={eraSlug} navigate={navigate} />;
  }

  // ── SPA routing — race detail page ───────────────────────────────────────
  const slugFromPath = currentPath.startsWith(`${HOME_PATH}/`)
    ? currentPath.slice(HOME_PATH.length + 1)
    : null;

  if (slugFromPath) {
    const races = data?.upcoming_races_2026 || [];
    const raceForPage = races.find((r) => raceSlug(r.name) === slugFromPath) || null;
    const selectedDrivers = raceForPage ? selectedDriversByRace[raceForPage.name] || [] : [];
    const selectedTeam = raceForPage ? selectedTeamByRace[raceForPage.name] || "" : "";
    const summary = raceForPage
      ? computeFormationSummary({ data, race: raceForPage, selectedDrivers, selectedTeam })
      : null;

    return (
      <I18nProvider language={language} setLanguage={setLanguage}>
        <RaceDetailPage
          data={data}
          raceForPage={raceForPage}
          liveRaceRows={liveRaceRows}
          detailTeamsOpen={detailTeamsOpen}
          setDetailTeamsOpen={setDetailTeamsOpen}
          selectedDrivers={selectedDrivers}
          selectedTeam={selectedTeam}
          onToggleDriver={(driverName) => toggleDriverForRace(raceForPage.name, driverName)}
          onSelectTeam={(teamName) => selectTeamForRace(raceForPage.name, teamName)}
          summary={summary}
          driverNames={driverNames}
          teamNames={teamNames}
          onNavigateBack={() => navigate(HOME_PATH)}
          onOpenDriver={openDriverPage}
          onOpenConstructor={openConstructorPage}
        />
      </I18nProvider>
    );
  }

  // ── Main screen ──────────────────────────────────────────────────────────
  return (
    <I18nProvider language={language} setLanguage={setLanguage}>
      <MainScreen
        data={data}
        error={localizedError}
        displayLastRace={displayLastRace}
        liveDataLoading={liveDataLoading}
        liveLastRace={liveLastRace}
        driverStandings={driverStandings}
        constructorStandings={constructorStandings}
        lastRaceFantasyStandings={lastRaceFantasyStandings}
        selectedDriversByRace={selectedDriversByRace}
        selectedTeamByRace={selectedTeamByRace}
        onToggleDriver={toggleDriverForRace}
        onSelectTeam={selectTeamForRace}
        onNavigate={navigate}
        onOpenDriver={openDriverPage}
        onOpenConstructor={openConstructorPage}
        lastRaceOpen={lastRaceOpen}
        setLastRaceOpen={setLastRaceOpen}
        nextRaceOpen={nextRaceOpen}
        setNextRaceOpen={setNextRaceOpen}
      />
    </I18nProvider>
  );
}

export default App;