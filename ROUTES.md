# ROUTES — Matriz de rutas de BAYONA

**Fase 1 (plan 1.13).** Las 17 rutas públicas del contrato
(`src/test/baselineContract.test.js`) + el catch-all 404. Esta tabla es la checklist
de todas las fases posteriores del rediseño: cada fila debe seguir funcionando cuando
una fase termine.

- **Existe:** declarada en `App.jsx`.
- **Carga:** `static` (en el chunk de entrada) o `lazy` (chunk propio por ruta).
- **SEO:** política de indexación de `routeMeta.js` / HTML generados en `dist/`.
- **CTA:** acción de conversión principal de la página (todo convierte por WhatsApp).
- **3D:** escena viva hoy; `arquitectura` = SceneMount disponible pero sin escena montada.
- **Tests:** ficheros que cubren la ruta (ver TEST-MATRIX.md).

| # | Ruta | Existe | Carga | SEO | CTA | 3D | Tests |
|---|---|---|---|---|---|---|---|
| 1 | `/` | ✅ | static (LCP) | index | Recorrido hero → planes → extras → recepción | No (prohibido por contrato LCP) | Home.test (12), Home.contract (6), criticalFlow, conversionRegression, e2e hitos ×4 |
| 2 | `/about` | ✅ | lazy | index | WhatsApp "conocer mi camino" | ✅ Globe3D (GlobeTestimonials) con fallback | About.test (3) |
| 3 | `/programs` | ✅ | lazy | index | Comparador → plan / WhatsApp general | No | Programs.test (3) |
| 4 | `/parkour-academy` | ✅ | lazy | index | Registro de interés (WhatsApp), sin pago | No | ParkourAcademy.test (3) |
| 5 | `/plan/raiz` | ✅ | lazy | index, og:product | Empezar con RAÍZ (checkout/WhatsApp) | No | offerings.test, Checkout.test, criticalFlow |
| 6 | `/plan/fuerza` | ✅ | lazy | index, og:product | Empezar con FUERZA | No | idem |
| 7 | `/plan/rendimiento` | ✅ | lazy | index, og:product | Empezar con RENDIMIENTO | No | idem |
| 8 | `/plan/elite` | ✅ | lazy | index, og:product | Empezar con ELITE (plazas limitadas) | No | idem |
| 9 | `/shop` | ✅ | lazy | index | Carrito + pedido por WhatsApp | No | Shop.test (4), shopCatalog (3), shopProducts (2), styles/shop (2) |
| 10 | `/app` | ✅ | lazy | index | Early access BAYONA+ (WhatsApp) | No | AppExperience.test (6) |
| 11 | `/community` | ✅ | lazy | index | Unirse por WhatsApp (gratis) | No | sin test dedicado (cubierta por baseline/e2e) |
| 12 | `/resources` | ✅ | lazy | index | Recursos gratis → WhatsApp con contexto | No | Resources.test (5) |
| 13 | `/faq` | ✅ | lazy | index | Videollamada / pregunta rápida (WhatsApp) | No | FAQ.test (4) |
| 14 | `/checkout` | ✅ | lazy | **noindex** (embudo) | CONFIGURADOR BAYONA: configurar solicitud → enviar por WhatsApp | No | Checkout.test (6), criticalFlow (3), commercialSync |
| 15 | `/order-confirmation` | ✅ | lazy | **noindex** (embudo) | Confirmación de siguientes pasos | No | criticalFlow (3) |
| 16 | `/onboarding` | ✅ | lazy | index | Recepción: recorrido guiado → ficha del plan recomendado | No | Onboarding.test (5), e2e home-preview |
| 17 | `/entrar` | ✅ (alias) | lazy | canonical → `/onboarding` | misma recepción | No | contrato de alias en routeMeta |
| — | `*` (404) | ✅ | lazy | **noindex**, 404 real | Accesos principales | No | baselineContract (404 declarado) |

## Notas de arquitectura

- **Code splitting:** Home es estática a propósito (determina el LCP); las 13 páginas
  restantes bajan su chunk y su CSS solo al visitarse. `Scene3D`/R3F van en su propio
  chunk: las rutas sin escena nunca los descargan.
- **HTML por ruta:** en build, `vite/emitRouteHtml.js` genera un documento estático por
  ruta con sus metadatos (bots de WhatsApp/Facebook/Twitter no ejecutan JS), más
  `sitemap.xml` y `robots.txt`.
- **SPA rewrite:** `vercel.json` reescribe todo lo que no sea asset a `index.html`.
- **Alias:** `/entrar` renderiza Onboarding pero su canonical apunta a `/onboarding`;
  solo la canónica se indexa (sin contenido duplicado).
- **3D:** la única escena viva en la baseline es Globe3D en `/about`. El sistema de
  escenas (sceneRegistry → resolveSceneConfig → SceneMount) está cableado, testeado y
  protegido por SceneErrorBoundary, listo para la Fase 7.
- **Capturas baseline:** las 17 rutas (+alias) están capturadas en desktop 1440×900 y
  mobile 390×844 en `test-results/playwright/baseline/` (fuera de git; regenerables con
  `npx playwright test baseline-visual`).

## Huecos detectados (para fases posteriores, no bloqueantes)

- `/community` no tiene test dedicado de página.
- Ninguna ruta monta todavía una escena SceneMount (Fase 7).
- ~~No existen breadcrumbs renderizados (el dato `breadcrumb` sí existe en routeMeta y lo
  consume el structured data; falta el componente visible) → Fase 4 (navegación).~~
  **RESUELTO en Fase 4 (2026-08-27):** `src/components/navigation/Breadcrumb.jsx`
  renderiza el mismo dato `breadcrumb` de routeMeta; montado una vez en `App.jsx`,
  con visibilidad por ruta (no pinta en home, recepción/alias, interna ni 404).
  Contrato en `Breadcrumb.test.jsx` (6 tests).

## Actualización Fase 4 (2026-08-27)

La matriz de rutas no cambia (17 públicas + alias + 404 + interna), pero sí la
experiencia de navegación alrededor de ella:

- **Navbar y footer agrupados** por intención: ENTRENAR / EXPERIENCIAS / CONOCER /
  APRENDER + bloque ENTRAR (`src/components/Layout.jsx`). El CTA de barra lleva a
  recepción (`/onboarding`), no a comprar.
- **Breadcrumb visible** (sistema de posición) en rutas de contenido y embudo.
- **Cierre de página unificado:** `ROUTE_CONTINUATIONS` retirado de
  `PremiumRouteChrome.jsx`; NextChapter (chapters.js) es el único "qué viene después".
- **Embudo conectado:** `/checkout` (CONFIGURADOR BAYONA) recibe entradas desde las
  fichas de plan (`?plan=<id>`) y desde `/programs`; su handoff de éxito enlaza a
  `/order-confirmation`, que deja de ser huérfana. Detalle en
  FASE4-ARQUITECTURA-EXPERIENCIA.md, ROUTE-JOURNEYS.md y PAGE-EXPERIENCE-MATRIX.md.
