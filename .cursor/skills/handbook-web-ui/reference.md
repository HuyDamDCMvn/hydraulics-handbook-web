# Handbook Web UI — reference

## Stack roles

| Tech | Role | Where | Never |
| --- | --- | --- | --- |
| React (+ Next) | UI, routing, content modules | Whole app | — |
| taste-skill | Anti-slop; override dials | All screens | Marketing dials 8/6/4; treat tables/calcs as handbook patterns |
| Aceternity | Docs shell reference | Sidebar, TOC | Paste marketing/SaaS templates |
| AutoAnimate | DOM add/remove/move | Indexes, TOC | Scroll storytelling |
| CSS | Micro feedback | Equations, hover | — |
| React Spring | User-driven spring | Mobile drawer, knobs | Decorative fades |
| GSAP | Pin/scrub timeline | Landing + `/guide` only | Chapter body |
| Lottie | AE JSON icons | Empty/loading ≤3 | Schematics, formulas |
| R3F | Spatial schematic | ~3–5 chapters (bend, jump, weir, pump) | Every chapter; 2D charts |

## taste-skill (v2) — what to keep

- Brief inference + one-line Design Read
- Color / shape / theme locks
- Anti-AI-tells: purple glow, 3 equal feature cards, em-dash flourishes, fake dashboards, Inter default
- Motivated motion only; `prefers-reduced-motion`
- Out of scope of upstream skill: dense data tables / multi-step forms — use handbook table & form a11y patterns instead

Install (optional upstream):  
`npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`

## GSAP checklist (landing/guide)

- `useGSAP` + scope; `"use client"`
- One ScrollTrigger per timeline; pin children not pin-target
- Animate `x/y/scale/rotation/autoAlpha` only
- `gsap.matchMedia()` + reduce motion → duration 0 / no pin
- `ScrollTrigger.refresh()` after KaTeX/SVG/font load

## R3F checklist

- SVG caption/fallback always
- `dynamic(..., { ssr: false })`; lazy; pause when off-screen
- `frameloop="demand"` when mostly static; mutate refs in `useFrame` (no setState loop)
- Candidates: pipe bend, hydraulic jump, weir/channel, pump cutaway

## Flows

### motion-pick

Ask in order: list DOM? → gesture? → scroll story? → 3D pedagogy? Else CSS.

### chapter-build

Schema → KaTeX → SVG → 2 examples → DoD §8 → mobile TOC/table.

### content-pipeline

DOCX parse → re-enter KaTeX (OMML lost) → SVG schematics → validate schema → commit content modules.

### engineering-loop

Build → local verify → Vercel preview → Browser QA → fix (`docs/engineering-loop.md`).

## External docs

- https://www.tasteskill.dev/docs
- https://ui.aceternity.com/templates · https://ui.aceternity.com/components
- https://auto-animate.formkit.com
- https://www.react-spring.dev
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://r3f.docs.pmnd.rs/getting-started/introduction
- https://lottiereact.com (prefer over dead airbnb.design/lottie)
