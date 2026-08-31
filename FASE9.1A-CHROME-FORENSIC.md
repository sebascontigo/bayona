# FASE 9.1-A — FORENSIC GLOBAL CHROME (diagnóstico puro, 0 código)

> **Fecha:** 2026-08-31 · **HEAD:** `c1878d5` (= origin/main, verificado, árbol limpio) · **Método:** inspección de código + **ejecución real** (build + preview + Playwright en 390×844 y 1440×900) · **Etiquetas:** MEDIDO (ejecutado ahora) / CONFIRMADO (leído en código) / HISTÓRICO / INFERIDO. Este documento NO implementa nada: es el insumo para que el arquitecto decida 9.1-B en adelante.

## 1. Inventario del chrome global (pesos reales)

| Elemento | Archivo | Líneas | Montado en |
|---|---|---|---|
| Navbar + MobileNav + Footer + WhatsAppButton | components/Layout.jsx | 375 | App.jsx (global) |
| PageTransition (cortina clip-path) | engine/motion/PageTransition.jsx | 100 | App.jsx (envuelve rutas) |
| CustomCursor | engine/effects/CustomCursor.jsx | 177 | App.jsx (global, desktop only) |
| ScrollProgress | components/Experience.jsx | 15 | App.jsx (global) |
| JourneyRibbon | components/onboarding/JourneyRibbon.jsx | 95 | App.jsx (global) |
| TranslateOffer | components/TranslateOffer.jsx | 70 | App.jsx (global) |
| ConsentBanner | components/consent/ConsentBanner.jsx | 68 | App.jsx (global) |
| PremiumRouteChrome (marquee de marca) | components/PremiumRouteChrome.jsx | 239 | App.jsx (dentro del router) |
| CartDrawer | components/cart/CartDrawer.jsx + cart.css | — | Navbar (a demanda) |
| GrainOverlay | engine/effects/GrainOverlay.jsx | ~60 | ExperienceProvider (global) |
| Capas de acabado | overrides.css **1.212** + v2-surface 271 + v2-typography 282 + v3-finish 152 + luxury-system 306 + elite-refinements 257 | **2.480** | main.jsx (cascada fija) |

## 2. El mapa del stack vivo [MEDIDO en ejecución]

**Móvil 390px — 5 elementos fixed visibles en `/`:**
| z | Elemento | Identidad verificada | Inerte |
|---|---|---|---|
| 100000 | DIV | **Grain de película v3-finish** (SVG data-uri, opacity 0.02) | SÍ (pointer-events none) |
| 9999 | DIV ×2 | **GrainOverlay del engine** (z constante GRAIN_Z_INDEX=9999) + **cortina PageTransition** (gradiente marca, clip-path colapsada tras el barrido) | Ambos SÍ |
| 100 | header.navbar | Navbar (blur 7px + gradiente) | NO — interactivo |
| 30 | a.whatsapp-button | Botón flotante WhatsApp | NO — interactivo |

**Desktop 1440px — 8 elementos:** los mismos + `.bayona-cursor` (z 10001) + sticky-stage-viewport + persistent-summary (los últimos dos son de página, no chrome).

## 3. Forense por elemento — veredicto KEEP/REFINE/REWORK/REMOVE

### A+B. NAVBAR + MOBILE NAV — **KEEP con 1 REFINE quirúrgico** [CONFIRMADO]
Fuerte: grupos estructurados con labels de grupo, active state con hairline de subrayado, aria-expanded/controls, scroll-lock, y desde 9.0-B el focus trap completo (0 escapes verificado). Altura 74px fija, blur 7px constante.
- **Hallazgo H-91.1 (MEDIUM):** `backdrop-filter: blur(7px)` SIEMPRE activo sobre la barra fija [CONFIRMADO styles.css:65] — el prompt §20 lo marca como coste global y §6 dice "evita blur constante". En móvil (donde el blur es más caro y el navbar está sobre contenido oscuro casi idéntico al fondo #050505) el blur aporta casi nada visual y cuesta en cada frame de scroll.
- **Hallazgo H-91.2 (LOW):** el estado inicial es opaco (gradiente `#050505df→transparent`) y NO existe transición de aparición al hacer scroll: `is-scrolled` ya existe como estado pero solo cambia... [verificado: setScrolled >24px, clase is-scrolled]. El prompt §6 pide "aparición al scroll / estado inicial mínimo": la infraestructura ya está (la clase existe), falta la expresión visual. Oportunidad REFINE barata.
- **KEEP:** arquitectura de grupos, CTA a /onboarding (correcto desde F4), carrito, focus trap — no reestructurar.

### C. PAGE TRANSITION — **KEEP** [CONFIRMADO]
Ejemplar: pointer-events none, aria-hidden, duración/curva de motionTokens (sin literales), reset de scroll, reduced-motion = cortina omitida por completo. Pregunta del prompt ("¿aporta identidad o solo retrasa?"): **aporta identidad** — cortina con gradiente de marca, borde afilado, y NO bloquea interacción (es inert). Duración curtain de tokens. Veredicto: se conserva tal cual; ningún cambio justificado.

### D. CUSTOM CURSOR — **KEEP (condicional)** [CONFIRMADO + INFERIDO]
Arquitectura única (F3 eliminó el duplicado), solo desktop con puntero fino, respetado en reduced-motion. Pregunta crítica del prompt ("¿aporta valor?"): en una web atlética-premium, el cursor anillo es una firma de marca coherente con el universo. Coste medido: solo existe en desktop (no en móvil). **Riesgo INFERIDO a vigilar:** z 10001 > cortina 9999 — el cursor pasa POR ENCIMA de la cortina de navegación; visualmente aceptable (el cursor debe seguir al usuario siempre), pero se documenta para que el arquitecto lo sepa.

### E. SCROLL PROGRESS — **REFINE (pequeño)** [CONFIRMADO + MEDIDO]
2px fijo arriba, z 9998, scaleX animado por MotionValue (sin re-render: el patrón correcto). Ya tiene exclusiones contextuales por página (onboarding-immersive, resources). **Hallazgo H-91.3 (LOW):** convive pegado al navbar (z 100, height 74) — la barra nace en y=0, DETRÁS del navbar visible solo en el hueco... [verificado estilo: fixed top, bajo el navbar]. En 390px se superpone con el navbar opaco: apenas visible al inicio, plenamente visible tras scroll. Funciona, pero la relación espacial navbar↔progress no está diseñada como unidad. Oportunidad de REFINE de 1-2 líneas de CSS, no más.

### F+G+H+I. FLOATING STACK (JourneyRibbon, TranslateOffer, ConsentBanner, CartDrawer, WhatsApp) — **REFINE: jerarquía declarada** [MEDIDO]
En 390px conviven en el mismo viewport inferior: WhatsApp (z 30, fixed), TranslateOffer (z 45), ConsentBanner (z 60), JourneyRibbon, CartDrawer (z 11000-12000 al abrir). El prompt §11 exige "ONE PRIMARY FLOATING ATTENTION" y la pregunta clave: **¿compiten?**
- **Evidencia a FAVOR del estado actual:** Consent z60 > Translate z45 > WhatsApp z30 — ya hay una jerarquía de prioridad declarada por z-index (el consent manda, luego el traductor, luego WhatsApp). JourneyRibbon es contextual (solo activo tras onboarding). CartDrawer al abrir sube a 12000 y captura.
- **Hallazgo H-91.4 (MEDIUM):** la jerarquía existe pero es **implícita** (números sueltos en 5 CSS distintos) — no hay un token de escala de overlays documentado; el mapa real (grain 9999 → progress 9998 → navbar 100 → cortina 9999 → cursor 10001 → cart 12000) está disperso y con **colisiones semánticas**: la cortina de navegación (9999) comparte z con el grain (9999) — funciona porque ambos son inertes, pero cualquier overlay futuro interactivo en 9999 será ambiguo. **La oportunidad no es reordenar: es DOCUMENTAR la escala como tokens DS** (1 commit, cero riesgo).
- **Veredicto:** KEEP para todos los elementos (cada uno tiene función verificada); REFINE solo la declaración de escala.

### J. FOOTER — **REWORK (la pieza más débil del chrome)** [CONFIRMADO]
Estructura: 3 columnas (marca+tagline / grupos de enlaces / entrada CTA) + legal. El prompt §12 lo pide como "CIERRE, no lista de enlaces". **Hallazgo H-91.5 (HIGH visual, 0 riesgo técnico):** es exactamente lo que el prompt prohíbe — una lista de enlaces funcional pero sin cierre de marca: tagline en 10px, sin composición editorial, sin tipografía monumental, sin relación con la página anterior (NextChapter hace el cierre narrativo, pero el footer físico es plano). Es el candidato P1 de la fase: "cierre memorable pero quieto" con los tokens existentes (Montserrat 900 ya disponible). **Es la mayor diferencia entre BAYONA hoy y una experiencia de estudio premium.**

### K. PREMIUM ROUTE CHROME — **KEEP, con observación** [CONFIRMADO]
Ya se simplificó en F4 (retiró ROUTE_CONTINUATIONS, NextChapter es el cierre único). Lo que queda: BrandMarquee (tagline en marquee, aria-correcto) + mejoras contextuales. No compite con nada, no duplica. No tocar.

### L+M. OVERLAY STACK / Z-INDEX — **REFINE documental** (cubierta por H-91.4 arriba)

### N+O+P. SPACING / TYPOGRAPHY / INTERACTION STATES globales — **KEEP**
v2-typography (282 líneas) ya reseteó la escala por rol semántico en F3; luxury-system + elite-refinements + v3-finish pulieron focus/selection/scrollbar/micro-interacciones. Los interaction states (focus ring dorado, hover hairline) son consistentes en navbar y CTAs. No hay evidencia de inconsistencia global que justifique tocar esto en 9.1.

## 4. La deuda estructural: capas de acabado [CONFIRMADO]
`overrides.css` 1.212 líneas con **79 `!important`** + 5 capas posteriores (v2/v3/luxury/elite) = 2.480 líneas de acabado acumulado. El prompt §24/§29 advierte contra maquillaje: **no es maquillaje nuevo** — es maquillaje HISTÓRICO documentado (v3 = "última capa, solo añade pulido"). En 9.1 NO se toca (regla "migrar mientras se eleva", no "migrar por migrar"), pero se registra: cualquier CSS nuevo de chrome debe nacer en tokens DS, no en una capa 7.

## 5. GAP ANALYSIS PRIORIZADO (matriz del Protocolo Supremo §11)

| ID | Hallazgo | Sev | Impacto | Coste | Riesgo | Veredicto |
|---|---|---|---|---|---|---|
| H-91.5 | Footer plano, sin cierre de marca | **HIGH visual** | Alto (última impresión de TODA la web) | Medio (1 archivo + CSS con tokens existentes) | 0 (zona no comercial) | **P1 — el centro de 9.1** |
| H-91.4 | Escala z-index implícita y con colisión 9999 (grain=cortina) | MEDIUM | Medio (previene bugs futuros) | Bajo (documentar + 2 constantes) | ~0 | **P2** |
| H-91.1 | blur(7px) navbar constante (coste móvil) | MEDIUM | Medio en móvil gama baja | Bajo (condicionar a is-scrolled) | Bajo (visual casi idéntico sin él) | **P2** |
| H-91.2 | Estado inicial navbar sin expresión (is-scrolled infrautilizado) | LOW | Medio perceptual | Bajo | 0 | **P3** (va solo si H-91.1 se hace) |
| H-91.3 | Relación navbar↔scroll-progress sin diseñar | LOW | Bajo | Bajo | 0 | **P3** |
| — | Todo lo demás (transition/cursor/chrome/ribbon/consent/cart) | — | — | — | — | **KEEP — 0 cambios justificados** |

## 6. Lo que NO hará 9.1 (por evidencia, no por pereza)
- No reestructura la navegación (grupos correctos, auditoría F4 vigente).
- No toca PageTransition (ejemplar), cursor (identidad), PremiumRouteChrome (ya simplificado), consent/traductor (jerarquía ya correcta).
- No crea DS 3.0 ni tokens nuevos salvo la escala de z (semántica, documentada, con uso real inmediato).
- No toca /checkout, /order-confirmation, precios, WhatsApp, DP-5.
- No añade 3D (la fase es chrome; admission gate vigente).
- No refactoriza overrides.css (deuda registrada, se absorbe cuando una página migre, no antes).

## 7. Propuesta de ejecución para 9.1-B→F (sujeta a tu veredicto)
1. **9.1-B:** H-91.2+H-91.1 juntos (navbar: expresión mínima inicial + blur solo cuando aporta) + H-91.3 (progress integrado con navbar) — un solo commit `feat(chrome)`.
2. **9.1-C:** H-91.4 (escala z documentada como tokens + grain/cortina separados) — commit `fix(chrome)`.
3. **9.1-D/E (el corazón):** H-91.5 footer como cierre editorial quieto (tipografía monumental con tokens existentes, whitespace, sin animación gratuita) — commit `feat(chrome): elevate footer system`.
4. **9.1-F:** visual QA 6 breakpoints + gates completos + evidencia.

*Diagnóstico puro — ningún archivo de código fue modificado en este bloque (solo este documento). Scripts de inspección usados: ejecución local, no commiteados.*
