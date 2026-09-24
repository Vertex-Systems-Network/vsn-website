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
Until the official logo is stored locally, image policy must allow:
- `'self'`
- `https://vertexsystemsnetwork.com`

The contact flow opens `https://wa.me` only after a user submits the local project brief.

Do not copy a CSP blindly. Validate the final header against the deployed origin and all intentional third-party resources.


## CSP readiness status — 2026-09-25

- Remaining inline `style=""` attributes in HTML: **0** after Issue #22.
- Inline `<style>` blocks: **0**.
- `static-integrity` rejects future inline style attributes and inline style blocks.
- This makes a future production `style-src 'self'` policy practical without `'unsafe-inline'`.
- The homepage and About page contain identical intentional inline Organization JSON-LD blocks. Its exact CSP hash is machine-verified in `security/csp-hashes.json`: `sha256-ZM1h9WKmDZGFgxszmJKYmle/IrxoM/sfN9fSDcx5Rbk=`.
- `static-integrity` rejects unexpected inline executable scripts and fails if the JSON-LD bytes drift without an explicit hash-manifest update.
- This makes strict `script-src` practical without `'unsafe-inline'` while preserving structured-data SEO.
- Production security headers still require verification on the deployed origin; this repository does not claim they are active yet.


## Strict CSP baseline candidate

Use this only after testing it on the deployed preview origin:

`Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' 'sha256-ZM1h9WKmDZGFgxszmJKYmle/IrxoM/sfN9fSDcx5Rbk='; style-src 'self'; img-src 'self' https://vertexsystemsnetwork.com; font-src 'self'; connect-src 'none'; worker-src 'none'; form-action 'self'`

Notes:
- `https://vertexsystemsnetwork.com` remains in `img-src` while Issue #5 keeps the official logo remote.
- After the exact official logo is localized, the extra image origin can be removed.
- The same reviewed hash authorizes the identical Organization JSON-LD bytes on `index.html` and `about.html`; changing either block requires a reviewed manifest/hash update.
- This is a repository-side policy candidate, not proof that production response headers are active.


## Source-level meta CSP defense in depth — 2026-09-25

All 22 HTML pages now carry the same reviewed `Content-Security-Policy` meta policy before loadable resources:

`default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self' 'sha256-ZM1h9WKmDZGFgxszmJKYmle/IrxoM/sfN9fSDcx5Rbk='; style-src 'self'; img-src 'self' https://vertexsystemsnetwork.com; font-src 'self'; connect-src 'none'; worker-src 'none'; form-action 'self'`

They also carry:

`<meta name="referrer" content="strict-origin-when-cross-origin">`

`static-integrity` enforces the exact policy, placement, referrer policy, and rejects any policy containing `'unsafe-inline'` or `'unsafe-eval'`.

This is defense in depth only. A meta CSP does **not** replace production response headers. In particular:
- `frame-ancestors` must be delivered as an HTTP response header.
- HSTS must be delivered as an HTTP response header.
- Permissions-Policy must be delivered as an HTTP response header.
- Final deployed-origin headers still require live preview verification under Issue #8.
