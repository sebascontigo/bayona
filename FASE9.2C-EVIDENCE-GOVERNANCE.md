# FASE 9.2-C — EVIDENCE INTEGRITY & EXPERIMENT GOVERNANCE

Cierre técnico previo al salto de material humano. Autorización: veredicto del
arquitecto sobre 9.2-B — "APROBADA CON OBSERVACIONES" con tres asuntos:
(1) integridad histórica de artifacts, (2) precisión semántica de conclusiones,
(3) cobertura real del guard. Este documento es el registro de la investigación
y de los cambios mínimos ejecutados.

Fecha: 2026-09-02 · Commit de partida: `cafc915` (= origin/main, árbol limpio).

---

## 1. Estado Git verificado

- HEAD = origin/main = `cafc915`, árbol limpio, 0 commits posteriores.
- Secuencia real confirmada: `6652392` → `ce74bb8` (perf grain) → `624b06f`
  (evidencia) → `cafc915` (AUDIT-LOG 017).
- Clasificación del rango: 1 producción+test (ce74bb8), 1 evidencia (624b06f),
  1 documentación (cafc915).

## 2. Provenance de artifacts — lo que realmente ocurrió

**Mecanismo raíz (más grande que el incidente 624b06f):** los `afterAll` de
`three-network-audit.spec.js` y `webvitals-lab.spec.js` escribían
INCONDICIONALMENTE a `artifacts/fase7a/` en cada corrida. El historial Git
registra **12+ sobrescrituras** desde Fase 7A (commits de 7B, 8 ×4, 9.0, 9.1 ×3,
9.2-B). El overwrite no fue un accidente puntual de 9.2-B: era el diseño del
harness, jamás declarado como semántica "latest-only".

**Agravante estructural:** la config GLOBAL de Playwright
(`playwright.config.js`, testMatch `**/*.spec.js`) también ejecuta estos 2
specs — contra el **dev server** (:4173). Consecuencia medida:

| Época del artifact | Puerto | URLs | Qué era en realidad |
|---|---|---|---|
| `438ba3b` (7A) | 4173 | `/src/`, `/@vite/client` | fuga 7A-01 VIVA 18/18 rutas (drei ~1,4 MB en `/`) |
| `ecd0267` (7B) | 4173 | `/src/`, dev | 0 fugas — pero contra dev server |
| `6652392` (9.1) | 4173 | `/src/`, 151 JS sin bundlear | corrida 9.1 contra dev, NO preview |
| `cafc915` (9.2-B) | **4174** | `assets/*.js` hasheados | **la primera evidencia que cumple la config f7a (vite preview)** |

La config f7a SIEMPRE declaró `vite preview:4174` — pero la corrida que
sobrescribía el artifact era la del config global (dev:4173) en la mayoría de
las fases. Los documentos que decían "contra vite preview del build real"
eran ciertos para la aserción del contrato (0 fugas), pero el JSON persistido
mezclaba entornos según qué config hubiera corrido última.

**Clasificación del overwrite (menú §3 del prompt): B — diseño ambiguo.**
- No es A (latest legítimo): la semántica latest-only nunca fue declarada ni
  documentada; el nombre del directorio promete "evidencia de 7A".
- No es C (pérdida irreversible): la evidencia 7A original vive intacta en
  `438ba3b`; Git conserva cada versión.
- No es D (no problema): 3.852 líneas de evidencia histórica fueron reemplazadas
  por una corrida de otra fase; la reproducibilidad sufrió.

## 3. Cambios ejecutados (mínimos)

1. **Gates de escritura en los 2 specs:** corridas "latest" → `artifacts/latest/`
   (gitignored, scratch). Promoción a namespace de fase SOLO explícita:
   `EVIDENCE_NAMESPACE=artifacts/fase9/9.2-b npx playwright test -c
   playwright.f7a.config.js`. Por defecto, ninguna corrida toca evidencia histórica.
2. **Restauración:** `artifacts/fase7a/` vuelve a su contenido 7A ORIGINAL
   (restaurado desde `438ba3b`): fuga viva 18/18 rutas — exactamente lo que el
   nombre promete. Es restauración desde Git (fuente primaria), no reconstrucción.
3. **Namespace 9.2-B:** `artifacts/fase9/9.2-b/` con network-audit + webvitals
   de `624b06f` (evidencia tal como se produjo) + `grain-experiment-runtime.json`
   (transcrito de AUDIT-LOG 017 con etiqueta de procedencia: los datos runtime
   del experimento no se persistieron como JSON durante la fase).
4. **Manifest** `metadata.json`: SHAs reconciliados (SOURCE 6652392 /
   EXPERIMENT ce74bb8 / EVIDENCE 624b06f / REPORT cafc915), método, muestras,
   resultados, limitaciones, verificación post-build, gates.
5. **Guards nuevos (fase7aSceneGovernance pasa de 11 a 13 tests):**
   - 9.2-C freeze: ningún spec puede escribir a `artifacts/fase7a` o
     `artifacts/fase9` (detecta writeFileSync/mkdirSync hardcodeado y paths
     literales congelados).
   - 9.2-C manifest: existencia + SHAs correctos + limitaciones no vacías.
6. **Precisión semántica** en 3 sitios (ver §5).
7. **Docs:** AUDIT-LOG 018, esta fase, entrada en PROJECT-STATE.

## 4. Cobertura REAL del guard 9.2-B (matriz §8)

El guard 9.2-B scannea TODO el CSS de src buscando (a) `animation...infinite`
o `animation-name...grain` dentro de un bloque `body::after`, y (b) cualquier
selector con "grain" en su nombre que declare `animation...infinite`.
Matriz de escenarios (EXPECTED = lo que la POLÍTICA quiere; ACTUAL = lo que el
guard hace HOY, verificado con regex reales, no inferido):

| # | Escenario | Expected (política) | Actual (guard) |
|---|---|---|---|
| 1 | `body::after { animation: x 1s infinite }` | ROJO | **ROJO** (regex a) |
| 2 | `.grain { animation: x 1s infinite }` | ROJO | **ROJO** (regex b) |
| 3 | `body::before` textura + infinite | ROJO | **NO CUBIERTO** (regex a solo body::after; regex b solo si el selector se llama grain) |
| 4 | `.film-noise { animation...infinite }` | ROJO (textura global) | **NO CUBIERTO** (el selector no contiene "grain") |
| 5 | pseudo-elemento diferente (`html::after`) + infinite | ROJO | **NO CUBIERTO** |
| 6 | CSS variable que resuelva a infinite | ROJO | **NO CUBIERTO** (regex mira el literal; la variable se resuelve en runtime) |
| 7 | shorthand multiline (animation en otra línea del bloque) | ROJO | **CUBIERTO** (el regex usa `/s` y matchea dentro del bloque completo) |
| 8 | `animation-iteration-count: infinite` | ROJO | **PARCIAL** (solo si además hay `animation...grain` o está en body::after con `animation-` — el shorthand `animation:` sí matchea; la longhand suelta en un selector no-grain NO) |
| 9 | Framer Motion `repeat: Infinity` sobre textura global | ROJO | **NO CUBIERTO** (guard es CSS-only; JS no se scannea) |
| 10 | Web Animations API iterations Infinity | ROJO | **NO CUBIERTO** (idem) |

**Lectura honesta:** el guard protege el FALLO ESPECÍFICO que el experimento
medidió (reintroducir la animación CSS infinita sobre body::after o un selector
grain) y lo hace bien, incluido shorthand multiline. NO es policía global de
animaciones: animaciones infinitas legítimas (marquees, hero-particles con
duración 44-72s, badges breathe, scene-bg-drift alternate) siguen permitidas —
eso es INTENCIONAL (regla §9 del prompt: no convertir un guard específico en
policía global; una animación permanente podría ser válida si comunica estado,
es barata, tiene presupuesto/owner/reduced-motion). Los huecos 3-6 y 9-10 están
documentados aquí como limitación; cubrirlos exigiría un guard JS/AST más
invasivo — disproportionado para el riesgo real (la reintroducción más
probable es copiar-pega del CSS histórico, que SÍ queda atrapada).

## 5. Precisión semántica aplicada (§6-7)

Frase original → formulación corregida (en comentario CSS, comentario del
guard y AUDIT-LOG 017 con marca visible de corrección, sin borrar historia):

- "la animación carrya el 100% del coste" → "EN EL LABORATORIO, la animación
  está asociada al delta dominante de coste; las texturas estáticas quedaron
  dentro del rango de ruido observado respecto a NO_GRAIN en ese entorno".
- "las texturas estáticas son gratis" → mismo scoping + "GPU física:
  NO MEDIDA".
- "E5 causalmente sostenido" → **E5-LAB** (causalidad fuerte dentro del
  laboratorio headless; NO E5 universal — GPU física/Safari/móvil gama baja
  sin medir). El propio FASE7A-FORENSIC ya advertía "headless ≠ usuario real".

## 6. SHA reconciliation (§5 del formato de entrega)

- SOURCE_COMMIT: `6652392` (estado pre-experimento)
- EXPERIMENT_COMMIT: `ce74bb8` (cambio productivo)
- EVIDENCE_COMMIT: `624b06f` (JSONs de la corrida)
- REPORT_COMMIT: `cafc915` (AUDIT-LOG 017)
- CURRENT_HEAD (inicio 9.2-C): `cafc915` — todos idénticos entre sí en
  provenance: el experimento, la evidencia y el reporte son de la MISMA cadena
  sin mezcla de SHAs (la anomalía dev-vs-preview afectaba a qué config corrió,
  no a qué commit medía).

## 7. Cambios deliberadamente NO realizados

- **No se tocó el grain:** 2 texturas estáticas siguen vivas. 9.2-B decidió
  retirar MOVIMIENTO; la consolidación de las DOS texturas es una decisión
  SEPARADA que queda documentada y no ejecutada (§12 del prompt).
- **No se reescribió historia Git:** sin reset, sin force push, sin amend.
- **No se "corrigieron" artifacts de fases pasadas** más allá de restaurar
  fase7a a su estado 7A original (la restauración desde Git está respaldada
  por el contenido: fuga viva 18/18).
- **No se amplió el guard grain** a todas las animaciones infinitas (§9).
- **No se migraron** los artifacts `fase9/*.cjs` de 9.0 (evidencia congelada
  de esa fase, ya en su namespace correcto).

## 8. Red Team (§16 del prompt — 10 preguntas)

1. **¿Arreglo un problema que solo existe porque el directorio se llama
   fase7a?** No: el problema es que 12+ corridas de fases distintas
   reemplazaron 3.852 líneas de evidencia histórica y ninguna semántica lo
   declaraba. El nombre solo lo hizo VISIBLE.
2. **¿Los JSON son deliberadamente "latest"?** Eran latest *de facto*, pero la
   semántica nunca fue declarada ni documentada — HANDOFF/FORENSIC los citan
   como evidencia de fase. Por eso clase B, no A.
3. **¿Existe otra copia histórica intacta?** Sí: cada versión vive en Git
   (`git show <sha>:artifacts/...`). El coste del overwrite era de
   reproducibilidad/claridad, no de datos.
4. **¿Creo infraestructura desproporcionada?** No: 2 env-guards de 1 línea
   semántica, 1 namespace, 1 manifest, 2 tests. Sin tooling nuevo, sin
   dependencias, sin CI changes.
5. **¿El guard actual ya es suficiente para el riesgo real?** Para el fallo
   medido (reintroducir el CSS histórico), sí. Para vías JS/otros
   pseudo-elementos, no — documentado en §4 en vez de negarlo.
6. **¿Lo estoy ampliando demasiado?** No: el guard freeze solo prohíbe
   escribir a 2 directorios congelados; las corridas normales siguen
   funcionando igual (escriben a latest/).
7. **¿Cambio el resultado de 9.2-B sin autorización?** No: el grain queda
   exactamente como 9.2-B lo decidió (2 texturas, 0 animación). Solo se
   precisó el WORDING.
8. **¿Confundo limitación del laboratorio con invalidez experimental?** No:
   E5-LAB mantiene la causalidad dentro del entorno; lo que se retiró es la
   pretensión de universalidad, no el hallazgo.
9. **¿El nuevo diseño de artifacts facilita la reproducibilidad?** Sí: cada
   experimento futuro escribe a su namespace con manifest de SHAs; responder
   "¿qué código produjo esta medición?" es un `cat metadata.json`.
10. **¿Lo correcto era NO cambiar nada y solo documentar?** No del todo: solo
    documentar dejaba el afterAll vivo — la próxima corrida de QA habría
    vuelto a sobrescribir fase7a y la doc quedaría falsa al instante. El
    gate era necesario para que la semántica declarada sea TRUE.

## 9. Riesgos residuales

- El guard freeze escanea solo `e2e/`; un script node suelto (no spec)
  podría escribir a artifacts congelados. Cobertura: los únicos writers de
  artifacts del repo son estos 2 specs (verificado por grep esta fase).
- `EVIDENCE_NAMESPACE` apunta a donde el humano diga: si alguien lo apunta a
  fase7a manualmente, el freeze de Git lo detectará en el diff. El test
  congela los LITERALES del código, no las env-vars (documentado).
- Los artifacts históricos dev-vs-preview de fases intermedias (7B, 8, 9.0,
  9.1) siguen en su commit respectivo con su mezcla de entorno. Restaurar
  TODOS sería reescribir la historia de cada fase — rechazado: cada commit
  documenta lo que la fase midió entonces; el manifest 9.2-b deja la
  corrección registrada.

## 10. Estado

DONE (pendiente del veredicto del arquitecto).

## 11. Única siguiente acción

Auditoría del arquitecto sobre esta fase (commits de 9.2-C). Tras su
veredicto: congelar la parte técnica de Fase 9 y abrir el cuello de botella
real — material humano de Sebastián (vídeo hero, fotografía propia,
sesiones reales para /about y /community).
