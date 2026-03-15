import { CSV_DRIVER_TO_KEY } from "../data/constants";
import { normalizeConstructorName } from "./format";

export function buildLastRaceFantasyStandings(salaryAdjustment, raceResults) {
  const scoreMap = salaryAdjustment?.last_driver_fantasy_scores || {};
  const rankMap = salaryAdjustment?.last_driver_fantasy_ranks || {};
  const constructorByDriver = {};

  (raceResults || []).forEach((result) => {
    if (!result?.driver_surname) return;
    constructorByDriver[result.driver_surname] = result.constructor_name || "";
  });

  return Object.entries(scoreMap)
    .map(([driverName, rawScore]) => ({
      driverName,
      teamName: constructorByDriver[driverName] || "",
      score: typeof rawScore === "number" ? rawScore : parseFloat(rawScore) || 0,
      rank: typeof rankMap[driverName] === "number" ? rankMap[driverName] : null,
    }))
    .sort(
      (left, right) =>
        right.score - left.score ||
        (left.rank ?? Number.MAX_SAFE_INTEGER) - (right.rank ?? Number.MAX_SAFE_INTEGER) ||
        left.driverName.localeCompare(right.driverName),
    );
}

export function buildLiveDriverStandings(rows, driverValues, salaryAdjustment) {
  const valuesByDriver = driverValues || {};
  const lastDriverPriceChange = salaryAdjustment?.last_driver_price_change || {};
  const totals = new Map();

  rows.forEach((row) => {
    const fullName = row.Driver || "";
    const driverKey = CSV_DRIVER_TO_KEY[fullName] || fullName.split(" ").pop() || fullName;
    const points = parseFloat(row.Points) || 0;
    const teamName = normalizeConstructorName(row.Team || "");
    const current = totals.get(driverKey) || { name: driverKey, fullName, teamName, points: 0 };
    current.points += points;
    current.teamName = teamName;
    totals.set(driverKey, current);
  });

  return Array.from(totals.values())
    .map((row) => ({
      ...row,
      price: typeof valuesByDriver[row.name]?.price === "number" ? valuesByDriver[row.name].price : null,
      delta: typeof lastDriverPriceChange[row.name] === "number" ? lastDriverPriceChange[row.name] : null,
    }))
    .sort((left, right) => right.points - left.points || left.name.localeCompare(right.name));
}

export function buildLiveConstructorStandings(rows) {
  const totals = new Map();
  rows.forEach((row) => {
    const teamName = normalizeConstructorName(row.Team || "");
    const points = parseFloat(row.Points) || 0;
    totals.set(teamName, (totals.get(teamName) || 0) + points);
  });
  return Array.from(totals.entries())
    .map(([name, points]) => ({ name, points }))
    .sort((left, right) => right.points - left.points || left.name.localeCompare(right.name));
}

export function computeFormationSummary({ data, race, selectedDrivers, selectedTeam }) {
  const budget = data?.config?.budget || 100;
  const driverValues = data?.driver_values || {};
  const constructorValues = data?.constructor_values || {};

  const selectedDriverCost = selectedDrivers.reduce(
    (sum, name) => sum + (driverValues[name]?.price || 0),
    0,
  );
  const selectedTeamCost = selectedTeam ? constructorValues[selectedTeam]?.price || 0 : 0;
  const totalCost = selectedDriverCost + selectedTeamCost;
  const budgetLeft = budget - totalCost;

  if (!race || selectedDrivers.length !== 5 || !selectedTeam) {
    return {
      totalCost,
      budgetLeft,
      probability: null,
      sourceKey: null,
      circuitName: race?.name || "",
      hasTrackData: false,
    };
  }

  const globalNorm = (collection, key) => {
    const values = Object.values(collection).map((item) => item.score);
    const min = Math.min(...values);
    const max = Math.max(...values);
    if (max === min) return 0.5;
    return (collection[key].score - min) / (max - min);
  };

  const track = race.circuit_ref ? data.track_profiles?.[race.circuit_ref] : null;
  const driverNorms = selectedDrivers.map((driverName) => {
    if (track?.drivers?.[driverName]) {
      return track.drivers[driverName].normalized;
    }
    return globalNorm(driverValues, driverName);
  });

  const teamNorm = track?.constructors?.[selectedTeam]
    ? track.constructors[selectedTeam].normalized
    : globalNorm(constructorValues, selectedTeam);

  const avgDriverNorm =
    driverNorms.reduce((sum, currentValue) => sum + currentValue, 0) / driverNorms.length;
  const strength = 0.78 * avgDriverNorm + 0.22 * teamNorm;
  const probability = Math.round(100 / (1 + Math.exp(-5.5 * (strength - 0.5))));

  return {
    totalCost,
    budgetLeft,
    probability,
    sourceKey: track ? "trackHistoricalData" : "globalFallback",
    circuitName: track ? track.circuit_name : race.name,
    hasTrackData: Boolean(track),
  };
}
