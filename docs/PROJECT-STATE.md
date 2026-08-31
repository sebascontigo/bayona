# PROJECT-STATE — BAYONA WEB

> Fuente operativa central. Responde: ¿dónde está el proyecto AHORA?
> Etiquetas: **VERIFIED** (comprobado ejecutando/leyendo el repo) · **DECLARED** (afirmado, aún no comprobado) · **HISTORICAL** (ya no representa el estado actual).
> Protocolo: PROMPT MAESTRO DE SINCRONIZACIÓN DOCUMENTAL V1.0 (2026-08-27).

## Identificación

> **Convención de referencias (veredicto ChatGPT 2026-08-27):** el HEAD vivo NO se congela en documentos versionados (evita commits circulares). Aquí se registran: commit auditado, último commit de código conocido, último commit documental y fecha. El estado vivo se comprueba con `git rev-parse HEAD` / `git status`.

| Campo | Valor | Etiqueta |
|---|---|---|
| Repositorio | github.com/sebascontigo/bayona | VERIFIED |
| Rama | main | VERIFIED |
| Último commit de código | `70606dd` "Fase 5 (7/7): documentacion del Motion Engine 2.0 + Scroll Storytelling" — el código no ha cambiado desde entonces; los commits posteriores son exclusivamente documentales | VERIFIED |
| Commits documentales | `2de0a6c` (sistema central docs/) → `bfcf6b4` (sincronización final de referencias, AUDIT-LOG 004) → `d8fd587` (registro DF-006 APROBADA, AUDIT-LOG 005) → `046a37c` (plan operativo en repo, AUDIT-LOG 006) → `a808e5e` (checkpoint de verificación V2.0 + plan corregido, AUDIT-LOG 007) → `3a9f511` (BLOQUE 1: BAYONA-WORLD-BIBLE.md PARTE I, AUDIT-LOG 008) → `d8d6009` (BLOQUE 2: SPATIAL-LANGUAGE.md + DF-009…DF-012, AUDIT-LOG 009) → `252943c` (BLOQUE 3: BAYONA-WORLD-BIBLE.md PARTE II mundos 00–08, AUDIT-LOG 010) → `aaf1543` (BLOQUE 4: PAGE-BLUEPRINTS.md 18 planos + auditoría de no-intercambiabilidad, AUDIT-LOG 011) → BLOQUE 5: MATRIZ FINAL DE DECISIÓN (secciones M.0–M.15 en PAGE-BLUEPRINTS.md) + docs mínimos (`9d00f12`, AUDIT-LOG 012) → **CIERRE TRANSVERSAL: WORLD-3D-STRATEGY.md + tests D-01…D-07 (este commit, AUDIT-LOG 013)** | VERIFIED |
| Commit auditado (forense Fases 1–5) | `70606dd` (2026-08-27) | VERIFIED |
| Commit auditado (plan de Fase 6) | `046a37c` (veredicto ChatGPT 2026-08-27: APROBADO PARA AVANZAR con correcciones) | VERIFIED |
| Estado vivo a 2026-08-27 | HEAD = origin/main, árbol limpio, 0 commits remotos por delante — comprobado con Git durante el checkpoint V2.0 (post-auditoría del plan) | VERIFIED |

## Fases

| Campo | Valor | Etiqueta |
|---|---|---|
| Última fase completada | **FASE 6 — WORLD BUILDING** (5 bloques + cierre transversal, `3a9f511..f61c0a8`) | VERIFIED |
| Fase actual | **FASE 9.0 — SALUD DE LA BASE (dirección del arquitecto)**: H-09.0-A CONFIRMADO y corregido (duplicación N×N en fallback móvil de StickyStage — móvil mostraba 9/9/16 bloques visibles; fix: contrato `isStatic` en el componente + los 3 consumidores pintan un solo estado por frame; re-verificado 3/3/4 en ejecución) · H-09.0-B CONFIRMADO y corregido (focus trap real del menú móvil: 0 escapes en 25 Tabs + Escape restaura foco — verificado en ejecución) · H-09.0-C re-baseline medido (3 muestras: variación LCP +15–48% EN TODAS las rutas incluida la intocada /programs ⇒ carga del entorno de laboratorio, NO regresión del código; método documentado en AUDIT-LOG) · FASE 8 COMPLETA ANTES: 8.0 hardening + E/F/G/H + benchmark + consolidación + contrato E2E. Gates de 9.0: ver entrada AUDIT-LOG 016. 7B VERIFIED DONE congelada; 7A-01 CERRADA; parkour 3D REJECTED intacto; DP-5 intacto | VERIFIED |
| Naturaleza de Fase 6 | 100% documental y estratégica: 0 cambios de código de producción; único código nuevo permitido = tests documentales (sin runtime/bundle/deps/skip/only) | VERIFIED (veredicto ChatGPT + PROMPT MAESTRO V2.0 §5) |
| Fases 1–5 | Completadas y aprobadas por auditoría forense (veredicto ✅ C, AUDIT-LOG entrada 002) | VERIFIED |

## Gates (re-ejecutados de verdad 2026-08-30 durante FASE 7B, sobre el fix aplicado)

| Gate | Resultado | Etiqueta |
|---|---|---|
| `npm test` (vitest) | 417/417 tests · 74 ficheros · 0 skips · 0 fallos (409 previos + 7 store loadingProgress; test 7A-01 → 2 tests 7B) | VERIFIED |
| `npm run lint` (eslint) | 0 errores / 16 warnings preexistentes | VERIFIED |
| `npm run build` (vite) | OK, built in 14,81 s; entry y HTML sin vendor-three; solo chunks lazy 3D lo importan | VERIFIED |
| `npm run test:visual` (Playwright) | 64 passed (5,3 min) | VERIFIED |
| Network f7a (aserción dura) | 69 passed (18 rutas × 3 pases, 0 solicitudes 3D) | VERIFIED |

## Producción

| Campo | Valor | Etiqueta |
|---|---|---|
| URL | https://bayona-jet.vercel.app | VERIFIED |
| Build servido | Idéntico al de HEAD (hash de asset `index-C6u8ju_1.js` coincide con build local de 70606dd) | VERIFIED (2026-08-27) |
| Canonical / OG / sitemap (14 URLs) / robots.txt | Correctos e intactos | VERIFIED (2026-08-27) |
| Contratos comerciales vivos | Precios catálogo (RAÍZ 149k / FUERZA 299k / RENDIMIENTO 499k / ELITE 899k COP) y WhatsApp 34614988006 presentes en producción | VERIFIED (2026-08-27) |

## Decisiones pendientes

| ID | Asunto | Quién decide |
|---|---|---|
| ~~7A-01~~ | **RESUELTA en Fase 7B** (2026-08-30): fuga erradicada — 0 bytes 3D en 18/18 rutas (MEDIDO). CTR-01 cerrada. | CERRADA |
| — | **Veredicto del auditor sobre FASE 7B** (FASE7B-EXECUTION-REPORT.md) antes de iniciar Fase 8 | ChatGPT + Sebastián |
| DP-5 | ELITE "acceso de por vida" — decisión comercial/legal (fuera de fase, PROMPT MAESTRO V2.0 §27) | Sebastián |
| — | Registro de GEMINI_API_KEY / GROQ_API_KEY (fuera del repo; las registra él vía setx) | Sebastián |

> DF-006 quedó **APROBADA** el 2026-08-27 (FASE 6 = WORLD BUILDING); traza completa en DECISIONS.md.
> D-008 (2026-08-27): plan operativo de Fase 6 APROBADO CON CORRECCIONES por el auditor; V2.0 es el prompt rector.

## Riesgos conocidos (no bloqueantes)

- **OBS-1:** el shell HTML estático de las rutas de embudo (/checkout, /order-confirmation, /design-system) lleva meta `index,follow`; el noindex efectivo viene de robots.txt Disallow + meta client-side. Endurecimiento espec'd en ROADMAP.
- **OBS-2:** rutas inexistentes responden HTTP 200 (soft-404 SPA); NotFound renderiza noindex client-side.
- Deuda muerta clasificada en BASELINE.md (incl. `gsap` en package.json, 0 imports, preexistente a Fase 1).
- Textura del mapa de `/about` desde CDN externo (unpkg) sin SRI — PROPUESTO self-host en Fase 7 (W2 de WORLD-3D-STRATEGY); no se toca en F6.
- LCP/CLS/INP por ruta NO MEDIDO (herencia Fase 1) — plan de validación en WORLD-3D-STRATEGY T.
- Chunk vendor-three 826 kB: vigilar si Fase 7 activa escenas (hoy dormante, coste cero).

## Documentos principales

- **Sistema central:** `docs/PROJECT-STATE.md` (este), `docs/ROADMAP.md`, `docs/DECISIONS.md`, `docs/ARCHITECTURE.md`, `docs/AUDIT-LOG.md`, `docs/HANDOFF.md`, `docs/AUDITORIA-FORENSE-FASES-1-5.md`.
- **Documentación de fase (convención consolidada: raíz del repo, no mover):** BASELINE.md, ROUTES.md, TEST-MATRIX.md, DESIGN-AUDIT.md, ASSETS-INVENTORY.md, PERFORMANCE-BASELINE.md, SEO-BASELINE.md, ACCESSIBILITY-BASELINE.md (F1) · FASE2-CIERRE.md (F2) · DESIGN-SYSTEM.md, FASE3-VEREDICTO.md (F3) · FASE4-ARQUITECTURA-EXPERIENCIA.md, ROUTE-JOURNEYS.md, PAGE-EXPERIENCE-MATRIX.md (F4) · PHASE5-MOTION-ENGINE.md, MOTION-MAP.md, SCROLL-STORY-MATRIX.md (F5) · CONTEXTO-MAESTRO-CONTINUIDAD.md (contexto permanente) · PLAN-FASE-6-WORLD-BUILDING.md (plan operativo de la fase actual, AUDITADO Y APROBADO CON CORRECCIONES — D-008; incluye checkpoint de verificación V2.0 §0.1 e inventario de rutas normalizado §0.2) · BAYONA-WORLD-BIBLE.md (PARTE I — ADN VISUAL, BLOQUE 1 aprobado; PARTE II — MUNDOS 00–08, BLOQUE 3 ejecutado) · SPATIAL-LANGUAGE.md (gramática espacial, BLOQUE 2 aprobado) · PAGE-BLUEPRINTS.md (planos de experiencia por ruta, BLOQUE 4 aprobado + MATRIZ FINAL DE DECISIÓN M.0–M.15, BLOQUE 5 aprobado) · **WORLD-3D-STRATEGY.md (estrategia de profundidad y 3D, CIERRE TRANSVERSAL ejecutado) · src/test/fase6Contracts.test.js (contratos documentales D-01…D-07, 21 tests).**
- **Históricos:** AUDITORIA_2026-08-25.md (auditoría pre-Fase 1, commit 8f14698, suite roja 84 fallos — punto de partida).

## Prohibiciones activas

- Fase 6 = WORLD BUILDING (DF-006 APROBADA, plan APROBADO CON CORRECCIONES — D-008): **CIERRE TRANSVERSAL TERMINADO — Fase 6 documental COMPLETA. Prohibido iniciar FASE 7 (3D Contextual), FASE 8 o cualquier implementación visual antes de la auditoría de ChatGPT**; condiciones DF-009…DF-012 vinculantes; prohibido activar escenas 3D, crear geometrías/shader/canvas, rediseñar páginas, migrar CSS o añadir dependencias; prohibido modificar código de producción (los únicos cambios de código permitidos fueron los tests documentales D-01…D-07, sin runtime/bundle/deps/skip/only).
- NO redefinir Fase 6 como migración de páginas (eso es Fase 8).
- NO tocar: precios, WhatsApp, catálogo, dominio, SEO global, sitemap, robots, rutas públicas, checkout, copy contractual — salvo fase explícita que lo requiera y lo señale antes.
- NO resolver DP-5 por cuenta del agente.
- NO añadir librerías de motion ni usar GSAP.
- NO skip/only/desactivar tests ni rebajar aserciones para poner verde.
- NO crear escenas 3D nuevas ni empezar Fase 7/8 sin plan aprobado.

## Última auditoría

- **Fecha:** 2026-08-27 · **Commit auditado:** 70606dd · **Proceso:** agente ZCode (auditoría forense PROMPT MAESTRO + sincronización documental V1.0) · **Resultado:** ✅ C APROBADA (29/30 CONFIRMADO, 1 PARCIALMENTE CONFIRMADO, 0 CONTRADICHO) · **Detalle:** docs/AUDIT-LOG.md entradas 002 y 003.
