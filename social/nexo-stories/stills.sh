#!/usr/bin/env bash
# Usage: ./stills.sh <CompositionId> [frames...]  → out/stills/<id>-<frame>.png + out/stills/<id>-sheet.png
set -euo pipefail
ID=$1; shift
FRAMES=${*:-110 330 520 800}
BE=${REMOTION_BROWSER:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}
mkdir -p out/stills
for f in $FRAMES; do
  npx remotion still src/index.ts "$ID" "out/stills/$ID-$f.png" --frame="$f" --browser-executable="$BE" >/dev/null 2>&1 || echo "FAIL $ID $f"
done
python3 - "$ID" $FRAMES <<'PY'
import sys
from PIL import Image
i, fs = sys.argv[1], sys.argv[2:]
w, h = 540, 960
s = Image.new('RGB', (len(fs) * (w + 10) - 10, h), '#222')
for k, f in enumerate(fs):
    s.paste(Image.open(f'out/stills/{i}-{f}.png').resize((w, h), Image.LANCZOS), (k * (w + 10), 0))
s.save(f'out/stills/{i}-sheet.png')
PY
