import { DRIVER_META } from "../data/constants";
import { driverImageUrl, formatFantasyPoints } from "../utils/format";
import { useI18n } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";

const CHART_WIDTH = 920;
const CHART_HEIGHT = 280;
const LEFT_PAD = 52;
const RIGHT_PAD = 18;
const TOP_PAD = 18;
const BOTTOM_PAD = 34;
const CONSTRUCTOR_POINTS_AXIS_MIN = 0;
const CONSTRUCTOR_POINTS_AXIS_MAX = 50;
const CONSTRUCTOR_POINTS_AXIS_STEP = 10;
const CONSTRUCTOR_CAR_IMAGE_BY_NAME = {
  Mercedes: "mercedes-car.png",
  McLaren: "mclaren-car.png",
  RedBull: "redbull-car.png",
  Ferrari: "ferrari-car.png",
  "Aston Martin": "astonmartin-car.png",
  Williams: "williams-car.png",
  "Racing Bulls": "racingbulls-car.png",
  Alpine: "alpine-car.png",
  Audi: "audi-car.png",
  Cadillac: "cadillac-car.png",
  Haas: "haas-car.png",
};
const CONSTRUCTOR_LOGO_IMAGE_BY_NAME = {
  Mercedes: "mercedes-logo.png",
  McLaren: "mclaren-logo.png",
  RedBull: "redbull-logo.png",
  Ferrari: "ferrari-logo.png",
  "Aston Martin": "astonmartin-logo.png",
  Williams: "williams-logo.png",
  "Racing Bulls": "racingbulls-logo.png",
  Alpine: "alpine-logo.png",
  Audi: "audi-logo.png",
  Cadillac: "cadillac-logo.png",
  Haas: "haas-logo.png",
};
const DEFAULT_CONSTRUCTOR_THEME = {
  primary: "#dc0000",
  secondary: "#5a070a",
  tertiary: "#240304",
  accent: "#ffd447",
  text: "#fff4ef",
  muted: "#f2c9c3",
  grid: "rgba(255, 255, 255, 0.14)",
  chartArea: "rgba(255, 255, 255, 0.06)",
  chartStroke: "rgba(255, 255, 255, 0.14)",
};
const CONSTRUCTOR_THEME_BY_NAME = {
  Mercedes: {
    primary: "#00D2BE",
    secondary: "#003B3A",
    tertiary: "#021B1A",
    accent: "#7BF7EA",
    text: "#E9FFFC",
    muted: "#A7ECE4",
    grid: "rgba(123, 247, 234, 0.18)",
    chartArea: "rgba(123, 247, 234, 0.08)",
    chartStroke: "rgba(123, 247, 234, 0.3)",
  },
  McLaren: {
    primary: "#FF8000",
    secondary: "#5C2B00",
    tertiary: "#261204",
    accent: "#FFB45C",
    text: "#FFF3E7",
    muted: "#FFD6AD",
    grid: "rgba(255, 180, 92, 0.18)",
    chartArea: "rgba(255, 180, 92, 0.08)",
    chartStroke: "rgba(255, 180, 92, 0.3)",
  },
  RedBull: {
    primary: "#1E41FF",
    secondary: "#090F2D",
    tertiary: "#050816",
    accent: "#E10600",
    text: "#EAF0FF",
    muted: "#B7C6FF",
    grid: "rgba(183, 198, 255, 0.18)",
    chartArea: "rgba(183, 198, 255, 0.08)",
    chartStroke: "rgba(183, 198, 255, 0.32)",
  },
  Ferrari: {
    primary: "#DC0000",
    secondary: "#5A070A",
    tertiary: "#240304",
    accent: "#FF8A80",
    text: "#FFEFEF",
    muted: "#FFC0BB",
    grid: "rgba(255, 192, 187, 0.18)",
    chartArea: "rgba(255, 192, 187, 0.08)",
    chartStroke: "rgba(255, 192, 187, 0.32)",
  },
  "Aston Martin": {
    primary: "#006F62",
    secondary: "#073A35",
    tertiary: "#031C19",
    accent: "#00D6A1",
    text: "#ECFFF9",
    muted: "#A7E3D6",
    grid: "rgba(167, 227, 214, 0.18)",
    chartArea: "rgba(167, 227, 214, 0.08)",
    chartStroke: "rgba(167, 227, 214, 0.32)",
  },
  Williams: {
    primary: "#005AFF",
    secondary: "#082762",
    tertiary: "#040F2D",
    accent: "#5FA2FF",
    text: "#EBF3FF",
    muted: "#B7D5FF",
    grid: "rgba(183, 213, 255, 0.18)",
    chartArea: "rgba(183, 213, 255, 0.08)",
    chartStroke: "rgba(183, 213, 255, 0.32)",
  },
  "Racing Bulls": {
    primary: "#2C5CFF",
    secondary: "#111E4A",
    tertiary: "#090F23",
    accent: "#FF3C3C",
    text: "#EEF2FF",
    muted: "#C3D0FF",
    grid: "rgba(195, 208, 255, 0.18)",
    chartArea: "rgba(195, 208, 255, 0.08)",
    chartStroke: "rgba(195, 208, 255, 0.32)",
  },
  Alpine: {
    primary: "#0090FF",
    secondary: "#122B57",
    tertiary: "#080F29",
    accent: "#FF5CB8",
    text: "#EEF6FF",
    muted: "#C4DCFF",
    grid: "rgba(196, 220, 255, 0.18)",
    chartArea: "rgba(196, 220, 255, 0.08)",
    chartStroke: "rgba(196, 220, 255, 0.32)",
  },
  Audi: {
    primary: "#E10600",
    secondary: "#1A1A1A",
    tertiary: "#080808",
    accent: "#FA5E58",
    text: "#FFF1F0",
    muted: "#E3C0BE",
    grid: "rgba(227, 192, 190, 0.18)",
    chartArea: "rgba(227, 192, 190, 0.08)",
    chartStroke: "rgba(227, 192, 190, 0.32)",
  },
  Cadillac: {
    primary: "#C9A44B",
    secondary: "#0F2A4A",
    tertiary: "#071527",
    accent: "#4FA3FF",
    text: "#F3F7FC",
    muted: "#BFD5ED",
    grid: "rgba(191, 213, 237, 0.18)",
    chartArea: "rgba(191, 213, 237, 0.08)",
    chartStroke: "rgba(191, 213, 237, 0.32)",
  },
  Haas: {
    primary: "#D62027",
    secondary: "#3A3F46",
    tertiary: "#1A1E24",
    accent: "#B6BABD",
    text: "#F5F7FA",
    muted: "#D5DADF",
    grid: "rgba(213, 218, 223, 0.18)",
    chartArea: "rgba(213, 218, 223, 0.08)",
    chartStroke: "rgba(213, 218, 223, 0.32)",
  },
};

function constructorCarImageUrl(constructorName) {
  const fileName = CONSTRUCTOR_CAR_IMAGE_BY_NAME[constructorName];
  return fileName ? `/cars-2026/${fileName}` : null;
}

function constructorLogoImageUrl(constructorName) {
  const fileName = CONSTRUCTOR_LOGO_IMAGE_BY_NAME[constructorName] || "f1-logo.png";
  return `/logos-2026/${fileName}`;
}

function constructorThemeStyle(constructorName) {
  const theme = CONSTRUCTOR_THEME_BY_NAME[constructorName] || DEFAULT_CONSTRUCTOR_THEME;

  return {
    "--constructor-primary": theme.primary,
    "--constructor-secondary": theme.secondary,
    "--constructor-tertiary": theme.tertiary,
    "--constructor-accent": theme.accent,
    "--constructor-text": theme.text,
    "--constructor-muted": theme.muted,
    "--constructor-grid": theme.grid,
    "--constructor-chart-area": theme.chartArea,
    "--constructor-chart-stroke": theme.chartStroke,
  };
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

function buildConstructorPointsSeries(data, constructorName, seasonRounds, eventByRound, roundLabel) {
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
    event: eventByRound[round] || `${roundLabel} ${round}`,
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
  const { t } = useI18n();
  const pointsSuffix = t("common.pointsSuffix");

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
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="driverChartSvg"
      role="img"
      aria-label={t("constructorPage.chartAria")}
    >
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
                ? `${point.event}: ${formatFantasyPoints(rawValue)} ${pointsSuffix}`
                : `${point.event}: ${t("constructorPage.chartPendingData")}`}
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
  onNavigateBack,
  backLabel,
  onOpenDriver,
}) {
  const { t } = useI18n();
  const resolvedBackLabel = backLabel || t("common.home");

  if (error) {
    return (
      <>
        <header className="topbar">
          <button className="backButton" onClick={onNavigateBack}>{`← ${resolvedBackLabel}`}</button>
          <span className="topbarTitle">{t("constructorPage.title")}</span>
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
          <span className="topbarTitle">{t("constructorPage.title")}</span>
          <LanguageSwitcher />
        </header>
        <main className="container appStage">
          <section className="card">{t("common.loadingData")}</section>
        </main>
      </>
    );
  }

  if (!constructorName) {
    return (
      <>
        <header className="topbar">
          <button className="backButton" onClick={onNavigateBack}>{`← ${resolvedBackLabel}`}</button>
          <span className="topbarTitle">{t("constructorPage.title")}</span>
          <LanguageSwitcher />
        </header>
        <main className="container appStage">
          <section className="card">{t("constructorPage.notFound")}</section>
        </main>
      </>
    );
  }

  const seasonRounds = buildSeasonRounds(data);
  const roundLabel = t("common.round");
  const eventByRound = buildRoundEventMap(data, roundLabel);
  const pointsSeries = buildConstructorPointsSeries(
    data,
    constructorName,
    seasonRounds,
    eventByRound,
    roundLabel,
  );
  const drivers = getConstructorDrivers(data, constructorName);
  const carImageUrl = constructorCarImageUrl(constructorName);
  const logoImageUrl = constructorLogoImageUrl(constructorName);
  const themeStyle = constructorThemeStyle(constructorName);
  const leftDriver = drivers[0] || null;
  const rightDriver = drivers[1] || null;

  function renderShowcaseDriver(driver, sideLabel) {
    if (!driver) {
      return (
        <div
          className="constructorShowcaseDriver constructorShowcaseDriverEmpty"
          aria-label={t("constructorPage.missingDriverAria", { side: sideLabel })}
        >
          <span className="muted">{t("constructorPage.missingDriver")}</span>
        </div>
      );
    }

    const content = (
      <>
        <img
          src={driverImageUrl(driver.key)}
          alt={driver.fullName}
          className="constructorShowcaseDriverImage"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver.fullName)}&background=111827&color=ffffff&size=256&bold=true`;
          }}
        />
        <div className="constructorShowcaseDriverName">{driver.fullName}</div>
      </>
    );

    if (typeof onOpenDriver === "function") {
      return (
        <button
          type="button"
          className="constructorShowcaseDriver"
          onClick={() => onOpenDriver(driver.key)}
          aria-label={t("constructorPage.openDriverAria", { driverName: driver.fullName })}
        >
          {content}
        </button>
      );
    }

    return (
      <article className="constructorShowcaseDriver">
        {content}
      </article>
    );
  }

  return (
    <>
      <header className="topbar constructorTopbar" style={themeStyle}>
        <button className="backButton" onClick={onNavigateBack}>{`← ${resolvedBackLabel}`}</button>
        <span className="topbarTitle">{t("constructorPage.headerTitle", { constructorName })}</span>
        <LanguageSwitcher />
      </header>

      <main className="container appStage constructorPageTheme" style={themeStyle}>
        <section className="card constructorHeroCard constructorThemeCard">
          <div className="constructorLogoWrap" aria-label={t("constructorPage.logoAria", { constructorName })}>
            <img
              src={logoImageUrl}
              alt={t("constructorPage.logoAlt", { constructorName })}
              className="constructorLogoImage"
              loading="lazy"
            />
          </div>

          <div className="constructorShowcaseRow">
            <div className="constructorShowcaseSide">
              {renderShowcaseDriver(leftDriver, t("constructorPage.sideLeft"))}
            </div>

            <div className="constructorShowcaseCar">
              {carImageUrl ? (
                <div className="constructorCarImageWrap" aria-label={t("constructorPage.carAria", { constructorName })}>
                  <img
                    src={carImageUrl}
                    alt={t("constructorPage.carAlt", { constructorName })}
                    className="constructorCarImage"
                    loading="lazy"
                  />
                </div>
              ) : (
                <p className="muted">{t("constructorPage.carUnavailable")}</p>
              )}
            </div>

            <div className="constructorShowcaseSide">
              {renderShowcaseDriver(rightDriver, t("constructorPage.sideRight"))}
            </div>
          </div>
        </section>

        <section className="card driverChartCard constructorThemeCard">
          <div className="driverChartHeader">
            <h3>{t("constructorPage.chartTitle")}</h3>
            <span className="muted">{t("constructorPage.chartSubtitle")}</span>
          </div>
          <ConstructorPointsChart series={pointsSeries} />
        </section>
      </main>
    </>
  );
}