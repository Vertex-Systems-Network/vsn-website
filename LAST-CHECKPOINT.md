# Last Checkpoint

Date: 2026-09-25

## Verified starting main
- Repo: Vertex-Systems-Network/vsn-website
- Main SHA: `2119221e0e030a0677d41ecd76e8491f9a31684f`
- PR #18: merged
- Resulting `static-integrity` main run #6: green
- Open Issues before activation: #5, #8 and #14
- Open PRs before activation: 0
- Main branch protection: still disabled

## Active milestone
- Issue #19 — Harden CI action supply chain
- Branch: `security/ci-supply-chain-hardening`

## Changes in this milestone
- Pin `actions/checkout` to immutable commit `fbc6f3992d24b796d5a048ff273f7fcc4a7b6c09` (v5).
- Disable checkout credential persistence.
- Extend the static validator to reject mutable third-party action refs.
- Add Dependabot GitHub Actions update coverage.
- Preserve read-only workflow permissions and no project runtime/package dependencies.

## Guardrails
- No website runtime behavior changes.
- No Node.js/package.json/framework/Vercel runtime added.
- Runner Benchmark remains deferred.

## Next deterministic action
Review PR at exact head and require a green `static-integrity` run before merge.
