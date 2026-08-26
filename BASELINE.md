# BASELINE — BAYONA

**Fase 1 del plan maestro: estabilización técnica y línea base.**
Este documento fija la fotografía exacta del proyecto antes del rediseño. Cualquier
cambio posterior se mide contra esta línea.

- **Commit BASELINE:** `8e67cd2` (rama `main`, empujado a `origin/main`)
- **Fecha de verificación:** 2026-08-26
- **Commit auditado originalmente por la auditoría externa:** `8f14698` (2026-08-25, 84 tests fallando). Entre ese commit y este se completó la estabilización (ver TEST-MATRIX.md, sección histórica).
- **Origen:** `https://github.com/sebascontigo/bayona.git`

---

## 1. Versiones verificadas

| Elemento | Versión | Nota |
|---|---|---|
| Node (local) | v24.18.1 | La verificación de Fase 1 se ejecutó aquí |
| npm (local) | 11.16.0 | |
| Node (CI) | 20.x | `.github/workflows/ci.yml` usa Node 20; el gate verde aplica en ambos |
| React | ^18.3.1 | |
| React Router | ^7.1.3 | BrowserRouter, SPA |
| Vite | ^6.0.7 | Build tool + dev server |
| Vitest | ^3.2.7 | `npm test` |
| Playwright | 1.61.1 | `npm run test:visual` |
| ESLint | 9.39.5 | con plugins react, react-hooks, jsx-a11y |
| Three.js | ^0.172.0 | + @react-three/fiber ^8.17.12, drei ^9.122.0, postprocessing ^2.19.1 |
| Framer Motion | ^11.18.2 | Motor de motion principal |
| Lenis | ^1.3.25 | Smooth scroll (hook `useLenis`) |

Instalación limpia verificada: `rm -rf node_modules && npm ci` → 494 paquetes, sin
errores. El postinstall de esbuild queda bloqueado por la política `allow-scripts`
de npm en esta máquina; no afecta al build (el binario llega por dependencia opcional).

## 2. Comandos y resultados (ejecutado, no estimado)

| Comando | Resultado | Detalle |
|---|---|---|
| `npm run build` | ✅ 0 errores | 12–18 s. Único aviso: chunk `vendor-three` 827 kB > límite 700 kB (esperado, documentado en vite.config) |
| `npm run lint` | ✅ 0 errores, 18 warnings | Warnings legacy inventariados en §6; ninguno nuevo desde Fase 1 |
| `npm test` | ✅ 48/48 ficheros, 212/212 tests | ~20–26 s. Cero `test.skip` en todo el repo (verificado por grep) |
| `npm run test:visual` | ✅ 39/39 | 5 hitos de conversión + 34 capturas de baseline visual (17 rutas × 2 viewports). Requiere `npx playwright install chromium` la primera vez |

## 3. Arquitectura (resumen)

```
src/
├── main.jsx            Punto de entrada: StrictMode → AppErrorBoundary →
│                       HelmetProvider → BrowserRouter → ExperienceProvider →
│                       VisitorJourneyProvider → App. Carga las hojas CSS globales.
├── App.jsx             18 <Route>: 17 rutas públicas del contrato + catch-all 404.
│                       Home estática (LCP); las otras 13 páginas con lazy().
│                       Monta 14 componentes globales (ver DESIGN-AUDIT.md).
├── pages/              14 páginas + contenido de apoyo.
├── components/         Componentes compartidos (Layout/Navbar/Footer/WhatsAppButton,
│                       cart/, consent/, conversion/, home/, onboarding/, seo/, social/).
├── config/             FUENTES DE VERDAD: site.config.js (dominio, WhatsApp, marca),
│                       offerings.js (4 planes + servicios + extras), shopProducts.js,
│                       shopCatalog.js, planPresentations.js, social.config.js,
│                       siteMedia.js, conversionContent.js, evidenceRegistry.js.
├── engine/             Motor visual: config (motion/scene/theme), effects, hooks,
│                       motion, providers (capabilities), scene (R3F), shaders.
├── lib/                analytics (consent-first), conversion, forms, i18n,
│                       onboarding, seo (routeMeta, structuredData), social.
├── store/              cartStore (zustand, persist en localStorage `bayona:cart:v1`).
└── test/               setup.js (mocks jsdom) + contratos (baselineContract,
                        conversionRegression).
```

Generación estática en build: `vite/emitRouteHtml.js` emite un HTML por ruta con sus
metadatos (para bots que no ejecutan JS), más `sitemap.xml` y `robots.txt` en `dist/`.
Despliegue en Vercel (`vercel.json`): SPA rewrite a `index.html`, caché immutable de
`/assets`, headers de seguridad.

### Single Source of Truth (estado tras Fase 1)

- **Dominio canónico:** `https://bayona-jet.vercel.app` (decisión del propietario,
  2026-08-26). Solo `site.config.js` lo declara; `index.html` lleva el bloque SEO de la
  home y el build genera el resto. Antes apuntaba a `sebasbayona.co`, dominio que no
  resuelve (NXDOMAIN).
- **WhatsApp:** el número `34614988006` solo vive en `site.config.js`
  (`WHATSAPP_NUMBER`, `WHATSAPP_DISPLAY`, `whatsAppLink()`). `offerings.js` lo
  re-exporta y `buildWhatsAppUrl()` delega en `whatsAppLink()`; `shopProducts.js`
  importa el helper. Fase 1 eliminó los 7 hardcodes que quedaban (Layout, About,
  AppExperience, ParkourAcademy, Community, offerings, shopProducts).
- **Catálogo comercial:** `offerings.js` (4 planes: RAÍZ 149.000, FUERZA 299.000,
  RENDIMIENTO 499.000, ELITE 899.000 COP/mes; 3 servicios de sesión; 13 extras) es la
  fuente de la que derivan rutas `/plan/*`, SEO, checkout y recomendador.

## 4. Arquitectura 3D y cadena de fallback (plan 1.22)

```
Declaración por ruta (scene prop / sceneRegistry)
        ↓
resolveSceneConfig(config, capabilities)   ← función pura, testeada (pbt)
        ↓
desktop full → mobile/reduced degradado → null (sin WebGL, sin coste)
        ↓
SceneMount (lazy Scene3D; code-split de @react-three/fiber)
        ↓
SceneErrorBoundary  ← NUEVO en Fase 1: fallo 3D retira el lienzo en silencio
```

- **Capacidades:** `CapabilityProvider` + `useCapabilities` (modo desktop/tablet/mobile,
  DPR, `prefers-reduced-motion`, WebGL). Con reduced-motion, el motor de scroll y las
  animaciones se congelan; las escenas degradan.
- **Escenas vivas hoy:** solo `Globe3D` (en `/about`, vía `GlobeTestimonials`), con su
  propia `GlobeErrorBoundary` + detección de WebGL + fallback textual. El registro de
  escenas tiene una variante (`signature`) y `SceneMount` está cableado y testeado,
  pero ninguna ruta lo monta todavía: la arquitectura está lista para la Fase 7.
- **Barreras de error (plan 1.21):**
  - `AppErrorBoundary` (main.jsx): red global; fallback con recarga + WhatsApp;
    registra `trackEvent('app_error')`.
  - `GlobeErrorBoundary` (Globe3D.jsx): fallback estático con contenido.
  - `SceneErrorBoundary` (SceneMount.jsx, añadida en Fase 1): una escena rota retira
    solo la capa decorativa (`aria-hidden`); el contenido de la página sobrevive.
    Registra `trackEvent('scene_3d_error')`.

## 5. Error logging (plan 1.23)

Sin servicios externos. Lo que existe:

- `trackEvent('app_error', …)` desde AppErrorBoundary.
- `trackEvent('scene_3d_error', …)` desde SceneErrorBoundary.
- `trackPageView` en cada navegación SPA (RouteEffects) y medición de CTAs/planes
  (`lib/analytics`), todo detrás de consentimiento RGPD (`consent.js`): no se carga
  ningún proveedor sin consentimiento explícito y es no-op sin IDs de entorno
  (`VITE_GA4_ID`, `VITE_PLAUSIBLE_DOMAIN`, `VITE_META_PIXEL_ID`).
- En desarrollo, `VITE_ANALYTICS_DEBUG=true` vuelca los eventos por consola.

## 6. Lint — inventario de los 18 warnings legacy

0 errores. Los 18 warnings existen desde antes de Fase 1 y no se tocan en esta fase
(el CI los tolera con `continue-on-error` a propósito):

| Regla | Nº | Ficheros |
|---|---|---|
| `no-unused-vars` | 11 | Loader.jsx (`loaded`), Resources.jsx (`BrandMarquee`), About.test.jsx (4 args del mock de motion), ParkourAcademy.test.jsx (`React`), Resources.test.jsx (`fireEvent`), y 3 en ficheros de shop/media (`screen`, `BURST_CDN`, `cacheVariant`) |
| `react-hooks/exhaustive-deps` | 5 | useDisposable.js, ExperienceProvider.jsx, SignatureGeometry.jsx, y 2 en páginas (deps `activePlanId`, `detailsExpanded`) |
| `jsx-a11y/media-has-caption` | 1 | VideoSection.jsx:71 (vídeo sin `<track>`) → ACCESSIBILITY-BASELINE.md |
| `jsx-a11y/role-supports-aria-props` | 1 | RecommendationGuide.jsx:230 (`aria-invalid` sobre input radio) → ACCESSIBILITY-BASELINE.md |

## 7. Dependencias (plan 1.20)

Clasificación con uso real verificado por grep (no se elimina nada en Fase 1):

**Core** — react, react-dom, react-router-dom, vite, @vitejs/plugin-react, vitest,
jsdom, @testing-library/*, eslint + plugins, prettier, playwright, fast-check, globals.

**Visual / 3D / motion**
| Paquete | Uso | Estado |
|---|---|---|
| three, @react-three/fiber | engine/scene, Globe3D | ✅ activo |
| @react-three/drei | Globe3D, Loader | ✅ activo |
| @react-three/postprocessing | engine/scene/PostProcessing | ✅ activo |
| framer-motion | engine/motion + páginas | ✅ activo (motor principal) |
| lenis | engine/hooks/useLenis | ✅ activo |
| **gsap** | sin referencias en src | 🔴 candidato muerto |
| **swiper** | sin referencias en src | 🔴 candidato muerto |
| **react-window** | sin referencias en src | 🔴 candidato muerto |
| **react-intersection-observer** | sin referencias (el repo usa su propio hook useReveal + IntersectionObserver nativo) | 🔴 candidato muerto |
| **clsx** | sin referencias en src | 🔴 candidato muerto |

**UI / utilidades**
| Paquete | Uso |
|---|---|
| zustand | cartStore |
| sonner | toasts (Layout, Programs, Shop) |
| vaul | CartDrawer |
| fuse.js | buscador de Shop |
| react-fast-marquee | marquesinas de Shop |
| react-parallax-tilt | tarjetas de Community |
| react-helmet-async | RouteSeo (metadatos por ruta) |
| lucide-react | iconografía |

> Decisión pendiente (fuera de Fase 1): eliminar las 5 dependencias marcadas 🔴. Son
> claramente muertas (cero imports, también en tests), pero la eliminación se hará en
> una fase propia con su verificación de build.

## 8. DO NOT BREAK (plan 1.24)

Contratos que ninguna fase posterior puede romper. Cada línea tiene un test ejecutable
que la vigila:

| Contrato | Dónde se vigila |
|---|---|
| Las 17 rutas públicas declaradas, sin duplicados, con 404 real | `src/test/baselineContract.test.js` |
| Ids, nombres y precios COP de los 4 planes canónicos | `baselineContract.test.js` |
| Número oficial de WhatsApp y formato del deep link | `baselineContract.test.js` |
| Stack de ejecución (versiones de react/vite/vitest) | `baselineContract.test.js` |
| Hitos de conversión de la home (hero, planes, extras, recepción) + navegación por teclado | `src/test/conversionRegression.test.jsx` + `e2e/conversion-milestones.spec.js` |
| Flujo crítico: recomendación → checkout → confirmación por WhatsApp | `src/pages/criticalFlow.test.jsx` |
| Checkout encuentra los 4 planes y sus radios | `src/pages/Checkout.test.jsx` |
| Catálogo: 4 planes, servicios, extras sin fantasmas | `src/config/offerings.test.js`, `shopCatalog.test.js`, `shopProducts.test.js` |
| Recomendador en pie (motor que no lanza al importarse) | `src/lib/conversion/recommendation.test.js` (34 tests) |
| PDFs de planes enlazables (`/docs/plan-*.pdf`) | ASSETS-INVENTORY.md + rutas de plan |
| SEO por ruta (title/description/canonical/robots) | `RouteSeo` + `routeMeta.js` + HTML generados en `dist/` |
| Consentimiento antes de analytics | `src/lib/forms/privacy.test.js` + `consent.js` |
| Carrito persistente saneado | `src/store/cartStore.test.js` |
| Skip link como primer foco del documento | `e2e/conversion-milestones.spec.js` (teclado) |

## 9. Diferencias conocidas respecto al plan pegado (8f14698)

La auditoría externa auditó `8f14698` con 84 fallos. Este baseline ya incluye su
resolución (detalle en TEST-MATRIX.md):

- Categoría A (infraestructura de test): resuelta en `da3c582` — mocks de
  `matchMedia`, `IntersectionObserver`, `ResizeObserver`, `scrollTo` en
  `src/test/setup.js`; el spec e2e que faltaba ya existe.
- Categoría B (integridad comercial): resuelta en `2781999` — el catálogo publicado de
  4 planes es la fuente de verdad; ids `rendimiento`/`PERFORMANCE` alineados; extra
  `optimizacion-biohacking` regularizado; precios de contrato = precios publicados.
- Categoría C (deriva copy/contrato): resuelta en los 4 lotes de contratos — los tests
  se reescribieron como contrato del copy vigente.
- Categoría D (arquitectura): `baselineContract` actualizado a las 17 rutas.
- Fase 1 añadió además: SSoT de WhatsApp, dominio canónico real, SceneErrorBoundary,
  fix StrictMode de RouteEffects y spec de baseline visual.

## 10. Criterio de "Fase 1 terminada" — cumplido

| Gate | Estado |
|---|---|
| BUILD | ✅ 100 % (0 errores) |
| LINT | ✅ 0 errores (18 warnings legacy inventariados) |
| UNIT TESTS | ✅ 212/212 |
| E2E | ✅ 39/39 |
| ROUTES | ✅ 17 rutas del contrato + 404 (ROUTES.md) |
| ASSETS | ✅ inventariados (ASSETS-INVENTORY.md) |
| BASELINE | ✅ este documento + 34 capturas en `test-results/playwright/baseline/` |
