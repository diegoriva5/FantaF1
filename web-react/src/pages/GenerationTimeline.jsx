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
        <span className="topbarTitle">{t ? t(eraData.titleKey) : eraData.titleKey}</span>
        <LanguageSwitcher />
      </header>
      <section style={{ paddingTop: "1.5rem" }}>
        <h1>{t(eraData.titleKey)}</h1>
        <p className="timeline-description">{t(eraData.descriptionKey)}</p>
      </section>
      <div className="timeline-container">
        {eraData.drivers.map((driver, idx) => (
          <div className="timeline-driver" key={driver.name + idx}>
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
                    <span className="timeline-driver-titles-large">🏆 {driver.titles}</span>
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
