# FASE 4 — ARQUITECTURA DE EXPERIENCIA

**BAYONA · Information Architecture + UX Architecture + Navigation + Content Journey + Conversion Journey**
Fecha: 2026-08-27 · Repo: `github.com/sebascontigo/bayona` · Producción: `bayona-jet.vercel.app`
Estado: **IMPLEMENTADO Y TESTEADO** — pendiente de auditoría externa (ChatGPT) antes de Fase 5.

---

## 0. Alcance y reglas respetadas

**Hecho en esta fase (solo Fase 4):**
- Investigación sobre el código real (no sobre supuestos), auditoría de enlaces/CTAs,
  contraste con los veredictos de Fases 1–3, decisiones de arquitectura, implementación
  estructural, tests nuevos y documentación.

**No tocado (por mandato del prompt y por contrato):**
- Fases 5–8 sin empezar. Sin rediseño visual global, sin 3D nuevo, sin cambios en el
  motor de motion (Framer Motion / Lenis / tokens existentes), sin dependencias nuevas
  (`package.json` intacto).
- Contratos intactos: catálogo y precios (offerings.js), WhatsApp 34614988006 como SSoT,
  embudo checkout→WhatsApp sin procesamiento de pago, PDFs en `public/docs`, SEO
  (routeMeta/sitemap/noindex), analytics, consent, accesibilidad baseline, contrato de
  rutas (17 públicas + alias + 404 + interna).
- DP-5 ("acceso de por vida" de ELITE) sigue siendo decisión comercial/legal pendiente:
  **no se reinterpretó ni se tocó** en ningún copy ni en ningún test.

**Clasificación de resultados usada en todo el documento:**
DECIDIDO (elección de arquitectura) · DOCUMENTADO (escrito en repo) ·
IMPLEMENTADO (código en el árbol) · TESTEADO (cubierto por un test que pasa).

---

## 1. Método

1. **Baseline gate:** 273/273 tests (57 ficheros) verificados en verde ANTES de tocar
   nada; lint 0 errores / 17 warnings; build OK. (CONFIRMADO por ejecución.)
2. **Inspección directa** de rutas, Layout/Navbar, configs (offerings, routeMap,
   chapters, routeMeta), recomendadores, checkout, onboarding y componentes de
   navegación y cierre.
3. **Auditoría de enlaces/CTAs** (agente explorador dedicado): inventario por página,
   rutas huérfanas, sistemas duplicados, código muerto.
4. **Contraste** con FASE2-CIERRE.md (DP-1…DP-5), FASE3-VEREDICTO.md (recomendaciones
   del auditor externo), ROUTES.md (huecos declarados), DESIGN-AUDIT.md (deuda Navbar →
   Fase 4), SEO/ACCESSIBILITY/PERFORMANCE baselines.
5. **Decisiones D1–D14** (sección 3) con categoría y prioridad.
6. **Implementación** (sección 4) y **tests** (sección 6).
7. **Gate final** (sección 7) con números exactos.

---

## 2. Arquitectura de información resultante (D1)

### 2.1 Árbol de navegación

```
BAYONA (/)
├── ENTRENAR — la oferta de entrenamiento
│   ├── /programs            Programas + comparador + calculadora
│   │   └── /plan/{raiz,fuerza,rendimiento,elite}   Fichas de plan (4)
│   └── /parkour-academy     Academia Parkour
├── EXPERIENCIAS — lo que se vive sin membresía
│   ├── /shop                Tienda (carrito → WhatsApp)
│   ├── /app                 BAYONA+ (early access)
│   └── /community           Comunidad (acceso por WhatsApp)
├── CONOCER — la marca
│   └── /about               Nosotros
├── APRENDER — lo gratuito
│   ├── /resources           Recursos gratis (Reto 30, Protocolo 7)
│   └── /faq                 Preguntas frecuentes
├── ENTRAR — recepción
│   └── /onboarding (alias /entrar)   Embudo de orientación (6 pasos)
└── EMBUDO (sin nav, noindex)
    ├── /checkout            CONFIGURADOR BAYONA
    └── /order-confirmation  Solicitud recibida
(+) /design-system interna (noindex) · * → 404 real con recuperación
```

### 2.2 Principios de IA aplicados

- **Agrupación por intención del visitante**, no por tipo de contenido: ENTRENAR
  (quiero entrenar), EXPERIENCIAS (quiero vivir la marca sin membresía), CONOCER
  (quiero saber quién es BAYONA), APRENDER (quiero algo gratis y útil).
- **Una sola entrada de orientación**: recepción (`/onboarding`) es la única puerta de
  "no sé por dónde empezar". No compite con la compra: la compra vive en ENTRENAR.
- **El embudo no navega, convierte**: `/checkout` y `/order-confirmation` no aparecen
  en navbar ni footer; se alcanza por contexto (fichas de plan, programas, handoff).
- **Inicio no se repite** como enlace de escritorio: la marca (B. BAYONA) ya es el
  enlace al inicio. En móvil sí aparece explícito y numerado.
- **Las tres puertas de la home quedan validadas** (D11): EXPLORAR → `/programs` ·
  ENCONTRAR MI CAMINO → `/onboarding` · YA SÉ QUÉ QUIERO → plan directo
  (GoldButton VER PLANES + ancla `#home-offer-heading` + ReceptionCta). Sin cambios.

---

## 3. Decisiones de arquitectura (D1–D14)

| # | Decisión | Categoría | Prioridad | Estado |
|---|---|---|---|---|
| D1 | Árbol de IA con grupos ENTRENAR / EXPERIENCIAS / CONOCER / APRENDER / ENTRAR | RESTRUCTURE | P0 | DECIDIDO+DOCUMENTADO+IMPLEMENTADO+TESTEADO |
| D2 | Navbar agrupada + CTA "Entrar" → `/onboarding` (antes → `/programs`) | RESTRUCTURE | P0 | DECIDIDO+IMPLEMENTADO+TESTEADO |
| D3 | Breadcrumb visible nuevo (sistema de POSICIÓN), derivado de routeMeta | NEW | P0 | DECIDIDO+IMPLEMENTADO+TESTEADO |
| D4 | Cierre de página MERGE: se retira ROUTE_CONTINUATIONS; NextChapter es el único "qué viene después" | MERGE | P1 | DECIDIDO+IMPLEMENTADO+TESTEADO (vía suite completa) |
| D5 | RecommendationGuide MERGE: la orientación vive en el embudo de recepción; componente y motor se conservan sin montar como activo verificado | MERGE | P1 | DECIDIDO+DOCUMENTADO (DP-4 cerrado) |
| D6 | Checkout EVOLVE → CONFIGURADOR BAYONA: orden PLAN→CLASES→EXTRAS→DATOS, precarga `?plan=`, naming nuevo | EVOLVE TO CONFIGURATOR | P0 | DECIDIDO+IMPLEMENTADO+TESTEADO |
| D7 | `/order-confirmation` deja de ser huérfana: entrada desde el handoff de éxito del checkout | WIRE | P1 | DECIDIDO+IMPLEMENTADO+TESTEADO |
| D8 | PDFs = REFERENCIA: `presentationUrl` se enlaza en la ficha de plan; la regeneración de contenido queda para Fase 14 | REFERENCE | P1 | DECIDIDO+IMPLEMENTADO+TESTEADO (DP-1 y DP-2 cerrados) |
| D9 | Paso final de recepción: CTA primario → ficha del plan recomendado (`route.planHref`); comparar planes pasa a opción explícita | EVOLVE | P0 | DECIDIDO+IMPLEMENTADO+TESTEADO |
| D10 | Footer reforzado: repite los 4 grupos + bloque ENTRAR (recepción + WhatsApp) | RESTRUCTURE | P1 | DECIDIDO+IMPLEMENTADO+TESTEADO |
| D11 | Tres puertas de la home validadas sin cambios | KEEP | P2 | DECIDIDO+DOCUMENTADO |
| D12 | Doctrina de los cuatro sistemas de navegación, documentada y aplicada | DOCUMENT | P0 | DECIDIDO+DOCUMENTADO+IMPLEMENTADO |
| D13 | Código muerto (UmbralJourney, ThresholdDoors, WelcomeVideo, RecommendationGuide montable) documentado, NO borrado | KEEP | P3 | DECIDIDO+DOCUMENTADO |
| D14 | Colisión de componentes en 360px documentada, sin cambio de código | DEFER (Fase 10) | P3 | DECIDIDO+DOCUMENTADO |

### 3.1 Resolución de los puntos pendientes DP-1…DP-5 (de FASE2-CIERRE)

- **DP-1 (PDFs sin CTA):** CERRADO como REFERENCE. Los PDFs siguen siendo material de
  referencia (no se regeneran en Fase 4 — eso es contenido, Fase 14), pero ya no son
  activos muertos: la ficha de plan los enlaza ("DESCARGAR PRESENTACIÓN (PDF)").
- **DP-2 (presentationUrl muerto):** CERRADO. `plan.presentationUrl` se renderiza en
  `PlanPresentation.jsx` y un test de commercialSync vigila que siga cableado.
- **DP-3 (/checkout huérfano):** CERRADO. Entradas reales desde `PlanPresentation.jsx`
  (`/checkout?plan=<id>`, hero y CTA final) y desde `Programs.jsx` (bajo la
  calculadora). El checkout acepta `?plan=` con validación fail-closed contra el
  catálogo canónico.
- **DP-4 (RecommendationGuide sin montar):** CERRADO como MERGE (D5). La orientación
  personalizada ya vive en el embudo de recepción (routeMap, 36 combinaciones,
  testeado). El componente y su motor (13 reglas, 34 tests) se conservan sin montar:
  borrarlos destruiría un activo verificado; montarlos duplicaría la orientación.
  Precedente del repo: 5 dependencias muertas diferidas en BASELINE.md.
- **DP-5 (ELITE "acceso de por vida"):** SIGUE PENDIENTE. Decisión comercial/legal;
  Fase 4 no la toca ni la reinterpreta.

---

## 4. Implementación (por fichero)

### 4.1 Navegación

- **`src/components/Layout.jsx`** (IMPLEMENTADO):
  - `links` planos (10 destinos + slice frágil) sustituidos por `NAV_GROUPS`
    (4 grupos declarativos) y `MOBILE_NAV_ITEMS` (lista plana numerada para móvil:
    inicio + 8 destinos + entrada).
  - Navbar de escritorio: grupos con etiqueta visible (`nav-group-label`) y
    `role="group"` + `aria-label` por grupo.
  - CTA de barra: `Entrar` → `/onboarding` con `aria-label` descriptivo. Antes llevaba
    a `/programs` (compra): ahora orienta primero; la compra directa ya vive en
    Programas y en las fichas.
  - Menú móvil: destinos numerados (01…10), etiquetas de grupo, entrada destacada
    "ENTRAR A BAYONA" y carrito como ítem 11. Lógica de foco/Escape/overflow intacta.
  - Footer: columna de enlaces sustituida por `.footer-columns` (4 columnas de grupo
    con `nav` + `aria-label` propios) y bloque `.footer-entry` con ENTRAR A BAYONA
    (`/onboarding`) y HABLAR POR WHATSAPP (`whatsAppLink(...)`, SSoT intacto).
  - Sin cambios: WhatsAppButton, SectionLabel, GoldButton, PageHero, carrito.
- **`src/styles/nav-architecture.css`** (NUEVO): estilos de grupos de barra, etiquetas
  de grupo móvil, entrada móvil destacada y footer por columnas. Importado en
  `main.jsx` DESPUÉS de `overrides.css` para ganar la cascada (los CSS de componente
  se importan antes que las hojas globales).
- **`src/components/navigation/Breadcrumb.jsx`** + **`src/styles/breadcrumb.css`**
  (NUEVOS, D3): miga de pan visible derivada del MISMO dato que el JSON-LD
  (`routeMeta.breadcrumb`), montada una sola vez en `App.jsx` dentro de `<main>`.
  Decisión de visibilidad por ruta: no pinta en home (trail vacío = ya estás en la
  raíz), ni en recepción (`/onboarding`, `/entrar`: inmersiva), ni en `/design-system`
  (interna), ni en 404 (tiene su propia recuperación). Sí pinta en el embudo
  (`/checkout`, `/order-confirmation`): incluso dentro del embudo la persona necesita
  saber dónde está y cómo volver.
- **`src/App.jsx`**: montaje de `<Breadcrumb />` antes del `<Suspense>` de rutas.
- **`src/main.jsx`**: imports de las dos hojas nuevas en la posición correcta de la
  cascada (tras `overrides.css`, antes de las capas de acabado v2/v3).

### 4.2 Cierre de página (D4)

- **`src/components/PremiumRouteChrome.jsx`**: retirados `ROUTE_CONTINUATIONS`
  (8 rutas, datos incompletos —faltaba `/shop`— y numeración incoherente con el
  itinerario de chapters.js), el componente `RouteContinuation` y su render.
  Conservados: `ROUTE_CONFIG` (efectos DOM reveal/spotlight/tilt con respeto a
  `prefers-reduced-motion`) y `BrandMarquee`. **NextChapter (chapters.js, itinerario
  circular de 9 rutas) queda como único sistema de "qué viene después".**

### 4.3 Embudo de conversión (D6, D7, D8, D9)

- **`src/pages/Checkout.jsx`** → CONFIGURADOR BAYONA:
  - Orden de fieldsets invertido para seguir la decisión real:
    **1. Plan base → 2. Clases por cantidad → 3. Extras → 4. Datos de contacto**
    (antes los datos iban primero).
  - Precarga `?plan=<id>` vía `useSearchParams`, validada contra `membershipPlans`
    (fail-closed: id desconocido → primer plan canónico, como antes).
  - Naming: "CONFIGURADOR BAYONA / SIN PAGO" + H1 "CONFIGURA TU EXPERIENCIA.".
    El subtítulo conserva la frase contractual "Aquí no se procesa ningún pago."
  - Handoff de éxito: nuevo enlace a `/order-confirmation` ("Ver qué ocurre después
    de tu solicitud") — la ruta deja de ser huérfana.
  - Intacto: cálculo en vivo (`calculateExperience`), mensaje de WhatsApp, puente de
    lead pendiente (TTL 7 días), analytics, microcopy de no-transacción.
- **`src/pages/PlanPresentation.jsx`**:
  - Hero: bloque secundario nuevo con "CONFIGURAR EN EL CONFIGURADOR BAYONA"
    (`/checkout?plan=<id>`) y "DESCARGAR PRESENTACIÓN (PDF)" (`plan.presentationUrl`).
  - CTA final: enlace alternativo "O CONFIGÚRALO PASO A PASO EN EL CONFIGURADOR
    BAYONA". El CTA principal (WhatsApp directo) no se desplaza.
- **`src/pages/Programs.jsx`**: bajo `PlanCalculator`, `GoldButton` "ABRIR EL
  CONFIGURADOR BAYONA COMPLETO" (`/checkout`) + nota "Sin pago: configuras tu
  solicitud y la envías por WhatsApp."
- **`src/pages/Onboarding.jsx`** (paso 5): el CTA primario "EMPIEZA TU CAMINO" lleva a
  `route.planHref` (la ficha del plan recomendado por la matriz de 36 combinaciones;
  fail-closed → `/programs` si no hay ruta). "COMPARAR TODOS LOS PLANES" (`/programs`)
  se añade como opción explícita junto a WhatsApp y recursos.
- **CSS**: bloques nuevos en `plan-presentation.css` (enlaces secundarios) y
  `programs.css` (botón de apertura del configurador), siguiendo el lenguaje existente
  (DM Mono, naranja BAYONA, objetivos táctiles ≥32px).

---

## 5. Arquitectura UX: los cuatro sistemas de navegación (D12)

Doctrina formalizada en esta fase (comentarios de código + docs): **cuatro sistemas
separados, cada uno responde una pregunta distinta y ninguno sustituye a otro.**

| Sistema | Pregunta | Fuente de datos | Visibilidad |
|---|---|---|---|
| **Navbar** | ¿Dónde puedo ir? | `NAV_GROUPS` (Layout.jsx) | Siempre |
| **Breadcrumb** (NUEVO) | ¿Dónde estoy? | `routeMeta.breadcrumb` (el mismo del JSON-LD) | Rutas de contenido y embudo; no en home/recepción/internas/404 |
| **JourneyRibbon** | ¿Cómo va MI recorrido? | Memoria de recepción (VisitorJourneyProvider, solo memoria — promesa de privacidad) | Solo tras pasar por recepción |
| **NextChapter** | ¿Qué viene después? | `chapters.js` (itinerario circular de 9 rutas) | Cierre de página, único tras retirar ROUTE_CONTINUATIONS |

Regla anti-duplicación aplicada: cuando dos sistemas respondían la misma pregunta
(ROUTE_CONTINUATIONS vs NextChapter), se retira el incompleto y se fortalece el
canónico. Cuando un componente respondía una pregunta que ya responde el embudo
(RecommendationGuide vs recepción), se conserva como activo sin montar y se documenta.

---

## 6. Tests (17 nuevos, 0 saltados)

| Fichero | Tests nuevos | Qué vigila |
|---|---|---|
| `src/components/navigation/Breadcrumb.test.jsx` (NUEVO) | 6 | Trail en contenido y embudo, `aria-current` en el último paso, trails multinivel en `/plan/*`, invisibilidad en home/recepción/alias/interna/404 |
| `src/components/Layout.nav.test.jsx` (NUEVO) | 6 | 4 grupos por intención en barra y pie, CTA de barra → `/onboarding`, menú móvil numerado con entrada, todo destino de nav/footer existe en routeMeta, bloque de entrada del pie con WhatsApp oficial |
| `src/pages/Checkout.test.jsx` (ampliado +3, envoltorio Router) | 3 | Precarga `?plan=` canónica, fail-closed con `?plan=` desconocido, enlace a `/order-confirmation` en el handoff de éxito |
| `src/pages/Onboarding.test.jsx` (ampliado +1) | 1 | Paso final: CTA primario → `/plan/elite` para la combinación comparar-planes/constante/3-días de la matriz; alternativas → `/programs` y `/resources` |
| `src/test/commercialSync.test.jsx` (ampliado +1) | 1 | DP-2/DP-3 cerrados: la ficha enlaza `presentationUrl` y `/checkout?plan=`; Programs enlaza `/checkout`; el checkout valida `?plan=` y enlaza `/order-confirmation` |
| `src/pages/criticalFlow.test.jsx` (actualizado) | 0 nuevos | Envoltorio `MemoryRouter` para Checkout (requerido por `useSearchParams`); aserciones idénticas |

Prohibición respetada: ningún `test.skip/it.skip/describe.skip/xit/xdescribe` en el
repo (verificable por grep).

---

## 7. Gate final (números exactos, CONFIRMADO por ejecución)

| Gate | Baseline (antes de Fase 4) | Tras Fase 4 |
|---|---|---|
| Vitest | 273/273 (57 ficheros) | **290/290 (59 ficheros)** · 0 fallos · 0 saltados |
| Lint | 0 errores / 17 warnings | **0 errores / 17 warnings** (los mismos, preexistentes) |
| Build | OK | **OK** (11.9 s; aviso de chunk >700 kB preexistente, documentado en PERFORMANCE-BASELINE) |
| Playwright (`test:visual`) | 41/41 | **41/41 passed (3.4 min)** |

---

## 8. Journeys y matriz

- **ROUTE-JOURNEYS.md** — 10 journeys de visitante (contenido + conversión), con ruta
  paso a paso, sistemas de navegación que intervienen y estado.
- **PAGE-EXPERIENCE-MATRIX.md** — matriz de 17 rutas × 16 columnas: rol en la IA,
  pregunta que responde la página, entradas/salidas, los cuatro sistemas, SEO, tests y
  cambios de Fase 4.

---

## 9. Lo que NO se hizo (y por qué)

1. **Fases 5–8**: fuera de alcance por mandato. STOP al terminar Fase 4.
2. **DP-5 (ELITE acceso de por vida)**: pendiente de decisión comercial/legal; no se
   tocó ningún copy relacionado.
3. **Regeneración de PDFs**: es contenido (Fase 14), no arquitectura. Fase 4 solo los
   cablea como referencia (D8).
4. **Borrado de código muerto** (D13): documentado, no borrado. Precedente del repo
   (BASELINE.md difiere 5 dependencias muertas) y coste de borrar un activo testeado
   (RecommendationGuide: 34 tests de su motor).
5. **Colisión 360px** (D14): documentada para Fase 10 (accesibilidad/visual); sin
   cambio de código en Fase 4.
6. **Focus trap del menú móvil**: sigue diferido a Fases 10/11 como estaba declarado
   en ACCESSIBILITY-BASELINE; Fase 4 no lo altera (la lógica de foco/Escape existente
   se conserva intacta).
7. **Sin dependencias nuevas, sin 3D nuevo, sin motion nuevo**: verificado contra
   `package.json` y contra el alcance de los diffs.

---

## 10. Handoff para la auditoría externa (ChatGPT)

Puntos de verificación sugeridos contra GitHub:
1. `src/components/Layout.jsx` — NAV_GROUPS, CTA → `/onboarding`, footer por columnas.
2. `src/components/navigation/Breadcrumb.jsx` + montaje en `App.jsx`.
3. `src/components/PremiumRouteChrome.jsx` — ROUTE_CONTINUATIONS retirado; NextChapter
   único cierre (contrastar con `src/config/chapters.js`).
4. `src/pages/Checkout.jsx` — orden PLAN→CLASES→EXTRAS→DATOS, `?plan=` fail-closed,
   enlace `/order-confirmation`.
5. `src/pages/PlanPresentation.jsx` — enlaces a configurador y PDF.
6. `src/pages/Programs.jsx` — entrada al configurador bajo la calculadora.
7. `src/pages/Onboarding.jsx` — paso 5 hacia `route.planHref`.
8. Tests: `Breadcrumb.test.jsx`, `Layout.nav.test.jsx`, ampliaciones de
   `Checkout.test.jsx`, `Onboarding.test.jsx`, `commercialSync.test.jsx`.
9. Docs: este fichero, ROUTE-JOURNEYS.md, PAGE-EXPERIENCE-MATRIX.md, ROUTES.md y
   TEST-MATRIX.md actualizados.
10. Gate: 290/290 vitest · 0 errores lint · build OK · 41/41 Playwright.
