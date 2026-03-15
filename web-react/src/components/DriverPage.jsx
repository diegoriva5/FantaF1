import { DRIVER_META } from "../data/constants";
import {
  countryFlag,
  driverAge,
  driverDisplayName,
  driverImageUrl,
  formatFantasyPoints,
} from "../utils/format";
import { useI18n } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";

const CHART_WIDTH = 920;
const CHART_HEIGHT = 280;
const LEFT_PAD = 52;
const RIGHT_PAD = 18;
const TOP_PAD = 18;
const BOTTOM_PAD = 34;
const VALUE_AXIS_MIN = 0;
const VALUE_AXIS_MAX = 40;
const VALUE_AXIS_STEP = 5;
const FANTASY_AXIS_MIN = 0;
const FANTASY_AXIS_MAX = 250;
const FANTASY_AXIS_STEP = 50;
const CONQUERED_AXIS_MIN = 0;
const CONQUERED_AXIS_MAX = 25;
const CONQUERED_AXIS_STEP = 5;
const RACE_POINTS_BY_POSITION = {
  1: 25,
  2: 18,
  3: 15,
  4: 12,
  5: 10,
  6: 8,
  7: 6,
  8: 4,
  9: 2,
  10: 1,
};

function toFixedSafe(value, digits = 1) {
  return Number.isFinite(value) ? value.toFixed(digits) : "0.0";
}

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

function buildRoundEventMap(data, roundLabel) {
  const eventByRound = {};

  (data?.upcoming_races_2026 || []).forEach((race) => {
    const round = Number(race.round);
    if (!Number.isInteger(round) || round <= 0) return;
    eventByRound[round] = race.name || `${roundLabel} ${round}`;
  });

  return eventByRound;
}

function buildValueSeries(data, driverName, seasonRounds, eventByRound, roundLabel) {
  const salaryAdjustment = data?.config?.salary_adjustment || {};
  const initialPrice = salaryAdjustment?.driver_initial_prices?.[driverName];
  const history = salaryAdjustment?.driver_event_history?.[driverName] || [];
  const valuesByRound = new Map();

  history.forEach((entry) => {
    const round = Number(entry.round);
    const value = typeof entry.price_after === "number"
      ? entry.price_after
      : typeof entry.price_before === "number"
        ? entry.price_before
        : null;
    if (!Number.isInteger(round) || round <= 0 || typeof value !== "number") return;
    valuesByRound.set(round, value);
  });

  const series = seasonRounds.map((round) => ({
    label: String(round),
    event: eventByRound[round] || `${roundLabel} ${round}`,
    round,
    value: valuesByRound.has(round) ? valuesByRound.get(round) : null,
  }));

  const initialValue = typeof initialPrice === "number" ? initialPrice : null;

  return { series, initialValue };
}

function buildFantasySeries(data, driverName, seasonRounds, eventByRound, roundLabel) {
  const salaryAdjustment = data?.config?.salary_adjustment || {};
  const history = salaryAdjustment?.driver_event_history?.[driverName] || [];
  const fantasyByRound = new Map();

  history.forEach((entry) => {
    const round = Number(entry.round);
    if (!Number.isInteger(round) || round <= 0 || typeof entry.fantasy_points !== "number") {
      return;
    }
    fantasyByRound.set(round, entry.fantasy_points);
  });

  return seasonRounds.map((round) => ({
    label: String(round),
    event: eventByRound[round] || `${roundLabel} ${round}`,
    round,
    value: fantasyByRound.has(round) ? fantasyByRound.get(round) : null,
  }));
}

function buildConqueredPointsSeries(data, driverName, seasonRounds, eventByRound, roundLabel) {
  const salaryAdjustment = data?.config?.salary_adjustment || {};
  const history = salaryAdjustment?.driver_event_history?.[driverName] || [];
  const racePointsByRound = new Map();

  history.forEach((entry) => {
    const round = Number(entry.round);
    if (!Number.isInteger(round) || round <= 0) {
      return;
    }

    if (typeof entry.race_points === "number") {
      racePointsByRound.set(round, Math.max(0, entry.race_points));
      return;
    }

    const finishPosition = Number(entry.finish_position);
    if (Number.isInteger(finishPosition) && finishPosition > 0) {
      racePointsByRound.set(round, RACE_POINTS_BY_POSITION[finishPosition] || 0);
      return;
    }

    racePointsByRound.set(round, 0);
  });

  return seasonRounds.map((round) => ({
    label: String(round),
    event: eventByRound[round] || `${roundLabel} ${round}`,
    round,
    value: racePointsByRound.has(round) ? racePointsByRound.get(round) : null,
  }));
}

function LineValueChart({ series, initialValue }) {
  const { t } = useI18n();

  const knownValues = series
    .filter((point) => Number.isFinite(point.value))
    .map((point) => point.value);
  const hasData = knownValues.length > 0;
  const chartHeight = CHART_HEIGHT - TOP_PAD - BOTTOM_PAD;
  const scaleY = (value) => {
    const clampedValue = Math.min(VALUE_AXIS_MAX, Math.max(VALUE_AXIS_MIN, value));
    const ratio = (clampedValue - VALUE_AXIS_MIN) / (VALUE_AXIS_MAX - VALUE_AXIS_MIN || 1);
    return TOP_PAD + chartHeight - ratio * chartHeight;
  };

  const plotWidth = CHART_WIDTH - LEFT_PAD - RIGHT_PAD;
  const totalSlots = series.length + 1;
  const stepX = totalSlots > 1 ? plotWidth / (totalSlots - 1) : 0;
  const initialPoint = Number.isFinite(initialValue)
    ? {
        label: "0",
        event: t("driverPage.chartValueInitial", { value: toFixedSafe(initialValue, 1) }),
        round: 0,
        value: initialValue,
        x: LEFT_PAD,
        y: scaleY(initialValue),
      }
    : null;
  const points = series.map((point, index) => ({
    ...point,
    x: LEFT_PAD + (index + 1) * stepX,
    y: Number.isFinite(point.value) ? scaleY(point.value) : null,
  }));
  const linePoints = [
    ...(initialPoint ? [initialPoint] : []),
    ...points.filter((point) => Number.isFinite(point.y)),
  ];
  const polyline = linePoints.map((point) => `${point.x},${point.y}`).join(" ");
  const tickEvery = Math.max(1, Math.ceil(series.length / 8));
  const initialY = Number.isFinite(initialValue) ? scaleY(initialValue) : null;
  const initialLabelY = Number.isFinite(initialY)
    ? Math.max(TOP_PAD + 12, initialY - 6)
    : null;
  const valueTicks = [];
  for (let value = VALUE_AXIS_MAX; value >= VALUE_AXIS_MIN; value -= VALUE_AXIS_STEP) {
    valueTicks.push(value);
  }

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="driverChartSvg"
      role="img"
      aria-label={t("driverPage.valueChartAria")}
    >
      <rect x={LEFT_PAD} y={TOP_PAD} width={plotWidth} height={CHART_HEIGHT - TOP_PAD - BOTTOM_PAD} className="driverChartArea" />

      {valueTicks.map((value) => {
        const y = scaleY(value);
        return (
          <g key={`value-grid-${value}`}>
            <line x1={LEFT_PAD} y1={y} x2={CHART_WIDTH - RIGHT_PAD} y2={y} className="driverGridLine" />
            <text x={LEFT_PAD - 8} y={y + 4} textAnchor="end" className="driverAxisLabel">
              {value}
            </text>
          </g>
        );
      })}

      {linePoints.length > 0 && <polyline points={polyline} className="driverLineSeries" />}

      {Number.isFinite(initialY) && (
        <>
          <line
            x1={LEFT_PAD}
            y1={initialY}
            x2={CHART_WIDTH - RIGHT_PAD}
            y2={initialY}
            className="driverInitialLine"
          />
          <text
            x={CHART_WIDTH - RIGHT_PAD - 4}
            y={initialLabelY}
            textAnchor="end"
            className="driverInitialLabel"
          >
            {t("driverPage.valueChartStartLabel", { value: toFixedSafe(initialValue, 1) })}
          </text>
        </>
      )}

      {linePoints.map((point) => (
        <g key={`value-point-${point.label}-${point.round}`}>
          <circle
            cx={point.x}
            cy={point.y}
            r="4"
            className={point.round === 0 ? "driverLinePoint driverInitialPoint" : "driverLinePoint"}
          />
          <title>{`${point.event}: ${toFixedSafe(point.value, 1)}M`}</title>
        </g>
      ))}

      <text x={LEFT_PAD} y={CHART_HEIGHT - 10} textAnchor="middle" className="driverAxisLabel">
        0
      </text>

      {points.map((point, index) => {
        if (index !== 0 && index !== points.length - 1 && index % tickEvery !== 0) {
          return null;
        }
        return (
          <text key={`value-x-${point.label}-${point.round}`} x={point.x} y={CHART_HEIGHT - 10} textAnchor="middle" className="driverAxisLabel">
            {point.label}
          </text>
        );
      })}

      {!hasData && (
        <text
          x={(LEFT_PAD + CHART_WIDTH - RIGHT_PAD) / 2}
          y={TOP_PAD + (CHART_HEIGHT - TOP_PAD - BOTTOM_PAD) / 2}
          textAnchor="middle"
          className="driverNoDataLabel"
        >
          {t("driverPage.valueChartNoData")}
        </text>
      )}
    </svg>
  );
}

function FantasyBarChart({
  series,
  ariaLabel,
  axisMin = FANTASY_AXIS_MIN,
  axisMax = FANTASY_AXIS_MAX,
  axisStep = FANTASY_AXIS_STEP,
}) {
  const { t } = useI18n();
  const resolvedAriaLabel = ariaLabel || t("driverPage.chartFantasyAria");
  const pointsSuffix = t("common.pointsSuffix");

  const normalizedSeries = series.map((point) => ({
    ...point,
    value: Number.isFinite(point.value)
      ? Math.min(axisMax, Math.max(axisMin, point.value))
      : null,
  }));

  const chartHeight = CHART_HEIGHT - TOP_PAD - BOTTOM_PAD;
  const scaleY = (value) => {
    const clampedValue = Math.min(axisMax, Math.max(axisMin, value));
    const ratio = (clampedValue - axisMin) / (axisMax - axisMin || 1);
    return TOP_PAD + chartHeight - ratio * chartHeight;
  };

  const plotWidth = CHART_WIDTH - LEFT_PAD - RIGHT_PAD;
  const slotWidth = plotWidth / series.length;
  const barWidth = Math.min(28, slotWidth * 0.68);
  const baselineY = scaleY(0);
  const tickEvery = Math.max(1, Math.ceil(series.length / 8));
  const fantasyTicks = [];
  for (let value = axisMax; value >= axisMin; value -= axisStep) {
    fantasyTicks.push(value);
  }

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="driverChartSvg"
      role="img"
      aria-label={resolvedAriaLabel}
    >
      <rect x={LEFT_PAD} y={TOP_PAD} width={plotWidth} height={CHART_HEIGHT - TOP_PAD - BOTTOM_PAD} className="driverChartArea" />

      {fantasyTicks.map((value) => {
        const y = scaleY(value);
        return (
          <g key={`fantasy-grid-${value}`}>
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
        const barClass = hasValue
          ? "driverBarPositive"
          : "driverBarPending";

        return (
          <g key={`fantasy-bar-${point.label}-${point.round}`}>
            <rect x={x} y={top} width={barWidth} height={Math.max(2, height)} className={barClass} rx="4" ry="4" />
            <title>
              {hasValue
                ? `${point.event}: ${formatFantasyPoints(rawValue)} ${pointsSuffix}`
                : `${point.event}: ${t("driverPage.chartPendingData")}`}
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
            {(index === 0 || index === series.length - 1 || index % tickEvery === 0) && (
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

export default function DriverPage({
  data,
  error,
  driverName,
  onNavigateBack,
  backLabel,
  onOpenConstructor,
}) {
  const { t } = useI18n();
  const resolvedBackLabel = backLabel || t("common.home");

  if (error) {
    return (
      <>
        <header className="topbar">
          <button className="backButton" onClick={onNavigateBack}>{`← ${resolvedBackLabel}`}</button>
          <span className="topbarTitle">{t("driverPage.title")}</span>
          <LanguageSwitcher />
        </header>
        <main className="container appStage">
          <section className="card">{t("common.errorPrefix", { message: error })}</section>
        </main>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <header className="topbar">
          <button className="backButton" onClick={onNavigateBack}>{`← ${resolvedBackLabel}`}</button>
          <span className="topbarTitle">{t("driverPage.title")}</span>
          <LanguageSwitcher />
        </header>
        <main className="container appStage">
          <section className="card">{t("common.loadingData")}</section>
        </main>
      </>
    );
  }

  if (!driverName) {
    return (
      <>
        <header className="topbar">
          <button className="backButton" onClick={onNavigateBack}>{`← ${resolvedBackLabel}`}</button>
          <span className="topbarTitle">{t("driverPage.title")}</span>
          <LanguageSwitcher />
        </header>
        <main className="container appStage">
          <section className="card">{t("driverPage.notFound")}</section>
        </main>
      </>
    );
  }

  const meta = DRIVER_META[driverName] || {};
  const age = driverAge(driverName);
  const roundLabel = t("common.round");
  const seasonRounds = buildSeasonRounds(data);
  const eventByRound = buildRoundEventMap(data, roundLabel);
  const { series: valueSeries, initialValue } = buildValueSeries(
    data,
    driverName,
    seasonRounds,
    eventByRound,
    roundLabel,
  );
  const fantasySeries = buildFantasySeries(data, driverName, seasonRounds, eventByRound, roundLabel);
  const conqueredPointsSeries = buildConqueredPointsSeries(
    data,
    driverName,
    seasonRounds,
    eventByRound,
    roundLabel,
  );
  const teamName = data?.driver_values?.[driverName]?.team_proxy || "-";
  const canOpenConstructor = typeof onOpenConstructor === "function" && teamName !== "-";

  return (
    <>
      <header className="topbar">
        <button className="backButton" onClick={onNavigateBack}>{`← ${resolvedBackLabel}`}</button>
        <span className="topbarTitle">{driverDisplayName(driverName)}</span>
        <LanguageSwitcher />
      </header>
      <main className="container appStage">
        <section className="card driverHeroCard">
          <div className="driverHeroTop">
            <h2 className="driverHeroName">{driverDisplayName(driverName)}</h2>
          </div>

          <img
            src={driverImageUrl(driverName)}
            alt={driverName}
            className="driverHeroImage"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driverName)}&background=111827&color=ffffff&size=256&bold=true`;
            }}
          />

          <div className="driverMetaRow">
            <div className="driverMetaItem">
              <span className="muted">{t("driverPage.nationality")}</span>
              <strong>{`${countryFlag(meta.countryCode)} ${meta.countryCode || "--"}`}</strong>
            </div>
            <div className="driverMetaItem">
              <span className="muted">{t("driverPage.age")}</span>
              <strong>{age ?? "-"}</strong>
            </div>
            <div className="driverMetaItem">
              <span className="muted">{t("driverPage.number")}</span>
              <strong>#{meta.number || "--"}</strong>
            </div>
          </div>

          <div className="driverMetaItem">
            <span className="muted">{t("driverPage.team")}</span>
            {canOpenConstructor ? (
              <strong>
                <button
                  type="button"
                  className="driverInlineButton"
                  onClick={() => onOpenConstructor(teamName)}
                  aria-label={t("driverPage.openConstructorAria", { teamName })}
                >
                  {teamName}
                </button>
              </strong>
            ) : (
              <strong>{teamName}</strong>
            )}
          </div>
        </section>

        <section className="card driverChartCard">
          <div className="driverChartHeader">
            <h3>{t("driverPage.chartConqueredTitle")}</h3>
            <span className="muted">{t("driverPage.chartConqueredSubtitle")}</span>
          </div>
          <FantasyBarChart
            series={conqueredPointsSeries}
            ariaLabel={t("driverPage.chartConqueredAria")}
            axisMin={CONQUERED_AXIS_MIN}
            axisMax={CONQUERED_AXIS_MAX}
            axisStep={CONQUERED_AXIS_STEP}
          />
        </section>

        <section className="card driverChartCard">
          <div className="driverChartHeader">
            <h3>{t("driverPage.chartValueTitle")}</h3>
            <span className="muted">
              {Number.isFinite(initialValue)
                ? t("driverPage.chartValueInitial", { value: toFixedSafe(initialValue, 1) })
                : t("driverPage.chartValueAfterRace")}
            </span>
          </div>
          <LineValueChart series={valueSeries} initialValue={initialValue} />
        </section>

        <section className="card driverChartCard">
          <div className="driverChartHeader">
            <h3>{t("driverPage.chartFantasyTitle")}</h3>
            <span className="muted">{t("driverPage.chartFantasySubtitle")}</span>
          </div>
          <FantasyBarChart series={fantasySeries} ariaLabel={t("driverPage.chartFantasyAria")} />
        </section>
      </main>
    </>
  );
}
