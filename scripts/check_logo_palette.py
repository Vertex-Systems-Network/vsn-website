#!/usr/bin/env python3
from __future__ import annotations
import re
import subprocess
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
proc=subprocess.run(
    ["python3","scripts/inspect_logo_palette.py"],
    cwd=ROOT,capture_output=True,text=True,check=True
)
logo=set(re.findall(r"LOGO_COLOR\s+(#[0-9A-F]{6})\s+\d+",proc.stdout))
expected={"#3F4245","#7E8083","#625BA8","#5AC8D6","#6188C6","#000000"}
if logo != expected:
    raise SystemExit(f"Logo palette changed or unexpected: {sorted(logo)}")
allowed=set(logo)|{"#FFFFFF"}

hex_re=re.compile(r"#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b")
rgb_re=re.compile(r"rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)",re.I)
allowed_rgb={
    (63,66,69),(126,128,131),(98,91,168),(90,200,214),
    (97,136,198),(0,0,0),(255,255,255)
}
errors=[]
css_files=sorted((ROOT/"assets").glob("*.css"))
for path in css_files:
    text=path.read_text(encoding="utf-8")
    for raw in hex_re.findall(text):
        value=raw
        if len(value) in (3,4):
            value="".join(ch*2 for ch in value)
        base="#"+value[:6].upper()
        if base not in allowed:
            errors.append(f"{path.relative_to(ROOT)}: foreign hex #{raw}")
    for r,g,b in rgb_re.findall(text):
        rgb=(int(r),int(g),int(b))
        if rgb not in allowed_rgb:
            errors.append(f"{path.relative_to(ROOT)}: foreign rgb {rgb}")
    if re.search(r"\b(?:hsl|hsla|hwb|lab|lch|oklab|oklch)\(",text,re.I):
        errors.append(f"{path.relative_to(ROOT)}: unsupported non-logo color function")

fidelity=(ROOT/"assets/ritovex-fidelity.css").read_text(encoding="utf-8")
required=[
    "--vsn-cyan:#5AC8D6;",
    "--vsn-indigo:#625BA8;",
    "--vsn-violet:#625BA8;",
    "--vsn-blue:#6188C6;",
    "--vsn-charcoal:#3F4245;",
    "--vsn-gray:#7E8083;",
    "--vsn-black:#000000;",
    "--vsn-white:#FFFFFF;",
]
for token in required:
    if token not in fidelity:
        errors.append("ritovex-fidelity.css missing exact token "+token)

if errors:
    print("Logo palette validation FAILED")
    for error in errors:
        print(" -",error)
    raise SystemExit(1)

print("Logo palette validation passed:",", ".join(sorted(allowed)))
print("Checked",len(css_files),"CSS files; foreign colors: 0")
