#!/usr/bin/env python3
import argparse
import csv
import itertools
import json
import math
import unicodedata
from collections import defaultdict
from decimal import Decimal, ROUND_DOWN, ROUND_HALF_UP
from datetime import date
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import urlopen

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

CIRCUIT_REF_TO_TRACK_IMAGE = {
    "albert_park": "australia.png",
    "shanghai": "china.png",
    "suzuka": "japan.png",
    "bahrain": "bahrain.png",
    "jeddah": "saudi-arabia.png",
    "miami": "miami.png",
    "villeneuve": "canada.png",
    "monaco": "monaco.png",
    "catalunya": "barcelona.png",
    "red_bull_ring": "austria.png",
    "silverstone": "great-britain.png",
    "spa": "belgium.png",
    "hungaroring": "hungary.png",
    "zandvoort": "netherlands.png",
    "monza": "italy.png",
    "baku": "azerbaijan.png",
    "marina_bay": "singapore.png",
    "americas": "united-states.png",
    "rodriguez": "mexico.png",
    "interlagos": "brazil.png",
    "vegas": "las-vegas.png",
    "losail": "qatar.png",
    "yas_marina": "abu-dhabi.png",
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

CURRENT_SEASON_RESULTS_URL = (
    "https://raw.githubusercontent.com/toUpperCase78/formula1-datasets/"
    "master/Formula1_2026Season_RaceResults.csv"
)

CURRENT_SEASON_QUALIFYING_RESULTS_URL = (
    "https://raw.githubusercontent.com/toUpperCase78/formula1-datasets/"
    "master/Formula1_2026Season_QualifyingResults.csv"
)

CURRENT_SEASON_RESULTS_LOCAL_FILENAME = "current_season_2026_race_results.csv"
CURRENT_SEASON_QUALIFYING_LOCAL_FILENAME = "current_season_2026_qualifying_results.csv"
CURRENT_SEASON_SPRINT_LOCAL_FILENAME = "current_season_2026_sprint_results.csv"
PRIOR_SEASON_RESULTS_LOCAL_FILENAME = "Formula1_2025Season_RaceResults.csv"
PRIOR_SEASON_QUALIFYING_LOCAL_FILENAME = "Formula1_2025Season_QualifyingResults.csv"
PRIOR_SEASON_SPRINT_LOCAL_FILENAME = "Formula1_2025Season_SprintResults.csv"

# Classifica finale piloti 2025 (fornita dall'utente) usata per seed/ranking iniziale 2026.
# Il ranking viene compresso automaticamente ai soli piloti presenti nel roster 2026.
DRIVER_STANDINGS_2025_ORDER = [
    "Norris",
    "Verstappen",
    "Piastri",
    "Russell",
    "Leclerc",
    "Hamilton",
    "Antonelli",
    "Albon",
    "Sainz",
    "Alonso",
    "Hulkenberg",
    "Hadjar",
    "Bearman",
    "Lawson",
    "Ocon",
    "Stroll",
    "Tsunoda",
    "Gasly",
    "Bortoleto",
    "Colapinto",
    "Doohan",
]
DRIVER_STANDINGS_2025_RANK = {
    driver_name: position
    for position, driver_name in enumerate(DRIVER_STANDINGS_2025_ORDER, start=1)
}

LIVE_DRIVER_TO_FANTASY = {
    "George Russell": "Russell",
    "Lando Norris": "Norris",
    "Oscar Piastri": "Piastri",
    "Kimi Antonelli": "Antonelli",
    "Charles Leclerc": "Leclerc",
    "Lewis Hamilton": "Hamilton",
    "Max Verstappen": "Verstappen",
    "Isack Hadjar": "Hadjar",
    "Pierre Gasly": "Gasly",
    "Lance Stroll": "Stroll",
    "Carlos Sainz": "Sainz",
    "Liam Lawson": "Lawson",
    "Alexander Albon": "Albon",
    "Nico Hulkenberg": "Hulkenberg",
    "Gabriel Bortoleto": "Bortoleto",
    "Oliver Bearman": "Bearman",
    "Esteban Ocon": "Ocon",
    "Valtteri Bottas": "Bottas",
    "Sergio Perez": "Perez",
    "Franco Colapinto": "Colapinto",
    "Arvid Lindblad": "Lindblad",
    "Fernando Alonso": "Alonso",
}

LIVE_TEAM_TO_FANTASY = {
    "Mercedes": "Mercedes",
    "Ferrari": "Ferrari",
    "McLaren Mercedes": "McLaren",
    "Red Bull Racing Red Bull Ford": "RedBull",
    "Racing Bulls Red Bull Ford": "Racing Bulls",
    "Audi": "Audi",
    "Alpine Mercedes": "Alpine",
    "Williams Mercedes": "Williams",
    "Aston Martin Honda": "Aston Martin",
    "Cadillac Ferrari": "Cadillac",
    "Haas Ferrari": "Haas",
}

# Tabelle salary default (valori in milioni) come da regolamento fantasy.
DEFAULT_DRIVER_SALARY_TABLE = {
    1: 34.0,
    2: 32.4,
    3: 30.8,
    4: 29.2,
    5: 27.6,
    6: 26.0,
    7: 24.4,
    8: 22.8,
    9: 21.2,
    10: 19.6,
    11: 18.0,
    12: 16.4,
    13: 14.8,
    14: 13.2,
    15: 11.6,
    16: 10.0,
    17: 8.4,
    18: 6.8,
    19: 5.2,
    20: 3.6,
    21: 2.0,
    22: 0.4,
}

DEFAULT_CONSTRUCTOR_SALARY_TABLE = {
    1: 30.0,
    2: 27.4,
    3: 24.8,
    4: 22.2,
    5: 19.6,
    6: 17.0,
    7: 14.4,
    8: 11.8,
    9: 9.2,
    10: 6.6,
    11: 4.0,
}

ROLLING_AVERAGE_WINDOW = 8
COMPLETION_LAP_THRESHOLDS = (0.25, 0.5, 0.75, 0.9)

DRIVER_EVENT_FANTASY_SCORING = {
    # Da schermata ufficiale scoring: 1=50, 2=48, ... , 22=8
    "qualifying_finish_points_by_position": {
        position: 52 - (2 * position) for position in range(1, 23)
    },
    # Da schermata ufficiale scoring: 1=100, 2=97, ... , 22=37
    "race_finish_points_by_position": {
        position: 103 - (3 * position) for position in range(1, 23)
    },
    # Da schermata ufficiale scoring sprint: 1=22, 2=21, ... , 22=1
    "sprint_finish_points_by_position": {
        position: 23 - position for position in range(1, 23)
    },
    # Overtake Points: +3 per posizione netta guadagnata (qualifica -> arrivo gara)
    "overtake_points_per_position": 3,
    # Improvement Points: tabella ufficiale (da rank 8-gare -> risultato gara)
    "improvement_points_by_positions_gained": {
        **{
            0: 0,
            1: 0,
            2: 2,
            3: 4,
            4: 6,
            5: 9,
            6: 12,
            7: 16,
            8: 20,
            9: 25,
        },
        **{position: 30 for position in range(10, 23)},
    },
    # Beating Teammate: margine posizioni -> punti
    "teammate_margin_points": {
        (1, 3): 2,
        (4, 7): 5,
        (8, 12): 8,
        (13, 99): 12,
    },
    # Completion: +3 punti per ogni soglia completata (25/50/75/90)
    "completion_points_per_stage": 3,
}

CONSTRUCTOR_EVENT_FANTASY_SCORING = {
    "qualifying_finish_points_by_position": DRIVER_EVENT_FANTASY_SCORING[
        "qualifying_finish_points_by_position"
    ],
    "race_finish_points_by_position": DRIVER_EVENT_FANTASY_SCORING[
        "race_finish_points_by_position"
    ],
    "sprint_finish_points_by_position": DRIVER_EVENT_FANTASY_SCORING[
        "sprint_finish_points_by_position"
    ],
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


def parse_float(value, default=0.0):
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def parse_int(value):
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def is_remote_csv_source(csv_source: str) -> bool:
    return csv_source.startswith("http://") or csv_source.startswith("https://")


def fetch_remote_csv_payload(csv_url: str | None):
    if not csv_url:
        return None

    try:
        with urlopen(csv_url, timeout=20) as response:
            return response.read().decode("utf-8", errors="replace")
    except (HTTPError, URLError, TimeoutError, OSError):
        return None


def read_csv_payload(csv_source: str | None):
    if not csv_source:
        return None

    if is_remote_csv_source(csv_source):
        return fetch_remote_csv_payload(csv_source)

    source_path = Path(csv_source)
    try:
        return source_path.read_text(encoding="utf-8")
    except (FileNotFoundError, OSError, UnicodeDecodeError):
        return None


def parse_current_season_rows(payload: str, required_fields=None):
    if required_fields is None:
        required_fields = ("Driver", "Team", "Track")

    rows = []
    for row in csv.DictReader(payload.splitlines()):
        if not row:
            continue
        if any(not (row.get(field) or "").strip() for field in required_fields):
            continue
        rows.append(row)

    return rows


def load_current_season_csv(csv_source: str | None, required_fields=None):
    if not csv_source:
        return []

    payload = read_csv_payload(csv_source)
    if payload is None:
        return []

    return parse_current_season_rows(payload, required_fields=required_fields)


def sync_current_season_csv(csv_url: str | None, output_path: Path, required_fields=None):
    if not csv_url:
        return False

    payload = fetch_remote_csv_payload(csv_url)
    if payload is None:
        return False

    rows = parse_current_season_rows(payload, required_fields=required_fields)
    if not rows:
        return False

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8", newline="") as handle:
        handle.write(payload if payload.endswith("\n") else payload + "\n")

    return True


def resolve_current_season_source(csv_url: str | None, local_path: Path, sync: bool, required_fields=None):
    if sync and csv_url:
        synced = sync_current_season_csv(
            csv_url=csv_url,
            output_path=local_path,
            required_fields=required_fields,
        )
        if synced:
            return str(local_path)

    if local_path.exists():
        return str(local_path)

    return csv_url


def load_current_season_results(csv_source: str | None):
    return load_current_season_csv(csv_source)


def load_current_season_qualifying_results(csv_source: str | None):
    return load_current_season_csv(
        csv_source,
        required_fields=("Driver", "Team", "Track", "Position"),
    )


def load_current_season_sprint_results(csv_source: str | None):
    return load_current_season_csv(
        csv_source,
        required_fields=("Driver", "Team", "Track", "Position"),
    )


def year_weight(year: int, start_year: int, end_year: int, recency_bias: float) -> float:
    span = max(1, end_year - start_year)
    relative = (year - start_year) / span
    relative = max(0.0, min(1.0, relative))
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


def compute_salary_adjustment(base_variation: float, max_abs_change: float) -> float:
    normalized_base_variation = Decimal(str(round(base_variation, 1)))
    raw_adjustment = normalized_base_variation / Decimal("4")
    rounded_adjustment = float(
        abs(raw_adjustment).quantize(Decimal("0.1"), rounding=ROUND_DOWN)
    )
    if raw_adjustment < 0:
        rounded_adjustment *= -1.0

    rounded_adjustment = max(-max_abs_change, min(max_abs_change, rounded_adjustment))
    return round(rounded_adjustment, 1)


def rank_entities_for_salary_update(entity_names, event_ranks, current_prices):
    fallback_rank = len(entity_names) + 1
    return sorted(
        entity_names,
        key=lambda name: (
            event_ranks.get(name, fallback_rank),
            -current_prices.get(name, 0.0),
            name,
        ),
    )


def apply_single_event_salary_update(current_prices, event_ranks, default_salary_table, max_abs_change):
    updated_prices = dict(current_prices)
    ranked_entities = rank_entities_for_salary_update(
        entity_names=list(updated_prices),
        event_ranks=event_ranks,
        current_prices=updated_prices,
    )

    max_rank = max(default_salary_table)
    for rank, entity_name in enumerate(ranked_entities, start=1):
        table_rank = rank if rank in default_salary_table else max_rank
        target_salary = default_salary_table[table_rank]
        current_salary = updated_prices[entity_name]
        base_variation = target_salary - current_salary
        adjustment = compute_salary_adjustment(
            base_variation=base_variation,
            max_abs_change=max_abs_change,
        )
        updated_prices[entity_name] = round(current_salary + adjustment, 1)

    return updated_prices


def live_driver_name_from_row(row):
    full_name = (row.get("Driver") or "").strip()
    if not full_name:
        return None
    return LIVE_DRIVER_TO_FANTASY.get(full_name, full_name.split(" ")[-1])


def live_team_name_from_row(row):
    raw_team_name = (row.get("Team") or "").strip()
    if not raw_team_name:
        return None
    return LIVE_TEAM_TO_FANTASY.get(raw_team_name, raw_team_name)


def driver_classification_key(row):
    position = parse_int(row.get("Position"))
    laps = parse_int(row.get("Laps"))
    grid = parse_int(row.get("Starting Grid"))

    if position is not None:
        return (0, position, 0, grid if grid is not None else 999)

    # Per NC/DNF ordiniamo per giri completati (decrescente), poi griglia.
    return (1, 999, -(laps if laps is not None else -1), grid if grid is not None else 999)


def build_initial_rankings(prices):
    # Rank iniziale GridRival: prezzo piu alto = rank 1, poi a scendere.
    ordered_driver_names = sorted(
        prices,
        key=lambda driver_name: (-prices.get(driver_name, 0.0), driver_name),
    )

    return {
        driver_name: rank
        for rank, driver_name in enumerate(ordered_driver_names, start=1)
    }


def build_driver_event_positions(track_rows, known_driver_names):
    ordered = sorted(track_rows, key=driver_classification_key)
    ranked_names = []
    seen = set()

    for row in ordered:
        driver_name = live_driver_name_from_row(row)
        if not driver_name or driver_name not in known_driver_names or driver_name in seen:
            continue
        seen.add(driver_name)
        ranked_names.append(driver_name)

    return {name: rank for rank, name in enumerate(ranked_names, start=1)}


def build_track_event_order(rows):
    event_order = []
    seen_tracks = set()

    for row in rows:
        track_name = (row.get("Track") or "").strip()
        if not track_name or track_name in seen_tracks:
            continue
        seen_tracks.add(track_name)
        event_order.append(track_name)

    return event_order


def build_driver_finish_history_seed(
    prior_season_rows,
    known_driver_names,
    season_start_ranks,
    prior_season_qualifying_rows=None,
    prior_season_sprint_rows=None,
):
    fallback_rank = len(known_driver_names)
    seeded_history = {
        driver_name: [season_start_ranks.get(driver_name, fallback_rank)]
        * ROLLING_AVERAGE_WINDOW
        for driver_name in known_driver_names
    }

    # Regola GridRival: all'inizio stagione backfilliamo 8 eventi con il rank iniziale.
    return seeded_history, [], {}


def build_driver_qualifying_positions(track_rows, qualifying_rows, known_driver_names):
    qualifying_positions = {}

    for row in qualifying_rows:
        driver_name = live_driver_name_from_row(row)
        qualifying_position = parse_int(row.get("Position"))
        if (
            not driver_name
            or driver_name not in known_driver_names
            or qualifying_position is None
            or driver_name in qualifying_positions
        ):
            continue

        qualifying_positions[driver_name] = qualifying_position

    return qualifying_positions


def build_driver_starting_positions(track_rows, known_driver_names):
    starting_positions = {}

    for row in sorted(
        track_rows,
        key=lambda race_row: (
            parse_int(race_row.get("Starting Grid")) is None,
            parse_int(race_row.get("Starting Grid")) or 999,
            live_driver_name_from_row(race_row) or "",
        ),
    ):
        driver_name = live_driver_name_from_row(row)
        starting_grid = parse_int(row.get("Starting Grid"))
        if (
            not driver_name
            or driver_name not in known_driver_names
            or starting_grid is None
            or driver_name in starting_positions
        ):
            continue

        starting_positions[driver_name] = starting_grid

    return starting_positions


def build_driver_sprint_positions(sprint_rows, known_driver_names):
    sprint_positions = {}
    for row in sorted(
        sprint_rows,
        key=lambda sprint_row: (
            parse_int(sprint_row.get("Position")) is None,
            parse_int(sprint_row.get("Position")) or 999,
            live_driver_name_from_row(sprint_row) or "",
        ),
    ):
        driver_name = live_driver_name_from_row(row)
        sprint_position = parse_int(row.get("Position"))
        if (
            not driver_name
            or driver_name not in known_driver_names
            or sprint_position is None
            or driver_name in sprint_positions
        ):
            continue

        sprint_positions[driver_name] = sprint_position

    return sprint_positions


def build_driver_dns_status(track_rows, known_driver_names):
    dns_status = {}

    for row in track_rows:
        driver_name = live_driver_name_from_row(row)
        if not driver_name or driver_name not in known_driver_names:
            continue

        raw_position = (row.get("Position") or "").strip().upper()
        raw_retired = (row.get("Time/Retired") or "").strip().upper()
        is_dns = raw_position == "DNS" or "DNS" in raw_retired
        if is_dns:
            dns_status[driver_name] = True

    return dns_status


def build_driver_completion_stages(track_rows, known_driver_names):
    if not track_rows:
        return {}

    planned_laps = max(parse_int(row.get("Laps")) or 0 for row in track_rows)
    if planned_laps <= 0:
        return {}

    thresholds = [math.floor(planned_laps * pct) for pct in COMPLETION_LAP_THRESHOLDS]
    completion_stages = {}
    for row in track_rows:
        driver_name = live_driver_name_from_row(row)
        if (
            not driver_name
            or driver_name not in known_driver_names
            or driver_name in completion_stages
        ):
            continue

        completed_laps = parse_int(row.get("Laps")) or 0
        completion_stages[driver_name] = sum(
            1 for threshold in thresholds if completed_laps >= threshold
        )

    return completion_stages


def build_driver_teammate_results(driver_finish_positions):
    teammate_results = defaultdict(float)
    for drivers in TEAM_2026_LINEUP.values():
        present_drivers = [driver for driver in drivers if driver in driver_finish_positions]
        if len(present_drivers) != 2:
            continue

        ahead_driver = min(present_drivers, key=lambda driver: driver_finish_positions[driver])
        behind_driver = max(present_drivers, key=lambda driver: driver_finish_positions[driver])
        margin = driver_finish_positions[behind_driver] - driver_finish_positions[ahead_driver]

        points = 0.0
        for margin_range, range_points in DRIVER_EVENT_FANTASY_SCORING[
            "teammate_margin_points"
        ].items():
            min_margin, max_margin = margin_range
            if min_margin <= margin <= max_margin:
                points = float(range_points)
                break

        teammate_results[ahead_driver] = points

    return teammate_results


def positional_event_points(position, field_size, weight):
    if position is None:
        return 0.0
    return max(0.0, field_size + 1 - position) * weight


def table_position_points(position, points_by_position):
    if position is None:
        return 0.0
    return float(points_by_position.get(position, 0.0))


def improvement_points(positions_improved):
    if positions_improved <= 0:
        return 0.0

    table = DRIVER_EVENT_FANTASY_SCORING["improvement_points_by_positions_gained"]
    capped_positions = min(positions_improved, max(table))
    return float(table.get(capped_positions, 0.0))


def build_driver_rolling_average_ranks(
    known_driver_names,
    season_start_ranks,
    prior_finish_history,
):
    rolling_average_position_by_driver = {}
    fallback_rank = len(known_driver_names)

    for driver_name in known_driver_names:
        seeded_history = [
            season_start_ranks.get(driver_name, fallback_rank)
        ] * ROLLING_AVERAGE_WINDOW
        finish_history = prior_finish_history.get(driver_name, seeded_history)
        rolling_average = sum(finish_history) / len(finish_history)
        rolling_average_position_by_driver[driver_name] = int(
            Decimal(str(rolling_average)).quantize(
                Decimal("1"),
                rounding=ROUND_HALF_UP,
            )
        )

    return rolling_average_position_by_driver


def build_event_ranks_from_scores(event_scores, tie_breakers=None):
    tie_breakers = tie_breakers or {}

    ranked_entities = sorted(
        event_scores,
        key=lambda name: (-event_scores[name],) + tuple(tie_breakers.get(name, ())) + (name,),
    )
    return {name: rank for rank, name in enumerate(ranked_entities, start=1)}


def compute_driver_event_fantasy_scores(
    track_rows,
    qualifying_rows,
    sprint_rows,
    known_driver_names,
    season_start_ranks,
    prior_finish_history,
):
    driver_finish_positions = build_driver_event_positions(track_rows, known_driver_names)
    driver_qualifying_positions = build_driver_qualifying_positions(
        track_rows=track_rows,
        qualifying_rows=qualifying_rows,
        known_driver_names=known_driver_names,
    )
    driver_starting_positions = build_driver_starting_positions(
        track_rows=track_rows,
        known_driver_names=known_driver_names,
    )
    driver_sprint_positions = build_driver_sprint_positions(
        sprint_rows=sprint_rows,
        known_driver_names=known_driver_names,
    )
    driver_dns_status = build_driver_dns_status(
        track_rows=track_rows,
        known_driver_names=known_driver_names,
    )
    completion_stages = build_driver_completion_stages(track_rows, known_driver_names)
    teammate_results = build_driver_teammate_results(driver_finish_positions)
    rolling_average_positions = build_driver_rolling_average_ranks(
        known_driver_names=known_driver_names,
        season_start_ranks=season_start_ranks,
        prior_finish_history=prior_finish_history,
    )

    field_size = len(known_driver_names)
    event_scores = {}
    tie_breakers = {}

    for driver_name in known_driver_names:
        finish_position = driver_finish_positions.get(driver_name)
        if finish_position is None:
            continue

        qualifying_position = driver_qualifying_positions.get(driver_name)
        starting_position = driver_starting_positions.get(driver_name)
        sprint_position = driver_sprint_positions.get(driver_name)
        rolling_average_position = rolling_average_positions.get(driver_name, field_size)

        is_dns = bool(driver_dns_status.get(driver_name))

        overtake_start_position = (
            qualifying_position
            if qualifying_position is not None
            else starting_position
        )

        overtakes = (
            max(0, overtake_start_position - finish_position)
            if (not is_dns and overtake_start_position is not None)
            else 0
        )
        improvement = max(0, rolling_average_position - finish_position) if not is_dns else 0

        race_finish_points = table_position_points(
            position=finish_position,
            points_by_position=DRIVER_EVENT_FANTASY_SCORING[
                "race_finish_points_by_position"
            ],
        )
        if is_dns:
            race_finish_points = 0.0

        teammate_points = teammate_results.get(driver_name, 0.0) if not is_dns else 0.0
        completion_points = (
            completion_stages.get(driver_name, 0)
            * DRIVER_EVENT_FANTASY_SCORING["completion_points_per_stage"]
        )

        score = (
            table_position_points(
                position=qualifying_position,
                points_by_position=DRIVER_EVENT_FANTASY_SCORING[
                    "qualifying_finish_points_by_position"
                ],
            )
            + race_finish_points
            + table_position_points(
                position=sprint_position,
                points_by_position=DRIVER_EVENT_FANTASY_SCORING[
                    "sprint_finish_points_by_position"
                ],
            )
            + overtakes * DRIVER_EVENT_FANTASY_SCORING["overtake_points_per_position"]
            + improvement_points(improvement)
            + teammate_points
            + completion_points
        )

        event_scores[driver_name] = round(score, 4)
        tie_breakers[driver_name] = (
            finish_position,
            qualifying_position if qualifying_position is not None else 999,
            sprint_position if sprint_position is not None else 999,
        )

    return (
        event_scores,
        tie_breakers,
        driver_finish_positions,
        driver_qualifying_positions,
        driver_sprint_positions,
    )


def compute_constructor_event_fantasy_scores(
    track_rows,
    known_team_names,
    driver_event_scores,
    driver_finish_positions,
    driver_qualifying_positions,
    driver_sprint_positions,
):
    event_scores = defaultdict(float)
    finish_positions_by_team = defaultdict(list)
    qualifying_positions_by_team = defaultdict(list)
    sprint_positions_by_team = defaultdict(list)

    for row in track_rows:
        team_name = live_team_name_from_row(row)
        driver_name = live_driver_name_from_row(row)
        if (
            not team_name
            or team_name not in known_team_names
            or not driver_name
            or driver_name not in driver_finish_positions
        ):
            continue

        finish_position = driver_finish_positions.get(driver_name)
        qualifying_position = driver_qualifying_positions.get(driver_name)
        sprint_position = driver_sprint_positions.get(driver_name)
        if finish_position is None:
            continue

        event_scores[team_name] += driver_event_scores.get(driver_name, 0.0)

        finish_positions_by_team[team_name].append(finish_position)
        if qualifying_position is not None:
            qualifying_positions_by_team[team_name].append(qualifying_position)
        if sprint_position is not None:
            sprint_positions_by_team[team_name].append(sprint_position)

    tie_breakers = {}
    for team_name in known_team_names:
        finish_positions = sorted(finish_positions_by_team.get(team_name, []))
        qualifying_positions = sorted(qualifying_positions_by_team.get(team_name, []))
        sprint_positions = sorted(sprint_positions_by_team.get(team_name, []))
        tie_breakers[team_name] = tuple(
            (finish_positions + [999, 999])[:2]
            + (qualifying_positions + [999, 999])[:2]
            + (sprint_positions + [999, 999])[:2]
        )

    return dict(event_scores), tie_breakers


def apply_dynamic_salary_adjustments(
    driver_prices,
    team_prices,
    current_season_rows,
    current_season_qualifying_rows=None,
    current_season_sprint_rows=None,
    prior_season_rows=None,
    prior_season_qualifying_rows=None,
    prior_season_sprint_rows=None,
):
    updated_driver_prices = dict(driver_prices)
    updated_team_prices = dict(team_prices)
    current_season_qualifying_rows = current_season_qualifying_rows or []
    current_season_sprint_rows = current_season_sprint_rows or []
    prior_season_rows = prior_season_rows or []
    prior_season_qualifying_rows = prior_season_qualifying_rows or []
    prior_season_sprint_rows = prior_season_sprint_rows or []
    last_driver_price_change = {}
    last_constructor_price_change = {}
    last_driver_fantasy_scores = {}
    last_driver_fantasy_ranks = {}
    last_event_improvement_reference_window = {}
    last_event_incoming_rolling_average_positions = {}
    last_event_finish_positions = {}

    if not current_season_rows:
        return updated_driver_prices, updated_team_prices, {
            "events_processed": 0,
            "event_order": [],
            "last_event": None,
            "prior_seed_event_order": [],
            "prior_season_rows_used": len(prior_season_rows),
            "prior_qualifying_rows_used": len(prior_season_qualifying_rows),
            "prior_sprint_rows_used": len(prior_season_sprint_rows),
            "qualifying_rows_used": len(current_season_qualifying_rows),
            "sprint_rows_used": len(current_season_sprint_rows),
            "last_driver_price_change": {},
            "last_constructor_price_change": {},
            "last_driver_fantasy_scores": {},
            "last_driver_fantasy_ranks": {},
            "last_event_improvement_reference_window": {},
            "last_event_incoming_rolling_average_positions": {},
            "last_event_finish_positions": {},
        }

    season_start_driver_ranks = build_initial_rankings(driver_prices)
    known_driver_names = list(updated_driver_prices)
    (
        driver_rank_history,
        prior_seed_event_order,
        _prior_seed_event_rankings,
    ) = build_driver_finish_history_seed(
        prior_season_rows=prior_season_rows,
        known_driver_names=known_driver_names,
        season_start_ranks=season_start_driver_ranks,
        prior_season_qualifying_rows=prior_season_qualifying_rows,
        prior_season_sprint_rows=prior_season_sprint_rows,
    )

    event_order = build_track_event_order(current_season_rows)
    last_event_name = event_order[-1] if event_order else None

    for track_name in event_order:
        if track_name == last_event_name:
            for driver_name in known_driver_names:
                default_history = [
                    season_start_driver_ranks.get(driver_name, len(driver_prices))
                ] * ROLLING_AVERAGE_WINDOW
                rank_history = driver_rank_history.get(driver_name, default_history)
                last_event_improvement_reference_window[driver_name] = list(rank_history)

            last_event_incoming_rolling_average_positions = build_driver_rolling_average_ranks(
                known_driver_names=known_driver_names,
                season_start_ranks=season_start_driver_ranks,
                prior_finish_history=last_event_improvement_reference_window,
            )

        track_rows = [row for row in current_season_rows if (row.get("Track") or "").strip() == track_name]
        qualifying_rows = [
            row
            for row in current_season_qualifying_rows
            if (row.get("Track") or "").strip() == track_name
        ]
        sprint_rows = [
            row
            for row in current_season_sprint_rows
            if (row.get("Track") or "").strip() == track_name
        ]
        driver_prices_before_event = dict(updated_driver_prices)
        team_prices_before_event = dict(updated_team_prices)

        (
            driver_event_scores,
            driver_tie_breakers,
            driver_finish_positions,
            driver_qualifying_positions,
            driver_sprint_positions,
        ) = compute_driver_event_fantasy_scores(
            track_rows=track_rows,
            qualifying_rows=qualifying_rows,
            sprint_rows=sprint_rows,
            known_driver_names=known_driver_names,
            season_start_ranks=season_start_driver_ranks,
            prior_finish_history=driver_rank_history,
        )
        constructor_event_scores, constructor_tie_breakers = compute_constructor_event_fantasy_scores(
            track_rows=track_rows,
            known_team_names=list(updated_team_prices),
            driver_event_scores=driver_event_scores,
            driver_finish_positions=driver_finish_positions,
            driver_qualifying_positions=driver_qualifying_positions,
            driver_sprint_positions=driver_sprint_positions,
        )

        driver_event_ranks = build_event_ranks_from_scores(
            driver_event_scores,
            tie_breakers=driver_tie_breakers,
        )
        constructor_event_ranks = build_event_ranks_from_scores(
            constructor_event_scores,
            tie_breakers=constructor_tie_breakers,
        )

        last_driver_fantasy_scores = {
            name: round(score, 4) for name, score in driver_event_scores.items()
        }
        last_driver_fantasy_ranks = dict(driver_event_ranks)

        if track_name == last_event_name:
            last_event_finish_positions = {
                driver_name: driver_finish_positions.get(driver_name)
                for driver_name in known_driver_names
            }

        updated_driver_prices = apply_single_event_salary_update(
            current_prices=updated_driver_prices,
            event_ranks=driver_event_ranks,
            default_salary_table=DEFAULT_DRIVER_SALARY_TABLE,
            max_abs_change=2.0,
        )
        updated_team_prices = apply_single_event_salary_update(
            current_prices=updated_team_prices,
            event_ranks=constructor_event_ranks,
            default_salary_table=DEFAULT_CONSTRUCTOR_SALARY_TABLE,
            max_abs_change=3.0,
        )

        last_driver_price_change = {
            name: round(updated_driver_prices[name] - driver_prices_before_event.get(name, updated_driver_prices[name]), 1)
            for name in updated_driver_prices
        }
        last_constructor_price_change = {
            name: round(updated_team_prices[name] - team_prices_before_event.get(name, updated_team_prices[name]), 1)
            for name in updated_team_prices
        }

        for driver_name in known_driver_names:
            default_history = [
                season_start_driver_ranks.get(driver_name, len(driver_prices))
            ] * ROLLING_AVERAGE_WINDOW
            rank_history = driver_rank_history.get(driver_name, default_history)
            event_finish_position = driver_finish_positions.get(
                driver_name,
                season_start_driver_ranks.get(driver_name, len(driver_prices)),
            )
            driver_rank_history[driver_name] = (
                rank_history + [event_finish_position]
            )[-ROLLING_AVERAGE_WINDOW:]

    return updated_driver_prices, updated_team_prices, {
        "events_processed": len(event_order),
        "event_order": event_order,
        "last_event": event_order[-1] if event_order else None,
        "prior_seed_event_order": prior_seed_event_order,
        "prior_season_rows_used": len(prior_season_rows),
        "prior_qualifying_rows_used": len(prior_season_qualifying_rows),
        "prior_sprint_rows_used": len(prior_season_sprint_rows),
        "ranking_source": "event_fantasy_score",
        "improvement_seed_source": "season_start_price_rank_backfill",
        "improvement_window_source": "race_finish_position",
        "qualifying_rows_used": len(current_season_qualifying_rows),
        "sprint_rows_used": len(current_season_sprint_rows),
        "last_driver_price_change": last_driver_price_change,
        "last_constructor_price_change": last_constructor_price_change,
        "last_driver_fantasy_scores": last_driver_fantasy_scores,
        "last_driver_fantasy_ranks": last_driver_fantasy_ranks,
        "last_event_improvement_reference_window": last_event_improvement_reference_window,
        "last_event_incoming_rolling_average_positions": last_event_incoming_rolling_average_positions,
        "last_event_finish_positions": last_event_finish_positions,
    }


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
    current_season_source: str | None = CURRENT_SEASON_RESULTS_URL,
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
        current_season_rows = load_current_season_results(current_season_source)

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

            fantasy_driver_name = LIVE_DRIVER_TO_FANTASY.get(full_name)
            if not fantasy_driver_name:
                fantasy_driver_name = full_name.split(" ")[-1]

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

    for driver_key, payload in live_driver_scores.items():
        current = driver_scores.get(driver_key)
        if current is None:
            driver_scores[driver_key] = {
                **payload,
                "driver_id": None,
                "full_name": live_driver_names.get(driver_key, driver_key.title()),
            }
            continue

        total_entries = current["entries"] + payload["entries"]
        if total_entries <= 0:
            continue

        driver_scores[driver_key] = {
            **current,
            "score": (
                current["score"] * current["entries"]
                + payload["score"] * payload["entries"]
            )
            / total_entries,
            "entries": total_entries,
            "points_per_race": (
                current["points_per_race"] * current["entries"]
                + payload["points_per_race"] * payload["entries"]
            )
            / total_entries,
        }

    for constructor_ref, payload in live_constructor_scores.items():
        current = constructor_scores.get(constructor_ref)
        if current is None:
            constructor_scores[constructor_ref] = {
                **payload,
                "constructor_id": None,
                "name": constructor_name_by_ref.get(
                    constructor_ref,
                    constructor_ref.replace("_", " ").title(),
                ),
            }
            continue

        total_entries = current["entries"] + payload["entries"]
        if total_entries <= 0:
            continue

        constructor_scores[constructor_ref] = {
            **current,
            "score": (
                current["score"] * current["entries"]
                + payload["score"] * payload["entries"]
            )
            / total_entries,
            "entries": total_entries,
            "points_per_race": (
                current["points_per_race"] * current["entries"]
                + payload["points_per_race"] * payload["entries"]
            )
            / total_entries,
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
            "price": price,
            "score": score,
            "value_per_million": score / price,
            "source": source,
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


def enrich_track_profiles(
    track_profiles,
    driver_values,
    constructor_values,
    driver_prices=None,
    team_prices=None,
):
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
        for team_name in team_prices:
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


def compute_track_team_recommendations(
    driver_values,
    constructor_values,
    track_profiles,
    top_k=3,
    driver_prices=None,
    team_prices=None,
):
    if driver_prices is None:
        driver_prices = DRIVER_PRICES
    if team_prices is None:
        team_prices = TEAM_PRICES

    driver_names = list(driver_prices.keys())
    team_names = list(team_prices.keys())

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
            drivers_price = sum(driver_prices[driver] for driver in combo)
            avg_driver_norm = sum(driver_norm[driver] for driver in combo) / 5.0

            for constructor in team_names:
                total_price = drivers_price + team_prices[constructor]
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


def compute_last_race(data_dir: Path):
    races = load_csv(data_dir / "races.csv")
    results = load_csv(data_dir / "results.csv")
    drivers_rows = load_csv(data_dir / "drivers.csv")
    constructors_rows = load_csv(data_dir / "constructors.csv")
    circuits_rows = load_csv(data_dir / "circuits.csv")
    status_rows = load_csv(data_dir / "status.csv")

    drivers_index = {r["driverId"]: r for r in drivers_rows}
    constructors_index = {r["constructorId"]: r for r in constructors_rows}
    circuits_index = {r["circuitId"]: r for r in circuits_rows}
    status_index = {r["statusId"]: r["status"] for r in status_rows}

    races_sorted = sorted(races, key=lambda r: r["date"])
    last_race = races_sorted[-1]

    circuit = circuits_index.get(last_race["circuitId"], {})
    circuit_ref = circuit.get("circuitRef", "")
    track_image = CIRCUIT_REF_TO_TRACK_IMAGE.get(circuit_ref)

    race_results = [r for r in results if r["raceId"] == last_race["raceId"]]
    race_results_sorted = sorted(
        race_results,
        key=lambda r: int(r["positionOrder"]) if r["positionOrder"] != "\\N" else 999,
    )

    drivers_list = []
    for r in race_results_sorted:
        driver = drivers_index.get(r["driverId"], {})
        constructor = constructors_index.get(r["constructorId"], {})
        position_order = int(r["positionOrder"]) if r["positionOrder"] != "\\N" else None
        position_text = r["positionText"] if r["positionText"] != "\\N" else "DNF"
        points = float(r["points"]) if r["points"] != "\\N" else 0.0
        status = status_index.get(r["statusId"], "Unknown")
        drivers_list.append({
            "position": position_order,
            "position_text": position_text,
            "driver_surname": driver.get("surname", ""),
            "driver_forename": driver.get("forename", ""),
            "constructor_name": constructor.get("name", ""),
            "points": points,
            "grid": int(r["grid"]) if r["grid"] not in ("\\N", "0") else None,
            "status": status,
            "fastest_lap_time": r.get("fastestLapTime") if r.get("fastestLapTime") != "\\N" else None,
        })

    return {
        "race_name": last_race["name"],
        "date": last_race["date"],
        "year": int(last_race["year"]),
        "round": int(last_race["round"]),
        "circuit_name": circuit.get("name", ""),
        "circuit_ref": circuit_ref,
        "country": circuit.get("country", ""),
        "track_image": track_image,
        "results": drivers_list,
    }


def main():
    parser = argparse.ArgumentParser(
        description=(
            "Suggeritore team Fantasy F1 con blend tra storico (ultimi 10 anni) "
            "e stagione corrente, pesato per recenza"
        )
    )
    parser.add_argument("--data-dir", default="data", help="Cartella contenente i CSV")
    parser.add_argument("--top-k", type=int, default=10, help="Numero di team da mostrare")
    parser.add_argument(
        "--recency-bias",
        type=float,
        default=2.0,
        help="Intensita del peso verso le stagioni recenti (0 = tutti uguali)",
    )
    parser.add_argument(
        "--current-season-url",
        default=CURRENT_SEASON_RESULTS_URL,
        help="CSV live della stagione corrente da integrare nei punteggi",
    )
    parser.add_argument(
        "--current-season-qualifying-url",
        default=CURRENT_SEASON_QUALIFYING_RESULTS_URL,
        help="CSV live qualifiche stagione corrente da usare per il ranking salari fantasy",
    )
    parser.add_argument(
        "--current-season-sprint-url",
        default=None,
        help=(
            "CSV live sprint stagione corrente (opzionale) "
            "da usare per il ranking salari fantasy"
        ),
    )
    parser.add_argument(
        "--current-season-file",
        default=None,
        help=(
            "CSV locale risultati stagione corrente "
            f"(default: <data-dir>/{CURRENT_SEASON_RESULTS_LOCAL_FILENAME})"
        ),
    )
    parser.add_argument(
        "--current-season-qualifying-file",
        default=None,
        help=(
            "CSV locale qualifiche stagione corrente "
            f"(default: <data-dir>/{CURRENT_SEASON_QUALIFYING_LOCAL_FILENAME})"
        ),
    )
    parser.add_argument(
        "--current-season-sprint-file",
        default=None,
        help=(
            "CSV locale sprint stagione corrente "
            f"(default: <data-dir>/{CURRENT_SEASON_SPRINT_LOCAL_FILENAME})"
        ),
    )
    parser.add_argument(
        "--prior-season-results-file",
        default=None,
        help=(
            "CSV locale risultati stagione precedente usato per seed rolling improvement "
            f"(default: <data-dir>/{PRIOR_SEASON_RESULTS_LOCAL_FILENAME})"
        ),
    )
    parser.add_argument(
        "--prior-season-qualifying-file",
        default=None,
        help=(
            "CSV locale qualifiche stagione precedente per seed rolling improvement "
            f"(default: <data-dir>/{PRIOR_SEASON_QUALIFYING_LOCAL_FILENAME})"
        ),
    )
    parser.add_argument(
        "--prior-season-sprint-file",
        default=None,
        help=(
            "CSV locale sprint stagione precedente per seed rolling improvement "
            f"(default: <data-dir>/{PRIOR_SEASON_SPRINT_LOCAL_FILENAME})"
        ),
    )
    parser.add_argument(
        "--sync-current-season",
        action="store_true",
        help=(
            "Aggiorna i CSV locali stagione corrente scaricandoli dai feed URL "
            "prima del calcolo"
        ),
    )
    parser.add_argument(
        "--disable-current-season",
        action="store_true",
        help="Disabilita l'integrazione dei risultati live della stagione corrente",
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

    current_season_file = (
        Path(args.current_season_file)
        if args.current_season_file
        else data_dir / CURRENT_SEASON_RESULTS_LOCAL_FILENAME
    )
    current_season_qualifying_file = (
        Path(args.current_season_qualifying_file)
        if args.current_season_qualifying_file
        else data_dir / CURRENT_SEASON_QUALIFYING_LOCAL_FILENAME
    )
    current_season_sprint_file = (
        Path(args.current_season_sprint_file)
        if args.current_season_sprint_file
        else data_dir / CURRENT_SEASON_SPRINT_LOCAL_FILENAME
    )
    prior_season_results_file = (
        Path(args.prior_season_results_file)
        if args.prior_season_results_file
        else data_dir / PRIOR_SEASON_RESULTS_LOCAL_FILENAME
    )
    prior_season_qualifying_file = (
        Path(args.prior_season_qualifying_file)
        if args.prior_season_qualifying_file
        else data_dir / PRIOR_SEASON_QUALIFYING_LOCAL_FILENAME
    )
    prior_season_sprint_file = (
        Path(args.prior_season_sprint_file)
        if args.prior_season_sprint_file
        else data_dir / PRIOR_SEASON_SPRINT_LOCAL_FILENAME
    )

    if args.disable_current_season:
        current_season_source = None
        current_season_qualifying_source = None
        current_season_sprint_source = None
    else:
        current_season_source = resolve_current_season_source(
            csv_url=args.current_season_url,
            local_path=current_season_file,
            sync=args.sync_current_season,
            required_fields=("Driver", "Team", "Track"),
        )
        current_season_qualifying_source = resolve_current_season_source(
            csv_url=args.current_season_qualifying_url,
            local_path=current_season_qualifying_file,
            sync=args.sync_current_season,
            required_fields=("Driver", "Team", "Track", "Position"),
        )
        current_season_sprint_source = resolve_current_season_source(
            csv_url=args.current_season_sprint_url,
            local_path=current_season_sprint_file,
            sync=args.sync_current_season,
            required_fields=("Driver", "Team", "Track", "Position"),
        )

    current_season_rows = load_current_season_results(current_season_source)
    current_season_qualifying_rows = load_current_season_qualifying_results(
        current_season_qualifying_source
    )
    current_season_sprint_rows = load_current_season_sprint_results(
        current_season_sprint_source
    )
    prior_season_rows = load_current_season_results(str(prior_season_results_file))
    prior_season_qualifying_rows = load_current_season_qualifying_results(
        str(prior_season_qualifying_file)
    )
    prior_season_sprint_rows = load_current_season_sprint_results(
        str(prior_season_sprint_file)
    )
    runtime_driver_prices, runtime_team_prices, salary_adjustment_meta = apply_dynamic_salary_adjustments(
        driver_prices=DRIVER_PRICES,
        team_prices=TEAM_PRICES,
        current_season_rows=current_season_rows,
        current_season_qualifying_rows=current_season_qualifying_rows,
        current_season_sprint_rows=current_season_sprint_rows,
        prior_season_rows=prior_season_rows,
        prior_season_qualifying_rows=prior_season_qualifying_rows,
        prior_season_sprint_rows=prior_season_sprint_rows,
    )

    history = compute_historical_scores(
        data_dir=data_dir,
        recency_bias=args.recency_bias,
        current_season_source=current_season_source,
        current_season_rows=current_season_rows,
    )
    driver_values, constructor_values = build_fantasy_scores(
        history,
        driver_prices=runtime_driver_prices,
        team_prices=runtime_team_prices,
    )
    best_teams = optimize_teams(driver_values, constructor_values, top_k=args.top_k)
    track_raw_profiles = compute_track_profiles(
        data_dir=data_dir,
        recency_bias=args.recency_bias,
        min_year=history["min_year"],
        max_year=history["max_year"],
    )
    track_profiles = enrich_track_profiles(
        track_raw_profiles,
        driver_values,
        constructor_values,
        driver_prices=runtime_driver_prices,
        team_prices=runtime_team_prices,
    )
    track_team_recommendations = compute_track_team_recommendations(
        driver_values=driver_values,
        constructor_values=constructor_values,
        track_profiles=track_profiles,
        top_k=3,
        driver_prices=runtime_driver_prices,
        team_prices=runtime_team_prices,
    )
    last_race = compute_last_race(data_dir=data_dir)

    payload = {
        "config": {
            "budget": BUDGET,
            "year_window": [history["min_year"], history["max_year"]],
            "recency_bias": args.recency_bias,
            "season_weights": history["season_weights"],
            "current_season_year": history["current_season_year"],
            "current_season_rows_used": history["current_season_rows_used"],
            "current_season_source": history["current_season_source"],
            "current_season_local_file": str(current_season_file),
            "current_season_qualifying_local_file": str(current_season_qualifying_file),
            "current_season_sprint_local_file": str(current_season_sprint_file),
            "prior_season_results_file": str(prior_season_results_file),
            "prior_season_qualifying_file": str(prior_season_qualifying_file),
            "prior_season_sprint_file": str(prior_season_sprint_file),
            "current_season_sync_enabled": args.sync_current_season,
            "salary_adjustment": {
                "events_processed": salary_adjustment_meta["events_processed"],
                "event_order": salary_adjustment_meta["event_order"],
                "last_event": salary_adjustment_meta["last_event"],
                "prior_seed_event_order": salary_adjustment_meta.get("prior_seed_event_order", []),
                "prior_season_rows_used": salary_adjustment_meta.get("prior_season_rows_used", 0),
                "prior_qualifying_rows_used": salary_adjustment_meta.get("prior_qualifying_rows_used", 0),
                "prior_sprint_rows_used": salary_adjustment_meta.get("prior_sprint_rows_used", 0),
                "ranking_source": salary_adjustment_meta.get("ranking_source", "unknown"),
                "improvement_seed_source": salary_adjustment_meta.get("improvement_seed_source", "unknown"),
                "improvement_window_source": salary_adjustment_meta.get("improvement_window_source", "unknown"),
                "qualifying_rows_used": salary_adjustment_meta.get("qualifying_rows_used", 0),
                "sprint_rows_used": salary_adjustment_meta.get("sprint_rows_used", 0),
                "last_driver_price_change": salary_adjustment_meta.get("last_driver_price_change", {}),
                "last_constructor_price_change": salary_adjustment_meta.get("last_constructor_price_change", {}),
                "last_driver_fantasy_scores": salary_adjustment_meta.get("last_driver_fantasy_scores", {}),
                "last_driver_fantasy_ranks": salary_adjustment_meta.get("last_driver_fantasy_ranks", {}),
                "last_event_improvement_reference_window": salary_adjustment_meta.get("last_event_improvement_reference_window", {}),
                "last_event_incoming_rolling_average_positions": salary_adjustment_meta.get("last_event_incoming_rolling_average_positions", {}),
                "last_event_finish_positions": salary_adjustment_meta.get("last_event_finish_positions", {}),
                "qualifying_source": current_season_qualifying_source,
                "sprint_source": current_season_sprint_source,
                "scoring_components": [
                    "qualifying_position",
                    "race_finish_position",
                    "sprint_finish_position",
                    "overtakes",
                    "improvement",
                    "teammate",
                    "completion",
                ],
                "base_variation_divisor": 4,
                "min_abs_adjustment": 0.1,
                "max_abs_adjustment": {"driver": 2.0, "constructor": 3.0},
            },
        },
        "best_teams": best_teams,
        "driver_values": driver_values,
        "constructor_values": constructor_values,
        "upcoming_races_2026": UPCOMING_RACES_2026,
        "track_profiles": track_profiles,
        "track_team_recommendations": track_team_recommendations,
        "last_race": last_race,
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
