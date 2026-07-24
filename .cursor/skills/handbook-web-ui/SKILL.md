---
name: handbook-web-ui
description: >-
  Applies Hydraulics Formula Handbook web UI stack, motion budget, chapter
  template, and anti-slop taste for academic technical reference pages. Use when
  building or editing landing, chapters, TOC, calculators, schematics, motion,
  KaTeX, Aceternity-style layout, GSAP, AutoAnimate, React Spring, Lottie, or R3F
  in this repo.
---

# Handbook Web UI

Product: **academic technical reference** (read / search / calculate). Spec: `docs/hydraulics-handbook-web-spec.md`. Full pack: `docs/agent-knowledge-web-ui.md`.

## Before UI code

1. State Design Read: editorial academic reference, KaTeX-first, trust-first.
2. Lock dials: VARIANCE **3–4**, MOTION **2–3**, DENSITY **6–7**.
3. Pick motion with the decision tree below — one engine per surface.
4. Bilingual lock: update **ENG + VIE** together (`src/i18n/ui.ts` / chapter overlays) — never ship one locale only.

## Decision tree (motion / media)

```
List/filter/TOC DOM change?     → AutoAnimate
Hover / :target / micro copy?   → CSS
Drawer / knob / drag?           → React Spring
Scroll story (landing/guide)?   → GSAP (≤1–2 pin scenes)
Designed icon/empty JSON?       → Lottie (rare, ≤3) + SVG fallback
Spatial 3D teaches better?      → R3F (lazy) else SVG 2D
```

## Layout patterns

| Surface | Do | Don't |
| --- | --- | --- |
| `/` | Brand + 1 headline + abstract + CTA | Stats, bento, glow hero |
| Chapter | Reading column + sticky TOC | Cards around equations; GSAP scrub |
| Index | Search/filter + AutoAnimate | Spotlight card walls |
| Shell | Docs sidebar (Aceternity Sidefolio / Blog+TOC as **reference only**) | Copy SaaS marketing templates |

## Chapter workflow

1. Fill content schema (`src/content/`) — not giant JSX.
2. Render 8 blocks in fixed order (see rule `chapter-content`).
3. KaTeX + `#eq-n-m`; nomenclature table; SVG schematic.
4. Examples: 5 steps × 2.
5. Check DoD in spec §8; reduced-motion OK.

## Aceternity study rule

Keep: sidebar, Blog+TOC, sticky scroll (intro), grid/dot bg, FAQ.  
Ban: SaaS bento, beams/aurora, 3D cards, typewriter text FX, testimonials.

## Phase order (do not skip ahead)

P0 shell → P1 one chapter E2E → P2 content scale + AutoAnimate → P3 landing/guide GSAP → P4 Spring drawers/calcs → P5 selective R3F.

## Progressive docs

- Decision matrix & anti-patterns: [reference.md](reference.md)
- Engineering QA loop: `docs/engineering-loop.md`
