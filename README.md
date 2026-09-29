# VSN Website

Official static corporate website for **Vertex Systems Network (VSN)**.

## Current canonical state

The website is on the restored **data-first VSN baseline**.

- Canonical substantive restore: PR **#137**
- Canonical certified main SHA: `6ad5b3d8d253a85229a4d3a17f7aa10806439ee1`
- Substantive restore SHA: `45df966794cffd4b2695d14e638c8c78f8a2ca75`
- Restored from data-first visual baseline: `dfb37f291b081c5e67479f4aaa53ece7dc9c0608`
- Static Integrity on certified main: **run #682 passed**
- Production Release Bundle on certified main: **run #20 passed**
- HTML pages: **32**
- Production deployment: **not yet performed**

The post-PR-123 literal mockup-parity rebuild was removed because the visual mockups are references, not a replacement for VSN's real content or information architecture.

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

The certified post-reconciliation main passed **Static Integrity run #682**.

## Deployment

The site remains static and is intended for the existing Middlehost/cPanel production host.

A guarded manual deployment workflow is preserved at:

`.github/workflows/deploy-middlehost.yml`

It requires explicit confirmation and hosting secrets. No production deployment is recorded for the restored baseline.

## Repository governance

Main branch protection is currently deferred by owner. Supporting protection scripts/workflows remain in the repository for later activation.

## AI resume state

Canonical machine-readable resume state:

`.ai/state/CURRENT-STATE.yaml`

Human checkpoint:

`.ai/state/LAST-CHECKPOINT.md`

Future work must recover from repository evidence rather than stale chat state.

## Full rendered certification

Point 2 is complete.

Temporary certification PR **#139** was created from certified main with only an inert `assets/` trigger file and was closed **without merge** after the checks completed, so the trigger never entered main.

Evidence:

- Static Integrity **#683 — passed**
- Visual Browser QA **#138 — passed**, failures: **0**
- Secondary Visual Browser QA **#104 — passed**, failures: **0**
- Primary and secondary screenshot artifacts were uploaded successfully
- The primary log contained one blocked external Ritovex placeholder request; it was not a VSN runtime failure and was not in the failure set

## Next work

The next allowed project step is **Point 3: data-first Home visual polish**.

The Home page may adopt useful mockup visual cues, but VSN's real data, sections, evidence, services and functional behavior remain authoritative.
