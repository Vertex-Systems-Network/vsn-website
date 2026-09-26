# Recommended Production Security Headers

The site is host-agnostic static HTML, so response headers belong to the selected production web server/CDN rather than to a framework package.

Recommended baseline after deployment:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (only after HTTPS is confirmed everywhere)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` scoped to the actual production dependencies
- clickjacking protection via CSP `frame-ancestors 'none'` where compatible

## Current CSP dependencies
The exact official VSN logo is now stored locally at `assets/vertex-logo.png`, so the site runtime image policy only needs `'self'`.

Verified logo identity:
- SHA-256: `ede0edd921742c57af19b513c1aab73e079fe1217f4bc7ad156ab3260109c671`
- PNG dimensions: `2041×517`
- Size: `60,222 bytes`

The contact flow opens `https://wa.me` only after a user submits the local project brief.

Do not copy a CSP blindly. Validate the final header against the deployed origin and all intentional third-party resources.


## CSP readiness status — 2026-09-25

- Remaining inline `style=""` attributes in HTML: **0** after Issue #22.
- Inline `<style>` blocks: **0**.
- `static-integrity` rejects future inline style attributes and inline style blocks.
- This makes a future production `style-src 'self'` policy practical without `'unsafe-inline'`.
- The homepage and About page contain identical intentional inline Organization JSON-LD blocks. Its exact CSP hash is machine-verified in `security/csp-hashes.json`: `sha256-+RvWWLE055Y83NN2tnQqwBMbousTQloiJeaaIBrsomU=`.
- `static-integrity` rejects unexpected inline executable scripts and fails if the JSON-LD bytes drift without an explicit hash-manifest update.
- This makes strict `script-src` practical without `'unsafe-inline'` while preserving structured-data SEO.
- Production security headers still require verification on the deployed origin; this repository does not claim they are active yet.


## Strict CSP baseline candidate

Use this only if the direct-file package is later published on a normal HTTPS web host:

`Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' 'sha256-+RvWWLE055Y83NN2tnQqwBMbousTQloiJeaaIBrsomU='; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; worker-src 'none'; form-action 'self'`

Notes:
- The exact owner-supplied logo is repository-local, so no external image origin is required for current runtime assets.
- `static-integrity` verifies the local PNG hash, signature, dimensions and page references.
- The same reviewed hash authorizes the identical Organization JSON-LD bytes on `index.html` and `about.html`; changing either block requires a reviewed manifest/hash update.
- This is a repository-side policy candidate, not proof that production response headers are active.


## Source-level meta CSP defense in depth — 2026-09-25

All 22 HTML pages now carry the same reviewed `Content-Security-Policy` meta policy before loadable resources:

`default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self' 'sha256-+RvWWLE055Y83NN2tnQqwBMbousTQloiJeaaIBrsomU='; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; worker-src 'none'; form-action 'self'`

They also carry:

`<meta name="referrer" content="strict-origin-when-cross-origin">`

`static-integrity` enforces the exact policy, placement, referrer policy, and rejects any policy containing `'unsafe-inline'` or `'unsafe-eval'`.

This is defense in depth only. A meta CSP does **not** replace production response headers. In particular:
- `frame-ancestors` must be delivered as an HTTP response header.
- HSTS must be delivered as an HTTP response header.
- Permissions-Policy must be delivered as an HTTP response header.
- Response-header verification applies only if the static folder is later published on an HTTPS web host; it is not required for direct `file://` use.

## Contact map exception (2026-09-26)

The Contact page embeds an OpenStreetMap area map. Its source-level CSP adds `frame-src https://www.openstreetmap.org`. If response CSP headers are configured, allow the same frame origin on Contact only. Other pages retain the baseline. The map is described in the Privacy Policy.
