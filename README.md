# BAYONA WEB — Código fuente

> Repo: **github.com/sebascontigo/bayona**
> Producción: **https://sebasbayona.co** · Vercel, auto-deploy en cada push a `main`

---

## Publicar

```bash
npm run lint      # 0 errores esperados
npm test          # ver "Estado de los tests" más abajo
npm run build     # obligatorio antes de publicar
git add <archivos>
git commit -m "descripción del cambio"
git push
```

Vercel reconstruye y publica en ~1 minuto.

---

## Stack real

React 18.3 · Vite 6 · React Router **7** (modo `BrowserRouter`) · Zustand 5 ·
Framer Motion 11 · React Three Fiber 8 + three 0.172 + drei · Lenis · Lucide ·
vaul (carrito) · sonner (avisos) · react-helmet-async (SEO)

**No hay Tailwind.** Todo el estilo es CSS propio en `src/styles/`.

---

## Estructura

| Carpeta | Qué contiene |
|---|---|
| `src/pages/` | Las 17 rutas (16 páginas + alias `/entrar`) |
| `src/components/` | Componentes de producto (GlobeTestimonials, CartDrawer, Layout…) |
| `src/components/seo/` | `RouteSeo` — metadatos por ruta |
| `src/components/consent/` | Banner de consentimiento RGPD |
| `src/engine/` | Motor 3D: escenas, luces, partículas, shaders, hooks de movimiento |
| `src/config/` | Fuentes de verdad: `offerings.js` (precios), `siteMedia.js` (imágenes), `site.config.js` (identidad), `faqContent.js` |
| `src/lib/seo/` | Registro de rutas y generación de schema.org |
| `src/lib/analytics/` | Medición y consentimiento |
| `src/lib/conversion/` | Recomendador, extras y puente a WhatsApp |
| `src/styles/` | CSS: uno global + uno por página |
| `vite/` | `emitRouteHtml.js` — HTML por ruta, sitemap y robots en build |

---

## SEO: cómo funciona

Es una SPA, así que hay **dos capas** y las dos son necesarias:

1. **`vite/emitRouteHtml.js`** (build). Genera un `index.html` por ruta con su
   propio `<title>`, description, canonical, Open Graph, Twitter Card, JSON-LD y
   preload del LCP. Esto es lo que leen WhatsApp, Facebook, Instagram, Twitter y
   LinkedIn, que **no ejecutan JavaScript**. Sin esto, compartir el enlace de un
   plan mostraría el título de la home.
2. **`src/components/seo/RouteSeo.jsx`** (cliente). Mantiene el `<head>`
   correcto al navegar dentro de la SPA, donde no hay recarga.

Ambas leen del **mismo sitio**: `src/lib/seo/routeMeta.js`.

### Para añadir una página

1. Crea la página en `src/pages/`.
2. Añade la `<Route>` en `src/App.jsx` (con `lazy`, como las demás).
3. Añade su entrada en `STATIC_ROUTES` de `src/lib/seo/routeMeta.js`.

El sitemap, el robots y el HTML de esa ruta se generan solos en el siguiente
build. No hay nada que mantener a mano.

### Marcadores del `<head>`

`index.html` tiene un bloque delimitado por marcadores `seo`. El plugin
**sustituye todo lo que hay entre ellos**. No edites ese bloque a mano: cambia
`routeMeta.js`.

---

## Medición

No se carga ninguna analítica hasta que la persona acepta el banner (RGPD, y
BAYONA opera desde España). Sin variables de entorno configuradas, todo el
sistema es *no-op*: no pide nada, no guarda nada, no muestra banner.

Variables opcionales (en Vercel → Settings → Environment Variables):

| Variable | Ejemplo | Para qué |
|---|---|---|
| `VITE_SITE_URL` | `https://sebasbayona.co` | Dominio canónico |
| `VITE_GA4_ID` | `G-XXXXXXXXXX` | Google Analytics 4 |
| `VITE_PLAUSIBLE_DOMAIN` | `sebasbayona.co` | Plausible |
| `VITE_META_PIXEL_ID` | `1234567890` | Meta Pixel |
| `VITE_ANALYTICS_DEBUG` | `true` | Volcar eventos por consola |

Eventos que ya se emiten: `page_view`, `whatsapp_click`, `lead_submitted`,
`plan_selected`, `whatsapp_blocked`, `whatsapp_manual_open`,
`not_found_recovery`, `app_error`.

`whatsapp_blocked` es el importante: mide cuántas solicitudes no llegaron porque
el navegador bloqueó la pestaña.

---

## Conversión: todo pasa por WhatsApp

No hay pasarela de pago. Cada CTA construye un mensaje y abre `wa.me`.

Usa siempre **`openWhatsApp()`** de `src/lib/conversion/whatsappBridge.js`, nunca
`window.open` directo. El puente detecta cuando el navegador bloquea la pestaña
(habitual en iOS y en los navegadores internos de Instagram y TikTok), guarda la
solicitud en el dispositivo y deja que la UI ofrezca el enlace manual. Antes ese
lead se perdía en silencio.

El número está una sola vez, en `src/config/site.config.js`.

---

## Reglas de contenido

Heredadas de `src/config/conversionContent.js` y de obligado cumplimiento:

- Copia **en español**.
- **Sin promesas de resultado** ni plazos ("en 90 días", "resultado garantizado").
- **Marco no médico**: no se diagnostica, trata ni sustituye atención sanitaria.
- **Sin urgencia inventada**: nada de contadores de plazas hardcodeados.
- **Sin evidencia no verificable**: si no hay dato real, se publica el fallback
  honesto. Por eso el JSON-LD no emite `aggregateRating`.

---

## Estado de los tests

`npm test` → **24 ficheros fallan (84 tests)**. Es deuda **anterior** a la
refactorización de SEO y medición, y conviene saber por qué antes de tocarlos:

- `src/test/baselineContract.test.js` y `src/test/conversionRegression.test.jsx`
  son *contratos congelados* de una versión anterior del producto: esperan
  **3 planes** (RAIZ / PERFORMANCE 399.000 / ELITE) y **11 rutas**. Hoy hay
  4 planes (RAÍZ / FUERZA / RENDIMIENTO / ELITE) y 17 rutas.
- `conversionRegression.test.jsx` además importa `../../e2e/conversion-milestones.spec.js`,
  que **no existe en el repo** (`e2e/` está en `.gitignore`), así que el fichero
  ni se llega a cargar.
- El resto son aserciones de copia literal que cambió (por ejemplo
  `PaseBayona.test.jsx` espera una frase de privacidad más corta que la actual).

Decidir qué es la verdad —el test o el producto— es una tarea aparte. Mientras
tanto, la referencia es: **84 fallos y 103 aciertos**. Si tras un cambio sube de
84, ese cambio ha roto algo.

Por eso `.github/workflows/ci.yml` ejecuta el lint con `continue-on-error` y
verifica el build y los artefactos de SEO, que sí son señal fiable.

---

## Reglas de oro

- Cambios pequeños y quirúrgicos.
- `npm run build` antes de publicar. Siempre.
- Precios, imágenes y textos legales viven en `src/config/`, no en las páginas.
- Nada de hardcodear el dominio ni el número de WhatsApp: están en
  `src/config/site.config.js`.
