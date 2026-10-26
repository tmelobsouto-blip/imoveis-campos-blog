"""Time a Reel script with /ig-reel's beats.py and write the beat sheet as JSON for Remotion.

beats.py tokenises on [A-Za-z0-9], so accented Portuguese words get split and
over-timed. We time an accent-stripped copy and keep the original text per beat.
"""
import argparse
import json
import os
import subprocess
import sys
import unicodedata


def strip_accents(text: str) -> str:
    text = text.replace("º", "o").replace("ª", "a")
    return "".join(c for c in unicodedata.normalize("NFKD", text) if not unicodedata.combining(c))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("script")
    ap.add_argument("out")
    ap.add_argument("--target", type=float, default=30)
    ap.add_argument("--wpm", type=float, default=165)
    ap.add_argument("--beats", default=os.path.expanduser("~/.claude/skills/ig-reel/beats.py"))
    args = ap.parse_args()

    lines = [l.strip() for l in open(args.script, encoding="utf-8") if l.strip()]
    res = subprocess.run(
        [sys.executable, "-I", args.beats, "-", "--json", "--target", str(args.target), "--wpm", str(args.wpm)],
        input=strip_accents("\n".join(lines)),
        capture_output=True,
        text=True,
        check=True,
    )
    sheet = json.loads(res.stdout)
    if len(sheet["beats"]) != len(lines):
        sys.exit(f"beats.py split {len(lines)} lines into {len(sheet['beats'])} beats; keep one beat per line")
    for beat, line in zip(sheet["beats"], lines):
        beat["text"] = line
    with open(args.out, "w", encoding="utf-8") as fh:
        json.dump(sheet, fh, ensure_ascii=False, indent=2)
    print(f"{len(lines)} beats, {sheet['total_seconds']}s -> {args.out}")
    for note in sheet["notes"]:
        print(" -", note)


if __name__ == "__main__":
    main()
