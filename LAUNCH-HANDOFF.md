# VSN Website — Launch Handoff

Status date: 2026-09-25  
Repository: `Vertex-Systems-Network/vsn-website`  
Finalization base main: `273b4de4cfb3fdb44f883282eff834fe8bd1a835`

## Release state

The repository is **code-complete** for the current corporate website scope.

Production launch is **not yet authorized**. The remaining work is external to normal repository development and must not be bypassed by weakening security, inventing assets, or switching the production domain early.

## Verified code-complete baseline

- Plain HTML5 + shared CSS + vanilla JavaScript.
- 22 HTML pages.
- No Node.js runtime.
- No framework dependency.
- No `package.json`.
- No `vercel.json`.
- `static-integrity` CI is active and proven green on pull requests and `main`.
- GitHub Actions dependencies are immutable-SHA pinned.
- Checkout credentials are not persisted.
- Inline style attributes: 0.
- Inline `<style>` blocks: 0.
- Unexpected inline executable scripts are rejected by CI.
- Organization JSON-LD is SHA-256 allowlisted and machine-verified.
- All 22 HTML pages carry the reviewed source-level meta CSP and strict referrer policy.
- Legal-policy content is internally reconciled, but qualified counsel review is still required.
- No fake client proof, certifications, compliance claims, or provisional Authority Profile prices are used.

## Launch gates — all must be completed before production/domain switch

### Gate 1 — Exact official logo localization — Issue #5 — COMPLETED IN RELEASE CANDIDATE

Owner source:

`https://vertexsystemsnetwork.com/wp-content/uploads/2026/02/vertex-logo.png`

Release-candidate completion evidence:
- exact binary stored at `assets/vertex-logo.png`
- SHA-256: `ede0edd921742c57af19b513c1aab73e079fe1217f4bc7ad156ab3260109c671`
- dimensions: `2041×517`
- size: `60,222 bytes`
- all header/footer/favicon references use the local asset
- runtime CSP image policy is `img-src 'self'`
- `static-integrity` verifies hash, signature, dimensions and references

Issue #5 closes only after this candidate is green on `main`.

### Gate 2 — Vercel preview + live QA — Issue #8

Vercel project now exists:

- Team: `VSN / vsnteam`
- Project: `vsn-website`
- Project ID: `prj_xfZGl8mInhJAo7solaapm6lcsaTS`
- Framework: none / static
- True preview URL: `https://vsn-website-fgb7kni3h-vsnteam.vercel.app`
- Preview protection: Vercel Authentication
- Custom production domain: untouched

Do not add a framework or package runtime as a deployment workaround.

Remaining preview work:

1. Verify primary routes and 404 behavior.
2. Verify mobile navigation and keyboard interaction.
3. Verify contact-to-WhatsApp handoff.
4. Verify official logo + fallback behavior.
5. Apply/inspect production response headers using `SECURITY-HEADERS.md`.
6. Run the deferred tasks in `.ai/RUNNER-BENCHMARK.md` together.
7. Fix any preview-only findings before considering production.
8. Close Issue #8 only after the preview exit criteria pass.

### Gate 3 — Protect `main` — Issue #14

Repository-side policy/scripts are complete.

With an authenticated GitHub administration-capable CLI/session, run:

```powershell
pwsh scripts/apply_main_protection.ps1 -Repository Vertex-Systems-Network/vsn-website -Branch main
pwsh scripts/verify_main_protection.ps1 -Repository Vertex-Systems-Network/vsn-website -Branch main
```

Required target:

- Pull requests required.
- Required human approvals: 0.
- Administrators enforced.
- Force pushes blocked.
- Branch deletion blocked.
- Conversation resolution required.
- Linear history required.
- Required check: `static-integrity`.
- Required status checks: strict/up-to-date mode.

Close Issue #14 only after GitHub itself reports the protection active and verification passes.

### Gate 4 — Qualified legal/corporate review

Use `LEGAL-REVIEW.md` as the counsel handoff.

Qualified Pakistan legal/corporate counsel must review the public policies and commercial wording before production launch. Any material analytics, advertising, authentication, direct checkout, upload, SaaS-product, refund-model, or data-processing change reopens legal review.

## Production authorization rule

The production domain must **not** be switched to this static release until:

- Issue #8 preview/live QA is complete,
- Issue #14 protection is verified,
- final qualified legal/corporate review is complete,
- final `static-integrity` is green.

Once those gates are satisfied, production activation can proceed without changing the site's static architecture.

## Resume index

If work resumes later, read in this order:

1. `.ai/state/CURRENT-STATE.yaml`
2. `LAST-CHECKPOINT.md`
3. `LAUNCH-HANDOFF.md`
4. Open Issues #8 and #14
5. `.ai/RUNNER-BENCHMARK.md` after a real preview URL exists

Repository evidence outranks chat history.
