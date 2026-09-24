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


## Activation note — 2026-09-25

A real Vercel preview now exists:
`https://vsn-website-fgb7kni3h-vsnteam.vercel.app`

The preview is protected by Vercel Authentication. Activate the full live-origin benchmark only when the runner/browser can access the authenticated preview consistently.

Do not run the live-origin jobs against the existing WordPress production site as a substitute, and do not switch the custom production domain before the benchmark passes.
