# Static Preview Deployment Readiness

This repository is a plain static website. Hosting must not introduce a framework, Node runtime, package manager requirement, or application build step.

## Verified source
- Repository: `Vertex-Systems-Network/vsn-website`
- Last verified main before logo-localization candidate: `43fb9fc1e4cae35e3c2beed1ed55ee6fe56f3782`
- Before deployment, use the current `main` only if `static-integrity` is green.
- Production branch: `main`

## Vercel preview settings

Current Vercel project:

- Team: `VSN` / `vsnteam`
- Project name: `vsn-website`
- Project ID: `prj_xfZGl8mInhJAo7solaapm6lcsaTS`
- Git repository target: `Vertex-Systems-Network/vsn-website`
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
6. Repository-local official logo renders; simulated image failure displays the VSN text fallback.
7. Sitemap and robots.txt resolve from the preview origin.
8. Security headers are reviewed against `SECURITY-HEADERS.md`.
9. Accessibility, Lighthouse, broken-link, and external-asset checks from `.ai/RUNNER-BENCHMARK.md` are executed together.
10. Only after a clean preview should production/domain activation be considered.

## Current preview state

The connected Vercel write action now works and created project `vsn-website`.

Verified true non-production preview:
`https://vsn-website-fgb7kni3h-vsnteam.vercel.app`

The preview is protected by Vercel Authentication, which currently blocks a complete automated browser/Runner pass from this execution surface. The custom production domain remains untouched.

Current blocker is preview-authenticated live QA, not repository deployment creation.
