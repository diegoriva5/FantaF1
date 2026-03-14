# Fantasy F1 Optimizer

Programma per stimare il team Fantasy F1 migliore rispettando le regole:
- 5 piloti + 1 team
- budget massimo 100 milioni
- analisi storico ultimi 10 anni + stagione corrente live (se disponibile)
- cache locale dei CSV stagione corrente 2026 in `data/` con fallback offline
- pesi stagionali ordinati per recenza: stagione piu recente > stagione piu vecchia
- aggiornamento prezzi dopo ogni gara (driver e costruttori) con ranking fantasy evento da feed live gara + qualifica
- sito React con prossime gare 2026, bandiere e probabilità di successo per pista

## Avvio ottimizzatore

```bash
python3 fantasy_optimizer.py --top-k 15 --recency-bias 2.0
```

Per disattivare i dati live della stagione corrente:

```bash
python3 fantasy_optimizer.py --disable-current-season
```

Per sincronizzare i CSV 2026 locali in `data/` dai feed GitHub prima del calcolo:

```bash
python3 fantasy_optimizer.py --sync-current-season
```

Output:
- Console: miglior team consigliato
- File JSON: `web/recommendations.json`
  - include anche `upcoming_races_2026` e `track_profiles` per la UI

## Parametri utili

- `--data-dir`: cartella dei CSV (default `data`)
- `--top-k`: numero di combinazioni top da esportare
- `--recency-bias`: intensita del bias verso le stagioni piu recenti (`0` = nessuna preferenza)
- `--current-season-url`: URL CSV risultati live stagione corrente (default: feed 2026)
- `--current-season-qualifying-url`: URL CSV qualifiche live stagione corrente (default: feed 2026)
- `--current-season-sprint-url`: URL CSV sprint stagione corrente (opzionale)
- `--current-season-file`: path CSV locale risultati stagione corrente (default: `data/current_season_2026_race_results.csv`)
- `--current-season-qualifying-file`: path CSV locale qualifiche stagione corrente (default: `data/current_season_2026_qualifying_results.csv`)
- `--current-season-sprint-file`: path CSV locale sprint stagione corrente (default: `data/current_season_2026_sprint_results.csv`)
- `--prior-season-results-file`: path CSV legacy stagione precedente (non usato dal seed Improvement corrente)
- `--prior-season-qualifying-file`: path CSV legacy qualifiche stagione precedente (non usato dal seed Improvement corrente)
- `--prior-season-sprint-file`: path CSV legacy sprint stagione precedente (non usato dal seed Improvement corrente)
- `--sync-current-season`: scarica/aggiorna i CSV locali prima del calcolo
- `--disable-current-season`: usa solo i dati storici
- `--output`: file JSON di output

## Cache locale stagione corrente

Se esistono i file locali, l'ottimizzatore li usa come sorgente primaria:
- `data/current_season_2026_race_results.csv`
- `data/current_season_2026_qualifying_results.csv`
- `data/current_season_2026_sprint_results.csv` (opzionale)

Con `--sync-current-season` i file vengono aggiornati dai feed URL; se la rete non e disponibile resta valido l'ultimo snapshot locale.

## Tabelle punti Fantasy (posizioni)

Le posizioni vengono ora valutate con i punti tabellari ufficiali mostrati nella schermata Scoring:
- Qualifying Finish Position: 1=50, 2=48, ..., 22=8
- Race Finish Position: 1=100, 2=97, ..., 22=37
- Sprint Finish Position: 1=22, 2=21, ..., 22=1

Punteggi aggiuntivi (driver) allineati alle regole ufficiali:
- Overtake Points: `+3` per posizione netta guadagnata (qualifica -> arrivo gara)
- Se un pilota non e presente nel CSV qualifiche di quella gara, prende `0` punti qualifica; gli overtake points usano la `Starting Grid` del CSV gara se disponibile
- Se un pilota risulta `DNS` nel risultato gara, prende `0` punti per la componente gara (qualifica e sprint restano valide; completion resta calcolata dai giri registrati)
- Improvement Points (vs rank su media 8 gare):
  - 1 => 0
  - 2 => 2
  - 3 => 4
  - 4 => 6
  - 5 => 9
  - 6 => 12
  - 7 => 16
  - 8 => 20
  - 9 => 25
  - 10+ => 30
- Beating Teammate Points (margine posizioni):
  - 1-3 => 2
  - 4-7 => 5
  - 8-12 => 8
  - 13+ => 12
- Completion: `+3` per soglia raggiunta a `25%`, `50%`, `75%`, `90%` dei giri pianificati (soglie con arrotondamento per difetto)

### Seed ranking 2026 per Improvement

La logica Improvement segue la regola GridRival su media mobile di 8 gare:
- l'`initial season ranking` e calcolato dai prezzi iniziali pilota (piu alto = rank 1, poi a scendere)
- a inizio stagione ogni pilota viene backfillato con 8 valori uguali al proprio rank iniziale
- dopo ogni gara, il valore piu vecchio viene sostituito con la posizione reale di arrivo gara del pilota
- fino all'ottava gara, i placeholder iniziali vengono sostituiti progressivamente con dati reali

Esempio: rank iniziale 15, prima gara finita in P7
- finestra gara 1: `(15+15+15+15+15+15+15+15) / 8 = 15`
- finestra gara 2: `(15+15+15+15+15+15+15+7) / 8 = 14`

## Regole aggiornamento prezzi per gara

Ad ogni gara completata il modello aggiorna i prezzi usando la stessa logica mostrata nel tab `Scoring > Salaries`:

1. Costruisce un `event_fantasy_score` dai feed live di qualifica e gara.
Driver: posizione in qualifica, posizione finale, overtakes netti, improvement rispetto alla rolling average a 8 gare, teammate beat e completion.
Costruttori: somma del contributo qualifica + gara dei due piloti.
2. Ordina driver e costruttori in base a questo ranking fantasy evento.
3. Per ogni posizione usa la `default salary table`.
4. Calcola `base_variation = salary_default_rank - salary_corrente`.
5. Calcola `adjustment = floor(base_variation / 4, 0.1M)` verso zero.
6. Applica i limiti per evento:
Driver: max `+/- 2.0M`
Costruttori: max `+/- 3.0M`
Minimo assoluto (se c'e variazione): `0.1M`

Per audit del calcolo Improvement, l'output `config.salary_adjustment` ora include anche:
- `last_event_improvement_reference_window`: finestra 8-valori per pilota usata in ingresso all'ultima gara
- `last_event_incoming_rolling_average_positions`: posizione media in ingresso (derivata dalla finestra) per ciascun pilota
- `last_event_finish_positions`: posizione finale dell'ultima gara per ciascun pilota

## Progetto React (Vite)

La web app è in `web-react`.

1. Vai nella cartella:

```bash
cd web-react
```

2. Installa dipendenze:

```bash
npm install
```

3. Genera i dati JSON usati dalla UI:

```bash
npm run refresh:data
```

`refresh:data` ora include automaticamente la sync dei CSV 2026 locali.

4. Avvia il dev server React:

```bash
npm run dev
```

Con `npm run dev` i dati vengono aggiornati automaticamente quando modifichi il codice Python (`fantasy_optimizer.py`) o i file in `data/` e `rules/`.
`npm run build` esegue comunque `refresh:data` prima del build.
In dev il watcher usa una refresh locale (senza sync remoto continuo) per evitare loop di aggiornamento.

5. Apri l'URL mostrato da Vite (tipicamente `http://localhost:5173/`).

Nel sito puoi:
- vedere la barra fissa `FantaF1`
- selezionare una gara tra le prossime (con bandiera nazione)
- scegliere 5 piloti e 1 team
- ottenere la probabilità di successo stimata sulla pista selezionata
