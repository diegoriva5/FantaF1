"""
Aggiustamento dinamico dei salari dopo ogni evento della stagione corrente.
"""

from decimal import Decimal, ROUND_DOWN

from .config import (
    DEFAULT_CONSTRUCTOR_SALARY_TABLE,
    DEFAULT_DRIVER_SALARY_TABLE,
    ROLLING_AVERAGE_WINDOW,
)
from .scoring import (
    build_driver_finish_history_seed,
    build_driver_rolling_average_ranks,
    build_event_ranks_from_scores,
    build_initial_rankings,
    build_track_event_order,
    compute_constructor_event_fantasy_scores,
    compute_driver_event_fantasy_scores,
    live_driver_name_from_row,
    live_team_name_from_row,
)


def compute_salary_adjustment(base_variation: float, max_abs_change: float) -> float:
    normalized = Decimal(str(round(base_variation, 1)))
    raw = normalized / Decimal("4")
    rounded = float(abs(raw).quantize(Decimal("0.1"), rounding=ROUND_DOWN))
    if raw < 0:
        rounded *= -1.0
    rounded = max(-max_abs_change, min(max_abs_change, rounded))
    return round(rounded, 1)


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
    known_driver_names = list(updated_driver_prices)
    current_season_qualifying_rows = current_season_qualifying_rows or []
    current_season_sprint_rows = current_season_sprint_rows or []
    prior_season_rows = prior_season_rows or []
    prior_season_qualifying_rows = prior_season_qualifying_rows or []
    prior_season_sprint_rows = prior_season_sprint_rows or []
    driver_initial_prices = {name: round(price, 1) for name, price in updated_driver_prices.items()}
    driver_event_history = {name: [] for name in known_driver_names}
    constructor_initial_prices = {name: round(price, 1) for name, price in updated_team_prices.items()}
    constructor_event_history = {name: [] for name in updated_team_prices}
    last_driver_price_change = {}
    last_constructor_price_change = {}
    last_driver_fantasy_scores = {}
    last_driver_fantasy_ranks = {}
    last_event_improvement_reference_window = {}
    last_event_incoming_rolling_average_positions = {}
    last_event_finish_positions = {}

    _empty_meta = {
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
        "driver_initial_prices": driver_initial_prices,
        "driver_event_history": driver_event_history,
        "constructor_initial_prices": constructor_initial_prices,
        "constructor_event_history": constructor_event_history,
    }

    if not current_season_rows:
        return updated_driver_prices, updated_team_prices, _empty_meta

    season_start_driver_ranks = build_initial_rankings(driver_prices)
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

    for event_round, track_name in enumerate(event_order, start=1):
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
            row for row in current_season_qualifying_rows
            if (row.get("Track") or "").strip() == track_name
        ]
        sprint_rows = [
            row for row in current_season_sprint_rows
            if (row.get("Track") or "").strip() == track_name
        ]

        driver_race_points = {}
        for row in track_rows:
            driver_name = live_driver_name_from_row(row)
            if not driver_name or driver_name not in known_driver_names:
                continue
            try:
                points = float(row.get("Points") or 0.0)
            except (TypeError, ValueError):
                points = 0.0
            driver_race_points[driver_name] = round(
                driver_race_points.get(driver_name, 0.0) + points,
                4,
            )

        constructor_race_points = {}
        for row in track_rows:
            team_name = live_team_name_from_row(row)
            if not team_name or team_name not in updated_team_prices:
                continue
            try:
                points = float(row.get("Points") or 0.0)
            except (TypeError, ValueError):
                points = 0.0
            constructor_race_points[team_name] = round(
                constructor_race_points.get(team_name, 0.0) + points,
                4,
            )

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

        driver_event_ranks = build_event_ranks_from_scores(driver_event_scores, tie_breakers=driver_tie_breakers)
        constructor_event_ranks = build_event_ranks_from_scores(constructor_event_scores, tie_breakers=constructor_tie_breakers)

        last_driver_fantasy_scores = {name: round(score, 4) for name, score in driver_event_scores.items()}
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
            price_before = round(driver_prices_before_event.get(driver_name, updated_driver_prices.get(driver_name, 0.0)), 1)
            price_after = round(updated_driver_prices.get(driver_name, price_before), 1)
            driver_event_history[driver_name].append({
                "round": event_round,
                "event": track_name,
                "price_before": price_before,
                "price_after": price_after,
                "price_change": round(price_after - price_before, 1),
                "race_points": round(driver_race_points.get(driver_name, 0.0), 4),
                "fantasy_points": round(driver_event_scores.get(driver_name, 0.0), 4),
                "fantasy_rank": driver_event_ranks.get(driver_name),
                "finish_position": driver_finish_positions.get(driver_name),
            })

        for constructor_name in updated_team_prices:
            price_before = round(
                team_prices_before_event.get(constructor_name, updated_team_prices.get(constructor_name, 0.0)),
                1,
            )
            price_after = round(updated_team_prices.get(constructor_name, price_before), 1)
            constructor_event_history[constructor_name].append({
                "round": event_round,
                "event": track_name,
                "price_before": price_before,
                "price_after": price_after,
                "price_change": round(price_after - price_before, 1),
                "race_points": round(constructor_race_points.get(constructor_name, 0.0), 4),
                "fantasy_points": round(constructor_event_scores.get(constructor_name, 0.0), 4),
                "fantasy_rank": constructor_event_ranks.get(constructor_name),
            })

        for driver_name in known_driver_names:
            default_history = [
                season_start_driver_ranks.get(driver_name, len(driver_prices))
            ] * ROLLING_AVERAGE_WINDOW
            rank_history = driver_rank_history.get(driver_name, default_history)
            event_finish_position = driver_finish_positions.get(
                driver_name,
                season_start_driver_ranks.get(driver_name, len(driver_prices)),
            )
            driver_rank_history[driver_name] = (rank_history + [event_finish_position])[-ROLLING_AVERAGE_WINDOW:]

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
        "driver_initial_prices": driver_initial_prices,
        "driver_event_history": driver_event_history,
        "constructor_initial_prices": constructor_initial_prices,
        "constructor_event_history": constructor_event_history,
    }
