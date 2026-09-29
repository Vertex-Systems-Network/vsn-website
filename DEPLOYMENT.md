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


## Guarded Middlehost deployment

The repository includes a manual GitHub Actions workflow for the existing Middlehost cPanel host:

`.github/workflows/deploy-middlehost.yml`

It is intentionally **not** triggered by pushes. Production publishing requires a manual workflow dispatch and the exact confirmation value:

`DEPLOY-PRODUCTION`

The workflow validates the current `main` source, rebuilds the deterministic runtime, verifies the pinned SSH host identity, previews the rsync changes, publishes the static runtime to the cPanel document root, and then runs live HTTPS smoke checks against `https://vertexsystemsnetwork.com`.

Required GitHub Actions repository secrets:

- `MIDDLEHOST_SSH_HOST` — Middlehost/cPanel server hostname, not a guessed Cloudflare-proxied hostname.
- `MIDDLEHOST_SSH_PORT` — numeric SSH/SFTP port.
- `MIDDLEHOST_SSH_USER` — cPanel/SSH account user.
- `MIDDLEHOST_SSH_PRIVATE_KEY` — private key for the deployment identity.
- `MIDDLEHOST_SSH_KNOWN_HOSTS` — pinned SSH host-key line(s) for strict host verification.
- `MIDDLEHOST_DEPLOY_PATH` — absolute cPanel document root. The workflow refuses anything outside the pattern `/home/<cpanel-user>/public_html`.

Deployment safety behavior:

- `main` is revalidated before upload.
- A dry-run rsync preview runs before the real synchronization.
- Old WordPress/runtime files not present in the static release are removed by `--delete-after`.
- `.well-known/acme-challenge/` is preserved for certificate validation.
- `cgi-bin/` is preserved for cPanel compatibility.
- release manifest/checksum helper files are not published into the web root.
- file/directory permissions are normalized to conventional static-host values.
- strict SSH host-key checking is required; the workflow does not use `ssh-keyscan` at deployment time.
- Home, Services, Contact, Blog, Projects, Authority Profile and the logo are checked over HTTPS after publication.

If the hosting plan does not provide SSH/SFTP, use the manual cPanel File Manager path documented above instead. Middlehost exposes cPanel from the Client Area through the hosting product's **Access Control Panel** action.
