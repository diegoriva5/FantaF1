import { countryFlag, formatDate, driverImageUrl } from "../utils/format";
import { CIRCUIT_REF_TO_TRACK_IMAGE, LIVE_TRACK_META } from "../data/constants";
import { buildRaceResults } from "../utils/raceData";
import TeamRecommendations from "./TeamRecommendations";
import DriverSelectionPanel from "./DriverSelectionPanel";

export default function RaceDetailPage({
  data,
  raceForPage,
  liveRaceRows,
  detailTeamsOpen,
  setDetailTeamsOpen,
  selectedDrivers,
  selectedTeam,
  onToggleDriver,
  onSelectTeam,
  summary,
  driverNames,
  teamNames,
  onNavigateBack,
  onOpenDriver,
  onOpenConstructor,
}) {
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

  return (
    <>
      <header className="topbar">
        <button className="backButton" onClick={onNavigateBack}>
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
                      {typeof onOpenDriver === "function" ? (
                        <button
                          type="button"
                          className="driverInlineButton"
                          onClick={() => onOpenDriver(result.driver_surname)}
                          aria-label={`Apri profilo pilota ${result.driver_surname}`}
                        >
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
                        </button>
                      ) : (
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
                      )}
                      <span className="lrDriverName">
                        {typeof onOpenDriver === "function" ? (
                          <button
                            type="button"
                            className="driverInlineButton lrNameButton"
                            onClick={() => onOpenDriver(result.driver_surname)}
                          >
                            <span className="lrDriverSurname">{result.driver_surname}</span>
                            <span className="lrConstructor muted">{result.constructor_name}</span>
                          </button>
                        ) : (
                          <>
                            <span className="lrDriverSurname">{result.driver_surname}</span>
                            <span className="lrConstructor muted">{result.constructor_name}</span>
                          </>
                        )}
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
                  <TeamRecommendations
                    teams={teams}
                    onDriverClick={onOpenDriver}
                    onConstructorClick={onOpenConstructor}
                  />
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
              onToggleDriver={onToggleDriver}
              onSelectTeam={onSelectTeam}
              summary={summary}
            />
          </>
        )}
      </main>
    </>
  );
}
