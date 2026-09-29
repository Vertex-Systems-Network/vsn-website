# LAST CHECKPOINT — Point 3 Data-First Home Visual Polish

Date: 2026-09-30

## Canonical runtime

- Repository: Vertex-Systems-Network/vsn-website
- Point 3 PR: #142
- Certified PR head: `a0b1d5c08eb30177c7f75c156fcb4d1126df1412`
- Merged main runtime SHA: `454931c33028150df346aba96f80c8e8b5ee0f51`
- Static Integrity on PR head: run #696 — passed
- Static Integrity on merged main: run #697 — passed
- Production Release Bundle on merged main: run #22 — passed
- Visual Browser QA: run #149 — passed, failures: 0
- Secondary Visual Browser QA: run #115 — passed, failures: 0

## Point 3 objective

Improve Home visually without replacing VSN's content or information architecture with the earlier literal mockup structure.

The useful mockup idea retained in this point is **dashboard-style information layering**.

The dashboard is populated with VSN-owned data:

- Build — Software & products
- Automate — AI & workflows
- Grow — Web, commerce & growth
- Operate — BPO, teams & business support
- Public proof — VSN Metafields

## Runtime changes

- added `assets/home-point3-data-first.css`
- retained the restored three-slide hero and parallax
- replaced the hero's narrow single-product overlay with a VSN capability dashboard
- refined the credentials rail
- strengthened active service-lane presentation
- preserved factual proof cards and existing Home sections
- preserved reduced-motion support
- added a guard so inactive slide captions do not ghost during image crossfades
- corrected the compact dashboard heading on mobile

No Home section was removed to force a mockup section count.

## Direct rendered review

Desktop screenshot review passed.

Mobile screenshot review passed after one corrective iteration. The final mobile render shows:

- readable VSN delivery dashboard
- no stacked/broken dashboard kicker
- no overlapping inactive slide captions
- hero controls clear of the slide copy
- no horizontal overflow
- no missing images

## Locked design rule

Mockups remain visual references only.

VSN data, service structure, public proof and functional content remain authoritative.

## Point 3 status

CLOSED — merged and certified.

## Next allowed action

Point 4 only: Services landing + 12 service-detail pages data-first visual polish.

Do not start Point 5 until Point 4 is completed, merged and certified.
