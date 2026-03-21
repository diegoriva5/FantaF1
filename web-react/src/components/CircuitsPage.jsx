import { useMemo } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import TrackImageLightbox from "./TrackImageLightbox";
import { buildCircuitCatalog } from "../utils/circuits";
import { countryFlag, formatDate } from "../utils/format";
import { useI18n } from "../i18n";

export default function CircuitsPage({ data, error, onNavigateHome, onOpenCircuit }) {
  const { t, dateLocale } = useI18n();

  const circuits = useMemo(() => buildCircuitCatalog(data), [data]);

  return (
    <>
      <header className="topbar">
        <button type="button" className="backButton" onClick={onNavigateHome}>
          ← Home
        </button>
        <span className="topbarTitle">{t("circuits.title")}</span>
        <LanguageSwitcher />
      </header>
      <main className="container appStage">
        {!!error && <section className="card">{t("common.errorPrefix", { message: error })}</section>}
        {!error && !data && <section className="card">{t("common.loadingData")}</section>}

        {!error && data && (
          <>
            <section className="card circuitsIntroCard">
              <h2>{t("circuits.introTitle")}</h2>
              <p className="muted">{t("circuits.introDescription")}</p>
            </section>

            {circuits.length === 0 && <section className="card muted">{t("circuits.empty")}</section>}

            {circuits.length > 0 && (
              <section className="circuitsGrid portalCircuitsGrid" aria-label={t("circuits.gridAria")}> 
                {circuits.map((circuit) => {
                  const firstRound = circuit.rounds[0] || null;
                  return (
                    <article key={circuit.circuitRef} className="card circuitSummaryCard">
                      <div className="circuitSummaryVisual">
                        {circuit.image ? (
                          <img
                            src={`/tracks_pictures/${circuit.image}`}
                            alt={circuit.circuitName}
                            className="circuitSummaryImage"
                            loading="lazy"
                          />
                        ) : (
                          <div className="lastRaceTrackPlaceholder">🏁</div>
                        )}
                      </div>

                      <div className="circuitSummaryBody">
                        <div className="circuitSummaryMeta">
                          <span>{countryFlag(circuit.countryCode)}</span>
                          <span>{circuit.country || t("common.unavailable")}</span>
                          {firstRound && (
                            <span className="circuitRoundBadge">
                              {t("circuits.roundTag", { round: firstRound.round })}
                            </span>
                          )}
                        </div>
                        <h3 className="circuitSummaryTitle">{circuit.circuitName}</h3>
                        {circuit.story && (
                          <p className="muted circuitSummaryStory">{circuit.story}</p>
                        )}
                        <button className="circuitSummaryAction" onClick={() => onOpenCircuit(circuit.circuitRef)}>
                          {t("circuits.openCircuit")}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </section>
            )}
          </>
        )}
      </main>
    </>
  );
}
