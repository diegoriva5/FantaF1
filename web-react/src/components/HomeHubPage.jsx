import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "../i18n";

export default function HomeHubPage({ onOpenFanta, onOpenCircuits, onOpenHistoricDrivers }) {
  const { t } = useI18n();

  return (
    <>
      <header className="topbar">
        <span className="topbarTitle">{t("common.appName")}</span>
        <LanguageSwitcher />
      </header>
      <main className="container appStage">
        <section className="card homeHubHero">
          <p className="homeHubEyebrow">{t("homeHub.eyebrow")}</p>
          <h1>{t("homeHub.title")}</h1>
          <p className="muted homeHubSubtitle">{t("homeHub.subtitle")}</p>
        </section>

        <section className="homeHubGrid portalLayout" aria-label={t("homeHub.ariaLabel")}> 
          <article className="card homeHubCard homeHubCardFanta">
            <div className="homeHubCardTop">
              <span className="homeHubBadge">{t("homeHub.fantaBadge")}</span>
            </div>
            <h2>{t("homeHub.fantaTitle")}</h2>
            <p className="muted">{t("homeHub.fantaDescription")}</p>
            <button type="button" className="homeHubActionButton" onClick={onOpenFanta}>
              {t("homeHub.fantaAction")}
            </button>
          </article>

          <article className="card homeHubCard homeHubCardCircuits">
            <div className="homeHubCardTop">
              <span className="homeHubBadge">{t("homeHub.circuitsBadge")}</span>
            </div>
            <h2>{t("homeHub.circuitsTitle")}</h2>
            <p className="muted">{t("homeHub.circuitsDescription")}</p>
            <button type="button" className="homeHubActionButton" onClick={onOpenCircuits}>
              {t("homeHub.circuitsAction")}
            </button>
          </article>

          <article className="card homeHubCard homeHubCardHistoricDrivers">
            <div className="homeHubCardTop">
              <span className="homeHubBadge">Historic</span>
            </div>
            <h2>Historic Drivers</h2>
            <p className="muted">Explore F1's greatest drivers by generation.</p>
            <button type="button" className="homeHubActionButton" onClick={onOpenHistoricDrivers}>View Historic Drivers</button>
          </article>
        </section>
      </main>
    </>
  );
}
