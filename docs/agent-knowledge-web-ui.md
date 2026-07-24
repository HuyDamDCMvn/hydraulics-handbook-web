# Agent knowledge — Web / UI / Animation (Hydraulics Handbook)

Kiến thức đóng gói cho agent làm việc trên repo này. Nguồn gốc: `web-ui-learning-notes.md` + nghiên cứu taste-skill / Aceternity / GSAP / R3F / AutoAnimate / Lottie / React Spring + `hydraulics-handbook-web-spec.md`.

**Cách agent dùng**

| Artifact | Path | Khi nào |
| --- | --- | --- |
| Rule (always) | `.cursor/rules/handbook-product.mdc` | Mọi session |
| Rule (motion) | `.cursor/rules/motion-budget.mdc` | `src/components`, `src/app` |
| Rule (chapter) | `.cursor/rules/chapter-content.mdc` | chapter / content / media |
| Skill | `.cursor/skills/handbook-web-ui/SKILL.md` | UI, motion, chapter, schematic |
| Skill detail | `.cursor/skills/handbook-web-ui/reference.md` | Ma trận & checklist sâu |

---

## 1. Product identity

- **Là:** academic technical reference — đọc · tra · tính (SI), disclaimer học thuật.
- **Không phải:** SaaS dashboard, card-grid marketing, dark-glow AI landing.
- **Design Read:** editorial-minimalist technical reference; KaTeX + dense tables + sticky TOC.
- **Dials:** VARIANCE 3–4 · MOTION 2–3 · DENSITY 6–7.

---

## 2. Stack map (một vai trò / một chỗ)

```
CSS              → micro (hover, :target equation)
AutoAnimate      → list/filter/TOC DOM
React Spring     → drawer / knobs / gesture
GSAP             → landing + /guide (≤1–2 pin)
Lottie           → icon/empty hiếm (≤3 JSON)
R3F              → 3–5 schematic không gian (P5)
SVG 2D           → mặc định mọi schematic
KaTeX            → mọi phương trình
Aceternity       → tham khảo shell docs (không copy SaaS)
taste-skill      → anti-slop + locks (override dials)
```

**Một surface = một engine.** `prefers-reduced-motion` bắt buộc.

---

## 3. Flows agent

### A. motion-pick

1. List/filter/TOC đổi DOM? → AutoAnimate  
2. Kéo panel / knob? → React Spring  
3. Kể chuyện scroll (chỉ intro)? → GSAP  
4. Cần không gian 3D để dạy? → R3F (+ SVG fallback)  
5. Còn lại → CSS  

### B. chapter-build

Schema content → 8 khối cố định → KaTeX + anchors → nomenclature → SVG → 2 examples (5 bước) → DoD spec §8.

### C. content-pipeline

DOCX → MD/JSON → **nhập lại KaTeX** → SVG `public/schematics/` → validate schema → UI chỉ render.

### D. engineering-loop

Build → local → Preview → Browser QA → fix (`engineering-loop.md`).

---

## 4. Aceternity — Keep / Ban

**Keep:** Sidebar, Blog Content + TOC, Sticky Scroll / Tracing Beam (intro), Grid/Dot bg, FAQ, Code Block.  
**Ban:** Simplistic SaaS / bento marketing, beams/aurora/vortex, 3D cards, typewriter text, testimonials, logo clouds.

Study: tách layout → interaction → decoration; chỉ mang lớp 1–2.

---

## 5. Anti-patterns (AI tells)

- Purple mesh glow, Inter mặc định, 3 feature cards, glass mọi nơi  
- Em-dash trang trí, eyebrow đánh số, scroll cue trên hero  
- Card bọc công thức; GSAP trong chapter body  
- R3F mọi chương; Lottie loop trên first viewport  
- Chồng AutoAnimate + Spring + Lottie cùng vùng  

---

## 6. Phase lock

| Phase | Việc | Motion chính |
| --- | --- | --- |
| P0 | Shell + tokens + TOC | — |
| P1 | 1 chapter E2E KaTeX + SVG | — |
| P2 | Scale content + search | AutoAnimate |
| P3 | Landing + Guide | GSAP hẹp |
| P4 | Calculators + mobile drawer | React Spring |
| P5 | 3–5 R3F schematics | R3F |

Không nhảy P5 trước P1–P2.

---

## 7. Liên kết

- Spec: [`hydraulics-handbook-web-spec.md`](./hydraulics-handbook-web-spec.md)  
- Notes gốc: [`web-ui-learning-notes.md`](./web-ui-learning-notes.md)  
- QA: [`engineering-loop.md`](./engineering-loop.md)  
