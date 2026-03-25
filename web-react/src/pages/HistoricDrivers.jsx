
import React from "react";
import { HISTORIC_ERAS } from "../data/historicEras";
import GenerationBanner from "../components/GenerationBanner";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useI18n } from "../i18n";
import "../styles/HistoricDrivers.css";

function slugifyEra(era) {
  return era.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}


const HistoricDrivers = ({ navigate }) => {
  const { t } = useI18n ? useI18n() : { t: (x) => x };
  return (
    <main className="historic-drivers-page">
      <header className="topbar">
        <button
          type="button"
          className="backButton"
          onClick={() => navigate("/home")}
        >
          ← {t ? t("common.home") : "Home"}
        </button>
        <span className="topbarTitle">{t ? t("historicDrivers.title") : "Formula 1 Historic Drivers"}</span>
        <LanguageSwitcher />
      </header>
      <section style={{ paddingTop: "1.5rem" }}>
        <h1>{t("historicDrivers.title")}</h1>
        <p className="intro">{t("historicDrivers.intro")}</p>
      </section>
      <div className="generations-list">
        {HISTORIC_ERAS.map((era) => (
          <GenerationBanner
            key={era.key}
            eraKey={era.titleKey}
            descriptionKey={era.descriptionKey}
            onClick={() => navigate(`/historic-drivers/${era.key}`)}
          />
        ))}
      </div>
    </main>
  );
};

export default HistoricDrivers;
