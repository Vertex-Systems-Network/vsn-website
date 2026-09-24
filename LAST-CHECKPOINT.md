# Last Checkpoint

Date: 2026-09-24

## Verified starting main
- Repo: Vertex-Systems-Network/vsn-website
- Main SHA: `33f2e558159b759e573c0372207d4caa4d703c8f`
- Legal-hardening PR #13: merged
- Open Issues before activation: #5 and #8
- Open PRs before activation: 0
- Main branch protection: disabled

## Active milestone
- Issue #14 — Protect main branch and codify repository governance
- Branch: `security/main-branch-governance`

## Constraint
The connected GitHub account reports repository admin permission, but the current GitHub connector does not expose administration writes for branch protection/rulesets.

## Changes in this milestone
- Added `SECURITY-GOVERNANCE.md` with the target AI-led protection policy.
- Added deterministic PowerShell apply/verify scripts using GitHub CLI/API.
- Added a PR checklist that preserves exact-head review and security scope checks.
- Target requires PRs but zero human approvals.
- Target blocks force pushes/deletion, enforces administrators, linear history and conversation resolution.
- No fake required CI checks are introduced while stable CI is absent.

## Remaining launch blockers
- Issue #5 — exact official logo localization.
- Issue #8 — real preview deployment and live QA.
- Issue #14 — actual branch-protection application/verification.
- Final Pakistan-qualified legal/corporate review.

## Next deterministic action
Review the governance PR at its exact head SHA. If clean, merge it. Keep Issue #14 open until the verification script confirms the target protection on GitHub.
