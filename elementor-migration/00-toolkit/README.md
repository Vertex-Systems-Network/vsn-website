# VSN Elementor Migration — 00 Toolkit

Status: **Point 1 started / canonical toolkit locked**

Target:
- Elementor Core 4.3.3
- Elementor Pro 4.3.0 compatibility baseline
- WordPress 6.8+
- Atomic Editor enabled

## Source of truth

The values in this folder were audited from the current VSN static website CSS, especially:
- `assets/styles.css`
- `assets/ritovex-fidelity.css`
- `assets/ritovex-home.css`
- `assets/ritovex-service-detail.css`
- `assets/vsn-global-polish.css`

## Files

- `toolkit-spec.json` — canonical VSN design-system and Site Settings mapping.
- `global-variables.source.json` — Elementor 4.x variable source data using Elementor's current variable storage shape. This is a source artifact for the final native import package; it is not presented as a standalone ready-to-upload Website Template ZIP.

## Brand tokens

Colors:
- VSN Black #000000
- VSN White #FFFFFF
- VSN Charcoal #3F4245
- VSN Muted #7E8083
- VSN Blue #6188C6
- VSN Violet #625BA8
- VSN Cyan #5AC8D6

Fonts:
- Sans: Inter
- Editorial fallback: Georgia

Container:
- Max width: 1240px
- Narrow content: 820px
- Reading content: 920px

Primary section spacing:
- Desktop 112px
- Tablet 80px
- Mobile 64px

## Elementor mapping

Legacy / Pro global settings:
- Primary → VSN Cyan
- Secondary → VSN Violet
- Text → VSN Black
- Accent → VSN Blue

Atomic system:
- Variables for brand colors, fonts, spacing, and radius.
- Global classes for container, sections, grid, typography, buttons, cards, forms, and motion hooks.

## Next work inside Point 1

1. Define the actual Global Classes payloads.
2. Define HTML default styles / Theme Style.
3. Define responsive defaults and breakpoints.
4. Define button and form states: normal, hover, focus, active.
5. Assemble a native Elementor-compatible Toolkit package only after schema validation.

No production HTML/CSS has been changed on this branch.
