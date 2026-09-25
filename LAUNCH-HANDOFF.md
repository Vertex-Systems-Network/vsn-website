# VSN Website — Direct HTML Handoff

Status date: 2026-09-25
Repository: `Vertex-Systems-Network/vsn-website`

## Final runtime model

The VSN website is intentionally a **direct-open static website**:

- HTML5
- shared CSS
- vanilla JavaScript
- no Vercel
- no local HTTP server
- no Node.js runtime
- no framework
- no build or install step

Keep the folder structure intact and open `index.html` directly in a browser.

## JavaScript behavior

`assets/app.js` provides:
- mobile navigation open/close
- Escape-key menu close
- reveal behavior with graceful fallback
- project brief → WhatsApp handoff
- official-logo failure fallback

No backend is required for these interactions.

## Direct-file path contract

Root HTML pages must use relative local references such as:
- `assets/styles.css`
- `assets/app.js`
- `assets/vertex-logo.png`
- `contact.html`
- `legal/privacy.html`

Files inside `legal/` must use parent-relative references such as:
- `../assets/styles.css`
- `../assets/app.js`
- `../assets/vertex-logo.png`
- `../contact.html`

Cross-links inside `legal/` can use sibling references such as `privacy.html`.

`static-integrity` rejects root-relative local links and assets because paths such as `/assets/app.js` do not belong in direct `file://` mode.

## Public web metadata

Canonical URLs, Open Graph URLs, JSON-LD organization URL, sitemap entries and security contact URLs may remain absolute `https://vertexsystemsnetwork.com` metadata. They are not local runtime asset/navigation paths.

## Remaining governance gates

- Issue #14 — apply and verify actual GitHub `main` protection.
- Qualified Pakistan legal/corporate review before a public production launch.
- Final `static-integrity` must remain green.

Vercel preview/deployment is not a launch gate and must not be reintroduced unless the owner explicitly changes the architecture.
