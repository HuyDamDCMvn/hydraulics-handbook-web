# Phương thức & quy cách — Hydraulics Formula Handbook (Web)

**Nguồn nội dung:** `Hydraulics_Formula_Handbook_Academic_Edition_v3.docx`  
**Stack tham chiếu:** `web-ui-learning-notes.md`  
**Sản phẩm:** Academic technical reference web app (không phải marketing landing)

---

## 1. Mục tiêu sản phẩm

Chuyển handbook học thuật (24 chương · 59 phương trình · 48 ví dụ · 24 schematic) thành site đọc–tra–tính:

| Mục tiêu | Mô tả |
| --- | --- |
| **Đọc** | Mỗi chương là một trang rõ hierarchy: scope → assumptions → equations → nomenclature → schematic → note → examples |
| **Tra** | TOC, search symbol/keyword, jump equation `(n.m)` |
| **Tính** | Optional calculator theo governing equations (SI), không thay thế engineering judgment |
| **Cảnh báo** | Luôn hiện disclaimer: learning reference; design phải theo standard / manufacturer / review |

**Không làm:** SaaS dashboard, card-grid marketing, dark-glow AI landing.

---

## 2. Information Architecture (map từ DOCX)

```
/                         Landing: brand + abstract + CTA “Start chapters”
/guide                    How to use + Notation and conventions
/chapters                 Index 24 chapters (search + filter theo theme)
/chapters/[n]             Chapter page (template cố định)
/examples                 Index 48 worked examples (filter by chapter)
/tools/conversions        Appendix A
/tools/checklist          Appendix B
/references               References
```

### Nhóm theme (điều hướng phụ)

| Theme | Chapters |
| --- | --- |
| Fluid properties & statics | 1–4 |
| Flow fundamentals | 5–8 |
| Pipe losses | 9–12 |
| Momentum & pumps | 13–16 |
| Open channel | 17–21 |
| Unsteady / seepage | 22–24 |

### Template nội dung chương (bắt buộc cùng thứ tự)

1. Title + chapter number  
2. **Governing equations** (KaTeX, số `(n.m)`)  
3. **Scope of application**  
4. **Assumptions and limitations**  
5. **Nomenclature** table (Symbol · Meaning · Unit)  
6. **Formula concept diagram** (SVG/WebGL)  
7. **Engineering note**  
8. **Worked examples** × 2 — mỗi ví dụ: Physical model → Governing equation → Substitution → Result → Interpretation  

Front matter DOCX → `/` và `/guide`. Appendix → `/tools/*`. References → `/references`.

---

## 3. Stack — khi nào dùng cái gì

Ánh xạ từ `web-ui-learning-notes.md`. **Chỉ dùng đúng vai trò; không chồng hiệu ứng.**

| Công nghệ | Vai trò trên site này | Dùng ở đâu | Không dùng khi |
| --- | --- | --- | --- |
| **React** (+ Vite hoặc Next.js) | Framework UI, routing, MDX/content modules | Toàn app | — |
| **taste-skill** (`design-taste-frontend`) | Quy tắc thẩm mỹ, layout, typography, anti-slop | Mọi màn hình | Bỏ qua brief học thuật |
| **Aceternity templates** | Tham khảo layout Docs/Blog+TOC, sidebar, search | Shell layout, chapter TOC | Copy nguyên marketing hero/bento |
| **AutoAnimate** | Motion nhẹ khi list/filter đổi | Chapter index, example filter, TOC collapse | Scroll storytelling, formula reveal |
| **React Spring** | Gesture / kéo panel, spring UI | Drawer mobile TOC, optional calculator knobs | Scroll chapter narrative |
| **GSAP** | Scroll storytelling / timeline | Chỉ landing + intro “How to use” (1–2 scene) | Trong chapter body (gây nhiễu đọc) |
| **React Three Fiber** | 3D/WebGL schematic chọn lọc | 3–5 chương có hình không gian (pipe bend, jump, weir…) | Mọi chapter — mặc định dùng SVG 2D |

### Dial taste-skill (đề xuất)

| Dial | Giá trị | Lý do |
| --- | --- | --- |
| DESIGN_VARIANCE | 3–4 | Editorial academic, không asymmetric marketing |
| MOTION_INTENSITY | 2–3 | Ưu tiên đọc công thức; motion phụ |
| VISUAL_DENSITY | 6–7 | Nhiều ký hiệu / bảng / ví dụ trên viewport |

Hướng visual: **editorial technical reference** (gần minimalist/soft academic), không brutalist, không purple-glow SaaS.

---

## 4. Quy cách thiết kế UI

### 4.1 Composition

- **Landing:** một composition — brand handbook, một headline, một câu abstract rút gọn, một CTA; không nhồi stats/chapters vào first viewport.  
- **Chapter:** reading column + sticky TOC (desktop); không card bọc nội dung công thức.  
- Mỗi section một việc: một heading + một khối nội dung.

### 4.2 Typography & math

- Display/body: font có tính editorial (không Inter/Roboto/Arial/system mặc định).  
- Công thức: **KaTeX** (hoặc MathJax), không ảnh PNG equation từ Word.  
- Equation ID dạng `(1.1)` — anchor link `#eq-1-1`.  
- Symbol italic; vector có mũi tên; SI units monospace hoặc tabular.

### 4.3 Color & surface

- Nền có chiều sâu nhẹ (giấy kỹ thuật / paper grain / soft gradient), tránh flat một màu và tránh “AI purple”.  
- Accent một màu kỹ thuật (ví dụ deep teal / ink blue) — dùng cho link, equation highlight, CTA.  
- Engineering note: callout typography/border, không badge nổi trên media.

### 4.4 Schematic

| Ưu tiên | Hình thức | Khi nào |
| --- | --- | --- |
| 1 | SVG 2D (tái tạo schematic Word) | Mặc định mọi chapter |
| 2 | Canvas / R3F interactive | Chỉ chapter cần không gian / tương tác biến số |
| 3 | Raster từ DOCX | Fallback tạm; thay bằng SVG trước ship |

### 4.5 Responsive

- Desktop: sidebar TOC + content ~65–72ch.  
- Mobile: bottom/drawer TOC (React Spring); content full width; bảng nomenclature scroll ngang.

---

## 5. Quy cách nội dung & data model

Nội dung **không hard-code JSX dài**. Mỗi chapter là data/MDX có schema:

```ts
type Chapter = {
  id: number                    // 1..24
  slug: string
  title: string
  theme: ThemeId
  equations: { id: string; latex: string; label: string }[]
  scope: string
  assumptions: string
  nomenclature: { symbol: string; meaning: string; unit: string }[]
  schematic: { type: 'svg' | 'r3f'; src: string; caption: string }
  engineeringNote: string
  examples: Example[]
}

type Example = {
  id: string                    // "1.1"
  prompt: string
  physicalModel: string
  governingEquation: string     // latex or eq ref
  substitution: string
  result: string
  interpretation: string
}
```

**Pipeline DOCX → Web**

1. Export/parse DOCX → Markdown/JSON (MarkItDown hoặc pandoc).  
2. Chuẩn hóa: điền latex (Word OMML mất khi convert — **bắt buộc nhập lại KaTeX**).  
3. Tách schematic → SVG assets `public/schematics/ch-XX.svg`.  
4. Validate schema (mỗi chapter đủ 2 examples, nomenclature không trống).  
5. Commit content modules; UI chỉ render schema.

---

## 6. Quy cách tương tác & motion

| Tương tác | Công nghệ | Quy tắc |
| --- | --- | --- |
| Filter/search chapter list | AutoAnimate | Chỉ animate list items; duration ngắn |
| Mobile TOC / panel | React Spring | Spring tự nhiên; không overshoot mạnh |
| Landing narrative | GSAP ScrollTrigger | Tối đa 1 pin scene; tắt `prefers-reduced-motion` |
| Highlight equation khi nhảy từ TOC | CSS / nhẹ GSAP | Không parallax chữ công thức |
| Calculator input | Controlled React | SI only; hiện unit cạnh input; làm tròn kiểu engineering ở kết quả |
| 3D schematic | R3F | Lazy load; pause khi off-screen |

`prefers-reduced-motion: reduce` → tắt GSAP scroll + R3F spin; giữ fade tối thiểu hoặc không motion.

---

## 7. Cấu trúc repo đề xuất

```
hydraulics-handbook-web/
  src/
    app/ or pages/          # routes
    components/
      layout/               # Shell, SidebarTOC, Search
      chapter/              # EquationBlock, NomenclatureTable, ExampleCard, ScopeBlock
      media/                # SchematicSvg, SchematicR3F
      motion/               # providers AutoAnimate / Spring / GSAP helpers
    content/chapters/       # ch-01.mdx … ch-24.mdx hoặc .ts
    styles/                 # tokens CSS variables
    lib/math.ts             # KaTeX helpers, unit helpers
  public/schematics/
  docs/
    web-ui-learning-notes.md          # stack origins
    hydraulics-handbook-web-spec.md   # file này
```

---

## 8. Tiêu chuẩn chất lượng (Definition of Done)

Mỗi chapter page chỉ “xong” khi:

- [ ] Đủ 8 khối template (mục 2)  
- [ ] Mọi equation render KaTeX + anchor `(n.m)`  
- [ ] Nomenclature đủ Symbol / Meaning / Unit  
- [ ] Schematic SVG (hoặc R3F đã ghi rõ lý do) + caption  
- [ ] 2 examples đủ 5 bước  
- [ ] Disclaimer học thuật hiện ở footer chapter  
- [ ] Mobile: đọc được bảng + TOC  
- [ ] Không dùng card thừa; không marketing clutter trên first viewport chapter  

Site-level:

- [ ] Search theo title / keyword / equation id  
- [ ] Appendix A–B + References  
- [ ] Reduced motion OK  
- [ ] Lighthouse / a11y cơ bản: heading order, contrast, focus

---

## 9. Lộ trình triển khai

| Phase | Việc | Stack chính |
| --- | --- | --- |
| **P0 — Foundation** | Vite/Next + React, tokens, Shell + TOC layout (Aceternity docs-style) | React, taste-skill, Aceternity ref |
| **P1 — Content pipeline** | Schema + 1 chapter mẫu (Ch.1) end-to-end KaTeX + SVG | React, KaTeX |
| **P2 — Scale content** | Nhập 24 chapters + examples index + search | AutoAnimate (list) |
| **P3 — Guide & tools** | Landing nhẹ, Guide, Conversions, Checklist, References | GSAP chỉ landing |
| **P4 — Interactivity** | Calculators theo nhóm formula; mobile drawer | React Spring |
| **P5 — Selective 3D** | 3–5 schematic R3F (bend/jet, jump, weir…) | React Three Fiber |

Không nhảy P5 trước khi P1–P2 ổn — schematic 2D đúng quan trọng hơn 3D đẹp.

---

## 10. Quy tắc quyết định nhanh (cho agent / dev)

1. Đây có phải **nội dung đọc công thức**? → ưu tiên clarity, KaTeX, SVG.  
2. Có **list/filter đổi DOM**? → AutoAnimate.  
3. Có **kéo / panel / gesture**? → React Spring.  
4. Có **kể chuyện theo scroll** (chỉ marketing/intro)? → GSAP.  
5. Có **cần không gian 3D thật**? → R3F; không thì SVG.  
6. Layout có giống **SaaS AI template** không? → dừng, áp lại taste-skill + dial ở mục 3.

---

## 11. Liên kết nguồn

| Nguồn | URL / path |
| --- | --- |
| DOCX gốc | `Hydraulics_Formula_Handbook_Academic_Edition_v3.docx` |
| Stack notes | `web-ui-learning-notes.md` |
| taste-skill | https://github.com/Leonxlnx/taste-skill.git |
| Aceternity templates | https://ui.aceternity.com/templates |
| React | https://github.com/react/react.git |
| R3F | https://github.com/pmndrs/react-three-fiber.git |
| GSAP | https://github.com/greensock/GSAP.git |
| AutoAnimate | https://github.com/formkit/auto-animate.git |
| React Spring | https://github.com/pmndrs/react-spring.git |
