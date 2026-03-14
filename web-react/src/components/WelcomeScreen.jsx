export default function WelcomeScreen({ isLeavingWelcome, onStartClick }) {
  return (
    <main className={`welcomeScreen ${isLeavingWelcome ? "welcomeExit" : ""}`}>
      <div className="welcomeContent">
        <div className="welcomeBrand">
          <h1>Benvenuto al FantaF1</h1>
          <span className="welcomeAccent" aria-hidden="true" />
        </div>
      </div>
      <img src="/f1-logo.png" alt="Formula 1" className="welcomeLogo" />
      <div className="welcomeFooter">
        <button className="startButton" onClick={onStartClick}>
          Iniziamo!
        </button>
      </div>
    </main>
  );
}
