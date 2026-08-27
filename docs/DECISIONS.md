# DECISIONS — BAYONA WEB

> Registro de decisiones arquitectónicas/comerciales. Formato: ID · Fecha · Decisión · Opciones · Elegida · Motivo · Impacto · Estado · Quién aprueba.
> Regla: una decisión pendiente NUNCA se convierte en tomada. Las decisiones cambiadas se conservan (historial) y se registra la nueva.

## D-001 · Dirección estética
- **Fecha:** 2026-08-25 · **Estado:** APROBADA · **Quién:** Sebastián
- **Decisión:** estilo Awwwards-LUXURY en todas las páginas/subpáginas.
- **Impacto:** guía de todas las fases de diseño; capa luxury CSS en Fase 1 (`v3-finish.css`).

## D-002 · Fuente de verdad comercial
- **Fecha:** 2026-08-25 · **Estado:** APROBADA · **Quién:** Sebastián
- **Decisión:** el CATÁLOGO PUBLICADO es la fuente única de verdad; contratos y tests se alinean a él; nunca inventar precios.
- **Opciones:** (a) catálogo publicado, (b) corregir el catálogo. Elegida (a) ("tú corrige el 1").
- **Impacto:** 4 planes canónicos RAÍZ 149k / FUERZA 299k / RENDIMIENTO 499k / ELITE 899k COP.

## D-003 · Dominio canónico
- **Fecha:** 2026-08-26 · **Estado:** APROBADA · **Quién:** Sebastián
- **Decisión:** dominio canónico real = `https://bayona-jet.vercel.app` (SITE_URL en `src/config/site.config.js`).
- **Impacto:** canonical, OG, sitemap y robots apuntan a este dominio. `sebasbayona.co` NXDOMAIN preexistente (sin acción).

## D-004 · Política de push
- **Fecha:** 2026-08-26 · **Estado:** APROBADA · **Quién:** Sebastián
- **Decisión:** push directo a origin/main autorizado dentro del plan aprobado; sustituye la regla anterior de "solo commits locales".
- **Historial:** la regla original (2026-08-25) era local-only; queda conservada aquí como superada.

## D-005 · Decisiones de Design System (Fase 3)
- **Fecha:** 2026-08-27 · **Estado:** CERRADA · **Quién:** Sebastián (con veredicto del auditor)
- **Decisión:** escala tipográfica v2 adoptada; dualidad de radios 0/10/16; cursor único de anillo con gate de capacidades.
- **Impacto:** base del sistema visual; detalle en DESIGN-SYSTEM.md §15.

## DP-1…DP-4 · Decisiones pendientes de Fase 2 → CERRADAS en Fase 4
- **Origen:** FASE2-CIERRE.md · **Resolución:** FASE4-ARQUITECTURA-EXPERIENCIA.md §3.1.
- **DP-1 (PDFs sin CTA):** CERRADO como REFERENCE — los PDFs son material de referencia; regeneración de contenido diferida a Fase 14.
- **DP-2 (presentationUrl muerto):** CERRADO — `plan.presentationUrl` se enlaza en la ficha de plan.
- **DP-3 (/checkout huérfano):** CERRADO — entradas reales al Configurador desde fichas de plan y Programs.
- **DP-4 (RecommendationGuide sin montar):** CERRADO como MERGE — la orientación vive en el embudo de recepción; componente conservado como activo verificado sin montar.

## DP-5 · ELITE "acceso de por vida"
- **Fecha:** abierta desde Fase 2 (2026-08-26) · **Estado:** **PENDIENTE** · **Quién:** Sebastián (comercial/legal)
- **Decisión pendiente:** el plan ELITE publica "Acceso de por vida al contenido"; el contrato histórico vetaba claims de por vida (veto relajado temporalmente con comentario explicativo en offerings.test.js).
- **Opciones consideradas:** (a) mantener el claim, (b) reformularlo con límite temporal, (c) retirarlo.
- **Regla:** NO convertir en decisión tomada; NO tocar hasta que Sebastián resuelva.

## DF-006 · Definición de Fase 6 (contradicción registrada → RESUELTA)
- **Fecha:** 2026-08-27 · **Estado:** **APROBADA — FASE 6 = WORLD BUILDING** · **Quién:** Sebastián (confirmación explícita, ver traza abajo)
- **Definición aprobada:** FASE 6 = WORLD BUILDING, con la estructura de 5 bloques de ChatGPT. La migración/rediseño de páginas NO pertenece a Fase 6; queda asignada a Fase 8.
- **Traza de la confirmación explícita (2026-08-27):**
  1. Dirección de Sebastián: "dale, avancemos" (citada en el veredicto de ChatGPT como su instrucción para avanzar).
  2. Veredicto de ChatGPT (auditor del pipeline) sobre la sincronización `bfcf6b4`: "🟢 B — APROBADA PARA AVANZAR" y "Confirmamos DF-006 así: **DF-006 APROBADA: FASE 6 = WORLD BUILDING**", con la estructura de 5 bloques y la regla absoluta: "Fase 6 es documental y estratégica. No se rediseñan todavía las páginas públicas. No se implementan escenas 3D nuevas. No se migra código visual."
  3. Sebastián entregó a continuación el PROMPT MAESTRO — FASE 6 · WORLD BUILDING V1.0 para su ejecución (orden §33: pre-auditoría → verificación de DF-006 → lectura → vocabulario → PLAN OPERATIVO → STOP antes de implementar).
  4. Registrada en este documento por el agente según el protocolo de sincronización §25 ("Si existe confirmación explícita posterior: regístrala según el protocolo").
- **Contradicción:** dos líneas de planificación definen Fase 6 de forma distinta:
  - (A) **WORLD BUILDING** — dirección espacial/narrativa/visual, mundos, gramática espacial, blueprints. Sin tocar páginas públicas.
  - (B) **Migración/rediseño de páginas** — aparecía solo en la plantilla del PROMPT MAESTRO de auditoría pegado el 2026-08-27.
- **Evidencia reunida (protocolo §14):**
  1. Documentos del repo (todos coinciden en A): CONTEXTO-MAESTRO-CONTINUIDAD.md:81 y §53 ("FASE 6 — World Building por página"), FASE3-VEREDICTO.md:131, SCROLL-STORY-MATRIX.md:5/43 (Fase 6 World Building, Fase 8 migración), PHASE5-MOTION-ENGINE.md §14 "Handoff exacto a Fase 6" (World Building).
  2. Veredicto de ChatGPT (auditor del pipeline, 2026-08-27): "🟢 FASE 5 APROBADA" → Fase 6 = WORLD BUILDING; y lectura posterior del mismo día: confirma World Building y ajusta la estructura a 5 bloques estratégicos (ADN visual → gramática espacial → mundos 00–08 → blueprints → matriz de decisión), con documentos BAYONA-WORLD-BIBLE.md / BAYONA-WORLD-FOUNDATION.md, SPATIAL-LANGUAGE.md, PAGE-BLUEPRINTS.md, WORLD-3D-STRATEGY.md y regla "EL 3D NO ES UN ESTILO".
  3. La definición (B) no aparece en ningún documento del repo; existe solo en la plantilla de auditoría.
- **Resolución aplicada:** Fase 6 = **WORLD BUILDING** (opción A), con la estructura ajustada de ChatGPT. La migración de páginas es la Fase 8 del roadmap.
- **Plan 175 tareas (informe de auditoría 2026-08-27):** queda como insumo HISTÓRICO; el plan operativo de Fase 6 se reescribe sobre la estructura de 5 bloques (PROMPT MAESTRO FASE 6 V1.0).
- **Regla vigente:** la IMPLEMENTACIÓN de Fase 6 requiere la aprobación previa del PLAN OPERATIVO FINAL (PROMPT MAESTRO FASE 6 §33 PASO F: STOP Y ESPERA APROBACIÓN). Fase 6 es 100% documental y estratégica.

## D-007 · Sistema documental central
- **Fecha:** 2026-08-27 · **Estado:** APROBADA · **Quién:** Sebastián (vía PROMPT MAESTRO V1.0)
- **Decisión:** el repo es la fuente operativa central; docs centrales en `docs/` (PROJECT-STATE, ROADMAP, DECISIONS, ARCHITECTURE, AUDIT-LOG, HANDOFF); documentación de fase existente se queda en la raíz (centralizar sin romper); sin duplicados; historial append-only.
- **Impacto:** este documento y el resto de `docs/`; dinámica futura = leer PROJECT-STATE → HANDOFF → ROADMAP → DECISIONS → docs de fase → Git.

## D-008 · Plan operativo de Fase 6 aprobado con correcciones (auditoría ChatGPT)
- **Fecha:** 2026-08-27 · **Estado:** APROBADA · **Quién:** ChatGPT (auditor del pipeline, veredicto sobre `046a37c`) + Sebastián (entrega del PROMPT MAESTRO V2.0 como norma de ejecución)
- **Decisión:** el PLAN OPERATIVO FINAL DE FASE 6 (`PLAN-FASE-6-WORLD-BUILDING.md`, commit `046a37c`) queda **APROBADO PARA AVANZAR con correcciones obligatorias**, ya incorporadas en el plan:
  1. Los números de gate (381/381 · 0/16 · 41/41) son HISTÓRICOS: todo gate se re-ejecuta de verdad en su momento; prohibido copiarlos sin ejecución actual.
  2. El agente re-lee los archivos fuente exactos en el momento de implementar (no trabaja de memoria).
  3. Contrato de alcance exacto: "Fase 6 puede añadir código de test exclusivamente para validar documentación, pero no puede modificar código de producción" (0 cambios de producción; tests documentales sin runtime/bundle/deps/skip/only).
  4. Inventario de rutas normalizado por categorías antes de D-01 (A. 16 públicas canónicas / B. 1 alias / C. fallback 404 / D. 1 interna) — resuelve la ambigüedad del doble "17".
- **Prompt rector:** PROMPT MAESTRO V2.0 (sustituye a V1.0 como norma de ejecución; V1.0 queda como origen del plan).
- **Checkpoint de verificación (PASOS 1–3 de V2.0):** ejecutado de verdad el 2026-08-27 sobre `046a37c` — HEAD = origin/main confirmado, gates re-ejecutados (381/381 · 0 errores/16 warnings · build OK vendor-three 826.94 kB · 41/41 E2E), inventario normalizado documentado en el plan §0.2. Sin contradicciones materiales.
- **Regla vigente:** STOP antes del BLOQUE 1 hasta que el auditor revise el informe de verificación con Sebastián. Después: implementación por bloques según V2.0 §32, con condiciones de parada BLOQUEADO—DECISIÓN REQUERIDA (V2.0 §33).
