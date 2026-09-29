# LAST CHECKPOINT — Point 2 Full Rendered Certification

Date: 2026-09-30

## Certified main

- Repository: Vertex-Systems-Network/vsn-website
- Certified main SHA: `6ad5b3d8d253a85229a4d3a17f7aa10806439ee1`
- Substantive restore PR: #137
- Substantive restore SHA: `45df966794cffd4b2695d14e638c8c78f8a2ca75`
- Reconciliation PR: #138
- Reconciliation merge SHA: `6ad5b3d8d253a85229a4d3a17f7aa10806439ee1`
- Static Integrity on main: run #682 — passed
- Production Release Bundle on main: run #20 — passed
- HTML pages: 32

## Point 2 certification method

A temporary certification PR #139 was created from certified main.

The only diff was an inert file under `assets/` so both rendered browser workflows would run without changing website HTML/CSS/JS runtime behavior.

The temporary PR was closed without merge after certification.

## Certification evidence

- Static Integrity run #683 — passed
- Visual Browser QA run #138 — passed
  - failures: 0
  - primary/detail/utility screenshots uploaded
- Secondary Visual Browser QA run #104 — passed
  - failures: 0
  - secondary-page desktop/mobile screenshots and report uploaded

The primary log recorded a blocked request for a live external Ritovex placeholder SVG. It was not a VSN runtime request and was not classified as a certification failure.

## Certified runtime expectations

The restored VSN baseline keeps:

- real VSN business content and information architecture
- Home three-slide hero and parallax
- long-form service content
- 12 service-detail pages
- service enquiry forms before FAQs
- Contact project brief and Google Map
- distinct Blog and Projects roles
- VSN Metafields and factual public proof
- responsive/mobile navigation behavior
- reduced-motion support
- single-owner motion behavior intended to prevent duplicate scroll-animation jerk

## Design rule remains locked

Mockups are visual references only.

They may guide spacing, composition, typography, images, cards and visual rhythm. They may not replace VSN data, force mockup section counts, remove functional content, or introduce fabricated proof.

## Point 2 status

CLOSED — certification passed.

## Next allowed action

Point 3 only: data-first Home visual polish.

Do not start Point 4 until Point 3 is completed and merged/certified.
