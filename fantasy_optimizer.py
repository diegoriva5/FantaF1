#!/usr/bin/env python3
"""
Entry point del FantaF1 optimizer.
Tutta la logica è suddivisa nei moduli in src/:
  - src/config.py        costanti, prezzi, lineup, tabelle scoring
  - src/data_loader.py   caricamento e sincronizzazione CSV
  - src/scoring.py       calcolo punteggi fantasy per evento
  - src/salary.py        aggiustamento dinamico salari
  - src/history.py       punteggi storici e profili circuito
  - src/optimizer.py     ottimizzazione team e raccomandazioni
  - src/last_race.py     dati ultima gara dal dataset storico
  - src/validation.py    validazione roster 2026
"""

import argparse
import json
import sys
from pathlib import Path

# Assicura che il package src/ sia trovabile anche se lo script
# viene invocato da una directory diversa da quella del progetto.
sys.path.insert(0, str(Path(__file__).parent))

from src.config import (
    BUDGET,
    CURRENT_SEASON_QUALIFYING_RESULTS_URL,
    CURRENT_SEASON_QUALIFYING_LOCAL_FILENAME,
    CURRENT_SEASON_RESULTS_LOCAL_FILENAME,
    CURRENT_SEASON_RESULTS_URL,
    CURRENT_SEASON_SPRINT_LOCAL_FILENAME,
    DRIVER_PRICES,
    PRIOR_SEASON_QUALIFYING_LOCAL_FILENAME,
    PRIOR_SEASON_RESULTS_LOCAL_FILENAME,
    PRIOR_SEASON_SPRINT_LOCAL_FILENAME,
    TEAM_PRICES,
    UPCOMING_RACES_2026,
)
from src.data_loader import (
    load_current_season_qualifying_results,
    load_current_season_results,
    load_current_season_sprint_results,
    resolve_current_season_source,
)
from src.history import (
    build_fantasy_scores,
    compute_historical_scores,
    compute_track_profiles,
    enrich_track_profiles,
)
from src.last_race import compute_last_race
from src.optimizer import compute_track_team_recommendations, optimize_teams
from src.salary import apply_dynamic_salary_adjustments
from src.validation import validate_2026_lineup


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
        help="CSV live qualifiche stagione corrente",
    )
    parser.add_argument(
        "--current-season-sprint-url",
        default=None,
        help="CSV live sprint stagione corrente (opzionale)",
    )
    parser.add_argument(
        "--current-season-file",
        default=None,
        help=f"CSV locale risultati stagione corrente (default: <data-dir>/{CURRENT_SEASON_RESULTS_LOCAL_FILENAME})",
    )
    parser.add_argument(
        "--current-season-qualifying-file",
        default=None,
        help=f"CSV locale qualifiche stagione corrente (default: <data-dir>/{CURRENT_SEASON_QUALIFYING_LOCAL_FILENAME})",
    )
    parser.add_argument(
        "--current-season-sprint-file",
        default=None,
        help=f"CSV locale sprint stagione corrente (default: <data-dir>/{CURRENT_SEASON_SPRINT_LOCAL_FILENAME})",
    )
    parser.add_argument(
        "--prior-season-results-file",
        default=None,
        help=f"CSV locale risultati stagione precedente (default: <data-dir>/{PRIOR_SEASON_RESULTS_LOCAL_FILENAME})",
    )
    parser.add_argument(
        "--prior-season-qualifying-file",
        default=None,
        help=f"CSV locale qualifiche stagione precedente (default: <data-dir>/{PRIOR_SEASON_QUALIFYING_LOCAL_FILENAME})",
    )
    parser.add_argument(
        "--prior-season-sprint-file",
        default=None,
        help=f"CSV locale sprint stagione precedente (default: <data-dir>/{PRIOR_SEASON_SPRINT_LOCAL_FILENAME})",
    )
    parser.add_argument(
        "--sync-current-season",
        action="store_true",
        help="Aggiorna i CSV locali stagione corrente scaricandoli dai feed URL prima del calcolo",
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
    current_season_qualifying_rows = load_current_season_qualifying_results(current_season_qualifying_source)
    current_season_sprint_rows = load_current_season_sprint_results(current_season_sprint_source)
    prior_season_rows = load_current_season_results(str(prior_season_results_file))
    prior_season_qualifying_rows = load_current_season_qualifying_results(str(prior_season_qualifying_file))
    prior_season_sprint_rows = load_current_season_sprint_results(str(prior_season_sprint_file))

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
                "driver_initial_prices": salary_adjustment_meta.get("driver_initial_prices", {}),
                "driver_event_history": salary_adjustment_meta.get("driver_event_history", {}),
                "constructor_initial_prices": salary_adjustment_meta.get("constructor_initial_prices", {}),
                "constructor_event_history": salary_adjustment_meta.get("constructor_event_history", {}),
                "qualifying_source": current_season_qualifying_source,
                "sprint_source": current_season_sprint_source,
                "scoring_components": [
                    "qualifying_position", "race_finish_position", "sprint_finish_position",
                    "overtakes", "improvement", "teammate", "completion",
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
