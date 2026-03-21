import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import historicDrivers from "../data/historicDrivers.json";
import "../styles/GenerationTimeline.css";

function getEraData(eraSlug) {
  return historicDrivers.find(
    (gen) =>
      gen.era.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === eraSlug
  );
}

function sortDriversByDebut(drivers) {
  // Assume each driver has a debutYear property (add to JSON if missing)
  return [...drivers].sort((a, b) => (a.debutYear || 9999) - (b.debutYear || 9999));
}

const GenerationTimeline = () => {
  const { eraSlug } = useParams();
  const navigate = useNavigate();
  const eraData = getEraData(eraSlug);

  if (!eraData) {
    return <div className="timeline-not-found">Era non trovata.</div>;
  }

  const sortedDrivers = sortDriversByDebut(eraData.drivers);

  return (
    <main className="generation-timeline-page">
      <button className="timeline-back" onClick={() => navigate(-1)}>&larr; Torna alle ere</button>
      <h1 className="timeline-title">{eraData.era}</h1>
      <p className="timeline-description">{eraData.description}</p>
      <div className="timeline-container">
        {sortedDrivers.map((driver, idx) => (
          <div className="timeline-driver" key={driver.name + idx}>
            <div className="timeline-dot" />
            <div className="timeline-driver-content">
              <div className="timeline-driver-header">
                <img src={"/src/assets/driver-placeholder.png"} alt={driver.name} className="timeline-driver-img" />
                <div>
                  <h3>{driver.name}</h3>
                  <span className="timeline-driver-year">Debut: {driver.debutYear || "?"}</span>
                </div>
              </div>
              <div className="timeline-driver-details">
                <span className="timeline-driver-nat">{driver.nationality}</span>
                <span className="timeline-driver-titles">🏆 {driver.titles} titoli</span>
                <p className="timeline-driver-bio">{driver.bio}</p>
                <div className="timeline-driver-highlights">{driver.highlights}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GenerationTimeline;
