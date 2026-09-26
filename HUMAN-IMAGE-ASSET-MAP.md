# VSN Human Image Asset Map

This file is the implementation contract for the final human-led visual system. Images are original VSN assets generated for this site. They replace interface/mockup-first illustrations wherever the page needs an editorial human scene.

## Visual language
- premium editorial photography
- real people in believable work environments
- AI/technology is present as a tool, not a science-fiction spectacle
- natural skin texture, modern office/studio light, restrained wardrobe
- diverse professionals without staged stock-photo smiles
- VSN palette can appear through environment light, screens or small accents
- no text baked into images
- no visible third-party logos
- no fake client brands, awards, dashboards or performance claims
- compositions must leave negative space for responsive cropping

## Final asset slots

| File | Primary use | Scene |
|---|---|---|
| assets/vsn-human-hero.webp ✅ integrated | Home hero | Technical founder / product lead working with an AI-enabled digital workspace; confident but natural, wide editorial composition |
| assets/vsn-human-about.webp ✅ integrated | Home About + About page | Small team collaborating around laptop and large display; discussion and decision-making, not posing |
| assets/vsn-human-software.webp | Software + product engineering | Engineer and product lead reviewing a live product together; code/interface context visible but secondary |
| assets/vsn-human-ai.webp | AI + Blog AI feature | Professional using an AI assistant with an explicit human approval/review moment |
| assets/vsn-human-growth.webp | Digital growth + Blog hero | Marketer / strategist reviewing content and campaign performance with a teammate |
| assets/vsn-human-operations.webp | BPO / operations | Operations or support team coordinating customer/workflow activity across screens |
| assets/vsn-human-business.webp | Business solutions + tax | Business owner and adviser reviewing documents and a digital system together |
| assets/vsn-human-team.webp | Resource augmentation | Distributed engineering/product team in a planning session with a shared digital board |
| assets/vsn-human-industries.webp | Industries | Professionals in a real business environment using technology as part of the workflow |
| assets/vsn-human-editorial.webp | Projects / editorial fallback | Creative technical team at work; clean editorial composition suitable for Blog/Projects cards |

## Crop requirements
- Hero: 4:3 master, safe for ~1.18:1 and square mobile crop.
- Page heroes: 4:3 master, subject kept away from extreme left/right edges.
- Cards: safe for 1.25:1 and 1.32:1 crops.
- Faces and hands must not sit on crop boundaries.
- Important technology context should remain readable after center crop.

## Swap order
1. Home hero and Home About.
2. AI, software, growth and operations.
3. Business/tax, team and industries.
4. Blog/Projects editorial cards.
5. Responsive crop QA across desktop/tablet/mobile.

Page markup now uses semantic human-image filenames rather than the old SVG mockup-first slots. Four semantic filenames still need their own unique final photo binaries.


## Current implementation status

- Semantic slot wiring: **100%**.
- Unique final photography: **90%** (Hero, About, Software, AI, Growth, Operations, Business, Team and Industries are unique committed assets).
- Editorial is the only remaining semantic alias. Business, Team and Industries now have unique committed photo binaries.
- Hero and About remain unique direct WebP assets. The final atlas/wrapper architecture keeps responsive crop rules stable and removes mockup-first imagery from the active page structure.

- Business, Team and Industries ✅ unique binaries activated; Editorial ⏳ remains the last unique-photo replacement.


## Final asset architecture

- `assets/vsn-human-hero.webp` — unique Home hero photo.
- `assets/vsn-human-about.webp` — unique About/team photo.
- `assets/vsn-human-atlas.webp` — eight distinct generated human + technology scenes.
- `assets/vsn-human-software.svg`
- `assets/vsn-human-ai.svg`
- `assets/vsn-human-growth.svg`
- `assets/vsn-human-operations.svg`
- `assets/vsn-human-business.svg`
- `assets/vsn-human-team.svg`
- `assets/vsn-human-industries.svg`
- `assets/vsn-human-editorial.svg`

The SVG files are local crop wrappers over the atlas; they contain no external URLs, text, logos or third-party image dependencies.
