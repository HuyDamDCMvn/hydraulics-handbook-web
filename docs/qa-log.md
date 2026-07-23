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

## Perfect gate

- Two consecutive Browser/HTTP passes with zero new findings: **PASS** (loop2 after hero fix)
- Production aliased: https://hydraulics-handbook-web.vercel.app
