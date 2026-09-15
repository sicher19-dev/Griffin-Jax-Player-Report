# No Brand Baseball Analytics — Player Reports

Internal player pages. Each pro arm gets one page with two halves:
**Biomechanics** (live) and **Analytics** (next).

First player: **Griffin Jax** — 4 captured games (7/17 at BOS, 7/28 vs TEX, 8/2 vs CWS, 9/2 vs NYM), 321 pitches.

## Open it
- Hosted: `https://<user>.github.io/<repo>/` (Jax is the default page)
- Another player: `index.html?p=<player-slug>`
- Offline / to send someone one file: run `python tools/bundle_standalone.py griffin-jax` → `griffin-jax-biomech.html`

## Add games (the 3 coming for Jax)
1. Drop the new workbook(s) into `inputs/`. Any sheet that uses the KinaTrax template is read — one sheet per game, pitch columns in any order.
2. Rebuild with **all** workbooks:
   ```
   pip install openpyxl
   python tools/build_biomech.py --player griffin-jax inputs/*.xlsx
   ```
3. Read the printout. Every sheet is matched to a real start by pitch mix, and anything odd is listed (date typos, repeated rows that disagree, sign flips, text in number cells, game totals that don't add up).
   - A likely typo is printed as `SUSPECT` and **not** changed. To fix it, add an entry to `tools/corrections.json` with the raw value, the fixed value, and why. To keep it as-is, add the same entry with `"keep": true`.
4. Update `data/griffin-jax.notes.js` (the hand-written Summary notes) and its `through` date. The page warns if games exist past that date.
5. Commit and push. The site redeploys on push to `main`.

## Add a player
Add them to `PLAYERS` in `tools/build_biomech.py` (name, MLBAM id, team, throws, season), then build with `--player <slug>`.

## What's in the repo
| Path | What |
|---|---|
| `index.html` | The player page (no build step, no libraries) |
| `data/<slug>.js` | Generated data — every metric, every pitch type, every game. Don't hand-edit |
| `data/<slug>.notes.js` | Analyst notes for the Summary tab |
| `tools/build_biomech.py` | Workbook → data builder with all the checks |
| `tools/corrections.json` | Every change made to source values, with the reason |
| `tools/<slug>-starts.json` | Cached game log used for matching (`--offline` reuses it) |
| `inputs/` | Raw workbooks (not published to the site) |

## Privacy
`inputs/` and `tools/` are kept out of the published site, but a **public** repo still exposes them on GitHub, and a public Pages URL can be opened by anyone with the link. For internal-only, use a private repo (Pages on a private repo needs a paid GitHub plan) or keep the repo private and share the standalone HTML file.
