export default function DriverSelectionPanel({
  raceName,
  driverNames,
  driverValues,
  teamNames,
  constructorValues,
  selectedDrivers,
  selectedTeam,
  onToggleDriver,
  onSelectTeam,
  summary,
}) {
  return (
    <section className="card selectionPanel">
      <div className="selectionHeader">
        <h3>La mia formazione</h3>
        <span className="muted">{raceName}</span>
      </div>
      <p className="muted">Selezionati: {selectedDrivers.length}/5</p>

      {selectedDrivers.length > 0 && (
        <div className="selectedDriversRow">
          {selectedDrivers.map((name) => (
            <span key={`selected-${raceName}-${name}`} className="selectedDriverBadge">
              {name}
            </span>
          ))}
        </div>
      )}

      <div className="teamSelectionRow">
        <label className="teamSelectionLabel" htmlFor={`team-${raceName}`}>
          Team
        </label>
        <select
          id={`team-${raceName}`}
          value={selectedTeam}
          onChange={(event) => onSelectTeam(event.target.value)}
          className="select"
        >
          <option value="">-- scegli team --</option>
          {teamNames.map((team) => (
            <option key={`${raceName}-${team}`} value={team}>
              {team} ({constructorValues?.[team]?.price}M)
            </option>
          ))}
        </select>
      </div>

      <div className="selectorGrid">
        {driverNames.map((name) => {
          const checked = selectedDrivers.includes(name);
          const disabled = !checked && selectedDrivers.length >= 5;
          const price = driverValues?.[name]?.price;

          return (
            <label
              key={`${raceName}-${name}`}
              className={`chip ${checked ? "chipOn" : ""} ${disabled ? "chipDisabled" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => onToggleDriver(name)}
              />
              <span>{name}</span>
              {typeof price === "number" && <small>{price}M</small>}
            </label>
          );
        })}
      </div>

      <div className="formationMetrics">
        <p>
          <strong>Totale:</strong> {summary.totalCost.toFixed(1)}M
        </p>
        <p>
          <strong>Residuo:</strong> {summary.budgetLeft.toFixed(1)}M
        </p>
        {summary.budgetLeft < 0 && (
          <p className="warning">
            Sei oltre il budget di {Math.abs(summary.budgetLeft).toFixed(1)}M
          </p>
        )}
      </div>

      <div className="predictionCard">
        {!summary.probability && (
          <p className="muted">Seleziona 5 piloti e 1 team per ottenere la stima.</p>
        )}
        {summary.probability && (
          <>
            <p>
              <strong>Pista:</strong> {summary.circuitName}
            </p>
            <p>
              <strong>Probabilita stimata:</strong>{" "}
              <span className="bigScore">{summary.probability}%</span>
            </p>
            <p className="muted">Fonte modello: {summary.source}</p>
            {!summary.hasTrackData && (
              <p className="warning">Storico pista non disponibile: uso fallback globale.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
