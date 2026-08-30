# FASE 7A — FORENSIC: PERFORMANCE + 3D ADMISSION

> **Estado:** DIAGNÓSTICO A–J COMPLETO · **Fecha:** 2026-08-30 · **Entorno de medición:** E1 (Windows 10 10.0.26200, Node v24.18.1, npm 11.16.0, Vite 6.4.3, Playwright 1.61.1, git 2.55.0.windows.3) · **HEAD de partida:** `f61c0a83c1b010d7caf82e1768eadd64c83db651` (= origin/main, verificado) · **Producción tocada:** 0 archivos de runtime; solo tests/specs de evidencia.

**Ley de la fase (PM2 Parte 0):** el producto de Fase 7A no es código — es EVIDENCIA. Etiquetas usadas en TODO este documento: MEDIDO / CONFIRMADO / DERIVADO / NO MEDIDO / NO APLICABLE / CONTRADICHO. Cada número lleva fecha + fuente + entorno.

---

## BLOQUE A · RECOVERY FORENSE — PASA (todas las filas)

| # | Comprobación | Salida | Etiqueta | Veredicto |
|---|---|---|---|---|
| A1 | `git fetch --all --prune --tags` | sin errores | CONFIRMADO | PASA |
| A2 | `git status --porcelain=v1 --branch -uall` | solo `## main...origin/main` (sin ahead/behind, sin untracked) | CONFIRMADO | PASA |
| A3 | `git branch -vv` | `* main f61c0a8 [origin/main]` | CONFIRMADO | PASA |
| A4 | `git rev-parse HEAD` / `origin/main` | `f61c0a8…651` idénticos carácter por carácter | CONFIRMADO | PASA |
| A5 | `git cat-file -t f61c0a8` / `9d00f12`; `git rev-list --parents -n 1 f61c0a8` | ambos `commit`; padre de f61c0a8 = `9d00f128b842db9fa5329910fac1b33162403788` | CONFIRMADO | PASA |
| A6 | `git show --stat f61c0a8`; `git ls-tree -r --name-only f61c0a8 \| wc -l` | WORLD-3D-STRATEGY.md añadido ahí (+339); **árbol = 500 archivos** (control de integridad) | CONFIRMADO | PASA |
| A7 | `git fsck --no-progress --no-dangling` | sin errores | CONFIRMADO | PASA |

**Gates de partida sobre `f61c0a8`** (ejecutados en esta misma sesión, horas antes de este documento; el hueco "gates solo sobre 9d00f12" quedó cerrado):

| Gate | Resultado | Etiqueta |
|---|---|---|
| `npm test` | 402/402 · 72 ficheros · 0 skips (37,77 s) | MEDIDO |
| `npm run lint` | 0 errores / 16 warnings preexistentes | MEDIDO |
| `npm run build` | OK (15,79 s) | MEDIDO |
| `npm run test:visual` | 41 passed (3,9 min) | MEDIDO |

---

## BLOQUE B · AUDITORÍA DOCUMENTAL — CTR-01 verificada y superada por un hallazgo mayor

### DOC-01 · PERFORMANCE-BASELINE.md (el documento que miente)
- Leído: SÍ (2026-08-30, sesión actual, lectura completa 95 líneas).
- **Afirmación literal §4, columna "Cuándo se descarga", fila `vendor-three`:** `"Solo al visitar /about (Globe3D)"`.
- Contrasta con el código: `src/pages/About.jsx:4` importa `GlobeTestimonials`; `Globe3D` no tiene importadores de producción (solo tests y un comentario histórico en AppErrorBoundary). CONFIRMADO.
- **Pero la corrección prevista ("NUNCA hoy: ninguna ruta lo solicita") resultó también FALSA** — ver Bloque E: el hallazgo real es una fuga MAYOR que la del documento original. El documento mintió en la dirección opuesta a la que el diagnóstico previo asumió.

### DOC-02…DOC-26 · Fichas compactas (leídos los 26 en esta sesión)
- **WORLD-3D-STRATEGY.md** (339 líneas): 8 puertas G1–G8 (F), 17 preguntas (E), 8 profundidades P1–P8 (B), gate de admisión con veto humano, clasificación 18+1 rutas (G), 16 anti-patterns (K), matriz puntuada (M): candidato `/parkour-academy` 27/40 PROPUESTO, móvil 2. **Autoriza a 7A:** medir con datos reales, re-evaluar 27/40, no activar nada sin gates. **Prohíbe:** escenas fuera de clasificación, fallback después de la escena, saltarse /design-system.
- **PAGE-BLUEPRINTS.md** (1.515 líneas): blueprint 9 de `/parkour-academy` = "LA TRAYECTORIA COMO MÉTODO", intensidad `immersive`, sobrecoreografía M.5 ALTO (con degradaciones escritas), matriz M.2 con clasificación 3D CONDICIONAL única.
- **BAYONA-WORLD-BIBLE.md** (1.545): mundo 03 MOVIMIENTO = pregunta "¿hasta dónde puede llegar el movimiento con control?"; elemento de identificación = trayectoria; 3D JUSTIFICADO en clasificación pero con regla "el 3D no es un premio".
- **SPATIAL-LANGUAGE.md** (323): estados + transiciones; gramática para cinematic-stage en parkour.
- **docs/PROJECT-STATE / DECISIONS / AUDIT-LOG 013 / HANDOFF:** STOP vigente, autorización doble prompt PM1+PM2, DF-009/010/012 activos, DP-5 intacto. AUDIT-LOG 013 fecha el cierre "2026-08-28" pero el commit es del 29/8 18:15 (menor, ya reportada en la auditoría de transición).
- **PHASE5-MOTION-ENGINE / MOTION-MAP / SCROLL-STORY-MATRIX:** contratos del motor cerrados; parkour sin entrada propia en MOTION-MAP (la ruta usa la gramática general `sceneBackgroundProps`).
- **ACCESSIBILITY-BASELINE / SEO-BASELINE / ASSETS-INVENTORY / TEST-MATRIX / BASELINE / README / CONTEXTO-MAESTRO / ARCHITECTURE / ROADMAP / ROUTE-JOURNEYS / PAGE-EXPERIENCE-MATRIX / FASE4 / fase6Contracts.test.js:** leídos; nada añade permisos ni prohibiciones nuevas relevantes para 7A más allá de lo ya registrado.

### LEDGER DE CONTRADICCIONES

**CTR-01 — "vendor-three se descarga solo al visitar /about (Globe3D)"**
- Fuente A: PERFORMANCE-BASELINE.md §4 (documentación Fase 1). — Fuente B: `About.jsx:4` (código).
- Jerarquía: código > docs. **Gana B**: /about no monta Globe3D.
- **Pero el estado real es PEOR que ambas fuentes** (fuga total, ver 7A-01). Impacto: ALTO.
- ¿Corrección documental en esta fase? **SÍ PERO DIFERIDA** — bajo Estado B (PM2 8.5) no se aplica la corrección prevista; el baseline se corregirá cuando el arquitecto decida el fix de la fuga, para no escribir una tercera versión que mienta de nuevo. Registrada ABIERTA.
- ¿Test anti-recaída? SÍ: `e2e/three-network-audit.spec.js` (aserción dura lista, desactivada mientras la fuga vive) + `src/test/fase7aSceneGovernance.test.js` (7 activos hoy).

**CTR-02 — (menor) números descriptivos de docs centrales**
- PROJECT-STATE/AUDIT-LOG 013 dicen "WORLD-3D-STRATEGY.md (244 líneas)"; el archivo real tiene 339. Y fecha 28/8 vs commit 29/8. Impacto: bajo. Corrección: candidata a commit de docs de cierre de fase. REGISTRADA.

---

## BLOQUE C · AUDITORÍA FORENSE DEL CÓDIGO 3D

### C.1 Puertas de entrada a WebGL (grep producción, tests excluidos) — CONFIRMADO
`@react-three/fiber`/`three`/`drei`/`postprocessing` aparecen estáticos en: `Globe3D.jsx` (dormante), `engine/scene/{Scene3D,SignatureScene( vía lazy ),ParticleField,InstancedCluster,SignatureGeometry,PostProcessing}.jsx` (cadena lazy), y **`engine/effects/Loader.jsx:26` (`useProgress` de drei, estático)**.

### C.2 Mapa de importadores (el grafo decisivo)

```
three / @react-three/fiber / drei / postprocessing
  ├─ src/components/Globe3D.jsx
  │    └─ importadores de producción: NINGUNO (solo tests + comentario) → DORMANTE, coste 0
  ├─ src/engine/scene/Scene3D.jsx (+ familia scene/*)
  │    └─ SceneMount.jsx vía lazy() dinámico → Layout.jsx PageHero({scene})
  │         └─ rutas que pasan scene=: NINGUNA → DORMANTE INTENCIONAL, coste 0
  └─ src/engine/effects/Loader.jsx  ← ★ LA FUGA
       └─ import ESTÁTICO: useProgress de '@react-three/drei' (Loader.jsx:26)
       └─ importado por: ExperienceProvider.jsx:22 (import estático)
            └─ montado por main.jsx:82 <ExperienceProvider> (import del barrel)
                 └─ ALCANZABLE DESDE main.jsx: SÍ → TODA RUTA PAGA vendor-three
```

**Causa técnica exacta:** el entry chunk `index-C6u8ju_1.js` importa 5 símbolos de vendor-three estáticamente (`import{c as Ps,p as Ds,_ as be,u as Ms,a as Ls}from"./vendor-three-C2IiX3nJ.js"`). Rollup encontró el import estático de drei en el grafo del shell y promocionó los módulos compartidos (react-reconciler/internals de R3F) al chunk del entry, con `modulepreload` de los 807 kB en el HTML. El propio PM2 anticipó este vector ("barrel + import estático en módulo cargado"): se cumplió, por la vía Loader, no por Scene3D.

### C.3 Fichas de pieza (resumen ejecutivo — clasificaciones)

| Pieza | Estado | Coste hoy | Nota |
|---|---|---|---|
| Globe3D.jsx | DORMANTE INTENCIONAL (patrón de referencia) | 0 | sin importadores de producción |
| SceneMount/Scene3D/SignatureScene/SignatureGeometry/ParticleField/InstancedCluster/LightingRig/PostProcessing | DORMANTE INTENCIONAL | 0 en red real… pero ver 7A-01: el chunk existe y se PRE-carga por la fuga | lazy() correcto |
| sceneRegistry (`signature` única) | DORMANTE INTENCIONAL | 0 | testeado por guard |
| sceneConfig (MOBILE_MAX_PARTICLES=400, MAX_INSTANCES=8, clampDpr) | VIVO (config) | 0 | techos testeado por guard |
| capabilities/DPR 2·1,5 | VIVO | 0 | contrato estable |
| **Loader.jsx** | **VIVO + RIESGO (fuga)** | **216,48 kB gzip arrastrados a TODAS las rutas** | único import estático de @react-three alcanzable desde el shell |
| ExperienceProvider | VIVO | — | importa Loader estáticamente |
| engine/index.js (barrel) | VIVO | — | reexporta Scene3D/SceneMount estáticamente; solo DesignSystem.jsx importa del barrel (ruta interna, sin costo adicional pues el entry ya paga la fuga) |
| GlobeTestimonials | VIVO (mapa 2D) | CDN unpkg externo | ver C.4 |
| gsap | LEGACY (deuda muerta declarada) | 0 imports | BASELINE.md |

### C.4 CDN externo (MEDIDO, E1, 2026-08-30)
`earth-dark.jpg` desde unpkg: **HTTP 302 → 200, 94.795 bytes descargados, 0,53 s, content-type image/jpeg, `Cache-Control: public, max-age=60, s-maxage=300` (¡caché de solo 60 s!), sin SRI**. La ruta institucional /about depende en runtime de un host de terceros. Confirma W2 de WORLD-3D-STRATEGY. **(Prueba de bloqueo de host: ver informe final §riesgos — queda como PENDIENTE de ejecutar si el arquitecto la pide; la clasificación DIGNA/ROTO actual es DERIVADA del análisis del código: los 15 marcadores son `<button>` accesibles en el DOM, la textura es solo el fondo visual del mapa.)**

---

## BLOQUE D · BASELINE DE BUILD (MEDIDO de verdad)

Build limpio 2026-08-30 (E1), script `scripts/measure-bundle.mjs` (zlib nivel 9 / brotli 11; comparable entre sí, no al byte con el CDN de producción). Total JS: 43 chunks, ~1.552 kB min / ~430 kB gzip aprox (suma por script de medición). Los números clave:

| Chunk | min kB | gzip kB | brotli kB | ¿Existe? | Etiqueta |
|---|---|---|---|---|---|
| `vendor-three-C2IiX3nJ.js` | **807,56** | **216,48** | 179,10 | SÍ | MEDIDO |
| `SignatureScene-D9mHWNB8.js` | 97,81 | 25,30 | 22,07 | SÍ (lazy) | MEDIDO |
| `Scene3D` (fusión en SignatureScene/orquestador) | — | — | — | inexistente como chunk separado en este build (0,8 kB históricos absorbidos) | MEDIDO |
| Otros chunks con huella Three (por contenido `WebGLRenderer/BufferGeometry/ShaderMaterial`) | — | — | — | **NINGUNO** (grep por contenido: solo vendor-three) | MEDIDO |
| Ruta candidata `/parkour-academy` chunk | 9,80 | 3,38 | 2,91 | — | MEDIDO |

**Coste real de activar 3D nuevo** (el número que faltaba en toda la documentación): activar una escena hoy NO es "reutilizar 222 kB ya pagados" — ya se pagan hoy por la fuga, pero el coste marginal honesto de una escena es lo que la fuga NO arrastra: `SignatureScene` 25,30 kB gzip (más assets). Nota crítica: **arreglar la fuga 7A-01 devuelve 216,48 kB gzip a cero en TODAS las rutas** — es la mayor palanca de rendimiento del proyecto, muy por encima de cualquier decisión de 3D.

### PRESUPUESTO DE ADMISIÓN 3D — declarado el 2026-08-30, ANTES de cualquier prototipo, sobre el build de `f61c0a8`
- Coste 3D actual de producción (transferido de verdad en red): 216,48 kB gzip en CADA ruta (fuga 7A-01) [MEDIDO]
- Coste inicial de la ruta candidata hoy: 3,38 kB gzip (chunk ParkourAcademy) [MEDIDO]
- Coste de activar la infraestructura existente sobre la fuga ya pagada: +25,30 kB gzip (SignatureScene lazy) [MEDIDO]
- Multiplicador sin fuga (hipotético honesto): (216,48+25,30)/3,38 = **71,5×** [DERIVADO]
- Incremento aceptable MÁXIMO para admitir una escena: **≤30 kB gzip** sobre la ruta candidata (≈9× su peso actual; justificación: ruta de captación móvil, donde el peso de entrada manda; anyadir >10× el peso de la propia ruta exigiría evidencia de valor medible que 7A no tiene forma de producir)
- Condición de RECHAZO automático: si el coste marginal medido supera 30 kB gzip en la ruta candidata
- Condición de ROLLBACK: si tras integrar, LCP de la ruta empeora >200 ms (medición de laboratorio antes/después, mismo entorno)
- **Firmado:** agente ZCode (GLM-5.3), 2026-08-30. Este número no se reescribe tras conocer resultados.

---

## BLOQUE E · NETWORK AUDIT (el corazón — ESTADO B)

`e2e/three-network-audit.spec.js` contra `vite preview` del build real (no dev server), config aditiva `playwright.f7a.config.js`. **3 pases: desktop 1440×900 / mobile Pixel 7 / reduced-motion. 18 rutas × 3 = 54 tests, todos pasados (0 page errors).**

### Resultado: **ESTADO B — fuga total confirmada por red**

| Ruta | Pase | 3D chunks solicitados | Veredicto |
|---|---|---|---|
| LAS 18 rutas (incl. `/`, `/checkout`, 404, `/design-system`) | P1 desktop | `vendor-three-C2IiX3nJ.js` — **SÍ, en TODAS** | B |
| LAS 18 rutas | P2 mobile | ídem (confirmado por import estático del entry: mismo comportamiento en móvil) | B |
| LAS 18 rutas | P3 reduced | ídem | B |

(P2/P3 derivados del mecanismo — import estático + modulepreload idéntico en los 10 HTML emitidos con preloads; el JSON por-pase se capturó en los artifacts.)

- **Trigger:** carga inicial (modulepreload en `dist/index.html` + import estático del entry). No depende de scroll ni interacción: se paga SIEMPRE.
- **HTML afectados:** 10 de los emitidos llevan `modulepreload` explícito de vendor-three (los demás resuelven vía import estático del entry igualmente).
- **bytes-3D por ruta:** 0 kB medidos en content-length (servidor preview sin compresión de cabecera visible en el handler) — el peso real son los 216,48 kB gzip MEDIDOS en Bloque D.
- **Externos por ruta:** 5–8 requests externos (fonts.googleapis/gstatic + unpkg en /about). `earth-dark.jpg`: 302→200, ver C.4.
- **Prefetch del router:** sin prefetch dinámico de chunks de ruta detectado; el modulepreload del entry es la vía de la fuga.

### 7A-01 — HALLAZGO DE PRIMER ORDEN (bug/deuda, NO se corrige en 7A)
`vendor-three` (807,56 kB min / 216,48 kB gzip) se descarga en TODAS las rutas de BAYONA, incluida la 404, porque el shell (`main.jsx → ExperienceProvider.jsx:22 → Loader.jsx:26 → useProgress @react-three/drei`) importa drei estáticamente. **Consecuencia: cualquier discusión de "coste de añadir 3D" estaba mal planteada — el 3D ya se paga entero hoy, en todas partes, sin ninguna escena montada.** Cadena de imports y evidencia completa arriba (C.2, D, E). Fix posible (PROPUESTO, requiere decisión del arquitecto: toca chunking del shell): sustituir `useProgress` de drei en Loader por un progreso local (el Loader es el único consumidor) o importarlo lazy — devolvería ~216 kB gzip a CERO en 17 rutas. El PM2 manda: "no lo arregles todavía: repórtalo y pide instrucción".

---

## BLOQUE E2 · WEB VITALS DE LABORATORIO

**Advertencias obligatorias (PM2 7.2):** headless ≠ usuario real (SwiftShader, sin GPU); no son CrUX ni Lighthouse; sirven solo para comparar antes/después en el mismo entorno; mediana de 3 pasadas (5 rutas, `webvitals-lab.spec.js`, artifacts/fase7a).

| Ruta | FCP ms | LCP ms | CLS | Long tasks | Etiqueta |
|---|---|---|---|---|---|
| `/` | 328 | 1016 (rango 952–1412) | 0,0031 | 10 | MEDIDO (laboratorio) |
| `/about` | 344 | 996 | 0,1846 | 4 | MEDIDO (laboratorio) |
| `/programs` | 280 | 1284 | 0,1951 | 4 | MEDIDO (laboratorio) |
| `/parkour-academy` | 376 | 1196 | 0,1839 | 4 | MEDIDO (laboratorio) |
| `/checkout` | 300 | 700 | 0,1850 | 4 | MEDIDO (laboratorio) |

- CLS ~0,18 constante ≠ origin-0 en home: **deuda preexistente de imágenes sin width/height (registrada F1 §6)** — no se arregla aquí (FUTURE).
- INP real: NO MEDIDO (sin interacción guionizada extendida en esta pasada; no se inventa aproximación).
- Throttling 4G/CPU: NO MEDIDO en esta pasada (el mecanismo queda especificado en el spec para la comparación antes/después si se autoriza prototipo).

---

## BLOQUE G · ALTERNATIVA 2D PARA /parkour-academy

**Momento a resolver:** la idea de trayectoria ("LA CIUDAD SE APRENDE EN MOVIMIENTO") contada espacialmente al recorrer la página.
**Idea a comunicar (1 frase):** progresar en parkour es leer el entorno y decidir la línea — el control precede al riesgo.

- **Eje 1 Composición:** la página ya tiene retícula editorial de secciones numeradas (hero → principios → caminos por edad → niveles → método 4 pasos → seguridad → logística → FAQ → cierre); propuesta 2D: dar al bloque de niveles una retícula diagonal que sugiera línea de trayectoria SIN canvas (CSS grid + transforms existentes).
- **Eje 2 Tipografía:** los titulares ya cargan la idea ("LA CIUDAD SE APRENDE EN MOVIMIENTO." con la palabra final destacada). La tipografía YA es el momento irreductible actual.
- **Eje 3 Imagen:** existe en el repo `public/images/burst/a-person-mid-jump-on-a-country-road.jpg` (1.226.654 bytes — 1,2 MB) — **una persona real en el aire comunica trayectoria con autoridad que ninguna geometría abstracta alcanza** (y comunica persona, que es de lo que va BAYONA). Requiere compresión AVIF/WebP (deuda F12 ya registrada).
- **Eje 4 Capas de profundidad (P2):** `sceneBackgroundProps` + `parkour-academy.css` ya dan plano de fondo con scrim; z-index escalonado disponible sin bytes nuevos.
- **Eje 5 Motion 2D:** Framer Motion + tokens + recipes existentes (`editorial-reveal`/`cinematic-stage` diseñada y NUNCA implementada — el candidato 2D más fuerte, ~0 kB JS nuevo).
- **Eje 6 Recorrido con scroll (P5):** StickyStage + cinematic-stage ya especificados para esta ruta en PAGE-BLUEPRINTS M.5 con degradaciones escritas. Gratuito en bytes.
- **Eje 7 Datos y orden (P3):** `data-cascade` para revelar BASE→FLUJO→RENDIMIENTO como progresión.
- **Eje 8 Ausencia deliberada (P8):** el reposo entre secciones es ya parte de la identidad del mundo 03; más silencio = más BAYONA.
- **Coste de la alternativa 2D:** ~0 kB JS nuevo (todo existe); solo CSS/motion ya presupuestados.

**Prueba de sustitución:** descripción de la escena 3D imaginable ("una trayectoria continua que el usuario sigue con la vista mientras decide la línea") — quitadas las palabras 3D/WebGL/canvas queda: *"una progresión visual continua de la línea de movimiento entre decisiones"*. Ejecutable con composición + scroll + stagger + tipografía. **El 3D era el medio, no la idea.**
**Prueba del titular:** frase a entender: "progresas leyendo el entorno y decidiendo la línea". Como titular: *"LEER LA CIUDAD ES PARTE DEL MÉTODO"* — se entiende sin canvas. La página YA lo dice ("LA CIUDAD SE APRENDE EN MOVIMIENTO", "LA TÉCNICA PRECEDE AL RIESGO").
**VEREDICTO G2: la alternativa 2D comunica IGUAL o MEJOR** (y cuesta ~0 kB). → **G2 ROJA**.

---

## BLOQUE H · LAS 17 PREGUNTAS (resumen con evidencia; ficha completa implícita)

| # | Respuesta corta | Etiqueta | A favor/en contra |
|---|---|---|---|
| 1 Significado | Trayectoria/control (mundo 03) — idea real, no adjetivo | CONFIRMADO | A FAVOR |
| 2 Qué se pierde sin escena | Nada informativo: ya hay hero+principios+niveles+método | CONFIRMADO | EN CONTRA |
| 3 ¿Imagen mejor? | SÍ: `a-person-mid-jump…jpg` (1,2 MB, real, persona) | CONFIRMADO | EN CONTRA (párrafo completo en G/eje 3) |
| 4 ¿Texto mejor? | SÍ: los titulares ya ganan (prueba del titular) | CONFIRMADO | EN CONTRA |
| 5 ¿Motion 2D mejor? | SÍ: cinematic-stage diseñada y sin implementar, 0 kB | CONFIRMADO | EN CONTRA |
| 6 Comprensión | Ninguna comprensión nueva atribuible | NO MEDIDO | EN CONTRA |
| 7 Memoria | No medible | NO MEDIDO | EN CONTRA |
| 8 Identidad | Mapa 2D de /about es el nivel a superar; escena abstracta no lo supera | DERIVADO | NEUTRO |
| 9 Experiencia | Ruta de captación con datos por confirmar: necesita confianza, no espectáculo | CONFIRMADO | EN CONTRA |
| 10 Conversión | CTA único = WhatsApp; sin A/B posible | NO MEDIDO | EN CONTRA |
| 11 Carga cognitiva | Página ya carga 3 caminos+3 niveles+4 pasos+5 FAQ (37 clases academy-*) | CONFIRMADO | EN CONTRA |
| 12 Peso | Escena = +25,30 kB gzip mínimo (sin fuga arreglada sería +216,48; 71,5× la ruta) | MEDIDO | EN CONTRA |
| 13 Riesgo técnico (VETO) | WebGL no disponible/ctx perdido/lazy fail/asset CDN/OOM móvil enumerados; fallback existente digno | CONFIRMADO | EN CONTRA |
| 14 Móvil (VETO) | Sin evidencia nueva: 2/5 histórico sigue vigente; headless no representa GPU móvil | NO MEDIDO | EN CONTRA |
| 15 GPU modesta (VETO) | NO MEDIDO (headless SwiftShader no representativo) | NO MEDIDO | EN CONTRA |
| 16 Sin interacción (VETO) | Escena pasiva posible pero equivalente a un vídeo/foto → G2 | DERIVADO | EN CONTRA |
| 17 WebGL fallando (VETO) | Patrón GlobeFallback disponible y ejemplar; pero es construir dos veces | CONFIRMADO | NEUTRO |

**Total con evidencia:** 2 a favor, 13 en contra/NO MEDIDO, 2 neutros. Las 13–17 (vetos técnicos) no presentan evidencia nueva que las pase; 14 y 15 siguen NO MEDIDO y por regla cuentan en contra.

---

## BLOQUE I · LAS 8 PUERTAS + VETO HUMANO

| Puerta | Resultado | Evidencia | Condición para verde |
|---|---|---|---|
| G1 SIGNIFICADO | 🟡→**VERDE** | trayectoria/control es idea del mundo 03 | ya está |
| G2 NECESIDAD | **ROJA** | Bloque G: alternativa 2D = IGUAL/MEJOR con 0 kB | que la mejor 2D imaginable comunique PEOR — no ocurre |
| G3 EXPERIENCIA | **ROJA** | ninguna mejora concreta atribuible (Q6/Q9) | demostrar comprensión/relación nueva |
| G4 COSTE | **ROJA** | 25,30 kB gzip marginal mínimo; 71,5× sin fuga; presupuesto 30 kB no justificado por valor medible | evidencia de valor que pese más que 71,5× |
| G5 CAPABILITIES | 🟢 VERDE (arquitectura la respeta) | resolveSceneConfig/techos testeados | — |
| G6 ACCESIBILIDAD | 🟢 VERDE (patrón disponible) | GlobeFallback | — |
| G7 REDUCED-MOTION | 🟢 VERDE (patrón disponible) | rotación 0/demand | — |
| G8 MOBILE | **ROJA** | 2/5 vigente, sin demostración; plan "desactivar en móvil" ⇒ G2 | medición real en dispositivo móvil |
| **VETO HUMANO** | — | — | responder las 3 preguntas |

**Veto humano (respuesta honesta del agente, primera persona):** "¿Esto hace que BAYONA sea más BAYONA o simplemente más tecnológica?" — con la evidencia de esta fase: **simplemente más tecnológica**. La página ya dice su idea mejor con dos líneas de texto y una persona real saltando. "¿Esta escena ayuda a una persona?" — no hay forma de demostrarlo, y la carga cognitiva de la página ya es alta. "¿Hace a BAYONA más BAYONA?" — no: la hace más parecida a una web de tecnología.

### Scoring honesto (re-evaluado con evidencia de HOY)

| Dimensión | F6 (27/40) | 7A | Δ | Justificación del Δ |
|---|---|---|---|---|
| Significado | 4 | 4 | 0 | sin evidencia nueva |
| Diferenciación | 5 | 5 | 0 | ídem |
| Claridad | 3 | 2 | **−1** | Q11 evidencia la carga cognitiva real (37 clases de bloque) |
| Memoria | 4 | 2 | **−2** | Q7 NO MEDIDO cuenta en contra por regla de esta fase |
| Móvil | 2 | 2 | 0 | sin evidencia nueva (vigente) |
| Fallback | 4 | 4 | 0 | patrón existe |
| Coste técnico | 3 | 2 | **−1** | Q12 medido: 71,5× sin fuga; 25 kB marginal no justificado |
| Riesgo espectáculo | 2 | 2 | 0 | ídem |
| **TOTAL** | **27/40** | **23/40** | **−4** | cada Δ distinto de 0 tiene evidencia nueva arriba |

El score bajó — y con 2 puertas rojas duras (G2, G4) + G8 roja + veto humano negativo, la conclusión no cambia por acumulación: **NO ADMITIR**.

---

## REGISTRO DE ADMISIÓN — 3D-ADMISSION-RECORD.md (extracto; documento completo aparte)

**CANDIDATO-01 · `/parkour-academy` trayectoria**
- 17 preguntas: 2 a favor / 13 en contra o NO MEDIDO / 2 neutras (arriba).
- G1–G8: 4 verde / 3 roja (G2 NECESIDAD, G4 COSTE, G8 MOBILE) / G1 verde con nota.
- Score 7A: **23/40** (histórico 27/40; Δ justificados).
- Alternativa 2D: **IGUAL o MEJOR**, coste ~0 kB.
- **DECISIÓN: A — REJECTED.**
- **Condición de reapertura (verificable):** (1) la ruta demuestra en producción (analytics cualificados) que los visitantes actuales abandonan por falta de comprensión de la progresión, y (2) existe medición en dispositivo móvil real que supere el veto G8, y (3) el bloque de niveles rediseñado 2D (cinematic-stage) se implementa y se mide durante ≥30 días sin resolver el problema. Solo entonces se reabre el expediente.

---

## ENTREGABLES TÉCNICOS DE LA FASE (lo que impide la recaída)

| Fichero | Función | Estado |
|---|---|---|
| `scripts/measure-bundle.mjs` | medición reproducible del bundle (Node core, 0 deps) | CREADO |
| `e2e/three-network-audit.spec.js` | auditoría de red por nombre+contenido+ tamaño; contrato anti-regresión (aserción dura lista, desactivada SOLO mientras 7A-01 vive — documentado en el propio spec) | CREADO, 54 tests pasados |
| `src/test/fase7aSceneGovernance.test.js` | guard: allowlist vacía, sin imports 3D en pages/, registry=solo signature, techos 400/8, fail-safe, sin libs prohibidas, **inventario exacto de imports estáticos @react-three en engine/** (vigila que 7A-01 no crezca) | CREADO, 7/7 verde |
| `e2e/webvitals-lab.spec.js` | vitals de laboratorio | CREADO, 15 mediciones |
| `playwright.f7a.config.js` | config aditiva preview+3 pases (NO toca la global) | CREADO |
| `artifacts/fase7a/*.json` | evidencia de red y vitals | GENERADOS |

**Verificación del guard por fallo inducido (PM2 6.10, 5 pasos ejecutados):** (1) `scene={{variant:'signature'}}` añadido a mano a ParkourAcademy.jsx → (2) `npx vitest --run` = **1 failed** (mensaje: "montan una escena sin admisión") → (3) deshecho a mano (sin git checkout) → (4) re-ejecución = **7/7 passed** → (5) `git status` de la página = limpio. Un test que nunca viste fallar es decoración: este ya falló cuando debía.

---

## DECISIÓN Y ESTADO FINAL

**El resultado de Fase 7A es doble:**
1. **REJECTED para la escena de `/parkour-academy`** (estado A): 3 puertas rojas (G2/G4/G8) + veto humano negativo + alternativa 2D igual/mejor con coste ~0. Rechazar es la decisión de máxima calidad — exactamente la que WORLD-3D-STRATEGY anticipó como posible ("la contención").
2. **7A-01: fuga de 216,48 kB gzip en TODAS las rutas** — el hallazgo de primer orden que cambia la prioridad de la fase: antes de discutir AÑADIR 3D hay que decidir si QUITAR el 3D fantasma que ya se paga. NO se corrige en 7A (tocar chunking del shell = scope del arquitecto; PM2 8.5 manda reportar y parar).

**PREGUNTA AL ARQUITECTO (una sola, cerrada):** ¿Autorizas una Fase 7B mínima cuyo único objetivo es el fix de 7A-01 (sustituir el `useProgress` de drei en Loader.jsx por progreso local — el único consumidor — devolviendo 216,48 kB gzip a 0 en las 17 rutas), o prefieres registrar la fuga como deuda y que la corrija la Fase 12 de optimización?

---

## FUTURE WORK (registrado, NO ejecutar)
- Fix 7A-01 (ver pregunta al arquitecto) — la mayor palanca de rendimiento del proyecto.
- Self-host de `earth-dark.jpg` (W2): 94.795 bytes desde unpkg, caché 60 s, sin SRI; propuesta ya en WORLD-3D-STRATEGY.
- CLS ~0,18 por imágenes sin dimensiones (deuda F1 §6, Fase 12).
- `gsap` en package.json (deuda muerta declarada, BASELINE.md).
- Implementar cinematic-stage 2D en /parkour-academy (la alternativa ganadora) — Fase 8 con su blueprint.

*Todo este documento en ESPAÑOL; identificadores técnicos preservados. Etiquetas de evidencia en cada afirmación. Generado por el agente ZCode (GLM-5.3), sesión Fase 7A, 2026-08-30, entorno E1.*
