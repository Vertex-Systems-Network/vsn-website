# Last Checkpoint

Date: 2026-09-25

## User architecture decision
Vercel is no longer part of the website plan.

Required runtime:
- plain HTML
- CSS
- vanilla JavaScript
- no local server
- no Node runtime
- no framework
- open `index.html` directly in the browser

## Verified starting main
- `185bf03f23767cfcda34f87b6940030d701b1df5`
- exact official logo is already localized and CI-verified

## Active milestone
Issue #33 — direct-file browser portability.

Branch:
`feat/direct-file-browser-mode`

All 22 HTML pages are being converted from root-absolute local paths to file-safe relative paths.

## Required invariant
- root pages: `assets/app.js`, `contact.html`, `legal/privacy.html`
- legal pages: `../assets/app.js`, `../contact.html`, `privacy.html`
- no local `href="/..."` or `src="/..."`

## Remaining non-runtime gates
- Issue #14 — actual GitHub main protection.
- Qualified Pakistan legal/corporate review before public production use.
