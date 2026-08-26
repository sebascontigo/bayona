# ASSETS-INVENTORY — Inventario de assets públicos

**Fase 1 (planes 1.17, 1.18).** Inventario de `public/` en el commit BASELINE.
Peso total: **~42,6 MB en 172 ficheros**. Todo el peso está en imágenes; la
optimización profunda es trabajo de la Fase 12 (Performance).

## 1. Imágenes — `public/images/` (161 ficheros, ~41 MB, todo JPG)

### 1.1 `images/burst/` — 131 ficheros, ~37,6 MB

Fotografía de banco (estilo Burst) añadida el 2026-08-26 para localizar la tienda
(commit `152b6e5`: se dejó de depender del CDN externo de Shopify).

- **Quién lo usa:** `src/config/siteMedia.js` (fuente única de medios, 143 referencias
  a rutas `burst/`). De ahí consumen las páginas (Home, Shop, Programs, About,
  Resources, Community, PlanPresentation…).
- **Peso:** media ~287 KB/fichero.
- **13 ficheros superan 500 KB**; los mayores:
  - `a-person-mid-jump-on-a-country-road.jpg` ≈ 1,2 MB (el más pesado del repo)
  - `young-man-leans-on-wall.jpg` ≈ 992 KB
  - `hiking-though-giants.jpg` ≈ 980 KB
  - `carved-stone-buddhas…jpg` ≈ 815 KB
- **Formato:** 100 % JPG; no hay AVIF/WebP todavía (Fase 12).
- **Optimización posible:** alta — recompresión, variantes por tamaño de uso y
  formatos modernos reducirían decenas de MB sin tocar diseño.

### 1.2 `images/testimonials/` — 30 ficheros, ~4,4 MB

10 personas × 3 variantes de tamaño (`-256`, `-960`, sin sufijo = full).

- **Quién lo usa:** `src/config/testimonials.js` → `GlobeTestimonials`,
  `TestimonialMarquee`, `home/ExperienceProof`, About, PlanPresentation, Programs.
- **3 ficheros full superan 500 KB:** `familia-rusa.jpg` 621 KB,
  `andrea-empresaria.jpg` 538 KB, `valeria-emprendedora.jpg` 530 KB.
- El patrón de 3 tamaños ya es el correcto; falta que el markup elija siempre el
  tamaño adecuado (Fase 12).

## 2. PDFs — `public/docs/` (4 ficheros, 384 KB) — plan 1.18

| PDF | Peso | Enlazado desde |
|---|---|---|
| `plan-raiz.pdf` | 81 KB | `offerings.js` → `presentationUrl` del plan RAÍZ |
| `plan-fuerza.pdf` | 115 KB | ídem, FUERZA |
| `plan-rendimiento.pdf` | 83 KB | ídem, RENDIMIENTO |
| `plan-elite.pdf` | 99 KB | ídem, ELITE |

✅ Los cuatro existen y están enlazables (cada plan del catálogo declara su
`presentationUrl`). Cabeceras de caché en `vercel.json` (`/docs/*`, max-age 1 día).
**No se rediseñan en Fase 1**: la auditoría profunda de contenido y experiencia de los
PDFs corresponde a la Fase 14.

## 3. Iconos y PWA

| Fichero | Peso | Uso |
|---|---|---|
| `favicon.svg` | 258 B | index.html |
| `icons/apple-touch-icon.png` | 7,3 KB | index.html |
| `icons/icon-192.png` | 8,1 KB | manifest |
| `icons/icon-512.png` | 29,8 KB | manifest |
| `icons/icon-512-maskable.png` | 36,4 KB | manifest |
| `manifest.webmanifest` | 1,2 KB | index.html (app instalable) |
| `og/bayona-og.png` | 136 KB | Open Graph / Twitter por defecto (1200×630) |

## 4. Ausencias deliberadas / generadas en build

- **No hay `public/fonts/`**: las tipografías (DM Mono, Inter, Montserrat) vienen de
  Google Fonts vía `<link>` en index.html con preconnect. Decisión registrada: las
  fuentes web propias y su self-hosting se evaluarán en Fase 12.
- **No hay `robots.txt` ni `sitemap.xml` estáticos**: los genera
  `vite/emitRouteHtml.js` en `dist/` durante el build (verificados tras el cambio de
  dominio: apuntan a `https://bayona-jet.vercel.app`).

## 5. Resumen para fases posteriores

| Dato | Valor | Relevancia |
|---|---|---|
| Peso total public/ | ~42,6 MB | Fase 12 |
| Ficheros >500 KB | 16 (13 burst + 3 testimonios full) | Fase 12 |
| Formatos modernos (AVIF/WebP) | 0 % | Fase 12 |
| Duplicados detectados | ninguno entre imágenes (los 3 tamaños de testimonios son intencionales) | — |
| PDFs de planes | 4/4 presentes y enlazados | Fase 14 (contenido) |
