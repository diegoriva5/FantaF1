import { DRIVER_META } from "../data/constants";
import { driverImageUrl, formatFantasyPoints } from "../utils/format";

const CHART_WIDTH = 920;
const CHART_HEIGHT = 280;
const LEFT_PAD = 52;
const RIGHT_PAD = 18;
const TOP_PAD = 18;
const BOTTOM_PAD = 34;
const CONSTRUCTOR_POINTS_AXIS_MIN = 0;
const CONSTRUCTOR_POINTS_AXIS_MAX = 50;
const CONSTRUCTOR_POINTS_AXIS_STEP = 10;

function buildSeasonRounds(data) {
  const rounds = (data?.upcoming_races_2026 || [])
    .map((race) => Number(race.round))
    .filter((round) => Number.isInteger(round) && round > 0);

  const uniqueSorted = Array.from(new Set(rounds)).sort((left, right) => left - right);
  if (uniqueSorted.length > 0) {
    return uniqueSorted;
  }

  return Array.from({ length: 24 }, (_, index) => index + 1);
}

function buildRoundEventMap(data) {
  const eventByRound = {};
  (data?.upcoming_races_2026 || []).forEach((race) => {
    const round = Number(race.round);
    if (!Number.isInteger(round) || round <= 0) return;
    eventByRound[round] = race.name || `Round ${round}`;
  });
  return eventByRound;
}

function buildConstructorPointsSeries(data, constructorName, seasonRounds, eventByRound) {
  const salaryAdjustment = data?.config?.salary_adjustment || {};
  const history = salaryAdjustment?.constructor_event_history?.[constructorName] || [];
  const pointsByRound = new Map();

  history.forEach((entry) => {
    const round = Number(entry.round);
    if (!Number.isInteger(round) || round <= 0 || typeof entry.race_points !== "number") {
      return;
    }
    pointsByRound.set(round, Math.max(0, entry.race_points));
  });

  return seasonRounds.map((round) => ({
    label: String(round),
    event: eventByRound[round] || `Round ${round}`,
    round,
    value: pointsByRound.has(round) ? pointsByRound.get(round) : null,
  }));
}

function getConstructorDrivers(data, constructorName) {
  return Object.entries(data?.driver_values || {})
    .filter(([, value]) => value?.team_proxy === constructorName)
    .map(([driverName]) => {
      const meta = DRIVER_META[driverName];
      const fullName = meta?.givenName && meta?.familyName
        ? `${meta.givenName} ${meta.familyName}`
        : driverName;
      return { key: driverName, fullName };
    })
    .sort((left, right) => left.fullName.localeCompare(right.fullName));
}

function ConstructorPointsChart({ series }) {
  const normalizedSeries = series.map((point) => ({
    ...point,
    value: Number.isFinite(point.value)
      ? Math.min(CONSTRUCTOR_POINTS_AXIS_MAX, Math.max(CONSTRUCTOR_POINTS_AXIS_MIN, point.value))
      : null,
  }));

  const chartHeight = CHART_HEIGHT - TOP_PAD - BOTTOM_PAD;
  const scaleY = (value) => {
    const clampedValue = Math.min(CONSTRUCTOR_POINTS_AXIS_MAX, Math.max(CONSTRUCTOR_POINTS_AXIS_MIN, value));
    const ratio = (clampedValue - CONSTRUCTOR_POINTS_AXIS_MIN) / (CONSTRUCTOR_POINTS_AXIS_MAX - CONSTRUCTOR_POINTS_AXIS_MIN || 1);
    return TOP_PAD + chartHeight - ratio * chartHeight;
  };

  const plotWidth = CHART_WIDTH - LEFT_PAD - RIGHT_PAD;
  const slotWidth = plotWidth / normalizedSeries.length;
  const barWidth = Math.min(28, slotWidth * 0.68);
  const baselineY = scaleY(0);
  const tickEvery = Math.max(1, Math.ceil(normalizedSeries.length / 8));
  const ticks = [];

  for (
    let value = CONSTRUCTOR_POINTS_AXIS_MAX;
    value >= CONSTRUCTOR_POINTS_AXIS_MIN;
    value -= CONSTRUCTOR_POINTS_AXIS_STEP
  ) {
    ticks.push(value);
  }

  return (
    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="driverChartSvg" role="img" aria-label="Punti conquistati per circuito">
      <rect x={LEFT_PAD} y={TOP_PAD} width={plotWidth} height={CHART_HEIGHT - TOP_PAD - BOTTOM_PAD} className="driverChartArea" />

      {ticks.map((value) => {
        const y = scaleY(value);
        return (
          <g key={`constructor-grid-${value}`}>
            <line x1={LEFT_PAD} y1={y} x2={CHART_WIDTH - RIGHT_PAD} y2={y} className="driverGridLine" />
            <text x={LEFT_PAD - 8} y={y + 4} textAnchor="end" className="driverAxisLabel">
              {formatFantasyPoints(value)}
            </text>
          </g>
        );
      })}

      <line x1={LEFT_PAD} y1={baselineY} x2={CHART_WIDTH - RIGHT_PAD} y2={baselineY} className="driverBaseline" />

      {normalizedSeries.map((point, index) => {
        const hasValue = Number.isFinite(point.value);
        const rawValue = hasValue ? point.value : 0;
        const x = LEFT_PAD + index * slotWidth + (slotWidth - barWidth) / 2;
        const y = scaleY(rawValue);
        const height = hasValue ? Math.abs(y - baselineY) : 2;
        const top = hasValue ? Math.min(y, baselineY) : baselineY - 1;
        const barClass = hasValue ? "driverBarPositive" : "driverBarPending";

        return (
          <g key={`constructor-bar-${point.round}`}>
            <rect x={x} y={top} width={barWidth} height={Math.max(2, height)} className={barClass} rx="4" ry="4" />
            <title>
              {hasValue
                ? `${point.event}: ${formatFantasyPoints(rawValue)} pt`
                : `${point.event}: in attesa dati`}
            </title>
            {hasValue && (
              <text
                x={x + barWidth / 2}
                y={Math.max(TOP_PAD + 10, top - 4)}
                textAnchor="middle"
                className="driverBarValueLabel"
              >
                {formatFantasyPoints(rawValue)}
              </text>
            )}
            {(index === 0 || index === normalizedSeries.length - 1 || index % tickEvery === 0) && (
              <text x={x + barWidth / 2} y={CHART_HEIGHT - 10} textAnchor="middle" className="driverAxisLabel">
                {point.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function ConstructorPage({
  data,
  error,
  constructorName,
  year,
  onNavigateBack,
  onOpenDriver,
}) {
  if (error) {
    return (
      <>
        <header className="topbar">
          <button className="backButton" onClick={onNavigateBack}>← Home</button>
          <span>Scuderia</span>
        </header>
        <main className="container appStage">
          <section className="card">Errore: {error}</section>
        </main>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <header className="topbar">
          <button className="backButton" onClick={onNavigateBack}>← Home</button>
          <span>Scuderia</span>
        </header>
        <main className="container appStage">
          <section className="card">Caricamento dati...</section>
        </main>
      </>
    );
  }

  if (!constructorName) {
    return (
      <>
        <header className="topbar">
          <button className="backButton" onClick={onNavigateBack}>← Home</button>
          <span>Scuderia</span>
        </header>
        <main className="container appStage">
          <section className="card">Scuderia non trovata.</section>
        </main>
      </>
    );
  }

  const seasonRounds = buildSeasonRounds(data);
  const eventByRound = buildRoundEventMap(data);
  const pointsSeries = buildConstructorPointsSeries(data, constructorName, seasonRounds, eventByRound);
  const drivers = getConstructorDrivers(data, constructorName);

  return (
    <>
      <header className="topbar">
        <button className="backButton" onClick={onNavigateBack}>← Home</button>
        <span>Scuderia · {constructorName}</span>
      </header>

      <main className="container appStage">
        <section className="card constructorHeroCard">
          <h2 className="driverHeroName">{constructorName}</h2>

          <div className="constructorDriversList">
            <h3 className="constructorDriversTitle">Piloti</h3>
            {drivers.length === 0 && <p className="muted">Piloti non disponibili.</p>}
            {drivers.length > 0 && (
              <div className="constructorDriversGrid">
                {drivers.map((driver) => {
                  const content = (
                    <>
                      <img
                        src={driverImageUrl(driver.key)}
                        alt={driver.fullName}
                        className="constructorDriverImage"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver.fullName)}&background=111827&color=ffffff&size=256&bold=true`;
                        }}
                      />
                      <div className="constructorDriverName">{driver.fullName}</div>
                    </>
                  );

                  if (typeof onOpenDriver === "function") {
                    return (
                      <button
                        type="button"
                        key={`constructor-driver-${driver.key}`}
                        className="constructorDriverCard"
                        onClick={() => onOpenDriver(driver.key)}
                        aria-label={`Apri profilo pilota ${driver.fullName}`}
                      >
                        {content}
                      </button>
                    );
                  }

                  return (
                    <article
                      key={`constructor-driver-${driver.key}`}
                      className="constructorDriverCard"
                    >
                      {content}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="card driverChartCard">
          <div className="driverChartHeader">
            <h3>Punti conquistati</h3>
            <span className="muted">Punti ottenuti per ogni circuito</span>
          </div>
          <ConstructorPointsChart series={pointsSeries} />
        </section>
      </main>
    </>
  );
}