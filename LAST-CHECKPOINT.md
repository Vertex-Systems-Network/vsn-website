# Last Checkpoint

Date: 2026-09-25

## Verified starting main
- Repo: Vertex-Systems-Network/vsn-website
- Main SHA: `615b0e5442f24b10e7963cf101ef7b423610f086`
- PR #23: merged
- PR #23 `static-integrity` run #10: green
- Resulting main run #11: green
- Issue #22: closed
- Open Issues: #5, #8 and #14
- Main branch protection: disabled

## Dependency maintenance
Dependabot PR #21 proposes `actions/checkout` v7.0.1, pinned to official commit `3d3c42e5aac5ba805825da76410c181273ba90b1`.
PR #21 is based on the pre-PR-23 main and is therefore stale/non-mergeable.

## Active milestone
- Branch: `security/checkout-v7-upgrade`
- Apply the same pinned checkout v7.0.1 update on latest main.
- Preserve `persist-credentials: false`.
- Preserve read-only workflow permissions.
- Require green `static-integrity` before merge.
- Close Dependabot PR #21 as superseded after the equivalent latest-main PR merges.

## Guardrails
- No website runtime changes.
- No package.json/framework/Vercel runtime added.
- Runner Benchmark remains deferred.

## Next deterministic action
Open focused latest-main upgrade PR, verify exact diff + green `static-integrity`, then expected-head squash merge and verify resulting main.
