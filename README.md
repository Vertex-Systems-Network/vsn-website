# VSN Website

Official static corporate website for **Vertex Systems Network (VSN)**.

## Architecture

- Plain HTML5 pages
- Shared CSS in `assets/styles.css`
- Shared vanilla JavaScript in `assets/app.js`
- No Node.js runtime
- No framework dependency
- No Vercel-specific package or configuration required
- Can run locally from any static HTTP server or compatible web host

## Local preview

From the repository root:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

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

Legal pages are in `legal/`. Internal consistency hardening is documented in `LEGAL-REVIEW.md`; final Pakistan-qualified legal/corporate review is still required before production launch.

## Deployment

This repository intentionally stays host-agnostic. Deploy the files to any static hosting environment or standard web server.

## Continuous integration

`.github/workflows/static-integrity.yml` runs fast source-integrity checks with Python standard library only. The stable job name is `static-integrity`. Third-party actions are pinned to immutable commit SHAs, checkout credentials are not persisted, and Dependabot tracks GitHub Actions updates. This remains separate from the deferred Runner Benchmark.

## Repository governance

Target main-branch protection and deterministic apply/verify commands are documented in `SECURITY-GOVERNANCE.md`. Repository protection must require pull requests while keeping required human approvals at zero for the AI-led workflow.

## Branding

The website references the official VSN logo supplied by the owner at `https://vertexsystemsnetwork.com/wp-content/uploads/2026/02/vertex-logo.png` for the header, footer and favicon.


## AI-Native progress

- Repository state: **CODE COMPLETE / LAUNCH GATED**
- Finalization base `main`: `273b4de4cfb3fdb44f883282eff834fe8bd1a835`
- Repository implementation: **100%**
- Source security/CSP: **100%**
- CI/security automation: **100%**
- Overall launch readiness: **98%**
- Canonical launch handoff: `LAUNCH-HANDOFF.md`
- Production/domain switch: **not authorized yet**
- Remaining gates: Issue #5 exact logo, Issue #8 preview/live QA/Runner, Issue #14 actual main protection, and final qualified Pakistan legal/corporate review.
- Do not create speculative framework/runtime work to bypass those gates.
