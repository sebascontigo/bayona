# FASE 7B — EXECUTION REPORT · CLEAN SHELL / ERRADICACIÓN 7A-01

> **SHA de entrada:** `89f5457` (= origin/main, recovery PASA) · **SHA de salida:** (commit de esta fase) · **Fecha:** 2026-08-30 · **Entorno:** E1 (Windows 10 10.0.26200 · Node v24.18.1 · Vite 6.4.3 · Playwright 1.61.1).
> **Autoridad:** PROMPT MAESTRO DEL ARQUITECTO (prioridad absoluta sobre PM1/PM2/Gemini en caso de conflicto; el REPO gana sobre cualquier prompt). Las rutas y cifras de los prompts de otros modelos NO se copiaron: todo se reconstruyó y midió contra el repo real (las rutas `/pricing`, `/login`, `/dashboard`, `/blog`, `/terms` del prompt de Gemini NO existen en BAYONA — el inventario real se tomó de `routeMeta.js`: 16 canónicas + alias `/entrar` + 404 + `/design-system`).

## 1. Problema (7A-01)
`vendor-three` (807,56 kB min / 216,48 kB gzip, MEDIDO) se descargaba en TODAS las rutas — incluida la 404 — sin ninguna escena 3D montada.

## 2. Causa raíz REAL (triple, verificada en el build)
El diagnóstico de 7A ("Loader→drei") era correcto pero **incompleto** — el fix del Loader solo quitó 1 de 5 símbolos. El build post-fix reveló la cadena completa:
1. **`Loader.jsx:26`** importaba `useProgress` de `@react-three/drei` estáticamente (la cadena conocida).
2. **`engine/index.js` (barrel)** reexportaba estáticamente `Scene3D` y `SceneMount`; `Scene3D.jsx` importa `Canvas` de fiber. Como `main.jsx`/`App.jsx` importan del barrel, el grafo de fiber quedaba alcanzable desde el shell.
3. **`manualChunks` en forma objeto** hacía que Rollup colocara 4 módulos runtime compartidos (el helper de preload de Vite, un `createRoot` que el paquete fiber incluye y reexporta — `DC=xx()` es literalmente `react-dom/client.createRoot` dentro de vendor-three) DENTRO del chunk vendor-three, con lo que el entry los importaba estáticamente desde allí: `import{c as Ds,p as Ms,_ as be,a as Ls}from"./vendor-three-B0oMDMTk.js"`.

## 3. Solución (3 cambios quirúrgicos, 4 archivos de runtime + 1 config)
| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `src/engine/effects/loadingProgress.js` **(nuevo)** | Store propio del engine: `{progress, active, loaded, total}` + `subscribe/update/reset`, lógica pura sin React ni WebGL | Da al Loader una fuente de progreso sin drei; las escenas futuras admitidas reportan aquí su avance |
| 2 | `src/engine/effects/Loader.jsx` | `useProgress` (drei) → `useLoadingProgress` (hook local sobre el store). API, semántica R20.x, a11y (`role=status/progressbar`, aria-live), reduced-motion y visual: **idénticos** | Rompe la cadena 1. Hoy ninguna escena monta assets, así que el store vive en ceros y el Loader resuelve por su fallback de 300 ms — comportamiento byte a byte igual al de antes |
| 3 | `src/engine/index.js` (barrel) | Retiradas las reexportaciones `Scene3D`/`SceneMount`, con comentario de gobernanza. El único consumidor real (`Layout.jsx`) ya importaba `SceneMount` por ruta directa; `Scene3D` no tenía consumidores externos | Rompe la cadena 2. Cero breaking change verificado por grep de consumidores |
| 4 | `vite.config.js` | `manualChunks` de forma objeto → **forma función** (clasificación por id de módulo: `three|@react-three/*` → vendor-three; react family → vendor-react; framer → vendor-motion) | Rompe la cadena 3: los módulos runtime compartidos ya no pueden caer dentro de vendor-three. Autorizado expresamente por el arquitecto (§48: "si el fix cambia el chunking, es válido, pero medir") |
| 5 | `src/test/fase7aSceneGovernance.test.js` | El test 7A-01 (inventario con Loader como fuga conocida) → **2 tests 7B más duros**: shell (providers/effects/motion/hooks) = CERO imports @react-three; inventario cerrado de los 6 archivos legítimos (5 de `engine/scene/` lazy + `Globe3D.jsx` dormante sin importadores) | El guard protege la arquitectura nueva, independiente del nombre de chunk |

**NO se cambió:** ExperienceProvider (API/estructura intactas — el prompt del arquitecto §45), páginas públicas, estilos, rutas, SceneMount/Scene3D/SignatureScene (lazy, intactos), Globe3D (dormante, patrón de referencia), precios/WhatsApp/checkout/SEO, DP-5.

## 4. BEFORE / AFTER (ambos MEDIDOS en esta ejecución, zlib-9, build limpio)

| Métrica | ANTES (fix) | DESPUÉS (fix) | Δ |
|---|---|---|---|
| `vendor-three` min | 807,56 kB | 887,35 kB | +79,79 kB (absorbe los módulos runtime que antes compartía con el entry) |
| `vendor-three` gzip | 216,48 kB | 233,71 kB | +17,23 kB |
| Entry chunk gzip | 102,24 kB | 103,81 kB | +1,57 kB |
| `SignatureScene` gzip | 25,30 kB | 5,74 kB | −19,56 kB (absorbe módulos de escena) |
| **`vendor-three` en entry chunk** | **import estático de 5 símbolos** | **0 referencias** | **FUGA ERRADICADA** |
| **modulepreload vendor-three en HTML** | **presente (10 HTML)** | **AUSENTE** | **0 preloads** |
| Quién importa vendor-three | entry + todas las rutas | **solo `Scene3D` y `SignatureScene` (lazy)** | arquitectura objetivo alcanzada |
| Total JS del build (gzip) | 555,18 kB | 553,92 kB | −1,26 kB (el 3D sale del grafo del shell) |
| Build | 14,18 s | 14,81 s | estable |

**Nota honesta (§35 del arquitecto):** NO se afirma "LCP mejoró X ms" — no se midió con throttling comparado en esta pasada. Lo MEDIDO y demostrable: **se eliminó la solicitud de 216,48 kB gzip (233,71 kB en el nuevo hash) de las 18 rutas auditadas**. La mejora de LCP/FCP se medirá en Fase 8 con línea base limpia.

## 5. Network audit (aserción dura REACTIVADA, 3 pases contra build real)
- `e2e/three-network-audit.spec.js` con `expect(threeByName).toHaveLength(0)` ACTIVO para las 18 rutas.
- P1 desktop 1440×900: **23 passed** · P2 mobile Pixel 7: **23 passed** · P3 reduced-motion: **23 passed** → **69 passed, 0 fugas en 18 rutas** (antes: vendor-three en las 18).
- El spec detecta por nombre (vendor-three/SignatureScene/Scene3D/drei/fiber) Y por tamaño (>150 kB sospechoso), independiente del hash — no frágil a renombrados de chunk (§21).

## 6. Gates (re-ejecutados, números propios)
| Gate | Resultado |
|---|---|
| `npm test` | **417/417 · 74 ficheros · 0 fallos** (409 previos + 7 del store + 1 neto: test 7A-01 → 2 tests 7B) |
| `npm run lint` | **0 errores / 16 warnings preexistentes** (techo no superado) |
| `npm run build` | **OK 14,81 s**, chunks coherentes (vendor-react/motion preloads; vendor-three solo lazy) |
| `npm run test:visual` | **64 passed (5,3 min)** — sin regresión visual inexplicada |
| Network (f7a config) | **69 passed (3 pases)** |

## 7. Chaos drill (§26 del arquitecto — ejecutado y documentado)
1. Inyección temporal de `import { Canvas } from '@react-three/fiber'` en `src/engine/effects/GrainOverlay.jsx` (shell).
2. `npx vitest --run fase7aSceneGovernance` → **2 failed** (los dos tests 7B se ponen rojos: "import estático de @react-three en el SHELL… arrastra vendor-three a TODAS las rutas").
3. Retirada del import a mano.
4. Re-ejecución → **8 passed**.
5. `git status` de GrainOverlay → limpio (diff vacío). El guard ya falló cuando debía: no es decoración.

## 8. Accesibilidad / mobile / reduced-motion
El Loader conserva íntegro: `role="status"` + `aria-live="polite"`, `role="progressbar"` con `aria-valuemin/max/now`, camino reduced-motion estático textual, salida animada con `motionTokens`. Los pases mobile y reduced del network audit confirman cero fugas también ahí. Sin cambios visuales (visual 64 verde).

## 9. Deuda restante / OBSERVACIONES (registradas, NO arregladas — §31)
- `earth-dark.jpg` desde unpkg (94.795 B, max-age=60, sin SRI) — tema independiente (W2), pendiente de decisión.
- CLS ~0,18 por imágenes sin dimensiones — deuda F1 §6, Fase 12.
- `gsap` en package.json (deuda muerta declarada) — intacto.
- `vendor-three` creció +17,23 kB gzip (absorbe los runtime helpers que antes compartía): correcto, porque ahora SOLO lo pagan las rutas con escena lazy (hoy: ninguna en producción).
- INP: NO MEDIDO (sin interacción guionizada comparada).

## 10. Certificación
```
====================================================================
          BAYONA QUALITY ASSURANCE & ARCHITECTURAL CERTIFICATION
====================================================================
FECHA:                    2026-08-30 (entorno E1)
COMMIT FIX (código):      (commit 1 de esta fase)
COMMIT DOCS:               (commit 2 de esta fase)
FUGA EN RUTAS 2D:         0 bytes de Three.js en 18/18 rutas (MEDIDO, 3 pases)
TESTS DE RED:             69/69 PASSED (aserción dura activa)
SUITE:                    417/417 · lint 0/16 · visual 64/64 · build OK
ESTADO 7A-01:             ERRADICADO — shell 2D-first verificado
CHAOS DRILL:              verificado (rojo inducido → verde → árbol limpio)
AUTORIZADO PARA FASE 8:   pendiente del veredicto del auditor sobre este reporte
====================================================================
```
