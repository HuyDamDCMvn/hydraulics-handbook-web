import type { Chapter } from "@/content/types";

export const part1Chapters: Chapter[] = [
  {
    id: 1,
    slug: "density-specific-weight-and-pressure",
    title: "Density, specific weight, and pressure",
    theme: "statics",
    equations: [
      {
        id: "1.1",
        latex: "\\rho = \\frac{m}{V}",
        label: "Density",
      },
      {
        id: "1.2",
        latex: "\\gamma = \\rho g",
        label: "Specific weight",
      },
      {
        id: "1.3",
        latex: "p = \\frac{F}{A}",
        label: "Pressure",
      },
    ],
    scope:
      "Defines the fundamental fluid properties of density and specific weight, and introduces pressure as force intensity on a surface. These relations underpin hydrostatic and flow calculations throughout the handbook.",
    assumptions:
      "Fluid is treated as a continuum; density is spatially uniform within the control volume considered; gravity is constant (g = 9.81 m/s²); pressure is normal to the surface and uniform over the area A.",
    nomenclature: [
      { symbol: "ρ", meaning: "Mass density", unit: "kg/m³" },
      { symbol: "m", meaning: "Mass", unit: "kg" },
      { symbol: "V", meaning: "Volume", unit: "m³" },
      { symbol: "γ", meaning: "Specific weight", unit: "N/m³" },
      { symbol: "g", meaning: "Gravitational acceleration", unit: "m/s²" },
      { symbol: "p", meaning: "Pressure", unit: "Pa (N/m²)" },
      { symbol: "F", meaning: "Force normal to surface", unit: "N" },
      { symbol: "A", meaning: "Area", unit: "m²" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-01.svg",
      caption:
        "Control volume of fluid: mass m in volume V; force F acting normal to area A.",
    },
    engineeringNote:
      "Fresh water at standard conditions is commonly taken as ρ ≈ 1000 kg/m³ and γ ≈ 9810 N/m³. Always confirm temperature dependence for precision work; pressure results are often reported in kPa or MPa for engineering convenience.",
    examples: [
      {
        id: "1.1",
        prompt:
          "A tank holds 2.5 m³ of water at standard conditions (ρ = 1000 kg/m³). Determine the mass and weight of the water.",
        physicalModel:
          "Closed tank filled with incompressible water of uniform density; weight W = mg = γV.",
        governingEquation: "m = \\rho V,\\quad W = \\gamma V = \\rho g V",
        substitution:
          "m = 1000\\times 2.5 = 2500\\ \\mathrm{kg};\\quad W = 1000\\times 9.81\\times 2.5 = 24525\\ \\mathrm{N}",
        result: "m = 2500 kg; W = 24.5 kN",
        interpretation:
          "The stored water has a mass of 2.5 t and exerts a downward weight of about 24.5 kN on the tank supports.",
      },
      {
        id: "1.2",
        prompt:
          "A compressive force of 12 kN acts uniformly on a piston of area 0.015 m². Calculate the pressure on the fluid.",
        physicalModel:
          "Hydraulic piston applying a uniform normal force to a sealed fluid surface.",
        governingEquation: "p = \\frac{F}{A}",
        substitution:
          "p = \\frac{12\\times 10^{3}}{0.015} = 8.0\\times 10^{5}\\ \\mathrm{Pa} = 800\\ \\mathrm{kPa}",
        result: "p = 800 kPa",
        interpretation:
          "The intensity of force on the fluid is 800 kPa, a typical working pressure for small hydraulic actuators.",
      },
    ],
  },
  {
    id: 2,
    slug: "hydrostatic-pressure-and-pressure-head",
    title: "Hydrostatic pressure and pressure head",
    theme: "statics",
    equations: [
      {
        id: "2.1",
        latex: "p = p_{0} + \\rho g h",
        label: "Hydrostatic pressure variation",
      },
      {
        id: "2.2",
        latex: "h_{p} = \\frac{p}{\\gamma}",
        label: "Pressure head",
      },
      {
        id: "2.3",
        latex: "p = \\gamma h",
        label: "Gauge pressure from head (open surface)",
      },
    ],
    scope:
      "Relates pressure to depth in a static fluid and converts pressure to equivalent liquid column height (pressure head). Used for manometry, reservoir free-surface problems, and gauge-to-absolute conversions.",
    assumptions:
      "Fluid is at rest (no shear); density is constant; free surface pressure p₀ is known (often atmospheric); z-axis positive upward or depth h measured downward from the free surface consistently.",
    nomenclature: [
      { symbol: "p", meaning: "Absolute or gauge pressure at depth", unit: "Pa" },
      { symbol: "p₀", meaning: "Pressure at free surface (or reference)", unit: "Pa" },
      { symbol: "ρ", meaning: "Fluid density", unit: "kg/m³" },
      { symbol: "g", meaning: "Gravitational acceleration", unit: "m/s²" },
      { symbol: "h", meaning: "Depth below free surface", unit: "m" },
      { symbol: "hₚ", meaning: "Pressure head", unit: "m" },
      { symbol: "γ", meaning: "Specific weight", unit: "N/m³" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-02.svg",
      caption:
        "Hydrostatic column: free-surface pressure p₀ and pressure increase ρgh with depth h.",
    },
    engineeringNote:
      "Gauge pressure omits atmospheric pressure; absolute pressure includes it. Pressure head is convenient for Bernoulli energy balances. For water, 1 m of head ≈ 9.81 kPa.",
    examples: [
      {
        id: "2.1",
        prompt:
          "Find the gauge pressure at a depth of 6 m in a freshwater reservoir (ρ = 1000 kg/m³).",
        physicalModel:
          "Open reservoir with atmospheric free surface; fluid static and of uniform density.",
        governingEquation: "p_{\\mathrm{gauge}} = \\rho g h",
        substitution:
          "p = 1000\\times 9.81\\times 6 = 58860\\ \\mathrm{Pa} = 58.9\\ \\mathrm{kPa}",
        result: "p_gauge = 58.9 kPa",
        interpretation:
          "At 6 m depth the water exerts about 58.9 kPa above atmosphere on a submerged wall or instrument.",
      },
      {
        id: "2.2",
        prompt:
          "Express a gauge pressure of 245 kPa as an equivalent freshwater pressure head.",
        physicalModel:
          "Conversion between pressure intensity and equivalent water-column height.",
        governingEquation: "h_{p} = \\frac{p}{\\gamma} = \\frac{p}{\\rho g}",
        substitution:
          "h_{p} = \\frac{245\\times 10^{3}}{1000\\times 9.81} = 25.0\\ \\mathrm{m}",
        result: "hₚ ≈ 25.0 m of water",
        interpretation:
          "245 kPa corresponds to roughly 25 m of water head—useful when reading piezometers or sizing reservoirs.",
      },
    ],
  },
  {
    id: 3,
    slug: "hydrostatic-force-and-center-of-pressure",
    title: "Hydrostatic force and center of pressure",
    theme: "statics",
    equations: [
      {
        id: "3.1",
        latex: "F = \\rho g h_{c} A",
        label: "Resultant hydrostatic force on a plane surface",
      },
      {
        id: "3.2",
        latex: "y_{p} = y_{c} + \\frac{I_{xc}}{y_{c} A}",
        label: "Center of pressure (inclined plane)",
      },
    ],
    scope:
      "Determines the magnitude and location of the resultant hydrostatic force on submerged plane surfaces such as gates, dams, and tank walls.",
    assumptions:
      "Fluid is static with constant density; the surface is plane; atmospheric pressure on the free surface may be cancelled if it also acts on the dry side of the gate; y measured along the plane from the free-surface intersection.",
    nomenclature: [
      { symbol: "F", meaning: "Resultant hydrostatic force", unit: "N" },
      { symbol: "ρ", meaning: "Fluid density", unit: "kg/m³" },
      { symbol: "g", meaning: "Gravitational acceleration", unit: "m/s²" },
      { symbol: "h_c", meaning: "Vertical depth of centroid", unit: "m" },
      { symbol: "A", meaning: "Wetted area of plane surface", unit: "m²" },
      { symbol: "y_c", meaning: "Centroid distance along plane from free surface", unit: "m" },
      { symbol: "y_p", meaning: "Center-of-pressure distance along plane", unit: "m" },
      { symbol: "I_xc", meaning: "Second moment of area about centroidal axis", unit: "m⁴" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-03.svg",
      caption:
        "Inclined submerged plane: centroid C at depth h_c and center of pressure P below C.",
    },
    engineeringNote:
      "The resultant acts through the center of pressure, which always lies below the centroid for free-surface cases. For a vertical rectangle of height H with top at the free surface, I_xc = bH³/12 and the offset is often H/6 below the mid-height centroid.",
    examples: [
      {
        id: "3.1",
        prompt:
          "A vertical rectangular gate 1.2 m wide and 2.0 m high has its top edge at the free surface of freshwater. Find the resultant hydrostatic force on the gate.",
        physicalModel:
          "Vertical plane rectangle fully submerged from the free surface; centroid at mid-height.",
        governingEquation: "F = \\rho g h_{c} A",
        substitution:
          "h_{c} = 1.0\\ \\mathrm{m},\\ A = 1.2\\times 2.0 = 2.4\\ \\mathrm{m}^{2};\\ F = 1000\\times 9.81\\times 1.0\\times 2.4 = 23544\\ \\mathrm{N}",
        result: "F = 23.5 kN",
        interpretation:
          "The gate must resist a resultant of 23.5 kN acting normal to its face through the center of pressure.",
      },
      {
        id: "3.2",
        prompt:
          "For the gate in Example 1, locate the center of pressure measured downward from the free surface along the gate.",
        physicalModel:
          "Same vertical rectangle; I_xc about the horizontal centroidal axis.",
        governingEquation: "y_{p} = y_{c} + \\frac{I_{xc}}{y_{c} A}",
        substitution:
          "y_{c} = 1.0\\ \\mathrm{m},\\ I_{xc} = \\frac{1.2\\times 2.0^{3}}{12} = 0.8\\ \\mathrm{m}^{4};\\ y_{p} = 1.0 + \\frac{0.8}{1.0\\times 2.4} = 1.333\\ \\mathrm{m}",
        result: "yₚ = 1.33 m below free surface",
        interpretation:
          "The resultant acts 0.33 m below the centroid, so hinge and stop designs must account for this lever arm.",
      },
    ],
  },
  {
    id: 4,
    slug: "buoyancy-and-floating-equilibrium",
    title: "Buoyancy and floating equilibrium",
    theme: "statics",
    equations: [
      {
        id: "4.1",
        latex: "F_{B} = \\rho g V_{\\mathrm{sub}}",
        label: "Buoyant force (Archimedes)",
      },
      {
        id: "4.2",
        latex: "W = F_{B} \\quad (\\text{floating})",
        label: "Floating equilibrium",
      },
    ],
    scope:
      "Applies Archimedes’ principle to fully or partially submerged bodies, including floating vessels and submerged tanks, and states the weight–buoyancy balance for flotation.",
    assumptions:
      "Fluid is static; density of displaced fluid is uniform; body weight acts through the center of gravity; buoyant force acts vertically through the center of buoyancy (centroid of displaced volume).",
    nomenclature: [
      { symbol: "F_B", meaning: "Buoyant force", unit: "N" },
      { symbol: "ρ", meaning: "Density of displaced fluid", unit: "kg/m³" },
      { symbol: "g", meaning: "Gravitational acceleration", unit: "m/s²" },
      { symbol: "V_sub", meaning: "Displaced (submerged) volume", unit: "m³" },
      { symbol: "W", meaning: "Weight of body", unit: "N" },
      { symbol: "m", meaning: "Mass of body", unit: "kg" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-04.svg",
      caption:
        "Floating body: weight W balanced by buoyant force F_B equal to weight of displaced fluid.",
    },
    engineeringNote:
      "For floating equilibrium, displaced volume adjusts until ρ_fluid g V_sub = W. Stability further requires metacentric height analysis (not covered by the force magnitude alone).",
    examples: [
      {
        id: "4.1",
        prompt:
          "A fully submerged concrete block displaces 0.40 m³ of freshwater. Calculate the buoyant force.",
        physicalModel:
          "Fully submerged solid in still freshwater; buoyant force equals weight of displaced water.",
        governingEquation: "F_{B} = \\rho g V_{\\mathrm{sub}}",
        substitution:
          "F_{B} = 1000\\times 9.81\\times 0.40 = 3924\\ \\mathrm{N}",
        result: "F_B = 3.92 kN",
        interpretation:
          "Upthrust of 3.92 kN reduces the apparent weight of the block when submerged.",
      },
      {
        id: "4.2",
        prompt:
          "A barge of weight 980 kN floats in freshwater. What volume of water must it displace?",
        physicalModel:
          "Floating vessel in equilibrium; weight equals buoyant force.",
        governingEquation: "W = F_{B} = \\rho g V_{\\mathrm{sub}}",
        substitution:
          "V_{\\mathrm{sub}} = \\frac{980\\times 10^{3}}{1000\\times 9.81} = 99.9\\ \\mathrm{m}^{3}",
        result: "V_sub ≈ 99.9 m³",
        interpretation:
          "About 100 m³ of underwater hull volume is required to float this barge in fresh water.",
      },
    ],
  },
  {
    id: 5,
    slug: "discharge-velocity-and-continuity",
    title: "Discharge, velocity, and continuity",
    theme: "flow",
    equations: [
      {
        id: "5.1",
        latex: "Q = V A",
        label: "Volumetric discharge",
      },
      {
        id: "5.2",
        latex: "A_{1} V_{1} = A_{2} V_{2}",
        label: "Continuity (incompressible, steady)",
      },
    ],
    scope:
      "Defines volumetric flow rate and enforces mass conservation for steady incompressible flow in ducts and conduits of varying cross-section.",
    assumptions:
      "Flow is steady; fluid is incompressible (constant density); one-dimensional mean velocity representation; no leakage between sections 1 and 2.",
    nomenclature: [
      { symbol: "Q", meaning: "Volumetric discharge", unit: "m³/s" },
      { symbol: "V", meaning: "Mean velocity", unit: "m/s" },
      { symbol: "A", meaning: "Cross-sectional area", unit: "m²" },
      { symbol: "A₁, A₂", meaning: "Areas at sections 1 and 2", unit: "m²" },
      { symbol: "V₁, V₂", meaning: "Mean velocities at sections 1 and 2", unit: "m/s" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-05.svg",
      caption:
        "Streamtube continuity: A₁V₁ = A₂V₂ for steady incompressible flow.",
    },
    engineeringNote:
      "Velocity varies inversely with area. Sudden contractions and expansions also produce local losses treated later; continuity alone does not give pressure changes.",
    examples: [
      {
        id: "5.1",
        prompt:
          "Water flows at a mean velocity of 2.5 m/s in a circular pipe of diameter 0.20 m. Compute the discharge.",
        physicalModel:
          "Full pipe flow with uniform mean velocity over the circular cross-section.",
        governingEquation: "Q = V A = V\\frac{\\pi D^{2}}{4}",
        substitution:
          "A = \\frac{\\pi(0.20)^{2}}{4} = 0.03142\\ \\mathrm{m}^{2};\\ Q = 2.5\\times 0.03142 = 0.0785\\ \\mathrm{m}^{3}/\\mathrm{s}",
        result: "Q = 0.0785 m³/s (78.5 L/s)",
        interpretation:
          "The pipe delivers about 78.5 litres per second at the stated mean speed.",
      },
      {
        id: "5.2",
        prompt:
          "The same discharge enters a reducer where diameter decreases from 0.20 m to 0.10 m. Find the exit velocity.",
        physicalModel:
          "Steady incompressible continuity between two circular sections.",
        governingEquation: "A_{1} V_{1} = A_{2} V_{2}",
        substitution:
          "V_{2} = V_{1}\\left(\\frac{D_{1}}{D_{2}}\\right)^{2} = 2.5\\left(\\frac{0.20}{0.10}\\right)^{2} = 10.0\\ \\mathrm{m}/\\mathrm{s}",
        result: "V₂ = 10.0 m/s",
        interpretation:
          "Halving the diameter quarters the area and multiplies velocity by four, raising dynamic head and possible cavitation risk.",
      },
    ],
  },
  {
    id: 6,
    slug: "extended-bernoulli",
    title: "Extended Bernoulli",
    theme: "flow",
    equations: [
      {
        id: "6.1",
        latex:
          "\\frac{p_{1}}{\\gamma} + \\frac{V_{1}^{2}}{2g} + z_{1} + h_{p} = \\frac{p_{2}}{\\gamma} + \\frac{V_{2}^{2}}{2g} + z_{2} + h_{L}",
        label: "Extended Bernoulli equation",
      },
      {
        id: "6.2",
        latex: "H = \\frac{p}{\\gamma} + \\frac{V^{2}}{2g} + z",
        label: "Total head at a section",
      },
    ],
    scope:
      "Energy balance along a streamline (or mean streamtube) including pump head h_p and total head loss h_L between two sections.",
    assumptions:
      "Steady flow; incompressible fluid; one-dimensional mean velocities; losses and pump work lumped as scalar heads; elevation z measured from a common datum.",
    nomenclature: [
      { symbol: "p", meaning: "Pressure", unit: "Pa" },
      { symbol: "γ", meaning: "Specific weight", unit: "N/m³" },
      { symbol: "V", meaning: "Mean velocity", unit: "m/s" },
      { symbol: "g", meaning: "Gravitational acceleration", unit: "m/s²" },
      { symbol: "z", meaning: "Elevation above datum", unit: "m" },
      { symbol: "h_p", meaning: "Pump (machine) head added", unit: "m" },
      { symbol: "h_L", meaning: "Total head loss between sections", unit: "m" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-06.svg",
      caption:
        "Energy grade line: pressure, velocity, and elevation heads with pump addition and losses.",
    },
    engineeringNote:
      "Without pump or losses the classical Bernoulli equation is recovered. Head losses include major (friction) and minor (fittings) terms developed in later chapters.",
    examples: [
      {
        id: "6.1",
        prompt:
          "A large reservoir free surface is at z₁ = 25 m (p₁ = 0 gauge, V₁ ≈ 0). Water discharges through a nozzle to atmosphere at z₂ = 5 m. Neglect losses and pump work. Find the exit velocity V₂.",
        physicalModel:
          "Open reservoir to atmospheric jet; ideal Bernoulli along a streamline.",
        governingEquation:
          "z_{1} = \\frac{V_{2}^{2}}{2g} + z_{2}",
        substitution:
          "V_{2} = \\sqrt{2g(z_{1}-z_{2})} = \\sqrt{2\\times 9.81\\times 20} = \\sqrt{392.4} = 19.8\\ \\mathrm{m}/\\mathrm{s}",
        result: "V₂ = 19.8 m/s",
        interpretation:
          "A 20 m elevation drop converts to about 19.8 m/s efflux when losses are neglected (Torricelli limit).",
      },
      {
        id: "6.2",
        prompt:
          "A pump delivers 15 m of head to raise water between two open tanks with water-surface elevations z₁ = 5 m and z₂ = 18 m. If pipe losses total h_L = 3.5 m and surface velocities are negligible, verify the energy balance.",
        physicalModel:
          "Two open tanks; pump head offsets elevation rise plus friction losses.",
        governingEquation:
          "z_{1} + h_{p} = z_{2} + h_{L}",
        substitution:
          "5 + 15 = 18 + 3.5 \\Rightarrow 20 = 21.5\\ (\\text{shortfall }1.5\\ \\mathrm{m})",
        result: "Required h_p = 16.5 m for balance",
        interpretation:
          "With only 15 m of pump head the system is short by 1.5 m; increase pump head or reduce losses to reach the upper tank steadily.",
      },
    ],
  },
  {
    id: 7,
    slug: "torricelli-and-orifice",
    title: "Torricelli and orifice",
    theme: "flow",
    equations: [
      {
        id: "7.1",
        latex: "V = \\sqrt{2 g h}",
        label: "Torricelli ideal jet velocity",
      },
      {
        id: "7.2",
        latex: "Q = C_{d} A \\sqrt{2 g h}",
        label: "Orifice discharge",
      },
    ],
    scope:
      "Ideal efflux velocity from an orifice under head h (Torricelli) and real discharge using a discharge coefficient C_d that accounts for vena contracta and viscous effects.",
    assumptions:
      "Large upstream reservoir (approach velocity ≈ 0); atmospheric pressure on free surface and jet; steady head h measured to orifice centerline; C_d calibrated for the orifice geometry.",
    nomenclature: [
      { symbol: "V", meaning: "Ideal jet velocity", unit: "m/s" },
      { symbol: "g", meaning: "Gravitational acceleration", unit: "m/s²" },
      { symbol: "h", meaning: "Head above orifice centerline", unit: "m" },
      { symbol: "Q", meaning: "Actual discharge", unit: "m³/s" },
      { symbol: "C_d", meaning: "Discharge coefficient", unit: "—" },
      { symbol: "A", meaning: "Orifice area", unit: "m²" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-07.svg",
      caption:
        "Tank orifice under head h: ideal Torricelli jet and contracted vena contracta.",
    },
    engineeringNote:
      "Typical sharp-edged orifice C_d values are about 0.60–0.65. Always use the geometric orifice area A, not the vena-contracta area, when applying Q = C_d A √(2gh).",
    examples: [
      {
        id: "7.1",
        prompt:
          "An orifice under a constant head of 4.0 m discharges to atmosphere. Compute the ideal Torricelli velocity.",
        physicalModel:
          "Large tank, negligible approach velocity, frictionless ideal jet.",
        governingEquation: "V = \\sqrt{2 g h}",
        substitution:
          "V = \\sqrt{2\\times 9.81\\times 4.0} = \\sqrt{78.48} = 8.86\\ \\mathrm{m}/\\mathrm{s}",
        result: "V = 8.86 m/s",
        interpretation:
          "The theoretical efflux speed is 8.86 m/s; real jets are slightly slower due to losses.",
      },
      {
        id: "7.2",
        prompt:
          "A circular orifice of diameter 50 mm under h = 4.0 m has C_d = 0.62. Find the discharge.",
        physicalModel:
          "Sharp-edged circular orifice with known discharge coefficient.",
        governingEquation: "Q = C_{d} A \\sqrt{2 g h}",
        substitution:
          "A = \\frac{\\pi(0.05)^{2}}{4} = 1.963\\times 10^{-3}\\ \\mathrm{m}^{2};\\ Q = 0.62\\times 1.963\\times 10^{-3}\\times 8.86 = 1.08\\times 10^{-2}\\ \\mathrm{m}^{3}/\\mathrm{s}",
        result: "Q = 0.0108 m³/s (10.8 L/s)",
        interpretation:
          "Accounting for contraction and losses, the orifice delivers about 10.8 L/s under 4 m head.",
      },
    ],
  },
  {
    id: 8,
    slug: "reynolds-number",
    title: "Reynolds number",
    theme: "flow",
    equations: [
      {
        id: "8.1",
        latex: "Re = \\frac{\\rho V D}{\\mu}",
        label: "Reynolds number (dynamic viscosity)",
      },
      {
        id: "8.2",
        latex: "Re = \\frac{V D}{\\nu}",
        label: "Reynolds number (kinematic viscosity)",
      },
    ],
    scope:
      "Defines the dimensionless Reynolds number that classifies pipe flow as laminar, transitional, or turbulent and scales dynamic similarity between models and prototypes.",
    assumptions:
      "Characteristic length is internal diameter D for circular pipes; V is the mean velocity; fluid properties μ and ν are evaluated at the bulk temperature.",
    nomenclature: [
      { symbol: "Re", meaning: "Reynolds number", unit: "—" },
      { symbol: "ρ", meaning: "Fluid density", unit: "kg/m³" },
      { symbol: "V", meaning: "Mean velocity", unit: "m/s" },
      { symbol: "D", meaning: "Pipe internal diameter", unit: "m" },
      { symbol: "μ", meaning: "Dynamic viscosity", unit: "Pa·s" },
      { symbol: "ν", meaning: "Kinematic viscosity", unit: "m²/s" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-08.svg",
      caption:
        "Pipe flow regimes: laminar (Re ≲ 2300), transitional, and turbulent (Re ≳ 4000).",
    },
    engineeringNote:
      "For circular pipes, Re < ≈2300 is usually laminar and Re > ≈4000 turbulent; the transitional band is sensitive to disturbances. Water at 20 °C has ν ≈ 1.0×10⁻⁶ m²/s.",
    examples: [
      {
        id: "8.1",
        prompt:
          "Water at 20 °C (ν = 1.0×10⁻⁶ m²/s) flows at 0.8 m/s in a 50 mm diameter pipe. Compute Re and state the regime.",
        physicalModel:
          "Circular pipe with known mean velocity and kinematic viscosity.",
        governingEquation: "Re = \\frac{V D}{\\nu}",
        substitution:
          "Re = \\frac{0.8\\times 0.050}{1.0\\times 10^{-6}} = 4.0\\times 10^{4}",
        result: "Re = 40 000 (turbulent)",
        interpretation:
          "The flow is well into the turbulent range; friction factor depends on relative roughness as well as Re.",
      },
      {
        id: "8.2",
        prompt:
          "Oil of density 880 kg/m³ and μ = 0.20 Pa·s flows at 1.2 m/s in a 40 mm pipe. Find Re.",
        physicalModel:
          "Viscous oil in a small-diameter pipe; dynamic-viscosity form of Re.",
        governingEquation: "Re = \\frac{\\rho V D}{\\mu}",
        substitution:
          "Re = \\frac{880\\times 1.2\\times 0.040}{0.20} = 211",
        result: "Re = 211 (laminar)",
        interpretation:
          "Despite a moderate speed, high viscosity keeps the oil flow laminar (Re ≪ 2300).",
      },
    ],
  },
  {
    id: 9,
    slug: "darcy-weisbach",
    title: "Darcy-Weisbach",
    theme: "pipe",
    equations: [
      {
        id: "9.1",
        latex: "h_{f} = f\\frac{L}{D}\\frac{V^{2}}{2g}",
        label: "Darcy–Weisbach head loss",
      },
      {
        id: "9.2",
        latex: "\\Delta p_{f} = \\rho g h_{f}",
        label: "Frictional pressure drop",
      },
    ],
    scope:
      "Calculates frictional (major) head loss in circular pipes for a known Darcy friction factor f, length L, diameter D, and mean velocity V.",
    assumptions:
      "Fully developed flow in a circular pipe of constant diameter; f known from Moody chart or correlations; incompressible fluid; mean one-dimensional velocity.",
    nomenclature: [
      { symbol: "h_f", meaning: "Frictional head loss", unit: "m" },
      { symbol: "f", meaning: "Darcy friction factor", unit: "—" },
      { symbol: "L", meaning: "Pipe length", unit: "m" },
      { symbol: "D", meaning: "Internal diameter", unit: "m" },
      { symbol: "V", meaning: "Mean velocity", unit: "m/s" },
      { symbol: "g", meaning: "Gravitational acceleration", unit: "m/s²" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-09.svg",
      caption:
        "Straight pipe of length L and diameter D: frictional head loss h_f along the energy grade line.",
    },
    engineeringNote:
      "Darcy–Weisbach is preferred over empirical formulas when fluid properties and roughness are known, because f is dimensionless and the equation is dimensionally homogeneous.",
    examples: [
      {
        id: "9.1",
        prompt:
          "Water flows at V = 2.0 m/s through 250 m of 150 mm pipe with f = 0.020. Compute the frictional head loss.",
        physicalModel:
          "Long straight circular main with known Darcy friction factor.",
        governingEquation: "h_{f} = f\\frac{L}{D}\\frac{V^{2}}{2g}",
        substitution:
          "h_{f} = 0.020\\times\\frac{250}{0.150}\\times\\frac{2.0^{2}}{2\\times 9.81} = 6.80\\ \\mathrm{m}",
        result: "h_f = 6.80 m",
        interpretation:
          "About 6.8 m of head is dissipated by wall friction over 250 m of this pipeline.",
      },
      {
        id: "9.2",
        prompt:
          "If discharge is halved in the same pipe (V becomes 1.0 m/s) and f remains 0.020, what is the new head loss?",
        physicalModel:
          "Same pipe; head loss scales with V² when f is unchanged.",
        governingEquation: "h_{f} = f\\frac{L}{D}\\frac{V^{2}}{2g}",
        substitution:
          "h_{f} = 0.020\\times\\frac{250}{0.150}\\times\\frac{1.0^{2}}{2\\times 9.81} = 1.70\\ \\mathrm{m}",
        result: "h_f = 1.70 m",
        interpretation:
          "Halving velocity quarters the frictional head loss when f is approximately constant.",
      },
    ],
  },
  {
    id: 10,
    slug: "friction-factor",
    title: "Friction factor",
    theme: "pipe",
    equations: [
      {
        id: "10.1",
        latex: "f = \\frac{64}{Re}\\quad (\\text{laminar})",
        label: "Laminar Darcy friction factor",
      },
      {
        id: "10.2",
        latex:
          "\\frac{1}{\\sqrt{f}} = -2\\log_{10}\\left(\\frac{\\varepsilon}{3.7D} + \\frac{2.51}{Re\\sqrt{f}}\\right)",
        label: "Colebrook–White equation",
      },
      {
        id: "10.3",
        latex:
          "f = \\frac{0.25}{\\left[\\log_{10}\\left(\\frac{\\varepsilon}{3.7D} + \\frac{5.74}{Re^{0.9}}\\right)\\right]^{2}}",
        label: "Swamee–Jain approximation",
      },
    ],
    scope:
      "Evaluates the Darcy friction factor for laminar flow exactly and for turbulent flow via the implicit Colebrook equation or the explicit Swamee–Jain approximation.",
    assumptions:
      "Circular pipe; hydraulically smooth or rough wall characterized by absolute roughness ε; fully developed flow; Colebrook valid for turbulent commercial pipes.",
    nomenclature: [
      { symbol: "f", meaning: "Darcy friction factor", unit: "—" },
      { symbol: "Re", meaning: "Reynolds number", unit: "—" },
      { symbol: "ε", meaning: "Absolute wall roughness", unit: "m" },
      { symbol: "D", meaning: "Internal diameter", unit: "m" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-10.svg",
      caption:
        "Moody diagram concept: f versus Re for families of relative roughness ε/D.",
    },
    engineeringNote:
      "Iterate Colebrook from an initial guess (e.g. Swamee–Jain). For laminar flow ignore roughness. Commercial steel often has ε ≈ 0.045 mm; PVC is nearly smooth.",
    examples: [
      {
        id: "10.1",
        prompt:
          "Laminar oil flow has Re = 800. Determine the Darcy friction factor.",
        physicalModel:
          "Fully developed laminar pipe flow; f independent of roughness.",
        governingEquation: "f = \\frac{64}{Re}",
        substitution: "f = \\frac{64}{800} = 0.080",
        result: "f = 0.080",
        interpretation:
          "A relatively large friction factor is typical at low Reynolds numbers despite laminar conditions.",
      },
      {
        id: "10.2",
        prompt:
          "Estimate f by Swamee–Jain for Re = 1.0×10⁵, D = 0.20 m, and ε = 0.00015 m.",
        physicalModel:
          "Turbulent commercial pipe; explicit approximation to Colebrook.",
        governingEquation:
          "f = \\frac{0.25}{\\left[\\log_{10}\\left(\\frac{\\varepsilon}{3.7D} + \\frac{5.74}{Re^{0.9}}\\right)\\right]^{2}}",
        substitution:
          "\\frac{\\varepsilon}{3.7D} + \\frac{5.74}{Re^{0.9}} = \\frac{0.00015}{3.7\\times 0.20} + \\frac{5.74}{(10^{5})^{0.9}} = 2.027\\times 10^{-4} + 1.815\\times 10^{-4} = 3.842\\times 10^{-4};\\ f = \\frac{0.25}{[\\log_{10}(3.842\\times 10^{-4})]^{2}} = 0.0214",
        result: "f ≈ 0.0214",
        interpretation:
          "The pipe is in the transitional roughness regime; f ≈ 0.021 is suitable for Darcy–Weisbach loss estimates.",
      },
    ],
  },
  {
    id: 11,
    slug: "minor-loss",
    title: "Minor loss",
    theme: "pipe",
    equations: [
      {
        id: "11.1",
        latex: "h_{m} = K\\frac{V^{2}}{2g}",
        label: "Minor (local) head loss",
      },
      {
        id: "11.2",
        latex: "L_{eq} = \\frac{K D}{f}",
        label: "Equivalent pipe length",
      },
    ],
    scope:
      "Quantifies local head losses from fittings, valves, entrances, and exits using loss coefficients K, and converts them to equivalent lengths of straight pipe.",
    assumptions:
      "Loss coefficient K is based on the reference velocity V in the pipe of interest; coefficients are taken from manufacturer or handbook tables; flow is turbulent unless otherwise stated.",
    nomenclature: [
      { symbol: "h_m", meaning: "Minor head loss", unit: "m" },
      { symbol: "K", meaning: "Loss coefficient", unit: "—" },
      { symbol: "V", meaning: "Reference mean velocity", unit: "m/s" },
      { symbol: "g", meaning: "Gravitational acceleration", unit: "m/s²" },
      { symbol: "L_eq", meaning: "Equivalent length of straight pipe", unit: "m" },
      { symbol: "D", meaning: "Pipe diameter", unit: "m" },
      { symbol: "f", meaning: "Darcy friction factor", unit: "—" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-11.svg",
      caption:
        "Fitting in a pipeline: local loss h_m = K V²/(2g) and equivalent length L_eq.",
    },
    engineeringNote:
      "Sum all minor losses ΣK V²/(2g) with major losses in the extended Bernoulli equation. For long transmission mains, minor losses are often small; in plant piping they can dominate.",
    examples: [
      {
        id: "11.1",
        prompt:
          "A globe valve with K = 10 is installed in a pipe where V = 2.5 m/s. Calculate the minor head loss.",
        physicalModel:
          "Single fitting referenced to the pipe mean velocity.",
        governingEquation: "h_{m} = K\\frac{V^{2}}{2g}",
        substitution:
          "h_{m} = 10\\times\\frac{2.5^{2}}{2\\times 9.81} = 3.19\\ \\mathrm{m}",
        result: "h_m = 3.19 m",
        interpretation:
          "The valve alone dissipates over 3 m of head—comparable to tens of metres of straight pipe friction.",
      },
      {
        id: "11.2",
        prompt:
          "Convert K = 10 to an equivalent length for D = 0.10 m and f = 0.020.",
        physicalModel:
          "Same loss expressed as extra straight-pipe length at the given f.",
        governingEquation: "L_{eq} = \\frac{K D}{f}",
        substitution:
          "L_{eq} = \\frac{10\\times 0.10}{0.020} = 50\\ \\mathrm{m}",
        result: "L_eq = 50 m",
        interpretation:
          "In network models the valve may be replaced by 50 m of equivalent 100 mm pipe at f = 0.020.",
      },
    ],
  },
  {
    id: 12,
    slug: "hazen-williams",
    title: "Hazen-Williams",
    theme: "pipe",
    equations: [
      {
        id: "12.1",
        latex:
          "h_{f} = \\frac{10.67\\, L\\, Q^{1.852}}{C^{1.852}\\, D^{4.87}}",
        label: "Hazen–Williams head loss (SI)",
      },
      {
        id: "12.2",
        latex: "V = 0.849\\, C\\, R_{h}^{0.63}\\, S^{0.54}",
        label: "Hazen–Williams velocity form (SI)",
      },
    ],
    scope:
      "Empirical friction-loss formula widely used for water distribution networks in SI units, relating head loss to length, discharge, Hazen–Williams C, and diameter.",
    assumptions:
      "Water near ordinary temperatures; turbulent flow in the range for which C was calibrated; C reflects pipe material and age; SI form with Q in m³/s, D and L in m, h_f in m.",
    nomenclature: [
      { symbol: "h_f", meaning: "Frictional head loss", unit: "m" },
      { symbol: "L", meaning: "Pipe length", unit: "m" },
      { symbol: "Q", meaning: "Discharge", unit: "m³/s" },
      { symbol: "C", meaning: "Hazen–Williams roughness coefficient", unit: "—" },
      { symbol: "D", meaning: "Internal diameter", unit: "m" },
    ],
    schematic: {
      type: "r3f",
      src: "/schematics/ch-12.svg",
      caption:
        "Water main: Hazen–Williams loss depending on C, Q, D, and length L.",
    },
    engineeringNote:
      "Typical C values: new cast iron ≈ 130, PVC ≈ 140–150, aged/tuberculated mains may fall to 100 or lower. Prefer Darcy–Weisbach when fluid is not water or temperature varies strongly.",
    examples: [
      {
        id: "12.1",
        prompt:
          "A 300 m long, 200 mm PVC main (C = 150) carries Q = 0.050 m³/s. Compute h_f by Hazen–Williams (SI).",
        physicalModel:
          "Water distribution pipe with empirical Hazen–Williams coefficients.",
        governingEquation:
          "h_{f} = \\frac{10.67\\, L\\, Q^{1.852}}{C^{1.852}\\, D^{4.87}}",
        substitution:
          "h_{f} = \\frac{10.67\\times 300\\times (0.050)^{1.852}}{150^{1.852}\\times (0.200)^{4.87}} = 2.95\\ \\mathrm{m}",
        result: "h_f ≈ 2.95 m",
        interpretation:
          "About 3.0 m of head is lost over 300 m at 50 L/s in this smooth PVC main.",
      },
      {
        id: "12.2",
        prompt:
          "If the same pipe ages to C = 100 while Q and D remain unchanged, estimate the new head loss.",
        physicalModel:
          "Same geometry and discharge; reduced C increases loss as C^−1.852.",
        governingEquation:
          "h_{f} = \\frac{10.67\\, L\\, Q^{1.852}}{C^{1.852}\\, D^{4.87}}",
        substitution:
          "\\frac{h_{f,100}}{h_{f,150}} = \\left(\\frac{150}{100}\\right)^{1.852} = 2.12;\\ h_{f,100} = 2.12\\times 2.95 = 6.25\\ \\mathrm{m}",
        result: "h_f ≈ 6.25 m",
        interpretation:
          "Aging that drops C from 150 to 100 more than doubles frictional head loss at the same flow.",
      },
    ],
  },
];
