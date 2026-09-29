# LAST CHECKPOINT — Post-Restore Reconciliation

Date: 2026-09-30

## Canonical substantive baseline

- Repository: Vertex-Systems-Network/vsn-website
- Restore PR: #137
- Restored main SHA: `45df966794cffd4b2695d14e638c8c78f8a2ca75`
- Data-first source baseline: `dfb37f291b081c5e67479f4aaa53ece7dc9c0608`
- Static Integrity on restored main: run #680 — passed
- Production Release Bundle on restored main: run #19 — passed
- HTML pages: 32

## What was corrected

The post-PR-123 literal mockup-parity rebuild was rolled back.

The current site keeps VSN's real content and business structure, including:

- Home three-slide hero and parallax
- 12 service-detail pages
- long-form service content
- enquiry forms before FAQs
- Contact project brief and Google Map
- distinct Blog and Projects structures
- VSN Metafields and factual public proof
- Batch 1-3 useful visual upgrades

The `*-mockup-parity.css` layers are not part of the canonical baseline.

## Design rule

Mockups are visual references only.

They may guide composition, spacing, typography, cards, image treatment and visual rhythm. They may not replace VSN data, reduce real service content to fit a reference, force reference section counts, or introduce fabricated proof.

## Reconciliation changes

- `.ai/state/CURRENT-STATE.yaml` rewritten around the restored baseline.
- `README.md` rewritten to remove contradictory historical status sections.
- Authority Profile canonical tiers recorded as:
  - Essential — $499
  - Authority — $999
  - Signature — $1,999
- Profile SEO/social metadata aligned with the $499 starting package.
- Separate Media Kit add-on from $249 remains valid and is not the package starting price.
- Middlehost deployment and security hardening remain preserved.
- Google Maps privacy disclosure remains preserved.

## Production state

Production deployment is not recorded as completed.

The guarded Middlehost/cPanel workflow remains available but must not be triggered as part of this reconciliation checkpoint.

## Next allowed action

Point 2 only: run full rendered certification of the restored baseline using primary and secondary Visual Browser QA.

Do not start Point 3 or another visual redesign until Point 2 is completed and evidence is recorded.
