# 3D-ADMISSION-RECORD — Registro de admisión de escenas 3D

> Fase 7A · Creado 2026-08-30 · Entorno E1 (ver FASE7A-FORENSIC.md Bloque A).
> Este registro es el único lugar donde una escena 3D puede ser admitida.
> El guard `src/test/fase7aSceneGovernance.test.js` (allowlist vacía) exige que
> cualquier admisión APPROVED se refleje aquí ANTES de montar `scene=` en una página.

## CANDIDATO-01 · `/parkour-academy` — trayectoria

| Campo | Valor |
|---|---|
| Route | `/parkour-academy` |
| World | 03 MOVIMIENTO (BAYONA-WORLD-BIBLE.md) |
| Blueprint | PAGE-BLUEPRINTS.md §9 "LA TRAYECTORIA COMO MÉTODO", intensidad `immersive`, M.5 ALTO |
| 17 preguntas | 2 A FAVOR · 13 EN CONTRA/NO MEDIDO · 2 NEUTRAS — ficha completa en FASE7A-FORENSIC.md Bloque H |
| G1 SIGNIFICADO | VERDE — trayectoria/control es idea real del mundo 03 |
| G2 NECESIDAD | **ROJA** — alternativa 2D comunica IGUAL/MEJOR con coste ~0 kB (cinematic-stage diseñada y sin implementar; foto real de salto disponible; titulares ya ganan) |
| G3 EXPERIENCIA | **ROJA** — ninguna mejora de comprensión/relación atribuible a la escena y no al copy |
| G4 COSTE | **ROJA** — 25,30 kB gzip marginal mínimo (+216,48 si la fuga 7A-01 se corrige); 71,5× el peso de la ruta; presupuesto declarado ≤30 kB no superado en bytes pero sin valor medible que lo justifique |
| G5 CAPABILITIES | VERDE — la arquitectura (resolveSceneConfig, techos 400/8, dprLimit) la respeta |
| G6 ACCESIBILIDAD | VERDE — patrón GlobeFallback disponible |
| G7 REDUCED-MOTION | VERDE — patrón disponible (rotación 0, frameloop demand) |
| G8 MOBILE | **ROJA** — 2/5 sin evidencia nueva; headless no representa GPU móvil; "desactivar en móvil" ⇒ arrastra a G2 |
| Score 7A | **23/40** (histórico F6: 27/40; Δ=−4 con evidencia nueva en Claridad/Memoria/Coste) |
| 2D alternative | IGUAL o MEJOR — ver FASE7A-FORENSIC.md Bloque G (8 ejes + pruebas de sustitución y del titular) |
| Veto humano | NEGATIVO — "simplemente más tecnológica"; nada demostrable de ayuda a una persona |
| **DECISIÓN** | **A — REJECTED** (2026-08-30) |

### Condición de reapertura (verificable, no negociable)
1. La ruta demuestra en producción (analytics cualificados, no impresiones) que los visitantes abandonan por falta de comprensión de la progresión.
2. Existe medición en dispositivo móvil REAL que supere el veto G8.
3. El rediseño 2D del bloque de niveles (cinematic-stage) se implementa, se mide ≥30 días y NO resuelve el problema.

Solo el cumplimiento de las TRES reabre el expediente. Buscar un segundo candidato para poder decir que la fase "añadió 3D" es el vicio que esta fase existe para prevenir.

## Registro de decisiones de la fase

| ID | Decisión | Estado | Fuente |
|---|---|---|---|
| 7A-01 | Fuga: vendor-three (216,48 kB gzip) se descarga en TODAS las rutas por import estático del shell (ExperienceProvider→Loader→drei). Fix NO ejecutado (scope del arquitecto). | ABIERTA — PREGUNTA formulada | FASE7A-FORENSIC.md Bloque E |
| CTR-01 | Corrección de PERFORMANCE-BASELINE.md §4 DIFERIDA: bajo Estado B la corrección prevista escribiría una tercera mentira; se corregirá junto al fix de 7A-01. | ABIERTA | FASE7A-FORENSIC.md Bloque B |

*Documento en español. Cualquier estado APPROVED futuro exige: 8 puertas verdes + veto humano positivo + presupuesto respetado + fallback diseñado + autorización escrita del arquitecto.*
