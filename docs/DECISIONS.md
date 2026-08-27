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

## DF-006 · Definición de Fase 6 (contradicción registrada)
- **Fecha:** 2026-08-27 · **Estado:** **PENDIENTE DE CONFIRMACIÓN FINAL** · **Quién:** Sebastián
- **Contradicción:** dos líneas de planificación definen Fase 6 de forma distinta:
  - (A) **WORLD BUILDING** — dirección espacial/narrativa/visual, mundos, gramática espacial, blueprints. Sin tocar páginas públicas.
  - (B) **Migración/rediseño de páginas** — aparecía solo en la plantilla del PROMPT MAESTRO de auditoría pegado el 2026-08-27.
- **Evidencia reunida (protocolo §14):**
  1. Documentos del repo (todos coinciden en A): CONTEXTO-MAESTRO-CONTINUIDAD.md:81 y §53 ("FASE 6 — World Building por página"), FASE3-VEREDICTO.md:131, SCROLL-STORY-MATRIX.md:5/43 (Fase 6 World Building, Fase 8 migración), PHASE5-MOTION-ENGINE.md §14 "Handoff exacto a Fase 6" (World Building).
  2. Veredicto de ChatGPT (auditor del pipeline, 2026-08-27): "🟢 FASE 5 APROBADA" → Fase 6 = WORLD BUILDING; y lectura posterior del mismo día: confirma World Building y ajusta la estructura a 5 bloques estratégicos (ADN visual → gramática espacial → mundos 00–08 → blueprints → matriz de decisión), con documentos BAYONA-WORLD-BIBLE.md / BAYONA-WORLD-FOUNDATION.md, SPATIAL-LANGUAGE.md, PAGE-BLUEPRINTS.md, WORLD-3D-STRATEGY.md y regla "EL 3D NO ES UN ESTILO".
  3. La definición (B) no aparece en ningún documento del repo; existe solo en la plantilla de auditoría.
- **Resolución propuesta:** Fase 6 = **WORLD BUILDING** (opción A), con la estructura ajustada de ChatGPT. La migración de páginas es la Fase 8 del roadmap.
- **Plan 175 tareas (informe de auditoría 2026-08-27):** queda como insumo HISTÓRICO; si se confirma World Building, el plan operativo se reescribe sobre la estructura de 5 bloques de ChatGPT.
- **Regla vigente:** NO implementar Fase 6 hasta confirmación explícita de Sebastián (protocolo §14.8 y §31).

## D-007 · Sistema documental central
- **Fecha:** 2026-08-27 · **Estado:** APROBADA · **Quién:** Sebastián (vía PROMPT MAESTRO V1.0)
- **Decisión:** el repo es la fuente operativa central; docs centrales en `docs/` (PROJECT-STATE, ROADMAP, DECISIONS, ARCHITECTURE, AUDIT-LOG, HANDOFF); documentación de fase existente se queda en la raíz (centralizar sin romper); sin duplicados; historial append-only.
- **Impacto:** este documento y el resto de `docs/`; dinámica futura = leer PROJECT-STATE → HANDOFF → ROADMAP → DECISIONS → docs de fase → Git.
