# PAGE-EXPERIENCE-MATRIX — Matriz de experiencia por ruta (Fase 4)

17 rutas públicas × 16 columnas. Columnas: **(1)** # · **(2)** Ruta · **(3)** Grupo IA ·
**(4)** Rol en la arquitectura · **(5)** Pregunta que responde la página ·
**(6)** Entrada principal · **(7)** CTA primario · **(8)** Salidas secundarias (nuevas en
Fase 4 marcadas con ★) · **(9)** Breadcrumb (posición) · **(10)** NextChapter
(continuidad) · **(11)** JourneyRibbon (memoria) · **(12)** Estado en el embudo ·
**(13)** SEO · **(14)** Tests · **(15)** Cambios Fase 4 · **(16)** Prioridad de fase.

| # | Ruta | Grupo | Rol | Pregunta que responde | Entrada principal | CTA primario | Salidas secundarias | Breadcrumb | NextChapter | Ribbon | Embudo | SEO | Tests | Cambios Fase 4 | Prioridad |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `/` | — | Raíz/orientación | ¿Qué es BAYONA y por dónde empiezo? | Orgánico/directo | Tres puertas: EXPLORAR / ENCONTRAR MI CAMINO / VER PLANES | Recepción, recursos | No pinta (trail vacío) | Sí | Sí (si hay memoria) | Pre-embudo | index | Home.test (12), Home.contract (6), e2e ×4 | Ninguno (puertas validadas D11) | — |
| 2 | `/about` | CONOCER | Marca | ¿Quién hay detrás? | Navbar CONOCER, NextChapter | WhatsApp "conocer mi camino" | NextChapter | Inicio / Nosotros | Sí | Sí | Pre-embudo | index | About.test (3) | Breadcrumb nuevo | P2 |
| 3 | `/programs` | ENTRENAR | Catálogo/comparador | ¿Qué puedo entrenar y cuánto cuesta? | Navbar ENTRENAR, puerta EXPLORAR, recepción | Comparador → ficha de plan; WhatsApp general | ★ GoldButton → `/checkout` bajo calculadora | Inicio / Programas | Sí | Sí | Entrada de embudo | index | Programs.test (3), commercialSync | ★ Entrada al CONFIGURADOR (D6) | P0 |
| 4 | `/parkour-academy` | ENTRENAR | Academia | ¿Cómo aprendo parkour? | Navbar ENTRENAR | Registro de interés (WhatsApp) | NextChapter | Inicio / Academia Parkour | Sí | Sí | Pre-embudo | index | ParkourAcademy.test (3) | Breadcrumb nuevo; cierre unificado (D4) | P2 |
| 5 | `/plan/raiz` | ENTRENAR | Ficha de plan | ¿Qué incluye RAÍZ y qué me cuesta? | Programs, recepción (D9), puentes | QUIERO EMPEZAR (WhatsApp) | ★ Configurador `/checkout?plan=RAIZ` · ★ PDF presentación · puentes a planes vecinos | Inicio / Programas / Plan RAÍZ | Sí | Sí | Decisión | index, og:product | offerings, Checkout, criticalFlow, commercialSync | ★ Entradas configurador+PDF (D6/D8) | P0 |
| 6 | `/plan/fuerza` | ENTRENAR | Ficha de plan (destacado) | ¿Qué incluye FUERZA? | Programs, recepción, puentes | QUIERO EMPEZAR (WhatsApp) | ★ Configurador `/checkout?plan=FUERZA` · ★ PDF | Inicio / Programas / Plan FUERZA | Sí | Sí | Decisión | index, og:product | idem | ★ Ídem | P0 |
| 7 | `/plan/rendimiento` | ENTRENAR | Ficha de plan | ¿Qué incluye RENDIMIENTO? | Programs, recepción, puentes | QUIERO EMPEZAR (WhatsApp) | ★ Configurador `/checkout?plan=RENDIMIENTO` · ★ PDF | Inicio / Programas / Plan RENDIMIENTO | Sí | Sí | Decisión | index, og:product | idem | ★ Ídem | P0 |
| 8 | `/plan/elite` | ENTRENAR | Ficha de plan (tope) | ¿Qué incluye ELITE? | Programs, recepción, puentes | QUIERO EMPEZAR (WhatsApp) | ★ Configurador `/checkout?plan=ELITE` · ★ PDF | Inicio / Programas / Plan ELITE | Sí | Sí | Decisión | index, og:product | idem | ★ Ídem (DP-5 intacto, sin tocar) | P0 |
| 9 | `/shop` | EXPERIENCIAS | Tienda | ¿Qué puedo comprar sin membresía? | Navbar EXPERIENCIAS | Carrito → pedido WhatsApp | NextChapter | Inicio / Tienda | Sí (itinerario canónico) | Sí | Conversión paralela | index | Shop.test (4), shopCatalog (3), shopProducts (2), styles/shop (2) | Breadcrumb nuevo; cierre unificado (D4) | P1 |
| 10 | `/app` | EXPERIENCIAS | Producto digital | ¿Qué es BAYONA+? | Navbar EXPERIENCIAS | Early access (WhatsApp) | NextChapter | Inicio / BAYONA+ | Sí | Sí | Pre-embudo | index | AppExperience.test (6) | Breadcrumb nuevo | P2 |
| 11 | `/community` | EXPERIENCIAS | Comunidad | ¿Dónde entrena la gente? | Navbar EXPERIENCIAS, puentes de fichas | Solicitar acceso (WhatsApp, gratis) | NextChapter | Inicio / Comunidad | Sí | Sí | Pre-embudo | index | baseline/e2e (sin test dedicado, hueco declarado) | Breadcrumb nuevo | P2 |
| 12 | `/resources` | APRENDER | Gratuito | ¿Qué puedo probar gratis? | Navbar APRENDER, home, recepción | Recurso → WhatsApp con contexto | NextChapter | Inicio / Recursos | Sí | Sí | Pre-embudo | index | Resources.test (5) | Breadcrumb nuevo | P1 |
| 13 | `/faq` | APRENDER | Objeciones | ¿Qué dudas me quedan? | Navbar APRENDER, CTA secundario de Programs | Videollamada / pregunta (WhatsApp) | NextChapter → recepción | Inicio / Preguntas frecuentes | Sí | Sí | Pre-decisión | index | FAQ.test (4) | Breadcrumb nuevo | P1 |
| 14 | `/checkout` | EMBUDO | CONFIGURADOR BAYONA | ¿Cómo queda mi solicitud y cuánto sería? | ★ Fichas de plan (`?plan=`) · ★ Programs | SOLICITAR DETALLES POR WHATSAPP | ★ Handoff → `/order-confirmation` | Inicio / Configurar | No (fuera de itinerario) | Sí | Conversión | **noindex** | Checkout.test (6), criticalFlow (3), commercialSync | ★ Reordenado PLAN→CLASES→EXTRAS→DATOS, `?plan=` fail-closed, naming, salida a confirmación (D6/D7) | P0 |
| 15 | `/order-confirmation` | EMBUDO | Post-solicitud | ¿Qué ocurre ahora? | ★ Handoff del checkout | Revisar en WhatsApp | Recursos/programas | Inicio / Solicitud recibida | No | Sí | Post-conversión | **noindex** | criticalFlow (3) | ★ Deja de ser huérfana (D7) | P1 |
| 16 | `/onboarding` (+alias `/entrar`) | ENTRAR | Recepción | ¿Cuál es mi camino? | CTA "Entrar" de barra (★ D2), puerta home, NextChapter de FAQ | Paso final → ★ ficha del plan recomendado (`route.planHref`, D9) | ★ Comparar planes · WhatsApp · recursos | No pinta (inmersivo) | No (es el inicio del itinerario) | Origen de la memoria | Orientación | index (canónica; alias canonical) | Onboarding.test (5), e2e | ★ CTA final hacia el plan recomendado (D9) | P0 |
| 17 | `*` (404) | — | Recuperación | Me he perdido, ¿dónde voy? | URL rota | 4 tarjetas de recuperación | — | No pinta (recuperación propia) | No | No | — | **noindex**, 404 real | baselineContract | Ninguno (se mantiene) | — |

**Interna (fuera de matriz pública):** `/design-system` — playground noindex, sin
breadcrumb, sin cambios en Fase 4.

## Lectura de la matriz

- **Posición (col. 9):** el breadcrumb pinta en 13 rutas públicas + embudo; no pinta
  en home, recepción (y alias), 404 e interna — decisión documentada en
  `Breadcrumb.jsx` y testeada en `Breadcrumb.test.jsx`.
- **Continuidad (col. 10):** NextChapter es el único cierre de página desde Fase 4
  (ROUTE_CONTINUATIONS retirado, D4). El embudo queda fuera del itinerario a
  propósito: su continuidad es el propio embudo.
- **Embudo (cols. 12/15):** las tres nuevas entradas al configurador (fichas ×4 y
  Programs) y la salida hacia confirmación cierran el circuito que FASE2 detectó
  huérfano (DP-2/DP-3).
