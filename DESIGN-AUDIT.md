# DESIGN-AUDIT — CSS, componentes globales y deuda visual

**Fase 1 (planes 1.14, 1.19).** Inventario y clasificación del sistema visual actual.
En Fase 1 **no se elimina ni se reescribe nada**: esto es el mapa para construir el
Design System de la Fase 3 sin romper lo que funciona.

## 1. CSS — 46 ficheros, ~770 KB sin minificar

El build produce 13 chunks CSS (590 KB minificados) porque las hojas de página viajan
con el chunk de su ruta desde la migración hecha en `main.jsx` (comentado allí).

### 1.1 Capa global (se carga en todas las rutas)

| Fichero | Tamaño | Clasificación |
|---|---|---|
| `src/styles.css` | 107 KB | 🟡 Deuda: base histórica con 258 tamaños tipográficos repartidos (el reset v2 lo documenta). Contiene el bloque de accesibilidad (skip link, focus visible) |
| `src/overrides.css` | 25 KB | 🔴 Problemático: capa de parches sobre parches; objetivo de absorción en Fase 3 |
| `src/styles/luxury-system.css` | 7,9 KB | 🟢 Sistema de acabado de lujo (v3) |
| `src/styles/v2-surface.css` | 7,9 KB | 🟢 v2: superficie/radius |
| `src/styles/v2-typography.css` | 9,0 KB | 🟢 v2: escala tipográfica por rol semántico |
| `src/styles/v2-editorial.css` | 7,4 KB | 🟢 v2: editorial |
| `src/styles/v2-hero-depth.css` | 7,4 KB | 🟢 v2: profundidad de hero |
| `src/styles/v2-image-grade.css` | 4,8 KB | 🟢 v2: gradado de imagen |
| `src/styles/v2-pricing.css` | 6,1 KB | 🟢 v2: precios como producto de lujo |
| `src/styles/v2-scroll-motion.css` | 13,4 KB | 🟢 v2: movimiento de scroll |
| `src/styles/v3-finish.css` | 4,5 KB | 🟢 v3: grano fílmico, selección, acento champán |
| `src/styles/elite-refinements.css` | 7,1 KB | 🟡 Refinamiento de acabado |
| `src/styles/premium-route-chrome.css` | 17,0 KB | 🟡 Chrome de rutas premium |

El orden de cascada está documentado en `main.jsx` (v2 matiza el radius global, v3
añade pulido al final). Los 7 ficheros `v2-*` + `v3-finish` son **un rediseño a medio
terminar coexistiendo con v1**: la señal de deuda más clara del repositorio.

### 1.2 Hojas por página (viajan con el chunk de su ruta)

| Fichero | Tamaño | Fichero | Tamaño |
|---|---|---|---|
| app.css | 91 KB | programs.css | 18,3 KB |
| home.css | 83,7 KB | faq.css | 17,3 KB |
| resources.css | 55,2 KB | parkour-academy.css | 10,7 KB |
| community.css | 51,7 KB | onboarding.css | 27,2 KB |
| plan-presentation.css | 38,5 KB | shop.css | 36,5 KB |
| about.css | 29,6 KB | not-found.css | 3,2 KB |
| | | checkout-handoff.css | 2,3 KB |

### 1.3 Hojas de componente

cart.css 9,8 · social.css 11,4 · community-bridges.css 9,2 · video-section.css 7,5 ·
journey-ribbon.css 5,1 · experience-proof.css 4,6 · free-value.css 4,4 ·
media-scenes.css 3,5 · next-chapter.css 4,0 · share-invite.css 2,8 ·
translate-offer.css 2,4 · reception-cta.css 2,2 · error-boundary.css 1,9 ·
home-scroll-animations.css 1,8 · consent.css 1,7 · route-effects.css 1,5 (KB)

### 1.4 Parches "refinements" (deuda señalada)

| Fichero | Tamaño | Nota |
|---|---|---|
| plan-final-refinements.css | 0,5 KB | 🔴 Parche diminuto: absorber |
| plan-hero-refinements.css | 0,6 KB | 🔴 Absorber |
| plan-summary-refinements.css | 0,7 KB | 🔴 Absorber |
| plan-value-refinements.css | 0,8 KB | 🔴 Absorber |
| elite-refinements.css | 7,1 KB | 🟡 Consolidar con plan-presentation |

### 1.5 Clasificación resumen (plan 1.19)

- **global:** styles.css, overrides.css, luxury-system, v2-*, v3-finish, elite-refinements, premium-route-chrome.
- **page-specific:** las 13 hojas de §1.2.
- **override:** overrides.css (25 KB) + los 4 refinements diminutos.
- **deprecated:** nada confirmado todavía — hay que validar uso real en Fase 3 antes de
  declarar nada deprecated (p. ej. partes de styles.css que las capas v2 ya anulan).
- **v2:** los 7 ficheros v2-* (sistema visual vigente, base de la Fase 3).
- **duplicated:** reglas anuladas por la cascada v2/v3 dentro de styles.css (los 258
  tamaños tipográficos); CustomCursor duplicado en JS (§2.2).

## 2. Componentes globales (plan 1.14)

`App.jsx` monta 14 componentes globales. Etiquetado:
🔵 Core (no tocar salvo necesidad) · 🟢 Reutilizable (mejorable) ·
🟡 Deuda técnica (refactorizar) · 🔴 Problemático (puede provocar bugs).

| Componente | Etiqueta | Función / observación |
|---|---|---|
| `RouteSeo` | 🔵 | Metadatos por ruta (helmet). Contrato DO-NOT-BREAK |
| `RouteEffects` | 🔵 | Anuncio de ruta para lectores de pantalla + pageview SPA. El guard de primera carga es ahora idempotente (fix Fase 1) |
| `Navbar` (Layout) | 🟡 | Core de navegación pero con deuda: orden Inicio→Nosotros→Programas (el pedido es Inicio→Programas→Nosotros), 10 destinos en barra (frágil `slice`), sin focus trap en menú móvil, CTA duplicado a /programs → Fase 4 |
| `Footer` (Layout) | 🔵 | Enlaces + redes + "DISEÑADO PARA AVANZAR" (mayúsculas sostenidas: revisar en Fase 3 de copy) |
| `WhatsAppButton` (Layout) | 🔵 | Ya usa `whatsAppLink()` (SSoT, Fase 1) |
| `ConsentBanner` | 🔵 | RGPD; bloquea analytics hasta consentimiento |
| `PageTransition` | 🟢 | Envuelve Routes; reset de scroll documentado |
| `ScrollProgress` | 🟢 | Progreso de lectura |
| `ShareInvite` | 🟢 | Solo rutas del itinerario |
| `NextChapter` | 🟢 | Solo rutas del itinerario |
| `JourneyRibbon` | 🟡 | Compite por atención en 360 px con WhatsApp/Consent/TranslateOffer (auditoría 3.6) → Fase 4/10 |
| `TranslateOffer` | 🟡 | Solo si el navegador no está en español; compite en móvil → Fase 4/10 |
| `PremiumRouteChrome` | 🟡 | 17 KB de CSS propio; evaluar fusión con el sistema de rutas |
| `CustomCursor` | 🔴 | **Duplicado**: `components/CustomCursor.jsx` y `engine/effects/CustomCursor.jsx`. Sin valor en táctil → candidato a eliminación en Fase 3/10 |

Además: `skip-link` (primer foco del documento, verificado por e2e) y `RouteFallback`
(`role="status"`, `aria-live="polite"`).

## 3. Problemas visuales registrados (vienen de la auditoría, vigentes)

1. **14 componentes globales compitiendo**; en 360 px coinciden botón WhatsApp,
   JourneyRibbon, ConsentBanner y TranslateOffer → carga cognitiva (Fase 4).
2. **Menú móvil sin focus trap** y sin `role="dialog"`/`aria-modal`; salto de layout al
   bloquear scroll sin compensar la scrollbar (ACCESSIBILITY-BASELINE.md, Fases 10/11).
3. **Marcadores provisionales publicados** en PaseBayona ("OBJETIVO POR DEFINIR…") —
   el copy vigente ya pasó por los contratos C; re-verificar en la fase de copy.
4. **Seis librerías de animación conviviendo** (framer-motion, gsap, lenis, swiper,
   react-parallax-tilt, react-fast-marquee); gsap y swiper resultaron sin uso real
   (BASELINE.md §7). Consolidación en Fase 5 (motion).
5. **Más de 600 KB de CSS sin minificar** con capas v1/v2/v3 + parches: el Design
   System de Fase 3 debe absorber `overrides.css` y los refinements, y jubilar lo que
   v2/v3 ya anulan.

## 4. Lo que está bien y se preserva

- Code splitting por ruta con CSS viajando en el chunk de su página.
- Orden de cascada documentado en `main.jsx`.
- Sistema v2/v3 con intención clara (superficie, tipografía por rol, gradado, acabado).
- Skip link y estados de foco visibles (`:focus-visible` con outline dorado).
- `SceneMount` importado directo (no barrel) para preservar el code-splitting de R3F.
