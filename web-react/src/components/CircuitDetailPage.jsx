import { useMemo } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import TeamRecommendations from "./TeamRecommendations";
import TrackImageLightbox from "./TrackImageLightbox";
import { useI18n } from "../i18n";
import { countryFlag, formatDate } from "../utils/format";
import { buildCircuitCatalog, findCircuitByRef } from "../utils/circuits";
import { getCircuitStory } from "../data/circuitStories";

function formatStrength(value) {
  if (!Number.isFinite(value)) return "0.000";
  return value.toFixed(3);
}

export default function CircuitDetailPage({
  data,
  error,
  circuitRef,
  onNavigateBack,
  onNavigateHome,
}) {
  const { t, dateLocale, language } = useI18n();

  const circuitCatalog = useMemo(() => buildCircuitCatalog(data), [data]);
  const circuit = useMemo(
    () => findCircuitByRef(circuitCatalog, circuitRef),
    [circuitCatalog, circuitRef],
  );

  const story = useMemo(
    () => getCircuitStory(circuitRef, language, circuit?.circuitName),
    [circuitRef, language, circuit?.circuitName],
  );


  return (
    <>
      <header className="topbar">
        <button className="backButton" onClick={onNavigateBack}>
          {t("circuits.backToList")}
        </button>
        <button className="backButton" onClick={onNavigateHome}>
           Home
        </button>
        <span className="topbarTitle">{t("circuits.detailTitle")}</span>
        <LanguageSwitcher />
      </header>
      <main className="container appStage">
        {!!error && <section className="card">{t("common.errorPrefix", { message: error })}</section>}
        {!error && !data && <section className="card">{t("common.loadingData")}</section>}
        {!error && data && !circuit && <section className="card">{t("circuits.notFound")}</section>}

        {!error && data && circuit && (
          <>
            <section className="card circuitDetailHero">
              <div className="circuitDetailVisual">
                {circuit.image ? (
                  <TrackImageLightbox
                    src={`/tracks_pictures/${circuit.image}`}
                    alt={circuit.circuitName}
                    imageClassName="circuitDetailImage"
                  />
                ) : (
                  <div className="lastRaceTrackPlaceholder">🏁</div>
                )}
              </div>

              <div className="circuitDetailInfo">
                <div className="lastRaceBadge">
                  {countryFlag(circuit.countryCode)} {circuit.country || t("common.unavailable")}
                </div>
                <h2>{circuit.circuitName}</h2>
                <p className="muted">
                  {t("circuits.nextRaceDate", {
                    date: formatDate(circuit.rounds[0].date, dateLocale)
                  })}
                </p>
                {story.technicalData && story.technicalData.trim() !== "" && (
                  <div className="circuitMetaRow">
                    {story.technicalData.split('\n').map((line, idx) => {
                      const sepIdx = line.indexOf(':');
                      let label = line, value = '';
                      if (sepIdx !== -1) {
                        label = line.slice(0, sepIdx).trim();
                        value = line.slice(sepIdx + 1).trim();
                      }
                      return (
                        <div className="circuitMetaItem" key={idx}>
                          <span className="muted">{label}</span>
                          <strong>{value}</strong>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            <section className="card circuitStoryCard">
              <div className="circuitStoryHeader">
                {story.isFallback && <span className="circuitStoryBadge">{t("circuits.storyFallback")}</span>}
              </div>
              <div className="circuitStoryHeadline">
                <span>{story.headline}</span>
              </div>
              <div className="circuitStoryGrid">
                <div className="circuitStorySection">
                  <strong>📝 {t("circuits.presentation")}</strong>
                  <p>{story.presentation || <span className="muted">{t("common.unavailable")}</span>}</p>
                </div>
                <div className="circuitStorySection">
                  <strong>🏁 {t("circuits.trackFeatures")}</strong>
                  <p>{story.trackFeatures || <span className="muted">{t("common.unavailable")}</span>}</p>
                </div>
                <div className="circuitStorySection">
                  <strong>🔄 {t("circuits.overtakingSpots")}</strong>
                  <p>{story.overtakingSpots || <span className="muted">{t("common.unavailable")}</span>}</p>
                </div>
                <div className="circuitStorySection">
                  <strong>🚩 {t("circuits.iconicCorners")}</strong>
                  <p>{story.iconicCorners || <span className="muted">{t("common.unavailable")}</span>}</p>
                </div>
                <div className="circuitStorySection">
                  <strong>🏆 {t("circuits.historicalMoments")}</strong>
                  <p>{story.historicalMoments || <span className="muted">{t("common.unavailable")}</span>}</p>
                </div>
                <div className="circuitStorySection">
                  <strong>💡 {t("circuits.curiosities")}</strong>
                  <p>{story.curiosities || <span className="muted">{t("common.unavailable")}</span>}</p>
                </div>
              </div>
            </section>

            {/* Sezioni ranking e team consigliati rimosse su richiesta */}
          </>
        )}
      </main>
    </>
  );
}
