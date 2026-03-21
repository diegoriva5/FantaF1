import React from "react";
import { useNavigate } from "react-router-dom";
import historicDrivers from "../data/historicDrivers.json";
import GenerationBanner from "../components/GenerationBanner";
import "../styles/HistoricDrivers.css";

function slugifyEra(era) {
  return era.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const HistoricDrivers = () => {
  const navigate = useNavigate();
  return (
    <main className="historic-drivers-page">
      <header>
        <h1>Formula 1 Historic Drivers</h1>
        <p className="intro">The history of Formula 1 is not defined by decades, but by revolutions.</p>
      </header>
      <div className="generations-list">
        {historicDrivers.map((gen, idx) => (
          <GenerationBanner
            key={gen.era + idx}
            era={gen.era}
            description={gen.description}
            onClick={() => navigate(`/historic-drivers/${slugifyEra(gen.era)}`)}
          />
        ))}
      </div>
    </main>
  );
};

export default HistoricDrivers;
