# Last Checkpoint

Date: 2026-09-25

## Verified starting main
- Repo: Vertex-Systems-Network/vsn-website
- Main SHA: `4d09259a9e8999f1508b3d7fb161793829a55421`
- PR #24: merged
- PR #24 `static-integrity` run #12: green
- Resulting main run #13: green
- Dependabot PR #21: superseded and closed
- Open Issues before activation: #5, #8 and #14
- Open PRs before activation: 0
- Main branch protection: disabled

## Active milestone
- Issue #25 — Make inline JSON-LD strict-CSP hash verifiable
- Branch: `security/csp-script-hash-readiness`

## Changes in this milestone
- Keep identical Organization JSON-LD inline on `index.html` and `about.html` for structured-data SEO.
- Add machine-readable `security/csp-hashes.json`.
- SHA-256 allowlist the exact JSON-LD bytes: `sha256-ZM1h9WKmDZGFgxszmJKYmle/IrxoM/sfN9fSDcx5Rbk=`.
- Make `static-integrity` reject unexpected inline executable scripts.
- Parse/validate the JSON-LD and compare computed hashes against the manifest.
- Ensure documented CSP hash stays synchronized with the manifest.
- Add a strict CSP baseline candidate without `'unsafe-inline'`.

## Guardrails
- No website feature/business-copy changes.
- No framework/package/Vercel runtime added.
- Production headers are not claimed active.
- Runner Benchmark remains deferred.

## Next deterministic action
Review the PR at exact head and require a green `static-integrity` run before merge.
