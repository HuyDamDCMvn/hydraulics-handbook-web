import type { Locale } from "@/i18n/chapter-locale";
import type { ThemeId } from "@/content/types";

type UiDict = {
  brand: string;
  nav: {
    home: string;
    guide: string;
    chapters: string;
    examples: string;
    calculators: string;
    conversions: string;
    checklist: string;
    references: string;
  };
  menu: string;
  navigate: string;
  close: string;
  footer: {
    disclaimerStrong: string;
    disclaimer: string;
    academicEdition: string;
    howToUse: string;
    references: string;
  };
  landing: {
    eyebrow: string;
    title: string;
    lede: string;
    startChapters: string;
    howToUse: string;
    browseTheme: string;
    browseThemeLede: string;
    allChapters: string;
    statsChapters: string;
    statsEquations: string;
    statsExamples: string;
  };
  themes: Record<ThemeId, string>;
  chaptersPage: {
    title: string;
    lede: string;
    loading: string;
    searchPlaceholder: string;
    allThemes: string;
    showing: string; // "{n} of {total}"
    eq: string;
    ex: string;
  };
  chapter: {
    chapter: string;
    onThisPage: string;
    equationsNav: string;
    equations: string;
    scope: string;
    assumptions: string;
    nomenclature: string;
    schematic: string;
    note: string;
    examples: string;
    tableNomenclature: string; // "Table {id}.1. Nomenclature"
    figureSchematic: string; // "Figure {id}.1. ..."
    workedExamples: string; // "{id}.1 Worked examples"
    learningOnly: string;
    symbol: string;
    meaning: string;
    unit: string;
    example: string;
    physicalModel: string;
    governingEquation: string;
    substitution: string;
    result: string;
    interpretation: string;
  };
  examplesPage: {
    title: string;
    lede: string;
    searchPlaceholder: string;
    allChapters: string;
    example: string;
    chapterOf: string; // "Chapter {id}: {title}"
  };
  guide: {
    title: string;
    lede: string;
    sequenceTitle: string;
    sequenceNoteStrong: string;
    sequenceNote: string;
    sequenceItems: string[];
    notationTitle: string;
    notationItems: string[];
  };
  calculators: {
    title: string;
    lede: string;
    tabs: Record<string, string>;
    fields: {
      mass: string;
      volume: string;
      force: string;
      area: string;
      density: string;
      depth: string;
      pressure: string;
      velocity: string;
      diameter: string;
      viscosity: string;
      length: string;
      friction: string;
      discharge: string;
      head: string;
      efficiency: string;
      wavespeed: string;
      deltaV: string;
    };
    disclaimer: string;
  };
  conversions: {
    title: string;
    quantity: string;
    conversion: string;
    rows: [string, string][];
  };
  checklist: {
    title: string;
    steps: string[];
  };
  references: {
    title: string;
    footnote: string;
  };
  schematic: {
    interactive: string;
    dragOrbit: string;
  };
  lang: {
    eng: string;
    vie: string;
    switchTo: string;
  };
};

export const ui: Record<Locale, UiDict> = {
  en: {
    brand: "Hydraulics Formula Handbook",
    nav: {
      home: "Home",
      guide: "Guide",
      chapters: "Chapters",
      examples: "Examples",
      calculators: "Calculators",
      conversions: "Conversions",
      checklist: "Checklist",
      references: "References",
    },
    menu: "Menu",
    navigate: "Navigate",
    close: "Close",
    footer: {
      disclaimerStrong: "Academic learning reference.",
      disclaimer:
        " Real designs must follow applicable standards, manufacturer data, and discipline-specific engineering review.",
      academicEdition: "Academic Edition · SI units",
      howToUse: "How to use",
      references: "References",
    },
    landing: {
      eyebrow: "Academic technical reference",
      title: "Hydraulics Formula Handbook",
      lede: "Fundamental relations, physical interpretation, and worked examples — 24 chapters in SI units for engineering education and preliminary analysis.",
      startChapters: "Start chapters",
      howToUse: "How to use",
      browseTheme: "Browse by theme",
      browseThemeLede:
        "From fluid statics through pipe flow, pumps, open channels, water hammer, and seepage.",
      allChapters: "All 24 chapters →",
      statsChapters: "Thematic chapters",
      statsEquations: "Governing equations",
      statsExamples: "Worked SI examples",
    },
    themes: {
      statics: "Fluid properties & statics",
      flow: "Flow fundamentals",
      pipe: "Pipe losses",
      momentum: "Momentum & pumps",
      channel: "Open channel",
      unsteady: "Unsteady / seepage",
    },
    chaptersPage: {
      title: "Chapters",
      lede: "24 thematic chapters with governing equations, nomenclature, schematics, and worked examples.",
      loading: "Loading chapters…",
      searchPlaceholder: "Search — Darcy, NPSH, 23.1…",
      allThemes: "All themes",
      showing: "Showing {n} of {total} chapters",
      eq: "eq",
      ex: "ex",
    },
    chapter: {
      chapter: "Chapter",
      onThisPage: "On this page",
      equationsNav: "Equations",
      equations: "Governing equations",
      scope: "Scope of application",
      assumptions: "Assumptions and limitations",
      nomenclature: "Nomenclature",
      schematic: "Schematic",
      note: "Engineering note",
      examples: "Examples",
      tableNomenclature: "Table {id}.1. Nomenclature",
      figureSchematic: "Figure {id}.1. Formula concept diagram",
      workedExamples: "{id}.1 Worked examples",
      learningOnly:
        "Learning reference only. Verify designs against standards and project data.",
      symbol: "Symbol",
      meaning: "Meaning",
      unit: "Unit",
      example: "Example",
      physicalModel: "Physical model",
      governingEquation: "Governing equation",
      substitution: "Substitution",
      result: "Result",
      interpretation: "Interpretation",
    },
    examplesPage: {
      title: "Worked examples",
      lede: "48 SI worked examples across all chapters.",
      searchPlaceholder: "Search examples",
      allChapters: "All chapters",
      example: "Example",
      chapterOf: "Chapter {id}: {title}",
    },
    guide: {
      title: "How to use this handbook",
      lede: "A short reading path so formulas stay tied to assumptions, units, and limits.",
      sequenceTitle: "Recommended sequence",
      sequenceNoteStrong: "Before substituting numbers:",
      sequenceNote:
        " read “When to use”, confirm assumptions, identify knowns/unknowns, then convert every input to consistent SI units.",
      sequenceItems: [
        "Pressure: Pa or kPa; head: metres of the stated fluid.",
        "Discharge: m³/s; velocity: m/s; diameter and length: m.",
        "Use empirical coefficients only with the definition and test conditions that produced them.",
        "Worked results are rounded appropriately; small differences may arise from rounding.",
      ],
      notationTitle: "Notation and conventions",
      notationItems: [
        "All calculations use SI units unless explicitly stated otherwise.",
        "Gauge and absolute pressures are identified explicitly; they must not be mixed in one energy or cavitation calculation.",
        "Vector quantities use an arrow accent; section-average scalars are italic mathematical notation.",
        "Equation numbers follow (chapter.equation). Figures and tables are numbered by chapter.",
        "Round to practical engineering precision after calculation, not during intermediate steps.",
      ],
    },
    calculators: {
      title: "SI calculators",
      lede: "Quick checks aligned with handbook governing equations. Confirm assumptions before using results.",
      tabs: {
        pressure: "Density / pressure",
        hydrostatic: "Hydrostatic head",
        reynolds: "Reynolds",
        darcy: "Darcy–Weisbach",
        pump: "Pump power",
        hammer: "Joukowsky",
      },
      fields: {
        mass: "Mass m",
        volume: "Volume V",
        force: "Force F",
        area: "Area A",
        density: "Density ρ",
        depth: "Depth h",
        pressure: "Pressure p",
        velocity: "Velocity V",
        diameter: "Diameter D",
        viscosity: "Kinematic viscosity ν",
        length: "Length L",
        friction: "Friction factor f",
        discharge: "Discharge Q",
        head: "Head H",
        efficiency: "Efficiency η",
        wavespeed: "Wave speed c",
        deltaV: "Velocity change ΔV",
      },
      disclaimer:
        "SI units only. Learning aid — not a substitute for standards or engineering review.",
    },
    conversions: {
      title: "Appendix A. Quick conversions",
      quantity: "Quantity",
      conversion: "Conversion",
      rows: [
        ["1 m³/s", "1,000 L/s = 3,600 m³/h"],
        ["1 L/s", "3.6 m³/h"],
        ["1 bar", "100 kPa"],
        ["1 mH₂O", "≈ 9.81 kPa ≈ 0.0981 bar"],
        ["1 MPa", "≈ 101.97 mH₂O"],
        ["Engineering water", "ρ ≈ 1,000 kg/m³; γ ≈ 9,810 N/m³"],
      ],
    },
    checklist: {
      title: "Appendix B. Problem-solving checklist",
      steps: [
        "Sketch the system and identify the sections or points of interest.",
        "State the assumptions: steady or unsteady, full pipe or open channel, gauge or absolute pressure.",
        "Convert every input to one consistent unit system.",
        "Select a formula whose assumptions match the physical situation and identify empirical coefficients.",
        "Substitute values with units; check dimensions and order of magnitude.",
        "Check velocity, pressure, cavitation, stability, and applicable design limits.",
      ],
    },
    references: {
      title: "References",
      footnote:
        "Equations and examples in this handbook are synthesized for instruction from standard fluid-mechanics relationships. Empirical coefficients must be selected from the governing standard, manufacturer data, or validated project-specific sources.",
    },
    schematic: {
      interactive: "Interactive 3D flow schematic",
      dragOrbit: "drag to orbit",
    },
    lang: {
      eng: "ENG",
      vie: "VIE",
      switchTo: "Language",
    },
  },
  vi: {
    brand: "Sổ tay Công thức Thủy lực",
    nav: {
      home: "Trang chủ",
      guide: "Hướng dẫn",
      chapters: "Chương",
      examples: "Ví dụ",
      calculators: "Máy tính",
      conversions: "Đổi đơn vị",
      checklist: "Bảng kiểm",
      references: "Tài liệu",
    },
    menu: "Menu",
    navigate: "Điều hướng",
    close: "Đóng",
    footer: {
      disclaimerStrong: "Tài liệu học thuật tham khảo.",
      disclaimer:
        " Thiết kế thực tế phải tuân thủ tiêu chuẩn áp dụng, dữ liệu nhà sản xuất và thẩm định kỹ thuật chuyên ngành.",
      academicEdition: "Bản học thuật · Đơn vị SI",
      howToUse: "Cách dùng",
      references: "Tài liệu",
    },
    landing: {
      eyebrow: "Tài liệu kỹ thuật học thuật",
      title: "Sổ tay Công thức Thủy lực",
      lede: "Quan hệ nền tảng, diễn giải vật lý và ví dụ có lời giải — 24 chương theo hệ SI phục vụ đào tạo kỹ thuật và phân tích sơ bộ.",
      startChapters: "Bắt đầu các chương",
      howToUse: "Cách dùng",
      browseTheme: "Duyệt theo chủ đề",
      browseThemeLede:
        "Từ tĩnh học chất lỏng đến dòng ống, bơm, kênh hở, va đập thủy lực và thấm.",
      allChapters: "Cả 24 chương →",
      statsChapters: "Chương theo chủ đề",
      statsEquations: "Phương trình chi phối",
      statsExamples: "Ví dụ SI có lời giải",
    },
    themes: {
      statics: "Tính chất & tĩnh học",
      flow: "Cơ sở dòng chảy",
      pipe: "Tổn thất đường ống",
      momentum: "Động lượng & bơm",
      channel: "Kênh hở",
      unsteady: "Không ổn định / thấm",
    },
    chaptersPage: {
      title: "Các chương",
      lede: "24 chương theo chủ đề với phương trình chi phối, ký hiệu, sơ đồ và ví dụ có lời giải.",
      loading: "Đang tải chương…",
      searchPlaceholder: "Tìm — Darcy, NPSH, 23.1…",
      allThemes: "Mọi chủ đề",
      showing: "Hiển thị {n} / {total} chương",
      eq: "pt",
      ex: "vd",
    },
    chapter: {
      chapter: "Chương",
      onThisPage: "Trên trang này",
      equationsNav: "Phương trình",
      equations: "Phương trình chi phối",
      scope: "Phạm vi áp dụng",
      assumptions: "Giả thiết và giới hạn",
      nomenclature: "Ký hiệu",
      schematic: "Sơ đồ",
      note: "Ghi chú kỹ thuật",
      examples: "Ví dụ",
      tableNomenclature: "Bảng {id}.1. Ký hiệu",
      figureSchematic: "Hình {id}.1. Sơ đồ khái niệm công thức",
      workedExamples: "{id}.1 Ví dụ có lời giải",
      learningOnly:
        "Chỉ dùng để học. Kiểm chứng thiết kế theo tiêu chuẩn và dữ liệu dự án.",
      symbol: "Ký hiệu",
      meaning: "Ý nghĩa",
      unit: "Đơn vị",
      example: "Ví dụ",
      physicalModel: "Mô hình vật lý",
      governingEquation: "Phương trình chi phối",
      substitution: "Thay số",
      result: "Kết quả",
      interpretation: "Diễn giải",
    },
    examplesPage: {
      title: "Ví dụ có lời giải",
      lede: "48 ví dụ SI trên tất cả các chương.",
      searchPlaceholder: "Tìm ví dụ",
      allChapters: "Mọi chương",
      example: "Ví dụ",
      chapterOf: "Chương {id}: {title}",
    },
    guide: {
      title: "Cách dùng sổ tay này",
      lede: "Lộ trình đọc ngắn để công thức luôn gắn với giả thiết, đơn vị và giới hạn.",
      sequenceTitle: "Thứ tự khuyến nghị",
      sequenceNoteStrong: "Trước khi thay số:",
      sequenceNote:
        " đọc “Khi nào dùng”, xác nhận giả thiết, xác định đã biết/chưa biết, rồi đổi mọi đầu vào sang hệ SI thống nhất.",
      sequenceItems: [
        "Áp suất: Pa hoặc kPa; cột áp: mét của chất lỏng đã nêu.",
        "Lưu lượng: m³/s; vận tốc: m/s; đường kính và chiều dài: m.",
        "Chỉ dùng hệ số thực nghiệm kèm định nghĩa và điều kiện thí nghiệm đã tạo ra chúng.",
        "Kết quả ví dụ được làm tròn hợp lý; có thể lệch nhỏ do làm tròn.",
      ],
      notationTitle: "Ký hiệu và quy ước",
      notationItems: [
        "Mọi tính toán dùng hệ SI trừ khi nêu rõ khác.",
        "Áp suất tương đối và tuyệt đối được ghi rõ; không trộn trong cùng một cân bằng năng lượng hoặc tính toán xâm thực.",
        "Đại lượng vector dùng dấu mũi tên; đại lượng vô hướng trung bình mặt cắt dùng chữ nghiêng toán học.",
        "Số phương trình dạng (chương.phương trình). Hình và bảng đánh số theo chương.",
        "Làm tròn theo độ chính xác kỹ thuật thực tế sau khi tính, không làm tròn ở bước trung gian.",
      ],
    },
    calculators: {
      title: "Máy tính SI",
      lede: "Kiểm tra nhanh theo phương trình chi phối của sổ tay. Xác nhận giả thiết trước khi dùng kết quả.",
      tabs: {
        pressure: "Khối lượng riêng / áp suất",
        hydrostatic: "Cột áp thủy tĩnh",
        reynolds: "Reynolds",
        darcy: "Darcy–Weisbach",
        pump: "Công suất bơm",
        hammer: "Joukowsky",
      },
      fields: {
        mass: "Khối lượng m",
        volume: "Thể tích V",
        force: "Lực F",
        area: "Diện tích A",
        density: "Khối lượng riêng ρ",
        depth: "Độ sâu h",
        pressure: "Áp suất p",
        velocity: "Vận tốc V",
        diameter: "Đường kính D",
        viscosity: "Độ nhớt động học ν",
        length: "Chiều dài L",
        friction: "Hệ số ma sát f",
        discharge: "Lưu lượng Q",
        head: "Cột áp H",
        efficiency: "Hiệu suất η",
        wavespeed: "Vận tốc sóng c",
        deltaV: "Biến thiên vận tốc ΔV",
      },
      disclaimer:
        "Chỉ hệ SI. Công cụ học tập — không thay thế tiêu chuẩn hay thẩm định kỹ thuật.",
    },
    conversions: {
      title: "Phụ lục A. Đổi đơn vị nhanh",
      quantity: "Đại lượng",
      conversion: "Đổi",
      rows: [
        ["1 m³/s", "1.000 L/s = 3.600 m³/h"],
        ["1 L/s", "3,6 m³/h"],
        ["1 bar", "100 kPa"],
        ["1 mH₂O", "≈ 9,81 kPa ≈ 0,0981 bar"],
        ["1 MPa", "≈ 101,97 mH₂O"],
        ["Nước kỹ thuật", "ρ ≈ 1.000 kg/m³; γ ≈ 9.810 N/m³"],
      ],
    },
    checklist: {
      title: "Phụ lục B. Checklist giải bài",
      steps: [
        "Phác họa hệ thống và xác định các mặt cắt hoặc điểm quan tâm.",
        "Nêu giả thiết: ổn định hay không ổn định, ống đầy hay kênh hở, áp suất tương đối hay tuyệt đối.",
        "Đổi mọi đầu vào sang một hệ đơn vị thống nhất.",
        "Chọn công thức có giả thiết khớp tình huống vật lý và xác định hệ số thực nghiệm.",
        "Thay số kèm đơn vị; kiểm tra thứ nguyên và bậc độ lớn.",
        "Kiểm tra vận tốc, áp suất, xâm thực, ổn định và giới hạn thiết kế áp dụng.",
      ],
    },
    references: {
      title: "Tài liệu tham khảo",
      footnote:
        "Phương trình và ví dụ trong sổ tay được tổng hợp phục vụ giảng dạy từ các quan hệ cơ học chất lỏng chuẩn. Hệ số thực nghiệm phải lấy từ tiêu chuẩn chi phối, dữ liệu nhà sản xuất hoặc nguồn dự án đã kiểm chứng.",
    },
    schematic: {
      interactive: "Sơ đồ dòng chảy 3D tương tác",
      dragOrbit: "kéo để xoay",
    },
    lang: {
      eng: "ENG",
      vie: "VIE",
      switchTo: "Ngôn ngữ",
    },
  },
};

export function formatTemplate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(vars[key] ?? `{${key}}`),
  );
}
