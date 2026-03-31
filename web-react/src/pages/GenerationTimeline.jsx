import React from "react";
import { driverImageUrl } from "../utils/format";
import { HISTORIC_ERAS } from "../data/historicEras";
import { useI18n } from "../i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";
import "../styles/GenerationTimeline.css";


function getEraData(eraSlug) {
  return HISTORIC_ERAS.find(
    (era) => era.key === eraSlug
  );
}

function sortDriversByDebut(drivers) {
  // Assume each driver has a debutYear property (add to JSON if missing)
  return [...drivers].sort((a, b) => (a.debutYear || 9999) - (b.debutYear || 9999));
}

const GenerationTimeline = ({ eraSlug, navigate }) => {
  const eraData = getEraData(eraSlug);
  const { t } = useI18n ? useI18n() : { t: (x) => x };

  if (!eraData) {
    return <div className="timeline-not-found">Era non trovata.</div>;
  }

  return (
    <main className="generation-timeline-page">
      <header className="topbar">
        <button
          type="button"
          className="backButton"
          onClick={() => navigate("/historic-drivers")}
        >
          ← {t ? t("common.back") : "Torna alle ere"}
        </button>
        <span className="topbarTitle">{t ? t("generationTimeline.topbar") : "Le innovazioni e i campioni"}</span>
        <LanguageSwitcher />
      </header>
      <section style={{ paddingTop: "1.5rem" }}>
        <h1>{t(eraData.titleKey)}</h1>
        <p className="timeline-description">{t(eraData.descriptionKey)}</p>
      </section>
      <div className="timeline-container">
        {eraData.drivers.map((driver, idx) => (
          <div
            className="timeline-driver"
            key={driver.name + idx}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const driverSlug = driver.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              navigate(`/historic-drivers/${eraData.key}/${driverSlug}`);
            }}
            tabIndex={0}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') {
              const driverSlug = driver.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              navigate(`/historic-drivers/${eraData.key}/${driverSlug}`);
            }}}
          >
            <div className="timeline-dot" />
            <div className="timeline-driver-content">
              <div className="timeline-driver-header timeline-driver-header-large">
                <img
                  src={driverImageUrl(driver)}
                  alt={driver.name}
                  className="timeline-driver-img timeline-driver-img-large"
                />
                <div className="timeline-driver-info-large">
                  <h3>{driver.name}</h3>
                  <div className="timeline-driver-details-large">
                    <span className="timeline-driver-nat-large">{driver.nationality}</span>
                    <div className="timeline-driver-meta-row">
                      <span className="timeline-driver-debut-large">Debut <strong>{driver.debutYear}</strong></span>
                    </div>
                    <div className="timeline-driver-titles-block">
                      <span className="timeline-driver-titles-large">
                        <span className="timeline-driver-titles-row">
                          <span className="timeline-driver-titles-number">{driver.titles}</span>
                          <span className="timeline-driver-trophy" role="img" aria-label="trophy">🏆</span>
                        </span>
                        {driver.titles > 0 && driver.titlesYears && (
                          <span className="timeline-driver-titles-years-block">{driver.titlesYears.join(' - ')}</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GenerationTimeline;
