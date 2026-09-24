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
- The homepage contains one intentional inline Organization JSON-LD block. Its exact CSP hash is machine-verified in `security/csp-hashes.json`: `sha256-ZM1h9WKmDZGFgxszmJKYmle/IrxoM/sfN9fSDcx5Rbk=`.
- `static-integrity` rejects unexpected inline executable scripts and fails if the JSON-LD bytes drift without an explicit hash-manifest update.
- This makes strict `script-src` practical without `'unsafe-inline'` while preserving structured-data SEO.
- Production security headers still require verification on the deployed origin; this repository does not claim they are active yet.


## Strict CSP baseline candidate

Use this only after testing it on the deployed preview origin:

`Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' 'sha256-ZM1h9WKmDZGFgxszmJKYmle/IrxoM/sfN9fSDcx5Rbk='; style-src 'self'; img-src 'self' https://vertexsystemsnetwork.com; font-src 'self'; connect-src 'self'; form-action 'self'`

Notes:
- `https://vertexsystemsnetwork.com` remains in `img-src` while Issue #5 keeps the official logo remote.
- After the exact official logo is localized, the extra image origin can be removed.
- The hash authorizes only the current exact JSON-LD bytes; changing that block requires a reviewed manifest/hash update.
- This is a repository-side policy candidate, not proof that production response headers are active.
