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

`.github/workflows/static-integrity.yml` runs fast source-integrity checks with Python standard library only. The stable job name is `static-integrity`. This is intentionally separate from the deferred Runner Benchmark.

## Repository governance

Target main-branch protection and deterministic apply/verify commands are documented in `SECURITY-GOVERNANCE.md`. Repository protection must require pull requests while keeping required human approvals at zero for the AI-led workflow.

## Branding

The website references the official VSN logo supplied by the owner at `https://vertexsystemsnetwork.com/wp-content/uploads/2026/02/vertex-logo.png` for the header, footer and favicon.


## AI-Native progress

- Last verified `main`: `d9d0f4a8499093075ada558dfb6116c912aaf9b7`
- Static Integrity CI: **merged and green on PR + main**
- Current module: Require `static-integrity` in main protection — PR pending review
- Overall launch readiness: **98%**
- Active governance Issue: **#14**
- Target branch protection now requires `static-integrity` in strict mode.
- Human approvals remain **0** to preserve the AI-led workflow.
- Actual GitHub main protection is still not active because the current connector lacks the administration write action.
- Deployment Issue #8 and logo localization Issue #5 remain open.
- Final Pakistan-qualified legal review remains required.
- No `package.json`, framework runtime, or `vercel.json` is required.
