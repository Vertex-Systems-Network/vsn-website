#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]

EXPECTED_HTML = {
    "404.html","about.html","ai-automation.html","bpo.html","contact.html",
    "ecommerce.html","index.html","industries.html","legal/cookies.html",
    "legal/privacy.html","legal/refunds.html","legal/terms.html","payments.html",
    "process.html","products.html","profile.html","services.html",
    "social-media.html","software.html","tax-consulting.html","trust.html","work.html",
}
REQUIRED_FILES = {
    "assets/app.js","assets/styles.css","robots.txt","sitemap.xml",".well-known/security.txt",
}
FORBIDDEN_ROOT_FILES = {"package.json","vercel.json"}
LEGAL_PAGES = {
    "legal/terms.html","legal/privacy.html","legal/refunds.html","legal/cookies.html",
}
OLD_PRICES = {"$499","$1,250","$2,500"}
TRACKING_TOKENS = {"document.cookie","localStorage","gtag(","fbq("}

ATTR_RE = re.compile(r"""\b(?:href|src)=["']([^"']+)["']""", re.I)
ID_RE = re.compile(r"""\bid=["']([^"']+)["']""", re.I)
IMG_RE = re.compile(r"<img\b([^>]*)>", re.I)
ALT_RE = re.compile(r"""\balt=["'][^"']*["']""", re.I)
CANONICAL_RE = re.compile(
    r"""<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>""",
    re.I,
)

def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()

def local_target(source: str, raw_ref: str) -> tuple[str | None, str | None]:
    if raw_ref.startswith(("http://","https://","//","mailto:","tel:","javascript:")):
        return None, None
    parsed = urlsplit(raw_ref)
    path_part = parsed.path
    fragment = parsed.fragment or None
    if not path_part:
        return source, fragment
    if path_part == "/":
        return "index.html", fragment
    if path_part.startswith("/"):
        return path_part.lstrip("/"), fragment
    parts = list(Path(source).parent.parts)
    for part in path_part.split("/"):
        if part in ("","."):
            continue
        if part == "..":
            if parts:
                parts.pop()
        else:
            parts.append(part)
    return "/".join(parts), fragment

def main() -> int:
    errors: list[str] = []
    repo_files = {
        rel(path) for path in ROOT.rglob("*")
        if path.is_file() and ".git" not in path.parts
    }

    missing_html = EXPECTED_HTML - repo_files
    if missing_html:
        errors.append(f"Missing expected HTML files: {sorted(missing_html)}")

    missing_required = REQUIRED_FILES - repo_files
    if missing_required:
        errors.append(f"Missing required static files: {sorted(missing_required)}")

    forbidden = FORBIDDEN_ROOT_FILES & repo_files
    if forbidden:
        errors.append(f"Unexpected runtime/config files present: {sorted(forbidden)}")

    ids_by_file: dict[str,set[str]] = {}
    refs: list[tuple[str,str,str,str|None]] = []

    html_files = sorted(path for path in repo_files if path.endswith(".html"))
    for source in html_files:
        text = (ROOT / source).read_text(encoding="utf-8")

        if not re.match(r"\s*<!doctype html>", text, re.I):
            errors.append(f"{source}: missing HTML5 doctype")
        if len(re.findall(r"<title\b", text, re.I)) != 1:
            errors.append(f"{source}: expected exactly one <title>")
        if not re.search(r"""<meta\b[^>]*name=["']viewport["']""", text, re.I):
            errors.append(f"{source}: missing viewport meta")
        if len(re.findall(r"<main\b", text, re.I)) != 1:
            errors.append(f"{source}: expected exactly one <main>")
        if len(re.findall(r"<h1\b", text, re.I)) != 1:
            errors.append(f"{source}: expected exactly one <h1>")
        if re.search(r"""\sstyle=["']""", text, re.I):
            errors.append(f"{source}: inline style attributes are not allowed")
        if re.search(r"<style\b", text, re.I):
            errors.append(f"{source}: inline <style> blocks are not allowed")

        ids = ID_RE.findall(text)
        duplicates = sorted({value for value in ids if ids.count(value) > 1})
        if duplicates:
            errors.append(f"{source}: duplicate ids: {duplicates}")
        ids_by_file[source] = set(ids)

        for attrs in IMG_RE.findall(text):
            if not ALT_RE.search(attrs):
                errors.append(f"{source}: image missing alt attribute")

        for raw_ref in ATTR_RE.findall(text):
            target, fragment = local_target(source, raw_ref)
            if target is not None:
                refs.append((source, raw_ref, target, fragment))

        if source == "404.html":
            if not re.search(r"""name=["']robots["'][^>]*content=["'][^"']*noindex\s*,\s*follow""", text, re.I):
                errors.append("404.html: robots meta must contain noindex,follow")
        else:
            canonical = CANONICAL_RE.search(text)
            if not canonical:
                errors.append(f"{source}: missing canonical link")
            elif not canonical.group(1).startswith("https://vertexsystemsnetwork.com/"):
                errors.append(f"{source}: canonical must use vertexsystemsnetwork.com")

        if source in LEGAL_PAGES:
            if "Website operator:" not in text:
                errors.append(f"{source}: missing Website operator block")
            if "Related policies:" not in text:
                errors.append(f"{source}: missing Related policies block")

        if source == "profile.html":
            for price in OLD_PRICES:
                if price in text:
                    errors.append(f"profile.html: provisional price still present: {price}")
            if "Custom <small>quote</small>" not in text:
                errors.append("profile.html: custom quote wording missing")

    for source, raw_ref, target, fragment in refs:
        normalized = target + "index.html" if target.endswith("/") else target
        if normalized not in repo_files:
            errors.append(f"{source}: broken local reference {raw_ref!r} -> {normalized!r}")
            continue
        if fragment and normalized.endswith(".html"):
            if fragment not in ids_by_file.get(normalized,set()):
                errors.append(f"{source}: fragment {raw_ref!r} targets missing id {fragment!r}")

    workflow_text = (ROOT / ".github/workflows/static-integrity.yml").read_text(encoding="utf-8")
    action_refs = re.findall(r"^\\s*uses:\\s*([^\\s#]+)", workflow_text, re.M)
    for action_ref in action_refs:
        if action_ref.startswith("./"):
            continue
        if "@" not in action_ref:
            errors.append(f"static-integrity.yml: action reference missing @ref: {action_ref}")
            continue
        ref_value = action_ref.rsplit("@", 1)[1]
        if not re.fullmatch(r"[0-9a-fA-F]{40}", ref_value):
            errors.append(
                "static-integrity.yml: third-party actions must be pinned to a full commit SHA: "
                f"{action_ref}"
            )
    if "persist-credentials: false" not in workflow_text:
        errors.append("static-integrity.yml: checkout must disable persisted credentials")

    app_js = (ROOT / "assets/app.js").read_text(encoding="utf-8")
    for token in TRACKING_TOKENS:
        if token in app_js:
            errors.append(f"assets/app.js: unexpected tracking/storage token {token!r}")

    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    if "User-agent:" not in robots:
        errors.append("robots.txt: missing User-agent")
    if "Sitemap:" not in robots:
        errors.append("robots.txt: missing Sitemap")

    security_txt = (ROOT / ".well-known/security.txt").read_text(encoding="utf-8")
    for key in ("Contact:","Expires:","Canonical:"):
        if key not in security_txt:
            errors.append(f".well-known/security.txt: missing {key}")

    try:
        sitemap = ET.parse(ROOT / "sitemap.xml")
        ns = {"sm":"http://www.sitemaps.org/schemas/sitemap/0.9"}
        urls = [n.text.strip() for n in sitemap.findall(".//sm:loc",ns) if n.text]
    except Exception as exc:
        errors.append(f"sitemap.xml: invalid XML: {exc}")
        urls = []

    if len(urls) != 21:
        errors.append(f"sitemap.xml: expected 21 public URLs, found {len(urls)}")
    if any(url.endswith("/404.html") for url in urls):
        errors.append("sitemap.xml: 404 page must not be indexed")
    if any(not url.startswith("https://vertexsystemsnetwork.com/") for url in urls):
        errors.append("sitemap.xml: all URLs must use vertexsystemsnetwork.com")

    if errors:
        print("Static integrity validation FAILED")
        for error in errors:
            print(f" - {error}")
        return 1

    print(
        "Static integrity validation passed: "
        f"{len(html_files)} HTML files, {len(refs)} local refs checked, "
        f"{len(urls)} sitemap URLs."
    )
    return 0

if __name__ == "__main__":
    sys.exit(main())
