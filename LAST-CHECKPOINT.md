# Last Checkpoint

Date: 2026-09-25

## Verified starting main
- Repo: Vertex-Systems-Network/vsn-website
- Main SHA: `43fb9fc1e4cae35e3c2beed1ed55ee6fe56f3782`
- PR #30: merged
- Resulting `static-integrity` run #21: green
- Repository state before this milestone: code complete / launch gated

## Active milestone
- Issue #5 — exact official logo localization
- Branch: `brand/localize-official-logo`

## Exact official logo evidence
Owner source:
`https://vertexsystemsnetwork.com/wp-content/uploads/2026/02/vertex-logo.png`

Retrieved server-side from Vercel and verified before commit:
- upstream status: 200
- content type: image/png
- size: 60,222 bytes
- dimensions: 2041×517
- PNG signature: valid
- SHA-256: `ede0edd921742c57af19b513c1aab73e079fe1217f4bc7ad156ab3260109c671`
- local path: `assets/vertex-logo.png`

All 22 HTML pages now reference the local asset and use `img-src 'self'`.

## Vercel state
- Team: `vsnteam`
- Project: `vsn-website`
- Project ID: `prj_xfZGl8mInhJAo7solaapm6lcsaTS`
- True non-production preview: `https://vsn-website-fgb7kni3h-vsnteam.vercel.app`
- Preview is protected by Vercel Authentication.
- Custom production domain remains untouched.

## Remaining production gates after this milestone merges
- Issue #8 — full live QA, deployed-origin header review and Runner Benchmark.
- Issue #14 — actual GitHub main protection.
- Qualified Pakistan legal/corporate review.

## Next deterministic action
Open the logo-localization PR, require green `static-integrity`, exact-head merge, verify resulting main, then close Issue #5.
