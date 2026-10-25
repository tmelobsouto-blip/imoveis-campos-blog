#!/usr/bin/env bash
# Usage: ./render-styles.sh [Mockup|Clean]  → out/styles/<id>-<variant>.mp4
set -euo pipefail
VARIANT=${1:-Mockup}
BE=${REMOTION_BROWSER:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}
mkdir -p out/styles
for ID in S1-Editorial S2-Brutalista S3-Terminal S4-Glass S5-Chat; do
  npx remotion render src/index.ts "$ID-$VARIANT" "out/styles/$ID-$VARIANT.mp4" --crf=18 --browser-executable="$BE" 2>&1 | grep -E "^\+|Error" || true
done
