import React from "react";
import "../styles/GenerationBanner.css";

const GenerationBanner = ({ era, description, onClick }) => (
  <div className="generation-banner" onClick={onClick} tabIndex={0} role="button">
    <div className="banner-content">
      <h2 className="banner-title">{era}</h2>
      <p className="banner-description">{description}</p>
      <span className="banner-action">Scopri i piloti &rarr;</span>
    </div>
  </div>
);

export default GenerationBanner;
