# HANDOFF — BAYONA WEB

> Corto y operativo. Permite a otro agente continuar SIN leer conversaciones. Orden de lectura completo: PROJECT-STATE → HANDOFF → ROADMAP → DECISIONS → docs de fase → Git.

## ¿Qué acaba de ocurrir? (2026-08-27)
1. Auditoría forense de Fases 1–5 sobre `70606dd`: veredicto **✅ C APROBADA** (29/30 CONFIRMADO, 1 PARCIALMENTE CONFIRMADO, 0 CONTRADICHO). Gates ejecutados de verdad: 381/381 tests, lint 0/16, build OK, 41/41 Playwright. Producción = build de HEAD.
2. Primera sincronización documental V1.0: creado `docs/` con el sistema central (commit `2de0a6c`); documentación de fase intacta en raíz.
3. Sincronización final post-auditoría independiente de ChatGPT: referencias actualizadas (commit `bfcf6b4`, AUDIT-LOG entrada 004). ChatGPT: "🟢 B — APROBADA PARA AVANZAR".
4. **DF-006 APROBADA** (confirmación explícita de Sebastián vía veredicto ChatGPT + entrega del PROMPT MAESTRO FASE 6): FASE 6 = WORLD BUILDING. Pre-vuelo de Fase 6 ejecutado (HEAD = origin/main, árbol limpio); PLAN OPERATIVO FINAL presentado y subido al repo como `PLAN-FASE-6-WORLD-BUILDING.md` (raíz), esperando aprobación (AUDIT-LOG entradas 005 y 006).
5. **Auditoría del plan (ChatGPT sobre `046a37c`): "🟢 APROBADO PARA AVANZAR, con correcciones obligatorias"** → registradas como D-008. Sebastián entregó el PROMPT MAESTRO V2.0 (nuevo prompt rector). El agente ejecutó de verdad el checkpoint de verificación (PASOS 1–3 de V2.0): HEAD = origin/main = `046a37c` confirmado; gates re-ejecutados (381/381 · 0 errores/16 warnings · build OK vendor-three 826.94 kB · 41/41 E2E); inventario de rutas normalizado por categorías (16 canónicas + 1 alias + 404 + 1 interna) documentado en el plan §0.2; las 4 correcciones obligatorias aplicadas al plan en el repo (AUDIT-LOG entrada 007). Commit `a808e5e`.
6. **BLOQUE 1 EJECUTADO (2026-08-28)** — autorización del auditor: "🟢 AUTORIZADO: INICIAR ÚNICAMENTE EL BLOQUE 1 DE FASE 6". Pre-flight real (HEAD = origin/main = `a808e5e`, árbol limpio); relectura completa de fuentes; verificación crítica de los 10 principios (sin problema material: se mantienen los 10, análisis de solapamientos documentado en el documento §D.11); creado `BAYONA-WORLD-BIBLE.md` PARTE I (ADN VISUAL) en la raíz: qué es/no es BAYONA, 10 principios operativos con 10 campos cada uno, curva emocional derivada de J1–J10, materialidad (literal/sugerida/prohibida), luz (6 tipos sobre tokens existentes), profundidad (4 tipos, 3D como excepción), densidad/ritmo compatibles con el engine, autoauditoría K.1–K.4. Gates re-ejecutados de verdad: 381/381 (35.95 s) · 0/16 · build 16.11 s · 41 visual (4.0 min). 0 archivos de producción tocados (AUDIT-LOG entrada 008). Commit `3a9f511`.
7. **BLOQUE 1 APROBADO por el auditor** (veredicto sobre `3a9f511`, 2026-08-28) con 4 condiciones vinculantes registradas: **DF-009** disciplina de evidencia, **DF-010** territorio no es folclore, **DF-011** diferenciación real de mundos (gobernará el Bloque 3), **DF-012** anti-burocracia. **BLOQUE 2 EJECUTADO (2026-08-28)**: creado `SPATIAL-LANGUAGE.md` (gramática espacial) en la raíz — 7 estados espaciales (entrada/aproximación/tensión/inmersión/descubrimiento/decisión/salida) con qué produce cada uno, qué principios expresa y gramática conceptual de movimiento ("puede expresarse mediante", nunca APIs); transiciones permitidas/prohibidas; 5 clases de página con estados estructurales/admitidos/prohibidos; mobile; reduced motion; regla absoluta de claridad; autoauditoría 6 tests. Gates re-ejecutados de verdad: 381/381 (37.93 s) · 0/16 · build 13.49 s · 41 visual (3.7 min). 0 producción tocada (AUDIT-LOG entrada 009).

## ¿Qué está confirmado?
- Último commit de código `70606dd` (Fase 5); commits posteriores solo documentales (`2de0a6c`, `bfcf6b4`, `d8fd587`, `046a37c`, checkpoint V2.0). Estado vivo: comprobar con `git rev-parse HEAD` (convención: no congelar HEAD vivo en docs).
- Fases 1–5 reales y aprobadas; ninguna página pública rediseñada en Fase 5.
- Contratos comerciales y SEO vivos en producción (precios, WhatsApp, canonical, sitemap 14, robots).
- **FASE 6 = WORLD BUILDING** (DF-006 APROBADA; plan APROBADO CON CORRECCIONES — D-008; V2.0 rige la ejecución; 0 código de producción, tests documentales permitidos).
- **BLOQUE 1 aprobado:** `BAYONA-WORLD-BIBLE.md` PARTE I (ADN VISUAL) — vinculante para Bloques 2–5 y Fases 7–8.
- **BLOQUE 2 terminado:** `SPATIAL-LANGUAGE.md` (gramática espacial, 7 estados) — propuesta vinculante; relaciones con el engine conceptuales, no APIs. Condiciones DF-009…DF-012 registradas en DECISIONS.md.
- Baseline re-ejecutada de verdad durante el BLOQUE 2 (2026-08-28): 381/381 (37.93 s) · 0/16 · build OK 13.49 s (vendor-three 826.94 kB) · 41 visual (3.7 min).

## ¿Qué está pendiente?
- **Auditoría de ChatGPT del BLOQUE 2** (SPATIAL-LANGUAGE.md) → solo tras su OK explícito, iniciar el BLOQUE 3 (mundos 00–08, gobernado por DF-011).
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
**STOP ABSOLUTO.** Esperar la auditoría de ChatGPT del BLOQUE 2 (informe entregado). Prohibido iniciar el BLOQUE 3 (mundos 00–08), blueprints, matriz, WORLD-3D-STRATEGY o tests D-01…D-07 sin autorización explícita del auditor. Modelo vigente: BLOQUE N → AUDITORÍA → BLOQUE N+1, nunca auto-continuar. Anti-burocracia (DF-012): documentación necesaria sí, documentos que documentan documentos no.

## ¿Qué tests debo ejecutar?
`npm test` · `npm run lint` · `npm run build` · `npm run test:visual` — re-ejecutados de verdad durante el BLOQUE 2 (2026-08-28): 381/381 (37.93 s) · 0 errores/16 warnings · build OK 13.49 s (vendor-three 826.94 kB) · 41 visual passed (3.7 min). Regla V2.0 §23: nunca copiar estos números sin ejecución actual.

## ¿Dónde está la documentación?
- Central: `docs/` (este directorio).
- De fase: raíz del repo (convención consolidada, no mover).
- Auditoría forense completa: `docs/AUDITORIA-FORENSE-FASES-1-5.md`.
