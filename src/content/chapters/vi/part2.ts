import type { ChapterLocaleOverlay } from "@/i18n/chapter-locale";

export const part2Vi: Record<number, ChapterLocaleOverlay> = {
  13: {
    title: "Động lượng tuyến tính và lực tại chỗ cong hoặc tia",
    scope:
      "Tính lực hợp trên chỗ cong ống, tấm chắn và cánh hướng dòng từ động lượng tuyến tính ổn định bằng thể tích kiểm soát cố định.",
    assumptions:
      "Dòng không nén ổn định; phân bố vận tốc vào/ra đều; áp suất khí quyển trên tia tự do; bỏ qua lực khối trong mặt phẳng ngang trừ khi có ghi chú.",
    engineeringNote:
      "Khối neo và khối chịu lực đẩy phải kháng phản lực trên chỗ cong; kể cả lực áp suất trên thành ống khi mặt kiểm soát cắt qua đoạn đang chịu áp.",
    equations: {
      "13.1": "Động lượng thể tích kiểm soát ổn định",
      "13.2": "Thành phần lực Fx trên chất lỏng",
      "13.3": "Thành phần lực Fy trên chất lỏng",
      "13.4": "Lực trên cánh hoặc chỗ cong (phản lực)",
    },
    nomenclature: {
      "ρ": "Khối lượng riêng chất lỏng",
      Q: "Lưu lượng thể tích",
      V: "Vận tốc trung bình",
      F: "Lực biên tác dụng lên chất lỏng",
      R: "Phản lực lên kết cấu",
    },
    schematicCaption:
      "Thể tích kiểm soát tại chỗ cong ống hoặc cánh tia, với các vector thông lượng động lượng vào và ra.",
    examples: {
      "13.1": {
        prompt:
          "Một tia nước tự do Q = 0.020 m³/s và V = 20 m/s đập vào cánh cố định và bị lệch 90° với cùng tốc độ. Tìm độ lớn lực trên cánh.",
        physicalModel:
          "Thể tích kiểm soát cố định bao quanh vùng lệch; áp suất khí quyển trên mặt tự do; Vin = 20 î m/s, Vout = 20 ĵ m/s.",
        result:
          "|R| = 566 N trên cánh (hướng −x và −y so với các thành phần lực lên chất lỏng)",
        interpretation:
          "Cánh phải cung cấp các thành phần bằng và ngược chiều để thay đổi động lượng tia qua góc vuông.",
      },
      "13.2": {
        prompt:
          "Nước chảy với Q = 0.050 m³/s qua chỗ cong ngang 180° có D = 100 mm. Áp suất vào và ra bằng khí quyển (xả tự do). Ước lượng lực dọc trục lên chỗ cong.",
        physicalModel:
          "Thể tích kiểm soát quanh chỗ cong; Vin = Vout = V = Q/A theo ±x; lực áp suất trên đầu tự do không đáng kể.",
        result:
          "Fx = −637 N (lực trên chất lỏng); phản lực chỗ cong Rx = +637 N theo trục vào",
        interpretation:
          "Góc quay 180° gần như nhân đôi biến đổi động lượng so với dừng đột ngột, nên neo phải chịu khoảng 2ρQV.",
      },
    },
  },
  14: {
    title: "Cột nước và công suất bơm",
    scope:
      "Định nghĩa cột nước toàn phần của bơm từ đường năng lượng hút và đẩy, và liên hệ công suất thủy lực với công suất trục qua hiệu suất.",
    assumptions:
      "Chất lỏng không nén; dòng trung bình ổn định; η là hiệu suất tổng của bơm; tổn thất giữa các điểm đo được gộp trong h_L theo vị trí đo đã chọn.",
    engineeringNote:
      "Luôn nêu rõ H chỉ gồm máy hay cả tổn thất ống giữa các trạm đo; lệch vị trí đo thường gây lệch số liệu hiện trường–catalog.",
    equations: {
      "14.1": "Cột nước toàn phần bơm (đẩy trừ hút, cộng tổn thất)",
      "14.2": "Công suất trục",
      "14.3": "Công suất thủy lực (nước)",
    },
    nomenclature: {
      H: "Cột nước toàn phần của bơm",
      p: "Áp suất",
      "γ": "Trọng lượng riêng ρg",
      z: "Cao độ mặt đo áp",
      h_L: "Tổn thất cột nước giữa các mặt cắt",
      "η": "Hiệu suất bơm",
      P: "Công suất trục",
    },
    schematicCaption:
      "Bơm với mặt đo hút (s) và đẩy (d), cao độ và đường năng lượng.",
    examples: {
      "14.1": {
        prompt:
          "Bơm cấp Q = 0.030 m³/s nước. Đồng hồ hút: ps = −20 kPa tại zs = 0; đẩy: pd = 250 kPa tại zd = 1.2 m. Đường kính bằng nhau nên Vd = Vs. Bỏ tổn thất giữa các đồng hồ. Tìm H.",
        physicalModel:
          "Cùng đường kính ống hai phía; γ = 9810 N/m³; cột vận tốc triệt tiêu.",
        result: "H = 28.7 m",
        interpretation:
          "Ngay cả chân không phía hút cũng đóng góp dương vào cột nước bơm cần thiết.",
      },
      "14.2": {
        prompt:
          "Với H = 28.7 m, Q = 0.030 m³/s và η = 0.72, tìm công suất trục cần thiết.",
        physicalModel:
          "Nước ρ = 1000 kg/m³; hiệu suất tổng 72%.",
        result: "P = 11.7 kW",
        interpretation:
          "Chọn động cơ theo catalog cần lớn hơn công suất trục này sau hệ số phục vụ và tổn thất truyền động.",
      },
    },
  },
  15: {
    title: "Định luật tương tự bơm",
    scope:
      "Quy đổi đặc tính bơm giữa các tốc độ làm việc tương tự cho máy hình học tương tự, đường kính cánh cố định.",
    assumptions:
      "Tương tự động lực; cùng chất lỏng; ảnh hưởng số Reynolds và nén được bỏ qua; hiệu suất gần như không đổi trong khoảng đổi tốc độ.",
    engineeringNote:
      "Định luật tương tự là ước lượng bậc một; kiểm tra NPSH và hiệu suất ở tốc độ mới trước khi chốt lịch VFD.",
    equations: {
      "15.1": "Tương tự lưu lượng (đường kính cố định)",
      "15.2": "Tương tự cột nước",
      "15.3": "Tương tự công suất",
    },
    nomenclature: {
      n: "Tốc độ quay",
      Q: "Lưu lượng",
      H: "Cột nước",
      P: "Công suất",
    },
    schematicCaption:
      "Các đường đặc tính bơm đồng dạng với Q∝n, H∝n² và P∝n³ giữa các điểm làm việc tương tự.",
    examples: {
      "15.1": {
        prompt:
          "Bơm tại n1 = 1450 rpm cấp Q1 = 0.040 m³/s với H1 = 32 m. Ước lượng Q2 và H2 tại n2 = 1750 rpm.",
        physicalModel:
          "Đường kính cánh cố định; các điểm làm việc đồng dạng.",
        result: "Q2 = 0.0483 m³/s; H2 = 46.6 m",
        interpretation:
          "Tăng tốc độ khoảng 21% làm cột nước tăng khoảng 46%, có thể quá tải đường đặc tính hệ thống cố định nếu không kiểm tra.",
      },
      "15.2": {
        prompt:
          "Tại n1 công suất trục là P1 = 15 kW. Ước lượng P2 với cùng tỷ số tốc độ n2/n1 = 1.207.",
        physicalModel:
          "Quy đổi công suất theo tương tự với hiệu suất gần như không đổi.",
        result: "P2 = 26.4 kW",
        interpretation:
          "Chọn động cơ và cáp phải theo sự tăng bậc ba của công suất, không theo thay đổi tuyến tính của tốc độ.",
      },
    },
  },
  16: {
    title: "NPSH và xâm thực",
    scope:
      "Đánh giá NPSH sẵn có tại cửa hút bơm và so sánh với NPSH yêu cầu để tránh xâm thực.",
    assumptions:
      "Chất lỏng có áp suất hơi đã biết; zs đo từ tâm bơm (dương nếu mặt thoáng cao hơn); h_Ls gồm ma sát hút và tổn thất cửa vào đến mắt cánh.",
    engineeringNote:
      "Chất lỏng nóng và đường hút dài làm NPSHa giảm nhanh; tăng ngập hoặc rút ngắn ống hút trước khi đổ lỗi cho bơm.",
    equations: {
      "16.1": "Cột hút dương thuần sẵn có (NPSHa)",
      "16.2": "Điều kiện không xâm thực",
    },
    nomenclature: {
      NPSHa: "NPSH sẵn có",
      NPSHr: "NPSH yêu cầu (catalog)",
      p_atm: "Áp suất khí quyển",
      p_v: "Áp suất hơi",
      z_s: "Cột tĩnh hút/ngập",
      h_Ls: "Tổn thất cột nước đường hút",
    },
    schematicCaption:
      "Bể hở, tổn thất ống hút và tâm bơm dùng để lập NPSHa.",
    examples: {
      "16.1": {
        prompt:
          "Nước 20 °C (pv = 2.34 kPa) được bơm từ bể hở. Mặt thoáng cao hơn tâm bơm 2.5 m; tổn thất hút h_Ls = 1.1 m; patm = 101.3 kPa. Tìm NPSHa.",
        physicalModel:
          "Bể hở; γ = 9810 N/m³; zs = +2.5 m (hút ngập).",
        result: "NPSHa = 11.5 m",
        interpretation:
          "Hút ngập tạo biên độ thoải mái cho nhiều bơm nước lạnh.",
      },
      "16.2": {
        prompt:
          "Nếu NPSHr = 4.0 m tại điểm làm việc, lắp đặt có chấp nhận được không? Biên độ là bao nhiêu?",
        physicalModel:
          "So sánh NPSH sẵn có và yêu cầu với biên độ nhà máy điển hình.",
        result: "Chấp nhận được; biên độ = 7.5 m",
        interpretation:
          "Thực tế nên giữ biên độ ít nhất 0.5–1 m; ở đây biên độ rất dư.",
      },
    },
  },
  17: {
    title: "Bán kính thủy lực, Manning và Chezy",
    scope:
      "Tính vận tốc và lưu lượng dòng đều trong kênh hở dùng bán kính thủy lực với trở lực Manning hoặc Chezy.",
    assumptions:
      "Dòng đều ổn định; độ dốc đáy S ≈ Sf không đổi; mặt cắt lăng trụ; hệ số Manning n đại diện cho biên.",
    engineeringNote:
      "Bất định của Manning n thường chi phối thiết kế; kiểm tra độ nhạy và ưu tiên n hiệu chỉnh hiện trường cho lưu lượng tới hạn.",
    equations: {
      "17.1": "Bán kính thủy lực",
      "17.2": "Công thức Manning (SI)",
      "17.3": "Công thức Chezy",
    },
    nomenclature: {
      A: "Diện tích dòng chảy",
      P: "Chu vi ướt",
      Rh: "Bán kính thủy lực",
      n: "Hệ số nhám Manning",
      S: "Độ dốc đáy (ma sát)",
      C: "Hệ số Chezy",
      V: "Vận tốc trung bình",
    },
    schematicCaption:
      "Mặt cắt kênh với diện tích A, chu vi ướt P và mặt thoáng dòng đều.",
    examples: {
      "17.1": {
        prompt:
          "Kênh chữ nhật rộng 3.0 m với độ sâu y = 1.2 m, S = 0.001 và n = 0.015. Tìm Rh, V và Q.",
        physicalModel:
          "Hình chữ nhật lăng trụ; dòng đều; Manning SI.",
        result: "Rh = 0.667 m; V = 1.61 m/s; Q = 5.79 m³/s",
        interpretation:
          "Khả năng tải phụ thuộc mạnh vào Rh^(2/3), nên đào sâu hoặc mở rộng đều làm tăng lưu lượng.",
      },
      "17.2": {
        prompt:
          "Với cùng Rh và S, tìm hệ số Chezy C khớp vận tốc Manning V = 1.61 m/s.",
        physicalModel:
          "Đồng nhất vận tốc Chezy và Manning trên cùng mặt cắt.",
        result: "C = 62.4 m¹ᐟ²/s",
        interpretation:
          "Báo cáo nhất quán C (hoặc n) tránh lẫn công thức trở lực từ các tiêu chuẩn khác thời kỳ.",
      },
    },
  },
  18: {
    title: "Hình học kênh chữ nhật và thang",
    scope:
      "Lập diện tích, chu vi ướt và bán kính thủy lực cho mặt cắt kênh hở chữ nhật và hình thang.",
    assumptions:
      "Mặt thoáng ngang qua mặt cắt; độ sâu thẳng đứng y; mái dốc thẳng; không kể mớn nước dư trong định nghĩa hình học của A và P.",
    engineeringNote:
      "Mái thang tăng ổn định nhưng tăng chu vi ướt; tối ưu đồng thời z và b để giảm đào đất tại Q mục tiêu.",
    equations: {
      "18.1": "Chữ nhật rộng b và sâu y",
      "18.2": "Hình thang với mái dốc z (H:V)",
    },
    nomenclature: {
      b: "Bề rộng đáy",
      y: "Độ sâu dòng chảy",
      z: "Mái dốc (ngang:đứng)",
      A: "Diện tích dòng chảy",
      P: "Chu vi ướt",
      Rh: "Bán kính thủy lực",
    },
    schematicCaption:
      "Mặt cắt chữ nhật và hình thang chú thích b, y và mái dốc z.",
    examples: {
      "18.1": {
        prompt:
          "Với chữ nhật b = 4.0 m và y = 1.5 m, tính A, P và Rh.",
        physicalModel: "Kênh chữ nhật lăng trụ.",
        result: "A = 6.00 m²; P = 7.00 m; Rh = 0.857 m",
        interpretation:
          "Với kênh rộng Rh tiến tới y; ở đây thành bên vẫn làm Rh nhỏ hơn độ sâu.",
      },
      "18.2": {
        prompt:
          "Hình thang có b = 2.0 m, y = 1.5 m và z = 1.5 (H:V). Tìm A, P và Rh.",
        physicalModel: "Kênh hình thang đối xứng, lăng trụ.",
        result: "A = 6.38 m²; P = 7.41 m; Rh = 0.860 m",
        interpretation:
          "So với chữ nhật rộng 4 m cùng diện tích gần đúng, hình thang đổi bề rộng mặt bằng mái dốc trong khi Rh gần tương đương.",
      },
    },
  },
  19: {
    title: "Năng lượng riêng, Froude và độ sâu tới hạn",
    scope:
      "Liên hệ độ sâu, vận tốc và năng lượng riêng; phân loại dòng êm/xiết; và xác định độ sâu tới hạn cho kênh chữ nhật.",
    assumptions:
      "Phân bố áp suất thủy tĩnh; đáy ngang trong định nghĩa năng lượng riêng; mặt cắt chữ nhật cho các biểu thức yc dạng đóng đã cho.",
    engineeringNote:
      "Gần Fr ≈ 1, thay đổi nhỏ của đáy hoặc bề rộng gây đáp ứng độ sâu lớn; tránh duy trì lâu gần độ sâu tới hạn trên đoạn dài.",
    equations: {
      "19.1": "Năng lượng riêng",
      "19.2": "Số Froude (chữ nhật)",
      "19.3": "Độ sâu tới hạn (chữ nhật, đơn vị bề rộng)",
      "19.4": "Độ sâu tới hạn cho chữ nhật rộng b",
    },
    nomenclature: {
      E: "Năng lượng riêng",
      y: "Độ sâu",
      V: "Vận tốc trung bình",
      Fr: "Số Froude",
      q: "Lưu lượng đơn vị Q/b",
      yc: "Độ sâu tới hạn",
      g: "Gia tốc trọng trường",
    },
    schematicCaption:
      "Biểu đồ năng lượng riêng với nhánh dòng êm và dòng xiết gặp nhau tại độ sâu tới hạn.",
    examples: {
      "19.1": {
        prompt:
          "Kênh chữ nhật rộng b = 2.0 m mang Q = 4.0 m³/s tại y = 1.0 m. Tính V, E và Fr.",
        physicalModel: "Kênh chữ nhật lăng trụ; g = 9.81 m/s².",
        result: "V = 2.00 m/s; E = 1.20 m; Fr = 0.638 (dòng êm)",
        interpretation:
          "Fr < 1 chỉ dòng êm được khống chế từ hạ lưu.",
      },
      "19.2": {
        prompt:
          "Với cùng Q và b, tìm độ sâu tới hạn yc.",
        physicalModel: "Chữ nhật; lưu lượng đơn vị q = Q/b.",
        result: "yc = 0.742 m",
        interpretation:
          "Độ sâu thực 1.0 m lớn hơn yc, phù hợp Fr < 1 và E trên mức tối thiểu tới hạn.",
      },
    },
  },
  20: {
    title: "Nước nhảy trong kênh chữ nhật",
    scope:
      "Dự đoán độ sâu liên hợp (sequent) sau nước nhảy trong kênh chữ nhật nằm ngang từ số Froude thượng lưu.",
    assumptions:
      "Thể tích kiểm soát động lượng nằm ngang, ma sát bỏ qua; mặt cắt chữ nhật lăng trụ; áp suất thủy tĩnh tại mặt cắt 1 và 2; lưu lượng ổn định.",
    engineeringNote:
      "Nước nhảy tiêu tán năng lượng hiệu quả khi Fr1 khoảng 4.5–9; ngoài khoảng đó kỳ vọng nhảy sóng hoặc nhảy thô và kiểm tra chiều dài bể tiêu năng.",
    equations: {
      "20.1": "Tỷ số độ sâu liên hợp",
      "20.2": "Số Froude tiếp cận",
    },
    nomenclature: {
      y1: "Độ sâu tiếp cận dòng xiết",
      y2: "Độ sâu liên hợp dòng êm",
      V1: "Vận tốc tiếp cận",
      Fr1: "Số Froude tiếp cận",
    },
    schematicCaption:
      "Nước nhảy từ độ sâu dòng xiết y1 đến độ sâu liên hợp y2 kèm xoáy.",
    examples: {
      "20.1": {
        prompt:
          "Nước tới nước nhảy với y1 = 0.40 m và V1 = 6.0 m/s trong kênh chữ nhật rộng. Tìm Fr1 và y2.",
        physicalModel:
          "Kênh chữ nhật nằm ngang; g = 9.81 m/s².",
        result: "Fr1 = 3.03; y2 = 1.53 m",
        interpretation:
          "Nước nhảy vừa phải gần như nhân bốn độ sâu, chuyển cột động năng thành hồ dòng êm sâu hơn.",
      },
      "20.2": {
        prompt:
          "Với cùng nước nhảy, ước lượng tổn thất năng lượng ΔE = E1 − E2.",
        physicalModel:
          "Năng lượng riêng tại các độ sâu liên hợp với V2 = V1 y1/y2.",
        result: "ΔE = 0.579 m",
        interpretation:
          "Khoảng 0.58 m cột nước bị tiêu tán trong rối — hữu ích cho thiết kế bể tiêu năng.",
      },
    },
  },
  21: {
    title: "Đập tràn đỉnh sắc",
    scope:
      "Ước lượng lưu lượng tự do qua đập tràn đỉnh sắc chữ nhật từ cột nước trên đỉnh và hệ số lưu lượng thực nghiệm.",
    assumptions:
      "Nappe thông khí đầy đủ; vận tốc tiếp cận không đáng kể hoặc đã gộp trong Cd; chiều dài đỉnh L co hoàn toàn hoặc đã kể trong Cd; tràn tự do ổn định.",
    engineeringNote:
      "Đo H thượng lưu nơi mặt nước gần như ngang; đo cột ngay trên đỉnh sẽ thấp hơn vì rút xuống (drawdown).",
    equations: {
      "21.1": "Đập tràn đỉnh sắc chữ nhật",
      "21.2": "Đập tràn tam giác (khuyết V)",
    },
    nomenclature: {
      Q: "Lưu lượng",
      Cd: "Hệ số lưu lượng",
      L: "Chiều dài đỉnh",
      H: "Cột nước trên đỉnh",
      g: "Gia tốc trọng trường",
    },
    schematicCaption:
      "Đập tràn đỉnh sắc chữ nhật với cột H đo thượng lưu vùng rút xuống.",
    examples: {
      "21.1": {
        prompt:
          "Đập tràn chữ nhật có L = 1.20 m, H = 0.25 m và Cd = 0.62. Tính Q.",
        physicalModel:
          "Tràn tự do đỉnh sắc; g = 9.81 m/s².",
        result: "Q = 0.275 m³/s",
        interpretation:
          "Lưu lượng tỷ lệ H^(3/2), nên sai số nhỏ của cột nước gây sai số lưu lượng lớn hơn.",
      },
      "21.2": {
        prompt:
          "Nếu cùng đập phải qua Q = 0.40 m³/s với Cd = 0.62 và L = 1.20 m, cần cột nước H bao nhiêu?",
        physicalModel: "Đảo phương trình đập tràn theo H.",
        result: "H = 0.321 m",
        interpretation:
          "Tăng cột từ 0.25 m lên 0.32 m làm khả năng tải tăng khoảng 45% theo quy luật lũy thừa 3/2.",
      },
    },
  },
  22: {
    title: "Thời gian hạ mực bể",
    scope:
      "Tích phân liên tục cho mực nước biến thiên khi xả qua lỗ hoặc cửa xả phụ thuộc cột nước tương tự.",
    assumptions:
      "Mặt thoáng nằm ngang; quy luật lỗ giả ổn định Q = Cd a √(2gh); diện tích mặt bằng bể A không đổi; bỏ qua dòng vào.",
    engineeringNote:
      "Với bể thuôn thay A bằng A(h) trong tích phân; công thức thời gian lỗ dạng đóng chỉ đúng khi A không đổi.",
    equations: {
      "22.1": "Thời gian hạ mực tổng quát",
      "22.2": "Bể diện tích không đổi, xả qua lỗ",
    },
    nomenclature: {
      A: "Diện tích mặt thoáng bể",
      a: "Diện tích lỗ",
      Cd: "Hệ số lưu lượng lỗ",
      H1: "Cột nước ban đầu trên lỗ",
      H2: "Cột nước cuối trên lỗ",
      t: "Thời gian hạ mực",
    },
    schematicCaption:
      "Bể diện tích không đổi xả qua lỗ đáy/bên từ H1 đến H2.",
    examples: {
      "22.1": {
        prompt:
          "Bể trụ có A = 4.0 m². Lỗ a = 0.0020 m² với Cd = 0.60 xả từ H1 = 3.0 m đến H2 = 0.50 m. Tìm t.",
        physicalModel:
          "Diện tích mặt bằng không đổi; lỗ xả tự do; g = 9.81 m/s².",
        result: "t = 1.54×10³ s (25.7 min)",
        interpretation:
          "Phần lớn thời gian diễn ra ở cột thấp khi lưu lượng lỗ nhỏ.",
      },
      "22.2": {
        prompt:
          "Mất bao lâu để xả hết từ H1 = 3.0 m đến H2 = 0 với cùng bể và lỗ?",
        physicalModel: "Cùng quy luật lỗ; H2 → 0.",
        result: "t = 2.61×10³ s (43.4 min)",
        interpretation:
          "Nửa mét cuối để xả hết chiếm tỷ lệ lớn tổng thời gian vì √H giảm chậm gần không.",
      },
    },
  },
  23: {
    title: "Búa nước Joukowsky",
    scope:
      "Ước lượng xung áp tức thời do đóng van nhanh bằng quan hệ Joukowsky và tốc độ sóng âm.",
    assumptions:
      "Đóng nhanh (thời gian đóng ngắn hơn 2L/c); cột chất lỏng một chiều; ống cứng (hoặc thay K bằng mô đun khối hiệu dụng nếu đàn hồi ống quan trọng); khối lượng riêng ρ không đổi.",
    engineeringNote:
      "Đường ống thực ít khi cứng tuyệt đối; dùng c hiệu dụng kể đàn hồi thành ống trước khi đặt ngưỡng bảo vệ xung.",
    equations: {
      "23.1": "Tăng áp Joukowsky",
      "23.2": "Tốc độ sóng (xấp xỉ ống cứng)",
    },
    nomenclature: {
      "Δp": "Xung áp suất",
      "ρ": "Khối lượng riêng chất lỏng",
      c: "Tốc độ sóng âm",
      "ΔV": "Biến thiên vận tốc",
      K: "Mô đun khối chất lỏng",
      L: "Chiều dài ống",
    },
    schematicCaption:
      "Đóng van phát sóng áp Joukowsky ngược thượng lưu với tốc độ c.",
    examples: {
      "23.1": {
        prompt:
          "Nước (ρ = 1000 kg/m³, K = 2.2 GPa) chảy với V = 2.5 m/s trong ống cứng. Ước lượng c và Δp Joukowsky khi dừng đột ngột (ΔV = 2.5 m/s).",
        physicalModel: "Ống cứng; đóng hoàn toàn tức thời.",
        result: "c = 1.48×10³ m/s; Δp = 3.71 MPa",
        interpretation:
          "Ngay vận tốc vừa phải cũng có thể tạo xung megapascal nếu đóng đột ngột.",
      },
      "23.2": {
        prompt:
          "Với L = 800 m và c = 1483 m/s, thời gian đóng Tc phải vượt bao nhiêu để tránh toàn bộ tăng áp Joukowsky (dùng Tc > 2L/c)?",
        physicalModel: "Chu kỳ tới hạn 2L/c cho sóng đi–về.",
        result: "Tc > 1.08 s để giảm dưới Δp Joukowsky đầy đủ",
        interpretation:
          "Đóng chậm hơn khoảng 1 s ở đây cho phép giảm nhờ sóng phản xạ; vẫn nên kiểm bằng mô hình tạm thời cho đường quan trọng.",
      },
    },
  },
  24: {
    title: "Thấm theo định luật Darcy",
    scope:
      "Áp dụng định luật Darcy để tính lưu lượng thấm và phân biệt lưu tốc riêng với vận tốc thấm trong lỗ rỗng.",
    assumptions:
      "Thấm tầng trong môi trường xốp bão hòa; hệ số thấm k đẳng hướng, đồng nhất; dòng trung bình một chiều; độ rỗng n không đổi.",
    engineeringNote:
      "Lọc và thoát nước được kích thước theo vận tốc xả vd = k|i|; thời gian di chuyển chất ô nhiễm dùng vận tốc thấm lớn hơn vs = vd/n.",
    equations: {
      "24.1": "Lưu lượng Darcy",
      "24.2": "Gradient thủy lực",
      "24.3": "Vận tốc thấm so với vận tốc xả",
    },
    nomenclature: {
      q: "Lưu lượng thấm",
      k: "Hệ số thấm",
      i: "Gradient thủy lực",
      A: "Diện tích mặt cắt tổng",
      vd: "Vận tốc xả (Darcy) q/A",
      vs: "Vận tốc thấm (trong lỗ rỗng)",
      n: "Độ rỗng",
      h: "Cột đo áp (piezometric)",
      L: "Chiều dài đường dòng",
    },
    schematicCaption:
      "Mẫu xốp với sụt cột Δh trên chiều dài L, thể hiện lưu lượng Darcy qua diện tích tổng A.",
    examples: {
      "24.1": {
        prompt:
          "Lớp cát có k = 5.0×10⁻⁴ m/s. Cột nước giảm 1.2 m trên L = 8.0 m qua A = 3.0 m². Tìm i, vd và q (lấy độ lớn lưu lượng).",
        physicalModel:
          "Thấm bão hòa 1-D đều; i = Δh/L.",
        result: "i = 0.15; vd = 7.5×10⁻⁵ m/s; q = 2.25×10⁻⁴ m³/s",
        interpretation:
          "Gradient nhỏ vẫn chuyển thể tích đáng kể qua diện tích lớn ở đập và tầng chứa nước.",
      },
      "24.2": {
        prompt:
          "Nếu độ rỗng n = 0.35, vận tốc thấm vs tương ứng với vd = 7.5×10⁻⁵ m/s là bao nhiêu?",
        physicalModel:
          "Vận tốc trong lỗ rỗng chỉ qua phần lỗ.",
        result: "vs = 2.14×10⁻⁴ m/s",
        interpretation:
          "Vận tốc thấm khoảng 2.9× vận tốc Darcy ở đây, rút ngắn ước lượng thời gian di chuyển tương ứng.",
      },
    },
  },
};
