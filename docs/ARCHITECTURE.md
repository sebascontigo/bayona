# ARCHITECTURE — BAYONA WEB

> Mapa técnico de referencia rápida. El detalle vive en los documentos de fase (raíz) y en el código; este documento NO lo duplica.

## Stack

- **Build/dev:** Vite 6 · **UI:** React 18.3 + React Router 7.1 · **Deploy:** Vercel (`vercel.json`, framework vite, output `dist/`)
- **Movimiento:** Framer Motion (único motor de motion; GSAP prohibido y sin usar — la entrada en package.json es deuda muerta pre-Fase 1) · **Scroll suave:** Lenis · **3D:** Three.js + @react-three/fiber + drei (con SceneErrorBoundary: el 3D nunca tumba la página)
- **Calidad:** Vitest + Testing Library (`npm test`) · Playwright (`npm run test:visual`) · ESLint con jsx-a11y (`npm run lint`)

## Estructura clave de `src/`

| Ruta | Contenido |
|---|---|
| `src/config/` | Centros de configuración comercial y de sitio: `site.config.js` (SITE_URL canónico, `whatsAppLink()` SSoT), `offerings.js` (catálogo canónico 4 planes), `conversionContent.js`, `siteMedia.js`, `shopProducts`, `evidenceRegistry` |
| `src/components/ds/` | Design System 2.0: Button, CTABlock, CardBase, Container, HeroBase, Link, MediaBlock, Metric, Section, SectionLabel, Surface |
| `src/components/conversion/` | RecommendationGuide (radiogroup, activo verificado sin montar en Home por decisión D5/MERGE) |
| `src/components/navigation/` | Breadcrumb (dato de routeMeta) |
| `src/components/seo/` | RouteSeo (meta robots noindex según routeMeta) |
| `src/engine/` | Motion Engine 2.0: `config/` (motionTokens: 6 easings + distancias + duraciones cerradas en 4, breakpoints, scenePresets), `providers/` (ExperienceProvider: ScrollContext + ScrollStateContext, 1 suscripción Lenis), `scroll/` (useSectionProgress + SECTION_RANGES, StickyStage, HorizontalPassage, scrollHandoff), `motion/` (Marquee, TextMask, Reveal, TextReveal, PageTransition), `recipes/` (8 recetas, intensidades, motionBudget + checkBudget, pageMotionContract), `debug/` (MotionDebug dev-only), `hooks/` (useSticky), `effects/` (CustomCursor único), `scene/` (SceneMount + LightingRig) |
| `src/lib/seo/` | `routeMeta.js` (ROUTE_META, noindex de embudo/internas, `indexableRoutes()` para emisión de HTML) |
| `src/pages/` | 17 rutas públicas + DesignSystem (playground interno) + NotFound |
| `src/styles/` | Tokens y capas CSS: `ds-tokens.css` (espejo --ds-* de motionTokens), `ds-base.css`, v3-finish.css (capa luxury) |
| `e2e/` | Playwright: baseline-visual (17 rutas × desktop/móvil), conversion-milestones, design-system-visual |
| `vite/emitRouteHtml.js` | Emisión de HTML estático por ruta indexable + robots.txt/sitemap en build |

## Contratos vivos (NO ROMPER sin fase explícita)

Catálogo canónico y precios (RAÍZ 149k / FUERZA 299k / RENDIMIENTO 499k / ELITE 899k COP) · WhatsApp 34614988006 vía `whatsAppLink()` · checkout sin pago (Configurador → WhatsApp) · 4 PDFs (`presentationUrl`) · SEO (canonical bayona-jet.vercel.app, sitemap 14 URLs, robots) · noindex embudo/internas · reduced-motion y fallbacks móvil · SceneErrorBoundary · Design System y Motion Engine · navegación por grupos + Breadcrumb + NextChapter · rutas públicas e internas · 404.

## Modelo de experiencia (Fases 4–5)

- **Rutas:** 17 públicas (ROUTES.md) · journeys (ROUTE-JOURNEYS.md) · matriz 17×16 (PAGE-EXPERIENCE-MATRIX.md).
- **Motion:** contrato por página (`resolvePageMotionContract`/`validatePageMotionContract`), presupuesto por zona (hero3/body2/supporting1/cta2/background0), recetas declarativas, gramática de scroll (SECTION_RANGES traverse/enter/pin/exit), handoff 3D preparado para Fase 7 (`createHandoffSnapshot`).
- **Documentos de referencia:** DESIGN-SYSTEM.md · FASE4-ARQUITECTURA-EXPERIENCIA.md · PHASE5-MOTION-ENGINE.md · MOTION-MAP.md · SCROLL-STORY-MATRIX.md · TEST-MATRIX.md.

## Producción

- https://bayona-jet.vercel.app · deploy desde main vía Vercel · assets con Cache-Control immutable · verificación de build servido por hash de asset (ver AUDIT-LOG 002).
