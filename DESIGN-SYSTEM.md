# BAYONA · DESIGN SYSTEM 2.0 — FASE 3

**Fecha**: 2026-08-27 · **Commit base**: `6d9b8e6` (Fase 2 cerrada) · **Estado**: sistema construido y verificado

La Fase 3 construye el sistema visual global que gobernarán las 17 rutas en
las fases de rediseño. No se ha rediseñado ninguna página: la capa nueva es
**aditiva y prefijada** (`.ds-`), así que el estado visual del sitio público
es idéntico al cierre de la Fase 2.

---

## 1. Auditoría CSS — clasificación de lo existente

Inventario real: 46 hojas (~770 KB) + `src/styles.css` (109,8 KB) +
`src/overrides.css` (26 KB). Ninguna hoja se ha borrado ni reescrito sin
confirmar su uso real; no existen ficheros `v4-*` ni se han creado.

### CORE — cimiento intocable

| Hoja / módulo | Papel |
|---|---|
| `src/styles.css` (`:root` + reglas globales) | Variables de color, regla de marca `border-radius: 0 !important` (R9.5), reset, foco, selección |
| `src/engine/config/theme.js` | Espejo JS de la paleta para 3D/shaders (fuente única en JavaScript) |
| `src/engine/config/motionTokens.js` | Fuente única de duraciones/curvas (Property 7 lo vigila) |
| `src/engine/config/motionProfile.js` | Contrato puro de reduced-motion |

### CONSOLIDAR — capas ya tokenizadas que el Design System adopta como base

| Hoja | Decisión |
|---|---|
| `v2-typography.css` | El reset por rol semántico sobre los 258 tamaños históricos ES la escala tipográfica del sistema. `ds-tokens.css` la alias (`--ds-fs-*`) y añade los dos pasos que faltaban (CTA y numérico) |
| `v2-surface.css` | El sistema de cristal/luz/sombras ES la capa de superficies. Sus tokens `--v2-*` se aliasan como `--ds-surface-*`, `--ds-border-*`, `--ds-shadow-*`, `--ds-radius-float/control` |
| `v3-finish.css` | Acabado (grano, selección, micro-interacciones). Se conserva; el sistema no lo duplica |
| `overrides.css` | Capa de lujo (shell, controles globales, armonización de rutas, contrato de iconos, footer). Se conserva intacta hasta que cada página migre |
| `luxury-system.css`, `elite-refinements.css`, `premium-route-chrome.css` | Capas de acabado. Se conservan |

### PRESERVAR — CSS por página, intacto hasta el rediseño de cada ruta

`home.css` (84 KB), `app.css` (91 KB, importado por AppExperience — vivo),
`resources.css`, `community.css`, `plan-presentation.css`, `shop.css`,
`about.css`, `onboarding.css`, `programs.css`, `faq.css`,
`parkour-academy.css`, `cart.css`, `social.css`, `community-bridges.css`,
`media-scenes.css`, `home-scroll-animations.css`, `video-section.css`,
`journey-ribbon.css`, `next-chapter.css`, `share-invite.css`,
`translate-offer.css`, `checkout-handoff.css`, `reception-cta.css`,
`experience-proof.css`, `free-value.css`, `consent.css`, `route-effects.css`,
`error-boundary.css`, `not-found.css` y los 4 `plan-*-refinements.css`.

### MIGRAR — absorción progresiva (solo cuando sea seguro)

- Componentes legacy de `styles.css` ya tienen equivalente tokenizado en el
  sistema: `.eyebrow` → `SectionLabel`, `.gold-button`/`.text-button` →
  `Button`, `.section-shell` → `Container`. La Fase 3 **crea el equivalente,
  no mueve el legacy**: cada página cambiará de clase cuando se rediseñe.
- Las listas explícitas de superficies de `v2-surface.css` (18 clases de
  tarjeta a cristal) se absorberán cuando esas tarjetas pasen a `CardBase`.

### DEPRECAR — resuelto en esta fase

- `src/components/CustomCursor.jsx` — **eliminado**. Duplicado del cursor del
  engine; unificado en `src/engine/effects/CustomCursor.jsx` (ver §9).

---

## 2. Arquitectura creada

```
src/styles/ds-tokens.css          tokens globales (:root, prefijo --ds-)
src/styles/ds-base.css            estilos de componentes base (solo .ds-*)
src/styles/ds-playground.css      hoja de la ruta interna (chunk lazy)
src/components/ds/                11 componentes base + barrel + tests
src/engine/config/breakpoints.js  tokens responsivos (SSoT JS) + tests
src/engine/config/scenePresets.js presets 3D (cámara/material/profundidad) + tests
src/engine/hooks/useSticky.js     hook de infraestructura de scroll + tests
src/engine/config/motionTokens.js +tiers semánticos y helpers (sin valores nuevos)
src/pages/DesignSystem.jsx        playground interno /design-system + tests
e2e/design-system-visual.spec.js  capturas del sistema (fuera de la baseline)
src/test/designSystemContract.test.js  invariantes del sistema
```

Modificados: `main.jsx` (2 imports al final de la cascada), `App.jsx` (cursor
del engine + ruta interna), `routeMeta.js` (entrada noindex),
`emitRouteHtml.js` (Disallow en robots), `engine/index.js` (barrel), y los
tres contratos de rutas (`baselineContract`, `conversionRegression`,
`conversionRegression.config`) que ahora inventarían rutas públicas e
internas por separado.

---

## 3. Tokens globales (`ds-tokens.css`)

Regla de oro: **ningún valor inventado**. Cada token aliasa uno vivo en la
cascada o documenta uno medido en el código.

- **Color**: acento `--orange` #F4A261 (R9.1) + fuego/profundo + neutros.
- **Superficies**: escalera de 5 peldaños por luminosidad
  (background #050505 → deep #0B0B0C → raised #0c0c0d → content #111111 →
  overlay #141416) + cristal de v2. La identidad sigue oscura: profundidad
  por tono, luz y textura, no por color.
- **Bordes/sombras**: hairline y elevación de v2 (`--v2-lift`, `--v2-lift-warm`).
- **Radio**: `sharp 0px` por defecto de marca (R9.5); `control 10px` y
  `float 16px` solo donde el token lo dice; `round 50%` para avatares/cursor.
- **Tipografía**: escala v2 completa + 2 pasos nuevos (`--ds-fs-cta`,
  `--ds-fs-numeric` DM Mono con números tabulares). Familias/pesos espejo de
  theme.js. Medida máxima de línea 66ch.
- **Espaciado**: escala 4px (11 pasos, 4→192px) + aire de sección fluido.
- **Retícula**: medidas reales de `.section-shell`: máx 1240px, gutter 40px
  (20px móvil), 12 columnas, gap 24px.
- **z-index**: escalera explícita de 9 peldaños (ver §10).
- **Movimiento**: espejo CSS de motionTokens (ver §7).

## 4. Componentes base (`src/components/ds/`)

Container, Section, Surface, Button, Link, SectionLabel, HeroBase, CardBase,
Metric, MediaBlock, CTABlock. Sin variantes innecesarias: cada uno resuelve
un papel estructural. **Estados cubiertos** en `ds-base.css`: default, hover,
focus-visible (outline 2px acento, mismo contrato que los CTAs legacy),
active, disabled, loading (`aria-busy`) y error (`ds-note--error` en color
brasa, nunca rojo saturado — R9.4). `prefers-reduced-motion` anula
transiciones y transformaciones.

## 5. Tipografía, retícula y espaciado — decisiones

- Se **adopta la escala v2** (9 pasos por rol semántico) en vez de crear una
  nueva: ya era el reset correcto sobre los 258 tamaños históricos.
- Los dos pasos nuevos responden a huecos reales: texto de CTA (mayúsculas,
  tracking 0.14em, peso 800 como `.gold-button`) y dato numérico (DM Mono,
  tabular, para precios y métricas).
- La retícula calca `.section-shell` para que la migración sea un cambio de
  clase sin cambio de medidas.

## 6. Superficies — decisión

El diagnóstico de v2-surface sigue vigente: el problema era la luz, no el
color. El sistema expone la escalera de elevación + cristal con presupuesto
(`backdrop-filter` solo ≥900px y con soporte). Sin explosión de color.

## 7. Movimiento

- **Cuatro niveles semánticos** añadidos a `motionTokens.js` como alias (sin
  valores nuevos; la Property 7 sigue intacta): micro→fast (0.2s),
  standard→base (0.4s), emphasis→slow (0.8s), cinematic→curtain (0.82s).
  Helpers `tierDuration()`/`tierEase()` resuelven intención→valor.
- **Framer Motion sigue siendo el motor de UI y Lenis el smooth scroll. No se
  introduce GSAP.**
- Infraestructura de scroll: lo existente (`useReveal`, `useScrollProgress`,
  `Parallax`, `PageTransition`, `useLenis`) + **`useSticky` nuevo** (estado
  pinned de elementos fijos, escucha pasiva acotada por rAF). Preparado, no
  aplicado a ninguna ruta.

## 8. Sistema 3D

Construye sobre lo existente sin reemplazar Three.js/R3F:

- **Intacto**: `CapabilityProvider`/`useCapabilities`, `sceneRegistry`,
  `resolveSceneConfig` (degradación mobile-safe + DPR acotado),
  `SceneMount` + `SceneErrorBoundary`, `LightingRig.lightingPlan(caps)` como
  capa de iluminación por capacidades (desktop ≥3 luces con sombras, mobile
  reducido sin sombras).
- **Nuevo** (`scenePresets.js`, datos puros + tests): 4 presets de cámara
  (hero/portrait/overview/lateral), 4 materiales con colores de la paleta
  (matte/satin/ember/accent — sin neón, R9.4), capas de profundidad Z
  (fondo/medio/frente) y parámetros de movimiento contenidos.
- **No se ha añadido ninguna escena a ninguna página** (regla absoluta).

## 9. Cursor — arquitectura única

Convivían dos implementaciones. Resolución:

- El cursor vive SOLO en `engine/effects/CustomCursor.jsx`: **puerta de
  capacidades** (`pointerEffectsEnabled`: desktop + sin reduced-motion; en
  touch/móvil devuelve `null` y no registra listeners — Property 4) con el
  **visual vivo** del componente legacy (anillo cálido 12→28px sobre
  interactivos, rAF, ocultación en blur/mouseleave).
- Colores desde `theme.color`, z-index desde `--ds-z-cursor` (10001, encima
  del grano). `App.jsx` lo importa del barrel del engine.
- `components/CustomCursor.jsx` eliminado. 4 tests nuevos de la puerta.

## 10. Escala z-index (medida sobre la cascada real)

| Token | Valor | Uso |
|---|---|---|
| `--ds-z-base` | 0 | Luz ambiente, fondos |
| `--ds-z-content` | 1 | `#root`, contenido |
| `--ds-z-raised` | 10 | Apilado intra-sección |
| `--ds-z-sticky` | 100 | Navbar y barras fijas |
| `--ds-z-overlay` | 9997 | Capas fijas (consent, ribbon, móvil-nav) |
| `--ds-z-grain` | 10000 | Grano fílmico |
| `--ds-z-cursor` | 10001 | Cursor (siempre sobre el grano) |
| `--ds-z-modal` | 11000 | Drawers/diálogos |
| `--ds-z-curtain` | 12000 | Cortina de PageTransition |

## 11. Breakpoints (medidos en la cascada)

520 (móvil compacto) · 600 (compresión tipográfica) · 800 (tablet pequeña) ·
900 (puerta del cristal) · 950 (navegación) · 1180 (escritorio) · 1440
(escritorio amplio). SSoT en `engine/config/breakpoints.js` porque las media
queries no leen custom properties.

## 12. Playground `/design-system`

Ruta **interna** para validar el sistema: `noindex` en routeMeta, `Disallow`
en robots.txt, fuera del sitemap (14 URLs intactas) y fuera del HTML
estático por ruta. Los contratos de rutas la inventarían como
`INTERNAL_ROUTES` (cualquier ruta futura debe declararse pública o interna:
nada entra sin inventariar). Muestra las 9 secciones del sistema volcando
datos reales de las fuentes de verdad. Sus capturas e2e viven en carpeta
propia (`test-results/playwright/design-system/`); **las 34 capturas de la
baseline pública se conservan como referencia histórica**.

## 13. Migración CSS — absorbido vs temporal

- **Absorbido como fuente del sistema**: escala tipográfica v2 y sistema de
  superficie v2 (vía alias `--ds-*`; sus hojas siguen aplicándose a las
  páginas actuales exactamente igual que antes).
- **Temporal hasta migración de páginas**: todo el CSS por página
  (PRESERVAR), `overrides.css` y las capas de acabado. La absorción de
  selectores legacy será incremental en las fases de rediseño, hoja a hoja,
  con verificación visual antes/después.

## 14. Puerta final de la Fase 3

| Check | Resultado | Clasificación |
|---|---|---|
| `npm test` | **273/273** (217 baseline + 56 nuevos), 0 skips | CONFIRMADO |
| `npm run lint` | 0 errores, 17 warnings (baseline sin empeorar) | CONFIRMADO |
| `npm run build` | OK; sitemap 14 URLs; robots con Disallow; sin HTML de /design-system | CONFIRMADO |
| `npx playwright test` | **41/41** (34 capturas baseline + 5 hitos + 2 capturas del sistema) | CONFIRMADO |
| Reglas absolutas | Sin rediseño de páginas, sin precios tocados, sin escenas nuevas, navegación intacta, sin Tailwind, sin `v4-*`, sin copy comercial inventado | CONFIRMADO |

## 15. Decisiones que requieren revisión antes de la Fase 4

1. **Adopción de la escala v2 como escala del sistema** (no se ha creado una
   escala nueva). Si se quiere otra progresión, es el momento de decidirlo,
   antes de que las páginas migren.
2. **Radio de controles 10px / superficies flotantes 16px** heredados de v2
   frente al canto afilado de marca: el sistema mantiene ambos con el 0 como
   defecto. Confirmar que esta dualidad es la intención.
3. **Visual del cursor**: se ha conservado el anillo vivo (no el punto con
   blend del engine antiguo). Confirmar.
4. Las decisiones pendientes de la Fase 2 (**DP-1…DP-5**) siguen abiertas y
   se resolverán en la arquitectura UX/UI posterior; ninguna ha bloqueado
   esta fase ni se ha resuelto arbitrariamente.
