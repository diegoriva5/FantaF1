import React from "react";
import DriverCard from "./DriverCard";
import "../styles/GenerationSection.css";

const GenerationSection = ({ era, description, drivers, onDriverClick }) => (
  <section className="generation-section">
    <h2 className="generation-title">{era}</h2>
    <p className="generation-description">{description}</p>
    <div className="drivers-grid">
      {drivers.map((driver, idx) => (
        <DriverCard key={driver.name + idx} driver={driver} onClick={() => onDriverClick(driver)} />
      ))}
    </div>
  </section>
);

export default GenerationSection;
