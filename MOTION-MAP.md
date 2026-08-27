# MOTION-MAP — Mapa de movimiento del Motion Engine 2.0 (Fase 5)

Mapa de las **8 recetas** de movimiento disponibles y de las **intensidades**. Fuente única
de la oferta: `src/engine/recipes/index.js` (dato declarativo) + `src/engine/recipes/intensity.js`.
Una receta puede no usarse nunca y ningún componente está obligado a moverse: el movimiento
responde siempre a *qué acaba de pasar, por qué, qué enseña y dónde debe mirar el usuario*.

> **Límite anti-doble-animación (crítico):** la capa ambiente `v2-scroll-motion.css`
> (`animation-timeline: view()`) ya anima ciertos selectores. **No apliques una receta JS
> sobre un selector que v2 ya anima.** Contraindicaciones por receta en la columna *Evitar*.

---

## Intensidades (solo tres)

| Intensidad | Amplitud | Velocidad | Simultaneidad | Cuándo |
|---|---|---|---|---|
| `quiet` | ×0.5 | ×0.8 | 1 a la vez | Lectura, datos, fichas, cierres |
| `balanced` | ×1.0 | ×1.0 | hasta 2 | Comportamiento por defecto |
| `immersive` | ×1.4 | ×1.15 | hasta 3 | Un único momento narrativo por página |

Helper: `resolveIntensity(name)` (fail-safe → `balanced`), `scaleDistance(px, intensity)`,
`scaleDuration(seconds, intensity)` (acotada 0.1–3 s).

---

## Las 8 recetas

### 1. Editorial Reveal — `editorial-reveal`
- **Propósito:** el contenido emerge con calma al ritmo de la lectura.
- **Intensidad / Nivel:** `quiet` / `standard` · **Distancia:** `near`
- **Componentes:** `Reveal`, `TextMask`
- **Usar cuando:** bloques de texto, datos y fichas donde la lectura manda.
- **Evitar:** contenido que ya anima la capa CSS `v2-scroll-motion` (doble animación).
- **Móvil:** igual, con recorridos `near`. · **Reduced motion:** visible al instante.

### 2. Editorial Slide — `editorial-slide`
- **Propósito:** una línea o dato entra de lado: señala dirección y progreso.
- **Intensidad / Nivel:** `balanced` / `standard` · **Distancia:** `medium`
- **Componentes:** `Reveal`, `useSectionProgress`
- **Usar cuando:** etiquetas, reglas horizontales, índices de sección.
- **Evitar:** párrafos largos — el texto corrido no se desliza.
- **Móvil:** amplitud reducida (`near`). · **Reduced motion:** estático en su posición final.

### 3. Compact Rail — `compact-rail`
- **Propósito:** información compacta en rail horizontal: etiquetas, métricas, números.
- **Intensidad / Nivel:** `balanced` / `standard` · **Distancia:** `near`
- **Componentes:** `Marquee`
- **Usar cuando:** contenido repetitivo decorativo: líneas editoriales, datos de ambiente.
- **Evitar:** información crítica o única — el bucle es decoración, no lectura.
- **Móvil:** rail estático con scroll manual y snap. · **Reduced motion:** rail estático desplazable, sin bucle.

### 4. Cinematic Stage — `cinematic-stage`
- **Propósito:** un escenario fijo evoluciona por estados (A → B → C) mientras el usuario scrollea.
- **Intensidad / Nivel:** `immersive` / `emphasis` · **Distancia:** `far`
- **Componentes:** `StickyStage`, `useSectionProgress`
- **Usar cuando:** un único momento narrativo por página que justifica detener el tiempo.
- **Evitar:** más de un escenario por página; páginas de lectura o decisión.
- **Móvil:** secuencia estática apilada, sin fijación. · **Reduced motion:** estados apilados como sección normal.

### 5. Data Cascade — `data-cascade`
- **Propósito:** los datos aparecen en cascada moderada: jerarquía sin ruido.
- **Intensidad / Nivel:** `quiet` / `standard` · **Distancia:** `near`
- **Componentes:** `Reveal`
- **Usar cuando:** listas de métricas, tablas compactas, stacks de información.
- **Evitar:** stagger que retrase datos críticos más de un segundo.
- **Móvil:** stagger más corto. · **Reduced motion:** todos los datos visibles a la vez.

### 6. Image Drift — `image-drift`
- **Propósito:** una imagen deriva suave respecto al contenido: profundidad sin mareo.
- **Intensidad / Nivel:** `balanced` / `emphasis` · **Distancia:** `medium`
- **Componentes:** `Parallax`
- **Usar cuando:** imágenes de apoyo grandes, fondos de sección narrativa.
- **Evitar:** más de una capa de parallax simultánea en móvil.
- **Móvil:** factor 0.4 (ya integrado en `Parallax`). · **Reduced motion:** imagen fija (factor 0).

### 7. Horizontal Passage — `horizontal-passage`
- **Propósito:** el usuario baja y el contenido avanza en horizontal: progreso espacial.
- **Intensidad / Nivel:** `immersive` / `emphasis` · **Distancia:** `far`
- **Componentes:** `HorizontalPassage`, `useSectionProgress`
- **Usar cuando:** secuencias de 3–6 vagones con narrativa propia (método, historia, comparativa).
- **Evitar:** contenido que debe leerse rápido; más de un pasaje por página.
- **Móvil:** pila vertical convencional. · **Reduced motion:** pila vertical convencional.

### 8. Quiet Transition — `quiet-transition`
- **Propósito:** entrada/salida serena entre bloques: continuidad sin teatro.
- **Intensidad / Nivel:** `quiet` / `standard` · **Distancia:** `near`
- **Componentes:** `Reveal`, `PageTransition`
- **Usar cuando:** cierres de sección y aperturas del siguiente capítulo.
- **Evitar:** transiciones que retrasen el CTA primario.
- **Móvil:** igual. · **Reduced motion:** corte limpio, sin cortina.

---

## Presupuesto de movimiento por zona

| Zona | Peso | Notas |
|---|---|---|
| `hero` | 3 | Admite receta amplia; máximo una por página |
| `body` | 2 | Recetas de lectura (`editorial-reveal`, `data-cascade`) |
| `supporting` | 1 | Apoyo; movimiento mínimo |
| `cta` | 2 | Énfasis puntual; nunca retrasar el CTA primario |
| `background` | 0 | Sutil o nada; nunca compite con el contenido |

Límites por intensidad (`checkBudget`): `quiet 6 · balanced 8 · immersive 10`; no más de una
zona de peso 3. `resolveBudget(zone)` fail-safe → `supporting`.

---

## Reglas de calma (presupuesto global)
- Micro > macro: preferir movimientos pequeños y precisos.
- Alternar movimiento → reposo; no encadenar más de lo que la intensidad permite.
- Sin rebotes, overshoot, elasticidad ni flashes.
- Solo `transform` y `opacity` en lo animado por JS.

*Clasificación: **CONFIRMADO** — las recetas son dato declarativo verificado por
`recipes.test.js` (incluido el invariante `recipesUseKnownTokens()`).*
