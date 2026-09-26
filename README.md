# No Brand Baseball Analytics — Player Reports

Internal player pages. Each pro arm gets one page with two halves:
**Biomechanics** (mocap, game by game) and **Analytics** (season, starts, shapes, results, locations).

First player: **Griffin Jax** — 7 mocap games (7/11 SEA, 7/17 BOS, 7/28 TEX, 8/2 CWS, 9/2 NYM, 9/15 ATH, 9/20 BOS) plus an April bullpen block, 637 pitches captured; analytics for every 2026 start.

## Open it
- Hosted: `https://<user>.github.io/<repo>/` (Jax is the default page)
- Another player: `index.html?p=<player-slug>`
- Offline / to send someone one file: run `python tools/bundle_standalone.py griffin-jax` → `griffin-jax-biomech.html`

## Add games
1. Drop the new workbook(s) into `inputs/`. Any sheet that uses the mocap game template is read — one sheet per game, pitch columns in any order.
2. Rebuild with **all** workbooks (if the same game appears twice, the copy whose own sheet date matches the game wins, otherwise the later file does; either way the Data log lists what changed). The result does not depend on the order you pass them:
   ```
   pip install openpyxl pandas
   python tools/build_biomech.py --player griffin-jax inputs/*.xlsx
   ```
   A sheet whose pitch mix doesn't match any real start is held off the page and listed under "Held off the page" in the Data log. A sheet that is bullpen work rather than a game goes in `tools/sessions.json`, keyed `<file>|tab <n>`.
3. Read the printout. Every sheet is matched to a real start by pitch mix, and anything odd is listed (date typos, repeated rows that disagree, sign flips, text in number cells, game totals that don't add up).
   - A likely typo is printed as `SUSPECT` and **not** changed. To fix it, add an entry to `tools/corrections.json` with the raw value, the fixed value, and why. To keep it as-is, add the same entry with `"keep": true`.
4. Update `data/griffin-jax.notes.js` (the hand-written Summary notes) and its `through` date. The page warns if games exist past that date.
5. Commit and push. The site redeploys on push to `main`.

## Refresh the Analytics tab (after every start)
```
python tools/build_analytics.py --player griffin-jax
```
Pulls the season's pitch-level file and the league movement tables, cross-checks pitch counts, strikeouts, walks and batters faced against the box score, and writes `data/<slug>.analytics.js`. Run it after `build_biomech.py` so newly captured games pick up the "mocap" chip. Game Review summaries live in `data/<slug>.reviews.js` (hand-written; one entry per reviewed start).

## Add a player
Add them to `PLAYERS` in `tools/build_biomech.py` and `tools/build_analytics.py` (name, player id, team, throws, season), then build with `--player <slug>`.

## What's in the repo
| Path | What |
|---|---|
| `index.html` | The player page (no build step, no libraries) |
| `data/<slug>.js` | Generated data — every metric, every pitch type, every game. Don't hand-edit |
| `data/<slug>.notes.js` | Analyst notes for the Biomechanics Summary tab |
| `data/<slug>.analytics.js` | Generated analytics data (every start, every pitch type) |
| `data/<slug>.reviews.js` | Game Review summaries shown on the Starts tab |
| `tools/build_biomech.py` | Workbook → data builder with all the checks |
| `tools/build_analytics.py` | Season pitch data → analytics builder |
| `tools/sessions.json` | Marks sheets that are bullpen blocks, not games |
| `tools/corrections.json` | Every change made to source values, with the reason |
| `tools/<slug>-starts.json` | Cached game log used for matching (`--offline` reuses it) |
| `tools/sources.json` | **Not committed.** The feed endpoints the builders read from — see Feeds |
| `inputs/` | Raw workbooks (not published to the site) |

## Feeds
Both builders read their endpoints from `tools/sources.json`, which is deliberately **not committed** — no file in this repo names where the numbers come from. Keep your copy next to the scripts; without it the builders stop with `tools/sources.json is missing`. `cache/` holds the last pull, so `--offline` rebuilds work without it.

## Privacy
`inputs/` and `tools/` are kept out of the published site, but a **public** repo still exposes them on GitHub, and a public Pages URL can be opened by anyone with the link. For internal-only, use a private repo (Pages on a private repo needs a paid GitHub plan) or keep the repo private and share the standalone HTML file.
