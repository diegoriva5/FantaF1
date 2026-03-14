import { countryFlag, formatDate, driverImageUrl, raceSlug, formatFantasyPoints } from "../utils/format";
import { CIRCUIT_REF_TO_TRACK_IMAGE } from "../data/constants";
import TeamRecommendations from "./TeamRecommendations";
import DriverSelectionPanel from "./DriverSelectionPanel";
import StandingsTable from "./StandingsTable";
import { computeFormationSummary } from "../utils/standings";

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
}) {
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
                          {typeof onOpenDriver === "function" ? (
                            <button
                              type="button"
                              className="driverInlineButton"
                              onClick={() => onOpenDriver(r.driver_surname)}
                              aria-label={`Apri profilo pilota ${r.driver_surname}`}
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
                    <h4>Classifica Fantasy</h4>
                    {lastRaceFantasyStandings.length === 0 && (
                      <p className="muted">Punteggi Fantasy non disponibili per questa gara.</p>
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
                                aria-label={`Apri profilo pilota ${entry.driverName}`}
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
                            <span className="lrPoints">{formatFantasyPoints(entry.score)} pt</span>
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
            title="Classifica piloti"
            rows={driverStandings}
            type="driver"
            onDriverClick={onOpenDriver}
          />
          <StandingsTable
            title="Classifica costruttori"
            rows={constructorStandings}
            type="constructor"
            onConstructorClick={onOpenConstructor}
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
                  onClick={() => onNavigate(`/home/${slug}`)}
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
