# HANDOFF — BAYONA WEB

> Corto y operativo. Permite a otro agente continuar SIN leer conversaciones. Orden de lectura completo: PROJECT-STATE → HANDOFF → ROADMAP → DECISIONS → docs de fase → Git.

## ¿Qué acaba de ocurrir? (2026-08-27)
1. Auditoría forense de Fases 1–5 sobre `70606dd`: veredicto **✅ C APROBADA** (29/30 CONFIRMADO, 1 PARCIALMENTE CONFIRMADO, 0 CONTRADICHO). Gates ejecutados de verdad: 381/381 tests, lint 0/16, build OK, 41/41 Playwright. Producción = build de HEAD.
2. Primera sincronización documental V1.0: creado `docs/` con el sistema central (commit `2de0a6c`); documentación de fase intacta en raíz.
3. Sincronización final post-auditoría independiente de ChatGPT: referencias actualizadas (commit `bfcf6b4`, AUDIT-LOG entrada 004). ChatGPT: "🟢 B — APROBADA PARA AVANZAR".
4. **DF-006 APROBADA** (confirmación explícita de Sebastián vía veredicto ChatGPT + entrega del PROMPT MAESTRO FASE 6): FASE 6 = WORLD BUILDING. Pre-vuelo de Fase 6 ejecutado (HEAD = origin/main, árbol limpio); PLAN OPERATIVO FINAL presentado y subido al repo como `PLAN-FASE-6-WORLD-BUILDING.md` (raíz), esperando aprobación (AUDIT-LOG entradas 005 y 006).
5. **Auditoría del plan (ChatGPT sobre `046a37c`): "🟢 APROBADO PARA AVANZAR, con correcciones obligatorias"** → registradas como D-008. Sebastián entregó el PROMPT MAESTRO V2.0 (nuevo prompt rector). El agente ejecutó de verdad el checkpoint de verificación (PASOS 1–3 de V2.0): HEAD = origin/main = `046a37c` confirmado; gates re-ejecutados (381/381 · 0 errores/16 warnings · build OK vendor-three 826.94 kB · 41/41 E2E); inventario de rutas normalizado por categorías (16 canónicas + 1 alias + 404 + 1 interna) documentado en el plan §0.2; las 4 correcciones obligatorias aplicadas al plan en el repo (AUDIT-LOG entrada 007).

## ¿Qué está confirmado?
- Último commit de código `70606dd` (Fase 5); commits posteriores solo documentales (`2de0a6c`, `bfcf6b4`, `d8fd587`, `046a37c`, checkpoint V2.0). Estado vivo: comprobar con `git rev-parse HEAD` (convención: no congelar HEAD vivo en docs).
- Fases 1–5 reales y aprobadas; ninguna página pública rediseñada en Fase 5.
- Contratos comerciales y SEO vivos en producción (precios, WhatsApp, canonical, sitemap 14, robots).
- **FASE 6 = WORLD BUILDING** (DF-006 APROBADA; plan APROBADO CON CORRECCIONES — D-008; V2.0 rige la ejecución; 0 código de producción, tests documentales permitidos).
- Baseline re-ejecutada de verdad sobre `046a37c`: 381/381 · 0/16 · build OK (vendor-three 826.94 kB) · 41/41.

## ¿Qué está pendiente?
- **Revisión del auditor (ChatGPT), con Sebastián, del informe de verificación del checkpoint V2.0** → tras el OK, empezar el BLOQUE 1.
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
Esperar la revisión del auditor (ChatGPT) del informe de verificación del checkpoint V2.0, con Sebastián. Tras el OK: implementar los 5 bloques (ADN visual → gramática espacial → mundos 00–08 → blueprints → matriz de decisión + WORLD-3D-STRATEGY) según el orden de ejecución de V2.0 §32, en commits atómicos, con tests documentales D-01…D-07 y gates re-ejecutados de verdad como no-regresión (nunca copiar números históricos); informe final A–R y STOP ABSOLUTO para auditoría de ChatGPT antes de Fase 7.

## ¿Qué tests debo ejecutar?
`npm test` · `npm run lint` · `npm run build` · `npm run test:visual` — re-ejecutados de verdad sobre `046a37c` (2026-08-27): 381/381 · 0 errores/16 warnings · build OK (vendor-three 826.94 kB) · 41/41. Regla V2.0 §23: nunca copiar estos números sin ejecución actual.

## ¿Dónde está la documentación?
- Central: `docs/` (este directorio).
- De fase: raíz del repo (convención consolidada, no mover).
- Auditoría forense completa: `docs/AUDITORIA-FORENSE-FASES-1-5.md`.
