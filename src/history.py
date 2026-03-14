"""
Punteggi storici (ultimi 10 anni) e profili per circuito.
"""

import math
from collections import defaultdict
from datetime import date
from pathlib import Path

from .config import (
    CIRCUIT_REF_TO_TRACK_IMAGE,
    DRIVER_PRICES,
    DRIVER_TO_CURRENT_TEAM,
    LIVE_DRIVER_TO_FANTASY,
    LIVE_TEAM_TO_FANTASY,
    TEAM_PRICES,
    TEAM_TO_CONSTRUCTOR_REF,
    UPCOMING_RACES_2026,
)
from .data_loader import load_csv, normalize_name, parse_float, parse_int


def year_weight(year: int, start_year: int, end_year: int, recency_bias: float) -> float:
    span = max(1, end_year - start_year)
    relative = max(0.0, min(1.0, (year - start_year) / span))
    return 1.0 + recency_bias * (relative ** 2)


def build_season_weights(start_year: int, end_year: int, recency_bias: float):
    return {
        year: year_weight(year, start_year, end_year, recency_bias)
        for year in range(start_year, end_year + 1)
    }


def update_weighted_metrics(stats, points, weight, position_order, is_classified):
    is_win = 1.0 if position_order == 1 else 0.0
    is_podium = 1.0 if position_order is not None and position_order <= 3 else 0.0
    is_top10 = 1.0 if position_order is not None and position_order <= 10 else 0.0
    stats["weighted_points"] += points * weight
    stats["weighted_entries"] += weight
    stats["weighted_wins"] += is_win * weight
    stats["weighted_podiums"] += is_podium * weight
    stats["weighted_top10"] += is_top10 * weight
    stats["weighted_finishes"] += (1.0 if is_classified else 0.0) * weight
    if position_order is not None:
        stats["weighted_position_sum"] += position_order * weight
        stats["weighted_position_count"] += weight


def metric_to_score(points_per_race, win_rate, podium_rate, top10_rate, finish_rate, avg_finish):
    normalized_finish = max(0.0, min(1.0, (21.0 - avg_finish) / 20.0))
    return (
        0.45 * points_per_race
        + 25.0 * win_rate
        + 12.0 * podium_rate
        + 8.0 * top10_rate
        + 10.0 * finish_rate
        + 8.0 * normalized_finish
    )


def compute_historical_scores(
    data_dir: Path,
    recency_bias: float,
    current_season_source: str | None = None,
    current_season_rows=None,
):
    races = load_csv(data_dir / "races.csv")
    results = load_csv(data_dir / "results.csv")
    drivers = load_csv(data_dir / "drivers.csv")
    constructors = load_csv(data_dir / "constructors.csv")

    race_year = {int(row["raceId"]): int(row["year"]) for row in races}
    historical_max_year = max(race_year.values())
    current_year = date.today().year
    if current_season_rows is None:
        current_season_rows = []

    include_current_season = bool(current_season_rows)
    max_year = max(
        historical_max_year,
        current_year if include_current_season else historical_max_year,
    )
    min_year = max_year - 9
    season_weights = build_season_weights(min_year, max_year, recency_bias)

    driver_stats = defaultdict(lambda: defaultdict(float))
    constructor_stats = defaultdict(lambda: defaultdict(float))
    live_driver_stats = defaultdict(lambda: defaultdict(float))
    live_constructor_stats = defaultdict(lambda: defaultdict(float))
    live_driver_names = {}

    for row in results:
        race_id = int(row["raceId"])
        year = race_year.get(race_id)
        if year is None or year < min_year or year > max_year:
            continue
        weight = season_weights[year]
        driver_id = int(row["driverId"])
        constructor_id = int(row["constructorId"])
        points = parse_float(row["points"], default=0.0) if row["points"] != "\\N" else 0.0
        position_order = parse_int(row["positionOrder"]) if row["positionOrder"] != "\\N" else None
        is_classified = row["position"] != "\\N"
        for stats, entity_id in ((driver_stats, driver_id), (constructor_stats, constructor_id)):
            update_weighted_metrics(
                stats=stats[entity_id],
                points=points,
                weight=weight,
                position_order=position_order,
                is_classified=is_classified,
            )

    if include_current_season:
        current_weight = season_weights.get(
            current_year,
            year_weight(current_year, min_year, max_year, recency_bias),
        )
        for row in current_season_rows:
            full_name = (row.get("Driver") or "").strip()
            team_name = (row.get("Team") or "").strip()
            if not full_name or not team_name:
                continue
            fantasy_driver_name = LIVE_DRIVER_TO_FANTASY.get(full_name, full_name.split(" ")[-1])
            fantasy_team_name = LIVE_TEAM_TO_FANTASY.get(team_name, team_name)
            constructor_ref = TEAM_TO_CONSTRUCTOR_REF.get(fantasy_team_name)
            if not constructor_ref:
                continue
            driver_key = normalize_name(fantasy_driver_name)
            live_driver_names.setdefault(driver_key, full_name)
            points = parse_float(row.get("Points"), default=0.0)
            position_order = parse_int(row.get("Position"))
            retired = (row.get("Time/Retired") or "").strip().upper()
            is_classified = position_order is not None and retired not in {"DNF", "DNS", "DSQ"}
            update_weighted_metrics(
                stats=live_driver_stats[driver_key],
                points=points,
                weight=current_weight,
                position_order=position_order,
                is_classified=is_classified,
            )
            update_weighted_metrics(
                stats=live_constructor_stats[constructor_ref],
                points=points,
                weight=current_weight,
                position_order=position_order,
                is_classified=is_classified,
            )

    def finalize_scores(stats_dict):
        out = {}
        for entity_id, stats in stats_dict.items():
            entries = stats["weighted_entries"]
            if entries <= 0:
                continue
            finish_count = stats["weighted_position_count"]
            avg_finish = stats["weighted_position_sum"] / finish_count if finish_count > 0 else 20.0
            out[entity_id] = {
                "score": metric_to_score(
                    points_per_race=stats["weighted_points"] / entries,
                    win_rate=stats["weighted_wins"] / entries,
                    podium_rate=stats["weighted_podiums"] / entries,
                    top10_rate=stats["weighted_top10"] / entries,
                    finish_rate=stats["weighted_finishes"] / entries,
                    avg_finish=avg_finish,
                ),
                "entries": entries,
                "points_per_race": stats["weighted_points"] / entries,
            }
        return out

    driver_scores_by_id = finalize_scores(driver_stats)
    constructor_scores_by_id = finalize_scores(constructor_stats)
    live_driver_scores = finalize_scores(live_driver_stats)
    live_constructor_scores = finalize_scores(live_constructor_stats)

    drivers_index = {int(row["driverId"]): row for row in drivers}
    constructors_index = {int(row["constructorId"]): row for row in constructors}
    constructor_name_by_ref = {row["constructorRef"]: row["name"] for row in constructors}

    driver_scores = {}
    for driver_id, payload in driver_scores_by_id.items():
        d = drivers_index.get(driver_id)
        if not d:
            continue
        key = normalize_name(d["surname"])
        current = driver_scores.get(key)
        if current is None or payload["entries"] > current["entries"]:
            driver_scores[key] = {**payload, "driver_id": driver_id, "full_name": f"{d['forename']} {d['surname']}"}

    constructor_scores = {}
    for constructor_id, payload in constructor_scores_by_id.items():
        c = constructors_index.get(constructor_id)
        if not c:
            continue
        constructor_scores[c["constructorRef"]] = {**payload, "constructor_id": constructor_id, "name": c["name"]}

    for driver_key, payload in live_driver_scores.items():
        current = driver_scores.get(driver_key)
        if current is None:
            driver_scores[driver_key] = {**payload, "driver_id": None, "full_name": live_driver_names.get(driver_key, driver_key.title())}
            continue
        total_entries = current["entries"] + payload["entries"]
        if total_entries <= 0:
            continue
        driver_scores[driver_key] = {
            **current,
            "score": (current["score"] * current["entries"] + payload["score"] * payload["entries"]) / total_entries,
            "entries": total_entries,
            "points_per_race": (current["points_per_race"] * current["entries"] + payload["points_per_race"] * payload["entries"]) / total_entries,
        }

    for constructor_ref, payload in live_constructor_scores.items():
        current = constructor_scores.get(constructor_ref)
        if current is None:
            constructor_scores[constructor_ref] = {**payload, "constructor_id": None, "name": constructor_name_by_ref.get(constructor_ref, constructor_ref.replace("_", " ").title())}
            continue
        total_entries = current["entries"] + payload["entries"]
        if total_entries <= 0:
            continue
        constructor_scores[constructor_ref] = {
            **current,
            "score": (current["score"] * current["entries"] + payload["score"] * payload["entries"]) / total_entries,
            "entries": total_entries,
            "points_per_race": (current["points_per_race"] * current["entries"] + payload["points_per_race"] * payload["entries"]) / total_entries,
        }

    return {
        "min_year": min_year,
        "max_year": max_year,
        "season_weights": season_weights,
        "current_season_year": current_year,
        "current_season_rows_used": len(current_season_rows),
        "current_season_source": current_season_source,
        "driver_scores": driver_scores,
        "constructor_scores": constructor_scores,
    }


def build_fantasy_scores(history, driver_prices=None, team_prices=None):
    if driver_prices is None:
        driver_prices = DRIVER_PRICES
    if team_prices is None:
        team_prices = TEAM_PRICES

    constructor_scores = history["constructor_scores"]
    driver_hist = history["driver_scores"]

    constructor_values = {}
    constructor_raw_scores = [v["score"] for v in constructor_scores.values()]
    constructor_global_avg = sum(constructor_raw_scores) / len(constructor_raw_scores)
    constructor_low_proxy = sorted(constructor_raw_scores)[max(0, len(constructor_raw_scores) // 4 - 1)]

    for team_name, price in team_prices.items():
        ref = TEAM_TO_CONSTRUCTOR_REF.get(team_name)
        if ref and ref in constructor_scores:
            score = constructor_scores[ref]["score"]
            source = "storico"
        elif ref is None:
            score = constructor_low_proxy * 0.9
            source = "proxy_nuovo_team"
        else:
            score = constructor_global_avg * 0.9
            source = "proxy_alias"
        constructor_values[team_name] = {
            "price": price, "score": score,
            "value_per_million": score / price, "source": source,
        }

    driver_values = {}
    all_driver_scores = [v["score"] for v in driver_hist.values()]
    driver_global_avg = sum(all_driver_scores) / len(all_driver_scores)

    for driver_name, price in driver_prices.items():
        key = normalize_name(driver_name)
        hist = driver_hist.get(key)
        team_name = DRIVER_TO_CURRENT_TEAM.get(driver_name)
        team_score = constructor_values.get(team_name, {}).get("score", constructor_global_avg)

        if hist:
            base_score = hist["score"]
            entries = hist["entries"]
            reliability_blend = min(1.0, entries / 20.0)
            fallback = 0.6 * team_score + 0.4 * driver_global_avg
            score = reliability_blend * base_score + (1.0 - reliability_blend) * fallback
            source = "storico_blend" if reliability_blend < 1.0 else "storico"
        else:
            score = 0.58 * team_score + 0.42 * driver_global_avg
            entries = 0.0
            source = "rookie_proxy"

        driver_values[driver_name] = {
            "price": price, "score": score,
            "value_per_million": score / price,
            "entries": entries, "source": source, "team_proxy": team_name,
        }

    return driver_values, constructor_values


def compute_track_profiles(data_dir: Path, recency_bias: float, min_year: int, max_year: int):
    races = load_csv(data_dir / "races.csv")
    results = load_csv(data_dir / "results.csv")
    drivers = load_csv(data_dir / "drivers.csv")
    constructors = load_csv(data_dir / "constructors.csv")
    circuits = load_csv(data_dir / "circuits.csv")

    race_meta = {
        int(row["raceId"]): {"year": int(row["year"]), "circuit_id": int(row["circuitId"])}
        for row in races
    }
    drivers_index = {int(row["driverId"]): row for row in drivers}
    constructors_index = {int(row["constructorId"]): row for row in constructors}
    circuits_index = {int(row["circuitId"]): row for row in circuits}

    driver_stats = defaultdict(lambda: defaultdict(lambda: defaultdict(float)))
    constructor_stats = defaultdict(lambda: defaultdict(lambda: defaultdict(float)))

    for row in results:
        race_id = int(row["raceId"])
        race = race_meta.get(race_id)
        if not race:
            continue
        year = race["year"]
        if year < min_year or year > max_year:
            continue
        circuit = circuits_index.get(race["circuit_id"])
        if not circuit:
            continue
        circuit_ref = circuit["circuitRef"]
        weight = year_weight(year, min_year, max_year, recency_bias)
        driver_id = int(row["driverId"])
        constructor_id = int(row["constructorId"])
        points = float(row["points"]) if row["points"] != "\\N" else 0.0
        position_order = None
        if row["positionOrder"] != "\\N":
            try:
                position_order = int(row["positionOrder"])
            except ValueError:
                position_order = None
        is_classified = row["position"] != "\\N"
        is_win = 1.0 if position_order == 1 else 0.0
        is_podium = 1.0 if position_order is not None and position_order <= 3 else 0.0
        is_top10 = 1.0 if position_order is not None and position_order <= 10 else 0.0
        d = drivers_index.get(driver_id)
        c = constructors_index.get(constructor_id)
        if not d or not c:
            continue
        driver_key = normalize_name(d["surname"])
        constructor_ref = c["constructorRef"]
        for stats, entity in (
            (driver_stats[circuit_ref], driver_key),
            (constructor_stats[circuit_ref], constructor_ref),
        ):
            stats[entity]["weighted_points"] += points * weight
            stats[entity]["weighted_entries"] += weight
            stats[entity]["weighted_wins"] += is_win * weight
            stats[entity]["weighted_podiums"] += is_podium * weight
            stats[entity]["weighted_top10"] += is_top10 * weight
            stats[entity]["weighted_finishes"] += (1.0 if is_classified else 0.0) * weight
            if position_order is not None:
                stats[entity]["weighted_position_sum"] += position_order * weight
                stats[entity]["weighted_position_count"] += weight

    def finalize(stats_dict):
        out = {}
        for entity, stats in stats_dict.items():
            entries = stats["weighted_entries"]
            if entries <= 0:
                continue
            finish_count = stats["weighted_position_count"]
            avg_finish = stats["weighted_position_sum"] / finish_count if finish_count > 0 else 20.0
            out[entity] = {
                "score": metric_to_score(
                    points_per_race=stats["weighted_points"] / entries,
                    win_rate=stats["weighted_wins"] / entries,
                    podium_rate=stats["weighted_podiums"] / entries,
                    top10_rate=stats["weighted_top10"] / entries,
                    finish_rate=stats["weighted_finishes"] / entries,
                    avg_finish=avg_finish,
                ),
                "entries": entries,
            }
        return out

    profiles = {}
    for race in UPCOMING_RACES_2026:
        circuit_ref = race["circuit_ref"]
        if not circuit_ref:
            continue
        circuit_row = next((c for c in circuits if c["circuitRef"] == circuit_ref), None)
        if not circuit_row:
            continue
        profiles[circuit_ref] = {
            "circuit_name": circuit_row["name"],
            "country": circuit_row["country"],
            "drivers": finalize(driver_stats.get(circuit_ref, {})),
            "constructors": finalize(constructor_stats.get(circuit_ref, {})),
        }

    return profiles


def enrich_track_profiles(track_profiles, driver_values, constructor_values, driver_prices=None, team_prices=None):
    if driver_prices is None:
        driver_prices = DRIVER_PRICES
    if team_prices is None:
        team_prices = TEAM_PRICES

    output = {}
    for circuit_ref, profile in track_profiles.items():
        driver_raw = []
        constructor_raw = []
        driver_payload = {}
        for driver_name in driver_prices:
            hist = profile["drivers"].get(normalize_name(driver_name))
            if hist:
                score, source, entries = hist["score"], "track_historical", hist["entries"]
            else:
                score, source, entries = driver_values[driver_name]["score"] * 0.92, "season_fallback", 0.0
            driver_payload[driver_name] = {"score": score, "entries": entries, "source": source}
            driver_raw.append(score)

        constructor_payload = {}
        for team_name in team_prices:
            constructor_ref = TEAM_TO_CONSTRUCTOR_REF.get(team_name)
            hist = profile["constructors"].get(constructor_ref) if constructor_ref is not None else None
            if hist:
                score, source, entries = hist["score"], "track_historical", hist["entries"]
            else:
                score, source, entries = constructor_values[team_name]["score"] * 0.94, "season_fallback", 0.0
            constructor_payload[team_name] = {"score": score, "entries": entries, "source": source}
            constructor_raw.append(score)

        d_min, d_max = min(driver_raw), max(driver_raw)
        c_min, c_max = min(constructor_raw), max(constructor_raw)
        for payload in driver_payload.values():
            payload["normalized"] = (payload["score"] - d_min) / (d_max - d_min) if d_max > d_min else 0.5
        for payload in constructor_payload.values():
            payload["normalized"] = (payload["score"] - c_min) / (c_max - c_min) if c_max > c_min else 0.5

        output[circuit_ref] = {
            "circuit_name": profile["circuit_name"],
            "country": profile["country"],
            "drivers": driver_payload,
            "constructors": constructor_payload,
        }

    return output
