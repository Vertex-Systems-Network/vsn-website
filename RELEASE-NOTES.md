# Release notes — 2026-09-24

## Production-hardening milestone
- Replaced stale hard-coded Shopify price with official-listing source of truth.
- Added Process and Payments pages.
- Reworked public legal pages into operational wording with effective dates.
- Added canonical, Open Graph and Twitter metadata.
- Added Organization JSON-LD and public VSN registration identifiers.
- Improved contact-form accessibility and added email/timeline qualification.
- Clarified that the static form opens WhatsApp and does not submit to a VSN database.
- Added keyboard-safe mobile navigation and reduced observer work after reveal.
- Added 404 page and `.well-known/security.txt`.
- Defined recommended CSP, HSTS, referrer, permissions, frame and MIME security headers for compatible production hosting.
- Expanded sitemap and footer navigation.

## Launch Candidate — credibility & trust layer
- Added dedicated Industries, Work & Proof, and Trust & Security pages.
- Added transparent case-study publication standard; no fabricated client proof.
- Added responsible disclosure and shared-responsibility security guidance.
- Added site-wide skip navigation and refreshed primary/footer navigation.
- Added homepage proof/trust/industry credibility section.
- Updated sitemap for new pages.


# Final code-complete candidate — 2026-09-25

## Finalized implementation
- 22-page static corporate website using HTML5, shared CSS and vanilla JavaScript.
- No Node.js runtime, framework, package manager requirement or Vercel-specific runtime configuration.
- Deterministic `static-integrity` CI on pull requests and `main`.
- GitHub Actions supply-chain hardening with immutable SHA pins and no persisted checkout credentials.
- Zero inline HTML style attributes and zero inline `<style>` blocks.
- Organization JSON-LD is schema-validated and SHA-256 allowlisted.
- Unexpected inline executable scripts are rejected by CI.
- Reviewed source-level meta CSP + strict referrer policy enforced on all 22 pages.
- Legal/privacy/refund/cookie/payment content internally reconciled for current static behavior.
- Repository governance target and apply/verify scripts complete.
- Preview deployment and Runner Benchmark instructions complete.

## Finalization status
Repository development is code-complete. Production remains launch-gated by:
1. exact official logo localization — Issue #5;
2. Vercel preview/live QA/Runner Benchmark — Issue #8;
3. actual GitHub main protection — Issue #14;
4. qualified Pakistan legal/corporate review.

See `LAUNCH-HANDOFF.md` for the authoritative production handoff and launch order.


## Exact official logo localization — 2026-09-25
- Retrieved the exact owner-supplied PNG from the canonical VSN source without recreation or optimization.
- Stored the binary at `assets/vertex-logo.png`.
- Verified size: **60,222 bytes**.
- Verified dimensions: **2041×517**.
- Verified SHA-256: `ede0edd921742c57af19b513c1aab73e079fe1217f4bc7ad156ab3260109c671`.
- Replaced remote header/footer/favicon runtime references across all 22 HTML pages.
- Reduced source-level CSP image policy to `img-src 'self'`.
- Extended `static-integrity` to verify the exact logo binary and reject legacy remote-logo references.
- Vercel project `vsn-website` now exists; remaining live QA/Runner work stays under Issue #8.


## Direct-file browser architecture — 2026-09-25
- Owner decision: Vercel removed from the active website plan.
- Website runtime is plain HTML5 + shared CSS + vanilla JavaScript.
- No local HTTP server is required.
- No Node.js runtime, framework, build command or install step is required.
- All root HTML pages use file-safe relative local paths.
- All `legal/` pages use parent-relative paths for root assets/pages.
- `static-integrity` rejects root-relative local `href="/..."` and `src="/..."` values to prevent `file://` regressions.
- Exact official logo remains repository-local and hash-verified.
- Contact-to-WhatsApp, mobile navigation and logo fallback remain client-side JavaScript behavior.
- Hosted-origin Runner/Lighthouse/header checks are optional only if the same static folder is later published online.


## Homepage, About and site-wide trust links — 2026-09-25
- PR #59 squash-merged: `3356bd642e204e91aa8e04cfb8a47383d38770ba`.
- Static Integrity run #106 passed on the PR head.
- Redesigned homepage and expanded About; added role-based delivery visibility, registration facts, public product proof and genuine-feedback standards.
- Added local, credited Font Awesome Free SVG icons and verified public profile links in all 27 footers. Service-page main content remained unchanged.
- No production inspection or deployment. Official social profile URLs and client-approved reviews remain unprovided.
