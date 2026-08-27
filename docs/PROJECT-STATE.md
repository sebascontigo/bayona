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
| Commits documentales | `2de0a6c` (sistema central docs/) → `bfcf6b4` (sincronización final de referencias, AUDIT-LOG 004) → registro de confirmación DF-006 (AUDIT-LOG 005) | VERIFIED |
| Commit auditado (forense Fases 1–5) | `70606dd` (2026-08-27) | VERIFIED |
| Estado vivo a 2026-08-27 | HEAD = origin/main, árbol limpio, 0 commits remotos por delante — comprobado con Git durante el pre-vuelo de Fase 6 | VERIFIED |

## Fases

| Campo | Valor | Etiqueta |
|---|---|---|
| Última fase completada | **FASE 5 — Motion Engine 2.0 + Scroll Storytelling** (commits `3cdaa19..70606dd`, 7 commits) | VERIFIED |
| Fase actual | **FASE 6 — WORLD BUILDING** (DF-006 APROBADA, DECISIONS.md). Estado: pre-vuelo, lectura y mapa de vocabulario completados; PLAN OPERATIVO FINAL presentado, esperando aprobación para implementar (PROMPT MAESTRO FASE 6 §33) | VERIFIED |
| Naturaleza de Fase 6 | 100% documental y estratégica: CERO código de páginas, CERO escenas 3D nuevas, CERO dependencias | VERIFIED (veredicto ChatGPT + PROMPT MAESTRO FASE 6) |
| Fases 1–5 | Completadas y aprobadas por auditoría forense (veredicto ✅ C, AUDIT-LOG entrada 002) | VERIFIED |

## Gates (ejecutados 2026-08-27 sobre el estado de código `70606dd`; los commits posteriores son solo documentales y no modifican código)

| Gate | Resultado | Etiqueta |
|---|---|---|
| `npm test` (vitest) | 381/381 tests · 71 ficheros · 0 skips · 0 fallos | VERIFIED |
| `npm run lint` (eslint) | 0 errores / 16 warnings | VERIFIED |
| `npm run build` (vite) | OK (entry 336.89 kB; vendor-three 826.94 kB, warning de chunk preexistente) | VERIFIED |
| `npm run test:visual` (Playwright) | 41/41 | VERIFIED |

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
| DP-5 | ELITE "acceso de por vida" — decisión comercial/legal (fuera de Fase 6, PROMPT MAESTRO FASE 6 §26) | Sebastián |
| — | Aprobación del PLAN OPERATIVO FINAL de Fase 6 (presentado, pendiente de auditoría ChatGPT + OK) | Sebastián + ChatGPT |
| — | Registro de GEMINI_API_KEY / GROQ_API_KEY (fuera del repo; las registra él vía setx) | Sebastián |

> DF-006 quedó **APROBADA** el 2026-08-27 (FASE 6 = WORLD BUILDING); traza completa en DECISIONS.md.

## Riesgos conocidos (no bloqueantes)

- **OBS-1:** el shell HTML estático de las rutas de embudo (/checkout, /order-confirmation, /design-system) lleva meta `index,follow`; el noindex efectivo viene de robots.txt Disallow + meta client-side. Endurecimiento espec'd en ROADMAP.
- **OBS-2:** rutas inexistentes responden HTTP 200 (soft-404 SPA); NotFound renderiza noindex client-side.
- Deuda muerta clasificada en BASELINE.md (incl. `gsap` en package.json, 0 imports, preexistente a Fase 1).
- Chunk vendor-three 826 kB: vigilar si Fase 7 añade escenas.

## Documentos principales

- **Sistema central:** `docs/PROJECT-STATE.md` (este), `docs/ROADMAP.md`, `docs/DECISIONS.md`, `docs/ARCHITECTURE.md`, `docs/AUDIT-LOG.md`, `docs/HANDOFF.md`, `docs/AUDITORIA-FORENSE-FASES-1-5.md`.
- **Documentación de fase (convención consolidada: raíz del repo, no mover):** BASELINE.md, ROUTES.md, TEST-MATRIX.md, DESIGN-AUDIT.md, ASSETS-INVENTORY.md, PERFORMANCE-BASELINE.md, SEO-BASELINE.md, ACCESSIBILITY-BASELINE.md (F1) · FASE2-CIERRE.md (F2) · DESIGN-SYSTEM.md, FASE3-VEREDICTO.md (F3) · FASE4-ARQUITECTURA-EXPERIENCIA.md, ROUTE-JOURNEYS.md, PAGE-EXPERIENCE-MATRIX.md (F4) · PHASE5-MOTION-ENGINE.md, MOTION-MAP.md, SCROLL-STORY-MATRIX.md (F5) · CONTEXTO-MAESTRO-CONTINUIDAD.md (contexto permanente).
- **Históricos:** AUDITORIA_2026-08-25.md (auditoría pre-Fase 1, commit 8f14698, suite roja 84 fallos — punto de partida).

## Prohibiciones activas

- Fase 6 = WORLD BUILDING (DF-006 APROBADA): PROHIBIDO implementar nada sin el PLAN OPERATIVO FINAL aprobado; prohibido rediseñar páginas públicas, crear escenas 3D, migrar código visual o añadir dependencias durante Fase 6.
- NO redefinir Fase 6 como migración de páginas (eso es Fase 8).
- NO tocar: precios, WhatsApp, catálogo, dominio, SEO global, sitemap, robots, rutas públicas, checkout, copy contractual — salvo fase explícita que lo requiera y lo señale antes.
- NO resolver DP-5 por cuenta del agente.
- NO añadir librerías de motion ni usar GSAP.
- NO skip/only/desactivar tests ni rebajar aserciones para poner verde.
- NO crear escenas 3D nuevas ni empezar Fase 7/8 sin plan aprobado.

## Última auditoría

- **Fecha:** 2026-08-27 · **Commit auditado:** 70606dd · **Proceso:** agente ZCode (auditoría forense PROMPT MAESTRO + sincronización documental V1.0) · **Resultado:** ✅ C APROBADA (29/30 CONFIRMADO, 1 PARCIALMENTE CONFIRMADO, 0 CONTRADICHO) · **Detalle:** docs/AUDIT-LOG.md entradas 002 y 003.
