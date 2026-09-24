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
- Required status check: **`static-integrity`**.
- Required status checks use strict mode so the protected branch must be up to date before merge.
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

Do not add fake or unstable required status checks just to make branch protection look stronger. `static-integrity` is now proven green on both PR and `main`, so the apply/verify scripts require it in strict mode. Runner-heavy launch benchmarks remain end-stage work under `.ai/RUNNER-BENCHMARK.md`.

## Change-control rule

Security/governance changes should use a dedicated issue and pull request. Protection must not be weakened silently to unblock a merge.