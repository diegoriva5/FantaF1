
import React from "react";
import { HISTORIC_ERAS } from "../data/historicEras";
import LanguageSwitcher from "./LanguageSwitcher";
import "../styles/DriverModal.css";

function unslugify(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}

const DriverHistoricPage = ({ eraSlug, driverSlug, navigate }) => {
  const era = HISTORIC_ERAS.find(e => e.key === eraSlug);
  if (!era) return <div>Era non trovata.</div>;
  const driver = era.drivers.find(d => d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === driverSlug);
  if (!driver) return <div>Pilota non trovato.</div>;

  return (
    <main className="generation-timeline-page">
      <header className="topbar">
        <button
          type="button"
          className="backButton"
          onClick={() => navigate(`/historic-drivers/${eraSlug}`)}
        >
          ← Torna all'era
        </button>
        <span className="topbarTitle">{driver.name}</span>
        <LanguageSwitcher />
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '60vh', paddingTop: 32 }}>
        <div className="driver-modal" style={{ maxWidth: 420, background: '#1a1a1a', borderRadius: 16, padding: 32, position: 'relative', width: '100%' }}>
          <div className="modal-image" style={{ textAlign: 'center', marginBottom: 18 }}>
            <img src={driver.image ? `/drivers_pictures/${driver.image}` : "/src/assets/driver-placeholder.png"} alt={driver.name} style={{ width: 160, borderRadius: 12 }} />
          </div>
          <h2 style={{ textAlign: 'center', color: '#ffd447', fontSize: '2.1rem', marginBottom: 8 }}>{driver.name}</h2>
          <p className="modal-nationality" style={{ textAlign: 'center', color: '#fff4ef', fontWeight: 600 }}>{driver.nationality}</p>
          <p className="modal-titles" style={{ textAlign: 'center', color: '#ffd447', fontWeight: 700, fontSize: '1.2rem' }}>🏆 {driver.titles} World Titles</p>
          <p className="modal-debut" style={{ textAlign: 'center', color: '#ffe9a7', fontWeight: 600 }}><strong>Debut:</strong> {driver.debutYear}</p>
          {driver.titlesYears && driver.titlesYears.length > 0 && (
            <p style={{ textAlign: 'center', color: '#ffd447', fontWeight: 600, marginTop: 8 }}>Titoli: {driver.titlesYears.join(' - ')}</p>
          )}
          {/* Qui puoi aggiungere bio o highlights se disponibili */}
        </div>
      </div>
    </main>
  );
};

export default DriverHistoricPage;
