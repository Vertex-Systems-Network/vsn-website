# VSN Website

Official static corporate website for **Vertex Systems Network (VSN)**.

## Status

**Website refresh: in review.** The direct-open static architecture remains complete; the requested service, pricing and legal-content expansion is in draft PR #38; the updated service-content commit passed the Static Integrity workflow.

The direct-file architecture is complete. Service copy, profile pricing, legal wording and the updated visual direction are in draft PR #38; the branch is not merged or deployed.


## Visual direction

The draft refresh uses a midnight navy, cobalt and lime palette, a more editorial homepage hierarchy and a locally stored hero visual. The visual is original, text-free artwork; no external image host is required.

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
- `services.html` — expanded service catalogue
- `websites.html` — business website platforms and scope
- `profile.html` — VSN Authority Profile packages and pricing
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

Legal pages are in `legal/`. Internal consistency hardening is documented in `LEGAL-REVIEW.md`. Qualified Pakistan legal/corporate review remains an external requirement before public production use.

## Continuous integration

`.github/workflows/static-integrity.yml` validates source integrity with Python standard library only. It verifies the exact official logo, local references, CSP/hash invariants, sitemap/legal requirements, and rejects root-relative local `href`/`src` values so direct-file compatibility cannot regress.

## Repository governance

Main-branch protection is **deferred by owner for now**. The repository currently remains unprotected.

The implementation for future activation is preserved:
- `scripts/apply_main_protection.ps1`
- `scripts/verify_main_protection.ps1`
- `.github/workflows/main-protection-admin.yml`
- `SECURITY-GOVERNANCE.md`

This deferred governance item does not block repository/code finalization. It can be activated later without changing the website runtime architecture.

## Branding

The exact owner-supplied VSN logo is stored at `assets/vertex-logo.png`. SHA-256: `ede0edd921742c57af19b513c1aab73e079fe1217f4bc7ad156ab3260109c671`; dimensions: `2041×517`; size: `60,222 bytes`.

## AI-Native progress

- Static architecture and direct-file portability: **100% — complete**
- Direct-file portability: **100% — completed**
- Architecture: **direct-open static HTML + CSS + vanilla JS**
- Server requirement: **none**
- Vercel requirement: **none**
- Main protection: **deferred by owner**
- Current milestone: service-page depth, profile package clarity and legal draft review
- External production requirement: qualified Pakistan legal/corporate review
