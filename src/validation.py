"""
Validazione del roster 2026: verifica coerenza tra DRIVER_PRICES, TEAM_PRICES e TEAM_2026_LINEUP.
"""

from .config import DRIVER_PRICES, TEAM_2026_LINEUP, TEAM_PRICES, DRIVER_TO_CURRENT_TEAM


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
