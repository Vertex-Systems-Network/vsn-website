# Last Checkpoint

Date: 2026-09-25

## Completed runtime milestone

Issue #33 — direct-file browser portability — is complete.

- PR #34 exact head: `4a53e98531b6613a94ff6c2c908bfb23d4d7c814`
- PR Static Integrity: run #24 — success
- Resulting runtime main: `c77af261bdee0e4d834d6fa78989724a79e4d879`
- Resulting-main Static Integrity: run #25 — success
- Issue #33: closed as completed

## Current governance milestone

Issue #14 — protect `main`.

Fresh verification on 2026-09-25:
- latest `main`: `cbe9337aa76825ddfdd1fa7cbbb6dc4286067474`
- `main protected`: false
- protection enabled: false
- required status-check enforcement: off
- required contexts: none
- repository rulesets: none
- direct ChatGPT GitHub integration administration write: unavailable
- direct branch-protection admin endpoint through the integration: inaccessible

Repository-side target policy and verification scripts remain complete.

## New activation path

Branch:
`feat/main-protection-admin-workflow`

Added:
`.github/workflows/main-protection-admin.yml`

The workflow is manual-only and reuses:
- `scripts/apply_main_protection.ps1`
- `scripts/verify_main_protection.ps1`

It requires repository secret:
`VSN_GOVERNANCE_ADMIN_TOKEN`

The token must be narrowly scoped to this repository with GitHub repository **Administration: Read and write** permission. Never commit or paste the token into repository content.

After this governance PR is merged:

1. Add `VSN_GOVERNANCE_ADMIN_TOKEN` in repository Actions secrets.
2. Run **Main Protection Admin** on `main`.
3. Enter `APPLY`.
4. Require the workflow apply step and verification step to pass.
5. Re-read GitHub branch metadata and protection state.
6. Close Issue #14 only after GitHub reports the target protection active.

## Target protection invariant

- pull request required
- required approvals: 0
- `static-integrity` required
- status checks strict
- administrators enforced
- linear history required
- force pushes blocked
- branch deletion blocked
- conversation resolution required

## Runtime architecture remains unchanged

- plain HTML
- shared CSS
- vanilla JavaScript
- no local HTTP server
- no Node runtime
- no framework
- no Vercel dependency
- direct `index.html` browser opening

## Next valid action

Merge the governance workflow after exact-head Static Integrity is green, then activate it with the scoped admin secret.
