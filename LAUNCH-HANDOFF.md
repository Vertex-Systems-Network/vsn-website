# VSN Website — Final Handoff

Status date: 2026-09-25
Repository: `Vertex-Systems-Network/vsn-website`

## Final status

The repository is **code-complete and finalized** for the approved website scope.

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

Root HTML pages use relative local references such as:
- `assets/styles.css`
- `assets/app.js`
- `assets/vertex-logo.png`
- `contact.html`
- `legal/privacy.html`

Files inside `legal/` use parent-relative references such as:
- `../assets/styles.css`
- `../assets/app.js`
- `../assets/vertex-logo.png`
- `../contact.html`

`static-integrity` rejects root-relative local links/assets that would break direct `file://` mode.

## Governance decision

GitHub `main` branch protection is currently **not enabled** and has been **deferred by owner for now**.

The repository preserves a ready future activation path:
- `SECURITY-GOVERNANCE.md`
- `scripts/apply_main_protection.ps1`
- `scripts/verify_main_protection.ps1`
- `.github/workflows/main-protection-admin.yml`

This is a deferred governance enhancement, not unfinished website implementation.

## Public web metadata

Canonical URLs, Open Graph URLs, JSON-LD organization URL, sitemap entries and security contact URLs may remain absolute `https://vertexsystemsnetwork.com` metadata. They are not local runtime asset/navigation paths.

## External production requirement

Qualified Pakistan legal/corporate review remains required before public production use.

## Finalization rule

No further repository development is required unless the owner requests a new change or an external review creates new requirements.
