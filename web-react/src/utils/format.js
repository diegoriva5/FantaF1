import { DRIVER_IMAGE_MAP, CSV_TEAM_TO_FANTASY, DRIVER_META } from "../data/constants";

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function countryFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2) return "🏁";
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

export function formatDate(dateString, locale = "it-IT") {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function driverImageUrl(driverName) {
  const localImage = DRIVER_IMAGE_MAP[driverName];
  if (localImage) {
    return `/drivers_pictures/${localImage}`;
  }
  const encoded = encodeURIComponent(driverName);
  return `https://ui-avatars.com/api/?name=${encoded}&background=111827&color=ffffff&size=256&bold=true`;
}

export function raceSlug(raceName) {
  return slugify(raceName);
}

export function driverSlug(driverName) {
  const meta = DRIVER_META[driverName];
  if (meta?.familyName && meta?.givenName) {
    return `${slugify(meta.familyName)}-${slugify(meta.givenName)}`;
  }
  return slugify(driverName);
}

export function driverKeyFromSlug(slug) {
  const normalizedSlug = slugify(slug);
  const candidate = Object.keys(DRIVER_META).find((name) => driverSlug(name) === normalizedSlug);
  return candidate || null;
}

export function constructorSlug(constructorName) {
  return slugify(constructorName);
}

export function constructorKeyFromSlug(slug, constructorNames) {
  const normalizedSlug = slugify(slug);
  const names = Array.isArray(constructorNames) ? constructorNames : [];
  const candidate = names.find((name) => constructorSlug(name) === normalizedSlug);
  return candidate || null;
}

export function driverDisplayName(driverName) {
  const meta = DRIVER_META[driverName];
  if (!meta) return driverName;
  if (meta.givenName && meta.familyName) {
    return `${meta.givenName} ${meta.familyName}`;
  }
  return driverName;
}

export function driverAge(driverName, referenceDate = new Date()) {
  const birthDateRaw = DRIVER_META[driverName]?.birthDate;
  if (!birthDateRaw) return null;

  const birthDate = new Date(`${birthDateRaw}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return null;

  let years = referenceDate.getFullYear() - birthDate.getFullYear();
  const monthDelta = referenceDate.getMonth() - birthDate.getMonth();
  const dayDelta = referenceDate.getDate() - birthDate.getDate();
  if (monthDelta < 0 || (monthDelta === 0 && dayDelta < 0)) {
    years -= 1;
  }
  return years;
}

export function normalizeConstructorName(teamName) {
  return CSV_TEAM_TO_FANTASY[teamName] || teamName;
}

export function formatPoints(points) {
  return Number.isInteger(points) ? String(points) : points.toFixed(1);
}

export function formatSignedDelta(delta) {
  const normalized = Math.abs(delta) < 1e-9 ? 0 : delta;
  const sign = normalized > 0 ? "+" : "";
  return `${sign}${normalized.toFixed(1)}M`;
}

export function formatFantasyPoints(points) {
  const normalized = Number.isFinite(points) ? points : 0;
  return normalized.toFixed(1);
}
