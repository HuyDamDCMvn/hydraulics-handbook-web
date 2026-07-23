import type { Chapter } from "@/content/types";

export const part2Chapters: Chapter[] = [
  {
    id: 13,
    slug: "linear-momentum-and-force-at-bends-or-jets",
    title: "Linear momentum and force at bends or jets",
    theme: "momentum",
    equations: [
      {
        id: "13.1",
        latex:
          "\\sum \\vec{F} = \\rho Q(\\vec{V}_{\\mathrm{out}} - \\vec{V}_{\\mathrm{in}})",
        label: "Steady control-volume momentum",
      },
      {
        id: "13.2",
        latex:
          "F_x = \\rho Q(V_{\\mathrm{out},x} - V_{\\mathrm{in},x})",
        label: "x-component force on fluid",
      },
      {
        id: "13.3",
        latex:
          "F_y = \\rho Q(V_{\\mathrm{out},y} - V_{\\mathrm{in},y})",
        label: "y-component force on fluid",
      },
      {
        id: "13.4",
        latex:
          "\\vec{R}_{\\mathrm{vane}} = -\\vec{F}_{\\mathrm{fluid}}",
        label: "Force on vane or bend (reaction)",
      },
    ],
    scope:
      "Compute resultant forces on pipe bends, deflectors, and vanes from steady linear momentum using a fixed control volume.",
    assumptions:
      "Steady incompressible flow; uniform inlet and outlet velocity profiles; atmospheric pressure on free jets; neglect body forces in the horizontal plane unless stated.",
    nomenclature: [
      { symbol: "ρ", meaning: "Fluid density", unit: "kg/m³" },
      { symbol: "Q", meaning: "Volume discharge", unit: "m³/s" },
      { symbol: "V", meaning: "Mean velocity", unit: "m/s" },
      { symbol: "F", meaning: "Force on fluid from boundaries", unit: "N" },
      { symbol: "R", meaning: "Reaction force on structure", unit: "N" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-13.svg",
      caption:
        "Control volume at a pipe bend or jet vane showing inlet and outlet momentum flux vectors.",
    },
    engineeringNote:
      "Anchor and thrust blocks must resist the reaction on the bend; include pressure forces on pipe walls when the control surface cuts through pressurized sections.",
    examples: [
      {
        id: "13.1",
        prompt:
          "A free water jet of Q = 0.020 m³/s and V = 20 m/s strikes a fixed vane and is deflected 90° with the same speed. Find the magnitude of the force on the vane.",
        physicalModel:
          "Fixed control volume enclosing the deflection; atmospheric pressure on the free surfaces; Vin = 20 î m/s, Vout = 20 ĵ m/s.",
        governingEquation:
          "ΣF = ρQ(Vout − Vin); R_vane = −F_fluid",
        substitution:
          "ρ = 1000 kg/m³; Fx = 1000×0.020×(0−20) = −400 N; Fy = 1000×0.020×(20−0) = 400 N; |R| = √(400²+400²)",
        result: "|R| = 566 N on the vane (toward −x and −y relative to the fluid-force components)",
        interpretation:
          "The vane must provide equal and opposite components to change the jet momentum through a right-angle turn.",
      },
      {
        id: "13.2",
        prompt:
          "Water flows at Q = 0.050 m³/s through a 180° horizontal return bend with D = 100 mm. Inlet and outlet pressures are atmospheric (free discharge). Estimate the axial force on the bend.",
        physicalModel:
          "Control volume around the bend; Vin = Vout = V = Q/A along ±x; pressure forces negligible on free ends.",
        governingEquation:
          "Fx = ρQ(Vout,x − Vin,x) = ρQ(−V − V) = −2ρQV",
        substitution:
          "A = π(0.05)² = 0.007854 m²; V = 0.050/0.007854 = 6.366 m/s; Fx = −2×1000×0.050×6.366 = −636.6 N",
        result: "Fx = −637 N (fluid force); bend reaction Rx = +637 N along the inlet axis",
        interpretation:
          "A 180° turn roughly doubles the momentum change relative to a simple stop, so anchorage must resist about 2ρQV.",
      },
    ],
  },
  {
    id: 14,
    slug: "pump-head-and-power",
    title: "Pump head and power",
    theme: "momentum",
    equations: [
      {
        id: "14.1",
        latex:
          "H = \\left(\\frac{p}{\\gamma} + \\frac{V^{2}}{2g} + z\\right)_{d} - \\left(\\frac{p}{\\gamma} + \\frac{V^{2}}{2g} + z\\right)_{s} + h_{L}",
        label: "Pump total head (delivery minus suction, plus losses)",
      },
      {
        id: "14.2",
        latex: "P = \\frac{\\rho g Q H}{\\eta}",
        label: "Shaft power",
      },
      {
        id: "14.3",
        latex: "P_{\\mathrm{w}} = \\rho g Q H",
        label: "Water (hydraulic) power",
      },
    ],
    scope:
      "Define pump total head from suction and delivery energy grades and relate hydraulic and shaft power through efficiency.",
    assumptions:
      "Incompressible liquid; steady mean flow; η is overall pump efficiency; losses between gauge taps included in h_L as defined by the measurement locations.",
    nomenclature: [
      { symbol: "H", meaning: "Pump total head", unit: "m" },
      { symbol: "p", meaning: "Pressure", unit: "Pa" },
      { symbol: "γ", meaning: "Specific weight ρg", unit: "N/m³" },
      { symbol: "z", meaning: "Elevation of gauge plane", unit: "m" },
      { symbol: "h_L", meaning: "Head losses between sections", unit: "m" },
      { symbol: "η", meaning: "Pump efficiency", unit: "—" },
      { symbol: "P", meaning: "Shaft power", unit: "W" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-14.svg",
      caption:
        "Pump with suction (s) and delivery (d) gauge planes, elevations, and energy grade lines.",
    },
    engineeringNote:
      "Always report whether H includes only the machine or also piping losses between chosen stations; mismatched stations are a common cause of field–catalog disagreement.",
    examples: [
      {
        id: "14.1",
        prompt:
          "A pump delivers Q = 0.030 m³/s of water. Suction gauge: ps = −20 kPa at zs = 0; delivery: pd = 250 kPa at zd = 1.2 m. Diameters equal so Vd = Vs. Neglect losses between gauges. Find H.",
        physicalModel:
          "Same pipe diameter on both sides; γ = 9810 N/m³; velocity heads cancel.",
        governingEquation:
          "H = (pd/γ + zd) − (ps/γ + zs)",
        substitution:
          "pd/γ = 250000/9810 = 25.48 m; ps/γ = −20000/9810 = −2.039 m; H = (25.48+1.2) − (−2.039+0)",
        result: "H = 28.7 m",
        interpretation:
          "Even a vacuum on the suction side contributes positively to the required pump head.",
      },
      {
        id: "14.2",
        prompt:
          "For H = 28.7 m, Q = 0.030 m³/s, and η = 0.72, find the required shaft power.",
        physicalModel:
          "Water at ρ = 1000 kg/m³; overall efficiency 72%.",
        governingEquation: "P = ρgQH/η",
        substitution:
          "P = 1000×9.81×0.030×28.7 / 0.72 = 11730 W",
        result: "P = 11.7 kW",
        interpretation:
          "Catalog motor sizing should exceed this shaft power after service-factor and drive losses.",
      },
    ],
  },
  {
    id: 15,
    slug: "pump-affinity-laws",
    title: "Pump affinity laws",
    theme: "momentum",
    equations: [
      {
        id: "15.1",
        latex: "\\frac{Q_{2}}{Q_{1}} = \\frac{n_{2}}{n_{1}}",
        label: "Discharge affinity (fixed diameter)",
      },
      {
        id: "15.2",
        latex: "\\frac{H_{2}}{H_{1}} = \\left(\\frac{n_{2}}{n_{1}}\\right)^{2}",
        label: "Head affinity",
      },
      {
        id: "15.3",
        latex: "\\frac{P_{2}}{P_{1}} = \\left(\\frac{n_{2}}{n_{1}}\\right)^{3}",
        label: "Power affinity",
      },
    ],
    scope:
      "Scale pump performance between similar operating speeds for geometrically similar machines of fixed impeller diameter.",
    assumptions:
      "Dynamic similarity; same fluid; negligible Reynolds-number and compressibility effects; efficiency approximately constant over the speed change.",
    nomenclature: [
      { symbol: "n", meaning: "Rotational speed", unit: "rev/s or rpm" },
      { symbol: "Q", meaning: "Discharge", unit: "m³/s" },
      { symbol: "H", meaning: "Head", unit: "m" },
      { symbol: "P", meaning: "Power", unit: "W" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-15.svg",
      caption:
        "Homologous pump curves showing Q∝n, H∝n², and P∝n³ between similar duty points.",
    },
    engineeringNote:
      "Affinity laws are first-order estimates; verify NPSH and efficiency at the new speed before committing to a VFD schedule.",
    examples: [
      {
        id: "15.1",
        prompt:
          "A pump at n1 = 1450 rpm delivers Q1 = 0.040 m³/s against H1 = 32 m. Estimate Q2 and H2 at n2 = 1750 rpm.",
        physicalModel:
          "Fixed impeller diameter; homologous duty points.",
        governingEquation:
          "Q2/Q1 = n2/n1; H2/H1 = (n2/n1)²",
        substitution:
          "n2/n1 = 1750/1450 = 1.207; Q2 = 0.040×1.207 = 0.0483 m³/s; H2 = 32×(1.207)² = 46.6 m",
        result: "Q2 = 0.0483 m³/s; H2 = 46.6 m",
        interpretation:
          "A 21% speed increase raises head by about 46%, which can overload a fixed system curve if not checked.",
      },
      {
        id: "15.2",
        prompt:
          "At n1 the shaft power is P1 = 15 kW. Estimate P2 at the same speed ratio n2/n1 = 1.207.",
        physicalModel:
          "Affinity power scaling with roughly constant efficiency.",
        governingEquation: "P2/P1 = (n2/n1)³",
        substitution:
          "P2 = 15×(1.207)³ = 15×1.757 = 26.4 kW",
        result: "P2 = 26.4 kW",
        interpretation:
          "Motor and cable sizing must follow the cubic power rise, not the linear speed change.",
      },
    ],
  },
  {
    id: 16,
    slug: "npsh-and-cavitation",
    title: "NPSH and cavitation",
    theme: "momentum",
    equations: [
      {
        id: "16.1",
        latex:
          "\\mathrm{NPSH}_{a} = \\frac{p_{\\mathrm{atm}} - p_{v}}{\\gamma} + z_{s} - h_{Ls}",
        label: "Available net positive suction head",
      },
      {
        id: "16.2",
        latex: "\\mathrm{NPSH}_{a} > \\mathrm{NPSH}_{r}",
        label: "Cavitation-free criterion",
      },
    ],
    scope:
      "Evaluate available NPSH at the pump inlet and compare with the required NPSH to avoid cavitation.",
    assumptions:
      "Liquid at known vapor pressure; zs measured from pump centerline (positive if free surface above); h_Ls includes suction friction and entrance losses to the impeller eye reference.",
    nomenclature: [
      { symbol: "NPSHa", meaning: "Available NPSH", unit: "m" },
      { symbol: "NPSHr", meaning: "Required NPSH (catalog)", unit: "m" },
      { symbol: "p_atm", meaning: "Atmospheric pressure", unit: "Pa" },
      { symbol: "p_v", meaning: "Vapor pressure", unit: "Pa" },
      { symbol: "z_s", meaning: "Suction static lift/submergence", unit: "m" },
      { symbol: "h_Ls", meaning: "Suction-line head loss", unit: "m" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-16.svg",
      caption:
        "Open sump, suction pipe losses, and pump centerline used to form NPSHa.",
    },
    engineeringNote:
      "Hot fluids and long suction lines shrink NPSHa quickly; raise submergence or shorten suction piping before blaming the pump.",
    examples: [
      {
        id: "16.1",
        prompt:
          "Water at 20 °C (pv = 2.34 kPa) is pumped from an open tank. Free surface is 2.5 m above the pump centerline; suction losses h_Ls = 1.1 m; patm = 101.3 kPa. Find NPSHa.",
        physicalModel:
          "Open tank; γ = 9810 N/m³; zs = +2.5 m (flooded suction).",
        governingEquation:
          "NPSHa = (patm − pv)/γ + zs − h_Ls",
        substitution:
          "(101300−2340)/9810 = 10.09 m; NPSHa = 10.09 + 2.5 − 1.1",
        result: "NPSHa = 11.5 m",
        interpretation:
          "Flooded suction provides a comfortable margin for many cold-water pumps.",
      },
      {
        id: "16.2",
        prompt:
          "If NPSHr = 4.0 m for the duty point, is the installation acceptable? What is the margin?",
        physicalModel:
          "Compare available and required NPSH with a typical plant margin.",
        governingEquation: "NPSHa > NPSHr",
        substitution: "Margin = 11.5 − 4.0 = 7.5 m",
        result: "Acceptable; margin = 7.5 m",
        interpretation:
          "Keep at least 0.5–1 m margin in practice; here the margin is ample.",
      },
    ],
  },
  {
    id: 17,
    slug: "hydraulic-radius-manning-and-chezy",
    title: "Hydraulic radius, Manning, and Chezy",
    theme: "channel",
    equations: [
      {
        id: "17.1",
        latex: "R_{h} = \\frac{A}{P}",
        label: "Hydraulic radius",
      },
      {
        id: "17.2",
        latex: "V = \\frac{1}{n} R_{h}^{2/3} S^{1/2}",
        label: "Manning formula (SI)",
      },
      {
        id: "17.3",
        latex: "V = C\\sqrt{R_{h} S}",
        label: "Chezy formula",
      },
    ],
    scope:
      "Compute uniform-flow velocity and discharge in open channels using hydraulic radius with Manning or Chezy resistance.",
    assumptions:
      "Steady uniform flow; constant bed slope S ≈ Sf; prismatic section; Manning n representative of the boundary.",
    nomenclature: [
      { symbol: "A", meaning: "Flow area", unit: "m²" },
      { symbol: "P", meaning: "Wetted perimeter", unit: "m" },
      { symbol: "Rh", meaning: "Hydraulic radius", unit: "m" },
      { symbol: "n", meaning: "Manning roughness", unit: "s/m¹ᐟ³" },
      { symbol: "S", meaning: "Bed (friction) slope", unit: "—" },
      { symbol: "C", meaning: "Chezy coefficient", unit: "m¹ᐟ²/s" },
      { symbol: "V", meaning: "Mean velocity", unit: "m/s" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-17.svg",
      caption:
        "Channel cross-section with area A, wetted perimeter P, and uniform-flow free surface.",
    },
    engineeringNote:
      "Manning n uncertainty often dominates design; check sensitivity and prefer site-calibrated n for critical conveyance.",
    examples: [
      {
        id: "17.1",
        prompt:
          "A rectangular channel is 3.0 m wide with depth y = 1.2 m, S = 0.001, and n = 0.015. Find Rh, V, and Q.",
        physicalModel:
          "Prismatic rectangle; uniform flow; SI Manning.",
        governingEquation:
          "Rh = A/P; V = (1/n) Rh^(2/3) S^(1/2); Q = VA",
        substitution:
          "A = 3.0×1.2 = 3.6 m²; P = 3.0+2×1.2 = 5.4 m; Rh = 0.6667 m; V = (1/0.015)×(0.6667)^(2/3)×√0.001 = 1.607 m/s; Q = 5.79 m³/s",
        result: "Rh = 0.667 m; V = 1.61 m/s; Q = 5.79 m³/s",
        interpretation:
          "Conveyance scales strongly with Rh^(2/3), so deepening or widening both raise capacity.",
      },
      {
        id: "17.2",
        prompt:
          "Using the same Rh and S, find the Chezy C that matches the Manning velocity V = 1.61 m/s.",
        physicalModel:
          "Equate Chezy and Manning velocities for the same section.",
        governingEquation: "V = C√(Rh S) ⇒ C = V/√(Rh S)",
        substitution:
          "√(Rh S) = √(0.6667×0.001) = 0.02582; C = 1.61/0.02582 = 62.4",
        result: "C = 62.4 m¹ᐟ²/s",
        interpretation:
          "Reporting C (or n) consistently avoids mixing resistance formulas from different eras of standards.",
      },
    ],
  },
  {
    id: 18,
    slug: "rectangular-and-trapezoidal-channel-geometry",
    title: "Rectangular and trapezoidal channel geometry",
    theme: "channel",
    equations: [
      {
        id: "18.1",
        latex: "A = by,\\quad P = b + 2y,\\quad R_{h} = \\frac{by}{b+2y}",
        label: "Rectangle of width b and depth y",
      },
      {
        id: "18.2",
        latex:
          "A = (b + zy)y,\\quad P = b + 2y\\sqrt{1+z^{2}},\\quad R_{h} = A/P",
        label: "Trapezoid with side slope z (H:V)",
      },
    ],
    scope:
      "Form area, wetted perimeter, and hydraulic radius for rectangular and trapezoidal open-channel sections.",
    assumptions:
      "Level free surface across the section; vertical depth y; straight side slopes; no freeboard in the geometric definition of A and P.",
    nomenclature: [
      { symbol: "b", meaning: "Bottom width", unit: "m" },
      { symbol: "y", meaning: "Flow depth", unit: "m" },
      { symbol: "z", meaning: "Side slope (horizontal:vertical)", unit: "—" },
      { symbol: "A", meaning: "Flow area", unit: "m²" },
      { symbol: "P", meaning: "Wetted perimeter", unit: "m" },
      { symbol: "Rh", meaning: "Hydraulic radius", unit: "m" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-18.svg",
      caption:
        "Rectangular and trapezoidal sections annotated with b, y, and side slope z.",
    },
    engineeringNote:
      "Trapezoidal banks improve stability but add wet perimeter; optimize z and b together for minimum excavation at a target Q.",
    examples: [
      {
        id: "18.1",
        prompt:
          "For a rectangle with b = 4.0 m and y = 1.5 m, compute A, P, and Rh.",
        physicalModel: "Prismatic rectangular channel.",
        governingEquation: "A = by; P = b+2y; Rh = A/P",
        substitution:
          "A = 4.0×1.5 = 6.0 m²; P = 4.0+3.0 = 7.0 m; Rh = 6.0/7.0 = 0.857 m",
        result: "A = 6.00 m²; P = 7.00 m; Rh = 0.857 m",
        interpretation:
          "For wide channels Rh approaches y; here the side walls still reduce Rh below the depth.",
      },
      {
        id: "18.2",
        prompt:
          "A trapezoid has b = 2.0 m, y = 1.5 m, and z = 1.5 (H:V). Find A, P, and Rh.",
        physicalModel: "Symmetric trapezoidal prismatic channel.",
        governingEquation:
          "A = (b+zy)y; P = b+2y√(1+z²); Rh = A/P",
        substitution:
          "A = (2.0+1.5×1.5)×1.5 = 6.375 m²; √(1+2.25) = 1.803; P = 2.0+2×1.5×1.803 = 7.409 m; Rh = 0.860 m",
        result: "A = 6.38 m²; P = 7.41 m; Rh = 0.860 m",
        interpretation:
          "Compared with a 4 m rectangle of similar area, the trapezoid trades top width for bank slopes while Rh stays similar.",
      },
    ],
  },
  {
    id: 19,
    slug: "specific-energy-froude-critical-depth",
    title: "Specific energy, Froude, and critical depth",
    theme: "channel",
    equations: [
      {
        id: "19.1",
        latex: "E = y + \\frac{V^{2}}{2g}",
        label: "Specific energy",
      },
      {
        id: "19.2",
        latex: "Fr = \\frac{V}{\\sqrt{gy}}",
        label: "Froude number (rectangular)",
      },
      {
        id: "19.3",
        latex: "y_{c} = \\left(\\frac{q^{2}}{g}\\right)^{1/3}",
        label: "Critical depth (rectangle, unit width)",
      },
      {
        id: "19.4",
        latex: "y_{c} = \\left(\\frac{Q^{2}}{gb^{2}}\\right)^{1/3}",
        label: "Critical depth for rectangle of width b",
      },
    ],
    scope:
      "Relate depth, velocity, and specific energy; classify subcritical/supercritical flow; and locate critical depth for rectangular channels.",
    assumptions:
      "Hydrostatic pressure distribution; horizontal channel bed for specific-energy definition; rectangular section for the closed-form yc expressions given.",
    nomenclature: [
      { symbol: "E", meaning: "Specific energy", unit: "m" },
      { symbol: "y", meaning: "Depth", unit: "m" },
      { symbol: "V", meaning: "Mean velocity", unit: "m/s" },
      { symbol: "Fr", meaning: "Froude number", unit: "—" },
      { symbol: "q", meaning: "Unit discharge Q/b", unit: "m²/s" },
      { symbol: "yc", meaning: "Critical depth", unit: "m" },
      { symbol: "g", meaning: "Gravity", unit: "m/s²" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-19.svg",
      caption:
        "Specific-energy diagram with subcritical and supercritical limbs meeting at critical depth.",
    },
    engineeringNote:
      "Near Fr ≈ 1, small bed or width changes produce large depth responses; avoid lingering near critical depth in long reaches.",
    examples: [
      {
        id: "19.1",
        prompt:
          "A rectangular channel of width b = 2.0 m carries Q = 4.0 m³/s at y = 1.0 m. Compute V, E, and Fr.",
        physicalModel: "Rectangular prismatic channel; g = 9.81 m/s².",
        governingEquation:
          "V = Q/(by); E = y+V²/(2g); Fr = V/√(gy)",
        substitution:
          "V = 4.0/(2.0×1.0) = 2.0 m/s; E = 1.0 + 2.0²/(2×9.81) = 1.204 m; Fr = 2.0/√9.81 = 0.638",
        result: "V = 2.00 m/s; E = 1.20 m; Fr = 0.638 (subcritical)",
        interpretation:
          "Fr < 1 indicates subcritical flow controlled from downstream.",
      },
      {
        id: "19.2",
        prompt:
          "For the same Q and b, find the critical depth yc.",
        physicalModel: "Rectangle; unit discharge q = Q/b.",
        governingEquation: "yc = (q²/g)^(1/3)",
        substitution:
          "q = 4.0/2.0 = 2.0 m²/s; yc = (4.0/9.81)^(1/3) = 0.742 m",
        result: "yc = 0.742 m",
        interpretation:
          "The actual depth 1.0 m exceeds yc, consistent with Fr < 1 and E above the critical minimum.",
      },
    ],
  },
  {
    id: 20,
    slug: "hydraulic-jump-rectangular",
    title: "Hydraulic jump in a rectangular channel",
    theme: "channel",
    equations: [
      {
        id: "20.1",
        latex:
          "\\frac{y_{2}}{y_{1}} = \\tfrac{1}{2}\\left(-1 + \\sqrt{1 + 8Fr_{1}^{2}}\\right)",
        label: "Sequent depth ratio",
      },
      {
        id: "20.2",
        latex: "Fr_{1} = \\frac{V_{1}}{\\sqrt{gy_{1}}}",
        label: "Approach Froude number",
      },
    ],
    scope:
      "Predict the conjugate (sequent) depth after a hydraulic jump in a horizontal rectangular channel from the upstream Froude number.",
    assumptions:
      "Horizontal frictionless control volume for momentum; rectangular prismatic section; hydrostatic pressure at sections 1 and 2; steady discharge.",
    nomenclature: [
      { symbol: "y1", meaning: "Supercritical approach depth", unit: "m" },
      { symbol: "y2", meaning: "Subcritical sequent depth", unit: "m" },
      { symbol: "V1", meaning: "Approach velocity", unit: "m/s" },
      { symbol: "Fr1", meaning: "Approach Froude number", unit: "—" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-20.svg",
      caption:
        "Hydraulic jump from supercritical depth y1 to sequent depth y2 with roller.",
    },
    engineeringNote:
      "Jumps dissipate energy efficiently for Fr1 roughly 4.5–9; outside that band expect undular or rough jumps and check basin length.",
    examples: [
      {
        id: "20.1",
        prompt:
          "Water approaches a jump at y1 = 0.40 m and V1 = 6.0 m/s in a wide rectangular channel. Find Fr1 and y2.",
        physicalModel:
          "Horizontal rectangular channel; g = 9.81 m/s².",
        governingEquation:
          "Fr1 = V1/√(gy1); y2/y1 = 0.5(−1+√(1+8Fr1²))",
        substitution:
          "Fr1 = 6.0/√(9.81×0.40) = 3.03; √(1+8×3.03²) = 8.66; y2/y1 = 0.5(−1+8.66) = 3.83; y2 = 1.53 m",
        result: "Fr1 = 3.03; y2 = 1.53 m",
        interpretation:
          "A moderate jump roughly quadruples depth, converting kinetic head into a deeper subcritical pool.",
      },
      {
        id: "20.2",
        prompt:
          "For the same jump, estimate the energy loss ΔE = E1 − E2.",
        physicalModel:
          "Specific energies at conjugate depths with V2 = V1 y1/y2.",
        governingEquation:
          "E = y + V²/(2g); V2 = V1(y1/y2)",
        substitution:
          "V2 = 6.0×0.40/1.53 = 1.57 m/s; E1 = 0.40+6.0²/(2×9.81) = 2.235 m; E2 = 1.53+1.57²/(2×9.81) = 1.656 m; ΔE = 0.579 m",
        result: "ΔE = 0.579 m",
        interpretation:
          "About 0.58 m of head is dissipated in turbulence—useful for stilling-basin design.",
      },
    ],
  },
  {
    id: 21,
    slug: "sharp-crested-weir",
    title: "Sharp-crested weir",
    theme: "channel",
    equations: [
      {
        id: "21.1",
        latex:
          "Q = C_{d}\\,\\frac{2}{3}\\sqrt{2g}\\, L H^{3/2}",
        label: "Rectangular sharp-crested weir",
      },
      {
        id: "21.2",
        latex: "Q = C_{d}\\,\\frac{8}{15}\\sqrt{2g}\\, \\tan\\!\\left(\\tfrac{\\theta}{2}\\right) H^{5/2}",
        label: "Triangular (V-notch) weir",
      },
    ],
    scope:
      "Estimate free discharge over a rectangular sharp-crested weir from head on the crest and an empirical discharge coefficient.",
    assumptions:
      "Fully ventilated nappe; approach velocity negligible or absorbed in Cd; crest length L fully contracted or accounted for in Cd; steady free overflow.",
    nomenclature: [
      { symbol: "Q", meaning: "Discharge", unit: "m³/s" },
      { symbol: "Cd", meaning: "Discharge coefficient", unit: "—" },
      { symbol: "L", meaning: "Crest length", unit: "m" },
      { symbol: "H", meaning: "Head above crest", unit: "m" },
      { symbol: "g", meaning: "Gravity", unit: "m/s²" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-21.svg",
      caption:
        "Sharp-crested rectangular weir with head H measured upstream of the drawdown.",
    },
    engineeringNote:
      "Measure H upstream where the surface is essentially level; head measured on the crest itself under-reads because of drawdown.",
    examples: [
      {
        id: "21.1",
        prompt:
          "A rectangular weir has L = 1.20 m, H = 0.25 m, and Cd = 0.62. Compute Q.",
        physicalModel:
          "Sharp-crested free overflow; g = 9.81 m/s².",
        governingEquation:
          "Q = Cd (2/3) √(2g) L H^(3/2)",
        substitution:
          "√(2g) = 4.429; (2/3)×4.429 = 2.953; H^(3/2) = 0.125; Q = 0.62×2.953×1.20×0.125 = 0.275 m³/s",
        result: "Q = 0.275 m³/s",
        interpretation:
          "Discharge scales with H^(3/2), so small head errors produce larger flow errors.",
      },
      {
        id: "21.2",
        prompt:
          "If the same weir must pass Q = 0.40 m³/s with Cd = 0.62 and L = 1.20 m, what head H is required?",
        physicalModel: "Invert the weir equation for H.",
        governingEquation:
          "H = [Q / (Cd (2/3) √(2g) L)]^(2/3)",
        substitution:
          "Denom = 0.62×2.953×1.20 = 2.197; Q/Denom = 0.1821; H = (0.1821)^(2/3) = 0.321 m",
        result: "H = 0.321 m",
        interpretation:
          "Raising head from 0.25 m to 0.32 m increases capacity by about 45% through the 3/2-power law.",
      },
    ],
  },
  {
    id: 22,
    slug: "tank-drawdown-time",
    title: "Tank drawdown time",
    theme: "unsteady",
    equations: [
      {
        id: "22.1",
        latex: "t = \\int_{H_{1}}^{H_{2}} \\frac{A(h)}{-Q(h)}\\,\\mathrm{d}h",
        label: "General drawdown time",
      },
      {
        id: "22.2",
        latex:
          "t = \\frac{2A}{C_{d} a \\sqrt{2g}}\\left(\\sqrt{H_{1}} - \\sqrt{H_{2}}\\right)",
        label: "Constant-area tank, orifice outflow",
      },
    ],
    scope:
      "Integrate continuity for variable head draining through an orifice or similar head-dependent outlet.",
    assumptions:
      "Horizontal free surface; quasi-steady orifice law Q = Cd a √(2gh); constant tank plan area A; neglect inflow.",
    nomenclature: [
      { symbol: "A", meaning: "Tank free-surface area", unit: "m²" },
      { symbol: "a", meaning: "Orifice area", unit: "m²" },
      { symbol: "Cd", meaning: "Orifice discharge coefficient", unit: "—" },
      { symbol: "H1", meaning: "Initial head above orifice", unit: "m" },
      { symbol: "H2", meaning: "Final head above orifice", unit: "m" },
      { symbol: "t", meaning: "Drawdown time", unit: "s" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-22.svg",
      caption:
        "Constant-area tank draining through a bottom/side orifice from H1 to H2.",
    },
    engineeringNote:
      "For tapered tanks replace A with A(h) inside the integral; closed-form orifice timing applies only when A is constant.",
    examples: [
      {
        id: "22.1",
        prompt:
          "A cylindrical tank has A = 4.0 m². An orifice a = 0.0020 m² with Cd = 0.60 drains from H1 = 3.0 m to H2 = 0.50 m. Find t.",
        physicalModel:
          "Constant plan area; orifice under free discharge; g = 9.81 m/s².",
        governingEquation:
          "t = (2A/(Cd a √(2g)))(√H1 − √H2)",
        substitution:
          "√(2g) = 4.429; Cd a √(2g) = 0.60×0.0020×4.429 = 0.005315; 2A/… = 1505; √3−√0.5 = 1.025; t = 1543 s",
        result: "t = 1.54×10³ s (25.7 min)",
        interpretation:
          "Most of the time is spent at low head when the orifice discharge is small.",
      },
      {
        id: "22.2",
        prompt:
          "How long to empty completely from H1 = 3.0 m to H2 = 0 with the same tank and orifice?",
        physicalModel: "Same orifice law; H2 → 0.",
        governingEquation:
          "t = (2A/(Cd a √(2g)))√H1",
        substitution:
          "t = 1505×√3.0 = 1505×1.732 = 2607 s",
        result: "t = 2.61×10³ s (43.4 min)",
        interpretation:
          "The last half-metre to empty adds a large fraction of the total time because √H vanishes slowly near zero.",
      },
    ],
  },
  {
    id: 23,
    slug: "joukowsky-water-hammer",
    title: "Joukowsky water hammer",
    theme: "unsteady",
    equations: [
      {
        id: "23.1",
        latex: "\\Delta p = \\rho c \\Delta V",
        label: "Joukowsky pressure rise",
      },
      {
        id: "23.2",
        latex: "c = \\sqrt{\\frac{K}{\\rho}}",
        label: "Wave speed (rigid-pipe approximation)",
      },
    ],
    scope:
      "Estimate the instantaneous pressure surge from rapid valve closure using the Joukowsky relation and an acoustic wave speed.",
    assumptions:
      "Rapid closure (closure time shorter than 2L/c); one-dimensional liquid column; rigid pipe (or K replaced by an effective bulk modulus if pipe elasticity matters); liquid density ρ constant.",
    nomenclature: [
      { symbol: "Δp", meaning: "Pressure surge", unit: "Pa" },
      { symbol: "ρ", meaning: "Liquid density", unit: "kg/m³" },
      { symbol: "c", meaning: "Acoustic wave speed", unit: "m/s" },
      { symbol: "ΔV", meaning: "Velocity change", unit: "m/s" },
      { symbol: "K", meaning: "Liquid bulk modulus", unit: "Pa" },
      { symbol: "L", meaning: "Pipe length", unit: "m" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-23.svg",
      caption:
        "Valve closure launching a Joukowsky pressure wave upstream at speed c.",
    },
    engineeringNote:
      "Real pipelines are rarely rigid; use an effective c that includes pipe wall elasticity before setting surge-relief setpoints.",
    examples: [
      {
        id: "23.1",
        prompt:
          "Water (ρ = 1000 kg/m³, K = 2.2 GPa) flows at V = 2.5 m/s in a rigid pipe. Estimate c and the Joukowsky Δp for sudden stoppage (ΔV = 2.5 m/s).",
        physicalModel: "Rigid conduit; instantaneous full closure.",
        governingEquation: "c = √(K/ρ); Δp = ρ c ΔV",
        substitution:
          "c = √(2.2e9/1000) = 1483 m/s; Δp = 1000×1483×2.5 = 3.71×10⁶ Pa",
        result: "c = 1.48×10³ m/s; Δp = 3.71 MPa",
        interpretation:
          "Even modest velocities can produce megapascal surges if closure is abrupt.",
      },
      {
        id: "23.2",
        prompt:
          "For L = 800 m and c = 1483 m/s, what closure time Tc must be exceeded to avoid the full Joukowsky rise (use Tc > 2L/c)?",
        physicalModel: "Critical period 2L/c for round-trip wave travel.",
        governingEquation: "T_crit = 2L/c",
        substitution: "T_crit = 2×800/1483 = 1.08 s",
        result: "Tc > 1.08 s to reduce below the full Joukowsky Δp",
        interpretation:
          "Closures slower than about 1 s here allow relief from reflected waves; still verify with a transient model for important lines.",
      },
    ],
  },
  {
    id: 24,
    slug: "darcy-law-seepage",
    title: "Darcy law seepage",
    theme: "unsteady",
    equations: [
      {
        id: "24.1",
        latex: "q = -k i A",
        label: "Darcy discharge",
      },
      {
        id: "24.2",
        latex: "i = \\frac{\\mathrm{d}h}{\\mathrm{d}L}",
        label: "Hydraulic gradient",
      },
      {
        id: "24.3",
        latex: "v_{s} = \\frac{q}{nA} = \\frac{v_{d}}{n}",
        label: "Seepage vs discharge velocity",
      },
    ],
    scope:
      "Apply Darcy’s law to compute seepage discharge and distinguish specific discharge from interstitial seepage velocity.",
    assumptions:
      "Laminar seepage in saturated porous media; isotropic homogeneous hydraulic conductivity k; one-dimensional mean flow; porosity n constant.",
    nomenclature: [
      { symbol: "q", meaning: "Seepage discharge", unit: "m³/s" },
      { symbol: "k", meaning: "Hydraulic conductivity", unit: "m/s" },
      { symbol: "i", meaning: "Hydraulic gradient", unit: "—" },
      { symbol: "A", meaning: "Gross cross-sectional area", unit: "m²" },
      { symbol: "vd", meaning: "Discharge (Darcy) velocity q/A", unit: "m/s" },
      { symbol: "vs", meaning: "Seepage (interstitial) velocity", unit: "m/s" },
      { symbol: "n", meaning: "Porosity", unit: "—" },
      { symbol: "h", meaning: "Piezometric head", unit: "m" },
      { symbol: "L", meaning: "Flow-path length", unit: "m" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-24.svg",
      caption:
        "Porous sample with head drop Δh over length L, showing Darcy discharge through gross area A.",
    },
    engineeringNote:
      "Filters and drains are sized on discharge velocity vd = k|i|; contaminant travel time uses the larger seepage velocity vs = vd/n.",
    examples: [
      {
        id: "24.1",
        prompt:
          "A sand layer has k = 5.0×10⁻⁴ m/s. Head drops 1.2 m over L = 8.0 m through A = 3.0 m². Find i, vd, and q (take the magnitude of discharge).",
        physicalModel:
          "Uniform 1-D saturated seepage; i = Δh/L.",
        governingEquation: "i = Δh/L; vd = k|i|; q = vd A",
        substitution:
          "i = 1.2/8.0 = 0.15; vd = 5.0e-4×0.15 = 7.5×10⁻⁵ m/s; q = 7.5e-5×3.0 = 2.25×10⁻⁴ m³/s",
        result: "i = 0.15; vd = 7.5×10⁻⁵ m/s; q = 2.25×10⁻⁴ m³/s",
        interpretation:
          "Small gradients still move measurable volumes through large areas in dams and aquifers.",
      },
      {
        id: "24.2",
        prompt:
          "If porosity n = 0.35, what is the seepage velocity vs corresponding to vd = 7.5×10⁻⁵ m/s?",
        physicalModel:
          "Interstitial velocity through the pore space only.",
        governingEquation: "vs = vd/n",
        substitution: "vs = 7.5e-5 / 0.35 = 2.14×10⁻⁴ m/s",
        result: "vs = 2.14×10⁻⁴ m/s",
        interpretation:
          "Seepage velocity is about 2.9× the Darcy velocity here, which shortens travel-time estimates accordingly.",
      },
    ],
  },
];
