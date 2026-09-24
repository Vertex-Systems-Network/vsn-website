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

- Last verified `main`: `615b0e5442f24b10e7963cf101ef7b423610f086`
- CSP inline-style cleanup: **merged and green**
- Static Integrity CI: **green on resulting main**
- Current module: `actions/checkout` v7.0.1 pinned upgrade — PR pending review
- Overall launch readiness: **98%**
- Checkout target: `3d3c42e5aac5ba805825da76410c181273ba90b1` (v7.0.1).
- `persist-credentials: false` remains enforced.
- Dependabot PR #21 is stale after PR #23 and will be superseded by the latest-main equivalent.
- Branch protection Issue #14, deployment Issue #8 and logo Issue #5 remain open.
- Final Pakistan-qualified legal review remains required.
- No `package.json`, framework runtime, or `vercel.json` is required.
