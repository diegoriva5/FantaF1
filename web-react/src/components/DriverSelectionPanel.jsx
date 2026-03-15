import { useI18n } from "../i18n";

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
  const { t } = useI18n();
  const sourceLabel = summary.sourceKey === "trackHistoricalData"
    ? t("driverSelection.sourceTrackHistoricalData")
    : summary.sourceKey === "globalFallback"
      ? t("driverSelection.sourceGlobalFallback")
      : summary.hasTrackData
        ? t("driverSelection.sourceTrackHistoricalData")
        : t("driverSelection.sourceGlobalFallback");

  return (
    <section className="card selectionPanel">
      <div className="selectionHeader">
        <h3>{t("driverSelection.title")}</h3>
        <span className="muted">{raceName}</span>
      </div>
      <p className="muted">{t("driverSelection.selectedCount", { count: selectedDrivers.length })}</p>

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
          {t("driverSelection.teamLabel")}
        </label>
        <select
          id={`team-${raceName}`}
          value={selectedTeam}
          onChange={(event) => onSelectTeam(event.target.value)}
          className="select"
        >
          <option value="">{t("driverSelection.teamPlaceholder")}</option>
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
          <strong>{t("driverSelection.total")}</strong> {summary.totalCost.toFixed(1)}M
        </p>
        <p>
          <strong>{t("driverSelection.remaining")}</strong> {summary.budgetLeft.toFixed(1)}M
        </p>
        {summary.budgetLeft < 0 && (
          <p className="warning">
            {t("driverSelection.overBudget", { amount: Math.abs(summary.budgetLeft).toFixed(1) })}
          </p>
        )}
      </div>

      <div className="predictionCard">
        {!summary.probability && (
          <p className="muted">{t("driverSelection.selectPrompt")}</p>
        )}
        {summary.probability && (
          <>
            <p>
              <strong>{t("driverSelection.track")}</strong> {summary.circuitName}
            </p>
            <p>
              <strong>{t("driverSelection.estimatedProbability")}</strong>{" "}
              <span className="bigScore">{summary.probability}%</span>
            </p>
            <p className="muted">{t("driverSelection.source")} {sourceLabel}</p>
            {!summary.hasTrackData && (
              <p className="warning">{t("driverSelection.missingTrackData")}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
