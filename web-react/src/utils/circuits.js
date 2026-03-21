import { CIRCUIT_COUNTRY_FLAG, CIRCUIT_REF_TO_TRACK_IMAGE } from "../data/constants";

function toFiniteNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function rankEntities(entities) {
  return Object.entries(entities || {})
    .map(([name, payload]) => ({
      name,
      score: toFiniteNumber(payload?.score),
      normalized: toFiniteNumber(payload?.normalized),
      entries: toFiniteNumber(payload?.entries),
      source: payload?.source || "season_fallback",
    }))
    .sort((left, right) => {
      if (right.normalized !== left.normalized) {
        return right.normalized - left.normalized;
      }
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return right.entries - left.entries;
    });
}

function findRecommendationByCircuit(recommendationsByRace, circuitRef) {
  const allRecommendations = Object.entries(recommendationsByRace || {});
  const match = allRecommendations.find(([, payload]) => payload?.circuit_ref === circuitRef);
  if (!match) return null;
  const [raceName, payload] = match;
  return { raceName, ...payload };
}

export function buildCircuitCatalog(data) {
  if (!data) return [];

  const races = Array.isArray(data.upcoming_races_2026) ? data.upcoming_races_2026 : [];
  const profiles = data.track_profiles || {};
  const recommendationsByRace = data.track_team_recommendations || {};
  const circuitsByRef = new Map();

  races.forEach((race) => {
    const circuitRef = race?.circuit_ref;
    if (!circuitRef) return;

    const existing = circuitsByRef.get(circuitRef) || { circuitRef, races: [], profile: null };
    existing.races.push({
      round: toFiniteNumber(race.round, null),
      name: race.name || "",
      date: race.date || "",
      countryCode: race.country_code || CIRCUIT_COUNTRY_FLAG[circuitRef] || "",
    });
    existing.profile = existing.profile || profiles[circuitRef] || null;
    circuitsByRef.set(circuitRef, existing);
  });

  Object.entries(profiles).forEach(([circuitRef, profile]) => {
    const existing = circuitsByRef.get(circuitRef) || { circuitRef, races: [], profile: null };
    existing.profile = profile;
    circuitsByRef.set(circuitRef, existing);
  });

  return Array.from(circuitsByRef.values())
    .map((entry) => {
      const racesForCircuit = [...entry.races].sort((left, right) => {
        const leftRound = toFiniteNumber(left.round, 9999);
        const rightRound = toFiniteNumber(right.round, 9999);
        return leftRound - rightRound;
      });
      const firstRace = racesForCircuit[0] || {};
      const profile = entry.profile || {};
      const rankedDrivers = rankEntities(profile.drivers);
      const rankedConstructors = rankEntities(profile.constructors);
      const driverCoverageCount = rankedDrivers.filter((driver) => driver.source === "track_historical").length;
      const driverCoverage = rankedDrivers.length > 0
        ? Math.round((driverCoverageCount / rankedDrivers.length) * 100)
        : 0;
      const averageEntries = rankedDrivers.length > 0
        ? rankedDrivers.reduce((sum, driver) => sum + driver.entries, 0) / rankedDrivers.length
        : 0;

      return {
        circuitRef: entry.circuitRef,
        circuitName: profile.circuit_name || firstRace.name || entry.circuitRef,
        country: profile.country || "",
        countryCode: firstRace.countryCode || CIRCUIT_COUNTRY_FLAG[entry.circuitRef] || "",
        image: CIRCUIT_REF_TO_TRACK_IMAGE[entry.circuitRef] || null,
        rounds: racesForCircuit,
        nextRound: racesForCircuit.length > 0 ? racesForCircuit[0].round : null,
        rankedDrivers,
        rankedConstructors,
        topDrivers: rankedDrivers.slice(0, 3),
        topConstructors: rankedConstructors.slice(0, 3),
        dataCoverage: driverCoverage,
        averageEntries: Number(averageEntries.toFixed(1)),
        recommendation: findRecommendationByCircuit(recommendationsByRace, entry.circuitRef),
      };
    })
    .sort((left, right) => {
      const leftRound = toFiniteNumber(left.nextRound, 9999);
      const rightRound = toFiniteNumber(right.nextRound, 9999);
      if (leftRound !== rightRound) {
        return leftRound - rightRound;
      }
      return String(left.circuitName).localeCompare(String(right.circuitName));
    });
}

export function findCircuitByRef(circuits, circuitRef) {
  const list = Array.isArray(circuits) ? circuits : [];
  return list.find((circuit) => circuit.circuitRef === circuitRef) || null;
}
