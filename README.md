# VSN Website

Official static corporate website for **Vertex Systems Network (VSN)**.

## Status

**Website refresh: merged to main.** PR #38 was squash-merged on 25 September 2026 as `700fc02222885d20d000362ce377bf0d4ff1c4e4`. Static Integrity run #54 passed on the merge commit; post-merge PSEB validity updates passed run #56. All 23 page footers now show the PSEB certificate validity through October 2026; confirm renewal before that date. Run #56 passed on audit commit `63fb624e6e9c5198be8195aa6455c3b5f9ef0f3c`.

Contact-page improvement: PR #39 was squash-merged as `3846b430844736e50558231d0b36a77d420ccd27`; Static Integrity run #59 passed. The contact card now shows direct support and phone links, and the enquiry form groups all requested service and platform types.

Digital Marketing &amp; Growth now replaces the former social-only service positioning with a detailed offer for individual and company profiles, publishing, social campaigns and email marketing; the page includes a dedicated enquiry form before FAQs. The profile/page ownership, approval, list-permission and paid-media boundaries are explicit.

Authority Profile starting fees are finalized for publication at **$249, $549 and $899 USD**; PR #40 merged on 25 September 2026 and Static Integrity run #62 passed. The static version has not yet been uploaded to the existing host. Production domain state is unverified by request.

The refreshed site now includes expanded service pages, Authority Profile starting packages, expanded legal drafts, the navy/cobalt/lime visual system, and expanded BPO and individual/business tax-service pages. The tax page now includes six working browser-side estimate tools: individual income, freelancer/sole-proprietor profit, company provision, sales-tax invoice, withholding/net payment and a tax-reserve planner. The Tax Year 2027 individual schedule is based on FBR's published rate card; entity, payment-section and provincial-service rates are entered from the applicable current source instead of being guessed. The page includes a tax-specific enquiry form before FAQs and cautions visitors not to send tax IDs or documents through WhatsApp. PR #45 was squash-merged as `608900a94c3a5b14ec034f5cc189f3b98b9992bd`; Static Integrity run #72 passed. No production deployment was made. Profile prices remain starting fees; legal and tax language should receive qualified Pakistan review before public production use.

The Web Development & E-commerce service now covers managed CMS and store platforms, full-stack application scope, frontend and backend technology combinations, integrations, migration, quality checks, ownership and maintenance. It includes a project-specific WhatsApp brief before FAQs and links to the existing business/profile website and e-commerce detail pages. PR #49 was squash-merged on 25 September 2026 as `2afa432dec154018b8e3b92662c4391e2b5fac76`; Static Integrity run #82 passed on that main-branch commit. No live production check or deployment was performed.

The BPO page now includes a dedicated workflow enquiry form immediately before its FAQs, decision-rights guidance for routine versus approval-required work, and a knowledge-maintenance approach for client-approved procedures. The enquiry captures the service area, approximate workload, channels, coverage window, tools and expected start, then prepares those details for WhatsApp. The form does not send data to a VSN server; it cautions visitors not to include customer records or credentials. PR #43 was squash-merged on 25 September 2026 and Static Integrity run #68 passed. No production deployment was made.


## Visual direction

The refresh uses a midnight navy, cobalt and lime palette, a more editorial homepage hierarchy and a locally stored hero visual. The visual is original, text-free artwork; no external image host is required.

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
- `web-development-ecommerce.html` — web development & e-commerce
- `web-development-ecommerce.html` — web development & e-commerce
- `websites.html` — business website platforms and scope
- `profile.html` — VSN Authority Profile packages and pricing
- `software.html` — software & app development
- `ecommerce.html` — e-commerce development
- `ai-automation.html` — AI & automation
- `social-media.html` — Digital Marketing & Growth (individual and business profiles, social campaigns and email marketing)
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
- Current milestone: Digital Marketing & Growth page, service enquiry and site-navigation updates merged in PR #47; Static Integrity run #76 passed
- External production requirement: qualified Pakistan legal/corporate review
