# AUDIT-LOG — BAYONA WEB

> Historial append-only de auditorías. No borrar ni sobrescribir entradas anteriores.
> Cada entrada: fecha · commit auditado · rama · objetivo · comprobaciones · resultado · contradicciones · riesgos · conclusión · siguiente acción.

---

## Entrada 001 — Auditoría de baseline (HISTÓRICA)
- **Fecha:** 2026-08-25 · **Commit:** `8f14698` · **Rama:** main
- **Objetivo:** diagnóstico ejecutivo antes del rediseño.
- **Comprobaciones:** lectura de código + ejecución de la suite.
- **Resultado:** suite ROJA de partida (84 fallos / 187 tests, 24 ficheros fallando); hallazgos que definieron el orden de trabajo (estabilización primero).
- **Documento:** `AUDITORIA_2026-08-25.md` (raíz; marcado HISTÓRICO — representa el estado pre-Fase 1).
- **Conclusión:** necesaria Fase 1 de estabilización antes de cualquier diseño.

## Entrada 002 — Auditoría forense Fases 1–5
- **Fecha:** 2026-08-27 · **Commit:** `70606dd` · **Rama:** main
- **Objetivo:** PROMPT MAESTRO de auditoría forense (verificar el informe de Fase 5 contra el repo real, sin modificar nada).
- **Comprobaciones:**
  - Git forense: HEAD = origin/main = `70606dd`, árbol limpio, 16 commits desde pre-Fase 1, 7 commits de Fase 5 (`c9448c4..70606dd`).
  - Fases 1–4: SSoT WhatsApp, dominio canónico, radiogroup, ROUTE_CONTINUATIONS retirado (solo comentario), Breadcrumb, Checkout `?plan=`, 11 componentes ds/, 20 docs raíz.
  - Fase 5 profunda (B.1–B.15): tokens exit/travel/transform + espejo CSS, duraciones cerradas en 4, ExperienceProvider 1 suscripción, SECTION_RANGES congelados, handoff 7 campos fail-safe, Marquee/TextMask/StickyStage/HorizontalPassage con fallbacks, 8 recetas, budgets hero3/body2/supporting1/cta2/background0 + checkBudget, pageMotionContract fail-safe, MotionDebug dev-only, playground bloques 10–16 noindex, **B.15 BLOQUEANTE: diff `src/pages/` = solo DesignSystem.jsx (ninguna página pública rediseñada)**.
  - Forensia de tests: 0 skip/only/todo, 0 assertions débiles, +12 ficheros de test exactos.
  - Gates ejecutados de verdad: `npm test` 381/381 (71 ficheros) · `lint` 0 errores/16 warnings · `build` OK · `test:visual` 41/41.
  - Producción: bayona-jet.vercel.app sirve el build de HEAD (hash asset idéntico), canonical/OG/sitemap(14)/robots intactos, precios y WhatsApp vivos.
- **Resultado:** tabla 30 afirmaciones → 29 CONFIRMADO · 1 PARCIALMENTE CONFIRMADO · 0 CONTRADICHO · 0 NO VERIFICABLE.
- **Contradicciones:** `gsap` en package.json resuelto como deuda muerta PREEXISTENTE a Fase 1 (0 imports, clasificada en BASELINE.md) — no contradice "sin GSAP añadido". Contradicción de definición de Fase 6 → registrada en DECISIONS DF-006.
- **Riesgos:** OBS-1 (shell estático del embudo sin meta noindex; protegido por robots Disallow + meta client-side) · OBS-2 (soft-404 HTTP 200).
- **Conclusión / veredicto único:** **✅ C — APROBADA.**
- **Documento completo:** `docs/AUDITORIA-FORENSE-FASES-1-5.md` (incluye plan maestro de 175 tareas, hoy insumo histórico según DF-006).
- **Siguiente acción:** sincronización documental (entrada 003) y espera de confirmación de DF-006.

## Entrada 003 — Sincronización documental V1.0
- **Fecha:** 2026-08-27 · **Commit auditado:** `70606dd` (pre-commit documental) · **Rama:** main
- **Objetivo:** primera ejecución del PROMPT MAESTRO DE SINCRONIZACIÓN DOCUMENTAL V1.0: el repo pasa a ser la fuente operativa central.
- **Comprobaciones:** git status/branch/log/rev-parse/diff limpios y coincidentes con origin/main; inventario de 20 docs raíz + README; localización de TODAS las definiciones de Fase 6 en el repo (unánimes: World Building; la definición "migración" no existe en el repo); verificación de DP-1…DP-5 en FASE2-CIERRE.md y FASE4-ARQUITECTURA-EXPERIENCIA.md §3.1; gates re-verificados (test/lint sobre el mismo HEAD sin cambios de código).
- **Resultado:** creado `docs/` con el sistema central (PROJECT-STATE, ROADMAP, DECISIONS, ARCHITECTURE, AUDIT-LOG, HANDOFF) + copia canónica de la auditoría forense; documentación de fase intacta en raíz (centralizar sin romper); AUDITORIA_2026-08-25.md marcado HISTÓRICO.
- **Contradicciones:** DF-006 registrada con evidencia y resolución propuesta (World Building).
- **Riesgos:** sin nuevos riesgos; OBS-1/OBS-2 siguen en ROADMAP como endurecimiento.
- **Conclusión:** estado documental autocontenido establecido; ningún código funcional modificado.
- **Siguiente acción:** confirmación de DF-006 por Sebastián → plan operativo de Fase 6 sobre la estructura de 5 bloques de ChatGPT.

## Entrada 004 — Sincronización final de referencias (post-auditoría independiente)
- **Fecha:** 2026-08-27 · **Commit de partida:** `2de0a6c` (= origin/main, árbol limpio) · **Rama:** main
- **Objetivo:** corrección de la inconsistencia detectada por la auditoría independiente de ChatGPT sobre GitHub: PROJECT-STATE/HANDOFF declaraban `70606dd` como HEAD actual cuando el HEAD real ya era `2de0a6c` (commit que creó el propio sistema documental).
- **Comprobaciones:** `git fetch` + `rev-parse HEAD`/`origin/main` = `2de0a6c` idénticos; grep de todas las referencias a HEAD/70606dd/2de0a6c en `docs/`; clasificación de cada referencia en desactualizada vs. históricamente correcta.
- **Resultado:** corregidas SOLO las referencias que declaraban estado actual (PROJECT-STATE identificación —ahora distingue último commit de código `70606dd` vs. último commit documental `2de0a6c` + esta sincronización— y HANDOFF). Las menciones de `70606dd` en AUDITORIA-FORENSE-FASES-1-5.md, AUDIT-LOG 002/003, ROADMAP (commits de Fase 5) y gates se conservan por ser históricamente exactas (commit auditado / rango de fase / estado de código sobre el que se ejecutaron los gates). Entradas anteriores intactas (append-only).
- **DF-006:** definición vigente mantenida = FASE 6 WORLD BUILDING, estructura de 5 bloques aprobada provisionalmente; decisión sigue PENDIENTE de confirmación explícita de Sebastián (no cerrada por el agente).
- **Riesgos:** ninguno nuevo.
- **Conclusión:** el sistema documental describe ahora el estado real del repo; ningún código funcional modificado (diff limitado a `docs/`).
- **Commit:** el commit documental de sincronización que contiene esta entrada (inmediato posterior a `2de0a6c`, solo `docs/`); verificable con `git log`.
- **Siguiente acción:** auditoría de ChatGPT sobre el repo actualizado → preparación del Prompt Maestro de Fase 6 si procede.

## Entrada 005 — Registro de confirmación DF-006 + pre-vuelo de Fase 6
- **Fecha:** 2026-08-27 · **Commit de partida:** `bfcf6b4` (= origin/main, árbol limpio, 0 commits por delante) · **Rama:** main
- **Objetivo:** PASO A/B del PROMPT MAESTRO — FASE 6 · WORLD BUILDING V1.0 (§33): pre-auditoría real, verificación de la autorización de DF-006 (§25) y aplicación de la convención de referencias dictada por el auditor.
- **Comprobaciones:** `git fetch` + `rev-parse HEAD`/`origin/main` = `bfcf6b4` idénticos, árbol limpio; D-004 (push directo) vigente en este documento; inventario real de rutas = 17 públicas + alias `/entrar` + 404 + interna `/design-system` (ROUTES.md coincide con `routeMeta.js`); lectura documental obligatoria completada (docs/ central + 10 docs de fase + fuentes de identidad BAYONA_CONTEXT_DOCUMENTS); mapa de vocabulario del engine verificado contra el código (intensidades quiet/balanced/immersive, 8 recetas, MOTION_BUDGETS hero/body/supporting/cta/background, SECTION_RANGES traverse/enter/pin/exit, tokens de duración/easing/distancia, escala `--ds-*`).
- **DF-006:** existe confirmación explícita posterior de Sebastián — (1) su instrucción "dale, avancemos" citada en el veredicto del auditor; (2) veredicto de ChatGPT sobre `bfcf6b4`: "🟢 B — APROBADA PARA AVANZAR" y "Confirmamos DF-006 así: DF-006 APROBADA: FASE 6 = WORLD BUILDING" con regla absoluta documental; (3) entrega por Sebastián del PROMPT MAESTRO FASE 6 V1.0. Según protocolo §25, se registra: **DF-006 → APROBADA** en DECISIONS.md (traza completa allí).
- **Convención de referencias aplicada (veredicto ChatGPT):** los documentos versionados ya no congelan el "HEAD actual"; registran commit auditado, último commit de código (`70606dd`), commits documentales y fecha. El estado vivo se comprueba con Git. PROJECT-STATE y HANDOFF actualizados a esta convención.
- **Resultado:** DF-006 APROBADA y registrada; PROJECT-STATE (identificación, fases, pendientes, prohibiciones), ROADMAP (Fase 6, reglas) y HANDOFF actualizados; entradas anteriores intactas (append-only).
- **Riesgos:** ninguno nuevo; sin cambios de código (diff limitado a `docs/`).
- **Commit:** el commit documental que contiene esta entrada (inmediato posterior a `bfcf6b4`, solo `docs/`); verificable con `git log`.
- **Siguiente acción:** PLAN OPERATIVO FINAL DE FASE 6 presentado para auditoría (ChatGPT) y aprobación (Sebastián) → PASO F: STOP hasta el OK.

## Entrada 006 — Plan operativo de Fase 6 subido al repo
- **Fecha:** 2026-08-27 · **Commit de partida:** `d8fd587` (= origin/main, árbol limpio) · **Rama:** main
- **Objetivo:** instrucción explícita de Sebastián: "TODOS LOS DOCUMENTOS QUE HAGAS TAMBIÉN SUBELOS A GIT" → el plan operativo no podía vivir solo fuera del repo.
- **Resultado:** creado `PLAN-FASE-6-WORLD-BUILDING.md` en la raíz (ubicación canónica; misma convención que la documentación de fase). PROJECT-STATE (documentos principales) y HANDOFF lo referencian. La copia de trabajo en la carpeta del grupo queda como redundante (solo para pegar en el chat de auditoría). Entradas anteriores intactas (append-only).
- **Regla permanente registrada:** todo documento que cree el agente se versiona en Git.
- **Riesgos:** ninguno; sin cambios de código (diff = 1 .md nuevo + referencias en docs/).
- **Siguiente acción:** sin cambios — auditoría de ChatGPT del plan + aprobación de Sebastián → implementación por bloques (commits 1–5 del plan).

## Entrada 007 — Auditoría del plan (veredicto ChatGPT) + checkpoint de verificación V2.0 (PASOS 1–3)
- **Fecha:** 2026-08-27 · **Commit auditado:** `046a37c` (= origin/main, verificado en local y en GitHub) · **Rama:** main
- **Objetivo:** (1) veredicto del auditor sobre `046a37c`: "🟢 APROBADO PARA AVANZAR, con correcciones obligatorias al plan antes de implementar"; (2) checkpoint ordenado por el auditor: revisar el estado real de Git, comparar con lo declarado, verificar `046a37c` en origin/main, leer el plan, auditar el estado documental/técnico, detectar contradicciones y corregir el plan solo donde la evidencia del repo lo exige; (3) ejecutar de verdad los PASOS 1–3 del PROMPT MAESTRO V2.0 (nuevo prompt rector, entregado por Sebastián).
- **Comprobaciones reales (no copiadas):** `git fetch` + `rev-parse` → HEAD local = origin/main = `046a37c`, árbol limpio, 0 commits por delante/detrás; cadena de commits verificada (70606dd código → 2de0a6c → bfcf6b4 → d8fd587 → 046a37c docs); gates re-ejecutados de verdad sobre `046a37c`: **npm test 71/71 archivos · 381/381 tests (36.63 s)** · **npm run lint 0 errores · 16 warnings** · **npm run build OK (built in 12.03 s; vendor-three 826.94 kB, gzip 222.32 kB)** · **npm run test:visual 41 passed (3.6 min)**; re-verificación fuente-a-fuente: 8 recetas en `engine/recipes/index.js`, intensidades quiet/balanced/immersive, presupuestos hero 3/body 2/supporting 1/cta 2/background 0, SECTION_RANGES traverse/enter/pin/exit, 4 planes (RAIZ/FUERZA/RENDIMIENTO/ELITE) → 4 rutas `/plan/*`; 3D: Globe3D única escena viva (montada en `/about` vía GlobeTestimonials, About.jsx:194), sceneRegistry con una sola variante (`signature`) no montada en ninguna página, ningún PageHero recibe prop `scene`.
- **Contradicción detectada y resuelta (documental):** el número "17" designaba dos conjuntos distintos según la fuente — `ROUTE_META` (17 claves = 16 canónicas + 1 interna) vs. contrato de baseline (17 = 16 canónicas + 1 alias `/entrar`). Resuelta en el plan §0.2 con el inventario normalizado por categorías: A. 16 rutas públicas canónicas (14 indexables + 2 embudo noindex) / B. 1 alias (`/entrar` → `/onboarding`) / C. fallback 404 (`NOT_FOUND_META`) / D. 1 interna (`/design-system`). Vinculante para D-01 y para la sección COBERTURA DEL DOCUMENTO de PAGE-BLUEPRINTS.
- **Correcciones obligatorias aplicadas al plan (las 4 del veredicto + derivados):** (1) números de gate marcados HISTÓRICOS hasta re-ejecución real, con la baseline real de esta entrada registrada; (2) re-lectura de fuentes en el momento de implementar; (3) contrato de alcance exacto — 0 cambios de producción, tests documentales permitidos sin runtime/bundle/deps/skip/only; (4) categorías de ruta normalizadas antes de D-01. Además: relaciones estado↔engine declaradas conceptuales (no APIs), D-07 dividido en parte estructural automatizable + revisión humana (sin falsificar prueba), tabla de commits actualizada (0.5 y 0.6), plan marcado AUDITADO/APROBADO con V2.0 como prompt rector.
- **Registro de decisión:** D-008 en DECISIONS.md (plan aprobado con correcciones; V2.0 prompt rector; STOP antes del BLOQUE 1).
- **Resultado:** plan corregido en el propio repo; docs centrales actualizados (PROJECT-STATE, ROADMAP, HANDOFF, DECISIONS, este log). Ningún código de producción modificado (diff = plan .md + docs/). Entradas anteriores intactas (append-only).
- **Riesgos:** ninguno nuevo.
- **Siguiente acción:** STOP antes del BLOQUE 1 — el auditor revisa este informe de verificación con Sebastián; tras el OK, implementación por bloques según V2.0 §32.

## Entrada 008 — FASE 6 · BLOQUE 1 ejecutado: BAYONA-WORLD-BIBLE.md PARTE I (ADN VISUAL)
- **Fecha:** 2026-08-28 · **Commit de partida:** `a808e5e` (= origin/main, verificado con `git fetch` + `rev-parse`, árbol limpio, 0 commits por delante) · **Rama:** main
- **Autorización:** doble veredicto del auditor entregado por Sebastián: "🟢 APROBADO PARA EMPEZAR LA FASE 6 — BLOQUE 1" y "🟢 AUTORIZADO: INICIAR ÚNICAMENTE EL BLOQUE 1 DE FASE 6". El STOP previo "ya ha cumplido su función"; sin nuevo checkpoint burocrático. Secuencia mandatada ejecutada: PRE-FLIGHT → VERIFICACIÓN DE BASE → LECTURA DE FUENTES → BLOQUE 1 → AUTOAUDITORÍA → GATES → COMMIT → PUSH → VERIFICACIÓN → INFORME → STOP ABSOLUTO.
- **Pre-flight real:** HEAD local = origin/main = `a808e5e`, árbol limpio, 0 commits posteriores (comprobado con Git, no asumido).
- **Relectura de fuentes (sin modificar ninguna):** docs de fase (MOTION-MAP, SCROLL-STORY-MATRIX, PAGE-EXPERIENCE-MATRIX, ROUTE-JOURNEYS, PHASE5-MOTION-ENGINE, DESIGN-SYSTEM, FASE3-VEREDICTO, FASE4-ARQUITECTURA), identidad (BAYONA_05_DOCUMENTO_MAESTRO §6–7, CONTEXTO-MAESTRO-CONTINUIDAD §0/§33–45), código (`ds-tokens.css`, `motionTokens.js`, `intensity.js`, `motionBudget.js`, `offerings.js`, `conversionContent.js`, `chapters.js`, `testimonials.js`, `site.config.js`, `routeMeta.js`, `shopCatalog.js`).
- **Verificación crítica de los 10 principios (mandato del auditor):** sin problema material — se mantienen los 10 de la hipótesis aprobada. Solapamientos evaluados y descartados: humanidad vs acompañamiento (representación vs función), tensión vs recuperación (fases complementarias del ritmo), materia vs profundidad (calidad del plano vs relación entre planos), progresión vs decisión (tiempo largo vs instante). Candidatos a principio 11 evaluados y absorbidos: honestidad/anti-hype → precisión expresiva de D.2 (CLAIM_TYPES); ciencia → precisión + catálogo; método → progresión + acompañamiento; claridad → regla de veto transversal (sección J), no principio. Principio con menor densidad de evidencia: territorio (D.9) — mantenido por evidencia real (presencial-espana-1to1, academia física, WhatsApp 34) y señalado para trato cuidadoso en el Bloque 3. Análisis completo documentado en el propio documento §D.11.
- **Entregable:** `BAYONA-WORLD-BIBLE.md` PARTE I en la raíz (~600 líneas): A. propósito · B. qué es BAYONA (sistema, no eslogan) · C. qué no es (10 prohibiciones con fuente) · D. 10 principios operativos (10 campos cada uno: definición/función/evidencia/traducción visual/espacial/movimiento/riesgo/anti-patrón/corrección/decisión que condiciona) + §D.11 verificación crítica · E. curva emocional maestra (7 estados derivados de J1–J10, 5 clases de curva, 4 estados emocionales) · F. materialidad (literal/sugerida/prohibida) · G. luz (6 tipos sobre tokens existentes, sin tokens nuevos) · H. profundidad (4 tipos, 3D como excepción justificada) · I. densidad/ritmo (compatibilidad explícita con quiet/balanced/immersive y zonas del engine, sin sinónimos) · J. principio de claridad como regla de veto · K. autoauditoría (4 tests con respuestas reales). Etiquetas de evidencia CONFIRMADO/DERIVADO/PROPUESTO/HISTÓRICO en todo el documento.
- **Autoauditoría pre-commit (verificada con grep/diff, no declarada):** sin vocabulario paralelo (calm/intense solo aparecen en la regla que los prohíbe; medium solo como distancia near/medium/far); recetas citadas = ids existentes del engine; tokens citados = `--ds-*` reales (surface-background, shadow-lift, shadow-lift-warm); citas factuales verificadas contra el código (feTurbulence en v3-finish.css; WHATSAPP_NUMBER 34614988006 en site.config.js:22); `git status` = solo el .md nuevo sin trackear; 0 archivos de producción en el diff.
- **Gates re-ejecutados de verdad (2026-08-28, sobre HEAD = `a808e5e`):** **npm test 71/71 archivos · 381/381 tests (35.95 s)** · **npm run lint 0 errores · 16 warnings** · **npm run build OK (built in 16.11 s; vendor-three 826.94 kB, gzip 222.32 kB)** · **npm run test:visual 41 passed (4.0 min)**.
- **Resultado:** documento creado + docs centrales actualizados (PROJECT-STATE, HANDOFF, este log). Ningún código de producción modificado; sin dependencias; sin escenas; sin tests D-01…D-07 (no requeridos aún); DP-5 intacto. Entradas anteriores intactas (append-only).
- **Riesgos:** ninguno nuevo. Señalado en el informe: territorio (D.9) es el principio con menor densidad de evidencia, y la Parte I es propuesta vinculante que aún no gobierna nada hasta la auditoría.
- **Siguiente acción:** STOP ABSOLUTO — auditoría de ChatGPT del BLOQUE 1; solo tras su OK explícito, BLOQUE 2 (gramática espacial). Modelo vigente: BLOQUE N → AUDITORÍA → BLOQUE N+1.

## Entrada 009 — FASE 6 · BLOQUE 2 ejecutado: SPATIAL-LANGUAGE.md (gramática espacial)
- **Fecha:** 2026-08-28 · **Commit de partida:** `3a9f511` (= origin/main, verificado con `git fetch` + `rev-parse`, árbol limpio) · **Rama:** main
- **Autorización:** veredicto del auditor sobre `3a9f511`: "🟢 BLOQUE 1 APROBADO → BLOQUE 2 AUTORIZADO (únicamente)". Condiciones nuevas registradas en DECISIONS.md: **DF-009** (disciplina de evidencia), **DF-010** (territorio no es folclore), **DF-011** (diferenciación real de mundos, gobierna el Bloque 3), **DF-012** (anti-burocracia).
- **Verificación de fuentes:** engine confirmado contra el código — `SECTION_RANGES` traverse/enter/pin/exit (`useSectionProgress.js:30`), `createHandoffSnapshot` congelada + `useScrollHandoff` (`scrollHandoff.js:68/80/109`); journeys J1–J10, MOTION-MAP, SCROLL-STORY-MATRIX, PAGE-EXPERIENCE-MATRIX releídos; recepción inmersiva sin chrome (J2) como evidencia de umbral.
- **Entregable:** `SPATIAL-LANGUAGE.md` en la raíz (~330 líneas): propósito + regla absoluta (la secuencia NO es plantilla mecánica; la claridad gana); 7 estados espaciales (ENTRADA, APROXIMACIÓN, TENSIÓN, INMERSIÓN, DESCUBRIMIENTO, DECISIÓN, SALIDA) cada uno con definición/qué produce/principios del Bloque 1 que expresa/gramática conceptual de movimiento/evidencia; nota: la recuperación es condición de las transiciones, no un octavo estado; transiciones permitidas (17) y prohibidas (6, con razón y evidencia); 5 clases de página con estados estructurales/admitidos/prohibidos + nota de recepción; mobile (los estados persisten, la gramática se simplifica); reduced motion (los estados son espaciales, no temporales); regla absoluta de claridad; autoauditoría con 6 tests reales. Requisito crítico respetado: relaciones con el engine **conceptuales, no APIs** ("puede expresarse mediante" ×9; cero "implementa obligatoriamente").
- **Autoauditoría pre-commit (verificada con grep/diff):** cero afirmaciones de implementación obligatoria; cero vocabulario paralelo (calm/intense solo en la regla que los veta); 8 recetas citadas por id exacto; cero folclore territorial (DF-010); `git status` = solo SPATIAL-LANGUAGE.md nuevo + DECISIONS.md modificado; 0 producción.
- **Gates re-ejecutados de verdad (2026-08-28, sobre HEAD = `3a9f511`):** **npm test 71/71 · 381/381 (37.93 s)** · **lint 0 errores/16 warnings** · **build OK (13.49 s; vendor-three 826.94 kB, gzip 222.32 kB)** · **test:visual 41 passed (3.7 min)**.
- **Resultado:** documento creado + DECISIONS/PROJECT-STATE/HANDOFF actualizados (minimal, DF-012). Ningún código de producción modificado; sin dependencias; sin escenas; sin tests D-01…D-07; DP-5 intacto. Entradas anteriores intactas (append-only).
- **Riesgos:** ninguno nuevo.
- **Siguiente acción:** STOP ABSOLUTO — auditoría de ChatGPT del BLOQUE 2; solo tras OK explícito, BLOQUE 3 (mundos 00–08), que deberá cumplir DF-011 (cinco preguntas de justificación por mundo; mundos intercambiables se fusionan).
