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
