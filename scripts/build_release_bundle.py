#!/usr/bin/env python3
"""Build a deterministic static-site release bundle for manual hosting upload."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import tempfile
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = (
    Path("index.html"),
    Path("404.html"),
    Path("assets/styles.css"),
    Path("assets/app.js"),
    Path("assets/vertex-logo.png"),
    Path(".well-known/security.txt"),
    Path("robots.txt"),
    Path("sitemap.xml"),
)
RUNTIME_DIRS = (Path("assets"), Path("legal"), Path(".well-known"))
ROOT_RUNTIME_FILES = (Path("robots.txt"), Path("sitemap.xml"))
BANNED_TOP_LEVEL = {
    ".git",
    ".github",
    ".ai",
    "scripts",
    "qa",
    "dist",
    "node_modules",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def collect_runtime_files() -> list[Path]:
    files: set[Path] = set()

    for path in ROOT.glob("*.html"):
        if path.is_file():
            files.add(path.relative_to(ROOT))

    for relative in ROOT_RUNTIME_FILES:
        path = ROOT / relative
        if path.is_file():
            files.add(relative)

    for directory in RUNTIME_DIRS:
        base = ROOT / directory
        if not base.is_dir():
            raise SystemExit(f"Missing runtime directory: {directory}")
        for path in base.rglob("*"):
            if path.is_file():
                files.add(path.relative_to(ROOT))

    ordered = sorted(files, key=lambda p: p.as_posix())
    if not ordered:
        raise SystemExit("No runtime files were collected.")

    for required in REQUIRED_FILES:
        if required not in files:
            raise SystemExit(f"Required runtime file is missing from release set: {required}")

    for relative in ordered:
        if relative.parts and relative.parts[0] in BANNED_TOP_LEVEL:
            raise SystemExit(f"Development-only path leaked into release set: {relative}")

    return ordered


def write_deterministic_zip(package_dir: Path, zip_path: Path) -> None:
    zip_path.parent.mkdir(parents=True, exist_ok=True)
    if zip_path.exists():
        zip_path.unlink()

    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path in sorted(package_dir.rglob("*"), key=lambda p: p.relative_to(package_dir).as_posix()):
            if not path.is_file():
                continue
            relative = path.relative_to(package_dir).as_posix()
            info = zipfile.ZipInfo(relative, date_time=(1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            with path.open("rb") as handle:
                archive.writestr(info, handle.read())


def build(output_root: Path) -> dict[str, object]:
    runtime_files = collect_runtime_files()
    package_dir = output_root / "vsn-website"

    if package_dir.exists():
        shutil.rmtree(package_dir)
    package_dir.mkdir(parents=True, exist_ok=True)

    records: list[dict[str, object]] = []
    total_bytes = 0

    for relative in runtime_files:
        source = ROOT / relative
        destination = package_dir / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)

        size = destination.stat().st_size
        total_bytes += size
        records.append(
            {
                "path": relative.as_posix(),
                "bytes": size,
                "sha256": sha256(destination),
            }
        )

    html_count = sum(1 for item in records if str(item["path"]).endswith(".html"))
    expected_html_count = sum(1 for _ in ROOT.glob("*.html")) + sum(
        1 for _ in (ROOT / "legal").rglob("*.html")
    )
    if html_count != expected_html_count:
        raise SystemExit(
            f"Release HTML count mismatch: bundled={html_count} repository={expected_html_count}"
        )

    manifest = {
        "schema_version": 1,
        "source_commit": os.environ.get("GITHUB_SHA", "local"),
        "runtime_mode": "static-html-css-vanilla-js",
        "entrypoint": "index.html",
        "html_files": html_count,
        "file_count": len(records),
        "total_bytes": total_bytes,
        "files": records,
    }

    manifest_path = package_dir / "release-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    sums_path = package_dir / "SHA256SUMS.txt"
    sums_path.write_text(
        "".join(f'{item["sha256"]}  {item["path"]}\n' for item in records),
        encoding="utf-8",
    )

    zip_path = output_root / "vsn-website-release.zip"
    write_deterministic_zip(package_dir, zip_path)

    if not zip_path.is_file() or zip_path.stat().st_size == 0:
        raise SystemExit("Release ZIP was not created correctly.")

    result = {
        "package_dir": str(package_dir),
        "zip_path": str(zip_path),
        "zip_sha256": sha256(zip_path),
        "runtime_file_count": len(records),
        "html_count": html_count,
        "runtime_bytes": total_bytes,
    }
    return result


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--output-dir",
        default="dist",
        help="Output directory for the package and ZIP (default: dist)",
    )
    parser.add_argument(
        "--check-only",
        action="store_true",
        help="Build and validate in a temporary directory without leaving artifacts.",
    )
    args = parser.parse_args()

    if args.check_only:
        with tempfile.TemporaryDirectory(prefix="vsn-release-check-") as temp:
            result = build(Path(temp))
    else:
        output_root = (ROOT / args.output_dir).resolve()
        output_root.mkdir(parents=True, exist_ok=True)
        result = build(output_root)

    print(
        "Release bundle validation passed: "
        f'{result["html_count"]} HTML files, '
        f'{result["runtime_file_count"]} runtime files, '
        f'ZIP SHA-256 {result["zip_sha256"]}'
    )


if __name__ == "__main__":
    main()
