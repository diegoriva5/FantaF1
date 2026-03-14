"""
Ottimizzazione team fantasy e raccomandazioni per circuito.
"""

import itertools
import math

from .config import (
    BUDGET,
    DRIVER_PRICES,
    TEAM_PRICES,
    UPCOMING_RACES_2026,
)


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
            ranked.append({
                "drivers": drivers_name,
                "constructor": constructor_name,
                "total_price": round(total_price, 2),
                "budget_left": round(BUDGET - total_price, 2),
                "predicted_score": round(total_score, 4),
                "value_per_million": round(total_score / total_price, 4),
            })
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
        name: (driver_values[name]["score"] - g_d_min) / (g_d_max - g_d_min) if g_d_max > g_d_min else 0.5
        for name in driver_names
    }
    global_team_norm = {
        name: (constructor_values[name]["score"] - g_t_min) / (g_t_max - g_t_min) if g_t_max > g_t_min else 0.5
        for name in team_names
    }

    recommendations = {}
    for race in UPCOMING_RACES_2026:
        circuit_ref = race["circuit_ref"]
        track = track_profiles.get(circuit_ref) if circuit_ref else None

        driver_norm = {
            name: track["drivers"][name]["normalized"] if track and name in track["drivers"] else global_driver_norm[name]
            for name in driver_names
        }
        constructor_norm = {
            name: track["constructors"][name]["normalized"] if track and name in track["constructors"] else global_team_norm[name]
            for name in team_names
        }

        ranked = []
        for combo in itertools.combinations(driver_names, 5):
            drivers_price = sum(driver_prices[d] for d in combo)
            avg_driver_norm = sum(driver_norm[d] for d in combo) / 5.0
            for constructor in team_names:
                total_price = drivers_price + team_prices[constructor]
                if total_price > BUDGET:
                    continue
                strength = 0.78 * avg_driver_norm + 0.22 * constructor_norm[constructor]
                probability = probability_from_strength(strength)
                ranked.append({
                    "drivers": list(combo),
                    "constructor": constructor,
                    "total_price": round(total_price, 2),
                    "budget_left": round(BUDGET - total_price, 2),
                    "probability": probability,
                    "strength": round(strength, 4),
                })

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
