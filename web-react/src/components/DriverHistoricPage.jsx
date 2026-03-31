




import React, { useEffect, useState } from "react";
import { HISTORIC_ERAS } from "../data/historicEras";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "../i18n";
import "../styles/DriverHistoricPage.css";

function DriverHistoricPage({ eraSlug, driverSlug, navigate }) {
  const { t, language } = useI18n();
  const [driver, setDriver] = useState(null);
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const [era, setEra] = useState(null);

  function getTranslated(val) {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[language] || val.it || Object.values(val)[0];
  }

  useEffect(() => {
    async function loadData() {
      try {
        const foundEra = HISTORIC_ERAS.find(e => e.slug === eraSlug);
        setEra(foundEra || null);
        const mod = await import(`../i18n/Historic-Drivers/driver_${driverSlug}.json`);
        setDriver(mod.default || mod);
        setSections((mod.default || mod).sections || []);
        setActiveSection(0);
      } catch (e) {
        setDriver(null);
        setSections([]);
      }
    }
    loadData();
  }, [eraSlug, driverSlug, language]);

  if (!driver) {
    return <div className="driver-historic-root">Loading...</div>;
  }

  return (
    <main>
      <header className="topbar">
        <button
          type="button"
          className="backButton"
          onClick={() => navigate ? navigate(`/historic-drivers/${eraSlug}`) : window.history.back()}
        >
          ← {t ? t("common.back") : "Indietro"}
        </button>
        <span className="topbarTitle">La Storia</span>
        <LanguageSwitcher />
      </header>
      <div className="driver-historic-rows-layout">
        {/* Prima riga: foto+nome (sx) | coppe (dx) */}
        <div className="driver-historic-row driver-historic-row-top" style={{ alignItems: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 320 }}>
            <img
              className="driver-historic-photo driver-historic-photo-large"
              src={driver?.image}
              alt={typeof driver?.name === 'object' ? `${driver?.name.first} ${driver?.name.last}` : driver?.name}
              style={{ marginTop: 40 }}
            />
            <div className="driver-historic-name-small" style={{ marginTop: 18, fontSize: '1.25rem', fontWeight: 900, color: '#ffd447', letterSpacing: 1.1, textTransform: 'uppercase' }}>
              {typeof driver?.name === 'object'
                ? `${driver?.name.first} ${driver?.name.last}`
                : driver?.name}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 900 }}>
            <div className="driver-historic-titles driver-historic-titles-side driver-historic-titles-centered-vertical" style={{ justifyContent: 'center', alignItems: 'center', maxWidth: 900, width: '100%' }}>
              {(driver.titles_years || []).map((year, idx) => (
                <div className="driver-historic-trophy" key={year}>
                  <span className="trophy-emoji" role="img" aria-label="Trophy">🏆</span>
                  <span className="trophy-year">{year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Seconda riga: bottoni tabs (sx, colonna) | contenuto (dx) */}
        <div className="driver-historic-row driver-historic-row-bottom" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', maxWidth: '100vw', gap: 0 }}>
          <div className="driver-historic-tabs" style={{ minWidth: 270, maxWidth: 340, width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginRight: 0 }}>
            {sections.map((section, idx) => (
              <button
                key={section.type + idx}
                onClick={() => setActiveSection(idx)}
                className={
                  'driver-historic-tab' + (activeSection === idx ? ' active' : '')
                }
                aria-selected={activeSection === idx}
              >
                {getTranslated(section.title)}
              </button>
            ))}
          </div>
          <div className="driver-historic-content driver-historic-content-below-tabs" style={{ flex: 1, marginLeft: 32, minWidth: 0, maxWidth: 900, width: '100%' }}>
            {sections[activeSection] && (
              <section key={sections[activeSection].type + activeSection} style={{ marginTop: 0 }}>
                {Array.isArray(sections[activeSection].content?.[language] || sections[activeSection].content?.it) ? (
                  <ul style={{ color: '#fff4ef', paddingLeft: 24 }}>
                    {(sections[activeSection].content?.[language] || sections[activeSection].content?.it).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#fff4ef', whiteSpace: 'pre-line', textAlign: 'justify' }}>{getTranslated(sections[activeSection].content)}</p>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DriverHistoricPage;

