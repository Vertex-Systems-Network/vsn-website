# Runner Benchmark

Runner-heavy tasks are intentionally deferred and batched near final launch, per repository workflow policy.

## Deferred tasks
- Automated link crawl against final production origin
- Lighthouse / performance benchmark
- Accessibility automation against deployed pages
- Security-header scan against deployed origin
- Broken external asset validation
- Final sitemap/robots production-origin verification

Do not rerun these on every small development milestone. Run them together once the production hosting target is available and the content/legal blockers are closed.


## Activation note — 2026-09-24

Run this benchmark only after Issue #8 produces a real preview URL. Do not run the live-origin jobs against the existing WordPress production site as a substitute for the new static preview.
