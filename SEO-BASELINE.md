# SEO-BASELINE — Baseline de SEO

**Fase 1 (plan 1.27).** Verificado sobre los HTML reales de `dist/` tras el build
del commit BASELINE. Dominio canónico resuelto con Sebastián:
**`https://bayona-jet.vercel.app`** (producción actual). Cero referencias al
dominio antiguo en `dist/` (la única aparición de "sebasbayona" son los perfiles
sociales legítimos del fundador en el JSON-LD `sameAs`).

## 1. Arquitectura SEO actual

- SPA React con **HTML estático por ruta** generado en build por
  `vite/emitRouteHtml.js`: 14 ficheros HTML con `<head>` completo (title,
  description, canonical, robots, OG, Twitter, JSON-LD).
- **El body se renderiza en cliente** (`<div id="root">` vacío). Los crawlers que
  ejecutan JS (Googlebot) ven el contenido; los que no, solo el head. Es la mayor
  limitación estructural registrada (candidato a prerender/SSR en fase posterior).
- Metadatos por ruta definidos en `src/lib/seo/routeMeta.js` y aplicados en
  runtime también por `SeoManager` (react-helmet-async), así la navegación SPA
  actualiza el head.
- `sitemap.xml` y `robots.txt` generados en build, apuntando al dominio canónico.

## 2. Matriz por ruta (extraída de dist/)

| Ruta | Title (SERP) | robots | og:type |
|---|---|---|---|
| `/` | BAYONA — Entrenamiento con método y acompañamiento real | index,follow | website |
| `/about` | Nosotros — Por qué existe BAYONA · BAYONA | index,follow | website |
| `/programs` | Programas y planes de entrenamiento · BAYONA | index,follow | website |
| `/parkour-academy` | Academia de Parkour · BAYONA | index,follow | website |
| `/plan/raiz` | Plan RAÍZ — RECONSTRUCCIÓN · BAYONA | index,follow | **product** |
| `/plan/fuerza` | Plan FUERZA — PROGRESO REAL · BAYONA | index,follow | product |
| `/plan/rendimiento` | Plan RENDIMIENTO — TRANSFORMACIÓN TOTAL · BAYONA | index,follow | product |
| `/plan/elite` | Plan ELITE — DOMINIO TOTAL · BAYONA | index,follow | product |
| `/shop` | Tienda — Clases, recuperación y evaluaciones · BAYONA | index,follow | website |
| `/app` | BAYONA+ — La app en desarrollo · BAYONA | index,follow | website |
| `/community` | Comunidad · BAYONA | index,follow | website |
| `/resources` | Recursos gratuitos de movimiento y fuerza · BAYONA | index,follow | website |
| `/faq` | Preguntas frecuentes · BAYONA | index,follow | website |
| `/onboarding` | Entrar a BAYONA · BAYONA | index,follow | website |
| `/checkout` | (sin HTML estático — embudo) | **noindex** + Disallow | — |
| `/order-confirmation` | (sin HTML estático — embudo) | **noindex** + Disallow | — |
| `/entrar` | alias de `/onboarding` — fuera de sitemap, canonical apunta a la real | — | — |
| `*` (404) | Página no encontrada | noindex runtime | — |

Todas las rutas indexables llevan: canonical absoluta correcta, `og:locale es_ES`,
`og:url`, `og:title`, `og:description`, `og:image` (`/og/bayona-og.png` 1200×630)
y `twitter:card summary_large_image`. Los titles de plan se construyen desde el
catálogo real (`membershipPlans`) — si cambia un precio, cambia la description.

## 3. robots.txt y sitemap.xml (generados, verificados)

- `robots.txt`: `Allow: /`, `Disallow: /checkout` y `/order-confirmation`,
  `Sitemap: https://bayona-jet.vercel.app/sitemap.xml`.
- `sitemap.xml`: 15 URLs (14 rutas indexables + home con priority 1.0),
  `lastmod` del día de build. Sin rutas noindex ni alias.

## 4. Datos estructurados (JSON-LD en el HTML estático)

Graph con 4 nodos verificado en `dist/index.html`:
- `Organization` BAYONA (logo, slogan, `sameAs` sociales, `contactPoint` con
  teléfono `+34 614 988 006` y URL de WhatsApp).
- `Person` Sebastián Bayona (fundador).
- `WebSite` y `WebPage` enlazados al Organization.
Los nodos usan el dominio canónico nuevo.

## 5. Headings (H1)

**PROBABLE (análisis estático; el contenido es client-rendered):** las 17 rutas
declaran un único H1 — `PageHero` renderiza `<h1>{title}</h1>` y Home, Resources
y Shop usan `motion.h1`. El H1 no está en el HTML estático (ver §1).

## 6. Hallazgos y deuda SEO

1. **Body client-rendered** — sin prerender. Candidato a fase posterior
   (prerender de las 14 rutas indexables; la infraestructura de emitRouteHtml ya
   existe y lo haría barato).
2. **Title duplicado de marca en `/onboarding`**: "Entrar a BAYONA · BAYONA".
   Menor; corregible en routeMeta con `bare: true`.
3. **Sin `og:image` por ruta**: todas comparten la imagen OG por defecto. Las
   rutas de plan (og:type product) se beneficiarían de imagen propia (Fase 14).
4. **Sin hreflang / versión multilingüe**: `TranslateOffer` existe como oferta,
   pero no hay rutas de idioma. Decisión de producto pendiente.
5. **FAQ sin schema `FAQPage`** en JSON-LD (la página /faq tiene el contenido;
   falta el marcado). Ganancia rápida para fase SEO.
6. Dominio `sebasbayona.co` sigue NXDOMAIN global (preexistente, ajeno a este
   repo); si se registra en el futuro, decidir redirección 301 hacia el canónico.
