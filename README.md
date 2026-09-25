# VSN Website

Official static corporate website for **Vertex Systems Network (VSN)**.

## Architecture

- Plain HTML5 pages
- Shared CSS in `assets/styles.css`
- Shared vanilla JavaScript in `assets/app.js`
- No Node.js runtime
- No framework dependency
- No Vercel dependency
- No local HTTP server required
- No build/install command required
- Direct browser opening supported through relative local paths

## Run directly

1. Keep the repository folder structure unchanged.
2. Open `index.html` directly in a modern browser.
3. Navigation, CSS, logo assets and `assets/app.js` resolve through relative paths.
4. The contact form prepares the project brief in WhatsApp using client-side JavaScript; it does not require a VSN backend.

Root pages use paths such as `assets/styles.css` and `contact.html`.
Pages inside `legal/` use paths such as `../assets/styles.css` and `../contact.html`.

Do **not** convert local links back to root-relative `/assets/...` or `/contact.html` paths, because those break direct `file://` opening.

## Main pages

- `index.html` — corporate homepage
- `services.html` — service overview
- `profile.html` — VSN Authority Profile
- `software.html` — software & app development
- `ecommerce.html` — e-commerce development
- `ai-automation.html` — AI & automation
- `social-media.html` — social media management
- `bpo.html` — BPO / managed operations
- `tax-consulting.html` — tax & compliance services
- `products.html` — VSN products
- `industries.html` — industries served
- `work.html` — work & proof framework
- `trust.html` — trust & security
- `process.html` — delivery process
- `payments.html` — billing & payment information
- `about.html` — company information
- `contact.html` — project enquiry

## Legal

Legal pages are in `legal/`. Internal consistency hardening is documented in `LEGAL-REVIEW.md`; final Pakistan-qualified legal/corporate review is still required before a public production launch.

## Continuous integration

`.github/workflows/static-integrity.yml` validates source integrity with Python standard library only. It verifies the exact official logo, local references, CSP/hash invariants, sitemap/legal requirements, and rejects root-relative local `href`/`src` values so direct-file compatibility cannot regress.

Direct-file portability PR #34 passed exact-head Static Integrity run #24 and was merged to `main` at `c77af261bdee0e4d834d6fa78989724a79e4d879`. Resulting-main Static Integrity run #25 also passed.

## Repository governance

Target main-branch protection is documented in `SECURITY-GOVERNANCE.md`.

Current verified GitHub state:
- `main` protection: **disabled**
- required status-check enforcement: **off**
- repository rulesets: **none**

Repository-side apply/verify scripts are complete. A manual GitHub Actions workflow, `.github/workflows/main-protection-admin.yml`, now provides a controlled activation path once repository secret `VSN_GOVERNANCE_ADMIN_TOKEN` is configured with narrowly scoped repository Administration write permission.

The target policy still requires pull requests, `static-integrity` in strict mode, zero required human approvals, administrator enforcement, linear history, conversation resolution, and blocks force pushes/deletion.

## Branding

The exact owner-supplied VSN logo is stored at `assets/vertex-logo.png`. SHA-256: `ede0edd921742c57af19b513c1aab73e079fe1217f4bc7ad156ab3260109c671`; dimensions: `2041×517`; size: `60,222 bytes`.

## AI-Native progress

- Direct-file portability: **100% — completed**
- Issue #33: **closed**
- PR #34: **merged**
- Repository implementation: **100%**
- Main-protection automation: **ready for admin-secret activation**
- Issue #14 governance milestone: **90%**
- Architecture: **direct-open static HTML + CSS + vanilla JS**
- Server requirement: **none**
- Vercel requirement: **none**
- Overall launch readiness: **99%**
- Remaining gates: Issue #14 active main-branch protection and qualified Pakistan legal/corporate review.
