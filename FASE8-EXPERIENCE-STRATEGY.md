# FASE 8 — EXPERIENCE STRATEGY (Bloques C+D)

> Basado en HEAD `29a7bf9` (post-hardening H-01/H-02). Todo lo clasificado abajo fue verificado leyendo el código real de cada página (Home.jsx 861 líneas leídas completas; inventario de secciones por grep estructural) y los blueprints de PAGE-BLUEPRINTS.md. Etiquetas: CONFIRMADO (leído en código) / DERIVADO (del blueprint) / PROPUESTO (decisión de esta fase).

## C. DESIGN FORENSICS — inventario real de la Home (CONFIRMADO)

Secciones actuales en orden: hero-module (kicker + H1 + ReceptionCta) → sección visión (FUTURO) → sección punto de partida (PUNTO DE PARTIDA) + Bridge + CommunityChatPreview → sección método (MÉTODO: 3 pasos TE LEEMOS/CONSTRUIMOS/TE ACOMPAÑAMOS + marco de trabajo) → VideoSection 2 MIN → sección beneficios (proceso) → ExperienceProof → FreeValue → sección oferta (VER PLANES) → calculator-section (PlanExplorer + ExtrasExplorer + PersistentSummary + RequestPreview) → sección cierre/about-bridge.

**Clasificación (conservar / elevar / rediseñar / eliminar):**

| Elemento | Veredicto | Razón |
|---|---|---|
| Hero editorial (kicker, H1, ReceptionCta) | **CONSERVAR** | Blueprint B01 §1.6: el umbral reparte 3 journeys; el hero es entrada y no debe bloquear LCP (home es chunk estático a propósito, PERFORMANCE-BASELINE §2) |
| Partículas decorativas del hero | **ELEVAR** | Hoy: 6 spans estáticos posicionados a mano. No dañan, pero son el tipo de "profundidad" plana que Fase 8 debe superar — elevar a composición intencional, no borrar |
| Sección MÉTODO (3 pasos + marco) | **REDISEÑAR → prototipo E** | Es el corazón narrativo ("el método se presenta como un recorrido espacial sereno", SCROLL-STORY-MATRIX) y hoy es una lista `<ol>` con fadeUp — sticky ● marcado en la matriz pero NUNCA implementado. Es el candidato perfecto: alto impacto, 0 bytes 3D, el engine ya tiene StickyStage listo |
| VideoSection 2 MIN | **CONSERVAR** | Contenido humano real, Sebastián en persona |
| ExperienceProof / FreeValue | **CONSERVAR** | Prueba social + valor gratuito ya resuelven DESCUBRIMIENTO |
| Sección oferta + calculator | **CONSERVAR (intacto)** | Zona de decisión del blueprint: sin retraso, sin espectáculo. DP-5 intocable |
| Bridge + CommunityChatPreview | **CONSERVAR** | Continuidad del itinerario |
| Secciones FUTURO / PUNTO DE PARTIDA | **ELEVAR** | Texto bueno; composición de dos secciones hermanas casi idénticas → riesgo de intercambiabilidad leve |
| Aurora/particles del hero en móvil | **ELEVAR (mobile)** | Auditoría móvil pendiente de validar con el prototipo |

## D. MATRIZ DE EXPERIENCIA POR PÁGINA (decisión de Fase 8)

| Página | Medio de profundidad | Recibe 3D | Scroll storytelling | Prioridad |
|---|---|---|---|---|
| `/` Home | Motion 2D + sticky (cinematic-stage por fin usada) | **NO** (0 bytes; ya REJECTED implícito: immersive ≠ 3D) | **SÍ — prototipo E** | **1** |
| `/parkour-academy` | Motion 2D (cinematic-stage 2D ya especificada en M.5) | NO (REJECTED 7A) | SÍ (fase futura de escalado) | 3 |
| `/about` | Mapa 2D vivo + editorial-reveal | NO (mapa 2D existente EXISTENTE) | parcial | 2 |
| `/programs` | data-cascade | NO | NO (comparación sin ruido) | — |
| `/plan/*` ×4 | quiet, editorial | NO (PROHIBIDO en blueprint) | NO | — |
| `/checkout` `/order-confirmation` | quiet, máx. claridad | NO (PROHIBIDO ABSOLUTO) | NO | — |
| `/community` `/resources` `/faq` `/app` `/shop` | balanced/quiet 2D | NO | NO | — |
| `/onboarding` | balanced | NO | NO (umbral: velocidad) | — |

**Regla de la fase (del prompt maestro):** TODA la web con profundidad de experiencia; SOLO el prototipo validado introduce scroll narrativo; 3D = 0 escenas nuevas (la única candidata posible sigue siendo parkour vía 3D-ADMISSION-RECORD con sus condiciones de reapertura — no se toca).

## E. PROTOTIPO — "EL MÉTODO SE RECORRE" (sección MÉTODO de la Home)

- **Qué es:** los 3 pasos (TE LEEMOS → CONSTRUIMOS → TE ACOMPAÑAMOS) dejan de ser una lista y se convierten en un **recorrido espacial sticky**: el marco queda fijado mientras el scroll avanza los pasos, cada uno con su propia luz/composición sobre el fondo escénico existente (`sceneBackgroundProps` ya presente, 0 assets nuevos).
- **Por qué 2D basta:** el significado es "secuencia con reposo" — exactamente lo que StickyStage + useSectionProgress del engine expresan sin WebGL. La pregunta del gate de necesidad (¿qué comunica 3D que esto no?) ya fue respondida REJECTED en 7A.
- **Motor:** 100% engine existente (StickyStage diseñado en Fase 5, testeado, NUNCA usado en producción — su primera misión real). Framer Motion + tokens, zero deps, zero 3D.
- **Fallback primero:** reduced-motion → pila estática legible (StickyStage ya la implementa de serie); móvil → pila estática (el componente degrada solo); sin JS de escena → el contenido es HTML real, ya indexable.
- **Presupuesto:** 0 kB JS nuevo (StickyStage ya está en el chunk de la ruta); solo CSS del patrón + ~2-3 kB de JSX. Línea base de la Home ya medida.
- **Métrica de éxito:** (1) secciones legibles sin sticky (fallback nativo), (2) 0 regresión de LCP de la Home (comparación antes/después con vitals-lab), (3) visual suite verde, (4) a11y intacta (h2/h3 + aria orden preservados), (5) el usuario entiende "esto es una secuencia, no una lista".
