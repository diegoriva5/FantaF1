import { useI18n } from "../i18n";

export default function WelcomeScreen({ isLeavingWelcome, onStartClick }) {
  const { t } = useI18n();

  return (
    <main className={`welcomeScreen ${isLeavingWelcome ? "welcomeExit" : ""}`}>
      <div className="welcomeContent">
        <div className="welcomeBrand">
          <h1>{t("welcome.title")}</h1>
          <span className="welcomeAccent" aria-hidden="true" />
        </div>
      </div>
      <img src="/f1-logo.png" alt="Formula 1" className="welcomeLogo" />
      <div className="welcomeFooter">
        <button className="startButton" onClick={onStartClick}>
          {t("welcome.startButton")}
        </button>
      </div>
    </main>
  );
}
