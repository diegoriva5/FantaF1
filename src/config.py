"""
Costanti, prezzi iniziali, lineup, tabelle di scoring per il FantaF1 2026.
"""

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

DRIVER_TO_CURRENT_TEAM = {
    driver: team for team, drivers in TEAM_2026_LINEUP.items() for driver in drivers
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
    {"round": 1,  "name": "Australia",     "date": "2026-03-08", "country_code": "AU", "circuit_ref": "albert_park"},
    {"round": 2,  "name": "Cina",          "date": "2026-03-15", "country_code": "CN", "circuit_ref": "shanghai"},
    {"round": 3,  "name": "Giappone",      "date": "2026-03-29", "country_code": "JP", "circuit_ref": "suzuka"},
    {"round": 4,  "name": "Bahrain",       "date": "2026-04-12", "country_code": "BH", "circuit_ref": "bahrain"},
    {"round": 5,  "name": "Arabia Saudita","date": "2026-04-19", "country_code": "SA", "circuit_ref": "jeddah"},
    {"round": 6,  "name": "Miami",         "date": "2026-05-03", "country_code": "US", "circuit_ref": "miami"},
    {"round": 7,  "name": "Canada",        "date": "2026-05-24", "country_code": "CA", "circuit_ref": "villeneuve"},
    {"round": 8,  "name": "Monaco",        "date": "2026-06-07", "country_code": "MC", "circuit_ref": "monaco"},
    {"round": 9,  "name": "Barcellona",    "date": "2026-06-14", "country_code": "ES", "circuit_ref": "catalunya"},
    {"round": 10, "name": "Austria",       "date": "2026-06-28", "country_code": "AT", "circuit_ref": "red_bull_ring"},
    {"round": 11, "name": "Gran Bretagna", "date": "2026-07-05", "country_code": "GB", "circuit_ref": "silverstone"},
    {"round": 12, "name": "Belgio",        "date": "2026-07-19", "country_code": "BE", "circuit_ref": "spa"},
    {"round": 13, "name": "Ungheria",      "date": "2026-07-26", "country_code": "HU", "circuit_ref": "hungaroring"},
    {"round": 14, "name": "Olanda",        "date": "2026-08-23", "country_code": "NL", "circuit_ref": "zandvoort"},
    {"round": 15, "name": "Italia",        "date": "2026-09-06", "country_code": "IT", "circuit_ref": "monza"},
    {"round": 16, "name": "Spagna",        "date": "2026-09-13", "country_code": "ES", "circuit_ref": None},
    {"round": 17, "name": "Azerbaijan",    "date": "2026-09-26", "country_code": "AZ", "circuit_ref": "baku"},
    {"round": 18, "name": "Singapore",     "date": "2026-10-11", "country_code": "SG", "circuit_ref": "marina_bay"},
    {"round": 19, "name": "USA",           "date": "2026-10-25", "country_code": "US", "circuit_ref": "americas"},
    {"round": 20, "name": "Messico",       "date": "2026-10-31", "country_code": "MX", "circuit_ref": "rodriguez"},
    {"round": 21, "name": "Brasile",       "date": "2026-11-08", "country_code": "BR", "circuit_ref": "interlagos"},
    {"round": 22, "name": "Las Vegas",     "date": "2026-11-22", "country_code": "US", "circuit_ref": "vegas"},
    {"round": 23, "name": "Qatar",         "date": "2026-11-29", "country_code": "QA", "circuit_ref": "losail"},
    {"round": 24, "name": "Abu Dhabi",     "date": "2026-12-06", "country_code": "AE", "circuit_ref": "yas_marina"},
]

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

DRIVER_STANDINGS_2025_ORDER = [
    "Norris", "Verstappen", "Piastri", "Russell", "Leclerc", "Hamilton",
    "Antonelli", "Albon", "Sainz", "Alonso", "Hulkenberg", "Hadjar",
    "Bearman", "Lawson", "Ocon", "Stroll", "Tsunoda", "Gasly",
    "Bortoleto", "Colapinto", "Doohan",
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

DEFAULT_DRIVER_SALARY_TABLE = {
    1: 34.0, 2: 32.4, 3: 30.8, 4: 29.2, 5: 27.6, 6: 26.0, 7: 24.4,
    8: 22.8, 9: 21.2, 10: 19.6, 11: 18.0, 12: 16.4, 13: 14.8, 14: 13.2,
    15: 11.6, 16: 10.0, 17: 8.4, 18: 6.8, 19: 5.2, 20: 3.6, 21: 2.0, 22: 0.4,
}

DEFAULT_CONSTRUCTOR_SALARY_TABLE = {
    1: 30.0, 2: 27.4, 3: 24.8, 4: 22.2, 5: 19.6,
    6: 17.0, 7: 14.4, 8: 11.8, 9: 9.2, 10: 6.6, 11: 4.0,
}

ROLLING_AVERAGE_WINDOW = 8
COMPLETION_LAP_THRESHOLDS = (0.25, 0.5, 0.75, 0.9)

DRIVER_EVENT_FANTASY_SCORING = {
    "qualifying_finish_points_by_position": {
        position: 52 - (2 * position) for position in range(1, 23)
    },
    "race_finish_points_by_position": {
        position: 103 - (3 * position) for position in range(1, 23)
    },
    "sprint_finish_points_by_position": {
        position: 23 - position for position in range(1, 23)
    },
    "overtake_points_per_position": 3,
    "improvement_points_by_positions_gained": {
        **{0: 0, 1: 0, 2: 2, 3: 4, 4: 6, 5: 9, 6: 12, 7: 16, 8: 20, 9: 25},
        **{position: 30 for position in range(10, 23)},
    },
    "teammate_margin_points": {
        (1, 3): 2,
        (4, 7): 5,
        (8, 12): 8,
        (13, 99): 12,
    },
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
