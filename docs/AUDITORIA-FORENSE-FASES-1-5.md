# AUDITORÍA FORENSE FASES 1–5 · VEREDICTO · PLAN MAESTRO FASE 6 — BAYONA WEB

- **Fecha de ejecución:** 2026-08-27 (12:40–13:30 hora local)
- **Repositorio:** `C:\03_PROYECTOS\01_GRUPO_BAYONA\EMPRESA FITNESS\04_Web_App\01_BAYONA-WEB_VERSIONES\PAGINAS_WEBS_BAYONA\01_ACTUAL_EN_INTERNET`
- **Git:** github.com/sebascontigo/bayona · rama main
- **Producción:** https://bayona-jet.vercel.app
- **Ejecuta:** agente ZCode (sesión de continuación), siguiendo el PROMPT MAESTRO de auditoría forense pegado por Sebastián
- **Regla absoluta cumplida:** CERO modificaciones de código fuente, CERO commits, CERO instalaciones de dependencias durante toda la auditoría. Los gates (`npm test`, `lint`, `build`, `test:visual`) se ejecutaron tal como exige el prompt maestro; el build regeneró `dist/` (directorio gitignored, artefacto de build) — `git status` permanece limpio y ningún archivo bajo control de versiones fue tocado.

---

## PARTE I — INFORME DE AUDITORÍA FASES 1–5

### 1. Forensia Git (verificada en fresco durante esta auditoría)

| Punto | Resultado | Evidencia |
|---|---|---|
| HEAD local | `70606ddf6ac9ff375b5eecda302fa12acb4b9834` | `git rev-parse HEAD` |
| origin/main | `70606ddf6ac9ff375b5eecda302fa12acb4b9834` (idéntico) | `git rev-parse origin/main` |
| Árbol de trabajo | Limpio (sin cambios staged ni unstaged) | `git status --porcelain` vacío |
| Commits totales desde pre-Fase 1 | **16** (`8e67cd2~1..70606dd`) | `git rev-list --count` |
| Commits Fase 5 | **7** (`c9448c4..70606dd`, numerados 1/7 a 7/7 en sus mensajes) | `git rev-list --count` + `git log --oneline` |

Secuencia completa de 16 commits verificada uno a uno: Fase 1 (8e67cd2, 626d98b) → Fase 2 (38a51d0, 6d9b8e6) → Fase 3 (b962cd4, f7f3e69, 8a1656c, 330df93) → Fase 4 (c9448c4) → Fase 5 (3cdaa19, c26e525, 73fe606, da4037d, 8ee52f6, 7980885, 70606dd). Los mensajes de commit describen exactamente lo que el código contiene (cotejado archivo por archivo en la Parte I.§3).

### 2. Auditoría Fases 1–4 (afirmaciones clave verificadas contra código real)

| Afirmación histórica | Estado | Evidencia en el repo |
|---|---|---|
| F1: WhatsApp SSoT + dominio canónico bayona-jet.vercel.app | ✅ CONFIRMADO | `src/config/site.config.js:16` → `SITE_URL = 'https://bayona-jet.vercel.app'`; cero hardcodes de WhatsApp fuera de `whatsAppLink()` |
| F1: 8 documentos de baseline en raíz | ✅ CONFIRMADO | BASELINE.md, ROUTES.md, TEST-MATRIX.md, DESIGN-AUDIT.md, ASSETS-INVENTORY.md, PERFORMANCE-BASELINE.md, SEO-BASELINE.md, ACCESSIBILITY-BASELINE.md existen |
| F1: SceneErrorBoundary (el 3D no tumba la página) | ✅ CONFIRMADO | presente en SceneMount.jsx |
| F2: `role="radiogroup"` en RecommendationGuide | ✅ CONFIRMADO | `src/components/conversion/RecommendationGuide.jsx:226` |
| F2: FASE2-CIERRE.md + contratos commercialSync | ✅ CONFIRMADO | existen; DP-1…DP-5 documentadas (DP-5 sigue abierta, sin tocar — correcto) |
| F3: Design System 2.0 (11 componentes ds/) | ✅ CONFIRMADO | `src/components/ds/`: Button, CTABlock, CardBase, Container, HeroBase, Link, MediaBlock, Metric, Section, SectionLabel, Surface + index.js + tests |
| F3: playground /design-system noindex fuera de sitemap | ✅ CONFIRMADO | routeMeta `noindex: true`, robots Disallow, sitemap sin la ruta |
| F4: ROUTE_CONTINUATIONS retirado | ✅ CONFIRMADO | única aparición en `PremiumRouteChrome.jsx:7` es un COMENTARIO que documenta su retirada; cero código vivo |
| F4: Breadcrumb visible | ✅ CONFIRMADO | `src/components/navigation/Breadcrumb.jsx` existe |
| F4: Checkout = Configurador con `?plan=` fail-closed | ✅ CONFIRMADO | `src/pages/Checkout.jsx:24` + tests |
| 20 documentos raíz de las 5 fases | ✅ CONFIRMADO | los 20 existen en la raíz del repo (incl. PHASE5-MOTION-ENGINE.md, MOTION-MAP.md, SCROLL-STORY-MATRIX.md, CONTEXTO-MAESTRO-CONTINUIDAD.md) |

### 3. Auditoría profunda Fase 5 (B.1–B.15) — archivo por archivo

| # | Punto de control | Estado | Evidencia |
|---|---|---|---|
| B.1 | Sin dependencias nuevas en Fase 5; sin GSAP añadido | ✅ CONFIRMADO | `git diff c9448c4..70606dd -- package.json` = VACÍO. `gsap 3.15.0` existe en package.json pero es PREEXISTENTE (ya estaba en `8e67cd2~1`, antes de la Fase 1), tiene 0 imports en src/ y BASELINE.md:158 lo clasifica "🔴 candidato muerto". La afirmación de Fase 5 es "no añadido" y se cumple |
| B.2 | Tokens: easings exit/travel/transform + distancias + espejo CSS | ✅ CONFIRMADO | `motionTokens.js:26-28` (`exit:[0.4,0,1,1]`, `travel:[0.45,0,0.55,1]`, `transform:[0.65,0,0.35,1]`), grupo `distance` near/medium/far, `distancePx()` con fallback (línea 91-92); espejo `--ds-ease-*` (ds-tokens.css:176-178) y `--ds-dist-near/medium/far = 16/48/120px` (181-183) |
| B.2b | Duraciones siguen en conjunto CERRADO de 4 | ✅ CONFIRMADO | `duration: { fast:0.2, base:0.4, slow:0.8, curtain:0.82 }` — exactamente 4 |
| B.3 | ExperienceProvider: doble contexto, UNA suscripción Lenis, 0 listeners extra | ✅ CONFIRMADO | `ScrollContext` (línea 34) + `ScrollStateContext` con velocity/direction como MotionValues (línea 51); una sola suscripción `lenis.on('scroll', …)` con cleanup `lenis.off` (109-116); fallback nativo con `removeEventListener` (147) |
| B.4 | useSectionProgress + SECTION_RANGES congelados | ✅ CONFIRMADO | `useSectionProgress.js:30-34`: `Object.freeze({ traverse, enter, pin, exit })` con vocabulario de edges de Framer Motion |
| B.5 | scrollHandoff: snapshot puro, congelado, fail-safe, 7 campos | ✅ CONFIRMADO | `createHandoffSnapshot()` → `{progress, velocity, direction, viewport, reducedMotion, mode, dprLimit}`; defaults fail-safe (reducedMotion=true, mode='mobile', dprLimit=1.5); lectura de viewport SSR/jsdom-safe |
| B.6 | Marquee declarativo | ✅ CONFIRMADO | `pauseOnHover` solo con `caps.canHover` (puntero fino); `reducedMotion` → rail estático sin duplicado; `aria-hidden` en duplicados; direction/duration/gap con saneamiento (`safeGap`) |
| B.7 | TextMask | ✅ CONFIRMADO | `aria-label` con texto completo, líneas animadas `aria-hidden="true"`, `reducedMotion` → texto plano estático |
| B.8 | StickyStage | ✅ CONFIRMADO | `resolveStageIndex(progress, states)` y `resolveStageLength` puras con validación; `useMotionValueEvent`; fallback reduced/móvil |
| B.9 | HorizontalPassage | ✅ CONFIRMADO | ResizeObserver con `observer.disconnect()` en cleanup (línea 81); guard `typeof ResizeObserver === 'undefined'`; solo desktop y sin reduced-motion; fallback vertical |
| B.10 | Recetas: exactamente 8 | ✅ CONFIRMADO | ids: editorial-reveal, editorial-slide, compact-rail, cinematic-stage, data-cascade, image-drift, horizontal-passage, quiet-transition |
| B.11 | motionBudget + checkBudget | ✅ CONFIRMADO | `MOTION_BUDGETS` congelado: hero weight 3, body 2, supporting 1, cta 2, background 0; `checkBudget(zones, intensity)` export (línea 69); intensidades quiet/balanced/immersive en intensity.js |
| B.12 | pageMotionContract fail-safe | ✅ CONFIRMADO | `resolvePageMotionContract` (degrada cada campo inválido a default, nunca lanza), `validatePageMotionContract`, `describeMotionOffer` |
| B.13 | MotionDebug dev-only | ✅ CONFIRMADO | doble gate: `if (!import.meta.env.DEV) return null` (Vite elimina la rama del bundle de producción estáticamente) + query param `?motionDebug=1` |
| B.14 | Playground /design-system bloques 10–16 + SEO | ✅ CONFIRMADO | bloques "10 · Scroll storytelling", "11 · Marquee", "12 · TextMask", "13 · StickyStage", "14 · HorizontalPassage", "15 · Handoff 3D", "16 · Recetas de movimiento"; `routeMeta.js:111-116` noindex:true; `RouteSeo.jsx:36-37` renderiza `noindex, follow`; robots.txt `Disallow: /design-system`; sitemap (14 URLs) sin la ruta |
| B.15 | **BLOQUEANTE:** ninguna página pública rediseñada | ✅ CONFIRMADO | `git diff --stat c9448c4..70606dd -- src/pages/` = SOLO `DesignSystem.jsx` (+233) y su test. Cero cambios en las 17 rutas públicas |

### 4. Forensia de tests + gates reales (ejecutados en esta auditoría)

**Caza de trampas (src/ y e2e/):** `test.skip`, `it.skip`, `describe.skip`, `xit(`, `xdescribe(`, `test.todo`, `it.todo`, `.only(` → **0 apariciones**. Assertions débiles `expect(true)` → **0 apariciones**.

**Archivos nuevos de test en Fase 5:** el informe afirma +12 ficheros → `git diff --diff-filter=A` lista EXACTAMENTE 12: MotionDebug, Marquee, TextMask, ExperienceProvider.scrollState, intensity, motionBudget, pageMotionContract, recipes, HorizontalPassage, StickyStage, scrollHandoff, useSectionProgress. ✅

**Gates ejecutados de verdad (2026-08-27):**

| Gate | Resultado real | Coincide con lo afirmado |
|---|---|---|
| `npm test` (vitest --run) | **71 ficheros, 381/381 passed** (32.88 s) | ✅ exacto |
| `npm run lint` (eslint) | **0 errores, 16 warnings** | ✅ exacto |
| `npm run build` (vite) | **OK en 15.14 s** (entry 336.89 kB, vendor-three 826.94 kB — warning de chunk preexistente) | ✅ |
| `npm run test:visual` (Playwright) | **41/41 passed** (3.7 min) | ✅ exacto |

### 5. Auditoría de producción (bayona-jet.vercel.app, vía HTTP directo)

| Control | Resultado |
|---|---|
| Home HTTP 200 + `<title>` correcto | ✅ CONFIRMADO |
| Canonical `https://bayona-jet.vercel.app/` | ✅ CONFIRMADO |
| `og:url` canónico | ✅ CONFIRMADO |
| robots meta home `index, follow` | ✅ CONFIRMADO |
| sitemap.xml: 14 URLs, 0 apariciones de design-system/checkout/order-confirmation | ✅ CONFIRMADO |
| robots.txt: Disallow /checkout, /order-confirmation, /design-system + Sitemap | ✅ CONFIRMADO |
| /plan/fuerza: precio 299.000 COP + JSON-LD Product (price 299000, COP) + BreadcrumbList | ✅ CONFIRMADO |
| WhatsApp SSoT vivo en producción: `wa.me/34614988006` | ✅ CONFIRMADO |
| **Producción = build de HEAD** | ✅ CONFIRMADO — el HTML de producción referencia `assets/index-C6u8ju_1.js`, hash IDÉNTICO al asset generado por el build local de HEAD ejecutado hoy |
| noindex de embudo en el HTML estático | ⚠️ PARCIALMENTE CONFIRMADO — ver observación OBS-1 |
| Ruta inexistente devuelve HTTP 200 (soft-404 SPA) | ⚠️ Observación OBS-2 |

**OBS-1 (no bloqueante):** las rutas no emitidas como HTML estático (/checkout, /order-confirmation, /design-system) se sirven vía fallback SPA cuyo shell dice `index, follow`; el `noindex` real lo aplica (a) `robots.txt` Disallow —que impide el rastreo— y (b) el meta client-side de RouteSeo tras hidratación (routeMeta tiene `noindex: true` en /checkout:97, /order-confirmation:103, /design-system:114). El diseño es deliberado (`indexableRoutes()` solo emite HTML de rutas indexables) y la protección efectiva existe; queda como endurecimiento opcional emitir shell con noindex para esas rutas.

**OBS-2 (no bloqueante):** las rutas inexistentes responden HTTP 200 con la SPA (NotFound renderiza noindex client-side). Comportamiento estándar de SPA; se registra como mejora SEO opcional (status 404 real vía vercel.json).

### 6. Tabla informe vs. realidad — 30 afirmaciones

| # | Afirmación del informe de Fase 5 | Veredicto | Evidencia |
|---|---|---|---|
| 1 | HEAD = 70606dd e idéntico a origin/main | ✅ CONFIRMADO | rev-parse ambos = mismo SHA |
| 2 | 16 commits desde pre-Fase 1 | ✅ CONFIRMADO | rev-list --count = 16 |
| 3 | Fase 5 = 7 commits (c9448c4..70606dd) | ✅ CONFIRMADO | rev-list --count = 7 |
| 4 | Árbol limpio, nada sin commitear | ✅ CONFIRMADO | status --porcelain vacío |
| 5 | Cero dependencias añadidas en Fase 5 | ✅ CONFIRMADO | diff package.json vacío |
| 6 | Sin GSAP añadido (motor único Framer Motion) | ✅ CONFIRMADO | gsap es deuda preexistente documentada, 0 imports |
| 7 | 381/381 tests | ✅ CONFIRMADO | ejecución real hoy |
| 8 | 71 ficheros de test | ✅ CONFIRMADO | ejecución real hoy |
| 9 | +12 ficheros de test nuevos en Fase 5 | ✅ CONFIRMADO | git diff --diff-filter=A |
| 10 | 0 skips / 0 .only / 0 tests falsos | ✅ CONFIRMADO | grep forense |
| 11 | lint 0 errores / 16 warnings | ✅ CONFIRMADO | ejecución real hoy |
| 12 | build OK | ✅ CONFIRMADO | ejecución real hoy |
| 13 | Playwright 41/41 | ✅ CONFIRMADO | ejecución real hoy |
| 14 | Easings exit/travel/transform + espejo CSS | ✅ CONFIRMADO | motionTokens.js:26-28, ds-tokens.css:176-178 |
| 15 | Distancias near/medium/far + distancePx() | ✅ CONFIRMADO | motionTokens.js:91-92, ds-tokens.css:181-183 |
| 16 | Duraciones cerradas en 4 | ✅ CONFIRMADO | fast/base/slow/curtain |
| 17 | ScrollStateContext velocity/direction, 0 listeners extra | ✅ CONFIRMADO | ExperienceProvider.jsx:51,109-116,147 |
| 18 | SECTION_RANGES traverse/enter/pin/exit congelados | ✅ CONFIRMADO | useSectionProgress.js:30-34 |
| 19 | createHandoffSnapshot 7 campos fail-safe | ✅ CONFIRMADO | scrollHandoff.js |
| 20 | Marquee (canHover, reduced→estático, aria) | ✅ CONFIRMADO | Marquee.jsx |
| 21 | TextMask (aria-label, reduced→plano) | ✅ CONFIRMADO | TextMask.jsx |
| 22 | StickyStage (estados por umbral, validación length) | ✅ CONFIRMADO | StickyStage.jsx |
| 23 | HorizontalPassage (ResizeObserver + cleanup, fallback) | ✅ CONFIRMADO | HorizontalPassage.jsx:76-85 |
| 24 | 8 recetas declarativas | ✅ CONFIRMADO | recipes/index.js (8 ids) |
| 25 | Budgets hero3/body2/supporting1/cta2/background0 + checkBudget | ✅ CONFIRMADO | motionBudget.js:15-69 |
| 26 | pageMotionContract resolve/validate/describe fail-safe | ✅ CONFIRMADO | pageMotionContract.js:37-106 |
| 27 | MotionDebug dev-only fuera del bundle prod | ✅ CONFIRMADO | MotionDebug.jsx:43 + gate query |
| 28 | Playground bloques 10–16 + noindex + fuera de sitemap | ✅ CONFIRMADO | DesignSystem.jsx:407-529, routeMeta:111, robots, sitemap |
| 29 | Ninguna página pública rediseñada | ✅ CONFIRMADO | diff src/pages/ = solo DesignSystem |
| 30 | Producción = HEAD; canonical/sitemap/robots/precios/WhatsApp intactos; noindex embudo | ⚠️ PARCIALMENTE CONFIRMADO | build idéntico (hash asset), canonical/OG/sitemap/robots/299.000 COP/wa.me ✅; noindex efectivo vía robots+client-side, pero el shell estático del fallback no lleva el meta (OBS-1) |

**Resultado global: 29 CONFIRMADO · 1 PARCIALMENTE CONFIRMADO · 0 CONTRADICHO · 0 NO VERIFICABLE.**

### 7. VEREDICTO ÚNICO

> ## ✅ C — APROBADA
>
> Las Fases 1–5 quedan **APROBADAS**. Las 30 afirmaciones del informe se verificaron contra el repositorio real, los cuatro gates se ejecutaron de verdad y pasaron, la forensia de tests no encontró trampas (0 skips, 0 tests falsos), la producción sirve exactamente el build de HEAD con todos los contratos comerciales y SEO intactos, y la comprobación BLOQUEANTE (ninguna página pública rediseñada en Fase 5) se cumple. Se registran dos observaciones menores no bloqueantes (OBS-1 shell estático del embudo sin meta noindex; OBS-2 soft-404 HTTP 200), ambas candidatas a endurecimiento en el plan de Fase 6, ninguna contradictoria con lo afirmado.

---

## ⚠️ BANDERA CRÍTICA ANTES DEL PLAN — CONFLICTO ENTRE LOS DOS DOCUMENTOS PEGADOS

Los dos documentos que acompañaron la orden "ejecuta" se **contradicen en qué es la Fase 6**:

| Documento | Define Fase 6 como |
|---|---|
| **(a) Veredicto de ChatGPT** "🟢 FASE 5 — APROBADA PARA CONTINUAR" | **BAYONA WORLD BUILDING**: lenguaje de experiencia, mundos 00–08, gramática espacial, blueprints de página. Trabajo DOCUMENTAL (sin rediseño de páginas, sin escenas 3D nuevas, sin código de páginas). Su propio roadmap deja la implementación de páginas para la Fase 8 |
| **(b) PROMPT MAESTRO** de auditoría | En su sección de plan prohíbe explícitamente "implementar World Building" y describe la Fase 6 como "MIGRACIÓN Y REDISEÑO DE EXPERIENCIA DE LAS PÁGINAS PÚBLICAS PRIORITARIAS" |

**Recomendación del equipo auditor:** ejecutar la Fase 6 como **WORLD BUILDING según el documento (a)**, por tres razones:
1. El documento (a) es el veredicto MÁS RECIENTE del auditor que gobierna el pipeline (ChatGPT aprobó la Fase 5 y a continuación definió la Fase 6); el documento (b) fue redactado como plantilla de auditoría antes de esa definición.
2. El pipeline aprobado por Sebastián opera con la regla "PLAN MAESTRO + FASE ACTUAL solamente; STOP al terminar cada fase", y la fase actual definida por el auditor es World Building.
3. World Building es la secuencia correcta de ingeniería: definir el lenguaje espacial ANTES de migrar páginas evita rediseñar dos veces. La migración de páginas (lo que (b) llama Fase 6) es la Fase 8 del roadmap de (a).

**El plan de abajo se escribe para la Fase 6 = WORLD BUILDING (documento a).** Si Sebastián decide lo contrario, el plan completo debe reescribirse — no mezclarse.

---

## PARTE II — PLAN MAESTRO FASE 6: BAYONA WORLD BUILDING

**Naturaleza:** 100% documental y de diseño. CERO modificaciones de páginas públicas, CERO escenas 3D nuevas, CERO dependencias nuevas, CERO commits de código. Los únicos archivos que se crean/modifican son documentos Markdown en la raíz del repo y (bloque 10) tests de contrato que validan documentos.

**Documentos obligatorios a entregar (spec del documento a):** FASE6-WORLD-BUILDING.md · SPATIAL-LANGUAGE.md · PAGE-BLUEPRINTS.md · WORLD-3D-STRATEGY.md · ANTI-PATTERNS-BAYONA.md · IMPLEMENTATION-ROADMAP-V2.md · PAGE-BLUEPRINT-MATRIX.md

**Presupuesto:** 175 tareas reales en 13 bloques, prioridades P0 (crítico) / P1 (alto) / P2 (medio) / P3 (opcional).

### BLOQUE 0 — Custodia y precondiciones (P0) · 12 tareas
**Objetivo:** congelar el terreno antes de escribir una sola palabra: verificar repo, proteger contratos vivos y dejar constancia del punto de partida.
**Archivos:** CONTEXTO-MAESTRO-CONTINUIDAD.md (append), snapshot interno de trabajo.
**Riesgos:** arrancar con estado git sucio o con contratos desactualizados.
**Tests:** `git status` limpio + gates verdes re-verificados.
**Definición de hecho:** punto de partida verificado y congelado por escrito.

- T-001 Verificar HEAD = origin/main y árbol limpio antes de empezar (evidencia rev-parse).
- T-002 Re-leer los 20 documentos raíz de Fases 1–5 y listar los que aplican a World Building.
- T-003 Re-leer CONTEXTO-MAESTRO-CONTINUIDAD.md y añadir entrada "Fase 6 iniciada (fecha)".
- T-004 Congelar por escrito la lista de contratos DO-NOT-BREAK (catálogo, precios, WhatsApp, checkout sin pago, PDFs, SEO, noindex, reduced-motion, fallback móvil, error boundary 3D, DP-5 sin resolver).
- T-005 Verificar que DP-5 sigue abierta y registrar que Fase 6 NO la toca.
- T-006 Re-leer DESIGN-SYSTEM.md §15 (decisiones v2 adoptadas) como input de mundo.
- T-007 Re-leer PHASE5-MOTION-ENGINE.md + MOTION-MAP.md + SCROLL-STORY-MATRIX.md (el mundo debe expresarse con estos tokens, no inventar otros).
- T-008 Re-leer PAGE-EXPERIENCE-MATRIX.md (17×16) y ROUTE-JOURNEYS.md (10 journeys) como inventario de territorios.
- T-009 Re-leer FASE3-VEREDICTO.md (directrices del auditor) y extraer restricciones vigentes.
- T-010 Definir y documentar la regla STOP de Fase 6: al terminar, NO empezar Fase 7/8, esperar auditoría ChatGPT.
- T-011 Crear esqueleto de los 7 documentos obligatorios (solo títulos y propósito, sin contenido).
- T-012 Registrar en el informe de arranque qué queda fuera de Fase 6 (código de páginas, 3D nuevo, Fase 7 handoff real, Fase 8 migración).

### BLOQUE 1 — Fundamento verbal e identidad de experiencia (P0) · 16 tareas
**Objetivo:** definir CÓMO HABLA y CÓMO SE SIENTE BAYONA antes de definir cómo se ve en el espacio: voz, tono, vocabulario y principios de experiencia.
**Archivos:** FASE6-WORLD-BUILDING.md (sección 1), SPATIAL-LANGUAGE.md (sección fundamento).
**Riesgos:** voz genérica de fitness; contradecir copy comercial ya publicado (catálogo es fuente de verdad).
**Tests:** revisión cruzada contra conversionContent.js y offerings.js (solo lectura); checklist de coherencia verbal.
**Definición de hecho:** matriz de voz aprobable por Sebastián, con vocabulario cerrado y términos prohibidos.

- T-013 Auditar (solo lectura) la voz actual en copy de Home, planes, onboarding y extraer patrones reales.
- T-014 Definir los 3–5 principios de experiencia BAYONA (p. ej. presencia sin teatro, esfuerzo honesto, lujo sin ostentación).
- T-015 Redactar la promesa de experiencia en una frase (y su anti-promesa).
- T-016 Matriz de tono por audiencia: recién llegado / ya entrena / busca élite.
- T-017 Matriz de tono por zona: apertura / cuerpo / apoyo / cierre (alineada a motionBudget zones).
- T-018 Vocabulario aprobado: lista cerrada de palabras BAYONA (movimiento, fuerza, raíz…).
- T-019 Vocabulario prohibido: términos vetados (p. ej. "revolucionario", "garantizado", claims médicos).
- T-020 Reglas de tratamiento: tú/usted, longitud de frase, puntuación, uso de mayúsculas.
- T-021 Voz del sistema: cómo hablan los estados (error, carga, vacío, confirmación).
- T-022 Voz de conversión: cómo pide BAYONA el siguiente paso sin presión (WhatsApp-first, sin pago online).
- T-023 Nombrar verbalmente los 9 mundos (00–08): nombre, subtítulo y una línea de esencia por mundo.
- T-024 Definir el "idioma de transición": cómo se anuncia verbalmente el paso entre mundos (o su silencio).
- T-025 Reglas de microcopy espacial: etiquetas de scroll, indicadores de progreso, hints de interacción.
- T-026 Cotejar el vocabulario contra el catálogo publicado (ninguna palabra puede prometer lo que el catálogo no dice).
- T-027 Escribir 3 ejemplos canónicos de copy por mundo (apertura, cuerpo, cierre).
- T-028 Test manual: leer los ejemplos en voz alta — checklist de "suena a BAYONA" (criterios objetivos).

### BLOQUE 2 — SPATIAL-LANGUAGE.md: gramática espacial (P0) · 20 tareas
**Objetivo:** el corazón de Fase 6: definir el lenguaje espacial de BAYONA — profundidad, luz, material, cámara, escala y ritmo — mapeado 1:1 a los tokens de motion existentes.
**Archivos:** SPATIAL-LANGUAGE.md.
**Riesgos:** gramática incompatible con motionTokens (duraciones cerradas, 3 easings, 3 distancias); gramática que exija GSAP o librerías nuevas (prohibido).
**Tests:** tabla de trazabilidad gramática→token; cada regla espacial debe citar el token exacto que la ejecuta o declararse "fuera de presupuesto".
**Definición de hecho:** cualquier página futura puede diseñarse usando SOLO este documento + motionTokens.

- T-029 Definir la metáfora espacial maestra de BAYONA (el espacio físico que inspira todo: p. ej. gimnasio de hormigón y luz cenital / paisaje de fuerza).
- T-030 Definir las 3 capas de profundidad (fondo / medio / frente) y qué contenido vive en cada una.
- T-031 Regla de parallax: cuándo se permite, amplitud máxima (mapeada a distance near/medium/far), cuándo se prohíbe.
- T-032 Gramática de la luz: dirección, dureza, temperatura por mundo; regla de "una sola fuente de verdad lumínica".
- T-033 Gramática de materiales: lista cerrada de materiales BAYONA (p. ej. hormigón, metal, piel, niebla) y su traducción visual (textura/brillo/grano).
- T-034 Gramática de cámara: posiciones canónicas (cenital, frontal, rasante) y qué significan narrativamente.
- T-035 Reglas de movimiento de cámara: qué easing del sistema corresponde a cada movimiento (exit=retirada, travel=desplazamiento, transform=revelación).
- T-036 Gramática de escala: tamaño relativo de tipografía y objeto según jerarquía narrativa (titular de mundo vs. nota).
- T-037 Regla del horizonte: dónde vive la línea de horizonte visual y cómo se desplaza entre secciones.
- T-038 Gramática del vacío: proporción mínima de espacio negativo por zona (hero/body/supporting).
- T-039 Reglas de entrada de elementos: por dónde entran los elementos al mundo (desde abajo/desde lejos/desde detrás de máscara) según su naturaleza.
- T-040 Reglas de salida: cómo se retiran los elementos (nunca desaparecer de golpe salvo transición de mundo).
- T-041 Gramática del scroll: qué significa bajar (avanzar hacia adentro / descender al esfuerzo) y qué significa llegar al fondo de un mundo.
- T-042 Mapeo velocidad de scroll → narrativa: qué hace el mundo cuando el usuario viaja rápido vs. lento (usando velocity del ScrollStateContext, solo documental).
- T-043 Regla de densidad: máximos de elementos animados simultáneos por zona (coherente con MOTION_BUDGETS).
- T-044 Gramática de transición entre mundos: los 3 tipos canónicos (cortina, umbral, fundido) y cuál usa cada frontera (usar duration curtain donde aplique).
- T-045 Regla reduced-motion del lenguaje: versión estática de CADA regla espacial (el mundo debe existir sin movimiento).
- T-046 Regla móvil del lenguaje: cómo se degrada cada regla espacial en móvil (antes de cualquier implementación).
- T-047 Tabla de trazabilidad completa: regla espacial → token/mecanismo del engine (una fila por regla).
- T-048 Lista de lo que el lenguaje espacial NO es (anti-alcance): sin scrolljacking, sin 3D obligatorio, sin vídeo de fondo automático.

### BLOQUE 3 — Mundos 00–08 (P0) · 29 tareas
**Objetivo:** definir los 9 mundos del universo BAYONA: carta de identidad, gramática espacial propia y contrato de movimiento de cada uno.
**Archivos:** FASE6-WORLD-BUILDING.md (sección mundos), fichas por mundo dentro del documento.
**Riesgos:** mundos que no correspondan a rutas reales; mundos que exijan recursos inexistentes; solapamiento visual entre mundos.
**Tests:** checklist por mundo (identidad + espacial + movimiento + reduced + móvil); test de distinguibilidad (dos mundos cualesquiera deben distinguirse en 1 segundo).
**Definición de hecho:** 9 fichas completas; cada una cita qué rutas habitan el mundo y qué tokens usa.

- T-049 Definir el mapa mundo↔rutas: asignar las 17 rutas públicas + páginas internas a mundos 00–08 (una ruta puede tocar dos mundos en su transición).
- T-050 Mundo 00 (Umbral / marca común): carta de identidad (esencia, emoción objetivo, qué NO es).
- T-051 Mundo 00: gramática espacial propia (luz, material, cámara, profundidad) heredando SPATIAL-LANGUAGE.
- T-052 Mundo 00: contrato de movimiento (recetas del sistema aplicables, budget por zona, transiciones de entrada/salida).
- T-053 Mundo 01: carta de identidad.
- T-054 Mundo 01: gramática espacial propia.
- T-055 Mundo 01: contrato de movimiento.
- T-056 Mundo 02: carta de identidad.
- T-057 Mundo 02: gramática espacial propia.
- T-058 Mundo 02: contrato de movimiento.
- T-059 Mundo 03: carta de identidad.
- T-060 Mundo 03: gramática espacial propia.
- T-061 Mundo 03: contrato de movimiento.
- T-062 Mundo 04: carta de identidad.
- T-063 Mundo 04: gramática espacial propia.
- T-064 Mundo 04: contrato de movimiento.
- T-065 Mundo 05: carta de identidad.
- T-066 Mundo 05: gramática espacial propia.
- T-067 Mundo 05: contrato de movimiento.
- T-068 Mundo 06: carta de identidad.
- T-069 Mundo 06: gramática espacial propia.
- T-070 Mundo 06: contrato de movimiento.
- T-071 Mundo 07: carta de identidad.
- T-072 Mundo 07: gramática espacial propia.
- T-073 Mundo 07: contrato de movimiento.
- T-074 Mundo 08 (cierre / salida): carta de identidad.
- T-075 Mundo 08: gramática espacial propia.
- T-076 Mundo 08: contrato de movimiento.
- T-077 Matriz de fronteras: para cada par de mundos vecinos, qué transición canónica los une (cortina/umbral/fundido) y por qué.
- T-078 Test de distinguibilidad: descripción de 1 segundo de cada mundo — dos mundos no pueden compartir descripción.

*(Nota: la numeración y nombres definitivos de los mundos 00–08 siguen la spec del documento (a) que tiene Sebastián; este plan asume 9 mundos según lo pegado.)*

### BLOQUE 4 — PAGE-BLUEPRINTS.md (P1) · 20 tareas
**Objetivo:** blueprints (planos) de experiencia por página: la traducción del mundo a estructura concreta por ruta, SIN implementar nada.
**Archivos:** PAGE-BLUEPRINTS.md.
**Riesgos:** blueprints que contradigan ROUTES.md o PAGE-EXPERIENCE-MATRIX.md; blueprints que impliquen rediseño fuera de Fase 8.
**Tests:** cotejo 1:1 blueprint↔ruta (17 rutas); cada blueprint declara mundo, recetas y budget; checklist "implementable en Fase 8 sin decisiones nuevas".
**Definición de hecho:** 17 blueprints + plantilla reutilizable.

- T-079 Diseñar la PLANTILLA DE BLUEPRINT: secciones canónicas (mundo, objetivo de página, journey, estructura de secciones, recetas por sección, budget, 3D sí/no, reduced, móvil, SEO, contrato comercial).
- T-080 Blueprint de Home (/).
- T-081 Blueprint de /programs.
- T-082 Blueprint de /plan/raiz.
- T-083 Blueprint de /plan/fuerza.
- T-084 Blueprint de /plan/rendimiento.
- T-085 Blueprint de /plan/elite (respetando que el claim "acceso de por vida" sigue pendiente de decisión de Sebastián).
- T-086 Blueprint de /onboarding.
- T-087 Blueprint de /shop.
- T-088 Blueprint de /resources.
- T-089 Blueprint de /community.
- T-090 Blueprint de /about.
- T-091 Blueprint de /faq.
- T-092 Blueprint de /parkour-academy (respetando su estado honesto de pre-apertura).
- T-093 Blueprint de /app.
- T-094 Blueprint de /checkout (Configurador; embudo noindex; orden PLAN→CLASES→EXTRAS→DATOS vigente de Fase 4).
- T-095 Blueprint de /order-confirmation.
- T-096 Blueprint de /entrar y recepción.
- T-097 Blueprint de 404 (mundo de salida).
- T-098 Verificar que cada blueprint declara explícitamente QUÉ NO CAMBIA (contratos comerciales y SEO de la página).
- T-099 Índice cruzado: blueprint → mundo → recetas → tokens (tabla única).

### BLOQUE 5 — WORLD-3D-STRATEGY.md (P1) · 14 tareas
**Objetivo:** estrategia 3D del universo: cuándo el 3D sirve al mundo y cuándo sobra. CERO escenas nuevas — solo doctrina.
**Archivos:** WORLD-3D-STRATEGY.md.
**Riesgos:** doctrina que prometa escenas que el hardware objetivo no mueve; contradecir el handoff de Fase 5 (createHandoffSnapshot) o SceneErrorBoundary.
**Tests:** cada criterio de decisión es binario (sí/no con evidencia); matriz 3D por ruta 17 filas.
**Definición de hecho:** cualquier escena 3D futura se justifica o se rechaza usando SOLO este documento.

- T-100 Inventario documental del 3D actual (SceneMount, scenePresets, LightingRig — solo lectura).
- T-101 Criterios de admisión 3D: las 4 preguntas que una escena debe responder para existir.
- T-102 Matriz 3D por ruta (17 filas): 3D sí/no/condicional y por qué.
- T-103 Doctrina de presupuesto 3D: DPR límite por modo (coherente con dprLimit del handoff), polígonos, texturas.
- T-104 Doctrina de fallback: qué ve el usuario sin WebGL, con reduced-motion, en móvil (el mundo debe sobrevivir sin 3D).
- T-105 Doctrina SceneErrorBoundary: el 3D nunca tumba la página (contrato vigente, extenderlo a doctrina).
- T-106 Doctrina de handoff: cómo las escenas futuras reciben y devuelven el snapshot de scroll (contrato createHandoffSnapshot, sin implementar).
- T-107 Doctrina de carga: lazy, suspense, placeholder — regla de "el 3D nunca retrasa el mensaje".
- T-108 Doctrina de luz 3D: una luz maestra por mundo (coherente con LightingRig y la gramática de luz).
- T-109 Doctrina de material 3D: materiales del mundo traducidos a parámetros (sin nombrar librerías nuevas).
- T-110 Doctrina de cámara 3D: cámaras canónicas por mundo.
- T-111 Lista de escenas candidatas futuras (solo nombres y mundo; implementación = Fase 7+).
- T-112 Lista de escenas rechazadas y por qué (anti-patrón registrado).
- T-113 Regla de no-regresión: ninguna escena nueva puede romper los 41 tests E2E ni el presupuesto de build.

### BLOQUE 6 — ANTI-PATTERNS-BAYONA.md (P1) · 10 tareas
**Objetivo:** catálogo de lo que BAYONA NUNCA hace: anti-patrones de motion, 3D, scroll y conversión, con regla de detección.
**Archivos:** ANTI-PATTERNS-BAYONA.md.
**Riesgos:** catálogo genérico; anti-patrones sin mecanismo de detección.
**Tests:** cada anti-patrón tiene: descripción, por qué daña a BAYONA, cómo se detecta en review.
**Definición de hecho:** el documento sirve de checklist en las revisiones de Fase 8.

- T-114 Anti-patrones de scroll: scrolljacking, pin infinito sin salida, progreso sin significado.
- T-115 Anti-patrones de motion: animar por animar, easing incorrecto para la acción (exit para entrar), duración fuera del conjunto cerrado.
- T-116 Anti-patrones de densidad: más de budget, todo "hero", ruido de fondo animado sin propósito.
- T-117 Anti-patrones 3D: 3D decorativo sin función, escena sin fallback, 3D que retrasa contenido.
- T-118 Anti-patrones de transición: transición entre mundos sin gramática, cortinas encadenadas, fundidos eternos.
- T-119 Anti-patrones de accesibilidad: movimiento sin reduced-motion, aria roto por duplicados animados, foco atrapado en secciones pinned.
- T-120 Anti-patrones de conversión: presión artificial, countdown falso, CTA que interrumpe narrativa de mundo.
- T-121 Anti-patrones verbales: claims prohibidos (ver T-019), voz que no es BAYONA, jerga.
- T-122 Anti-patrones de performance: chunks gigantes nuevos, texturas pesadas, listeners de scroll duplicados.
- T-123 Anti-patrón maestro: "rediseñar todo a la vez" — regla de migración página a página de Fase 8.

### BLOQUE 7 — IMPLEMENTATION-ROADMAP-V2.md (P2) · 12 tareas
**Objetivo:** reordenar el roadmap completo post-Fase 5: qué viene después de World Building, en qué orden, con qué criterios de entrada/salida.
**Archivos:** IMPLEMENTATION-ROADMAP-V2.md.
**Riesgos:** roadmap que pise fases del auditor (Fase 7 handoff 3D real, Fase 8 migración); criterios de salida vagos.
**Tests:** cada fase del roadmap tiene: entrada, salida, contratos que protege, gate de verificación.
**Definición de hecho:** Sebastián y ChatGPT pueden aprobar/rechazar una fase futura leyendo solo este documento.

- T-124 Consolidar el estado actual: Fases 1–5 aprobadas, qué dejó cada una listo para usar.
- T-125 Definir Fase 7 (según el auditor): handoff 3D real — alcance, entrada/salida.
- T-126 Definir Fase 8: migración de páginas página a página — orden propuesto y por qué.
- T-127 Priorización de migración: matriz valor/riesgo de las 17 rutas para ordenar Fase 8.
- T-128 Criterios de "página migrada": checklist de aceptación (mundo aplicado, budget cumplido, reduced, móvil, SEO, contratos, tests).
- T-129 Estrategia de tests por fase futura: qué contratos nuevos se añaden y cuáles jamás se tocan.
- T-130 Plan de no-regresión comercial: cómo se garantiza catálogo/precios/WhatsApp en cada migración.
- T-131 Plan de performance: presupuesto de bundle por fase (entry JS no debe crecer sin justificación).
- T-132 Plan de SEO por fase: canonical/sitemap/robots intactos; endurecimientos OBS-1/OBS-2 aquí programados.
- T-133 Plan de accesibilidad por fase: reduced-motion y teclado como gates.
- T-134 Riesgos globales del roadmap y mitigaciones (incl. dependencia de decisiones pendientes de Sebastián: DP-5, ELITE "por vida").
- T-135 Regla STOP por fase: cada fase termina en auditoría ChatGPT; ninguna arranca sola.

### BLOQUE 8 — PAGE-BLUEPRINT-MATRIX.md (P2) · 8 tareas
**Objetivo:** la matriz maestra cruzada: 17 rutas × (mundo, recetas, budget, 3D, transiciones, estado) — vista de pájaro del universo completo.
**Archivos:** PAGE-BLUEPRINT-MATRIX.md.
**Riesgos:** matriz inconsistente con PAGE-BLUEPRINTS.md o PAGE-EXPERIENCE-MATRIX.md.
**Tests:** test de consistencia documental: cada celda de la matriz cita su blueprint; cero celdas vacías salvo declaradas "fuera de alcance".
**Definición de hecho:** una sola pantalla mental del universo BAYONA.

- T-136 Diseñar el esquema de la matriz (filas = 17 rutas + internas; columnas = mundo/objetivo/recetas/budget/3D/transición de entrada/transición de salida/reduced/móvil/SEO/estado).
- T-137 Rellenar matriz para rutas de descubrimiento (home, programs, planes ×4).
- T-138 Rellenar matriz para rutas de conocimiento (resources, about, faq, community).
- T-139 Rellenar matriz para rutas de experiencia (parkour-academy, app).
- T-140 Rellenar matriz para embudo (onboarding, checkout, order-confirmation, entrar).
- T-141 Rellenar matriz para salidas (404) e internas (design-system).
- T-142 Verificación cruzada matriz↔blueprints↔ROUTE-JOURNEYS (cero contradicciones).
- T-143 Columna "estado": marcar todo como "blueprint pendiente Fase 8" (nada implementado).

### BLOQUE 9 — FASE6-WORLD-BUILDING.md: documento maestro (P2) · 8 tareas
**Objetivo:** el documento paraguas que resume y enlaza todo el World Building: manifiesto del universo.
**Archivos:** FASE6-WORLD-BUILDING.md.
**Riesgos:** duplicar contenido en vez de enlazar; manifiesto sin capacidad de decisión.
**Tests:** cada sección enlaza al documento de detalle; checklist "¿resuelve dudas sin abrir otros docs?".
**Definición de hecho:** es el primer documento que lee cualquier fase futura.

- T-144 Manifiesto: qué es el universo BAYONA en 1 página.
- T-145 Índice del universo: mapa de documentos y qué decide cada uno.
- T-146 Resumen ejecutivo de los 9 mundos (una línea + enlace a ficha).
- T-147 Reglas de oro (las 10 reglas que ninguna fase futura puede romper).
- T-148 Glosario BAYONA: términos del universo con definición única.
- T-149 Decisiones pendientes de Sebastián (DP-5, ELITE, nombres de mundos si aplique).
- T-150 Lo que Fase 6 NO hizo (alcance negativo explícito).
- T-151 Criterios de éxito del World Building: cómo se sabrá que el universo está listo para Fase 7/8.

### BLOQUE 10 — Protección contractual y consistencia (P1) · 12 tareas
**Objetivo:** blindar que Fase 6 no romja nada y que sus documentos sean verificables: tests de contrato documental y resincronización de documentos vivos.
**Archivos:** src/test/ (solo si el auditor autoriza tests documentales; si no, checklists en docs), TEST-MATRIX.md, CONTEXTO-MAESTRO-CONTINUIDAD.md, ROUTES.md.
**Riesgos:** tocar código de páginas (prohibido); tests que requieran dependencias nuevas (prohibido).
**Tests:** los gates siguen verdes tras cada cambio documental; los tests nuevos (si se autorizan) son de consistencia documental.
**Definición de hecho:** contratos vivos actualizados y verificados; gates 381/381 · 0/16 · build · 41/41 re-ejecutados y verdes.

- T-152 Actualizar TEST-MATRIX.md con los nuevos contratos documentales de Fase 6.
- T-153 Actualizar CONTEXTO-MAESTRO-CONTINUIDAD.md con el resumen de Fase 6.
- T-154 Verificar que ROUTES.md sigue siendo verdad (17 rutas, sin cambios).
- T-155 Test de contrato (si se autoriza): los 7 documentos obligatorios existen y tienen secciones mínimas.
- T-156 Test de contrato (si se autoriza): PAGE-BLUEPRINT-MATRIX cubre las 17 rutas.
- T-157 Test de contrato (si se autoriza): cada mundo 00–08 tiene ficha completa.
- T-158 Test de contrato (si se autoriza): cada regla de SPATIAL-LANGUAGE cita token existente del engine (import real de motionTokens).
- T-159 Test de contrato (si se autoriza): ANTI-PATTERNS no contradice motionBudget (densidades coherentes).
- T-160 Verificar que ningún documento de Fase 6 menciona dependencias nuevas ni GSAP como opción.
- T-161 Re-ejecutar los 4 gates completos y adjuntar resultados al informe de Fase 6.
- T-162 Verificar git status: solo documentos nuevos/modificados, cero src/pages, cero package.json.
- T-163 Preparar el commit documental (estructura de mensajes "Fase 6 (n/N): …" como en fases anteriores) — SIN ejecutar push hasta autorización.

### BLOQUE 11 — Endurecimiento técnico documental (P3, derivado de auditoría) · 8 tareas
**Objetivo:** convertir las 2 observaciones de la auditoría (OBS-1, OBS-2) y la deuda clasificada en specs de trabajo para fases futuras. Fase 6 solo DOCUMENTA; no toca código.
**Archivos:** IMPLEMENTATION-ROADMAP-V2.md (sección endurecimiento).
**Riesgos:** ninguno (solo documentación).
**Tests:** cada spec tiene: problema, evidencia, solución propuesta, riesgo, fase destino.
**Definición de hecho:** 4 specs listas para ser aprobadas y ejecutadas en su fase.

- T-164 Spec OBS-1: emitir shell HTML con meta noindex para rutas de embudo (checkout/order-confirmation/design-system) — propuesta de mecanismo vía emitRouteHtml.
- T-165 Spec OBS-2: status HTTP 404 real para rutas inexistentes (vercel.json) manteniendo la página NotFound.
- T-166 Spec deuda: retirada de dependencias muertas clasificadas en BASELINE.md (gsap incluido) — con orden seguro y tests.
- T-167 Spec lint: llevar warnings de 16 a 0 (p. ej. import sin uso en Resources.test.jsx).
- T-168 Spec chunk vendor-three (826 kB): estrategia de code-splitting si Fase 7 añade escenas.
- T-169 Spec sitemap: decisión documental sobre rutas alias y canonical (mantener 14 URLs).
- T-170 Spec DP-5: recordatorio estructurado de la decisión comercial/legal pendiente para Sebastián.
- T-171 Spec ELITE "acceso de por vida": decisión pendiente de Sebastián, opciones A/B documentadas.

### BLOQUE 12 — Cierre, informe y STOP (P0) · 4 tareas
**Objetivo:** cerrar Fase 6 como se cerraron las anteriores: informe completo, auditoría externa, STOP.
**Archivos:** informe de Fase 6 (se entrega en chat + archivo en raíz).
**Riesgos:** cerrar sin evidencia; arrancar Fase 7 por inercia.
**Tests:** informe con evidencia por afirmación (regla: nunca "confirmado" sin prueba).
**Definición de hecho:** informe entregado, ChatGPT tiene el material, STOP activo.

- T-172 Redactar informe final de Fase 6 (estructura equivalente al de Fase 5: qué se hizo, evidencia, gates, decisiones pendientes).
- T-173 Clasificar cada resultado CONFIRMADO / PROBABLE / NO VERIFICADO / BLOQUEADO.
- T-174 Commit documental + push SOLO con autorización explícita de Sebastián.
- T-175 Declarar STOP: NO Fase 7, NO Fase 8, NO código de páginas, NO 3D nuevo — esperar auditoría de ChatGPT.

---

## RESUMEN DEL PLAN

| Bloque | Contenido | Prioridad | Tareas |
|---|---|---|---|
| 0 | Custodia y precondiciones | P0 | 12 |
| 1 | Fundamento verbal e identidad | P0 | 16 |
| 2 | SPATIAL-LANGUAGE.md | P0 | 20 |
| 3 | Mundos 00–08 | P0 | 29 |
| 4 | PAGE-BLUEPRINTS.md | P1 | 20 |
| 5 | WORLD-3D-STRATEGY.md | P1 | 14 |
| 6 | ANTI-PATTERNS-BAYONA.md | P1 | 10 |
| 7 | IMPLEMENTATION-ROADMAP-V2.md | P2 | 12 |
| 8 | PAGE-BLUEPRINT-MATRIX.md | P2 | 8 |
| 9 | FASE6-WORLD-BUILDING.md | P2 | 8 |
| 10 | Protección contractual | P1 | 12 |
| 11 | Endurecimiento documental (OBS-1/OBS-2/deuda) | P3 | 8 |
| 12 | Cierre, informe y STOP | P0 | 4 |
| **Total** | | | **175 tareas** |

---

## PASO 10 — STOP

**La auditoría termina aquí.** No se ha modificado ninguna línea de código fuente, no se ha hecho ningún commit, no se ha instalado ninguna dependencia. El plan de Fase 6 queda entregado y **en espera**: la ejecución de cualquier bloque requiere la autorización explícita de Sebastián y, previamente, la resolución de la bandera crítica (Fase 6 = World Building según veredicto ChatGPT, recomendado, vs. Fase 6 = migración de páginas según el prompt maestro).

*Clasificación global de esta auditoría: resultados de git, código, tests, gates y producción = CONFIRMADO (ejecución real). OBS-1/OBS-2 = CONFIRMADO como observaciones no bloqueantes. Cero elementos NO VERIFICADOS: todo lo afirmado en la tabla de 30 pudo verificarse en este entorno.*
