# Repository Security & Governance

## Current owner decision — 2026-09-25

The VSN website repository is finalized for the approved scope.

GitHub `main` branch protection is **deferred by owner for now**. The branch is currently unprotected. This is an explicit governance deferral and must not be represented as active protection.

## Preserved future target

If branch protection is enabled later, the intended policy remains:

- changes reach `main` through pull requests
- required approving reviews: **0**
- administrators enforced
- force pushes disabled
- branch deletion disabled
- conversation resolution required
- linear history required
- required status check: **`static-integrity`**
- required status checks in strict/up-to-date mode

## Future activation assets

The repository keeps deterministic activation and verification tooling:

```powershell
pwsh scripts/apply_main_protection.ps1 -Repository Vertex-Systems-Network/vsn-website -Branch main
pwsh scripts/verify_main_protection.ps1 -Repository Vertex-Systems-Network/vsn-website -Branch main
```

A manual workflow is also preserved:

`.github/workflows/main-protection-admin.yml`

It expects the repository Actions secret:

`VSN_GOVERNANCE_ADMIN_TOKEN`

The token must remain narrowly scoped to this repository with Administration read/write permission and must never be committed to repository content.

## Current verified state

- `main protected`: false
- required status-check enforcement: off
- repository rulesets: none

## Change-control rule

Do not silently claim protection is active. If protection is enabled later, verify the actual GitHub state before updating this document or closing any future governance task.
