"""
Caricamento e sincronizzazione CSV: dati storici e stagione corrente.
"""

import csv
import unicodedata
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import urlopen


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
