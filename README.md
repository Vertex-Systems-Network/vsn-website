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

Legal pages are in `legal/` and should receive final Pakistani legal/corporate review before production launch.

## Deployment

This repository intentionally stays host-agnostic. Deploy the files to any static hosting environment or standard web server.

## Branding

The website references the official VSN logo supplied by the owner at `https://vertexsystemsnetwork.com/wp-content/uploads/2026/02/vertex-logo.png` for the header, footer and favicon.


## AI-Native progress

- Last verified `main`: `628d01c2b63ad96f48dc3124a6a0405029da6f28`
- Launch QA hardening: **merged and verified**
- Post-merge state closeout: **merged and verified**
- Current module: Brand asset resilience — PR pending review
- Overall launch readiness: **96%**
- Active Issue: **#5**
- Runner-heavy QA remains deferred to `.ai/RUNNER-BENCHMARK.md` for final-stage batching.
- Exact official logo remains sourced from the owner-supplied WordPress URL; runtime text fallback is now included if that image fails.
- Repo-local official PNG remains blocked until the exact binary becomes retrievable.
