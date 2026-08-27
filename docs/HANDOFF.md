# HANDOFF — BAYONA WEB

> Corto y operativo. Permite a otro agente continuar SIN leer conversaciones. Orden de lectura completo: PROJECT-STATE → HANDOFF → ROADMAP → DECISIONS → docs de fase → Git.

## ¿Qué acaba de ocurrir? (2026-08-27)
1. Auditoría forense de Fases 1–5 sobre `70606dd`: veredicto **✅ C APROBADA** (29/30 CONFIRMADO, 1 PARCIALMENTE CONFIRMADO, 0 CONTRADICHO). Gates ejecutados de verdad: 381/381 tests, lint 0/16, build OK, 41/41 Playwright. Producción = build de HEAD.
2. Primera sincronización documental V1.0: creado `docs/` con el sistema central; documentación de fase intacta en raíz.

## ¿Qué está confirmado?
- HEAD `70606dd` = origin/main, árbol limpio (pre-commit documental).
- Fases 1–5 reales y aprobadas; ninguna página pública rediseñada en Fase 5.
- Contratos comerciales y SEO vivos en producción (precios, WhatsApp, canonical, sitemap 14, robots).
- Definición de Fase 6 en el repo: UNÁNIME = World Building (CONTEXTO-MAESTRO §53, FASE3-VEREDICTO, SCROLL-STORY-MATRIX, PHASE5 §14).

## ¿Qué está pendiente?
- **DF-006:** confirmación final de Sebastián de Fase 6 = WORLD BUILDING (propuesta con evidencia; estructura de 5 bloques de ChatGPT en ROADMAP).
- **DP-5:** ELITE "acceso de por vida" (comercial/legal, solo Sebastián).
- Endurecimientos OBS-1/OBS-2 y deuda muerta (ROADMAP, programados para su fase).

## ¿Qué NO debo tocar?
- Precios, WhatsApp, catálogo, dominio, SEO global, sitemap, robots, rutas públicas, checkout, copy contractual.
- Resolución de DP-5 y DF-006 (son de Sebastián).
- Implementar Fase 6 / rediseñar páginas / escenas 3D nuevas / Fase 7–8 sin plan aprobado.
- Añadir motion libs o GSAP; skip/only en tests.

## ¿Qué debo revisar antes de actuar?
`git status` + `git rev-parse HEAD` vs origin/main → este HANDOFF → PROJECT-STATE → DECISIONS (DF-006, DP-5) → ROADMAP.

## ¿Cuál es el siguiente paso?
Esperar confirmación de DF-006. Si se confirma World Building: producir el PLAN de Fase 6 sobre los 5 bloques de ChatGPT (ADN visual → gramática espacial → mundos 00–08 → blueprints → matriz de decisión) y STOP antes de implementar.

## ¿Qué tests debo ejecutar?
`npm test` · `npm run lint` · `npm run build` · `npm run test:visual` (baseline verde: 381/381 · 0/16 · OK · 41/41).

## ¿Dónde está la documentación?
- Central: `docs/` (este directorio).
- De fase: raíz del repo (convención consolidada, no mover).
- Auditoría forense completa: `docs/AUDITORIA-FORENSE-FASES-1-5.md`.
