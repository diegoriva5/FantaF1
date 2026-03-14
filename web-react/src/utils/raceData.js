import { CSV_DRIVER_TO_KEY, LIVE_TRACK_META } from "../data/constants";

export function parseRaceCSV(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length < 4) continue;
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = (values[idx] || "").trim();
    });
    rows.push(row);
  }
  return rows;
}

export function buildRaceResults(trackRows) {
  return trackRows
    .map((row) => {
      const fullName = row.Driver || "";
      const driverKey = CSV_DRIVER_TO_KEY[fullName] || fullName.split(" ").pop();
      const points = parseFloat(row.Points) || 0;
      const position = row.Position === "NC" ? null : parseInt(row.Position, 10) || null;
      const timeRetired = row["Time/Retired"] || "";
      let status = "Finished";
      if (timeRetired === "DNF") status = "DNF";
      else if (timeRetired === "DNS") status = "DNS";
      else if (timeRetired.includes("lap")) status = timeRetired;

      return {
        position,
        position_text: row.Position || "–",
        driver_surname: driverKey,
        driver_forename: fullName.split(" ").slice(0, -1).join(" "),
        constructor_name: row.Team || "",
        points,
        grid: parseInt(row["Starting Grid"], 10) || null,
        status,
      };
    })
    .sort((left, right) => {
      if (left.position === null) return 1;
      if (right.position === null) return -1;
      return left.position - right.position;
    });
}

export function extractLastRace2026(rows) {
  if (rows.length === 0) return null;
  const tracks = [...new Set(rows.map((r) => r.Track).filter(Boolean))];
  if (tracks.length === 0) return null;
  const lastTrack = tracks[tracks.length - 1];
  const meta = LIVE_TRACK_META[lastTrack];
  if (!meta) return null;

  const trackRows = rows.filter((r) => r.Track === lastTrack);
  const results = buildRaceResults(trackRows);

  return {
    race_name: lastTrack + " Grand Prix",
    date: meta.date,
    year: 2026,
    round: meta.round,
    circuit_name: "",
    country_code: meta.country_code,
    track_image: meta.track_image,
    results,
  };
}
