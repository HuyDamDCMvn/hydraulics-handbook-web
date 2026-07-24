import type { ChapterLocaleOverlay } from "@/i18n/chapter-locale";

export const part1Vi: Record<number, ChapterLocaleOverlay> = {
  1: {
    title: "Khối lượng riêng, trọng lượng riêng và áp suất",
    scope:
      "Định nghĩa các tính chất cơ bản của chất lỏng gồm khối lượng riêng và trọng lượng riêng, đồng thời giới thiệu áp suất như cường độ lực trên một bề mặt. Các quan hệ này là nền tảng cho các tính toán thủy tĩnh và dòng chảy trong toàn bộ sổ tay.",
    assumptions:
      "Chất lỏng được coi là môi trường liên tục; khối lượng riêng phân bố đều trong thể tích kiểm soát đang xét; gia tốc trọng trường không đổi (g = 9.81 m/s²); áp suất vuông góc với bề mặt và đều trên diện tích A.",
    engineeringNote:
      "Nước ngọt ở điều kiện chuẩn thường lấy ρ ≈ 1000 kg/m³ và γ ≈ 9810 N/m³. Luôn kiểm tra sự phụ thuộc nhiệt độ khi cần độ chính xác cao; kết quả áp suất thường báo bằng kPa hoặc MPa cho tiện kỹ thuật.",
    equations: {
      "1.1": "Khối lượng riêng",
      "1.2": "Trọng lượng riêng",
      "1.3": "Áp suất",
    },
    nomenclature: {
      "ρ": "Khối lượng riêng",
      m: "Khối lượng",
      V: "Thể tích",
      "γ": "Trọng lượng riêng",
      g: "Gia tốc trọng trường",
      p: "Áp suất",
      F: "Lực pháp tuyến lên bề mặt",
      A: "Diện tích",
    },
    schematicCaption:
      "Thể tích kiểm soát của chất lỏng: khối lượng m trong thể tích V; lực F tác dụng pháp tuyến lên diện tích A.",
    examples: {
      "1.1": {
        prompt:
          "Một bể chứa 2.5 m³ nước ở điều kiện chuẩn (ρ = 1000 kg/m³). Xác định khối lượng và trọng lượng của nước.",
        physicalModel:
          "Bể kín chứa nước không nén được, khối lượng riêng đều; trọng lượng W = mg = γV.",
        result: "m = 2500 kg; W = 24.5 kN",
        interpretation:
          "Nước chứa trong bể có khối lượng 2.5 t và tạo trọng lượng hướng xuống khoảng 24.5 kN lên các gối đỡ bể.",
      },
      "1.2": {
        prompt:
          "Một lực nén 12 kN tác dụng đều lên piston có diện tích 0.015 m². Tính áp suất lên chất lỏng.",
        physicalModel:
          "Piston thủy lực truyền lực pháp tuyến đều lên bề mặt chất lỏng kín.",
        result: "p = 800 kPa",
        interpretation:
          "Cường độ lực lên chất lỏng là 800 kPa, mức suất làm việc điển hình của các cơ cấu thủy lực nhỏ.",
      },
    },
  },
  2: {
    title: "Áp suất thủy tĩnh và cột áp",
    scope:
      "Liên hệ áp suất với độ sâu trong chất lỏng đứng yên và chuyển áp suất thành chiều cao cột chất lỏng tương đương (cột áp). Dùng cho đo áp bằng ống áp, bài toán mặt thoáng hồ chứa và chuyển đổi áp kế–áp tuyệt đối.",
    assumptions:
      "Chất lỏng đứng yên (không có ứng suất cắt); khối lượng riêng không đổi; áp suất mặt thoáng p₀ đã biết (thường là khí quyển); trục z hướng lên hoặc độ sâu h đo xuống từ mặt thoáng một cách nhất quán.",
    engineeringNote:
      "Áp kế bỏ qua áp suất khí quyển; áp tuyệt đối bao gồm cả áp suất khí quyển. Cột áp tiện cho cân bằng năng lượng Bernoulli. Với nước, 1 m cột áp ≈ 9.81 kPa.",
    equations: {
      "2.1": "Biến thiên áp suất thủy tĩnh",
      "2.2": "Cột áp",
      "2.3": "Áp kế từ cột áp (mặt thoáng)",
    },
    nomenclature: {
      p: "Áp suất tuyệt đối hoặc áp kế tại độ sâu",
      "p₀": "Áp suất tại mặt thoáng (hoặc chuẩn)",
      "ρ": "Khối lượng riêng chất lỏng",
      g: "Gia tốc trọng trường",
      h: "Độ sâu dưới mặt thoáng",
      "hₚ": "Cột áp",
      "γ": "Trọng lượng riêng",
    },
    schematicCaption:
      "Cột thủy tĩnh: áp suất mặt thoáng p₀ và sự tăng áp suất ρgh theo độ sâu h.",
    examples: {
      "2.1": {
        prompt:
          "Tìm áp kế tại độ sâu 6 m trong hồ chứa nước ngọt (ρ = 1000 kg/m³).",
        physicalModel:
          "Hồ hở với mặt thoáng khí quyển; chất lỏng đứng yên, khối lượng riêng đều.",
        result: "p_gauge = 58.9 kPa",
        interpretation:
          "Ở độ sâu 6 m, nước tạo khoảng 58.9 kPa trên khí quyển lên tường ngập hoặc dụng cụ đo.",
      },
      "2.2": {
        prompt:
          "Biểu diễn áp kế 245 kPa dưới dạng cột áp nước ngọt tương đương.",
        physicalModel:
          "Chuyển đổi giữa cường độ áp suất và chiều cao cột nước tương đương.",
        result: "hₚ ≈ 25.0 m cột nước",
        interpretation:
          "245 kPa tương đương khoảng 25 m cột nước — hữu ích khi đọc piezometer hoặc thiết kế hồ chứa.",
      },
    },
  },
  3: {
    title: "Lực thủy tĩnh và tâm áp suất",
    scope:
      "Xác định độ lớn và vị trí của hợp lực thủy tĩnh lên mặt phẳng ngập nước như cửa van, đập và thành bể.",
    assumptions:
      "Chất lỏng đứng yên, khối lượng riêng không đổi; bề mặt là mặt phẳng; áp suất khí quyển trên mặt thoáng có thể triệt tiêu nếu cũng tác dụng lên phía khô của cửa; y đo dọc mặt phẳng từ giao với mặt thoáng.",
    engineeringNote:
      "Hợp lực đi qua tâm áp suất, luôn nằm dưới trọng tâm với các trường hợp có mặt thoáng. Với hình chữ nhật đứng cao H có đỉnh tại mặt thoáng, I_xc = bH³/12 và độ lệch thường là H/6 dưới trọng tâm ở nửa chiều cao.",
    equations: {
      "3.1": "Hợp lực thủy tĩnh lên mặt phẳng",
      "3.2": "Tâm áp suất (mặt phẳng nghiêng)",
    },
    nomenclature: {
      F: "Hợp lực thủy tĩnh",
      "ρ": "Khối lượng riêng chất lỏng",
      g: "Gia tốc trọng trường",
      h_c: "Độ sâu thẳng đứng của trọng tâm",
      A: "Diện tích ướt của mặt phẳng",
      y_c: "Khoảng cách trọng tâm dọc mặt phẳng từ mặt thoáng",
      y_p: "Khoảng cách tâm áp suất dọc mặt phẳng",
      I_xc: "Mômen quán tính diện tích quanh trục trọng tâm",
    },
    schematicCaption:
      "Mặt phẳng nghiêng ngập nước: trọng tâm C ở độ sâu h_c và tâm áp suất P nằm dưới C.",
    examples: {
      "3.1": {
        prompt:
          "Một cửa chữ nhật đứng rộng 1.2 m, cao 2.0 m có mép trên tại mặt thoáng nước ngọt. Tìm hợp lực thủy tĩnh lên cửa.",
        physicalModel:
          "Hình chữ nhật mặt phẳng đứng ngập từ mặt thoáng; trọng tâm ở nửa chiều cao.",
        result: "F = 23.5 kN",
        interpretation:
          "Cửa phải chịu hợp lực 23.5 kN pháp tuyến với mặt cửa, đi qua tâm áp suất.",
      },
      "3.2": {
        prompt:
          "Với cửa ở Ví dụ 1, xác định vị trí tâm áp suất đo xuống từ mặt thoáng dọc cửa.",
        physicalModel:
          "Cùng hình chữ nhật đứng; I_xc quanh trục trọng tâm nằm ngang.",
        result: "yₚ = 1.33 m dưới mặt thoáng",
        interpretation:
          "Hợp lực tác dụng 0.33 m dưới trọng tâm, nên thiết kế bản lề và chốt hãm phải kể đến cánh tay đòn này.",
      },
    },
  },
  4: {
    title: "Lực đẩy Archimedes và cân bằng nổi",
    scope:
      "Áp dụng nguyên lý Archimedes cho vật ngập toàn phần hoặc một phần, gồm tàu nổi và bể ngập, đồng thời nêu cân bằng trọng lượng–lực đẩy cho trạng thái nổi.",
    assumptions:
      "Chất lỏng đứng yên; khối lượng riêng chất lỏng bị đẩy đều; trọng lượng vật đi qua trọng tâm; lực đẩy thẳng đứng qua tâm nổi (trọng tâm thể tích bị đẩy).",
    engineeringNote:
      "Với cân bằng nổi, thể tích bị đẩy điều chỉnh đến khi ρ_fluid g V_sub = W. Ổn định còn đòi hỏi phân tích chiều cao tâm nghiêng (không chỉ từ độ lớn lực).",
    equations: {
      "4.1": "Lực đẩy Archimedes",
      "4.2": "Cân bằng nổi",
    },
    nomenclature: {
      F_B: "Lực đẩy Archimedes",
      "ρ": "Khối lượng riêng chất lỏng bị đẩy",
      g: "Gia tốc trọng trường",
      V_sub: "Thể tích bị đẩy (ngập)",
      W: "Trọng lượng vật",
      m: "Khối lượng vật",
    },
    schematicCaption:
      "Vật nổi: trọng lượng W cân bằng lực đẩy F_B bằng trọng lượng chất lỏng bị đẩy.",
    examples: {
      "4.1": {
        prompt:
          "Một khối bê tông ngập hoàn toàn đẩy 0.40 m³ nước ngọt. Tính lực đẩy Archimedes.",
        physicalModel:
          "Vật rắn ngập hoàn toàn trong nước ngọt đứng yên; lực đẩy bằng trọng lượng nước bị đẩy.",
        result: "F_B = 3.92 kN",
        interpretation:
          "Lực đẩy lên 3.92 kN làm giảm trọng lượng biểu kiến của khối khi ngập.",
      },
      "4.2": {
        prompt:
          "Một sà lan trọng lượng 980 kN nổi trên nước ngọt. Thể tích nước bị đẩy phải là bao nhiêu?",
        physicalModel:
          "Tàu nổi ở trạng thái cân bằng; trọng lượng bằng lực đẩy.",
        result: "V_sub ≈ 99.9 m³",
        interpretation:
          "Cần khoảng 100 m³ thể tích thân tàu dưới nước để nổi sà lan này trên nước ngọt.",
      },
    },
  },
  5: {
    title: "Lưu lượng, vận tốc và phương trình liên tục",
    scope:
      "Định nghĩa lưu lượng thể tích và áp dụng bảo toàn khối lượng cho dòng ổn định, không nén được trong ống và kênh dẫn có tiết diện thay đổi.",
    assumptions:
      "Dòng ổn định; chất lỏng không nén được (khối lượng riêng không đổi); biểu diễn bằng vận tốc trung bình một chiều; không rò giữa các mặt cắt 1 và 2.",
    engineeringNote:
      "Vận tốc biến thiên nghịch đảo với diện tích. Co và mở đột ngột còn sinh tổn thất cục bộ sẽ xét sau; chỉ liên tục không cho biết sự thay đổi áp suất.",
    equations: {
      "5.1": "Lưu lượng thể tích",
      "5.2": "Liên tục (không nén, ổn định)",
    },
    nomenclature: {
      Q: "Lưu lượng thể tích",
      V: "Vận tốc trung bình",
      A: "Diện tích mặt cắt ngang",
      "A₁, A₂": "Diện tích tại mặt cắt 1 và 2",
      "V₁, V₂": "Vận tốc trung bình tại mặt cắt 1 và 2",
    },
    schematicCaption:
      "Liên tục trong ống dòng: A₁V₁ = A₂V₂ với dòng ổn định, không nén được.",
    examples: {
      "5.1": {
        prompt:
          "Nước chảy với vận tốc trung bình 2.5 m/s trong ống tròn đường kính 0.20 m. Tính lưu lượng.",
        physicalModel:
          "Dòng đầy ống với vận tốc trung bình đều trên mặt cắt tròn.",
        result: "Q = 0.0785 m³/s (78.5 L/s)",
        interpretation:
          "Ống cấp khoảng 78.5 lít mỗi giây ở tốc độ trung bình đã cho.",
      },
      "5.2": {
        prompt:
          "Cùng lưu lượng vào đoạn thu nhỏ đường kính từ 0.20 m xuống 0.10 m. Tìm vận tốc ra.",
        physicalModel:
          "Liên tục ổn định, không nén giữa hai mặt cắt tròn.",
        result: "V₂ = 10.0 m/s",
        interpretation:
          "Giảm đường kính còn nửa làm diện tích còn một phần tư và vận tốc tăng bốn lần, làm tăng cột động và có thể tăng nguy cơ xâm thực.",
      },
    },
  },
  6: {
    title: "Bernoulli mở rộng",
    scope:
      "Cân bằng năng lượng dọc đường dòng (hoặc ống dòng trung bình) gồm cột bơm h_p và tổng tổn thất cột áp h_L giữa hai mặt cắt.",
    assumptions:
      "Dòng ổn định; chất lỏng không nén được; vận tốc trung bình một chiều; tổn thất và công bơm gộp thành cột áp vô hướng; cao trình z đo từ cùng một chuẩn.",
    engineeringNote:
      "Không có bơm và tổn thất thì thu được phương trình Bernoulli cổ điển. Tổn thất cột áp gồm thành phần chính (ma sát) và phụ (phụ kiện) phát triển ở các chương sau.",
    equations: {
      "6.1": "Phương trình Bernoulli mở rộng",
      "6.2": "Tổng cột áp tại một mặt cắt",
    },
    nomenclature: {
      p: "Áp suất",
      "γ": "Trọng lượng riêng",
      V: "Vận tốc trung bình",
      g: "Gia tốc trọng trường",
      z: "Cao trình trên chuẩn",
      h_p: "Cột áp bơm (máy) bổ sung",
      h_L: "Tổng tổn thất cột áp giữa các mặt cắt",
    },
    schematicCaption:
      "Đường năng lượng: cột áp suất, cột vận tốc và cột vị trí kèm bổ sung bơm và tổn thất.",
    examples: {
      "6.1": {
        prompt:
          "Mặt thoáng hồ lớn ở z₁ = 25 m (p₁ = 0 áp kế, V₁ ≈ 0). Nước phun ra khí quyển qua vòi ở z₂ = 5 m. Bỏ qua tổn thất và công bơm. Tìm vận tốc ra V₂.",
        physicalModel:
          "Hồ hở tới tia khí quyển; Bernoulli lý tưởng dọc đường dòng.",
        result: "V₂ = 19.8 m/s",
        interpretation:
          "Chênh cao 20 m chuyển thành khoảng 19.8 m/s tốc độ thoát khi bỏ qua tổn thất (giới hạn Torricelli).",
      },
      "6.2": {
        prompt:
          "Một bơm cung cấp 15 m cột áp để nâng nước giữa hai bể hở có cao trình mặt nước z₁ = 5 m và z₂ = 18 m. Nếu tổn thất ống tổng h_L = 3.5 m và vận tốc mặt thoáng không đáng kể, kiểm tra cân bằng năng lượng.",
        physicalModel:
          "Hai bể hở; cột bơm bù chênh cao trình cộng tổn thất ma sát.",
        result: "Cần h_p = 16.5 m để cân bằng",
        interpretation:
          "Chỉ có 15 m cột bơm thì hệ thiếu 1.5 m; cần tăng cột bơm hoặc giảm tổn thất để cấp ổn định tới bể trên.",
      },
    },
  },
  7: {
    title: "Torricelli và lỗ thoát",
    scope:
      "Vận tốc thoát lý tưởng từ lỗ dưới cột áp h (Torricelli) và lưu lượng thực dùng hệ số lưu lượng C_d kể đến vena contracta và hiệu ứng nhớt.",
    assumptions:
      "Hồ thượng lưu lớn (vận tốc tiếp cận ≈ 0); áp suất khí quyển trên mặt thoáng và tia; cột áp ổn định h đo tới tâm lỗ; C_d được hiệu chuẩn theo hình dạng lỗ.",
    engineeringNote:
      "C_d điển hình của lỗ mép sắc khoảng 0.60–0.65. Luôn dùng diện tích hình học lỗ A, không dùng diện tích vena contracta, khi áp dụng Q = C_d A √(2gh).",
    equations: {
      "7.1": "Vận tốc tia lý tưởng Torricelli",
      "7.2": "Lưu lượng qua lỗ",
    },
    nomenclature: {
      V: "Vận tốc tia lý tưởng",
      g: "Gia tốc trọng trường",
      h: "Cột áp trên tâm lỗ",
      Q: "Lưu lượng thực",
      C_d: "Hệ số lưu lượng",
      A: "Diện tích lỗ",
    },
    schematicCaption:
      "Lỗ trên thành bể dưới cột áp h: tia Torricelli lý tưởng và vena contracta co hẹp.",
    examples: {
      "7.1": {
        prompt:
          "Một lỗ dưới cột áp không đổi 4.0 m xả ra khí quyển. Tính vận tốc Torricelli lý tưởng.",
        physicalModel:
          "Bể lớn, vận tốc tiếp cận không đáng kể, tia lý tưởng không ma sát.",
        result: "V = 8.86 m/s",
        interpretation:
          "Tốc độ thoát lý thuyết là 8.86 m/s; tia thực chậm hơn một chút do tổn thất.",
      },
      "7.2": {
        prompt:
          "Một lỗ tròn đường kính 50 mm dưới h = 4.0 m có C_d = 0.62. Tìm lưu lượng.",
        physicalModel:
          "Lỗ tròn mép sắc với hệ số lưu lượng đã biết.",
        result: "Q = 0.0108 m³/s (10.8 L/s)",
        interpretation:
          "Kể đến co hẹp và tổn thất, lỗ cấp khoảng 10.8 L/s dưới cột áp 4 m.",
      },
    },
  },
  8: {
    title: "Số Reynolds",
    scope:
      "Định nghĩa số Reynolds không thứ nguyên để phân loại dòng trong ống thành tầng, chuyển tiếp hoặc rối và dùng cho tương tự động lực giữa mô hình và nguyên mẫu.",
    assumptions:
      "Chiều dài đặc trưng là đường kính trong D với ống tròn; V là vận tốc trung bình; các tính chất μ và ν lấy ở nhiệt độ khối.",
    engineeringNote:
      "Với ống tròn, Re < ≈2300 thường là tầng và Re > ≈4000 là rối; vùng chuyển tiếp nhạy với nhiễu. Nước ở 20 °C có ν ≈ 1.0×10⁻⁶ m²/s.",
    equations: {
      "8.1": "Số Reynolds (độ nhớt động lực)",
      "8.2": "Số Reynolds (độ nhớt động học)",
    },
    nomenclature: {
      Re: "Số Reynolds",
      "ρ": "Khối lượng riêng chất lỏng",
      V: "Vận tốc trung bình",
      D: "Đường kính trong ống",
      "μ": "Độ nhớt động lực",
      "ν": "Độ nhớt động học",
    },
    schematicCaption:
      "Chế độ dòng trong ống: tầng (Re ≲ 2300), chuyển tiếp và rối (Re ≳ 4000).",
    examples: {
      "8.1": {
        prompt:
          "Nước ở 20 °C (ν = 1.0×10⁻⁶ m²/s) chảy 0.8 m/s trong ống đường kính 50 mm. Tính Re và nêu chế độ dòng.",
        physicalModel:
          "Ống tròn với vận tốc trung bình và độ nhớt động học đã biết.",
        result: "Re = 40 000 (rối)",
        interpretation:
          "Dòng nằm sâu trong vùng rối; hệ số ma sát phụ thuộc độ nhám tương đối cũng như Re.",
      },
      "8.2": {
        prompt:
          "Dầu có khối lượng riêng 880 kg/m³ và μ = 0.20 Pa·s chảy 1.2 m/s trong ống 40 mm. Tìm Re.",
        physicalModel:
          "Dầu nhớt trong ống đường kính nhỏ; dạng số Reynolds theo độ nhớt động lực.",
        result: "Re = 211 (tầng)",
        interpretation:
          "Dù tốc độ vừa phải, độ nhớt cao giữ dòng dầu ở chế độ tầng (Re ≪ 2300).",
      },
    },
  },
  9: {
    title: "Darcy–Weisbach",
    scope:
      "Tính tổn thất cột áp ma sát (chính) trong ống tròn khi đã biết hệ số ma sát Darcy f, chiều dài L, đường kính D và vận tốc trung bình V.",
    assumptions:
      "Dòng phát triển đầy đủ trong ống tròn đường kính không đổi; f biết từ biểu đồ Moody hoặc tương quan; chất lỏng không nén được; vận tốc trung bình một chiều.",
    engineeringNote:
      "Darcy–Weisbach được ưu tiên hơn các công thức thực nghiệm khi đã biết tính chất chất lỏng và độ nhám, vì f không thứ nguyên và phương trình đồng nhất về thứ nguyên.",
    equations: {
      "9.1": "Tổn thất cột áp Darcy–Weisbach",
      "9.2": "Sụt áp ma sát",
    },
    nomenclature: {
      h_f: "Tổn thất cột áp do ma sát",
      f: "Hệ số ma sát Darcy",
      L: "Chiều dài ống",
      D: "Đường kính trong",
      V: "Vận tốc trung bình",
      g: "Gia tốc trọng trường",
    },
    schematicCaption:
      "Ống thẳng dài L, đường kính D: tổn thất cột áp ma sát h_f dọc đường năng lượng.",
    examples: {
      "9.1": {
        prompt:
          "Nước chảy V = 2.0 m/s qua 250 m ống 150 mm với f = 0.020. Tính tổn thất cột áp ma sát.",
        physicalModel:
          "Đường ống tròn thẳng dài với hệ số ma sát Darcy đã biết.",
        result: "h_f = 6.80 m",
        interpretation:
          "Khoảng 6.8 m cột áp bị tiêu hao do ma sát thành trên 250 m đường ống này.",
      },
      "9.2": {
        prompt:
          "Nếu lưu lượng giảm còn nửa trong cùng ống (V thành 1.0 m/s) và f giữ 0.020, tổn thất cột áp mới là bao nhiêu?",
        physicalModel:
          "Cùng ống; tổn thất cột áp tỷ lệ V² khi f không đổi.",
        result: "h_f = 1.70 m",
        interpretation:
          "Giảm vận tốc còn nửa làm tổn thất cột áp ma sát còn một phần tư khi f gần như không đổi.",
      },
    },
  },
  10: {
    title: "Hệ số ma sát",
    scope:
      "Xác định hệ số ma sát Darcy cho dòng tầng một cách chính xác và cho dòng rối qua phương trình Colebrook ẩn hoặc xấp xỉ tường minh Swamee–Jain.",
    assumptions:
      "Ống tròn; thành thủy lực nhẵn hoặc nhám đặc trưng bởi độ nhám tuyệt đối ε; dòng phát triển đầy đủ; Colebrook hợp lệ với ống thương mại rối.",
    engineeringNote:
      "Lặp Colebrook từ đoán ban đầu (ví dụ Swamee–Jain). Với dòng tầng bỏ qua độ nhám. Thép thương mại thường ε ≈ 0.045 mm; PVC gần như nhẵn.",
    equations: {
      "10.1": "Hệ số ma sát Darcy dòng tầng",
      "10.2": "Phương trình Colebrook–White",
      "10.3": "Xấp xỉ Swamee–Jain",
    },
    nomenclature: {
      f: "Hệ số ma sát Darcy",
      Re: "Số Reynolds",
      "ε": "Độ nhám tuyệt đối của thành",
      D: "Đường kính trong",
    },
    schematicCaption:
      "Khái niệm biểu đồ Moody: f theo Re với các họ độ nhám tương đối ε/D.",
    examples: {
      "10.1": {
        prompt:
          "Dòng dầu tầng có Re = 800. Xác định hệ số ma sát Darcy.",
        physicalModel:
          "Dòng tầng phát triển đầy đủ trong ống; f không phụ thuộc độ nhám.",
        result: "f = 0.080",
        interpretation:
          "Hệ số ma sát tương đối lớn là điển hình ở số Reynolds thấp dù ở chế độ tầng.",
      },
      "10.2": {
        prompt:
          "Ước lượng f bằng Swamee–Jain với Re = 1.0×10⁵, D = 0.20 m và ε = 0.00015 m.",
        physicalModel:
          "Ống thương mại rối; xấp xỉ tường minh của Colebrook.",
        result: "f ≈ 0.0214",
        interpretation:
          "Ống nằm ở vùng độ nhám chuyển tiếp; f ≈ 0.021 phù hợp ước lượng tổn thất Darcy–Weisbach.",
      },
    },
  },
  11: {
    title: "Tổn thất cục bộ",
    scope:
      "Định lượng tổn thất cột áp cục bộ từ phụ kiện, van, cửa vào và cửa ra bằng hệ số tổn thất K, và quy đổi thành chiều dài ống thẳng tương đương.",
    assumptions:
      "Hệ số tổn thất K dựa trên vận tốc tham chiếu V trong ống đang xét; hệ số lấy từ nhà sản xuất hoặc bảng sổ tay; dòng rối trừ khi nêu khác.",
    engineeringNote:
      "Cộng mọi tổn thất cục bộ ΣK V²/(2g) với tổn thất chính trong phương trình Bernoulli mở rộng. Với đường truyền tải dài, tổn thất cục bộ thường nhỏ; trong mạng ống nhà máy chúng có thể chiếm ưu thế.",
    equations: {
      "11.1": "Tổn thất cột áp cục bộ (phụ)",
      "11.2": "Chiều dài ống tương đương",
    },
    nomenclature: {
      h_m: "Tổn thất cột áp cục bộ",
      K: "Hệ số tổn thất",
      V: "Vận tốc trung bình tham chiếu",
      g: "Gia tốc trọng trường",
      L_eq: "Chiều dài ống thẳng tương đương",
      D: "Đường kính ống",
      f: "Hệ số ma sát Darcy",
    },
    schematicCaption:
      "Phụ kiện trên đường ống: tổn thất cục bộ h_m = K V²/(2g) và chiều dài tương đương L_eq.",
    examples: {
      "11.1": {
        prompt:
          "Một van cầu có K = 10 lắp trên ống với V = 2.5 m/s. Tính tổn thất cột áp cục bộ.",
        physicalModel:
          "Một phụ kiện tham chiếu theo vận tốc trung bình của ống.",
        result: "h_m = 3.19 m",
        interpretation:
          "Riêng van đã tiêu hao hơn 3 m cột áp — tương đương hàng chục mét ma sát ống thẳng.",
      },
      "11.2": {
        prompt:
          "Quy đổi K = 10 thành chiều dài tương đương với D = 0.10 m và f = 0.020.",
        physicalModel:
          "Cùng tổn thất biểu diễn bằng chiều dài ống thẳng bổ sung ở f đã cho.",
        result: "L_eq = 50 m",
        interpretation:
          "Trong mô hình mạng, van có thể thay bằng 50 m ống tương đương 100 mm ở f = 0.020.",
      },
    },
  },
  12: {
    title: "Hazen–Williams",
    scope:
      "Công thức tổn thất ma sát thực nghiệm dùng rộng rãi cho mạng cấp nước theo đơn vị SI, liên hệ tổn thất cột áp với chiều dài, lưu lượng, hệ số Hazen–Williams C và đường kính.",
    assumptions:
      "Nước gần nhiệt độ thông thường; dòng rối trong dải mà C được hiệu chuẩn; C phản ánh vật liệu và tuổi ống; dạng SI với Q tính bằng m³/s, D và L bằng m, h_f bằng m.",
    engineeringNote:
      "Giá trị C điển hình: gang mới ≈ 130, PVC ≈ 140–150, ống cũ/có gỉ có thể xuống 100 hoặc thấp hơn. Ưu tiên Darcy–Weisbach khi chất lỏng không phải nước hoặc nhiệt độ biến đổi mạnh.",
    equations: {
      "12.1": "Tổn thất cột áp Hazen–Williams (SI)",
      "12.2": "Dạng vận tốc Hazen–Williams (SI)",
    },
    nomenclature: {
      h_f: "Tổn thất cột áp do ma sát",
      L: "Chiều dài ống",
      Q: "Lưu lượng",
      C: "Hệ số nhám Hazen–Williams",
      D: "Đường kính trong",
    },
    schematicCaption:
      "Ống cấp nước: tổn thất Hazen–Williams phụ thuộc C, Q, D và chiều dài L.",
    examples: {
      "12.1": {
        prompt:
          "Một ống PVC dài 300 m, đường kính 200 mm (C = 150) mang Q = 0.050 m³/s. Tính h_f theo Hazen–Williams (SI).",
        physicalModel:
          "Ống mạng cấp nước với hệ số thực nghiệm Hazen–Williams.",
        result: "h_f ≈ 2.95 m",
        interpretation:
          "Khoảng 3.0 m cột áp bị mất trên 300 m ở 50 L/s trong ống PVC nhẵn này.",
      },
      "12.2": {
        prompt:
          "Nếu cùng ống già hóa đến C = 100 trong khi Q và D không đổi, ước lượng tổn thất cột áp mới.",
        physicalModel:
          "Cùng hình học và lưu lượng; C giảm làm tăng tổn thất theo C^−1.852.",
        result: "h_f ≈ 6.25 m",
        interpretation:
          "Già hóa làm C giảm từ 150 xuống 100 khiến tổn thất cột áp ma sát tăng hơn gấp đôi ở cùng lưu lượng.",
      },
    },
  },
};
