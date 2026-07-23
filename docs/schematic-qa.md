# Schematic 3D QA — light tone + formula fidelity

Production: https://hydraulics-handbook-web.vercel.app

Checked: 2026-07-23. Method: navigate to `/chapters/{id}#schematic`, wait ~1.5s, CDP/`#schematic` evaluate `{id, canvas, bg, labelText}`. Screenshots for Ch 5, 8, 13, 14, 20, 21, 23, 24.

**Verdict criteria**

- **PASS**: light bg near `rgb(244, 241, 234)`, `canvas: true`, label/caption matches chapter physics
- **FIX**: wrong formula metaphor, missing canvas, or dark bg
- **WEAK**: canvas ok but metaphor only loosely related

| Ch | Formula intent | canvas | bg | labelText (≤200) | Verdict | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | ρ, γ, p=F/A | true | rgb(244, 241, 234) | (prior check) ρ, γ, p=F/A | PASS | Already checked — light tone |
| 2 | p=ρgh | true | rgb(244, 241, 234) | (prior check) p=ρgh | PASS | Already checked |
| 3 | F, center of pressure | true | rgb(244, 241, 234) | (prior check) center of pressure | PASS | Already checked |
| 4 | buoyancy F_B | true | rgb(244, 241, 234) | Figure 4.1… F_B = ρ g V_sub … Floating body | PASS | Matches F_B = ρgV_sub |
| 5 | A1V1=A2V2 | true | rgb(244, 241, 234) | Figure 5.1… A₁V₁ = A₂V₂ … Streamtube continuity | PASS | Screenshot OK — constricting pipe |
| 6 | Bernoulli | true | rgb(244, 241, 234) | Figure 6.1… Bernoulli / total head … | PASS | Energy grade / total head |
| 7 | Torricelli/√(2gh) | true | rgb(244, 241, 234) | Figure 7.1… V=√(2gh) … Tank orifice under head h | PASS | Torricelli jet |
| 8 | Re laminar/turbulent | true | rgb(244, 241, 234) | Figure 8.1… Laminar / Turbulent / Re … Pipe flow regimes | PASS | Screenshot OK — dual pipes |
| 9 | hf Darcy | true | rgb(244, 241, 234) | Figure 9.1… h_f = f(L/D)V²/(2g) … Straight pipe | PASS | Darcy–Weisbach |
| 10 | friction f | true | rgb(244, 241, 234) | Figure 10.1… smooth / rough / friction factor f … | PASS | Moody / relative roughness |
| 11 | minor loss | true | rgb(244, 241, 234) | Figure 11.1… h_m = K V²/(2g) … Fitting in a | PASS | Local loss K |
| 12 | Hazen | true | rgb(244, 241, 234) | Figure 12.1… Hazen–Williams … Water main | PASS | Water-main C-factor |
| 13 | momentum ΣF | true | rgb(244, 241, 234) | Figure 13.1… ΣF = ρQ(Vout−Vin) … Control | PASS | Screenshot OK — bend + CV |
| 14 | pump power | true | rgb(244, 241, 234) | Figure 14.1… P = ρgQH/η … Pump with suction (s) | PASS | Screenshot OK — pump body |
| 15 | affinity | true | rgb(244, 241, 234) | Figure 15.1… n₁ / n₂ / affinity laws … Homologous | PASS | Q∝n, H∝n², P∝n³ |
| 16 | NPSH | true | rgb(244, 241, 234) | Figure 16.1… NPSHₐ > NPSHᵣ … Open sump | PASS | Available vs required |
| 17 | Manning | true | rgb(244, 241, 234) | Figure 17.1… V=(1/n)Rh^(2/3)S^(1/2) … Manning uniform flow | PASS | Uniform open-channel flow |
| 18 | A,P,Rh | true | rgb(244, 241, 234) | Figure 18.1… A, P, Rh … Channel geometry — A, P, Rh | PASS | Rect/trapezoid sections |
| 19 | Froude | true | rgb(244, 241, 234) | Figure 19.1… Fr = V/√(gy) … Froude number regimes | PASS | Sub/super/critical |
| 20 | jump | true | rgb(244, 241, 234) | Figure 20.1… y2/y1 from Fr1 … Hydraulic jump | PASS | Screenshot OK — sequent depths |
| 21 | weir | true | rgb(244, 241, 234) | Figure 21.1… Q ∝ L H^(3/2) … Sharp-crested weir | PASS | Screenshot OK — weir nappe |
| 22 | drawdown | true | rgb(244, 241, 234) | Figure 22.1… tank drawdown … Orifice tank drawdown | PASS | Constant-area tank drain |
| 23 | Joukowsky Δp | true | rgb(244, 241, 234) | Figure 23.1… Δp = ρ c ΔV … Water hammer surge | PASS | Screenshot OK — valve surge |
| 24 | seepage | true | rgb(244, 241, 234) | Figure 24.1… q = −k i A … Darcy seepage | PASS | Screenshot OK — porous sample |

## Summary

- **PASS:** 24 / 24
- **WEAK:** 0
- **FIX:** 0

All production schematics show light schematic panel background `rgb(244, 241, 234)`, a WebGL `canvas`, and formula labels aligned with the expected chapter cues.
