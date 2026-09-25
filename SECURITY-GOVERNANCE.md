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

## Current verified state — 2026-09-25

- `main` protection: **disabled**
- required status-check enforcement: **off**
- configured required contexts: **none**
- repository rulesets: **none**
- latest verified `main`: `cbe9337aa76825ddfdd1fa7cbbb6dc4286067474`
- current ChatGPT GitHub integration does not expose branch-protection administration writes

Issue #14 remains open until GitHub reports the target policy active.

## Apply locally

Requires GitHub CLI authenticated with repository administration permission:

```powershell
pwsh scripts/apply_main_protection.ps1 -Repository Vertex-Systems-Network/vsn-website -Branch main
```

Then verify:

```powershell
pwsh scripts/verify_main_protection.ps1 -Repository Vertex-Systems-Network/vsn-website -Branch main
```

## Apply through GitHub Actions

The repository includes a manual workflow:

`.github/workflows/main-protection-admin.yml`

It reuses the same audited apply/verify scripts and does not modify website runtime files.

Before running it, create a fine-grained GitHub personal access token that is:

- owned by an administrator/owner allowed to administer this repository
- scoped only to `Vertex-Systems-Network/vsn-website`
- granted repository permission **Administration: Read and write**
- not granted unrelated permissions

Store the token as the repository Actions secret:

`VSN_GOVERNANCE_ADMIN_TOKEN`

Do not commit the token, place it in workflow YAML, or paste it into issues, pull requests, logs, or chat.

After the workflow is merged to `main`:

1. Open **Actions → Main Protection Admin**.
2. Choose **Run workflow** on `main`.
3. Enter `APPLY` in the confirmation field.
4. Run the workflow.
5. The workflow applies the policy and immediately executes `verify_main_protection.ps1`.
6. Close Issue #14 only after the workflow is green and GitHub reports `main` as protected with `static-integrity` required in strict mode.

## Verify

The verification target remains:

```powershell
pwsh scripts/verify_main_protection.ps1 -Repository Vertex-Systems-Network/vsn-website -Branch main
```

Expected checks:

- pull request required
- `static-integrity` required
- status checks strict
- required approvals = 0
- administrators enforced
- linear history required
- force pushes blocked
- branch deletion blocked
- conversations resolved

## CI rule

Do not add fake or unstable required status checks just to make branch protection look stronger. `static-integrity` is proven green on both PR and `main`, so the apply/verify scripts require it in strict mode. Runner-heavy hosted checks are not part of the direct-file runtime.

## Change-control rule

Security/governance changes should use a dedicated issue and pull request. Protection must not be weakened silently to unblock a merge.
