# Repository Security & Governance

This repository uses an AI-led pull-request workflow. The governance target is to prevent unsafe direct changes to `main` without introducing a mandatory human-review bottleneck.

## Target `main` protection

- Changes must reach `main` through a pull request.
- Required approving reviews: **0**.
- Protection applies to administrators.
- Force pushes are disabled.
- Branch deletion is disabled.
- Conversation resolution is required.
- Linear history is required.
- Required status checks are not invented while no stable CI checks are configured.
- Squash merge is the preferred merge method for AI milestones.

This protects the branch while preserving exact-head review → expected-head merge.

## Apply

Requires GitHub CLI authenticated with repository administration permission:

```powershell
pwsh scripts/apply_main_protection.ps1 -Repository Vertex-Systems-Network/vsn-website -Branch main
```

## Verify

```powershell
pwsh scripts/verify_main_protection.ps1 -Repository Vertex-Systems-Network/vsn-website -Branch main
```

Issue #14 must remain open until verification confirms the target policy is actually active on GitHub.

## CI rule

Do not add fake or unstable required status checks just to make branch protection look stronger. When a stable lightweight CI workflow exists, add only deterministic checks to the required-status set. Runner-heavy launch benchmarks remain end-stage work under `.ai/RUNNER-BENCHMARK.md`.

## Change-control rule

Security/governance changes should use a dedicated issue and pull request. Protection must not be weakened silently to unblock a merge.