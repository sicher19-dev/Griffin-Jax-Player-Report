#!/usr/bin/env python3
"""Inline a player's data into one self-contained HTML file (for sharing / offline)."""
import sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug = sys.argv[1] if len(sys.argv) > 1 else "griffin-jax"
html = open(os.path.join(ROOT, "index.html")).read()
data = open(os.path.join(ROOT, "data", f"{slug}.js")).read()
extra = ""
for suffix in ("notes", "analytics", "reviews"):
    fp = os.path.join(ROOT, "data", f"{slug}.{suffix}.js")
    if os.path.exists(fp):
        extra += open(fp).read() + "\n"
notes = extra
html = html.replace("<script>\n/* ---------- load player data", f"<script>\n{data}\n{notes}\n</script>\n<script>\n/* ---------- load player data", 1)
out = os.path.join(ROOT, f"{slug}-biomech.html")
open(out, "w").write(html)
print("wrote", out)
