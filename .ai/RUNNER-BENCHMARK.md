# Runner Benchmark

Runner-heavy hosted-origin checks are intentionally separate from the direct-file website runtime.

## Direct-file release mode

The VSN website is designed to run by opening `index.html` directly in a browser:
- no Vercel
- no local HTTP server
- no Node runtime
- no framework

These hosted-origin checks are therefore **not required to use the direct-file package**.

## Optional future hosted-origin checks

Only if the same static folder is later published on a normal web host, run these checks together against that final public origin:
- automated link crawl
- Lighthouse / performance benchmark
- accessibility automation
- security response-header scan
- broken external asset validation
- sitemap / robots verification

Do not introduce a local server or deployment platform merely to run this benchmark.
Do not treat this benchmark as a blocker for direct `file://` use.
