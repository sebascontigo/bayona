# ROADMAP — BAYONA WEB

> Mapa de fases. Estado a 2026-08-27. Detalle forense en docs/AUDIT-LOG.md; decisiones en docs/DECISIONS.md.

## Fases completadas (VERIFIED)

| Fase | Nombre | Commits | Cierre |
|---|---|---|---|
| 1 | Baseline y estabilización | `8e67cd2`, `626d98b` | 2026-08-26 · 8 docs de baseline · SSoT WhatsApp · dominio canónico · SceneErrorBoundary |
| 2 | Integridad comercial | `38a51d0`, `6d9b8e6` | 2026-08-26 · radiogroup · contratos commercialSync · DP-1…DP-5 identificadas |
| 3 | Design System 2.0 | `b962cd4`, `f7f3e69`, `8a1656c`, `330df93` | 2026-08-27 · tokens + 11 componentes ds/ · cursor único · playground /design-system |
| 4 | Arquitectura de experiencia | `c9448c4` | 2026-08-27 · navegación por grupos · breadcrumb · Configurador · DP-1…DP-4 cerradas |
| 5 | Motion Engine 2.0 + Scroll Storytelling | `3cdaa19..70606dd` (7) | 2026-08-27 · tokens extendidos · scroll narrativo · componentes · 8 recetas · MotionDebug · aprobada forensemente (veredicto C) |

## Fase 6 — definición vigente: WORLD BUILDING (estructura de 5 bloques aprobada provisionalmente; confirmación final pendiente — DF-006)

**Definición vigente (aprobada provisionalmente por ChatGPT 2026-08-27; evidencia unánime del repo): WORLD BUILDING.** La migración/rediseño de páginas NO pertenece a Fase 6; queda asignada a Fase 8.

Estructura ajustada por ChatGPT (sustituye al plan de 175 tareas del informe de auditoría, que queda como insumo histórico):

1. **BLOQUE 1 — ADN visual de BAYONA** → `BAYONA-WORLD-FOUNDATION.md` / documento maestro `BAYONA-WORLD-BIBLE.md`: qué NO es BAYONA, qué SÍ es (energía, disciplina, humanidad, movimiento, progresión, precisión, acompañamiento, territorio, cuerpo, materia, comunidad); principios, emociones, materialidad, luz, profundidad, densidad, ritmo, tipografía, fotografía, movimiento.
2. **BLOQUE 2 — Gramática espacial** → `SPATIAL-LANGUAGE.md`: la web como Entrada → aproximación → tensión → inmersión → descubrimiento → decisión → salida (no "sección → contenido → CTA").
3. **BLOQUE 3 — Mundos 00–08** (construidos desde la identidad real y las rutas existentes, no copiados): cada mundo con función narrativa, emoción, materialidad, movimiento, profundidad, sonido visual, uso permitido y antiuso. Nombres conceptuales de partida: 00 ORIGEN · 01 CUERPO · 02 MÉTODO · 03 MOVIMIENTO · 04 EXPERIENCIA · 05 COMUNIDAD · 06 CONOCIMIENTO · 07 DECISIÓN · 08 CONTINUIDAD.
4. **BLOQUE 4 — Blueprints de página** → `PAGE-BLUEPRINTS.md`: las 17 rutas (mundo, intensidad, motion, 3D, objetivo). Regla: no todas las páginas deben ser espectaculares; en conversión la estética sirve a la claridad.
5. **BLOQUE 5 — Matriz de decisión** → tabla Ruta × Mundo × Intensidad × Motion × Sticky × Horizontal × 3D, previa a cualquier código.
- **Regla transversal:** EL 3D NO ES UN ESTILO → `WORLD-3D-STRATEGY.md` (dónde sí, dónde no, presupuesto, fallback, móvil, reduced-motion, degradación, rendimiento).
- **Naturaleza:** 100% documental. CERO código de páginas, CERO escenas 3D nuevas, CERO dependencias.
- **STOP:** al terminar, auditoría de ChatGPT antes de Fase 7.

## Fases futuras (según documentación vigente; DECLARED)

| Fase | Alcance | Fuente |
|---|---|---|
| 7 | Handoff 3D real: escenas que reciben/devuelven `createHandoffSnapshot()` | PHASE5-MOTION-ENGINE.md §14 |
| 8 | Migración de páginas página a página (aplicar mundos + blueprints) | SCROLL-STORY-MATRIX.md, veredicto ChatGPT |
| 14 | Regeneración de contenido de PDFs (decisión D8 de Fase 4) | FASE4-ARQUITECTURA-EXPERIENCIA.md |

## Endurecimiento técnico (derivado de auditoría 2026-08-27; programar en su fase)

- **OBS-1:** emitir shell HTML con meta noindex para rutas de embudo (mecanismo vía emitRouteHtml).
- **OBS-2:** status HTTP 404 real para rutas inexistentes (vercel.json) manteniendo NotFound.
- Retirada de dependencias muertas clasificadas en BASELINE.md (incl. gsap) — con orden seguro y tests.
- Lint warnings 16 → 0.
- Estrategia de code-splitting para vendor-three (826 kB) si Fase 7 añade escenas.

## Reglas del roadmap

- Una fase a la vez (PLAN MAESTRO + FASE ACTUAL); STOP al terminar cada fase; auditoría externa antes de la siguiente.
- Ninguna fase arranca sin plan aprobado; ninguna decisión pendiente (DP-5, DF-006) se resuelve por el agente.
