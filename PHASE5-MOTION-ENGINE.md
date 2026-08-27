# FASE 5 — MOTION ENGINE 2.0 + SCROLL STORYTELLING

**Estado:** COMPLETA. **Base:** `main @ c9448c4` (fin Fase 4). **Sin dependencias nuevas,
sin otro motor, sin GSAP.** Todo extiende `src/engine/` (Framer Motion + Lenis + Three/R3F
ya presentes). La misión NO era rediseñar las 17 páginas: era construir el sistema de
movimiento y narrativa espacial para que las páginas futuras tengan una gramática común.

> Sensación objetivo del dueño: información compacta, tipografía pequeña y muy legible,
> sistemas horizontales en movimiento, elementos que cambian de posición, relaciones
> espaciales, texto que cruza la pantalla, varias capas, sensación de calma y transiciones
> fluidas. La persona debe sentir **paz, claridad y deseo de avanzar — no presión ni ruido**.

---

## 1. Qué se construyó (resumen)

| Capa | Pieza | Archivo |
|---|---|---|
| Tokens | easings de salida/desplazamiento/transformación + escala de distancias | `config/motionTokens.js`, `styles/ds-tokens.css` |
| Scroll | progreso por sección + estado dinámico (velocidad/dirección) | `scroll/useSectionProgress.js`, `providers/ExperienceProvider.jsx` |
| Scroll | handoff 3D para Fase 7 | `scroll/scrollHandoff.js` |
| Tipografía | marquesina declarativa + reveal de líneas con máscara | `motion/Marquee.jsx`, `motion/TextMask.jsx` |
| Narrativa | escenario sticky (estados A/B/C) + pasaje horizontal | `scroll/StickyStage.jsx`, `scroll/HorizontalPassage.jsx` |
| Recetas | intensidades + 8 recetas + presupuesto + contrato de página | `recipes/intensity.js`, `recipes/index.js`, `recipes/motionBudget.js`, `recipes/pageMotionContract.js` |
| Debug | overlay solo-desarrollo | `debug/MotionDebug.jsx` |
| Playground | bloques 10–16 de `/design-system` | `pages/DesignSystem.jsx`, `styles/ds-playground.css` |

**Cifras:** 290 → **381 tests** (+91), 59 → **71 ficheros** de test. Lint 0 errores /
**16 warnings** (el baseline de Fase 4 eran 17: se corrigió uno existente de
`exhaustive-deps` en `ExperienceProvider`). Build OK. Ninguna captura visual histórica
tocada (ver §12).

---

## 2. Arquitectura del Motion Engine

El engine sigue siendo **Framer Motion como motor de UI**. La Fase 5 añade una capa de
*scroll como interfaz narrativa* encima, sin duplicar la fuente de progreso.

```
ExperienceProvider (EngineRoot)
 ├─ ScrollContext        → progress  : MotionValue<number>  (0..1, ya existía)
 └─ ScrollStateContext   → velocity  : MotionValue<number>  (NUEVO, Fase 5)
                           direction : MotionValue<number>  (NUEVO, Fase 5)
        │  (misma suscripción a Lenis o fallback nativo: 0 listeners extra)
        ▼
useEngineScroll() / useScrollState()          ← consumo seguro (null fuera del provider)
        │
        ├─ useSectionProgress({range, output}) → progreso de ELEMENTO (useScroll+useTransform)
        ├─ useScrollHandoff()                  → API 3D para Fase 7
        └─ Componentes: StickyStage, HorizontalPassage, Marquee, TextMask
```

**Principios de movimiento** (se aplican en recetas y componentes):
- El movimiento es **información, orientación, jerarquía, calma, continuidad y espacio**.
- Prohibidos rebotes, overshoot, elasticidad y flashes. Curvas de entrada/salida suaves.
- Jerarquía de movimiento por niveles (micro → standard → emphasis → cinematic).
- Solo `transform` y `opacity` en lo animado por JS; nada de `layout thrashing`.

---

## 3. Tokens modificados (commit 1)

Fuente de verdad: `src/engine/config/motionTokens.js`; espejo CSS `src/styles/ds-tokens.css`.

**Duraciones — conjunto CERRADO de 4 (invariante vigilada por test; NO se tocó):**
`fast 0.2 · base 0.4 · slow 0.8 · curtain 0.82`.

**Easings — de 3 a 6 curvas:**

| Token | Curva | Uso |
|---|---|---|
| `standard` | `[0.4, 0, 0.2, 1]` | general (existía) |
| `entrance` | `[0.16, 1, 0.3, 1]` | entradas (existía) |
| `curtain` | `[0.76, 0, 0.24, 1]` | cortina de transición (existía) |
| `exit` | `[0.4, 0, 1, 1]` | **salidas** (NUEVO) |
| `travel` | `[0.45, 0, 0.55, 1]` | **desplazamiento** (NUEVO) |
| `transform` | `[0.65, 0, 0.35, 1]` | **transformación** (NUEVO) |

**Distancias — grupo NUEVO** (amplitud de desplazamiento en px):
`near 16 · medium 48 · far 120`. Helper fail-safe `distancePx(level)` → `medium` si no existe.

Espejo CSS añadido: `--ds-ease-exit/travel/transform` y `--ds-dist-near/medium/far`.
El test de contrato (`designSystemContract.test.js`) vigila que JS y CSS no se separen.

---

## 4. Arquitectura de Scroll (commit 2)

### 4.1 Estado dinámico del scroll
`ExperienceProvider` ya publicaba `progress`. Ahora, en la **misma** suscripción
(Lenis o fallback nativo), publica también `velocity` y `direction` como `MotionValue`:
**cero listeners nuevos, cero re-renders por fotograma, sin cirugía de contexto.**
- `velocity`: px por evento de scroll (velocidad interna de Lenis; en el fallback nativo,
  delta de `scrollTop`). Quien necesite suavizado aplica `useSpring`; el engine no acumula inercia.
- `direction`: `1` bajando, `-1` subiendo, `0` reposo inicial.
- Se ignoran valores no finitos (`NaN`) para no ensuciar los MotionValues.

### 4.2 Progreso normalizado por sección
`useSectionProgress({ range, output })` → `{ ref, progress, value }`.
- Progreso de **elemento** (no de página) como `MotionValue`: sin re-render por fotograma.
- `range` es declarativo sobre el vocabulario `useScroll` de Framer Motion (`SECTION_RANGES`):

| Rango | offset | Semántica |
|---|---|---|
| `traverse` | `['start end','end start']` | recorrido completo por el viewport |
| `enter` | `['start end','start start']` | entrada: asoma → ocupa |
| `pin` | `['start start','end end']` | sección fijada (base del sticky) |
| `exit` | `['center start','end start']` | salida hacia arriba |

- `resolveRange()` es puro y fail-safe (desconocido → `traverse`). `output` opcional remapea.

### 4.3 Handoff 3D (para Fase 7, sin escenas)
`useScrollHandoff()` compone `useEngineScroll` + `useScrollState` + `useCapabilities` y expone
`{ progress, velocity, direction, capabilities, readViewport, snapshot() }`.
`createHandoffSnapshot()` es pura, congelada y fail-safe: entrega
`{ progress, velocity, direction, viewport, reducedMotion, mode, dprLimit }` — el contrato
exacto que consumirá el motor 3D. **No se creó ninguna escena.**

---

## 5. Componentes creados

### 5.1 Tipografía cinética (commit 3) — `src/engine/motion/`
- **`Marquee`** — marquesina declarativa: `direction` (left/right), `duration`, `gap`,
  `pauseOnHover` (solo si `caps.canHover`), `ariaLabel`. Pista duplicada con la segunda copia
  `aria-hidden`. **Reduced motion → rail estático scroll-snap** (generaliza el patrón
  `cb-marquee` de `TestimonialMarquee`). Sin movimiento infinito para contenido esencial.
- **`TextMask`** — reveal de líneas con máscara (`overflow:hidden` + `translateY`, curva
  `entrance`, stagger moderado). Acepta `lines[]` o `text` partido por `\n`. Accesible:
  `aria-label` con el texto completo y cada línea animada `aria-hidden`.
  **Reduced motion → texto plano.** Tipografía elegante y pequeña en movimiento, NO gigante saltarina.

### 5.2 Narrativa espacial (commit 4) — `src/engine/scroll/`
- **`StickyStage`** — sección con longitud declarable (`resolveStageLength` valida `100–500vh`),
  interior `position: sticky`, estados A/B/C por umbrales de progreso (`resolveStageIndex`,
  puro). `children({ index, progress })` (función) o nodo plano. Solo re-renderiza al cruzar
  umbral (`useMotionValueEvent`). **Reduced motion o móvil → secuencia estática apilada**:
  nunca bloquea la comprensión.
- **`HorizontalPassage`** — bloque horizontal controlado por scroll: `translateX` desde
  `MotionValue`, recorrido máximo medido con `ResizeObserver` (`rail.scrollWidth − viewport.clientWidth`),
  entrada/salida definidas. **Móvil o reduced motion → pila vertical** sin overflow accidental.
  Solo para narrativa; no rompe móvil.

Ambos usan `useSectionProgress({ range: 'pin' })` y se limpian (observer/suscripciones).

---

## 6. Recetas + intensidad + presupuesto + contrato (commit 5) — `src/engine/recipes/`

### 6.1 Intensidades (`intensity.js`) — SOLO tres
`quiet {amplitude .5, speed .8, simultaneity 1}` · `balanced {1, 1, 2}` · `immersive {1.4, 1.15, 3}`.
Helpers puros: `resolveIntensity` (fail-safe → `balanced`), `scaleDistance`,
`scaleDuration` (acotada 0.1–3 s; inválida → 0.4).

### 6.2 Las 8 recetas (`index.js`)
`editorial-reveal`, `editorial-slide`, `compact-rail`, `cinematic-stage`, `data-cascade`,
`image-drift`, `horizontal-passage`, `quiet-transition`. Cada una declara: `id`, `name`,
`purpose`, `intensity`, `components[]`, `distance`, `tier`, `useWhen`, `avoidWhen`,
`mobile`, `reducedMotion`. `resolveRecipe(id)` acepta clave camelCase o id kebab.
`recipesUseKnownTokens()` es un invariante que comprueba que las recetas solo usan tokens reales.
**Detalle por receta en `MOTION-MAP.md`.**

### 6.3 Presupuesto de movimiento (`motionBudget.js`)
`MOTION_BUDGETS` por zona: `hero 3 · body 2 · supporting 1 · cta 2 · background 0`.
`checkBudget(zones, intensity)` aplica límites por intensidad (`quiet 6 · balanced 8 · immersive 10`)
y rechaza más de una zona de peso 3. `resolveBudget(zone)` fail-safe → `supporting`.

### 6.4 Contrato de página futura (`pageMotionContract.js`)
`resolvePageMotionContract(declaration)` normaliza de forma pura y fail-safe la declaración de
movimiento de una página futura (intensidad, narrativa, sticky, horizontal, parallax, marquee,
`textMotion` — modos `none|mask|words` —, zonas y recetas; filtra recetas desconocidas y deduplica).
`validatePageMotionContract()` devuelve avisos (p. ej. sticky/horizontal con `quiet`,
sticky+horizontal requiere `immersive`, presupuesto excedido). `describeMotionOffer()` resume.
**Es infraestructura y documentación: no se implementó ninguna página.**

---

## 7. Debug solo-desarrollo (commit 6)
`debug/MotionDebug.jsx`: overlay que **solo existe en desarrollo** (`import.meta.env.DEV`)
**y** con el flag `?motionDebug=1`. Muestra progreso, velocidad, dirección, viewport, modo y
reduced motion. Montado en `App.jsx` junto a `ScrollProgress`/`CustomCursor`.
**En producción la rama se elimina del bundle** (5 tests de gating).

---

## 8. Playground `/design-system` (commit 6)
La ruta interna (noindex, fuera del sitemap) añade los bloques **10–16**:
`10 Scroll storytelling` (tabla `SECTION_RANGES` + intensidades), `11 Marquee`,
`12 TextMask`, `13 StickyStage` (A/B/C), `14 HorizontalPassage` (4 vagones),
`15 Handoff 3D` (snapshot en vivo) y `16 Recetas`. Estilos solo en `ds-playground.css`
(prefijo `dsp-`, guarda `prefers-reduced-motion`). **El playground sigue interno.**

---

## 9. Clasificación del patrimonio de movimiento

| Clase | Piezas | Decisión Fase 5 |
|---|---|---|
| **CORE** | `motionTokens`, `capabilities`, `motionProfile`, `ExperienceProvider`/`ScrollContext`, `useLenis`, `useScrollProgress`, `variants`, `Reveal`/`TextReveal`, `useReveal`/`useScrollLinked`, `useSticky`, `PageTransition`, `Parallax`, `breakpoints`/`theme`/`scenePresets`, `ds-tokens.css` | Se extiende, no se reescribe |
| **REUTILIZABLE** | patrón `TestimonialMarquee`/`cb-marquee`; `v2-scroll-motion.css` | El patrón marquee se generaliza en `Marquee`. La capa CSS v2 sigue activa (ver límite abajo) |
| **LEGACY** | `home-scroll-animations.css` + observer de Home | Documentado, sin tocar |
| **DUPLICADO** | IntersectionObservers locales en Home/Resources/Community/Programs/AppExperience/PremiumRouteChrome | Candidos a migración en **Fase 8**; no se tocan ahora |
| **FUTURO** | todas las piezas Fase 5 | Listas para que las páginas migren |

**Límite anti-doble-animación (IMPORTANTE):** `v2-scroll-motion.css` ya es una capa ambiente
de scroll por CSS (`animation-timeline: view()`, con `@supports` y apagada con reduced-motion).
Los nuevos componentes JS **NO deben aplicarse donde v2 ya anima**. Contraindicaciones por
selector documentadas en `MOTION-MAP.md`.

---

## 10. Reduced motion, móvil y accesibilidad
- **Reduced motion es crítico y está cubierto en cada pieza:** `Marquee` → rail estático
  scroll-snap; `TextMask` → texto plano; `StickyStage`/`HorizontalPassage` → secuencia/pila
  estática. El contenido queda **completo y legible**; ningún scroll queda "atrapado".
- **Móvil** reduce amplitud y capas: `StickyStage`/`HorizontalPassage` caen a estático fuera
  de `desktop`; `pauseOnHover` solo si hay hover real; las recetas declaran su variante `mobile`.
- **Accesibilidad:** `aria-label` en marquesinas y máscaras, copias duplicadas `aria-hidden`,
  foco y navegación intactos en los fallbacks estáticos.
- **Performance:** solo `transform`/`opacity`; MotionValues sin re-render por fotograma;
  cleanup de listeners/rAF/observers; listeners pasivos; sin `layout thrashing`.

---

## 11. Testing
91 tests nuevos (290 → 381). Cobertura: lógica pura (`resolveRange`, `resolveStageLength`,
`resolveStageIndex`, `resolveIntensity`, `scaleDistance/Duration`, `createHandoffSnapshot`,
`resolvePageMotionContract`, `validatePageMotionContract`, `checkBudget`), render estático y
reduced-motion de cada componente, accesibilidad de `Marquee`/`TextMask`, emisión de
velocidad/dirección del provider (ruta Lenis con `FakeLenis` y fallback nativo), cleanup y
gating de `MotionDebug`. **jsdom no tiene scroll real:** la lógica pura + render estático +
reduced-motion quedan cubiertos por unidad; el scroll real lo validan el playground y el E2E
existente. Matriz completa en `TEST-MATRIX.md`.

## 12. Capturas visuales históricas
Las 34 capturas base de `baseline-visual.spec.js` (17 rutas × 2 viewports) son **artefactos**
(`test-results/`, ignorado por git) y **no se sobreescriben ni se comparan** aquí. El
playground solo es tocado por `design-system-visual.spec.js` (carpeta separada). Bajo la
emulación de reduced-motion de las capturas, `StickyStage`/`HorizontalPassage` renderizan su
fallback estático → determinista.

---

## 13. Qué NO se implementó (por diseño)
- Sin rediseño de las 17 páginas ni de Home.
- Sin escenas 3D nuevas ni `SceneMount` en páginas (solo el handoff para Fase 7).
- Sin GSAP / anime.js / dependencias nuevas; sin otra capa CSS paralela (nada de `v4-*`
  ni `motion-overrides.css`).
- Sin copy, SEO ni fase de rendimiento.
- Sin tocar catálogo, precios, WhatsApp ni checkout.
- El playground **sigue interno** (noindex, fuera del sitemap).
- No se arrancan Fase 6 (World Building), ni diseño de páginas, ni Fase 8 (migración de observers).

## 14. Handoff exacto a Fase 6
1. **Gramática disponible:** tokens (6 easings + distancias), `useSectionProgress`,
   `Marquee`, `TextMask`, `StickyStage`, `HorizontalPassage`, 8 recetas, intensidades,
   presupuesto y contrato de página. Todo exportado desde `src/engine/index.js`.
2. **Contrato 3D listo:** `useScrollHandoff()`/`createHandoffSnapshot()` entregan
   `{ progress, velocity, direction, viewport, reducedMotion, mode, dprLimit }` para Fase 7.
3. **Regla de oro:** al diseñar/migrar una página, declarar su contrato con
   `resolvePageMotionContract()` y validarlo con `validatePageMotionContract()`; elegir recetas
   de `MOTION-MAP.md`; respetar el límite anti-doble-animación con `v2-scroll-motion.css`.
4. **Migración de observers duplicados** (Home/Resources/Community/Programs/AppExperience/
   PremiumRouteChrome) queda para Fase 8, usando `useSectionProgress`/`Reveal`.
5. **Validar en `/design-system`** (bloques 10–16) antes de llevar una pieza a una página pública.

---

*Clasificación del resultado: **CONFIRMADO** — 381/381 tests, lint 0 errores/16 warnings,
build de producción correcto. El comportamiento de scroll real en navegador queda
**PROBABLE** hasta validarlo en el playground/E2E (jsdom no tiene scroll real).*
