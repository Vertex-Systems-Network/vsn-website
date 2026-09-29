# Direct-file distribution and production bundle

The VSN website remains a host-agnostic static website. It does not require Vercel, a framework, Node.js, a package manager, a local development server, or a runtime build step.

## Direct local use

Keep the repository directory structure intact and open:

`index.html`

directly in a modern browser.

## Runtime package

The production runtime contains:

- all root `*.html` pages
- `legal/`
- `assets/`
- `.well-known/`
- `robots.txt`
- `sitemap.xml`

Development-only files such as `.git/`, `.github/`, `.ai/`, `scripts/`, documentation and local QA captures are not part of the hosting bundle.

## Path rules

Do not use root-relative local paths.

Correct on root pages:
- `assets/styles.css`
- `assets/app.js`
- `contact.html`

Correct inside `legal/`:
- `../assets/styles.css`
- `../assets/app.js`
- `../contact.html`

## Verified release bundle

For a manual hosting upload, use the repository's release packager:

`python3 scripts/build_release_bundle.py`

It creates:

- `dist/vsn-website/` — clean hosting directory
- `dist/vsn-website-release.zip` — deterministic ZIP
- `dist/vsn-website/release-manifest.json` — file paths, sizes and SHA-256 hashes
- `dist/vsn-website/SHA256SUMS.txt` — runtime-file checksums

Normal Static Integrity CI runs the same packaging logic in `--check-only` mode so packaging regressions fail before merge.

## GitHub Actions release artifact

Workflow: **Production Release Bundle**

The workflow runs automatically for every push to `main` and can also be started manually from `main`. It reruns the repository validators, builds the clean ZIP and uploads the ZIP plus manifest/checksum files as a GitHub Actions artifact.

It does **not** deploy the website, change DNS, modify the live domain, or connect to a hosting account.

## Manual hosting publication

When production publishing is approved:

1. Use the latest successful **Production Release Bundle** artifact for `main`, or start the workflow manually from `main` if a fresh artifact is needed.
2. Download the generated `vsn-website-release-<sha>` artifact.
3. Verify the ZIP checksum shown in the workflow log if desired.
4. Extract `vsn-website-release.zip`.
5. Upload the extracted runtime contents to the selected static hosting document root while preserving directories.
6. Confirm HTTPS before enabling HSTS.
7. Configure and verify production response headers using `SECURITY-HEADERS.md`.
8. Perform live smoke checks for Home, Services, Contact, Blog, Projects, a service-detail page, 404, forms/WhatsApp routes, images and mobile navigation.

The live deployment remains an explicit owner-triggered action.

## Architecture

Relative paths are preserved in the generated bundle, so the same source remains usable in direct `file://` mode and on a conventional static web host.

Vercel is not part of the current architecture.
