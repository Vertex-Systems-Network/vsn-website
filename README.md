# VSN Website

Official static corporate website for **Vertex Systems Network (VSN)**.

## Current canonical state

The website is on the restored **data-first VSN baseline**, with Point 6 final motion and production certification completed.

- Canonical substantive restore: PR **#137**
- Post-restore reconciliation: PR **#138**
- Point 3 Home visual polish: PR **#142**
- Point 4 Services + service-detail visual polish: PR **#143**
- Point 5 Company + editorial visual polish: PR **#144**
- Point 6 Final motion + production certification: PR **#145**
- Current certified runtime SHA: `37853514407c05ccb53afe4da25dd57621f8d14b`
- Restored from data-first visual baseline: `dfb37f291b081c5e67479f4aaa53ece7dc9c0608`
- Static Integrity on current runtime: **run #717 passed**
- Production Release Bundle on current runtime: **run #33 passed**
- Visual Browser QA for Point 6: **run #158 passed, failures 0**
- Secondary Visual Browser QA for Point 6: **run #124 passed, failures 0**
- HTML pages: **32**
- Production deployment: **not yet performed**

The post-PR-123 literal mockup-parity rebuild was removed because visual mockups are references, not a replacement for VSN's real content or information architecture.

## Design and content contract

VSN's actual business information is authoritative.

Mockups and external visual references may influence:

- image treatment
- spacing and composition
- typography scale
- card geometry
- dark/light rhythm
- glass, dashboard or cinematic styling where it fits the content

They must **not**:

- replace VSN content with mockup content
- force the same section count as a mockup
- remove service detail because a reference page is shorter
- turn Projects and Blog into the same page type
- fabricate clients, metrics, awards, reviews or testimonials
- remove functional VSN elements such as forms, FAQs, public proof or the Contact map

## Preserved restored functionality

The current baseline preserves:

- Home three-slide image hero and restrained parallax behavior
- real VSN content and service information
- 12 service-detail pages
- service-specific enquiry forms before FAQs
- Contact project brief and direct contact routes
- Google Map on Contact
- Blog listing and Blog Detail as editorial content
- Projects listing and Project Detail as project/case-study content
- VSN Metafields and other factual public-proof links
- responsive mobile navigation
- reduced-motion support
- the single-owner motion model used to avoid duplicate scroll-animation jerk

Useful Batch 1-3 visual upgrades remain. Literal `*-mockup-parity.css` layers do not.

## Point 3 — data-first Home visual polish

Point 3 is complete and merged in PR **#142**.

The Home page now reuses the useful dashboard-style information layering from the rejected mockup direction, but the panel is populated with VSN's own service data rather than mockup content.

The hero dashboard contains:

- Build — Software & products
- Automate — AI & workflows
- Grow — Web, commerce & growth
- Operate — BPO, teams & business support
- VSN Metafields as public proof

The existing Home sections, three-slide hero, parallax, service routes, proof sections, Products, Blog content and other VSN information remain intact.

Point 3 runtime files:

- `index.html`
- `assets/home-point3-data-first.css`

Final Point 3 evidence:

- Static Integrity PR run **#696 — passed**
- Static Integrity merged-main run **#697 — passed**
- Visual Browser QA **#149 — passed**, failures: **0**
- Secondary Visual Browser QA **#115 — passed**, failures: **0**
- Production Release Bundle **#22 — passed**
- desktop screenshot manually reviewed
- mobile screenshot manually reviewed after correcting dashboard heading wrapping and slider-caption ghosting

## Point 4 — Services + service-detail data-first visual polish

Point 4 is complete and merged in PR **#143**.

The Services landing page and all **12 service-detail pages** now use a shared VSN data-first visual layer.

The service-detail pages include a compact lane rail based on VSN's real service architecture:

- Build — software, apps, web and commerce
- Automate — AI, BPO and dedicated delivery
- Grow — profiles, websites and digital growth
- Business — setup, tax and operating support

Point 4 also refines service hero/media framing, service cards, scope panels, enquiry forms, FAQs, Authority Profile pricing cards, the Services accordion and technology grid.

The implementation explicitly preserves:

- long-form VSN service content
- all existing service routes
- enquiry forms before FAQs on all 12 service-detail pages
- Authority Profile starting prices of **$499 / $999 / $1,999**
- tax calculators and page-specific service functionality
- factual public proof only

Point 4 runtime files include `services.html`, all 12 service-detail HTML pages and `assets/point4-services-data-first.css`.

Final Point 4 evidence:

- Static Integrity PR run **#700 — passed**
- Static Integrity merged-main run **#701 — passed**
- Visual Browser QA **#151 — passed**, failures: **0**
- Secondary Visual Browser QA **#117 — passed**, failures: **0**
- Production Release Bundle **#24 — passed**
- desktop Services and representative service-detail screenshots manually reviewed
- mobile service-detail screenshot manually reviewed after keeping the lane rail in a compact 2×2 layout
- no horizontal overflow, missing images, page errors or console errors in the final browser reports

## Point 5 — Company + editorial data-first visual polish

Point 5 is complete and merged in PR **#144**.

The following page families now use a shared VSN visual language without being turned into one template:

- About
- Products
- Projects
- Project Detail
- Blog
- Blog Detail
- Contact

Point 5 adds `assets/point5-company-editorial.css` and refines:

- About company proof, verification, team and media presentation
- Products product/repository hierarchy and public-proof framing
- Projects technical/public-work cards and repository evidence
- Project Detail fact strip and case-study/evidence framing
- Blog listing editorial card hierarchy
- Blog Detail reading/publish-strip treatment
- Contact project form, route cards, information cards and map presentation

The implementation explicitly preserves:

- Products as evidence-based content with VSN Metafields/public repositories
- Projects and Blog as distinct content types
- Project Detail and Blog Detail as distinct semantics
- Contact project brief, phone/WhatsApp/email routes and Google Map
- factual public proof only
- the approved VSN logo palette only

During manual screenshot review, a large legacy blank area on Projects was found and removed before final certification.

Final Point 5 evidence:

- Static Integrity PR run **#706 — passed**
- Static Integrity merged-main run **#707 — passed**
- Visual Browser QA **#153 — passed**, failures: **0**
- Secondary Visual Browser QA **#119 — passed**, failures: **0**
- Production Release Bundle **#28 — passed**
- desktop and mobile screenshots manually reviewed across the Point 5 page families
- no horizontal overflow, missing images, page errors, console errors or navigation errors in the final browser reports

## Point 6 — Final motion + production certification

Point 6 is complete and merged in PR **#145**.

The final motion pass keeps a single reveal engine and extends it to selected Point 3–5 components without adding another scroll/reveal owner.

Certified behavior:

- `assets/motion.js` is the only runtime `IntersectionObserver` owner
- exactly one reveal observer is constructed
- reveal targets are deduplicated
- one-shot reveal/unobserve behavior is preserved
- `motion-init.js` loads before the first stylesheet on all **32 HTML pages**
- all 32 HTML pages load the motion runtime
- no pointermove animation loops
- no Web Animations API loops
- Home parallax remains separate and requestAnimationFrame-throttled
- real reduced-motion browser contexts pass for Home, Service Detail, Blog and Contact

A stricter final browser check found a real footer bug: the document-bottom copyright/SECP/icon-credit line could remain hidden because the observer's negative bottom root margin could not be satisfied at the absolute document end. The bottom legal line is now permanently visible while the upper footer keeps its motion treatment.

Final Point 6 evidence:

- Static Integrity PR run **#716 — passed**
- Visual Browser QA **#158 — passed**, failures: **0**
- Secondary Visual Browser QA **#124 — passed**, failures: **0**
- Static Integrity merged-main run **#717 — passed**
- Production Release Bundle **#33 — passed**
- release ZIP SHA-256: `eb6c6b86554f346c6b76098e3a16ae0f6ecffd006d2d2aea02e06ff64d5240b5`
- deterministic release: **32 HTML files / 94 runtime files**
- reduced-motion hidden targets: **0**
- desktop/mobile screenshots manually reviewed, including the corrected footer bottom

Production has **not** been deployed. The existing Middlehost deployment remains a separate explicit manual action.

## Architecture

- HTML5
- shared CSS
- vanilla JavaScript
- no application framework
- no Node runtime for the website
- no Vercel dependency
- direct `file://` opening supported
- relative local links required

Do not convert local URLs back to root-relative `/assets/...` or `/contact.html` paths because direct-file use depends on relative paths.

## Main pages

### Core

- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `products.html` — Products
- `projects.html` — Projects
- `project-detail.html` — Project Detail
- `blog.html` — Blog
- `blog-detail.html` — Blog Detail
- `contact.html` — Contact
- `industries.html` — Industries
- `work.html` — Work & Proof
- `process.html` — Process
- `trust.html` — Trust & Security
- `payments.html` — Payments

### Service detail pages

- `software.html` — Custom Software & SaaS
- `web-development-ecommerce.html` — Web Development & E-commerce
- `websites.html` — Business Websites
- `ecommerce.html` — E-commerce
- `mobile-app-development.html` — Mobile App Development
- `ai-automation.html` — AI Solutions
- `profile.html` — Authority Profile
- `social-media.html` — Digital Marketing & Growth
- `bpo.html` — BPO Services
- `business-solutions.html` — Business Solutions
- `tax-consulting.html` — Pakistan Tax Support
- `resource-augmentation.html` — Resource Augmentation

### Utility and legal

- `404.html`
- `coming-soon.html`
- `legal/terms.html`
- `legal/privacy.html`
- `legal/refunds.html`
- `legal/cookies.html`

## Authority Profile

Authority Profile is a **standalone service**, not a generic company-page bundle.

Current starting package fees shown by the page are:

- Essential — **$499 USD**
- Authority — **$999 USD**
- Signature — **$1,999 USD**

The older **$249 / $549 / $899** package schedule is superseded. A separate Media Kit add-on may still start at $249 and should not be confused with the Essential package price.

## Forms and FAQs

Service-detail pages retain their detailed content.

Where a service has an enquiry form, the intended order is:

1. service information
2. enquiry / project brief form
3. FAQs

Do not move the FAQ above the form during visual redesign work.

The current forms prepare client-side project briefs; they do not claim a VSN server-side submission backend where none exists.

## Contact and public proof

The Contact page retains:

- project brief form
- direct phone / WhatsApp / email routes
- public-profile links
- Google Maps area embed

The privacy policy contains the corresponding Google Maps disclosure.

Public evidence must remain factual. Do not publish unverified client names, reviews, partner logos, certifications, adoption counts or performance claims.

## Brand palette

Approved website palette is based on the VSN logo:

- `#5AC8D6`
- `#625BA8`
- `#6188C6`
- `#3F4245`
- `#7E8083`
- `#000000`
- `#FFFFFF`

The official logo remains `assets/vertex-logo.png`.

## Continuous integration

`.github/workflows/static-integrity.yml` checks:

- exact logo palette
- static-site integrity
- deterministic release packaging
- repository state consistency
- motion behavior
- Ritovex/reference fidelity guards

## Deployment

The site remains static and is intended for the existing Middlehost/cPanel production host.

A guarded manual deployment workflow is preserved at:

`.github/workflows/deploy-middlehost.yml`

It requires explicit confirmation and hosting secrets. No production deployment is recorded for the current baseline.

## Repository governance

Main branch protection is currently deferred by owner. Supporting protection scripts/workflows remain in the repository for later activation.

## AI resume state

Canonical machine-readable resume state:

`.ai/state/CURRENT-STATE.yaml`

Human checkpoint:

`.ai/state/LAST-CHECKPOINT.md`

Future work must recover from repository evidence rather than stale chat state.

## Point 2 — full restored-baseline certification

Point 2 is complete.

Temporary certification PR **#139** was created from certified main with only an inert `assets/` trigger file and was closed **without merge** after the checks completed.

Evidence:

- Static Integrity **#683 — passed**
- Visual Browser QA **#138 — passed**, failures: **0**
- Secondary Visual Browser QA **#104 — passed**, failures: **0**

## Next work

The planned Point 1–6 website recovery, visual-polish and certification sequence is complete.

The next operational action is either an explicitly requested guarded Middlehost production deployment or a new owner-requested content/product/site change. Production is not considered deployed until the manual deployment workflow and live HTTPS smoke checks pass.
