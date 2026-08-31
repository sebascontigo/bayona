# FASE 9.2-A — PERCEPTUAL PRIORITY REASSESSMENT (diagnóstico puro, 0 código)

> **Fecha:** 2026-09-01 · **HEAD:** `01676a1` (= origin/main, árbol limpio, verificado) · **Autorización:** directiva del arquitecto tras su veredicto 9.1 = APROBADA CON OBSERVACIONES (8.8/10): "NO implementar 9.2... EJECUTAR FASE 9.2-A. Diagnóstico puro... EMPEZAR POR EL CUELLO DE BOTELLA REAL."
> **Método:** recorrido perceptual con MEDICIÓN en ejecución real (build + preview + Playwright, 1440 y 390), no memoria ni informes previos. Correcciones de evidencia del arquitecto incorporadas ANTES de este diagnóstico (commit `01676a1`).

## 1. Correcciones de evidencia del arquitecto — CERRADAS

| Corrección exigida | Resolución | Etiqueta |
|---|---|---|
| Contabilidad 8-vs-9 commits | **9 commits exactos** en el rango `c1878d5..41894e7`: 1 documental diagnóstico + 1 documental Crítico + **2 funcionales** (navbar, footer) + 1 funcional QA (targets 44px) + 1 documental DS + **3 de evidencia**. Registrado con desglose en PROJECT-STATE | MEDIDO (git log) |
| Grain 0.02 vs 0.05 | **Existen 2 grains activos simultáneos** [MEDIDO en ejecución]: el DIV del engine (opacity **0.02** computada, estático, z 9999, `ExperienceProvider.jsx:165` lo reduce de su default 0.03) + el `body::after` de v3-finish (opacity **0.05**, z **2147483647**, **animación `grain-shift 1.1s steps(6) infinite`**, desactivada en reduced-motion — verificado). Ambos inertes | MEDIDO |
| z 2147483647 fuera de escala | Excepción **DECORATIVE TOPMOST** registrada en DESIGN-SYSTEM §16 con condiciones vinculantes (pointer-events:none, decorativo, no reutilizable, requiere justificación) | CONFIRMADO en código + documentado |
| Semántica footer | Aceptada la corrección: es "cierre editorial de mayor presencia" (16–21px), NO "monumental" | CORREGIDO en docs |
| Regla de capa propietaria CSS | Aceptada como gobernanza: cada cambio CSS global futuro declarará su capa dueña (la deuda de cascada quedó registrada, no se ataca ahora) | REGISTRADO |

## 2. Evaluación MEDIDA de los 6 candidatos del arquitecto

### CANDIDATO A — Hero Art Direction
**[MEDIDO desktop+390]** El hero ya comunica en 3 segundos: kicker "NO ES MOTIVACIÓN · ES ESTRUCTURA" + H1 "CONSTRUYE LA VERSIÓN MÁS FUERTE DE TI." (121px desktop / 50.7px móvil, cabe en pantalla) + CTA dual visible (VER PLANES y / IR DIRECTO A LA DECISIÓN en y=535 móvil — dentro del primer pliegue). El fondo es CSS puro (partículas respirando del bloque H), **sin video ni foto**.
**Evaluación:** la estructura narrativa del hero está RESUELTA. Lo que le falta no es dirección de arte de código: es **material humano propio** (fotos/vídeo real). Con CSS ya no sube más — exactamente lo que el benchmark 9.1 ya concluyó de Fitonist (video como "medio vivo").

### CANDIDATO B — Material humano / fotografía real
**[CONFIRMADO]** El hallazgo se mantiene y se ACUMULA como único cuello de botella real: /about tiene **0 imágenes** (6 fondos escénicos), /community 2 imgs sin alt descriptivo, el hero sin media humana. Toda la humanidad vive en copy — que está al nivel — pero la percepción de "entrenador real, personas reales" no puede construirla el código.
**Evaluación:** es el candidato de mayor impacto, pero **requiere a Sebastián** (fotos de sesiones/entrenamiento/vídeo hero). El sistema puede PREPARARSE (specs de formato/duración/encuadre ya escritas en el prompt de 9.1-B→F §8) pero el asset no puede inventarse.

### CANDIDATO C — Ritmo de la Home
**[MEDIDO]** 22 secciones, 13 H2s, **18.641px de alto = 20.7 pantallas de scroll**. Es un recorrido largo — pero coherente con el blueprint (la home reparte 3 journeys). Las 4 experiencias narrativas (E/F/G/H) viven verificadas. No hay evidencia de fatiga medida (eso requeriría usuarios reales); el ritmo ya fue diseñado, no es un vacío.
**Evaluación:** sin evidencia de problema. NO es el cuello de botella.

### CANDIDATO D — Performance perceptual
**[HISTÓRICO/INFERIDO]** LCP laboratorio subió +15–48% global incluida ruta control intacta (clasificado INFERIDO como entorno, no causalidad demostrada — el arquitecto lo marcó PARTIAL CONFIDENCE y su protocolo A–J para medir queda registrado). El hallazgo MEDIDO nuevo: **2 grains superpuestos, uno animado infinitamente en body::after** — coste GPU global sin presupuesto. Es el único hallazgo de performance ACCIONABLE sin material externo.
**Evaluación:** el candidato D real no es "medir LCP otra vez" sino **decidir el presupuesto de los efectos globales permanentes** (grain doble: ¿consolidar en uno? ¿desactivar animación?). Pequeño, medible, sin riesgo comercial.

### CANDIDATO E — Conversion architecture
**[MEDIDO]** Precios publicados ✓, 4 enlaces WhatsApp ✓, CTA dual en hero ✓, embudo quiet intacto ✓. La arquitectura de conversión está completa por diseño (Fase 4 + blueprints). Mejorar conversión requiere tráfico real/análisis de usuarios, no más código.
**Evaluación:** NO es el cuello de botella ahora.

### CANDIDATO F — Consistencia entre rutas
**[MEDIDO]** H1 idéntico 86.4px en las 4 rutas sondeadas, footer tagline 21px idéntico, navbar TOP uniforme. La consistencia del chrome quedó cerrada por la propia 9.1.
**Evaluación:** RESUELTO. NO tocar.

## 3. CRÍTICO INVISIBLE — intentando refutar los rankings

**Refutación 1: "¿A (hero) no será el P1 de código tras todo?"** Intenté refutarlo midiendo: el hero ya tiene estructura (kicker+H1+CTA dual+respiración H). Sobrevive la refutación la hipótesis contraria: sin material humano, rediseñar el hero de código sería decorar una pieza ya resuelta. **REFUTADO como P1 de código; CONFIRMADO como P1 total (con B).**

**Refutación 2: "¿D (grain) no es trivial?"** Es pequeño, pero es el único hallazgo MEDIDO con coste en cada frame de cada ruta (animación infinita global + doble textura). Y tiene un dato objetivo: nadie decidió conscientemente 2 grains — el engine lo montó el equipo Fase 3 y v3-finish añadió el segundo sin retirar el primero. Es exactamente la clase de "mejora silenciosa acumulada" que el Red Team del arquitecto existe para cazar. **Sobrevive como candidato técnico.**

**Refutación 3: "¿por qué no C (ritmo) si la home tarda 20 pantallas?"** Sin usuarios reales no hay evidencia de fatiga; y el largo ES el diseño (3 journeys repartidos). Matar secciones sería destruir blueprint aprobado sin evidencia. **REFUTADO.**

## 4. DECISIÓN (fórmula del arquitecto: IMPACTO ÷ COSTE × CONFIANZA)

| Candidato | Impacto | Coste | Confianza evidencia | Resultado |
|---|---|---|---|---|
| **B. Material humano** | ALTO (transforma percepción de marca) | Requiere Sebastián (0 código que lo sustituya) | ALTA (medido: 0 imgs en /about) | **P1 total — pero bloqueado en material externo** |
| **D1. Presupuesto grain** | MEDIO (coste GPU en cada frame, cada ruta) | BAJO (1 decisión + ~10 líneas) | ALTA (2 grains medidos) | **P1 ejecutable AHORA** |
| A. Hero art direction | — (ya resuelto en código) | — | — | absorbedo por B |

**La siguiente intervención de mayor impacto EJECUTABLE sin material externo: cerrar el presupuesto de efectos globales permanentes (grain).** La de mayor impacto TOTAL (material humano) queda formalmente especificada y esperando a Sebastián — el documento de specs de vídeo/foto ya existe.

## 5. CÓMO PODRÍA ESTAR EQUIVOCADO (autorefutación obligatoria)

1. **Hipótesis alternativa:** el grain animado podría ser imperceptible en coste real (los steps(6) son baratos en GPU moderna) y consolidarlo podría ser optimización invisible al usuario. **Prueba que me refutaría:** medir FPS/CPU con y sin animación en dispositivo real de gama baja — no disponible en este laboratorio headless; por eso la decisión correcta es CONDICIONAL (medir antes de eliminar), no ciega.
2. **Condición para cambiar de opinión:** si al medir el coste resulta <2% de frame budget, KEEP ambos grains y cerrar el expediente.

## 6. Veredicto y UNA acción

**Veredicto: BLOQUEADO-PARA-P1-TOTAL (material humano) / A — EJECUTAR para el P1 técnico ejecutable.**

**ÚNICA SIGUIENTE ACCIÓN:** Presentar al arquitecto esta reassessment para su decisión entre: **(a)** autorizar el micro-bloque 9.2-grain (consolidar 2 grains en 1 con medición antes/después según su protocolo A–J), o **(b)** declarar Fase 9 completa y pasar el testigo a Sebastián con la spec de material humano (vídeo hero + fotos /about + /community) como el único salto restante.

*Diagnóstico puro — 0 código modificado. Todo lo medido en este documento salió de ejecución real contra build `01676a1`.*
