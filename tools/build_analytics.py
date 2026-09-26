#!/usr/bin/env python3
"""
No Brand Baseball Analytics - Analytics tab builder.

Pulls the player's pitch-level season file and the public movement leaderboards,
builds per-start and per-pitch summaries (shape, command, results, count control),
and writes data/<slug>.analytics.js for index.html.

Usage:
    python tools/build_analytics.py --player griffin-jax            # fetch fresh
    python tools/build_analytics.py --player griffin-jax --offline  # reuse cache/
"""
import warnings; warnings.filterwarnings("ignore")
import argparse, io, json, math, os, datetime, urllib.request, collections
import pandas as pd
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "cache")


# Feed endpoints live in tools/sources.json, which is not committed. Keeps the
# public repo free of any reference to where the numbers come from.
def sources():
    fp = os.path.join(ROOT, "tools", "sources.json")
    if not os.path.exists(fp):
        raise SystemExit("tools/sources.json is missing - see README (Feeds).")
    return json.load(open(fp))


SRC = sources()

PLAYERS = {
    "griffin-jax": {"name": "Griffin Jax", "pid": 643377, "season": 2026, "throws": "R",
                    "window_start": "2026-05-26",
                    "window_note": "Full-time starter from 5/26 @ BAL. Earlier starts were opener-length and sit outside the season numbers."},
}
CODE = {"FF": "FF", "SI": "SI", "CH": "CH", "ST": "SW", "CU": "CU", "KC": "CU", "SL": "SL", "FC": "FC", "FS": "FS", "SV": "SV"}
SWING = {"swinging_strike", "swinging_strike_blocked", "foul", "foul_tip", "hit_into_play", "foul_bunt", "missed_bunt", "bunt_foul_tip"}
WHIFF = {"swinging_strike", "swinging_strike_blocked", "foul_tip", "missed_bunt"}
CALLED = {"called_strike"}
STRIKEISH = SWING | CALLED
OPP = {"Texas Rangers": "TEX", "Boston Red Sox": "BOS", "Chicago White Sox": "CWS", "New York Mets": "NYM",
       "New York Yankees": "NYY", "Seattle Mariners": "SEA", "Toronto Blue Jays": "TOR", "Kansas City Royals": "KC",
       "Atlanta Braves": "ATL", "Baltimore Orioles": "BAL", "Athletics": "ATH", "Detroit Tigers": "DET",
       "Miami Marlins": "MIA", "Los Angeles Angels": "LAA", "Washington Nationals": "WSH", "Houston Astros": "HOU",
       "Minnesota Twins": "MIN", "San Francisco Giants": "SF", "Cleveland Guardians": "CLE", "Pittsburgh Pirates": "PIT",
       "St. Louis Cardinals": "STL", "Milwaukee Brewers": "MIL", "Chicago Cubs": "CHC", "Cincinnati Reds": "CIN",
       "Los Angeles Dodgers": "LAD", "San Diego Padres": "SD", "Philadelphia Phillies": "PHI", "Colorado Rockies": "COL",
       "Arizona Diamondbacks": "AZ", "Tampa Bay Rays": "TB"}
LOW_FT = 1.8   # "buried": below the knees for this report
HIGH_FT = 2.6  # "thigh-high" band runs LOW_FT..HIGH_FT


def get(url, path, offline):
    os.makedirs(CACHE, exist_ok=True)
    fp = os.path.join(CACHE, path)
    if offline and os.path.exists(fp):
        return open(fp, "rb").read()
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=120).read()
    open(fp, "wb").write(data)
    return data


def r1(x, n=1):
    return None if x is None or (isinstance(x, float) and math.isnan(x)) else round(float(x), n)


def vaa(row):
    try:
        vy_f = -math.sqrt(row.vy0 ** 2 - 2 * row.ay * (50 - 17 / 12))
        t = (vy_f - row.vy0) / row.ay
        vz_f = row.vz0 + row.az * t
        return -math.degrees(math.atan(vz_f / vy_f))
    except Exception:
        return np.nan


def pitch_block(x):
    """Shape + results for a set of pitches of one type."""
    n = len(x)
    sw = x.description.isin(SWING)
    wh = x.description.isin(WHIFF)
    inz = x.zone.between(1, 9)
    bip = x[x.description == "hit_into_play"]
    ev = bip.launch_speed.dropna()
    return {
        "n": int(n),
        "velo": r1(x.release_speed.mean()), "veloMax": r1(x.release_speed.max()),
        "spin": r1(x.release_spin_rate.mean(), 0), "axis": r1(x.spin_axis.mean(), 0),
        "ivb": r1(x.pfx_z.mean() * 12), "hb": r1(x.pfx_x.mean() * 12),
        "ivbSd": r1(x.pfx_z.std() * 12) if n > 2 else None, "hbSd": r1(x.pfx_x.std() * 12) if n > 2 else None,
        "ext": r1(x.release_extension.mean()), "relZ": r1(x.release_pos_z.mean(), 2), "relX": r1(x.release_pos_x.mean(), 2),
        "arm": r1(x.arm_angle.mean()), "vaa": r1(x.vaa.mean(), 2),
        "swings": int(sw.sum()), "whiffs": int(wh.sum()),
        "whiffPct": r1(100 * wh.sum() / sw.sum()) if sw.sum() else None,
        "csw": r1(100 * (wh.sum() + x.description.isin(CALLED).sum()) / n) if n else None,
        "zonePct": r1(100 * inz.mean()) if n else None,
        "chasePct": r1(100 * (sw & ~inz).sum() / (~inz).sum()) if (~inz).sum() else None,
        "bip": int(len(bip)), "ev": r1(ev.mean()) if len(ev) else None, "evMax": r1(ev.max()) if len(ev) else None,
        "hard": int((ev >= 95).sum()),
        "xwoba": r1(bip.estimated_woba_using_speedangle.mean(), 3) if len(bip) else None,
        "runsSaved": r1(x.delta_pitcher_run_exp.sum(), 2),
        "low": int((x.plate_z < LOW_FT).sum()), "mid": int(((x.plate_z >= LOW_FT) & (x.plate_z <= HIGH_FT)).sum()),
        "high": int((x.plate_z > HIGH_FT).sum()),
        "vsL": int((x.stand == "L").sum()), "vsR": int((x.stand == "R").sum()),
    }


def count_control(g):
    g = g.assign(pa_id=g.game_pk.astype(str) + "-" + g.at_bat_number.astype(str))
    done = g.groupby("pa_id").events.last()
    done = done[done.notna() & (done != "truncated_pa")].index   # completed plate appearances only
    pas = g[g.pa_id.isin(done)].groupby("pa_id")
    first = g[g.pitch_number == 1]
    two = sum(int((p.strikes == 2).any()) for _, p in pas)
    three_ball = sum(int((p.balls == 3).any()) for _, p in pas)
    ev = g.events.dropna()
    return {
        "pas": int(len(pas)),
        "fps": r1(100 * first.description.isin(STRIKEISH).mean()) if len(first) else None,
        "twoStrike": int(two), "threeBall": int(three_ball),
        "k": int(ev.isin(["strikeout", "strikeout_double_play"]).sum()),
        "bb": int(ev.isin(["walk", "intent_walk"]).sum()),
        "hr": int((ev == "home_run").sum()),
        "strikePct": r1(100 * (g.description.isin(STRIKEISH) | (g.description == "hit_into_play")).mean()),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--player", required=True)
    ap.add_argument("--offline", action="store_true")
    a = ap.parse_args()
    P = PLAYERS[a.player]
    sid, yr = P["pid"], P["season"]

    csv = get(SRC["pitch_level"].format(pid=sid, season=yr),
              f"{a.player}-{yr}-pitches.csv", a.offline)
    d = pd.read_csv(io.BytesIO(csv)).copy()
    d["code"] = d.pitch_type.map(CODE).fillna("OT")
    d["vaa"] = d.apply(vaa, axis=1)
    d = d.sort_values(["game_date", "at_bat_number", "pitch_number"])

    log = json.loads(get(SRC["game_log"].format(pid=sid, season=yr),
                         f"{a.player}-{yr}-log.json", a.offline))
    splits = [s for s in log["stats"][0]["splits"] if s["stat"].get("gamesStarted") == 1]

    mocap = set()
    bm = os.path.join(ROOT, "data", f"{a.player}.js")
    if os.path.exists(bm):
        bd = json.loads(open(bm).read().split("=", 1)[1].rstrip().rstrip(";"))
        mocap = {s["date"] for s in bd["sessions"] if s.get("kind") != "bullpen"}

    checks = []
    starts = []
    for s in splits:
        pk = s["game"]["gamePk"]
        g = d[d.game_pk == pk]
        st = s["stat"]
        if len(g) != st["numberOfPitches"]:
            checks.append(f"{s['date']}: pitch file has {len(g)}, box score has {st['numberOfPitches']}")
        rec = {
            "date": s["date"], "pk": pk, "home": s["isHome"], "opp": s["opponent"]["name"],
            "oppAbbr": OPP.get(s["opponent"]["name"], s["opponent"]["name"][:3].upper()),
            "role": "starter" if s["date"] >= P["window_start"] else "opener",
            "mocap": s["date"] in mocap,
            "line": {"ip": st["inningsPitched"], "h": st["hits"], "r": st["runs"], "er": st["earnedRuns"],
                     "bb": st["baseOnBalls"], "k": st["strikeOuts"], "hr": st["homeRuns"], "pc": st["numberOfPitches"],
                     "bf": st["battersFaced"]},
            "dec": "W" if st.get("wins") else ("L" if st.get("losses") else ""),
            "cc": count_control(g), "all": pitch_block(g),
            "pitches": {c: pitch_block(x) for c, x in g.groupby("code")},
        }
        if rec["cc"]["k"] != st["strikeOuts"] or rec["cc"]["bb"] != st["baseOnBalls"]:
            checks.append(f"{s['date']}: K/BB from pitches {rec['cc']['k']}/{rec['cc']['bb']} vs box {st['strikeOuts']}/{st['baseOnBalls']}")
        if rec["cc"]["pas"] != st["battersFaced"]:
            checks.append(f"{s['date']}: PAs from pitches {rec['cc']['pas']} vs box {st['battersFaced']}")
        rec["dots"] = [[r.code, r1(r.plate_x, 2), r1(r.plate_z, 2), r1(r.sz_top, 2), r1(r.sz_bot, 2),
                        ("W" if r.description in WHIFF else "C" if r.description == "called_strike" else
                         "B" if r.description == "hit_into_play" else "F" if r.description.startswith("foul") else "O"),
                        r1(r.launch_speed, 0), r.stand, int(r.balls), int(r.strikes), r1(r.release_speed, 1)]
                       for r in g.itertuples()]
        starts.append(rec)

    win = d[d.game_pk.isin([s["pk"] for s in starts if s["role"] == "starter"])]
    season = {
        "starts": sum(1 for s in starts if s["role"] == "starter"),
        "cc": count_control(win), "all": pitch_block(win),
        "pitches": {c: pitch_block(x) for c, x in win.groupby("code")},
        "byHand": {h: {c: int(n) for c, n in x.groupby("code").size().items()} for h, x in win.groupby("stand")},
        "byCount": {},
    }

    def state(r):
        if r.balls == 0 and r.strikes == 0: return "First pitch"
        if r.strikes == 2: return "Two strikes"
        if r.balls > r.strikes: return "Behind"
        if r.strikes > r.balls: return "Ahead"
        return "Even"
    win = win.assign(state=win.apply(state, axis=1))
    for stt, x in win.groupby("state"):
        season["byCount"][stt] = {h: {c: int(n) for c, n in y.groupby("code").size().items()} for h, y in x.groupby("stand")}
    ip_outs = sum(int(str(s["line"]["ip"]).split(".")[0]) * 3 + int(str(s["line"]["ip"]).split(".")[1]) for s in starts if s["role"] == "starter")
    tot = {k: sum(s["line"][k] for s in starts if s["role"] == "starter") for k in ["h", "r", "er", "bb", "k", "hr", "pc", "bf"]}
    season["line"] = {**tot, "ip": f"{ip_outs // 3}.{ip_outs % 3}", "era": r1(9 * tot["er"] / (ip_outs / 3), 2),
                      "kPct": r1(100 * tot["k"] / tot["bf"]), "bbPct": r1(100 * tot["bb"] / tot["bf"]),
                      "whip": r1((tot["h"] + tot["bb"]) / (ip_outs / 3), 2)}

    # league movement context (season, same pitch type, same throwing hand)
    lg = {}
    for code, sv in [("FF", "FF"), ("SI", "SI"), ("CH", "CH"), ("SW", "ST"), ("CU", "CU"), ("FC", "FC")]:
        raw = get(SRC["movement_board"].format(season=yr, pitch=sv), f"mv-{yr}-{sv}.csv", a.offline)
        m = pd.read_csv(io.BytesIO(raw), encoding="utf-8-sig")
        m = m[m.pitch_hand == P["throws"]]
        me = m[m.pitcher_id == sid]
        if me.empty:
            continue
        me = me.iloc[0]
        m = m[m.pitches_thrown >= 100].assign(
            drop_vs=lambda t: t.pitcher_break_z - t.league_break_z.abs(),
            break_vs=lambda t: t.pitcher_break_x - t.league_break_x.abs())
        dv = me.pitcher_break_z - abs(me.league_break_z)
        bv = me.pitcher_break_x - abs(me.league_break_x)
        lg[code] = {
            "n": int(me.pitches_thrown), "velo": r1(me.avg_speed), "pool": int(len(m)),
            "drop": r1(me.pitcher_break_z), "dropAvg": r1(abs(me.league_break_z)), "dropVs": r1(dv),
            "brk": r1(me.pitcher_break_x), "brkAvg": r1(abs(me.league_break_x)), "brkVs": r1(bv),
            "dropPct": r1(100 * (m.drop_vs < dv).mean(), 0) if len(m) else None,
            "brkPct": r1(100 * (m.break_vs < bv).mean(), 0) if len(m) else None,
        }

    out = {"player": {k: P[k] for k in ["name", "season", "throws", "window_start", "window_note"]},
           "built": datetime.date.today().isoformat(), "thresholds": {"low": LOW_FT, "high": HIGH_FT},
           "season": season, "league": lg, "starts": starts, "checks": checks}
    fp = os.path.join(ROOT, "data", f"{a.player}.analytics.js")
    with open(fp, "w") as f:
        f.write("/* No Brand Baseball Analytics - analytics data. Generated by tools/build_analytics.py. Do not hand-edit. */\n")
        f.write("window.NB_ANALYTICS = " + json.dumps(out, separators=(",", ":"), default=lambda o: None if o is None else (o.item() if hasattr(o, "item") else str(o))) + ";\n")
    print("wrote", fp, os.path.getsize(fp), "bytes;", len(starts), "starts;", season["starts"], "as a starter")
    for c in checks:
        print("CHECK", c)


if __name__ == "__main__":
    main()
