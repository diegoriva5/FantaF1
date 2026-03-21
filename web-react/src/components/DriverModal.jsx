import React from "react";
import "../styles/DriverModal.css";

const DriverModal = ({ driver, onClose }) => {
  if (!driver) return null;
  return (
    <div className="driver-modal-overlay" onClick={onClose}>
      <div className="driver-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="modal-image">
          <img src={"/src/assets/driver-placeholder.png"} alt={driver.name} />
        </div>
        <h2>{driver.name}</h2>
        <p className="modal-nationality">{driver.nationality}</p>
        <p className="modal-titles">🏆 {driver.titles} World Titles</p>
        <p className="modal-bio">{driver.bio}</p>
        <div className="modal-highlights">
          <strong>Career Highlights:</strong>
          <p>{driver.highlights}</p>
        </div>
      </div>
    </div>
  );
};

export default DriverModal;
