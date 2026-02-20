#!/usr/bin/env python3
import argparse
import csv
import itertools
import json
import math
import unicodedata
from collections import defaultdict
from pathlib import Path

BUDGET = 100.0

DRIVER_PRICES = {
    "Verstappen": 30.0,
    "Russell": 28.7,
    "Norris": 27.4,
    "Piastri": 26.1,
    "Antonelli": 24.8,
    "Leclerc": 23.5,
    "Alonso": 22.2,
    "Hamilton": 20.9,
    "Hadjar": 19.6,
    "Gasly": 18.3,
    "Stroll": 17.0,
    "Sainz": 15.7,
    "Lawson": 14.4,
    "Albon": 13.1,
    "Hulkenberg": 11.8,
    "Bortoleto": 10.5,
    "Bearman": 9.2,
    "Ocon": 7.8,
    "Bottas": 4.7,
    "Perez": 4.7,
    "Colapinto": 4.7,
    "Lindblad": 4.6,
}

TEAM_PRICES = {
    "Mercedes": 28.5,
    "McLaren": 28.5,
    "RedBull": 25.0,
    "Ferrari": 22.5,
    "Aston Martin": 20.0,
    "Williams": 17.5,
    "Racing Bulls": 15.0,
    "Alpine": 12.5,
    "Audi": 10.0,
    "Cadillac": 7.5,
    "Haas": 5.0,
}

TEAM_TO_CONSTRUCTOR_REF = {
    "Mercedes": "mercedes",
    "McLaren": "mclaren",
    "RedBull": "red_bull",
    "Ferrari": "ferrari",
    "Aston Martin": "aston_martin",
    "Williams": "williams",
    "Racing Bulls": "rb",
    "Alpine": "alpine",
    "Audi": "sauber",
    "Cadillac": None,
    "Haas": "haas",
}

TEAM_2026_LINEUP = {
    "Mercedes": ["Russell", "Antonelli"],
    "McLaren": ["Norris", "Piastri"],
    "RedBull": ["Verstappen", "Hadjar"],
    "Ferrari": ["Leclerc", "Hamilton"],
    "Aston Martin": ["Alonso", "Stroll"],
    "Williams": ["Sainz", "Albon"],
    "Racing Bulls": ["Lawson", "Lindblad"],
    "Alpine": ["Gasly", "Colapinto"],
    "Audi": ["Hulkenberg", "Bortoleto"],
    "Cadillac": ["Bottas", "Perez"],
    "Haas": ["Ocon", "Bearman"],
}

UPCOMING_RACES_2026 = [
    {
        "round": 1,
        "name": "Australia",
        "date": "2026-03-08",
        "country_code": "AU",
        "circuit_ref": "albert_park",
    },
    {
        "round": 2,
        "name": "Cina",
        "date": "2026-03-15",
        "country_code": "CN",
        "circuit_ref": "shanghai",
    },
    {
        "round": 3,
        "name": "Giappone",
        "date": "2026-03-29",
        "country_code": "JP",
        "circuit_ref": "suzuka",
    },
    {
        "round": 4,
        "name": "Bahrain",
        "date": "2026-04-12",
        "country_code": "BH",
        "circuit_ref": "bahrain",
    },
    {
        "round": 5,
        "name": "Arabia Saudita",
        "date": "2026-04-19",
        "country_code": "SA",
        "circuit_ref": "jeddah",
    },
    {
        "round": 6,
        "name": "Miami",
        "date": "2026-05-03",
        "country_code": "US",
        "circuit_ref": "miami",
    },
    {
        "round": 7,
        "name": "Canada",
        "date": "2026-05-24",
        "country_code": "CA",
        "circuit_ref": "villeneuve",
    },
    {
        "round": 8,
        "name": "Monaco",
        "date": "2026-06-07",
        "country_code": "MC",
        "circuit_ref": "monaco",
    },
    {
        "round": 9,
        "name": "Barcellona",
        "date": "2026-06-14",
        "country_code": "ES",
        "circuit_ref": "catalunya",
    },
    {
        "round": 10,
        "name": "Austria",
        "date": "2026-06-28",
        "country_code": "AT",
        "circuit_ref": "red_bull_ring",
    },
    {
        "round": 11,
        "name": "Gran Bretagna",
        "date": "2026-07-05",
        "country_code": "GB",
        "circuit_ref": "silverstone",
    },
    {
        "round": 12,
        "name": "Belgio",
        "date": "2026-07-19",
        "country_code": "BE",
        "circuit_ref": "spa",
    },
    {
        "round": 13,
        "name": "Ungheria",
        "date": "2026-07-26",
        "country_code": "HU",
        "circuit_ref": "hungaroring",
    },
    {
        "round": 14,
        "name": "Olanda",
        "date": "2026-08-23",
        "country_code": "NL",
        "circuit_ref": "zandvoort",
    },
    {
        "round": 15,
        "name": "Italia",
        "date": "2026-09-06",
        "country_code": "IT",
        "circuit_ref": "monza",
    },
    {
        "round": 16,
        "name": "Spagna",
        "date": "2026-09-13",
        "country_code": "ES",
        "circuit_ref": None,
    },
    {
        "round": 17,
        "name": "Azerbaijan",
        "date": "2026-09-26",
        "country_code": "AZ",
        "circuit_ref": "baku",
    },
    {
        "round": 18,
        "name": "Singapore",
        "date": "2026-10-11",
        "country_code": "SG",
        "circuit_ref": "marina_bay",
    },
    {
        "round": 19,
        "name": "USA",
        "date": "2026-10-25",
        "country_code": "US",
        "circuit_ref": "americas",
    },
    {
        "round": 20,
        "name": "Messico",
        "date": "2026-10-31",
        "country_code": "MX",
        "circuit_ref": "rodriguez",
    },
    {
        "round": 21,
        "name": "Brasile",
        "date": "2026-11-08",
        "country_code": "BR",
        "circuit_ref": "interlagos",
    },
    {
        "round": 22,
        "name": "Las Vegas",
        "date": "2026-11-22",
        "country_code": "US",
        "circuit_ref": "vegas",
    },
    {
        "round": 23,
        "name": "Qatar",
        "date": "2026-11-29",
        "country_code": "QA",
        "circuit_ref": "losail",
    },
    {
        "round": 24,
        "name": "Abu Dhabi",
        "date": "2026-12-06",
        "country_code": "AE",
        "circuit_ref": "yas_marina",
    },
]

# Usato come fallback per rookie / storico ridotto
DRIVER_TO_CURRENT_TEAM = {
    driver: team for team, drivers in TEAM_2026_LINEUP.items() for driver in drivers
}


def validate_2026_lineup():
    teams_with_prices = set(TEAM_PRICES)
    teams_with_lineup = set(TEAM_2026_LINEUP)
    priced_drivers = set(DRIVER_PRICES)
    lineup_drivers = set(DRIVER_TO_CURRENT_TEAM)

    if teams_with_prices != teams_with_lineup:
        missing_in_lineup = sorted(teams_with_prices - teams_with_lineup)
        missing_in_prices = sorted(teams_with_lineup - teams_with_prices)
        raise ValueError(
            "Mismatch team 2026 tra TEAM_PRICES e TEAM_2026_LINEUP. "
            f"Senza lineup: {missing_in_lineup}. Senza prezzo: {missing_in_prices}."
        )

    if priced_drivers != lineup_drivers:
        missing_in_lineup = sorted(priced_drivers - lineup_drivers)
        missing_in_prices = sorted(lineup_drivers - priced_drivers)
        raise ValueError(
            "Mismatch piloti 2026 tra DRIVER_PRICES e TEAM_2026_LINEUP. "
            f"Senza team: {missing_in_lineup}. Senza prezzo: {missing_in_prices}."
        )

    for team_name, drivers in TEAM_2026_LINEUP.items():
        if len(drivers) != 2:
            raise ValueError(
                f"Il team {team_name} deve avere esattamente 2 piloti nel lineup 2026."
            )


def normalize_name(value: str) -> str:
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    return value.lower().strip().replace(" ", "")


def load_csv(path: Path):
    with path.open("r", encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def year_weight(year: int, start_year: int, end_year: int, recency_bias: float) -> float:
    span = max(1, end_year - start_year)
    relative = (year - start_year) / span
    return 1.0 + recency_bias * relative


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


def compute_historical_scores(data_dir: Path, recency_bias: float):
    races = load_csv(data_dir / "races.csv")
    results = load_csv(data_dir / "results.csv")
    drivers = load_csv(data_dir / "drivers.csv")
    constructors = load_csv(data_dir / "constructors.csv")

    race_year = {int(row["raceId"]): int(row["year"]) for row in races}
    max_year = max(race_year.values())
    min_year = max_year - 9

    driver_stats = defaultdict(lambda: defaultdict(float))
    constructor_stats = defaultdict(lambda: defaultdict(float))

    for row in results:
        race_id = int(row["raceId"])
        year = race_year.get(race_id)
        if year is None or year < min_year or year > max_year:
            continue

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

        for stats, entity_id in ((driver_stats, driver_id), (constructor_stats, constructor_id)):
            stats[entity_id]["weighted_points"] += points * weight
            stats[entity_id]["weighted_entries"] += weight
            stats[entity_id]["weighted_wins"] += is_win * weight
            stats[entity_id]["weighted_podiums"] += is_podium * weight
            stats[entity_id]["weighted_top10"] += is_top10 * weight
            stats[entity_id]["weighted_finishes"] += (1.0 if is_classified else 0.0) * weight
            if position_order is not None:
                stats[entity_id]["weighted_position_sum"] += position_order * weight
                stats[entity_id]["weighted_position_count"] += weight

    def finalize_scores(stats_dict):
        out = {}
        for entity_id, stats in stats_dict.items():
            entries = stats["weighted_entries"]
            if entries <= 0:
                continue
            finish_count = stats["weighted_position_count"]
            avg_finish = (
                stats["weighted_position_sum"] / finish_count if finish_count > 0 else 20.0
            )
            score = metric_to_score(
                points_per_race=stats["weighted_points"] / entries,
                win_rate=stats["weighted_wins"] / entries,
                podium_rate=stats["weighted_podiums"] / entries,
                top10_rate=stats["weighted_top10"] / entries,
                finish_rate=stats["weighted_finishes"] / entries,
                avg_finish=avg_finish,
            )
            out[entity_id] = {
                "score": score,
                "entries": entries,
                "points_per_race": stats["weighted_points"] / entries,
            }
        return out

    driver_scores_by_id = finalize_scores(driver_stats)
    constructor_scores_by_id = finalize_scores(constructor_stats)

    drivers_index = {int(row["driverId"]): row for row in drivers}
    constructors_index = {int(row["constructorId"]): row for row in constructors}

    driver_scores = {}
    for driver_id, payload in driver_scores_by_id.items():
        d = drivers_index.get(driver_id)
        if not d:
            continue
        key = normalize_name(d["surname"])
        current = driver_scores.get(key)
        if current is None or payload["entries"] > current["entries"]:
            driver_scores[key] = {
                **payload,
                "driver_id": driver_id,
                "full_name": f"{d['forename']} {d['surname']}",
            }

    constructor_scores = {}
    for constructor_id, payload in constructor_scores_by_id.items():
        c = constructors_index.get(constructor_id)
        if not c:
            continue
        constructor_scores[c["constructorRef"]] = {
            **payload,
            "constructor_id": constructor_id,
            "name": c["name"],
        }

    return {
        "min_year": min_year,
        "max_year": max_year,
        "driver_scores": driver_scores,
        "constructor_scores": constructor_scores,
    }


def build_fantasy_scores(history):
    constructor_scores = history["constructor_scores"]
    driver_hist = history["driver_scores"]

    constructor_values = {}
    constructor_raw_scores = [v["score"] for v in constructor_scores.values()]
    constructor_global_avg = sum(constructor_raw_scores) / len(constructor_raw_scores)
    constructor_low_proxy = sorted(constructor_raw_scores)[max(0, len(constructor_raw_scores) // 4 - 1)]

    for team_name, price in TEAM_PRICES.items():
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
            "price": price,
            "score": score,
            "value_per_million": score / price,
            "source": source,
        }

    driver_values = {}
    all_driver_scores = [v["score"] for v in driver_hist.values()]
    driver_global_avg = sum(all_driver_scores) / len(all_driver_scores)

    for driver_name, price in DRIVER_PRICES.items():
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
            "price": price,
            "score": score,
            "value_per_million": score / price,
            "entries": entries,
            "source": source,
            "team_proxy": team_name,
        }

    return driver_values, constructor_values


def compute_track_profiles(data_dir: Path, recency_bias: float, min_year: int, max_year: int):
    races = load_csv(data_dir / "races.csv")
    results = load_csv(data_dir / "results.csv")
    drivers = load_csv(data_dir / "drivers.csv")
    constructors = load_csv(data_dir / "constructors.csv")
    circuits = load_csv(data_dir / "circuits.csv")

    race_meta = {
        int(row["raceId"]): {
            "year": int(row["year"]),
            "circuit_id": int(row["circuitId"]),
        }
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
            avg_finish = (
                stats["weighted_position_sum"] / finish_count if finish_count > 0 else 20.0
            )
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


def enrich_track_profiles(track_profiles, driver_values, constructor_values):
    output = {}
    for circuit_ref, profile in track_profiles.items():
        driver_raw = []
        constructor_raw = []

        driver_payload = {}
        for driver_name in DRIVER_PRICES:
            hist = profile["drivers"].get(normalize_name(driver_name))
            if hist:
                score = hist["score"]
                source = "track_historical"
                entries = hist["entries"]
            else:
                score = driver_values[driver_name]["score"] * 0.92
                source = "season_fallback"
                entries = 0.0

            driver_payload[driver_name] = {
                "score": score,
                "entries": entries,
                "source": source,
            }
            driver_raw.append(score)

        constructor_payload = {}
        for team_name in TEAM_PRICES:
            constructor_ref = TEAM_TO_CONSTRUCTOR_REF.get(team_name)
            hist = (
                profile["constructors"].get(constructor_ref)
                if constructor_ref is not None
                else None
            )
            if hist:
                score = hist["score"]
                source = "track_historical"
                entries = hist["entries"]
            else:
                score = constructor_values[team_name]["score"] * 0.94
                source = "season_fallback"
                entries = 0.0

            constructor_payload[team_name] = {
                "score": score,
                "entries": entries,
                "source": source,
            }
            constructor_raw.append(score)

        d_min, d_max = min(driver_raw), max(driver_raw)
        c_min, c_max = min(constructor_raw), max(constructor_raw)

        for payload in driver_payload.values():
            if d_max > d_min:
                payload["normalized"] = (payload["score"] - d_min) / (d_max - d_min)
            else:
                payload["normalized"] = 0.5

        for payload in constructor_payload.values():
            if c_max > c_min:
                payload["normalized"] = (payload["score"] - c_min) / (c_max - c_min)
            else:
                payload["normalized"] = 0.5

        output[circuit_ref] = {
            "circuit_name": profile["circuit_name"],
            "country": profile["country"],
            "drivers": driver_payload,
            "constructors": constructor_payload,
        }

    return output


def optimize_teams(driver_values, constructor_values, top_k=10):
    drivers = list(driver_values.items())
    constructors = list(constructor_values.items())

    ranked = []
    for driver_combo in itertools.combinations(drivers, 5):
        drivers_name = [d[0] for d in driver_combo]
        drivers_price = sum(d[1]["price"] for d in driver_combo)
        drivers_score = sum(d[1]["score"] for d in driver_combo)

        for constructor_name, c_payload in constructors:
            total_price = drivers_price + c_payload["price"]
            if total_price > BUDGET:
                continue

            total_score = drivers_score + c_payload["score"]
            ranked.append(
                {
                    "drivers": drivers_name,
                    "constructor": constructor_name,
                    "total_price": round(total_price, 2),
                    "budget_left": round(BUDGET - total_price, 2),
                    "predicted_score": round(total_score, 4),
                    "value_per_million": round(total_score / total_price, 4),
                }
            )

    ranked.sort(
        key=lambda x: (x["predicted_score"], x["value_per_million"], x["budget_left"]),
        reverse=True,
    )
    return ranked[:top_k]


def probability_from_strength(strength: float) -> int:
    return round(100 / (1 + math.exp(-5.5 * (strength - 0.5))))


def compute_track_team_recommendations(driver_values, constructor_values, track_profiles, top_k=3):
    driver_names = list(DRIVER_PRICES.keys())
    team_names = list(TEAM_PRICES.keys())

    global_driver_scores = [driver_values[name]["score"] for name in driver_names]
    global_team_scores = [constructor_values[name]["score"] for name in team_names]

    g_d_min, g_d_max = min(global_driver_scores), max(global_driver_scores)
    g_t_min, g_t_max = min(global_team_scores), max(global_team_scores)

    global_driver_norm = {
        name: (
            (driver_values[name]["score"] - g_d_min) / (g_d_max - g_d_min)
            if g_d_max > g_d_min
            else 0.5
        )
        for name in driver_names
    }
    global_team_norm = {
        name: (
            (constructor_values[name]["score"] - g_t_min) / (g_t_max - g_t_min)
            if g_t_max > g_t_min
            else 0.5
        )
        for name in team_names
    }

    recommendations = {}

    for race in UPCOMING_RACES_2026:
        circuit_ref = race["circuit_ref"]
        track = track_profiles.get(circuit_ref) if circuit_ref else None

        driver_norm = {}
        for name in driver_names:
            if track and name in track["drivers"]:
                driver_norm[name] = track["drivers"][name]["normalized"]
            else:
                driver_norm[name] = global_driver_norm[name]

        constructor_norm = {}
        for name in team_names:
            if track and name in track["constructors"]:
                constructor_norm[name] = track["constructors"][name]["normalized"]
            else:
                constructor_norm[name] = global_team_norm[name]

        ranked = []
        for combo in itertools.combinations(driver_names, 5):
            drivers_price = sum(DRIVER_PRICES[driver] for driver in combo)
            avg_driver_norm = sum(driver_norm[driver] for driver in combo) / 5.0

            for constructor in team_names:
                total_price = drivers_price + TEAM_PRICES[constructor]
                if total_price > BUDGET:
                    continue

                strength = 0.78 * avg_driver_norm + 0.22 * constructor_norm[constructor]
                probability = probability_from_strength(strength)
                ranked.append(
                    {
                        "drivers": list(combo),
                        "constructor": constructor,
                        "total_price": round(total_price, 2),
                        "budget_left": round(BUDGET - total_price, 2),
                        "probability": probability,
                        "strength": round(strength, 4),
                    }
                )

        ranked.sort(
            key=lambda item: (item["probability"], item["strength"], item["budget_left"]),
            reverse=True,
        )

        recommendations[race["name"]] = {
            "round": race["round"],
            "circuit_ref": circuit_ref,
            "teams": ranked[:top_k],
        }

    return recommendations


def main():
    parser = argparse.ArgumentParser(
        description="Suggeritore team Fantasy F1 basato su ultimi 10 anni con pesi di recenza"
    )
    parser.add_argument("--data-dir", default="data", help="Cartella contenente i CSV")
    parser.add_argument("--top-k", type=int, default=10, help="Numero di team da mostrare")
    parser.add_argument(
        "--recency-bias",
        type=float,
        default=2.0,
        help="Quanto pesano gli anni recenti (0 = tutti uguali)",
    )
    parser.add_argument(
        "--output",
        default="web/recommendations.json",
        help="File JSON di output",
    )
    args = parser.parse_args()

    validate_2026_lineup()

    data_dir = Path(args.data_dir)
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    history = compute_historical_scores(data_dir=data_dir, recency_bias=args.recency_bias)
    driver_values, constructor_values = build_fantasy_scores(history)
    best_teams = optimize_teams(driver_values, constructor_values, top_k=args.top_k)
    track_raw_profiles = compute_track_profiles(
        data_dir=data_dir,
        recency_bias=args.recency_bias,
        min_year=history["min_year"],
        max_year=history["max_year"],
    )
    track_profiles = enrich_track_profiles(track_raw_profiles, driver_values, constructor_values)
    track_team_recommendations = compute_track_team_recommendations(
        driver_values=driver_values,
        constructor_values=constructor_values,
        track_profiles=track_profiles,
        top_k=3,
    )

    payload = {
        "config": {
            "budget": BUDGET,
            "year_window": [history["min_year"], history["max_year"]],
            "recency_bias": args.recency_bias,
        },
        "best_teams": best_teams,
        "driver_values": driver_values,
        "constructor_values": constructor_values,
        "upcoming_races_2026": UPCOMING_RACES_2026,
        "track_profiles": track_profiles,
        "track_team_recommendations": track_team_recommendations,
    }

    with output_path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2, ensure_ascii=False)

    if best_teams:
        top = best_teams[0]
        print("=== Team consigliato ===")
        print(f"Piloti: {', '.join(top['drivers'])}")
        print(f"Team: {top['constructor']}")
        print(
            f"Costo: {top['total_price']}M | Budget residuo: {top['budget_left']}M | Score previsto: {top['predicted_score']}"
        )
    print(f"\nRisultati salvati in: {output_path}")


if __name__ == "__main__":
    main()
