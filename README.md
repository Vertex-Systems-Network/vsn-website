# VSN Website

Official static corporate website for **Vertex Systems Network (VSN)**.

## Status

**Website refresh: merged to main.** PR #38 was squash-merged on 25 September 2026 as `700fc02222885d20d000362ce377bf0d4ff1c4e4`. Static Integrity run #54 passed on the merge commit; post-merge PSEB validity updates passed run #56. All 23 page footers now show the PSEB certificate validity through October 2026; confirm renewal before that date. Run #56 passed on audit commit `63fb624e6e9c5198be8195aa6455c3b5f9ef0f3c`.

Contact-page improvement: PR #39 was squash-merged as `3846b430844736e50558231d0b36a77d420ccd27`; Static Integrity run #59 passed. The contact card now shows direct support and phone links, and the enquiry form groups all requested service and platform types.

Digital Marketing &amp; Growth now replaces the former social-only service positioning with a detailed offer for individual and company profiles, publishing, social campaigns and email marketing; the page includes a dedicated enquiry form before FAQs. The profile/page ownership, approval, list-permission and paid-media boundaries are explicit.

Authority Profile starting fees are finalized for publication at **$249, $549 and $899 USD**; PR #40 merged on 25 September 2026 and Static Integrity run #62 passed. The static version has not yet been uploaded to the existing host. Production domain state is unverified by request.

The refreshed site now includes expanded service pages, Authority Profile starting packages, expanded legal drafts, the navy/cobalt/lime visual system, expanded BPO and individual/business tax-service pages, detailed AI Solutions, Resource Augmentation, and industry-specific pathways. The tax page now includes six working browser-side estimate tools: individual income, freelancer/sole-proprietor profit, company provision, sales-tax invoice, withholding/net payment and a tax-reserve planner. The Tax Year 2027 individual schedule is based on FBR's published rate card; entity, payment-section and provincial-service rates are entered from the applicable current source instead of being guessed. The page includes a tax-specific enquiry form before FAQs and cautions visitors not to send tax IDs or documents through WhatsApp. PR #45 was squash-merged as `608900a94c3a5b14ec034f5cc189f3b98b9992bd`; Static Integrity run #72 passed. No production deployment was made. Profile prices remain starting fees; legal and tax language should receive qualified Pakistan review before public production use.

The Web Development & E-commerce service now covers managed CMS and store platforms, full-stack application scope, frontend and backend technology combinations, integrations, migration, quality checks, ownership and maintenance. It includes a project-specific WhatsApp brief before FAQs and links to the existing business/profile website and e-commerce detail pages. PR #49 was squash-merged on 25 September 2026 as `2afa432dec154018b8e3b92662c4391e2b5fac76`; Static Integrity run #82 passed on that main-branch commit. No live production check or deployment was performed.

Digital Marketing & Growth has been extended to cover SEO, paid search and social ads, content, landing-page conversion paths, email programmes, reporting and media-budget boundaries. The VSN form captures the current website and paid-media budget status before FAQs.

Web Development & E-commerce now also details UX/UI, custom backend/API work, additional frameworks, AI-enabled web features and post-launch maintenance. A standalone Mobile App Development page covers native iOS/Android, Flutter and React Native, learning and creator/task earning models, payments and store-policy dependencies, QA, release and lifecycle support; a project-specific app brief appears before FAQs. App income, store approval and marketing outcomes are not guaranteed.

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
- `websites.html` — business website platforms and scope
- `profile.html` — VSN Authority Profile packages and pricing
- `software.html` — custom software & SaaS
- `mobile-app-development.html` — native and cross-platform mobile apps
- `ecommerce.html` — e-commerce development
- `ai-automation.html` — AI & automation
- `social-media.html` — Digital Marketing & Growth (SEO, paid search/social, profiles, content, email and campaign measurement)
- `bpo.html` — BPO / managed operations
- `tax-consulting.html` — tax & compliance services
- `products.html` — VSN products
- `industries.html` — 19 industry contexts, industry-specific workflow examples and linked VSN capabilities
- `business-solutions.html` — modular Pakistan company setup, launch and operations service
- `resource-augmentation.html` — individual specialist augmentation and dedicated team models
- `resource-augmentation.html` — individual specialist augmentation and dedicated team models
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

## Website progress

- Static architecture and direct-file portability: **100% — complete**
- Direct-file portability: **100% — completed**
- Architecture: **direct-open static HTML + CSS + vanilla JS**
- Server requirement: **none**
- Vercel requirement: **none**
- Main protection: **deferred by owner**
- Current milestone: Business Solutions, service-form design consistency and updated legal drafts merged in PR #55 as `d59fb75827a58ba1f40a82fdc69b1c357015d29e`; Static Integrity run #95 passed on main.
- External production requirement: qualified Pakistan legal/corporate review


Current development chunks: PR #53 completed Industries, AI Solutions and Resource Augmentation. PR #55 added three-module Business Solutions and aligned AI/Resource forms and FAQ presentation with the site's standard layout. The site now has 27 HTML files and 26 indexed sitemap URLs; Static Integrity run #95 passed on main. No live check or deployment was performed.


## Latest milestone — Custom Software, SaaS, Products & navigation (2026-09-26)

PR #57 was squash-merged to `main` as `938393c167be3a5c49d7915d112e598ce1be9a59`. It expands the Custom Software & SaaS page with SaaS architecture, delivery and quality scope, a dedicated project enquiry form and nine FAQs. The Services menu now groups every service detail page; the Company menu links company, trust, contact and legal pages.

The Products page now includes the VSN Metafields marketplace link and a repository directory covering all **15 public VSN organization repositories** discovered in the audit. Four private repositories were excluded. Cards distinguish marketplace product information from active engineering initiatives, templates/tooling and the company website source; repository status labels follow README, docs and manifest evidence and do not claim commercial availability, production readiness or full security review.

Static Integrity passed on the PR head in run #99 and on the merged main commit in run #100. Internal checks found no broken local links or fragments across the 27 HTML pages, confirmed the software enquiry form appears before its FAQs, and verified 15 public-repository links. No production deployment or live-site check was performed.


## Latest milestone — Homepage, About & trust evidence (2026-09-25)

PR #59 merged to `main` as `3356bd642e204e91aa8e04cfb8a47383d38770ba`. Static Integrity run #106 passed on PR head `c08547ed90e3876db63d6d41bc53a05f0b660286`. The homepage was rebuilt around clearer service paths, company credentials, public product proof, delivery roles and contact. About now gives a fuller company story, role-based delivery model, company details, public profiles and a client-feedback approval policy.

Font Awesome Free 6.7.2 SVGs are embedded locally and credited; the shared footer now links to VSN’s verified GitHub organization, WP Essential WordPress.org profile and Shopify app listing on all 27 pages. No official Facebook, Instagram, LinkedIn or X account URLs, named employee bios or client-approved reviews were available to publish. The service-page main content is unchanged. We did not check or deploy the live website.


## Styling fix — Homepage & About (2026-09-26)

The page-specific CSS had been lost during a footer stylesheet update, which left the redesigned Home and About layouts without their grid/card rules. Restored the responsive styles in PR #60 (`17baf7f6b3065d337da6b702ce4bfbf64c92347f`). Static Integrity run #112 passed; local integrity checks also passed for all 27 HTML files and 1,408 local references. Service-page styling was preserved. No production check or deployment was performed.

## Visual and contact refresh (2026-09-26)

The 27-page shared header now uses one identical navigation markup (with relative paths for legal pages), backed by a regression check. The palette follows the official logo's cyan, blue and violet, with restrained hero, card and scroll motion and reduced-motion support. The Contact page now has an OpenStreetMap Phase 4-A area view, direct enquiry, and the three verified public VSN destinations. Map access and privacy behavior are explained on the page and in the Privacy Policy. Home, About and Work link to public Shopify/GitHub evidence and explain that a verified Google Business Profile and approved testimonials are still needed before displaying review ratings. No production check or deployment was performed.

## LinkedIn profile update (2026-09-26)

The owner supplied the official LinkedIn company URL. Its direct canonical company link is now in the shared footer on every page, Contact public channels and About public profiles. The Google Business Profile URL has not yet been supplied or independently matched, so the site does not invent Google ratings or reviews.

LinkedIn profile update was merged as PR #62; Static Integrity run #119 passed. Google review links and ratings remain pending an official Google Business Profile URL.

## Buyer decision and delivery depth (2026-09-26)

The Services catalogue now helps visitors choose a starting path for product engineering, digital sales, operational improvement or Pakistan business setup, then explains what information supports a written scope. The E-commerce page separates merchant decisions, VSN implementation and external platform/provider dependencies, with direct routes to the detailed capability page and contact. The Process page makes scope, direction, working-build and handover review gates explicit. Added responsive layouts and reduced-motion-compatible reveal behavior. No service-page claims, prices or legal terms were changed; no production check or deployment was made.
