#!/usr/bin/env bash
# Usage: ./dsstills.sh <out-dir> <id...>  → <out-dir>/<id>.png and <out-dir>/sheet.png
set -euo pipefail
OUT=$1; shift
BE=${REMOTION_BROWSER:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}
mkdir -p "$OUT"
for id in "$@"; do
  npx remotion still src/index.ts "$id" "$OUT/$id.png" --browser-executable="$BE" >/dev/null 2>&1 || echo "FAIL $id"
done
python3 - "$OUT" "$@" <<'PY'
import sys
from PIL import Image
out, ids = sys.argv[1], sys.argv[2:]
ims = [Image.open(f'{out}/{i}.png') for i in ids]
w = 360; cols = min(len(ims), 5); rows = (len(ims) + cols - 1) // cols
h = max(int(im.height * w / im.width) for im in ims)
s = Image.new('RGB', (cols * (w + 10) - 10, rows * (h + 10) - 10), '#1b1b1b')
for k, im in enumerate(ims):
    s.paste(im.resize((w, int(im.height * w / im.width)), Image.LANCZOS), ((k % cols) * (w + 10), (k // cols) * (h + 10)))
s.save(f'{out}/sheet.png')
PY
