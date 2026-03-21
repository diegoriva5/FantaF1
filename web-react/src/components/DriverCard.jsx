import React from "react";
import "../styles/DriverCard.css";

const DriverCard = ({ driver, onClick }) => (
  <div className="driver-card" onClick={onClick} tabIndex={0} role="button">
    <div className="driver-image">
      {/* Replace with real image if available */}
      <img src={"/src/assets/driver-placeholder.png"} alt={driver.name} />
    </div>
    <div className="driver-info">
      <h3>{driver.name}</h3>
      <p className="driver-nationality">{driver.nationality}</p>
      <p className="driver-titles">🏆 {driver.titles} World Titles</p>
    </div>
  </div>
);

export default DriverCard;
