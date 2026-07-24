# AGENTS.md — Hydraulics Formula Handbook (Web)

Academic technical reference site (read / search / calculate). Not a marketing SaaS landing.

## Must-read

1. `docs/hydraulics-handbook-web-spec.md` — product, IA, stack roles, DoD  
2. `docs/agent-knowledge-web-ui.md` — packed agent knowledge (UI / motion / flows)  
3. `docs/web-ui-learning-notes.md` — upstream learning links  

## Cursor artifacts

- Rules: `.cursor/rules/handbook-product.mdc`, `bilingual-ui.mdc`, `motion-budget.mdc`, `chapter-content.mdc`  
- Skill: `.cursor/skills/handbook-web-ui/`  

## Quick defaults

- Dials: VARIANCE 3–4 · MOTION 2–3 · DENSITY 6–7  
- Motion: CSS → AutoAnimate → Spring → GSAP → Lottie → R3F  
- Schematics: SVG first; R3F only when 3D teaches better  
- Equations: KaTeX only  
- UX/UI: always ship **ENG + VIE** in the same change (`src/i18n/ui.ts`)  
