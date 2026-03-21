import {
  countryFlag,
  formatDate,
  driverImageUrl,
  raceSlug,
  formatFantasyPoints,
  driverDisplayName,
} from "../utils/format";
import { CIRCUIT_REF_TO_TRACK_IMAGE } from "../data/constants";
import TeamRecommendations from "./TeamRecommendations";
import DriverSelectionPanel from "./DriverSelectionPanel";
import StandingsTable from "./StandingsTable";
import TrackImageLightbox from "./TrackImageLightbox";
import { computeFormationSummary } from "../utils/standings";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "../i18n";

const PODIUM_MEDALS = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

function buildPodiumByRound(data) {
  const historyByDriver = data?.config?.salary_adjustment?.driver_event_history || {};
  const podiumByRound = {};

  Object.entries(historyByDriver).forEach(([driverName, history]) => {
    if (!Array.isArray(history)) return;

    history.forEach((entry) => {
      const round = Number(entry?.round);
      const finishPosition = Number(entry?.finish_position);

      if (!Number.isInteger(round) || round <= 0) return;
      if (!Number.isInteger(finishPosition) || finishPosition < 1 || finishPosition > 3) return;

      const currentRoundPodium = podiumByRound[round] || {};
      if (!currentRoundPodium[finishPosition]) {
        currentRoundPodium[finishPosition] = driverName;
      }
      podiumByRound[round] = currentRoundPodium;
    });
  });

  return podiumByRound;
}

export default function MainScreen({
  data,
  error,
  displayLastRace,
  liveDataLoading,
  liveLastRace,
  driverStandings,
  constructorStandings,
  lastRaceFantasyStandings,
  selectedDriversByRace,
  selectedTeamByRace,
  onToggleDriver,
  onSelectTeam,
  onNavigate,
  onOpenDriver,
  onOpenConstructor,
  lastRaceOpen,
  setLastRaceOpen,
  nextRaceOpen,
  setNextRaceOpen,
  raceBasePath = "/home",
}) {
  const { t, dateLocale } = useI18n();
  const pointsSuffix = t("common.pointsSuffix");

  if (error) {
    return (
      <>
        <header className="topbar">
          <button type="button" className="backButton" onClick={() => onNavigate("/home")}> Home</button>
          <span className="topbarTitle">{t("common.appName")}</span>
          <LanguageSwitcher />
        </header>
        <main className="container appStage">
          <section className="card">{t("common.errorPrefix", { message: error })}</section>
        </main>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <header className="topbar">
          <span className="topbarTitle">{t("common.appName")}</span>
          <LanguageSwitcher />
        </header>
        <main className="container appStage">
          <section className="card">{t("common.loadingData")}</section>
        </main>
      </>
    );
  }

  const races = data.upcoming_races_2026 || [];
  const podiumByRound = buildPodiumByRound(data);
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
  const driverNames = Object.keys(data.driver_values);
  const teamNames = Object.keys(data.constructor_values);
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
      <header className="topbar">
        <button type="button" className="backButton" onClick={() => onNavigate("/home")}>← Home</button>
        <span className="topbarTitle">{t("common.appName")}</span>
        <LanguageSwitcher />
      </header>
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
                ? t("main.lastRaceTitleWithName", {
                    flag: countryFlag(displayLastRace.country_code || ""),
                    raceName: displayLastRace.race_name,
                  })
                : t("main.lastRaceFallback")}
              {liveLastRace && <span className="liveDot" title={t("main.liveDataTitle")} />}
            </span>
            <span className="accordionChevron">{lastRaceOpen ? "▲" : "▼"}</span>
          </button>

          {lastRaceOpen && (
            <div className="accordionBody card">
              {liveDataLoading && !displayLastRace && (
                <p className="muted">{t("main.loadingLive")}</p>
              )}
              {displayLastRace && (
                <>
                  <div className="lastRaceHero">
                    {displayLastRace.track_image && (
                      <TrackImageLightbox
                        src={`/tracks_pictures/${displayLastRace.track_image}`}
                        alt={displayLastRace.race_name}
                        imageClassName="lastRaceTrackImage"
                      />
                    )}
                    <div className="lastRaceInfo">
                      <h3>{displayLastRace.race_name}</h3>
                      <p className="muted">
                        {t("main.roundYearDate", {
                          round: displayLastRace.round,
                          year: displayLastRace.year,
                          date: formatDate(displayLastRace.date, dateLocale),
                        })}
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
                          {typeof onOpenDriver === "function" ? (
                            <button
                              type="button"
                              className="driverInlineButton"
                              onClick={() => onOpenDriver(r.driver_surname)}
                              aria-label={t("main.openDriverAria", { driverName: r.driver_surname })}
                            >
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
                            </button>
                          ) : (
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
                          )}
                          <span className="lrDriverName">
                            {typeof onOpenDriver === "function" ? (
                              <button
                                type="button"
                                className="driverInlineButton lrNameButton"
                                onClick={() => onOpenDriver(r.driver_surname)}
                              >
                                <span className="lrDriverSurname">{r.driver_surname}</span>
                                <span className="lrConstructor muted">{r.constructor_name}</span>
                              </button>
                            ) : (
                              <>
                                <span className="lrDriverSurname">{r.driver_surname}</span>
                                <span className="lrConstructor muted">{r.constructor_name}</span>
                              </>
                            )}
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

                  <div className="lastRaceFantasySection">
                    <h4>{t("main.fantasyStandings")}</h4>
                    {lastRaceFantasyStandings.length === 0 && (
                      <p className="muted">{t("main.fantasyUnavailable")}</p>
                    )}
                    {lastRaceFantasyStandings.length > 0 && (
                      <div className="lastRaceTable">
                        {lastRaceFantasyStandings.map((entry, index) => (
                          <div
                            key={`fantasy-${entry.driverName}`}
                            className={`lastRaceRow ${
                              index === 0 ? "p1" : index === 1 ? "p2" : index === 2 ? "p3" : ""
                            }`}
                          >
                            <span className="lrPos">{index + 1}</span>
                            {typeof onOpenDriver === "function" ? (
                              <button
                                type="button"
                                className="driverInlineButton"
                                onClick={() => onOpenDriver(entry.driverName)}
                                aria-label={t("main.openDriverAria", { driverName: entry.driverName })}
                              >
                                <img
                                  src={driverImageUrl(entry.driverName)}
                                  alt={entry.driverName}
                                  className="lrDriverThumb"
                                  loading="lazy"
                                  onError={(event) => {
                                    event.currentTarget.onerror = null;
                                    event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entry.driverName)}&background=111827&color=ffffff&size=128&bold=true`;
                                  }}
                                />
                              </button>
                            ) : (
                              <img
                                src={driverImageUrl(entry.driverName)}
                                alt={entry.driverName}
                                className="lrDriverThumb"
                                loading="lazy"
                                onError={(event) => {
                                  event.currentTarget.onerror = null;
                                  event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entry.driverName)}&background=111827&color=ffffff&size=128&bold=true`;
                                }}
                              />
                            )}
                            <span className="lrDriverName">
                              {typeof onOpenDriver === "function" ? (
                                <button
                                  type="button"
                                  className="driverInlineButton lrNameButton"
                                  onClick={() => onOpenDriver(entry.driverName)}
                                >
                                  <span className="lrDriverSurname">{entry.driverName}</span>
                                  <span className="lrConstructor muted">{entry.teamName || "-"}</span>
                                </button>
                              ) : (
                                <>
                                  <span className="lrDriverSurname">{entry.driverName}</span>
                                  <span className="lrConstructor muted">{entry.teamName || "-"}</span>
                                </>
                              )}
                            </span>
                            <span className="lrPoints">{formatFantasyPoints(entry.score)} {pointsSuffix}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
                ? t("main.nextRaceTitleWithName", {
                    flag: countryFlag(nextRace.country_code),
                    raceName: nextRace.name,
                    round: nextRace.round,
                  })
                : t("main.nextRaceFallback")}
            </span>
            <span className="accordionChevron">{nextRaceOpen ? "▲" : "▼"}</span>
          </button>

          {nextRaceOpen && (
            <div className="accordionBody card">
              {nextRace && (
                <div className="lastRaceHero">
                  {nextRaceTrackImage ? (
                    <TrackImageLightbox
                      src={`/tracks_pictures/${nextRaceTrackImage}`}
                      alt={nextRace.name}
                      imageClassName="lastRaceTrackImage"
                    />
                  ) : (
                    <div className="lastRaceTrackPlaceholder">🏁</div>
                  )}
                  <div className="lastRaceInfo">
                    <h3>{nextRace.name}</h3>
                    <p className="muted">
                      {t("main.roundDate", {
                        round: nextRace.round,
                        date: formatDate(nextRace.date, dateLocale),
                      })}
                    </p>
                  </div>
                </div>
              )}
              {recommendedTeams.length === 0 && (
                <p className="muted">{t("main.noRecommendations")}</p>
              )}
              {recommendedTeams.length > 0 && (
                <TeamRecommendations
                  teams={recommendedTeams}
                  onDriverClick={onOpenDriver}
                  onConstructorClick={onOpenConstructor}
                />
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
                  onToggleDriver={(driverName) => onToggleDriver(nextRace.name, driverName)}
                  onSelectTeam={(teamName) => onSelectTeam(nextRace.name, teamName)}
                  summary={nextRaceSummary}
                />
              )}
            </div>
          )}
        </section>

        <section className="row standingsGrid">
          <StandingsTable
            title={t("main.driverStandings")}
            rows={driverStandings}
            type="driver"
            onDriverClick={onOpenDriver}
          />
          <StandingsTable
            title={t("main.constructorStandings")}
            rows={constructorStandings}
            type="constructor"
            onConstructorClick={onOpenConstructor}
          />
        </section>

        {/* ── Tutte le gare ── */}
        <section className="card">
          <h2>{t("main.allRaces")}</h2>
          <div className="raceGrid">
            {races.map((race) => {
              const slug = raceSlug(race.name);
              const isPast = new Date(race.date) < today;
              const isNext = nextRace && race.round === nextRace.round;
              const podium = podiumByRound[Number(race.round)] || null;
              const hasCompletePodium = Boolean(podium?.[1] && podium?.[2] && podium?.[3]);
              return (
                <button
                  key={`${race.round}-${race.name}`}
                  className={`raceCard ${isNext ? "raceCardNext" : ""} ${isPast ? "raceCardPast" : ""}`}
                  onClick={() => onNavigate(`${raceBasePath}/${slug}`)}
                  aria-label={t("main.openRaceAria", { raceName: race.name })}
                >
                  <div className="raceTop">
                    <span>{countryFlag(race.country_code)}</span>
                    <span>{`${t("common.round")} ${race.round}`}</span>
                  </div>
                  <strong>{race.name}</strong>
                  <div className="muted">{formatDate(race.date, dateLocale)}</div>
                  {isNext && <div className="raceNextLabel">{t("main.nextBadge")}</div>}
                  {isPast && hasCompletePodium && (
                    <div className="racePodium" aria-label={t("main.podiumAria", { raceName: race.name })}>
                      {[1, 2, 3].map((position) => (
                        <div key={`podium-${race.round}-${position}`} className={`racePodiumRow podium${position}`}>
                          <span className="racePodiumMedal" aria-hidden="true">{PODIUM_MEDALS[position]}</span>
                          <span className="racePodiumDriver">{driverDisplayName(podium[position])}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

      </main>
    </>
  );
}
