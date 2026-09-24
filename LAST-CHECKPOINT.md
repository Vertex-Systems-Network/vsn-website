# Last Checkpoint

Date: 2026-09-25

## Verified starting main
- Repo: Vertex-Systems-Network/vsn-website
- Main SHA: `332e4b774a033230e3548b29eb5c20cb07abb702`
- PR #20: merged
- PR #20 `static-integrity`: green
- Resulting main run #8: green
- Issue #19: closed
- Open Issues before activation: #5, #8 and #14
- Open PRs before activation: 0
- Main branch protection: disabled

## Active milestone
- Issue #22 — Eliminate inline style debt for strict CSP readiness
- Branch: `security/csp-readiness-inline-style-cleanup`

## Verified debt
- 10 HTML pages contained 14 inline style declarations.
- No inline `<style>` block was required by the site.

## Changes in this milestone
- Move all 14 inline declarations to shared CSS classes.
- Add responsive fallback for the two-column service-grid replacement.
- Extend `static-integrity` to reject inline `style=""` attributes.
- Extend `static-integrity` to reject inline `<style>` blocks.
- Update security-header guidance to record `style-src 'self'` readiness.
- Preserve the homepage JSON-LD and document that strict `script-src` still needs a reviewed CSP hash/equivalent.

## Guardrails
- No website feature or business copy changes.
- No framework/package/Vercel runtime added.
- Production response headers are not claimed active.
- Runner Benchmark remains deferred.

## Next deterministic action
Review the PR at exact head and require a green `static-integrity` run before merge.
