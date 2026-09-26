# Ritovex Reference Implementation Plan

Source references: owner-supplied full-page screen recordings plus the public Ritovex demo. VSN keeps its own content, claims, sections and generated assets. The reference controls layout rhythm, component treatment and motion grammar.

## Non-negotiables
- Do not remove a VSN section just because the reference does not have it.
- Keep VSN facts, forms, calculators, public-proof boundaries and service meaning.
- Rewrite only when copy is too dense for the layout. Use simple English, short sentences and a calm lyrical rhythm.
- Never invent client logos, testimonials, awards, certifications or results.
- Human imagery replaces interface-mockup-first imagery. Target scenes: people collaborating with AI, people using digital systems, founders reviewing data, teams making decisions around technology.
- Motion is one-shot on entry. No replay on scroll-up, no flash-then-slide, no pointermove animation loops.

## Motion map
- Hero: staggered text reveal + image reveal.
- Partner/capability marquees: constant linear travel.
- About: image and copy enter as one paired composition.
- Services: dark accordion; active title changes accent; supporting copy opens smoothly; preview swaps with a short fade/scale.
- Work: wide horizontal editorial cards with image-led hover scale.
- Process: sticky intro on the left, stacked step cards on the right.
- Proof/testimonial equivalents: horizontal cards or clean rows; only verified VSN evidence.
- CTA: dark panel with subtle line motion, not a heavy parallax effect.
- FAQ/details: open-state polish only; no repeated entrance animations.

## Human image shot list
1. Home hero — founder/technical lead working with an AI-enabled workspace; warm editorial office light.
2. About — small diverse team collaborating around a laptop and wall display.
3. Software — engineer and product lead reviewing a live digital product.
4. AI — professional using an AI assistant with human approval/decision context.
5. Growth — marketer reviewing campaign/content performance with a teammate.
6. Operations — support/operations team working with dashboards and customer workflows.
7. Business/tax — business owner and adviser reviewing documents and a digital system.
8. Resource augmentation — distributed engineering team in a planning session.
9. Industries — people in real sector contexts interacting with technology, not isolated device renders.
10. Work/articles — editorial portraits and people-at-work photography.

## Delivery order
1. Homepage motion/content rebaseline.
2. Shared pre-paint motion infrastructure across every HTML page.
3. Human-image generation and swap into the reserved visual slots.
4. Core service/company page copy simplification where text density breaks the reference rhythm.
5. Responsive polish at desktop/tablet/mobile widths.
6. Final static integrity + motion regression + visual review.


## Human image implementation contract

See `HUMAN-IMAGE-ASSET-MAP.md` for the exact filenames, scenes, crop rules and swap order. Mockup-first SVG visuals are temporary fallbacks only.
