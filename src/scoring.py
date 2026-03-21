"""
Calcolo punteggi fantasy per piloti e costruttori per singolo evento.
"""

import math
from collections import defaultdict
from decimal import Decimal, ROUND_HALF_UP

from .config import (
    COMPLETION_LAP_THRESHOLDS,
    DRIVER_EVENT_FANTASY_SCORING,
    LIVE_DRIVER_TO_FANTASY,
    LIVE_TEAM_TO_FANTASY,
    ROLLING_AVERAGE_WINDOW,
    TEAM_2026_LINEUP,
)
from .data_loader import parse_int


# ── Name helpers ─────────────────────────────────────────────────────────────

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
    return (1, 999, -(laps if laps is not None else -1), grid if grid is not None else 999)


# ── Position builders ─────────────────────────────────────────────────────────

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
        key=lambda r: (
            parse_int(r.get("Starting Grid")) is None,
            parse_int(r.get("Starting Grid")) or 999,
            live_driver_name_from_row(r) or "",
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
    # Ordina i piloti: prima i classificati, poi gli NC in ordine di giri completati e ordine nel CSV
    ordered = []
    for row in sprint_rows:
        driver_name = live_driver_name_from_row(row)
        if not driver_name or driver_name not in known_driver_names:
            continue
        position = row.get("Position")
        laps = parse_int(row.get("Laps")) or 0
        ordered.append((driver_name, position, laps, row))
    # Classificati: position numerica
    classified = [x for x in ordered if isinstance(parse_int(x[1]), int)]
    classified.sort(key=lambda x: parse_int(x[1]))
    # NC: position non numerica
    nc = [x for x in ordered if not isinstance(parse_int(x[1]), int)]
    nc.sort(key=lambda x: (-x[2], x[0]))  # più giri, poi ordine alfabetico
    full_order = classified + nc
    sprint_positions = {}
    for idx, (driver_name, position, laps, row) in enumerate(full_order, start=1):
        sprint_positions[driver_name] = idx
    return sprint_positions


def build_driver_dns_status(track_rows, known_driver_names):
    dns_status = {}
    for row in track_rows:
        driver_name = live_driver_name_from_row(row)
        if not driver_name or driver_name not in known_driver_names:
            continue
        raw_position = (row.get("Position") or "").strip().upper()
        raw_retired = (row.get("Time/Retired") or "").strip().upper()
        if raw_position == "DNS" or "DNS" in raw_retired:
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
        present_drivers = [d for d in drivers if d in driver_finish_positions]
        if len(present_drivers) != 2:
            continue
        ahead = min(present_drivers, key=lambda d: driver_finish_positions[d])
        behind = max(present_drivers, key=lambda d: driver_finish_positions[d])
        margin = driver_finish_positions[behind] - driver_finish_positions[ahead]
        points = 0.0
        for margin_range, range_points in DRIVER_EVENT_FANTASY_SCORING["teammate_margin_points"].items():
            min_margin, max_margin = margin_range
            if min_margin <= margin <= max_margin:
                points = float(range_points)
                break
        teammate_results[ahead] = points
    return teammate_results


# ── Points tables ─────────────────────────────────────────────────────────────

def table_position_points(position, points_by_position):
    if position is None:
        return 0.0
    return float(points_by_position.get(position, 0.0))


def improvement_points(positions_improved):
    if positions_improved <= 0:
        return 0.0
    table = DRIVER_EVENT_FANTASY_SCORING["improvement_points_by_positions_gained"]
    capped = min(positions_improved, max(table))
    # Use decimal value directly, interpolate if needed
    if capped in table:
        return float(table[capped])
    # Linear interpolation between nearest lower and upper integer keys
    lower = int(capped)
    upper = lower + 1
    if upper > max(table):
        return float(table[max(table)])
    lower_points = table.get(lower, 0.0)
    upper_points = table.get(upper, 0.0)
    # Interpolate
    return float(lower_points + (upper_points - lower_points) * (capped - lower))


# ── Rolling average ───────────────────────────────────────────────────────────

def build_initial_rankings(prices):
    ordered = sorted(prices, key=lambda name: (-prices.get(name, 0.0), name))
    return {name: rank for rank, name in enumerate(ordered, start=1)}


def build_driver_finish_history_seed(
    prior_season_rows,
    known_driver_names,
    season_start_ranks,
    prior_season_qualifying_rows=None,
    prior_season_sprint_rows=None,
):
    fallback_rank = len(known_driver_names)
    seeded_history = {
        name: [season_start_ranks.get(name, fallback_rank)] * ROLLING_AVERAGE_WINDOW
        for name in known_driver_names
    }
    return seeded_history, [], {}


def build_driver_rolling_average_ranks(known_driver_names, season_start_ranks, prior_finish_history):
    rolling = {}
    fallback_rank = len(known_driver_names)
    for name in known_driver_names:
        seeded = [season_start_ranks.get(name, fallback_rank)] * ROLLING_AVERAGE_WINDOW
        history = prior_finish_history.get(name, seeded)
        # Aggiorna la rolling: togli la posizione più vecchia, aggiungi quella dell'ultimo GP
        if len(history) >= ROLLING_AVERAGE_WINDOW:
            history = history[1:]  # rimuove la più vecchia
        # Aggiungi la posizione dell'ultimo GP se disponibile
        last_position = prior_finish_history.get(name, [None])[-1]
        if last_position is not None:
            history.append(last_position)
        avg = sum(history) / len(history)
        rolling[name] = int(Decimal(str(avg)).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
    return rolling


# ── Event rank builder ────────────────────────────────────────────────────────

def build_event_ranks_from_scores(event_scores, tie_breakers=None):
    tie_breakers = tie_breakers or {}
    ranked = sorted(
        event_scores,
        key=lambda name: (-event_scores[name],) + tuple(tie_breakers.get(name, ())) + (name,),
    )
    return {name: rank for rank, name in enumerate(ranked, start=1)}


# ── Main scoring functions ────────────────────────────────────────────────────

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
    # Rolling average prima del GP (senza la posizione dell'ultimo GP)
    rolling_average_positions_before = {}
    fallback_rank = len(known_driver_names)
    for name in known_driver_names:
        seeded = [season_start_ranks.get(name, fallback_rank)] * ROLLING_AVERAGE_WINDOW
        history = prior_finish_history.get(name, seeded)
        # Non aggiungere la posizione dell'ultimo GP
        if len(history) > ROLLING_AVERAGE_WINDOW:
            history = history[-ROLLING_AVERAGE_WINDOW:]
        avg = sum(history) / len(history)
        rolling_average_positions_before[name] = float(Decimal(str(avg)).quantize(Decimal("1"), rounding=ROUND_HALF_UP))

    # Ranking rolling average prima del GP
    rolling_rank_before = {name: rank for rank, name in enumerate(sorted(rolling_average_positions_before, key=lambda n: rolling_average_positions_before[n]), start=1)}

    # Rolling average dopo il GP (con la posizione dell'ultimo GP)
    rolling_average_positions_after = build_driver_rolling_average_ranks(
        known_driver_names=known_driver_names,
        season_start_ranks=season_start_ranks,
        prior_finish_history=prior_finish_history,
    )
    rolling_rank_after = {name: rank for rank, name in enumerate(sorted(rolling_average_positions_after, key=lambda n: rolling_average_positions_after[n]), start=1)}

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
        is_dns = bool(driver_dns_status.get(driver_name))

        overtake_start_position = (
            qualifying_position if qualifying_position is not None else starting_position
        )
        overtakes = (
            max(0, overtake_start_position - finish_position)
            if (not is_dns and overtake_start_position is not None)
            else 0
        )

        # Calcolo improvement: posizioni guadagnate rispetto alla rolling average
        improvement = 0.0
        if not is_dns:
            rolling_avg = rolling_average_positions_before.get(driver_name, 0.0)
            improvement = max(0.0, rolling_avg - finish_position)

        race_finish_points = table_position_points(
            position=finish_position,
            points_by_position=DRIVER_EVENT_FANTASY_SCORING["race_finish_points_by_position"],
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
                points_by_position=DRIVER_EVENT_FANTASY_SCORING["qualifying_finish_points_by_position"],
            )
            + race_finish_points
            + table_position_points(
                position=sprint_position,
                points_by_position=DRIVER_EVENT_FANTASY_SCORING["sprint_finish_points_by_position"],
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
