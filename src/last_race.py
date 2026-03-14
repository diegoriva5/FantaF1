"""
Calcola i dati dell'ultima gara disponibile nel dataset storico.
"""

from pathlib import Path

from .config import CIRCUIT_REF_TO_TRACK_IMAGE
from .data_loader import load_csv, parse_float, parse_int


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
