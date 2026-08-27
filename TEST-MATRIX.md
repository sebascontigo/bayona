# TEST-MATRIX — Los 381 tests de BAYONA

**Fase 1 (plan 1.5–1.6).** Estado en el commit BASELINE `8e67cd2`:
**48 ficheros, 212 tests, 0 fallos, 0 saltados** (verificado con `vitest --run`,
reporter JSON; el grep de `test.skip|it.skip|describe.skip|xit|xdescribe` no encuentra
nada en `src/` ni `e2e/`).

**Actualización Fase 2 (2026-08-26):** **49 ficheros, 217 tests, 0 fallos, 0 saltados.**
Nuevos: `src/test/commercialSync.test.jsx` (4 tests de sincronización comercial) y
1 test en `pages/Checkout.test.jsx` (los 4 planes de principio a fin). Detalle en FASE2-CIERRE.md.

**Actualización Fase 3 (2026-08-27):** **57 ficheros, 273 tests, 0 fallos, 0 saltados.**
Nuevos (56): componentes base del Design System `components/ds/ds.test.jsx` (20),
playground `pages/DesignSystem.test.jsx` (4), contrato del sistema
`test/designSystemContract.test.js` (8), y en el engine `motionTokens.test.js` (6),
`breakpoints.test.js` (4), `scenePresets.test.js` (7), `useSticky.test.jsx` (3) y
`CustomCursor.test.jsx` (4). Los contratos de rutas ahora inventarían rutas públicas
e internas (`/design-system`) por separado. Detalle en DESIGN-SYSTEM.md.

**Actualización Fase 4 (2026-08-27):** **59 ficheros, 290 tests, 0 fallos, 0 saltados.**
Nuevos (17): `components/navigation/Breadcrumb.test.jsx` (6, sistema de posición) y
`components/Layout.nav.test.jsx` (6, arquitectura de navbar/footer por grupos);
ampliados `pages/Checkout.test.jsx` (+3: precarga `?plan=`, fail-closed, salida a
`/order-confirmation`; pasa a renderizar dentro de `MemoryRouter`),
`pages/Onboarding.test.jsx` (+1: el paso final lleva a la ficha del plan recomendado)
y `test/commercialSync.test.jsx` (+1: ficha de plan enlaza PDF y configurador; embudo
conectado de punta a punta). `pages/criticalFlow.test.jsx` envuelve Checkout en
`MemoryRouter` sin cambiar aserciones. Gate: 290/290 vitest, lint 0 errores/17
warnings, build OK, 41/41 Playwright. Detalle en FASE4-ARQUITECTURA-EXPERIENCIA.md.

**Actualización Fase 5 (2026-08-27):** **71 ficheros, 381 tests, 0 fallos, 0 saltados**
(verificado con `vitest --reporter=json`). Nuevos (91 tests, 12 ficheros) por el Motion
Engine 2.0 + Scroll Storytelling: en el engine `scroll/useSectionProgress.test.jsx` (8),
`scroll/scrollHandoff.test.js` (8), `scroll/StickyStage.test.jsx` (10),
`scroll/HorizontalPassage.test.jsx` (6), `providers/ExperienceProvider.scrollState.test.jsx` (5),
`motion/Marquee.test.jsx` (7), `motion/TextMask.test.jsx` (6), `recipes/intensity.test.js` (6),
`recipes/recipes.test.js` (5), `recipes/motionBudget.test.js` (8),
`recipes/pageMotionContract.test.js` (11) y `debug/MotionDebug.test.jsx` (5).
Ampliados: `config/motionTokens.test.js` (6 → 11: curvas exit/travel/transform + distancias)
y `pages/DesignSystem.test.jsx` (4 → 5: bloques 10–16 del playground). Esta actualización
también **resincroniza las cabeceras de sección** con el conteo real por fichero
(verificado con el reporter JSON): Páginas 65, Componentes 59, engine 143, conversión 66,
store/estilos 4. Detalle en PHASE5-MOTION-ENGINE.md.

Regla de oro del proyecto: **prohibido saltar tests.** Cada fallo se clasifica y se
resuelve por su causa raíz (taxonomía A–G del plan).

## 1. Matriz por fichero (381 tests)

### Contratos globales (23)
| Fichero | Tests | Qué vigila |
|---|---|---|
| src/test/baselineContract.test.js | 4 | 17 rutas públicas + internas inventariadas sin duplicados + 404, planes canónicos (id/nombre/precio COP), WhatsApp oficial, stack |
| src/test/commercialSync.test.jsx | 5 | Fase 2: orden canónico ↔ catálogo ↔ rutas /plan/* ↔ presentaciones; 36 combinaciones del Inicio Guiado sin slugs fantasma; 4 PDFs existen y presentationUrl apunta al fichero; anclajes #plan-* del recomendador existen en PlanExplorer. Fase 4: la ficha enlaza PDF y `/checkout?plan=`, Programs enlaza `/checkout`, checkout valida `?plan=` y enlaza `/order-confirmation` |
| src/test/conversionRegression.test.jsx | 6 | Gate acumulativo de conversión: hitos home, e2e con emulación/capturas/teclado, recorrido |
| src/test/designSystemContract.test.js | 8 | Fase 3: familias de tokens completas, radio de marca 0, z-index creciente, espejo CSS↔motionTokens, aislamiento `.ds-*`, sin capas `v4-*`, playground noindex fuera del sitemap (14 URLs). Fase 5: el espejo CSS↔JS vigila ya 6 easings y las distancias `--ds-dist-*` |

### Páginas (65)
| Fichero | Tests | Fichero | Tests |
|---|---|---|---|
| pages/Home.test.jsx | 12 | pages/FAQ.test.jsx | 4 |
| pages/Home.contract.test.jsx | 6 | pages/Onboarding.test.jsx | 5 |
| pages/AppExperience.test.jsx | 6 | pages/Shop.test.jsx | 4 |
| pages/Checkout.test.jsx | 6 | pages/DesignSystem.test.jsx | 5 |
| pages/Resources.test.jsx | 5 | pages/criticalFlow.test.jsx | 3 |
| pages/ParkourAcademy.test.jsx | 3 | pages/About.test.jsx | 3 |
| pages/Programs.test.jsx | 3 | | |

### Componentes (59)
| Fichero | Tests | Fichero | Tests |
|---|---|---|---|
| components/ds/ds.test.jsx | 20 | components/conversion/RecommendationGuide.test.jsx | 5 |
| components/navigation/Breadcrumb.test.jsx | 6 | components/Layout.nav.test.jsx | 6 |
| components/Globe3D.test.jsx | 5 | components/conversion/PlanExplorer.test.jsx | 3 |
| components/conversion/ExtrasExplorer.test.jsx | 3 | components/Layout.test.jsx | 3 |
| components/conversion/PersistentSummary.test.jsx | 2 | components/conversion/RequestPreview.test.jsx | 2 |
| components/PlanCalculator.test.jsx | 2 | components/conversion/NarrativeHeroVisual.test.jsx | 1 |
| components/onboarding/PaseBayona.test.jsx | 1 | | |

### Config y datos comerciales (21)
| Fichero | Tests | Qué vigila |
|---|---|---|
| config/offerings.test.js | 9 | 4 planes, precios publicados, servicios, extras |
| config/conversionContent.test.js | 6 | Copy de conversión en español y sin promesas |
| config/shopCatalog.test.js | 3 | Catálogo de tienda alineado |
| config/shopProducts.test.js | 2 | Productos y URLs de WhatsApp |
| config/evidenceRegistry.test.js | 1 | Registro de evidencia |

### Motor visual — engine (143)
| Fichero | Tests | Tipo |
|---|---|---|
| engine/scene/LightingRig.test.js | 9 | unidad |
| engine/config/motionTokens.test.js | 11 | unidad (tiers semánticos + easings exit/travel/transform + distancias) |
| engine/recipes/pageMotionContract.test.js | 11 | unidad (contrato de página futura, Fase 5) |
| engine/scroll/StickyStage.test.jsx | 10 | unidad (escenario sticky A/B/C, Fase 5) |
| engine/scroll/useSectionProgress.test.jsx | 8 | unidad (progreso normalizado por sección, Fase 5) |
| engine/scroll/scrollHandoff.test.js | 8 | unidad (handoff 3D para Fase 7) |
| engine/recipes/motionBudget.test.js | 8 | unidad (presupuesto de movimiento por zona) |
| engine/config/scenePresets.test.js | 7 | unidad (presets 3D del Design System) |
| engine/motion/Marquee.test.jsx | 7 | unidad (marquesina declarativa, Fase 5) |
| engine/motion/TextMask.test.jsx | 6 | unidad (reveal de líneas con máscara, Fase 5) |
| engine/scroll/HorizontalPassage.test.jsx | 6 | unidad (pasaje horizontal por scroll, Fase 5) |
| engine/recipes/intensity.test.js | 6 | unidad (intensidades quiet/balanced/immersive) |
| engine/config/sceneConfig.pbt.test.js | 5 | property-based (fast-check) |
| engine/recipes/recipes.test.js | 5 | unidad (las 8 recetas + invariante de tokens) |
| engine/providers/ExperienceProvider.scrollState.test.jsx | 5 | unidad (velocidad/dirección: Lenis + fallback nativo) |
| engine/debug/MotionDebug.test.jsx | 5 | unidad (gating prod/dev/flag del overlay) |
| engine/effects/CustomCursor.test.jsx | 4 | unidad (puerta de capacidades) |
| engine/hooks/useDisposable.pbt.test.js | 4 | property-based |
| engine/config/breakpoints.test.js | 4 | unidad (tokens responsivos) |
| engine/hooks/useSticky.test.jsx | 3 | unidad (infraestructura de scroll) |
| engine/motion/Reveal.test.jsx | 2 | unidad |
| engine/motion/TextReveal.test.jsx | 2 | unidad |
| engine/config/motionProfile.pbt.test.js | 1 | property-based |
| engine/hooks/useMagnetic.pbt.test.js | 1 | property-based |
| engine/motion/variants.pbt.test.js | 1 | property-based |
| engine/providers/capabilities.pbt.test.js | 1 | property-based |
| engine/providers/CapabilityProvider.test.jsx | 1 | unidad |
| engine/providers/ExperienceProvider.test.jsx | 1 | unidad |
| engine/scene/SceneMount.test.jsx | 1 | unidad (capa de puntero R3F) |

### Lógica de conversión y formularios (66)
| Fichero | Tests | Qué vigila |
|---|---|---|
| lib/conversion/recommendation.test.js | 34 | Motor de recomendación (el más denso del repo) |
| lib/forms/privacy.test.js | 12 | Privacidad/consentimiento de formularios |
| lib/conversion/extras.test.js | 10 | Extras del catálogo |
| lib/conversion/contentModel.test.js | 5 | Modelo de contenido |
| lib/conversion/evidence.test.js | 5 | Evidencia social |

### Store, estilos y entorno (4)
| Fichero | Tests |
|---|---|
| store/cartStore.test.js | 2 |
| styles/shop.test.js | 2 |
| *(setup)* src/test/setup.js | — (mocks jsdom: matchMedia, IntersectionObserver, ResizeObserver, scrollTo) |

### E2E — Playwright (5 + 34 capturas baseline + 2 capturas del sistema)
| Fichero | Tests | Qué vigila |
|---|---|---|
| e2e/conversion-milestones.spec.js | 5 | 4 hitos de conversión con reduced-motion + captura fullPage; teclado: skip link primer foco |
| e2e/baseline-visual.spec.js | 34 | Capturas baseline 17 rutas × desktop 1440×900 / mobile 390×844 (artefactos, no regresión; referencia histórica desde Fase 1) |
| e2e/design-system-visual.spec.js | 2 | Fase 3: capturas del playground /design-system (desktop y mobile) en carpeta propia, fuera de la baseline pública |

## 2. Entorno de test (plan 1.7–1.11)

- **jsdom + globals** (`vite.config.js`), setup en `src/test/setup.js`.
- **APIs de navegador mockeadas** (solo las que el proyecto usa): `matchMedia`
  (capabilities/motionProfile, `prefers-reduced-motion`), `IntersectionObserver`
  (notifica visible de inmediato para evaluar reveals), `ResizeObserver`, `scrollTo`.
- **Framer Motion:** mock por fichero (`vi.mock('framer-motion')`) en los 8 tests que
  renderizan motion; mantiene props/children/estructura DOM — no es un `<div>` ciego.
- **Router:** `MemoryRouter` inline por test (no hay helper compartido; patrón repetido
  que podría consolidarse en una fase posterior).
- **Playwright:** chromium headless, dev server en 127.0.0.1:4173, 1 worker, screenshots
  solo en fallo para los hitos; las capturas baseline van a `test-results/` (fuera de git).

## 3. Histórico: cómo se resolvieron los 84 fallos de `8f14698`

La auditoría externa (AUDITORIA_2026-08-25.md) midió 24/48 suites y 84/187 tests
fallando. Clasificación y resolución (commits `da3c582`, `2781999`, lotes de contratos,
`465f3db`):

| Categoría del plan | Causa en la auditoría | Resolución |
|---|---|---|
| **A — Infraestructura** (~54 fallos) | A1 `matchMedia` ausente (19), A2 `IntersectionObserver` ausente (17), A3 componentes con `<Link>` sin router (11), A4 mock framer-motion incompleto (7), A5 spec e2e inexistente (crash) | Mocks en `src/test/setup.js`; MemoryRouter en los tests afectados; mocks de motion completos; se creó `e2e/conversion-milestones.spec.js`. Commit `da3c582` |
| **B — Mock/datos comerciales** (crítico) | B1 recomendador caído al importar (`PERFORMANCE` no canónico), B2 ids de plan desalineados (`/plan/rendimiento` vs `PERFORMANCE`), B3 precio 1.539.000 vs 1.149.000, B4 extra fantasma `optimizacion-biohacking`, B5 catálogo 4 vs 3, B6 parkour vacío | El catálogo publicado de 4 planes se hizo fuente única de verdad; ids y rutas alineados; precios de contrato = publicados; extra regularizado. Commit `2781999` |
| **C — Test obsoleto** (~15) | Copy cambiado sin actualizar tests (PaseBayona, FAQ, Onboarding, ParkourAcademy, Programs, ExtrasExplorer, PlanCalculator…) | Tests reescritos como **contrato del copy vigente** en 4 lotes (`04e41aa`, `93b95c0`, `68bd915`, `f5a4b82`) |
| **D — Bug real** | Arquitectura: contrato de 11 rutas vs 17 reales; CSS `.shop-catalog-list` desaparecida | `baselineContract` actualizado a 17 rutas; regla CSS restaurada |
| **E — Contrato comercial roto** | incluido en B | resuelto con B |
| **F — Ruta/navegación** | ancla muerta en OrderConfirmation | fix de ancla en `73f7743` |
| **G — Accesibilidad** | (sin fallos de test; brechas de menú móvil documentadas) | → ACCESSIBILITY-BASELINE.md |

Resultado: `465f3db` **suite completa en verde 212/212**. Fase 1 añadió después el fix
StrictMode de RouteEffects (el e2e de teclado fallaba solo en dev por el doble efecto)
y el spec de baseline visual; gate final 212/212 + 39/39 e2e en `8e67cd2`.

## 4. Riesgos conocidos de la red de tests

- Los mocks de framer-motion están duplicados en 8 ficheros; un mock global coherente
  (plan 1.8) reduciría deriva. Candidato a fase de mantenimiento.
- `MemoryRouter` se configura a mano en cada test de página.
- El e2e corre contra el **dev server** (StrictMode activo): el comportamiento en dev y
  prod diverge en el doble montaje de efectos; el fix de RouteEffects hizo el guard
  idempotente, pero cualquier efecto nuevo con guard booleano puede reintroducir el
  problema. Regla: guards de "primera vez" por comparación de valor, no booleanos.
