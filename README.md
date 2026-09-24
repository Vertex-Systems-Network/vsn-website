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

The exact owner-supplied VSN logo is stored at `assets/vertex-logo.png` and used locally for the header, footer and favicon. Verified SHA-256: `ede0edd921742c57af19b513c1aab73e079fe1217f4bc7ad156ab3260109c671`; dimensions: `2041×517`; size: `60,222 bytes`.


## AI-Native progress

- Repository state: **CODE COMPLETE / LAUNCH GATED**
- Last verified `main`: `43fb9fc1e4cae35e3c2beed1ed55ee6fe56f3782`
- Current module: exact official logo localization — PR pending review
- Repository implementation: **100%**
- Source security/CSP: **100%**
- CI/security automation: **100%**
- Overall launch readiness: **99%**
- Exact official logo binary is now repository-local and machine-verified.
- Runtime CSP image policy is reduced to `img-src 'self'`.
- Vercel project `vsn-website` now exists; live QA/Runner work remains under Issue #8.
- Branch protection Issue #14 and final qualified Pakistan legal/corporate review remain production gates.
- Production/domain switch: **not authorized yet**.
