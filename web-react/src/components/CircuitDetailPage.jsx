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
        <span className="topbarTitle">{t("circuits.seasonCircuitsTitle")}</span>
        <LanguageSwitcher />
      </header>
      <main className="container appStage">
        {!!error && <section className="card">{t("common.errorPrefix", { message: error })}</section>}
        {!error && !data && <section className="card">{t("common.loadingData")}</section>}
        {!error && data && !circuit && <section className="card">{t("circuits.notFound")}</section>}

        {!error && data && circuit && (
          <>
            <section className="card circuitDetailHeroModern">
              <div className="circuitDetailHeroHeader">
                <h2 className="circuitDetailName">{circuit.circuitName}</h2>
                <div className="circuitDetailBadge">{countryFlag(circuit.countryCode)} {circuit.country || t("common.unavailable")}</div>
                <div className="circuitDetailDate">{t("circuits.nextRaceDate", { date: formatDate(circuit.rounds[0].date, dateLocale) })}</div>
              </div>
              <div className="circuitDetailHeroBody">
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
                <div className="circuitDetailMeta">
                  {story.technicalData && story.technicalData.trim() !== "" && (
                    <div className="circuitMetaRow">
                      {(() => {
                        // Parsing technicalData in oggetti {label, value}
                        const items = story.technicalData.split('\n').map((line) => {
                          const sepIdx = line.indexOf(':');
                          let label = line, value = '';
                          if (sepIdx !== -1) {
                            label = line.slice(0, sepIdx).trim();
                            value = line.slice(sepIdx + 1).trim();
                          }
                          return { label, value };
                        });

                        // Mappa delle label per lingua
                        const LABELS_MAP = {
                          it: {
                            'Città': 'Città',
                            'Lunghezza': 'Lunghezza',
                            'Giri di gara': 'Giri di gara',
                            'Curve': 'Curve',
                            'Primo GP di Formula 1': 'Primo GP di Formula 1',
                            'Record pista': 'Record pista',
                          },
                          en: {
                            'Città': 'City',
                            'Lunghezza': 'Length',
                            'Giri di gara': 'Race laps',
                            'Curve': 'Turns',
                            'Primo GP di Formula 1': 'First F1 GP',
                            'Record pista': 'Lap record',
                          },
                          fr: {
                            'Città': 'Ville',
                            'Lunghezza': 'Longueur',
                            'Giri di gara': 'Tours de course',
                            'Curve': 'Virages',
                            'Primo GP di Formula 1': 'Premier GP de F1',
                            'Record pista': 'Record du tour',
                          },
                          es: {
                            'Città': 'Ciudad',
                            'Lunghezza': 'Longitud',
                            'Giri di gara': 'Vueltas de carrera',
                            'Curve': 'Curvas',
                            'Primo GP di Formula 1': 'Primer GP de F1',
                            'Record pista': 'Récord de vuelta',
                          },
                          de: {
                            'Città': 'Stadt',
                            'Lunghezza': 'Länge',
                            'Giri di gara': 'Rennrunden',
                            'Curve': 'Kurven',
                            'Primo GP di Formula 1': 'Erster F1 GP',
                            'Record pista': 'Streckenrekord',
                          },
                        };
                        // Ordine desiderato (italiano base)
                        const order = [
                          'Città',
                          'Lunghezza',
                          'Giri di gara',
                          'Curve',
                          'Primo GP di Formula 1',
                          'Record pista',
                        ];
                        // Lingua attiva (default it)
                        const lang = (typeof language === 'string' ? language : 'it').toLowerCase();
                        const labels = LABELS_MAP[lang] || LABELS_MAP['it'];
                        // Ordina e traduci
                        const sorted = order.map((baseLabel) => {
                          const item = items.find(x => x.label === baseLabel);
                          if (!item) return null;
                          // Custom rendering for Lap Record
                          if (baseLabel === 'Record pista' && item.value) {
                            // Match formato: tempo (anno, nome)
                            // Es: 1:19.813 (2024, Charles Leclerc)
                            const match = item.value.match(/^([0-9:.]+) \((\d{4}), ([^)]+)\)$/);
                            if (match) {
                              const [, time, year, driver] = match;
                              return {
                                ...item,
                                custom: (
                                  <>
                                    <span className="muted">{labels[baseLabel] || baseLabel}</span>
                                    <div style={{fontWeight:'bold'}}>{driver} ({year})</div>
                                    <div>{time}</div>
                                  </>
                                )
                              };
                            }
                          }
                          return {
                            ...item,
                            label: labels[baseLabel] || baseLabel,
                          };
                        });
                        return sorted.filter(Boolean).map((item, idx) => (
                          <div className="circuitMetaItem" key={idx}>
                            {item.custom ? item.custom : <><span className="muted">{item.label}</span><strong>{item.value}</strong></>}
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Circuit story content directly on page background */}
            {story.isFallback && <span className="circuitStoryBadge">{t("circuits.storyFallback")}</span>}
            <div className="circuitStoryHeadline">
              <span>{story.headline}</span>
            </div>
            <div className="circuitStoryGridModern">
              <div className="circuitInfoCard">
                <span className="circuitInfoIcon">📝</span>
                <div>
                  <h3>{t("circuits.presentation")}</h3>
                  <p>{story.presentation || <span className="muted">{t("common.unavailable")}</span>}</p>
                </div>
              </div>
              <div className="circuitInfoCard">
                <span className="circuitInfoIcon">🏁</span>
                <div>
                  <h3>{t("circuits.trackFeatures")}</h3>
                  <p>{story.trackFeatures || <span className="muted">{t("common.unavailable")}</span>}</p>
                </div>
              </div>
              <div className="circuitInfoCard">
                <span className="circuitInfoIcon">🔄</span>
                <div>
                  <h3>{t("circuits.overtakingSpots")}</h3>
                  {story.overtakingSpots ? (
                    <ul>
                      {story.overtakingSpots.split('\n').map((spot, idx) => (
                        <li key={idx}>{spot}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="muted">{t("common.overtakingSpotsUnavailable")}</span>
                  )}
                </div>
              </div>
              <div className="circuitInfoCard">
                <span className="circuitInfoIcon">🚩</span>
                <div>
                  <h3>{t("circuits.iconicCorners")}</h3>
                  {story.iconicCorners ? (
                    <ul>
                      {story.iconicCorners.split('\n').map((corner, idx) => (
                        <li key={idx}>{corner}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="muted">{t("common.unavailable")}</span>
                  )}
                </div>
              </div>
              <div className="circuitInfoCard">
                <span className="circuitInfoIcon">🏆</span>
                <div>
                  <h3>{t("circuits.historicalMoments")}</h3>
                  {story.historicalMoments ? (
                    <ul>
                      {story.historicalMoments.split('\n').map((moment, idx) => (
                        <li key={idx}>{moment}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="muted">{t("common.unavailable")}</span>
                  )}
                </div>
              </div>
              <div className="circuitInfoCard">
                <span className="circuitInfoIcon">💡</span>
                <div>
                  <h3>{t("circuits.curiosities")}</h3>
                  <p>{story.curiosities || <span className="muted">{t("common.unavailable")}</span>}</p>
                </div>
              </div>
            </div>

            {/* Sezioni ranking e team consigliati rimosse su richiesta */}
          </>
        )}
      </main>
    </>
  );
}
