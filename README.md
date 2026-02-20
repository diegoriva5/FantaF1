# Fantasy F1 Optimizer

Programma per stimare il team Fantasy F1 migliore rispettando le regole:
- 5 piloti + 1 team
- budget massimo 100 milioni
- analisi storica ultimi 10 anni con peso maggiore agli anni recenti
- sito React con prossime gare 2026, bandiere e probabilità di successo per pista

## Avvio ottimizzatore

```bash
python3 fantasy_optimizer.py --top-k 15 --recency-bias 2.0
```

Output:
- Console: miglior team consigliato
- File JSON: `web/recommendations.json`
  - include anche `upcoming_races_2026` e `track_profiles` per la UI

## Parametri utili

- `--data-dir`: cartella dei CSV (default `data`)
- `--top-k`: numero di combinazioni top da esportare
- `--recency-bias`: intensità peso anni recenti (`0` = nessuna preferenza)
- `--output`: file JSON di output

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

4. Avvia il dev server React:

```bash
npm run dev
```

5. Apri l'URL mostrato da Vite (tipicamente `http://localhost:5173/`).

Nel sito puoi:
- vedere la barra fissa `FantaF1`
- selezionare una gara tra le prossime (con bandiera nazione)
- scegliere 5 piloti e 1 team
- ottenere la probabilità di successo stimata sulla pista selezionata
