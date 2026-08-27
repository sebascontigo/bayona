# ROUTE-JOURNEYS — Journeys de visitante de BAYONA (Fase 4)

Cada journey describe un camino real a través del sitio: qué rutas pisa, qué sistema
de navegación lo sostiene en cada paso y dónde convierte. Los cuatro sistemas son:
**Navbar** (dónde puedo ir) · **Breadcrumb** (dónde estoy) · **JourneyRibbon**
(cómo va mi recorrido, solo con memoria de recepción) · **NextChapter** (qué viene
después). Estado: IMPLEMENTADO+TESTEADO salvo donde se indique.

---

## J1 · Curioso sin intención de compra (APRENDER gratis)

**Persona:** llega por un enlace compartido, no conoce BAYONA, no quiere pagar nada.

1. `/` — hero con tres puertas. Elige EXPLORAR o baja hasta los recursos. *Navbar + NextChapter.*
2. `/resources` — Reto 30 días / Protocolo 7 días gratis. *Breadcrumb: Inicio / Recursos.*
3. Salida por WhatsApp con contexto de recurso, o `/community` vía NextChapter.

**Conversión:** ninguna forzada; el recurso gratuito es la conversión. Sin fricción,
sin cuenta, sin datos (promesa de privacidad).

---

## J2 · Visitante que quiere comparar antes de decidir (embudo completo)

**Persona:** sabe que quiere entrenar, pero no qué plan.

1. `/` — puerta "ENCONTRAR MI CAMINO" o CTA "Entrar" de la barra. *Navbar.*
2. `/onboarding` — recepción: umbral → 3 preguntas → ruta. *Sin chrome: inmersivo, sin breadcrumb.*
3. Paso final → **ficha del plan recomendado** (`route.planHref`, D9). *Breadcrumb: Inicio / Programas / Plan X.*
4. `/plan/<id>` — compara, descarga el PDF de presentación (D8), y elige:
   WhatsApp directo (CTA principal) o "CONFIGURAR EN EL CONFIGURADOR BAYONA"
   (`/checkout?plan=<id>`, D6/D7).
5. `/checkout` — CONFIGURADOR: plan precargado → clases → extras → datos → WhatsApp.
   *Breadcrumb visible incluso en el embudo.*
6. Handoff de éxito → `/order-confirmation` (qué ocurre ahora).

**Conversión:** solicitud de WhatsApp con detalle completo + lead registrado
(analytics + puente de lead pendiente si el navegador bloquea la pestaña).

---

## J3 · Visitante que ya sabe qué quiere (compra directa)

**Persona:** viene decidido a un plan concreto.

1. `/` — puerta "YA SÉ QUÉ QUIERO" (GoldButton VER PLANES → ancla de oferta) o
   Navbar → ENTRENAR → Programas.
2. `/programs` — comparador y calculadora; bajo la calculadora, "ABRIR EL
   CONFIGURADOR BAYONA COMPLETO" (D6). O ficha de plan directa.
3. `/checkout` — configura y envía por WhatsApp.
4. `/order-confirmation` — siguientes pasos.

**Conversión:** idéntica a J2 desde el paso 3, sin pasar por recepción.

---

## J4 · Comprador de tienda (sin membresía)

**Persona:** quiere equipamiento, no entrenamiento.

1. Navbar → EXPERIENCIAS → `/shop`. *Breadcrumb: Inicio / Tienda.*
2. Añade al carrito (persistencia local `bayona:cart:v1`); el carrito es accesible
   desde barra y menú móvil.
3. Pedido por WhatsApp por producto (wa.me con contexto de producto).

**Conversión:** carrito → WhatsApp. Sin pago online (contrato del sitio).

---

## J5 · Padre/madre o atleta interesado en la Academia Parkour

1. Navbar → ENTRENAR → `/parkour-academy`. *Breadcrumb: Inicio / Academia Parkour.*
2. Niveles, logística, registro de interés por WhatsApp (sin pago).
3. NextChapter continúa el itinerario; el puente hacia `/shop` queda a cargo del
   itinerario canónico (chapters.js), ya no del sistema retirado.

**Conversión:** registro de interés por WhatsApp.

---

## J6 · Curioso del producto digital (BAYONA+)

1. Navbar → EXPERIENCIAS → `/app`. *Breadcrumb: Inicio / BAYONA+.*
2. Early access por WhatsApp; la página explica que el producto está en desarrollo
   (sin promesas de fecha).
3. NextChapter ofrece el siguiente capítulo del itinerario.

**Conversión:** lista de early access por WhatsApp.

---

## J7 · Persona que busca comunidad

1. Navbar → EXPERIENCIAS → `/community` (o puente desde fichas de plan / recepción).
   *Breadcrumb: Inicio / Comunidad.*
2. Solicitar acceso por WhatsApp (gratis).

**Conversión:** acceso a comunidad por WhatsApp.

---

## J8 · Visitante con dudas antes de pagar

1. `/faq` (Navbar → APRENDER → FAQ, o CTA secundario "REVISAR PREGUNTAS FRECUENTES"
   en Programs). *Breadcrumb: Inicio / Preguntas frecuentes.*
2. Respuestas por categoría; cierre con videollamada / pregunta rápida por WhatsApp.
3. NextChapter devuelve al inicio del itinerario (recepción).

**Conversión:** videollamada o pregunta por WhatsApp.

---

## J9 · Visitante que aterriza en una rota muerta (recuperación)

1. `*` → 404 real (noindex). Sin breadcrumb (el 404 tiene su propia recuperación).
2. Cuatro tarjetas de recuperación hacia accesos principales.

**Conversión:** recolocación en el sitio; nunca callejón sin salida.

---

## J10 · Visitante que vuelve tras pasar por recepción (memoria)

**Persona:** ya hizo el recorrido de orientación en otra sesión.

1. Cualquier ruta → **JourneyRibbon** visible (progreso personal), porque el
   VisitorJourneyProvider guarda el recorrido SOLO en memoria (sin cookies ni
   cuentas, según la promesa de privacidad de recepción).
2. El ribbon convive con Navbar (ir), Breadcrumb (estar) y NextChapter (continuar)
   sin pisarse: cada sistema responde una pregunta distinta (doctrina D12).

**Conversión:** reentrada directa al plan recomendado o al recurso pendiente.

---

## Cobertura

- 10 journeys ≥ 8 requeridos. Todos los destinos citados existen en el registro de
  rutas (lo vigila `Layout.nav.test.jsx` para nav/footer y
  `conversionRegression.test.jsx` para todo destino literal del producto).
- Los journeys J2/J3 atraviesan el embudo completo, protegido por
  `Checkout.test.jsx` (6), `criticalFlow.test.jsx` (3) y `commercialSync.test.jsx` (5).
