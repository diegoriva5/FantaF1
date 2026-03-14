import { countryFlag, driverImageUrl } from "../utils/format";
import { DRIVER_META } from "../data/constants";

export default function TeamRecommendations({ teams, onDriverClick, onConstructorClick }) {
  if (teams.length === 0) {
    return <p className="muted">Nessuna raccomandazione disponibile.</p>;
  }

  return (
    <div className="top3Cards">
      {teams.map((team, index) => (
        <article key={`top3-${index}-${team.constructor}`} className="top3TeamCard">
          <div className="top3TeamHeader">
            {typeof onConstructorClick === "function" ? (
              <button
                type="button"
                className="driverInlineButton top3ConstructorButton"
                onClick={() => onConstructorClick(team.constructor)}
              >
                <span className="top3Title">#{index + 1} {team.constructor}</span>
              </button>
            ) : (
              <div className="top3Title">
                #{index + 1} {team.constructor}
              </div>
            )}
            <div className="top3Probability">{team.probability}%</div>
          </div>
          <div className="top3Meta muted">
            Costo: {team.total_price}M · Budget residuo: {team.budget_left}M
          </div>
          <div className="top3DriverGrid">
            {team.drivers.map((driverName) => {
              const meta = DRIVER_META[driverName] || { number: "--", countryCode: "" };
              const isClickable = typeof onDriverClick === "function";
              const content = (
                <>
                  <div className="f1DriverTop">
                    <span className="f1DriverNumber">#{meta.number}</span>
                    <span className="f1DriverFlag">{countryFlag(meta.countryCode)}</span>
                  </div>
                  <img
                    src={driverImageUrl(driverName)}
                    alt={driverName}
                    className="f1DriverImage"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driverName)}&background=111827&color=ffffff&size=256&bold=true`;
                    }}
                  />
                  <div className="f1DriverName">{driverName}</div>
                </>
              );

              if (isClickable) {
                return (
                  <button
                    type="button"
                    key={`${team.constructor}-${driverName}`}
                    className="f1DriverCard f1DriverCardButton"
                    onClick={() => onDriverClick(driverName)}
                  >
                    {content}
                  </button>
                );
              }

              return (
                <article key={`${team.constructor}-${driverName}`} className="f1DriverCard">
                  {content}
                </article>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
