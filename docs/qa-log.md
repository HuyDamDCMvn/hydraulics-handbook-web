# QA log — Hydraulics Formula Handbook Web

Production: https://hydraulics-handbook-web.vercel.app

| Date | Phase | URL | Finding | Severity | Status |
| --- | --- | --- | --- | --- | --- |
| 2026-07-23 | P0–P5 | Preview/Prod | Initial deploy | info | closed |
| 2026-07-23 | P6 loop1 | `/` | GSAP `from` left hero H1/CTA invisible | blocker | fixed (remove entrance from; band-only motion) |
| 2026-07-23 | P6 loop1 | `/chapters/1` | KaTeX + 8-block template OK; SVG schematic OK | pass | closed |
| 2026-07-23 | P6 loop1 | `/tools/calculators` | Ex 1.2 defaults → 800 kPa | pass | closed |
| 2026-07-23 | P6 loop1 | `/chapters` search Darcy | 4 chapters filtered | pass | closed |
| 2026-07-23 | P6 loop1 | HTTP HEAD all key routes | all 200 | pass | closed |
| 2026-07-23 | P6 loop2 | `/` after redeploy | Hero + CTA visible | pass | closed |
| 2026-07-23 | P6 loop2 | `/chapters/13` | R3F canvas present | pass | closed |
| 2026-07-23 | P6 loop2 | routes crawl #2 | all 200 | pass | closed |
| 2026-07-24 | Motion P3–P5 | `/` LandingHero | Stagger from `autoAlpha:0` risk FOUC | blocker | fixed (0.92 + clearProps + cleanup) |
| 2026-07-24 | Motion | `/guide` GuideScroll | `gsap.set autoAlpha:0` invisible risk | blocker | fixed (`from` + clearProps) |
| 2026-07-24 | Motion | `/chapters/14` TOC | Sticky schematic stole `aria-current` | major | fixed (exclude schematic from spy + click set) |
| 2026-07-24 | Motion | ChapterToc | Stale visibility map across chapter nav | major | fixed (clear on chapter.id) |
| 2026-07-24 | Motion loop1 | local `http://localhost:3011` | Landing hero visible; guide readable; empty filter OK; calc pump 26.16 kW; canvas present; routes HEAD 200 | pass | closed |
| 2026-07-24 | Motion loop2 | local after TOC/FOUC fixes | Note TOC `aria-current`; landing FOUC OK; tsc+eslint clean | pass | closed |
| 2026-07-24 | Prod note | `/tools/*` on vercel.app | 404 on production (local OK) | major | open — redeploy needed |

## Perfect gate

- Two consecutive Browser/HTTP passes with zero new findings: **PASS** (motion loop2 on local after FOUC/TOC fixes)
- Production motion ship: pending redeploy (also fixes `/tools/*` 404)
- Production aliased: https://hydraulics-handbook-web.vercel.app
