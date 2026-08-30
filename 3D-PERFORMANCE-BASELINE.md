# 3D-PERFORMANCE-BASELINE — Baseline de coste 3D

> Fase 7A · MEDIDO el 2026-08-30, entorno E1 (Windows 10 10.0.26200 · Node v24.18.1 · Vite 6.4.3 · Playwright 1.61.1), sobre el build del HEAD de la fase (`f61c0a8` + entregables 7A).
> Método: `scripts/measure-bundle.mjs` (zlib gzip nivel 9, brotli 11) + `e2e/three-network-audit.spec.js` contra `vite preview` (build real, no dev server).
> Nota metodológica: los kB gzip aquí son zlib-9, comparables entre sí (antes/después de 7A), no idénticos al byte con lo que sirva el CDN de producción.

## CURRENT — lo que existe hoy (verificado por red, no por grep)

| Concepto | Valor | Etiqueta |
|---|---|---|
| `vendor-three-*.js` (three + R3F + drei) | 807,56 kB min · **216,48 kB gzip** · 179,10 kB brotli | MEDIDO |
| `SignatureScene-*.js` (lazy, solo si se monta escena) | 97,81 kB min · **25,30 kB gzip** · 22,07 kB brotli | MEDIDO |
| `Scene3D` como chunk separado | no existe en este build (absorbido) | MEDIDO |
| Chunks con huella Three por CONTENIDO (`WebGLRenderer/BufferGeometry/ShaderMaterial`) | **solo vendor-three** (1 chunk) | MEDIDO |
| **Descarga real de vendor-three por ruta** | **TODAS las rutas** (18/18 auditadas × 3 pases desktop/mobile/reduced, incluida la 404) — fuga 7A-01: el entry importa 5 símbolos de vendor-three estáticamente vía `main.jsx → ExperienceProvider.jsx:22 → Loader.jsx:26 (useProgress de drei)`; `dist/index.html` lleva `modulepreload` de vendor-three | MEDIDO |
| Coste 3D transferido por visita (cualquier ruta) | **216,48 kB gzip** | MEDIDO |
| Ruta candidata `/parkour-academy` chunk propio | 9,80 kB min · 3,38 kB gzip | MEDIDO |

### Presupuesto de admisión 3D (declarado ANTES de medir el prototipo — no se reescribe)

- Coste 3D actual de producción: 216,48 kB gzip por visita en TODA ruta [MEDIDO]
- Coste de la ruta candidata hoy: 3,38 kB gzip [MEDIDO]
- Coste de activar la infraestructura existente (escena lazy): +25,30 kB gzip [MEDIDO]
- Multiplicador hipotético sin fuga: (216,48+25,30)/3,38 = **71,5×** [DERIVADO]
- Incremento aceptable MÁXIMO para admitir una escena: **≤30 kB gzip** sobre la ruta candidata
- RECHAZO automático si el marginal medido >30 kB gzip; ROLLBACK si LCP empeora >200 ms tras integrar
- Firmado: agente ZCode, 2026-08-30

## PROTOTYPE — no aplica

Candidato-01 (`/parkour-academy`) **REJECTED** en el gate de admisión (G2/G4/G8 rojas + veto humano negativo; ver 3D-ADMISSION-RECORD.md). No se construyó prototipo; no hay medición "con escena".

## AFTER / MOBILE / FALLBACK / REDUCED — no aplican

Sin escena admitida, no existe estado "after". Los únicos números móviles/reduced de la fase son los pases P2 (Pixel 7) y P3 (reduced-motion) del network audit: la fuga es idéntica en los tres contextos (el import es estático, no condicional). [MEDIDO]

## La palanca de rendimiento real (contexto para el arquitecto)

Arreglar 7A-01 (sustituir el `useProgress` de drei en `Loader.jsx` — único consumidor del shell — por progreso local, o importarlo lazy) devolvería **216,48 kB gzip a CERO en las 17 rutas públicas + 404 + interna**. Es, con diferencia, la mayor palanca de rendimiento del proyecto, y es previa a cualquier discusión sobre añadir 3D. Decisión pendiente del arquitecto (Fase 7B mínima o deuda para Fase 12).

## Vitals de laboratorio (contexto, no contrato)

LCP mediana: `/` 1016 ms · `/about` 996 ms · `/programs` 1284 ms · `/parkour-academy` 1196 ms · `/checkout` 700 ms (rango LCP ` /` 952–1412 ms). CLS ~0,18 en rutas con imágenes sin dimensionar (deuda F1 §6). INP: NO MEDIDO. Advertencias: headless ≠ usuario real; mediana de 3; solo comparable dentro de esta fase. [MEDIDO (laboratorio)]

*Todo número de este documento tiene fuente+comando+fecha en FASE7A-FORENSIC.md (Bloques D, E, E2). Documento en español.*
