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
- The homepage still contains intentional inline JSON-LD structured data. A strict production `script-src` must account for that data block, for example with a reviewed CSP hash, rather than blindly enabling `'unsafe-inline'`.
- Production security headers still require verification on the deployed origin; this repository does not claim they are active yet.
