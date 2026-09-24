# Static Preview Deployment Readiness

This repository is a plain static website. Hosting must not introduce a framework, Node runtime, package manager requirement, or application build step.

## Verified source
- Repository: `Vertex-Systems-Network/vsn-website`
- Finalization base main SHA: `273b4de4cfb3fdb44f883282eff834fe8bd1a835`
- Before deployment, use the current `main` only if `static-integrity` is green.
- Production branch: `main`

## Vercel preview settings

Use these settings when the write/deploy surface is available:

- Team: `VSN` / `vsnteam`
- Project name: `vsn-website`
- Git repository: `Vertex-Systems-Network/vsn-website`
- Framework preset: **Other**
- Root directory: repository root
- Build command: **none**
- Install command: **none**
- Output directory: repository root / static files
- Environment variables: none required for the current static site

Do not add `package.json`, framework dependencies, or `vercel.json` merely to make deployment work.

## Preview-only gate

The first deployment must remain a preview. Do not attach or switch the production domain until the checks below pass.

## Live verification checklist

1. Homepage and primary pages return expected content.
2. Internal links do not produce unexpected 404s.
3. The dedicated 404 page renders and remains `noindex,follow`.
4. Mobile navigation opens, closes, and remains usable with JavaScript disabled.
5. Contact form generates the expected WhatsApp handoff.
6. Official remote logo renders; simulated image failure displays the VSN text fallback.
7. Sitemap and robots.txt resolve from the preview origin.
8. Security headers are reviewed against `SECURITY-HEADERS.md`.
9. Accessibility, Lighthouse, broken-link, and external-asset checks from `.ai/RUNNER-BENCHMARK.md` are executed together.
10. Only after a clean preview should production/domain activation be considered.

## Current blocker

In the 2026-09-24 execution session, the connected Vercel app could list teams/projects/deployments but its deploy action was unavailable at runtime. No create-project/create-deployment write action was exposed. Local CLI was also unavailable/authentication could not be established.

This is a deployment-surface blocker, not a website-code blocker.
