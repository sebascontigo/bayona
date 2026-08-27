# HANDOFF — BAYONA WEB

> Corto y operativo. Permite a otro agente continuar SIN leer conversaciones. Orden de lectura completo: PROJECT-STATE → HANDOFF → ROADMAP → DECISIONS → docs de fase → Git.

## ¿Qué acaba de ocurrir? (2026-08-27)
1. Auditoría forense de Fases 1–5 sobre `70606dd`: veredicto **✅ C APROBADA** (29/30 CONFIRMADO, 1 PARCIALMENTE CONFIRMADO, 0 CONTRADICHO). Gates ejecutados de verdad: 381/381 tests, lint 0/16, build OK, 41/41 Playwright. Producción = build de HEAD.
2. Primera sincronización documental V1.0: creado `docs/` con el sistema central (commit `2de0a6c`); documentación de fase intacta en raíz.
3. Sincronización final post-auditoría independiente de ChatGPT: referencias actualizadas (commit `bfcf6b4`, AUDIT-LOG entrada 004). ChatGPT: "🟢 B — APROBADA PARA AVANZAR".
4. **DF-006 APROBADA** (confirmación explícita de Sebastián vía veredicto ChatGPT + entrega del PROMPT MAESTRO FASE 6): FASE 6 = WORLD BUILDING. Pre-vuelo de Fase 6 ejecutado (HEAD = origin/main, árbol limpio); PLAN OPERATIVO FINAL presentado, esperando aprobación (AUDIT-LOG entrada 005).

## ¿Qué está confirmado?
- Último commit de código `70606dd` (Fase 5); commits posteriores solo documentales (`2de0a6c`, `bfcf6b4`, registro DF-006). Estado vivo: comprobar con `git rev-parse HEAD` (convención: no congelar HEAD vivo en docs).
- Fases 1–5 reales y aprobadas; ninguna página pública rediseñada en Fase 5.
- Contratos comerciales y SEO vivos en producción (precios, WhatsApp, canonical, sitemap 14, robots).
- **FASE 6 = WORLD BUILDING** (DF-006 APROBADA; 100% documental: cero código de páginas, cero 3D nuevo, cero dependencias).

## ¿Qué está pendiente?
- **Aprobación del PLAN OPERATIVO FINAL de Fase 6** (auditoría ChatGPT + OK de Sebastián) → luego implementar los 5 bloques.
- **DP-5:** ELITE "acceso de por vida" (comercial/legal, solo Sebastián; fuera de Fase 6).
- Endurecimientos OBS-1/OBS-2 y deuda muerta (ROADMAP, programados para su fase).

## ¿Qué NO debo tocar?
- Precios, WhatsApp, catálogo, dominio, SEO global, sitemap, robots, rutas públicas, checkout, copy contractual.
- Resolución de DP-5 (es de Sebastián).
- Rediseñar páginas / componentes de producción / escenas 3D nuevas / dependencias durante Fase 6 (es documental); Fase 7–8 sin plan aprobado.
- Añadir motion libs o GSAP; skip/only en tests.

## ¿Qué debo revisar antes de actuar?
`git status` + `git rev-parse HEAD` vs origin/main → este HANDOFF → PROJECT-STATE → DECISIONS (DF-006 APROBADA, DP-5) → ROADMAP.

## ¿Cuál es el siguiente paso?
Esperar la aprobación del PLAN OPERATIVO FINAL de Fase 6. Tras el OK: implementar los 5 bloques (ADN visual → gramática espacial → mundos 00–08 → blueprints → matriz de decisión + WORLD-3D-STRATEGY) en ~5 commits atómicos, con tests documentales D-01…D-07 y gates como no-regresión; informe final A–R y STOP para auditoría de ChatGPT.

## ¿Qué tests debo ejecutar?
`npm test` · `npm run lint` · `npm run build` · `npm run test:visual` (baseline verde: 381/381 · 0/16 · OK · 41/41).

## ¿Dónde está la documentación?
- Central: `docs/` (este directorio).
- De fase: raíz del repo (convención consolidada, no mover).
- Auditoría forense completa: `docs/AUDITORIA-FORENSE-FASES-1-5.md`.
