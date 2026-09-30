# LAST CHECKPOINT — Point 6 Final Motion & Production Certification

Date: 2026-09-30

## Canonical runtime

- Repository: Vertex-Systems-Network/vsn-website
- Point 6 PR: #145
- Certified PR head: `ccb0c9f175f82ae3674bab0d1c34c14e83b26bc2`
- Merged main runtime SHA: `37853514407c05ccb53afe4da25dd57621f8d14b`
- Static Integrity on PR head: run #716 — passed
- Visual Browser QA: run #158 — passed, failures: 0
- Secondary Visual Browser QA: run #124 — passed, failures: 0
- Static Integrity on merged main: run #717 — passed
- Production Release Bundle on merged main: run #33 — passed
- Release ZIP SHA-256: `eb6c6b86554f346c6b76098e3a16ae0f6ecffd006d2d2aea02e06ff64d5240b5`

## Point 6 objective

Finish the site-wide animation/motion pass without reintroducing the previous double-trigger/appear-then-jump problem, and certify the complete static runtime for production packaging.

## Motion architecture locked

Verified:

- `assets/motion.js` is the only runtime `IntersectionObserver` owner
- exactly one reveal observer is constructed
- reveal targets are deduplicated before observation
- reveals are one-shot and unobserved after entry
- `motion-init.js` loads before the first stylesheet on all 32 HTML pages
- the motion runtime is wired on all 32 HTML pages
- no pointermove animation loops exist
- no Web Animations API loops exist
- Home hero parallax remains a separate requestAnimationFrame scroll effect, not a second reveal engine

## Point 3–5 choreography

The same single observer now includes restrained motion for selected newer data-first components across:

- Home dashboard/credential elements
- Services lane elements
- About proof/team elements
- Projects and Project Detail proof/evidence elements
- Blog Detail publish/intro elements
- Contact route/info/map elements
- upper footer CTA/grid/public links

Motion distances are intentionally restrained to avoid the old jump/jerk behavior.

## Reduced-motion certification

Real browser contexts with `prefers-reduced-motion: reduce` were executed for:

- Home
- representative Service Detail
- Blog
- Contact

All certified with:

- reduced-motion state active
- motion control disabled
- hidden motion targets: 0

## Bug found and fixed during certification

A stricter hidden-content check found that the footer's document-bottom copyright/SECP/icon-credit line could remain at opacity 0 because the observer's negative bottom root margin could never be satisfied at the absolute end of the document.

The fix removed the final legal/footer-bottom line from reveal animation while keeping upper footer sections animated.

Final primary and secondary browser runs passed after this correction.

## Rendered evidence

Final reports record:

- failures: 0
- horizontal overflow: 0
- missing images: 0
- local console errors: 0
- local page errors: 0
- reduced-motion hidden targets: 0

Desktop and mobile screenshots were manually reviewed, including the footer-bottom correction.

## Security / production packaging

- security-header documentation now matches the 32-page runtime
- deterministic release packaging passed
- release package contains 32 HTML files and 94 runtime files
- Production Release Bundle run #33 passed on merged main

## Point 6 status

CLOSED — merged and certified.

## Production status

Production deployment has **not** been performed.

The Middlehost workflow remains guarded and manual. It requires explicit workflow dispatch, the exact `DEPLOY-PRODUCTION` confirmation and valid hosting secrets.

## Next allowed action

Either:

- explicitly perform the guarded Middlehost production deployment, or
- make a new owner-requested content/product/site change.

Do not treat production as deployed until live HTTPS smoke checks actually pass.
