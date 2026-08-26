# PERFORMANCE-BASELINE — Baseline de rendimiento

**Fase 1 (plan 1.26).** Datos reales del build de producción en el commit BASELINE
(`vite build`, Vite 6). Las métricas de campo (LCP/CLS/INP) quedan pendientes —
ver §6.

## 1. Totales del build

| Tipo | Chunks | Minificado | Gzip |
|---|---|---|---|
| JavaScript | 28 | 1 906,6 kB | 560,9 kB |
| CSS | 13 | 590,0 kB | 113,5 kB |
| HTML (index) | 1 | 4,4 kB | 1,6 kB |

## 2. Coste inicial de la home (ruta crítica)

Lo que descarga un visitante nuevo en `/` antes de ser interactivo:

| Recurso | Min | Gzip |
|---|---|---|
| `index.html` | 4,4 kB | 1,6 kB |
| `index-*.css` (global) | 281,2 kB | 52,1 kB |
| `vendor-react-*.js` | 179,7 kB | 59,2 kB |
| `vendor-motion-*.js` (framer-motion) | 128,7 kB | 43,3 kB |
| `index-*.js` (app shell + home estática) | 333,5 kB | 103,5 kB |
| **Total app** | **927,5 kB** | **259,7 kB** |

Más las fuentes de Google (DM Mono, Inter, Montserrat) con `preconnect`, externas.
La home es estática (no lazy) a propósito para proteger el LCP.

## 3. Code splitting por ruta

Cada página es un chunk lazy que solo se descarga al navegar a ella:

| Chunk | Min / Gzip | Chunk | Min / Gzip |
|---|---|---|---|
| Shop | 60,7 / 20,5 | Resources | 38,9 / 11,9 |
| About | 44,1 / 11,2 | Community | 36,1 / 10,5 |
| Programs | 32,4 / 10,3 | PlanPresentation | 29,1 / 8,8 |
| AppExperience | 26,6 / 7,9 | Onboarding | 20,7 / 6,8 |
| Checkout | 10,2 / 3,5 | ParkourAcademy | 10,0 / 3,5 |
| FAQ | 6,7 / 2,6 | OrderConfirmation | 3,2 / 1,2 |
| NotFound | 2,1 / 1,1 | privacy | 2,0 / 0,9 |

Los 8 chunks de iconos lucide (0,3–1,0 kB c/u) están separados correctamente.

## 4. Peso 3D (aislado)

| Chunk | Min | Gzip | Cuándo se descarga |
|---|---|---|---|
| `vendor-three-*.js` (three + R3F + drei + postprocessing) | 826,9 kB | 222,3 kB | Solo al visitar `/about` (Globe3D) |
| `SignatureScene-*.js` | 100,2 kB | 26,0 kB | Solo si una ruta monta SceneMount (hoy ninguna) |
| `Scene3D-*.js` (orquestador) | 0,8 kB | 0,5 kB | Ídem |

El bundle 3D (928 kB min) **no toca la home ni ninguna otra ruta**: el code
splitting funciona. Es el mayor candidato de optimización de la Fase 12 si el
globo se mantiene (tree-shaking de drei, o degradación a versión ligera).

## 5. Imágenes y assets

- `public/` pesa ~42,6 MB (ver ASSETS-INVENTORY.md). 16 ficheros superan 500 KB;
  el mayor, 1,2 MB.
- 0 % AVIF/WebP hoy; todo JPG. Es la mayor palanca de la Fase 12 junto al CSS.
- Cabeceras de caché en `vercel.json`:
  - `/assets/*` → `max-age=31536000, immutable` (hash en filename) ✅
  - `/icons|og|images/*` → `max-age=604800, stale-while-revalidate=86400` ✅
  - `/docs/*` → `max-age=86400` ✅
  - Seguridad: HSTS, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy ✅

## 6. Métricas de campo (LCP / CLS / INP) — PENDIENTE

**NO VERIFICADO / pendiente de Fase 12.** Se intentó ejecutar Lighthouse contra
`vite preview` usando Brave headless; el guard de seguridad de esta máquina
bloquea cualquier acceso a la ruta de datos de Brave (`SENSITIVE_PATH_BLOCKED`),
y la política prohíbe sortearlo. No se inventan métricas.

Lo que sí está verificado estructuralmente (PROBABLE, sin medición):
- LCP de la home: el HTML por ruta (`vite/emitRouteHtml.js`) entrega contenido
  real sin esperar JS; la home es chunk estático; fuentes con preconnect.
- CLS: las imágenes de banco no declaran `width/height` de forma sistemática —
  riesgo real a medir en Fase 12.
- INP: sin librerías de analítica pesada; Lenis y framer-motion son los únicos
  actores de main-thread continuos.

**Acción Fase 12:** medir con Lighthouse/CrUX en una máquina o CI donde sea
posible, y fijar entonces los umbrales.

## 7. Deuda de rendimiento registrada (para Fase 12)

1. Recomprimir las 16 imágenes >500 KB y generar AVIF/WebP (~41 MB → objetivo <10 MB).
2. `vendor-three` 827 kB: recortar imports de drei/postprocessing o degradar el globo.
3. `index-*.css` 281 kB global: dividir por ruta tras la limpieza de overrides (ver DESIGN-AUDIT.md).
4. `index-*.js` 334 kB: auditar qué librerías viajan en el shell (zustand, helmet, lenis…).
5. Dimensiones explícitas en `<img>` para eliminar CLS.
