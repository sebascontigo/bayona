# Auditoría Bayona.co — Diagnóstico ejecutivo

**Fecha:** 25 de agosto de 2026 · **Commit auditado:** `8f14698` (main, sincronizado con origin)
**Stack real:** Vite 6 + React 18.3 + React Router 7.1 + Vercel · Vitest + Playwright + ESLint con `jsx-a11y`
**Método:** lectura de código fuente y ejecución de la suite de tests. Cero suposiciones.

---

## 1. HALLAZGO QUE CAMBIA EL ORDEN DEL TRABAJO

**La suite de tests está roja en `main`, antes de tocar nada.**

```
Test Files  24 failed | 24 passed (48)
     Tests  84 failed | 103 passed (187)
```

**45% de los tests fallan sobre un checkout limpio.** El árbol de trabajo está limpio y sincronizado con `origin/main`.

Esto tiene una consecuencia directa sobre tu encargo. Tu instrucción dice *"preservar las funciones existentes"* y *"comprueba que no se rompa ninguna función"*. **Con la línea base en rojo eso es imposible de verificar.** Si rediseño Inicio ahora y mañana falla un test, nadie podrá saber si lo rompí yo o ya estaba roto.

Hay 45 archivos de test, tests de contrato, tests basados en propiedades con `fast-check` y Playwright para regresión visual. Es una red de seguridad **excelente** que ahora mismo no protege nada porque nadie la mira.

**Por eso el orden correcto no es auditar → rediseñar. Es: estabilizar → auditar → rediseñar.**

---

## 2. LAS 84 FALLAS, CLASIFICADAS POR CAUSA RAÍZ

No son 84 problemas. Son **12 causas raíz**. Agrupadas por naturaleza:

### CATEGORÍA A · Infraestructura de test, no el sitio (≈54 fallos + 1 crash)

Estos fallos **no afectan al visitante**. Son entornos de prueba mal configurados. Son los más fáciles de arreglar y desbloquean todo lo demás.

| # | Causa raíz | Archivos afectados | Fallos | Esfuerzo |
|---|---|---|---|---|
| A1 | `window.matchMedia is not a function` — jsdom no lo implementa y `test/setup.js` no lo mockea | `AppExperience.test.jsx` | **19** | 15 min |
| A2 | `IntersectionObserver is not defined` — falta polyfill en el setup | `Home.test.jsx`, `Home.contract.test.jsx` | **17** | 15 min |
| A3 | `Cannot destructure property 'basename' of useContext(...) as it is null` — se renderizan componentes con `<Link>` sin envolver en `MemoryRouter` | `Resources.test.jsx`, `PlanExplorer.test.jsx` | **11** | 30 min |
| A4 | Mock de `framer-motion` incompleto: no exporta `AnimatePresence` ni `useReducedMotion` | `About.test.jsx`, `Shop.test.jsx` | **7** | 20 min |
| A5 | Import a fichero inexistente: `../../e2e/conversion-milestones.spec.js?raw`. **La carpeta `e2e/` no existe** aunque hay `playwright.config.js` | `conversionRegression.test.jsx` | crash | 20 min |

**Cambio exacto para A1 y A2:** añadir a `src/test/setup.js` los stubs de `matchMedia` e `IntersectionObserver`.
**Criterio de aceptación:** `npm test` deja de reportar esos dos errores y los 36 tests de esos tres archivos pasan o fallan por motivos de contenido, no de entorno.

### CATEGORÍA B · 🔴 Integridad de datos comerciales — CRÍTICO DE NEGOCIO

Estos sí son problemas reales del producto, y dos son graves.

| # | Problema | Evidencia | Impacto |
|---|---|---|---|
| **B1** | **El motor de recomendación está caído a nivel de módulo.** Lanza `Commercial_Config no publica el plan canónico PERFORMANCE` al importarse, así que mata cualquier archivo que lo cargue | `recommendation.test.js` y `RecommendationGuide.test.jsx` no llegan ni a ejecutar (0 tests recolectados) | 🔴 **Crítico.** El "qué opción se adapta mejor a mis necesidades" de tu objetivo nº5 depende de esto |
| **B2** | **Desajuste de identificadores de plan.** El código canónico espera `PERFORMANCE`; las rutas publicadas son `/plan/rendimiento`. `Checkout` no encuentra el radio `/performance/i` | `Checkout.test.jsx` (2 fallos) + B1 | 🔴 **Crítico.** Rompe checkout |
| **B3** | **Discrepancia de precio: `expected 1539000 to be 1149000`.** Diferencia de **390.000** | `offerings.test.js` | 🔴 **Crítico.** O el precio publicado está mal, o el contrato está mal. Ninguna de las dos es aceptable en una página que cobra |
| **B4** | **Servicio extra fantasma:** `Servicio extra desconocido: optimizacion-biohacking`. Se referencia un extra que no existe en el catálogo | `PersistentSummary.test.jsx`, `offerings.js:442` | 🟠 Alto |
| **B5** | **El catálogo tiene 4 elementos donde el contrato espera 3** (`expected [4] to deeply equal [3]`, y `criticalFlow` espera longitud 3 y recibe 4) | `offerings.test.js` (5), `criticalFlow.test.jsx` | 🟠 Alto |
| **B6** | **Contenido de parkour vacío:** `expected [] to deeply equal ['parkour-tec...']` | `offerings.test.js` | 🟠 Alto |

⚠️ **No voy a "arreglar" B3 eligiendo un precio.** No sé cuál es el correcto y tu instrucción prohíbe inventar datos comerciales. **Necesito que me digas el precio real.**

### CATEGORÍA C · Deriva entre copy y contrato (≈15 fallos)

Alguien cambió los textos sin actualizar los tests, o al revés. Cada uno es una decisión editorial, no un bug técnico.

| # | Test espera | El código dice | Archivo |
|---|---|---|---|
| C1 | `/Esto no es magia ni promesa vacía/` | "Esto no es una promesa. Es lo que con…" | `conversionContent.test.js` |
| C2 | "Pase temporal. No guardamos tus datos." y **prohíbe** "CÓDIGO VISUAL" | Renderiza "CÓDIGO VISUAL" y un texto de privacidad más largo | `PaseBayona.test.jsx` |
| C3 | "estas respuestas reflejan la oferta comercial publicada" | No existe | `FAQ.test.jsx` (4) |
| C4 | heading `/las puertas están abiertas/` | "BIENVENIDO A BA…" | `Onboarding.test.jsx` (6) |
| C5 | texto "MEMBRESÍAS PARKOUR" | No existe | `ParkourAcademy.test.jsx` |
| C6 | heading "ENTRENAMIENTO CON UNA DIRECCIÓN CLARA." | No existe | `Programs.test.jsx` |
| C7 | botón "Explorar categoría CLASES" | No existe | `ExtrasExplorer.test.jsx` (2) |
| C8 | group `/añade clases 1:1/` | "01 Elige tu plan base" | `PlanCalculator.test.jsx` (2) |

**Aquí hay una oportunidad:** como vas a reescribir todo el copy, estos tests hay que reescribirlos de todos modos. **No los arregles ahora; conviértelos en el contrato del copy nuevo.**

### CATEGORÍA D · La arquitectura creció sin gobierno

| # | Problema | Evidencia |
|---|---|---|
| **D1** | **El sitio pasó de 11 a 17 rutas sin actualizar el contrato de arquitectura.** `expected ['/', '/about', '/programs', …(14)] to have a length of 11 but got 17` | `baselineContract.test.js` |
| D2 | Regla CSS eliminada o renombrada: falta `.shop-catalog-list { grid-tem… }` | `shop.test.js` |

**D1 es la prueba objetiva de que tu petición de reorganizar la navegación está justificada.** El sitio creció un 55% en rutas y nadie decidió la jerarquía. No es una opinión estética: es deuda de arquitectura medida.

---

## 3. HALLAZGOS DE CÓDIGO (independientes de los tests)

### 3.1 🔴 BLOQUEANTE: el dominio no es Bayona.co

`src/config/site.config.js`:
```js
const RAW_SITE_URL = import.meta.env?.VITE_SITE_URL || 'https://sebasbayona.co'
```

**El dominio canónico del código es `sebasbayona.co`.** Tu encargo dice *"escribir siempre Bayona.co"*.

Si cambio el copy a "Bayona.co" sin cambiar el dominio, creo una inconsistencia de marca visible y un problema de SEO: los `canonical`, el `sitemap.xml`, los datos estructurados y las tarjetas Open Graph seguirían apuntando a `sebasbayona.co` mientras el texto dice otra cosa.

**Necesito tu decisión antes de tocar una sola línea de copy:**
- **(a)** El dominio real es `sebasbayona.co` y el copy debe decir "sebasbayona.co" o solo "Bayona".
- **(b)** Vas a migrar a `bayona.co`, y entonces hay que planificar redirecciones 301, actualizar `VITE_SITE_URL`, `vercel.json`, sitemap y datos estructurados.
- **(c)** Ambos dominios existen y uno redirige al otro. Dime cuál es el canónico.

### 3.2 Navegación: no cumple el orden que pides

`src/components/Layout.jsx`:
```js
const links = [
  ['Inicio', '/'], ['Nosotros', '/about'], ['Programas', '/programs'],
  ['Academia Parkour', '/parkour-academy'], ['Tienda', '/shop'], ['App', '/app'],
  ['Comunidad', '/community'], ['Recursos', '/resources'], ['ENTRAR A BAYONA', '/onboarding'],
]
```

| Problema | Detalle | Prioridad |
|---|---|---|
| Orden incorrecto | Pides Inicio → Programas → Nosotros. El código tiene Inicio → **Nosotros → Programas**. Están invertidos | Alta |
| 10 destinos en la barra | 9 del array + FAQ insertado a mano con `links.slice(0,-1)` … `links.slice(-1)`. Frágil y demasiado ancho | Alta |
| `'ENTRAR A BAYONA'` | Mayúsculas sostenidas, que tu propia regla de copy prohíbe. Igual `'DISEÑADO PARA AVANZAR'` en el footer y `'BAYONA / NAVEGACIÓN'` en el menú móvil | Media |
| Doble enlace al mismo destino | `<NavLink to="/programs">Programas</NavLink>` **y** `<Link className="nav-cta" to="/programs">Tu camino</Link>` en la misma barra | Media |
| **No existe ruta de Membresías** | Pides una sección de comparación. Solo hay `/plan/{raiz,fuerza,rendimiento,elite}` y componentes `PlanExplorer`/`PlanCalculator`. **Es trabajo nuevo, no un rediseño** | Alta |
| Sin breadcrumbs | No existen en el código | Media |

### 3.3 Accesibilidad: el menú móvil no atrapa el foco

`Layout.jsx` hace bien tres cosas: bloquea el scroll del body, enfoca el primer enlace al abrir y cierra con `Escape` devolviendo el foco al botón.

**Pero falta lo esencial:** no hay trampa de foco. Con el menú abierto puedes tabular hacia el contenido de detrás, que está visualmente oculto. Además se comporta como modal (bloquea el body) pero se declara como `<nav>` sin `role="dialog"` ni `aria-modal="true"`.

Y `document.body.style.overflow = 'hidden'` sin compensar el ancho de la barra de scroll provoca un salto de layout medible en CLS al abrir el menú en escritorio.

**Criterio de aceptación:** con el menú abierto, `Tab` recorre solo los elementos del menú y vuelve al primero. `axe` no reporta violaciones de `aria-dialog-name` ni de orden de foco.

### 3.4 Rendimiento: seis librerías de animación conviviendo

```
framer-motion ^11.18.2   gsap 3.15.0            lenis ^1.3.25
react-parallax-tilt      swiper 14.0.6          react-fast-marquee 1.6.5
```

Framer Motion y GSAP hacen lo mismo. Súmale el stack 3D completo: `three` ^0.172.0 + `@react-three/fiber` + `drei` + `postprocessing`.

**Peso de CSS medido:** unos 40 archivos. `styles.css` 107 KB · `styles/app.css` 88,8 KB · `styles/home.css` 81,8 KB · `styles/resources.css` 53,9 KB · `styles/community.css` 50,5 KB · `overrides.css` 25,4 KB. **Más de 600 KB de CSS sin minificar.**

**Y la señal de deuda más clara del repositorio:**
```
plan-final-refinements.css     0,5 KB
plan-hero-refinements.css      0,6 KB
plan-summary-refinements.css   0,7 KB
plan-value-refinements.css     0,8 KB
elite-refinements.css          7,0 KB
overrides.css                 25,4 KB
v2-editorial.css / v2-hero-depth.css / v2-image-grade.css /
v2-pricing.css / v2-scroll-motion.css / v2-surface.css / v2-typography.css   ≈ 62 KB
```

Cuatro archivos de "refinements" de menos de 1 KB cada uno, un `overrides.css` de 25 KB, y ocho archivos `v2-*` que indican **un rediseño v2 a medio terminar coexistiendo con el v1**. Cada uno es un parche sobre un parche. Es exactamente la causa de los problemas de espaciado, tipografía y alineación que describes.

### 3.5 Violación de su propia fuente única de verdad

`site.config.js` declara: *"Ningún otro archivo debe hardcodear el dominio, el número de WhatsApp ni el nombre de marca"* y expone `whatsAppLink()`.

`Layout.jsx`, en el mismo repositorio:
```js
<a className="whatsapp-button" href={`https://wa.me/34614988006?text=${message}`}>
```

Número hardcodeado, ignorando el helper. Y hay dos tests fallando por el texto del mensaje de WhatsApp (`expected 'Hola BAYO…'`), lo que confirma que el mensaje también divergió.

### 3.6 Catorce componentes globales compitiendo

`App.jsx` monta simultáneamente: `RouteSeo`, `RouteEffects`, `ScrollProgress`, `CustomCursor`, `Navbar`, `PageTransition`, `ShareInvite`, `NextChapter`, `PremiumRouteChrome`, `WhatsAppButton`, `Footer`, `TranslateOffer`, `JourneyRibbon`, `ConsentBanner`.

En una pantalla de 360 px compiten por atención el botón flotante de WhatsApp, el `JourneyRibbon`, el `ConsentBanner` y el `TranslateOffer`. Eso es carga cognitiva pura, justo lo contrario de tu objetivo.

Además hay **`CustomCursor` duplicado**: `components/CustomCursor.jsx` y `engine/effects/CustomCursor.jsx`. Un cursor personalizado no aporta nada en táctil.

### 3.7 Contenido provisional publicado

La salida real del test de `PaseBayona` muestra el texto que se renderiza:

> …OBJETIVO **POR DEFINIR** EXPERIENCIA **POR DEFINIR** RITMO SEMANAL **POR DEFINIR** RUTA SUGERIDA **EN CONSTRUCCIÓN**…

Hay marcadores de posición en un componente de cara al usuario. Y todo en mayúsculas sostenidas.

### 3.8 Lo que ya está bien y no voy a tocar

Para que conste, porque el trabajo previo tiene aciertos claros:

- **El 404 real ya está resuelto.** El comentario documenta que antes `path="*"` devolvía `<Home />`, generando un soft 404. Corregido.
- **Code splitting correcto y bien razonado.** `Home` estático a propósito por el LCP, las 13 rutas restantes con `lazy`. El comentario explica que antes eran 16 imports estáticos.
- **`SceneMount` se importa directo en lugar de por el barrel** para no romper el code splitting de React Three Fiber. Es un detalle que casi nadie cuida.
- **`skip-link` presente**, `RouteFallback` con `role="status"` y `aria-live="polite"`.
- **`ConsentBanner` y `lib/analytics/consent.js`**: hay gestión de consentimiento real.
- **`eslint-plugin-jsx-a11y` instalado** y tests de propiedades con `fast-check`.

---

## 4. PLAN CORREGIDO

Tu proceso propone auditar y rediseñar. Añado una fase 0 obligatoria y necesito dos decisiones tuyas.

| Fase | Qué | Por qué en este orden | Estado |
|---|---|---|---|
| **0** | **Estabilizar la línea base.** Categoría A completa (54 fallos, ~1,5 h). Sin tocar una línea de producto | Sin esto, ningún cambio posterior es verificable | ⬜ Listo para ejecutar |
| **0.5** | **Resolver B1-B6 con datos reales tuyos** | Prohibido inventar precios y catálogo | 🔴 **Bloqueado: necesito datos** |
| 1 | Arquitectura: orden de navegación, ruta de Membresías, breadcrumpen, actualizar `baselineContract` a las rutas decididas | Con base verde y datos correctos | ⬜ |
| 2 | Sistema de diseño: consolidar los 40 CSS, absorber `v2-*` y `*-refinements`, matar `overrides.css` | El sistema visual no se puede definir sobre 600 KB de parches | ⬜ |
| 3 | Copy nuevo por página, y los tests de Categoría C reescritos como contrato del copy | Los tests C hay que rehacerlos igual | ⬜ |
| 4 | Inicio y componentes globales. Reducir los 14 globales | | ⬜ |
| 5 | Resto de secciones | | ⬜ |
| 6 | Formulario adaptativo de 5-7 pasos y "Describe tu situación en 1 minuto" | Depende del motor de recomendación de B1 | ⬜ |
| 7 | Accesibilidad, SEO, rendimiento, seguridad | | ⬜ |
| 8 | Pruebas y revisión visual final con Playwright | | ⬜ |

## 5. LO QUE NECESITO DE TI PARA SEGUIR

**Dos bloqueantes reales:**

1. **El dominio.** ¿`sebasbayona.co` o `bayona.co`? Todo el copy y el SEO dependen de esto.
2. **Los datos comerciales.** Para B3, el precio correcto: ¿1.149.000 o 1.539.000? Para B4, si `optimizacion-biohacking` debe existir o eliminarse de las referencias. Para B5, si el catálogo son 3 o 4 elementos. Para B2, si el plan canónico se llama `rendimiento` o `performance`.

Mientras respondes, **puedo ejecutar la Fase 0 ya**: es puramente de infraestructura de test, no toca producto, no toca copy, no toca precios, y es la que desbloquea poder verificar todo lo demás.

---

*Auditoría realizada sobre código ejecutado, no sobre inspección visual. Los 84 fallos y sus mensajes provienen de `npm test` en el commit `8f14698`.*
