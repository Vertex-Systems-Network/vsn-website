# Last Checkpoint

Date: 2026-09-24

## Verified starting main
- Repo: Vertex-Systems-Network/vsn-website
- Main SHA: `b884089af00ecf2db1d6d66d1cc2595655cf53c6`
- Governance PR #15: merged
- Open Issues before activation: #5, #8 and #14
- Open PRs before activation: 0
- Main branch protection: disabled

## Preflight evidence
A source-level audit on the verified main checked all 22 HTML pages and found no broken local references, duplicate IDs, pricing regressions, legal identity regressions or unexpected tracking/storage code.

## Active milestone
- Issue #16 — Add lightweight static integrity CI baseline
- Branch: `ci/static-integrity-baseline`

## Changes in this milestone
- Add a Python-standard-library static validator.
- Add a fast GitHub Actions workflow with stable job name `static-integrity`.
- Run on pull requests, pushes to main, and manual dispatch.
- No Node.js, package manager, framework, Vercel runtime or external network dependency.
- Keep Lighthouse/browser/external-link Runner Benchmark deferred.
- Do not require the status in branch protection until it has completed successfully.

## Next deterministic action
Review the CI PR at its exact head and inspect the `static-integrity` workflow result. Merge only when the workflow is green or any failure has been reconciled.
