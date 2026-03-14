import { driverImageUrl, formatPoints, formatSignedDelta } from "../utils/format";

export default function StandingsTable({ title, rows, type, onDriverClick, onConstructorClick }) {
  return (
    <section className="card standingsCard">
      <div className="standingsHeader">
        <h2>{title}</h2>
        <span className="muted">2026 live</span>
      </div>

      {rows.length === 0 && <p className="muted">Classifica non disponibile.</p>}

      {rows.length > 0 && (
        <div className="standingsTable">
          {rows.map((row, index) => (
            <div key={`${title}-${row.name}`} className="standingsRow">
              <span className="standingsPos">{index + 1}</span>

              {type === "driver" && (
                typeof onDriverClick === "function" ? (
                  <button
                    type="button"
                    className="driverInlineButton"
                    onClick={() => onDriverClick(row.name)}
                    aria-label={`Apri profilo pilota ${row.name}`}
                  >
                    <img
                      src={driverImageUrl(row.name)}
                      alt={row.name}
                      className="standingsThumb"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=111827&color=ffffff&size=128&bold=true`;
                      }}
                    />
                  </button>
                ) : (
                  <img
                    src={driverImageUrl(row.name)}
                    alt={row.name}
                    className="standingsThumb"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=111827&color=ffffff&size=128&bold=true`;
                    }}
                  />
                )
              )}

              <div className="standingsNameBlock">
                {type === "driver" && typeof onDriverClick === "function" ? (
                  <button
                    type="button"
                    className="driverInlineButton standingsNameButton"
                    onClick={() => onDriverClick(row.name)}
                  >
                    <strong>{row.name}</strong>
                    <span className="muted">{row.teamName}</span>
                  </button>
                ) : type === "driver" ? (
                  <>
                    <strong>{row.name}</strong>
                    <span className="muted">{row.teamName}</span>
                  </>
                ) : typeof onConstructorClick === "function" ? (
                  <button
                    type="button"
                    className="driverInlineButton standingsNameButton"
                    onClick={() => onConstructorClick(row.name)}
                  >
                    <strong>{row.name}</strong>
                  </button>
                ) : (
                  <strong>{row.name}</strong>
                )}
              </div>

              <span className="standingsPoints">{formatPoints(row.points)}</span>

              {type === "driver" && (
                <div className="standingsValueBlock">
                  {typeof row.price === "number" && (
                    <span className="standingsValue">{row.price.toFixed(1)}M</span>
                  )}
                  {typeof row.delta === "number" && (
                    <span
                      className={`standingsDelta ${
                        row.delta > 0 ? "up" : row.delta < 0 ? "down" : "flat"
                      }`}
                    >
                      {formatSignedDelta(row.delta)}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
