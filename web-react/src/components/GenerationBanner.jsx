import React from "react";
import { useI18n } from "../i18n";
import "../styles/GenerationBanner.css";

const GenerationBanner = ({ eraKey, descriptionKey, onClick }) => {
  const { t } = useI18n();
  return (
    <div className="generation-banner" onClick={onClick} tabIndex={0} role="button">
      <div className="banner-content">
        <h2 className="banner-title">{t(eraKey)}</h2>
        <p className="banner-description">{t(descriptionKey)}</p>
        <span className="banner-action">{t("historicDrivers.discover")}</span>
      </div>
    </div>
  );
};

export default GenerationBanner;
