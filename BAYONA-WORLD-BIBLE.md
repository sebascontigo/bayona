# BAYONA-WORLD-BIBLE

> Documento maestro de World Building — FASE 6.
> **PARTE I — ADN VISUAL DE BAYONA** (Bloque 1). La Parte II (Mundos 00–08) se escribirá en el Bloque 3, sobre esta base.
> Prompt rector: PROMPT MAESTRO V2.0 · Autorización del auditor: BLOQUE 1 únicamente (2026-08-28).
> Estado: **PROPUESTA DOCUMENTAL VINCULANTE PARA FASES 6–8** — este documento no implementa nada; gobierna decisiones futuras.
> Convención de referencias: el estado vivo del código se comprueba con Git; aquí se citan archivos y decisiones, no SHAs vivos.

**Etiquetas de evidencia** (disciplina V2.0 §7):
- **CONFIRMADO** — verificado en el código o en documentos aprobados del repo.
- **DERIVADO** — inferencia directa de evidencia confirmada; no es un hecho independiente.
- **PROPUESTO** — decisión documental nueva de este documento; aún no existe en el producto.
- **HISTÓRICO** — registro del pasado; no describe el estado actual.

Regla de lectura: cuando este documento dice "BAYONA usa X", X existe hoy (CONFIRMADO). Cuando dice "BAYONA hará/deberá X", es lenguaje que gobernarán Fase 7/8 (PROPUESTO) y se marca como tal.

---

## A. PROPÓSITO DEL DOCUMENTO

### Qué problema resuelve

El propietario diagnosticó el problema con precisión: las páginas internas "se sienten demasiado negras, planas y similares entre sí" y quiere que el visitante sienta que "está recorriendo una experiencia, no leyendo una página estática" (CONFIRMADO — CONTEXTO-MAESTRO-CONTINUIDAD.md §0/§34). La respuesta del proyecto no es "más animación": es **profundidad + movimiento + narrativa + precisión + coherencia** (CONFIRMADO — visión del propietario, ídem).

Sin un ADN escrito, cada página se resolvería con criterio estético del momento y el sitio derivaría en una de dos fallas: 17 diseños incompatibles (espectáculo) o 17 copias del mismo layout (monotonía). Este documento existe para que la diferenciación sea **con identidad**: "Página A editorial. Página B 3D. Página C datos. Página D fotografía. Página E storytelling. Pero todas: BAYONA" (CONFIRMADO — §36).

### Qué fases alimentará

- **Fase 6 (esta):** el Bloque 3 (mundos 00–08) se construye sobre estos principios; los Bloques 4–5 (blueprints y matriz) los aplican ruta por ruta.
- **Fase 7 (escenas 3D):** WORLD-3D-STRATEGY usará la sección H (profundidad) y el criterio de admisión de este ADN.
- **Fase 8 (migración):** cada contrato `resolvePageMotionContract()` deberá poder trazar su origen hasta un principio de esta Parte I.

### Qué NO implementa

Cero código, cero CSS, cero escenas, cero tokens nuevos (CONFIRMADO — alcance de Fase 6, D-008). Nada de lo escrito aquí es una instrucción de implementación; es criterio. La frase "luz de acento" no es un token nuevo: es un nombre para un comportamiento que ya existe en los tokens actuales.

### Qué decisiones futuras podrá gobernar

1. Qué movimiento corresponde a cada página (junto a MOTION-MAP y SCROLL-STORY-MATRIX).
2. Qué escenas 3D se admiten y cuáles se rechazan (junto a WORLD-3D-STRATEGY).
3. Qué composición, material y luz puede tener una sección sin romper la marca.
4. Cuándo una idea "espectacular" debe descartarse por claridad (sección J).
5. Cómo distinguir una mejora BAYONA de una imitación de otra marca (sección K).

---

## B. QUÉ ES BAYONA (como sistema de identidad)

No como eslogan, como sistema. Cada elemento está verificado en fuentes vivas del repo.

### B.1 Definición nuclear

BAYONA es un ecosistema de entrenamiento con método y acompañamiento humano real. Su tagline declarado es **"Movimiento, ciencia y propósito humano"** (CONFIRMADO — `src/config/site.config.js`, `BRAND.tagline`). Su home se describe como "Método de movimiento con dirección: plan mensual personalizado, seguimiento humano y cuatro niveles de acompañamiento. Sin humo ni promesas de resultado" (CONFIRMADO — `src/lib/seo/routeMeta.js`).

Tres sustantivos gobiernan todo: **movimiento** (el producto), **ciencia** (el rigor), **propósito humano** (el modo). Ninguno es decorativo: los tres aparecen operacionalizados abajo.

### B.2 El acompañamiento es el producto

La evidencia comercial es unánime: lo que BAYONA vende no es acceso a contenido, es **presencia humana estructurada** (CONFIRMADO — `src/config/offerings.js`):

| Plan | Journey declarado | Promesa nuclear |
|---|---|---|
| RAÍZ | RECONSTRUCCIÓN | "Cada día sabes qué hacer y alguien te ayuda a sostenerlo" |
| FUERZA | PROGRESO REAL | "Entrenas en vivo con alguien que te guía y te empuja a avanzar" |
| RENDIMIENTO | TRANSFORMACIÓN TOTAL | "Guía directa, cuatro sesiones en vivo y ajustes para transformar tu esfuerzo en resultados" |
| ELITE | DOMINIO TOTAL | "Sebastián, ocho sesiones privadas y cada detalle diseñado alrededor de ti" |

El método se declara en tres pasos: **TE LEEMOS → CONSTRUIMOS → TE ACOMPAÑAMOS** (CONFIRMADO — `src/config/conversionContent.js`). Y el sitio ataca explícitamente la dependencia de la motivación: "DEJAS DE IMPROVISAR / CADA SESIÓN TIENE UN OBJETIVO / NO DEPENDES DE TU MOTIVACIÓN" (CONFIRMADO — ídem). Conclusión derivada: **la identidad de BAYONA es estructura que sostiene, no estímulo que excita** (DERIVADO).

### B.3 La honestidad como sistema operativo

BAYONA declara sus claims por tipo, "no se infiere desde el copy": `editorial / aspiration / commercial / evidence / concept` (CONFIRMADO — `CLAIM_TYPES` en `conversionContent.js`). Sus reglas de copy prohíben "promesas de resultado" y "lenguaje médico" (CONFIRMADO — `routeMeta.js`). Sus aspiraciones están deliberadamente contenidas: "Despiertas con más energía / Tu cuerpo responde mejor / Te mueves sin dudar / Sabes exactamente qué hacer cada día / Dejas de empezar de cero cada lunes" (CONFIRMADO — bloque `aspiration`). Nada de transformaciones milagro.

Esto se extiende al producto: BAYONA+ "está en desarrollo… sin fechas comprometidas" (CONFIRMADO — routeMeta); Parkour es pre-apertura honesta "Interés abierto · Sin pago · Sede y horarios por confirmar" (CONFIRMADO — FASE4-ARQUITECTURA-EXPERIENCIA.md); la comunidad es gratis de verdad (CONFIRMADO — routeMeta); no hay pago online, la conversión es una conversación por WhatsApp (CONFIRMADO — J2–J4 en ROUTE-JOURNEYS.md). Conclusión derivada: **BAYONA prefiere perder espectacularidad antes que perder credibilidad** (DERIVADO).

### B.4 Personas reales, no arquetipos

Los testimonios son situaciones vitales concretas, no cuerpos ideales: hábitos y energía (Andrea), dolor de espalda y trabajo (Carlos), postparto (Mai), disciplina de parkour (Sebastián), falta de tiempo real (Paola), una familia entera (Familia Rusa) (CONFIRMADO — `src/config/testimonials.js`). El plan ELITE nombra a la persona real que lo imparte (CONFIRMADO — offerings.js). Conclusión derivada: **la prueba social de BAYONA es biográfica, no aspiracional-estética** (DERIVADO).

### B.5 Un lugar real

BAYONA no es un producto digital sin territorio: hay sesiones presenciales en España "sujeto a ubicación y disponibilidad" (CONFIRMADO — nota de cumplimiento en PlanCalculator, registrada en memoria de Fase 2; servicio `presencial-espana-1to1` en `shopCatalog.js`), una academia física de parkour con sede por confirmar (CONFIRMADO), y un número de WhatsApp español como canal de conversión (CONFIRMADO — 34 614 988 006). Conclusión derivada: **la web debe sentirse situada, no globalizada** (DERIVADO).

### B.6 El sistema visual ya construido (lo que el ADN hereda)

- **Dirección acordada:** "Balance premium + decisión estructural"; la web debe sentirse "oscura, moderna, editorial, cinematográfica sin exceso, adulta, directa, estructural, premium, útil y clara" (CONFIRMADO — BAYONA_05_DOCUMENTO_MAESTRO.md §7).
- **Superficies:** escalera de elevación por luminosidad sobre negro — `--ds-surface-background #050505 / deep #0B0B0C / raised #0c0c0d / content #111111 / overlay #141416` + glass con presupuesto (CONFIRMADO — `src/styles/ds-tokens.css`; "el problema era la luz, no el color", DESIGN-SYSTEM.md §6).
- **Color:** acento único familia naranja `#F4A261 / fire #E76F51 / deep #D45D38`; tinta white / muted #A3A3A3 / dim #6b6b6b (CONFIRMADO — ds-tokens.css).
- **Tipografía:** Montserrat (titulares) / Inter (cuerpo) / DM Mono (etiquetas); escala display→h1→h2→h3→h4→lead→body→body-small→eyebrow (CONFIRMADO).
- **Radios:** sharp 0 (defecto de marca) / control 10 / float 16 / round (CONFIRMADO).
- **Movimiento:** Motion Engine 2.0 — 3 intensidades (`quiet/balanced/immersive`), 8 recetas, presupuesto por zonas (`hero 3 / body 2 / supporting 1 / cta 2 / background 0`), tokens cerrados (4 duraciones, easings `exit/travel/transform`, distancias `near/medium/far`) (CONFIRMADO — `src/engine/`, MOTION-MAP.md).
- **Navegación:** cuatro sistemas, cada uno responde una pregunta — Navbar (dónde puedo ir) / Breadcrumb (dónde estoy) / JourneyRibbon (cómo va mi recorrido) / NextChapter (qué viene después) (CONFIRMADO — doctrina D12, FASE4).
- **Privacidad:** sin cookies, sin cuentas; la memoria del visitante vive solo en memoria de sesión (CONFIRMADO — J10, ROUTE-JOURNEYS.md).

### B.7 Qué la diferencia de una web fitness genérica

| Web fitness genérica | BAYONA (evidencia) |
|---|---|
| Vende motivación ("¡empieza hoy!", cuerpos ideales) | Vende estructura ("no dependes de tu motivación", situaciones reales) — CONFIRMADO |
| Promete resultados garantizados | Tipa sus claims y veta promesas de resultado — CONFIRMADO |
| Conversión = pago online inmediato | Conversión = conversación humana por WhatsApp, sin pago online — CONFIRMADO |
| Estímulo constante (banners, urgencia, countdowns) | Calma presupuestada (reglas de calma del Motion Engine) — CONFIRMADO |
| Producto sin lugar (SaaS global) | Servicio situado (presencial España, academia física) — CONFIRMADO |
| Estética energética/clara/deportiva | Estética oscura/editorial/adulta/estructural — CONFIRMADO |

---

## C. QUÉ NO ES BAYONA (prohibiciones explícitas)

Cada prohibición tiene fuente. No son gustos: son decisiones registradas.

1. **NO es fitness motivacional genérico.** "No convertirla en una web fitness motivacional" (CONFIRMADO — DOCUMENTO_MAESTRO §7). Anti-ejemplo: hero con grito épico, countdown de oferta, "transforma tu cuerpo en 30 días".
2. **NO es hype vacío.** "No usar hype, milagros o promesas garantizadas" (CONFIRMADO — ídem); copy "sin humo ni promesas de resultado" (CONFIRMADO — routeMeta). Prohibido inventar resultados, plazos o aval médico.
3. **NO es lujo superficial.** El lujo de BAYONA es estructural (decisión D-001 Awwwards-luxury + "balance premium + decisión estructural"): proviene de proporción, jerarquía, material y precisión — no de dorados, brillos ni ornamento. Lujo vacío = decoración cara sin decisión detrás (DERIVADO de §7 y D-001).
4. **NO es tecnología decorativa.** "No añadir efectos tecnológicos sin propósito" (CONFIRMADO — §7); "¿Qué idea de la página representa este objeto? No debe existir una esfera solo porque es fácil hacer una esfera" (CONFIRMADO — §39).
5. **NO es espectáculo sin función.** Evitar: "3D decorativo aleatorio; exceso de partículas; animaciones infantiles; efectos 'wow' sin propósito; scroll hijacking" (CONFIRMADO — §38). La intención NO es "llenar todo de animaciones" (CONFIRMADO — §0).
6. **NO es copia de referentes externos.** Nike, Apple, Arc'teryx, Porsche, Aesop, Gymshark y las plantillas Awwwards son contexto cultural, no plantilla conceptual (CONFIRMADO — regla del auditor, Bloque 1 §9; ver test K.2).
7. **NO es una web sin restricciones honestas.** "No eliminar avisos médicos, legales o de disponibilidad que tengan función contextual"; "no dejar que los disclaimers dominen la experiencia" (CONFIRMADO — §7). La honestidad se dosifica, no se esconde ni se impone.
8. **NO es 17 webs distintas.** La diferenciación por página tiene límite: "las páginas podrán variar la composición; no podrán romper el sistema" (CONFIRMADO — §40, referido a tipografía y extensible al sistema completo).
9. **NO es un embudo agresivo.** Sin dark patterns, sin urgencia artificial, sin pago por sorpresa: el checkout "prepara una solicitud: aquí no se procesa ningún pago" (CONFIRMADO — routeMeta) y la salida es una conversación.
10. **NO es un producto terminado donde no lo hay.** BAYONA+ no promete fechas; Parkour no vende plazas que no existen (CONFIRMADO — routeMeta, FASE4). Prohibido fabricar escasez o disponibilidad falsa.

---

## D. LOS 10 PRINCIPIOS OPERATIVOS

Hipótesis aprobada por el auditor (2026-08-28): estos 10. Verificación crítica ejecutada durante el Bloque 1 (duplicados, relleno, faltantes) — resultado en D.11; sin problema material, se mantienen los 10.

Formato por principio: **Definición · Función · Evidencia · Traducción visual · Traducción espacial · Traducción de movimiento · Riesgo · Anti-patrón · Corrección · Decisión futura que condiciona.**

---

### D.1 PROGRESIÓN

**Definición.** En BAYONA nada empieza por el final: todo recorrido tiene pasos ordenados que se ganan. La progresión es el eje temporal de la identidad: RECONSTRUCCIÓN → PROGRESO REAL → TRANSFORMACIÓN TOTAL → DOMINIO TOTAL.

**Función.** Resuelve el problema del visitante abrumado ("no sé por dónde empezar") sin recurrir a la venta directa: orienta por etapas. Convierte la oferta en itinerario.

**Evidencia (CONFIRMADO).** Cuatro planes con journeys escalados (`offerings.js`); onboarding como recepción de pasos que termina en ruta recomendada (J2, D9); "Dejas de empezar de cero cada lunes" (aspiration); parkour con "progresiones técnicas" (routeMeta); itinerario canónico de capítulos (chapters.js); JourneyRibbon como memoria de progreso (J10).

**Traducción visual.** Números ordinales y marcadores de etapa visibles (patrón `01/02/03` ya existente en los bloques editoriales de conversionContent); escaleras de planes presentadas como niveles, no como tarjetas sueltas; la etiqueta DM Mono como voz del progreso.

**Traducción espacial.** Las páginas de entrada presentan puertas y pasos, no muros de contenido: home con tres puertas (EXPLORAR / ENCONTRAR MI CAMINO / VER PLANES, CONFIRMADO), recepción como umbral secuencial. El scroll puede revelar por etapas cuando la etapa es el mensaje.

**Traducción de movimiento.** `editorial-slide` es la receta de la dirección y el progreso ("señala dirección y progreso", MOTION-MAP); secuencias de pasos con `data-cascade` contenida; el paso nunca entra con teatro que retrase la comprensión.

**Riesgo.** Convertir toda la web en un tutorial: fragmentar tanto que el visitante experto (J3, "ya sabe qué quiere") no encuentre atajo.

**Anti-patrón.** Obligar a pasar por 5 pantallas de onboarding para ver un precio; animar cada viñeta como si fuera un logro de videojuego.

**Corrección.** Toda progresión ofrece su atajo: J3 existe y llega al comparador directo (CONFIRMADO); el precio es público sin pasos previos (D-002).

**Decisión futura que condiciona.** Cuántos pasos puede tener una secuencia por página (Bloque 4), y qué páginas pueden usar narrativa secuencial vs. acceso directo (Bloque 5).

---

### D.2 PRECISIÓN

**Definición.** Cada elemento está donde está por una razón, y cada palabra dice exactamente lo que es — ni más (hype) ni menos (opacidad). La precisión es doble: **geométrica** (alineación, proporción, sistema) y **expresiva** (claims exactos, tipados, sin promesas).

**Función.** Es el antídoto estructural contra el hype y contra el caos visual. Produce la sensación "adulta" y "estructural" de la dirección acordada.

**Evidencia (CONFIRMADO).** §41: "Todo debe tener una razón de alineación… La web debe transmitir: precisión"; CLAIM_TYPES con declaración explícita "no se infiere desde el copy"; routeMeta sin promesas de resultado ni lenguaje médico; tokens de movimiento en conjuntos cerrados (4 duraciones, 3 distancias, easings con nombre de intención); helpers fail-safe (`resolveIntensity`, `resolveBudget`, `resolveRouteMeta`); precios publicados en COP exactos (D-002).

**Traducción visual.** Grid con razón de alineación para títulos, imágenes, tarjetas, datos, botones, líneas (§41); jerarquía tipográfica única (§40); el acento `#F4A261` se usa para señalar, no para decorar: si todo es acento, nada lo es (DERIVADO de la economía de tokens).

**Traducción espacial.** Los márgenes y la retícula son parte del mensaje: el espacio vacío es decisión, no sobra. Ningún elemento flotante sin razón de plano.

**Traducción de movimiento.** Reglas de calma: "micro > macro: preferir movimientos pequeños y precisos"; distancias `near/medium/far` como vocabulario cerrado; sin rebotes, overshoot ni elasticidad (CONFIRMADO — MOTION-MAP). El movimiento preciso llega y se detiene; no "flota" indefinidamente.

**Riesgo.** Precisión convertida en rigidez: páginas tan cuadriculadas que se sienten frías o muertas. La precisión sin humanidad es maqueta.

**Anti-patrón.** Alinear todo al milímetro y luego llenar el copy de "experiencia premium única" sin contenido: precisión visual con vaguedad verbal. También: usar el acento en 12 elementos de una misma vista.

**Corrección.** La precisión se combina con humanidad (D.7): el sistema es estricto, las personas son reales. Y el copy sigue la misma regla que el grid: cada frase debe poder defenderse (CLAIM_TYPES).

**Decisión futura que condiciona.** Qué claims se admiten en cada blueprint (Bloque 4); cuándo una composición puede romper la retícula a propósito (solo con justificación, nunca por decoración); el presupuesto de acento por vista.

---

### D.3 TENSIÓN

**Definición.** La tensión es el momento en que algo está a punto de cambiar: el visitante contiene la respiración. En BAYONA la tensión siempre es **breve, justificada y se resuelve** — nunca es estado permanente.

**Función.** Sin tensión no hay narrativa: es el contraste que hace sentir el reposo. Resuelve el problema de las páginas "planas" diagnosticado por el propietario, sin caer en el espectáculo.

**Evidencia (CONFIRMADO).** El copy editorial abre con tensión real del visitante: "DESPIERTAS CANSADO / ENTRENAS SIN RESULTADOS / TU CUERPO TE HABLA / NO TIENES TIEMPO" (conversionContent); §35: la secuencia de scroll como narrativa (elemento aparece → cámara cambia → texto se reconfigura); `cinematic-stage`: "un único momento narrativo por página que justifica detener el tiempo"; dirección conceptual Fuerza = "tensión / masa / compresión" (§39); regla de calma "alternar movimiento → reposo" (MOTION-MAP).

**Traducción visual.** Contraste controlado: un elemento que domina momentáneamente la composición (escala, posición, silencio alrededor). La tensión visual se crea con jerarquía y vacío, no con efectos.

**Traducción espacial.** La tensión ocupa un lugar acotado en la secuencia de la página (una sección, un momento), nunca la página entera. Después de la tensión viene la recuperación (D.4) — el orden importa.

**Traducción de movimiento.** `cinematic-stage` (immersive, un momento por página) y `horizontal-passage` son las gramáticas de la tensión narrativa; el `pin` detiene el tiempo un instante; distancias `far` solo cuando la amplitud comunica. Máximo un momento `immersive` por página (CONFIRMADO — SCROLL-STORY-MATRIX).

**Riesgo.** Tensión permanente = ruido. Si todo es clímax, nada lo es; el visitante se agota y desconecta.

**Anti-patrón.** Tres secciones sticky consecutivas con música visual de partículas; abrir una página de precios con un clímax narrativo.

**Corrección.** Presupuesto: una página, un momento de tensión (regla immersive única). Las páginas de decisión y lectura van sin tensión narrativa (SCROLL-STORY-MATRIX: `quiet`, nunca sticky ni horizontal).

**Decisión futura que condiciona.** Qué páginas tienen derecho a un momento immersive (Bloque 5); dónde se coloca la tensión en la secuencia (Bloque 2: nunca sin aproximación previa).

---

### D.4 RECUPERACIÓN

**Definición.** La recuperación es el retorno al equilibrio: del cuerpo (descanso, cuidado) y de la experiencia (reposo visual, salida serena, recolocación). Es la otra mitad del ritmo: sin ella, la tensión es agresión.

**Función.** Doble. Identitaria: BAYONA vende recuperación literal como servicio (el cuerpo se cuida). Experiencial: garantiza que toda intensidad tenga salida y que nadie se quede perdido.

**Evidencia (CONFIRMADO).** Categoría comercial RECUPERACIÓN con servicios reales: masaje deportivo, protocolo de recuperación, movilidad asistida, pilates, yoga terapéutico (`shopCatalog.js`); reglas de calma "alternar movimiento → reposo" (MOTION-MAP); `quiet-transition`: "continuidad sin teatro"; `/order-confirmation` como "cierre sereno; confirmación sin teatro" (SCROLL-STORY-MATRIX); J9: el 404 recupera con cuatro tarjetas, "nunca callejón sin salida"; reduced-motion como experiencia completa, no degradada (§44).

**Traducción visual.** Secciones de reposo: densidad baja, superficies content/raised sin competencia, tipografía de lectura. El silencio visual es un material de la marca.

**Traducción espacial.** Después de cada zona intensa de una página existe una zona de descompresión antes del siguiente bloque o del CTA. El 404 y los cierres son espacios de recolocación, no culpas.

**Traducción de movimiento.** Intensidad `quiet` (amplitud ×0.5, una cosa a la vez); `quiet-transition` para entradas/salidas; `editorial-reveal` para la lectura; reduced-motion: todo visible, corte limpio (MOTION-MAP).

**Riesgo.** Confundir recuperación con aburrimiento: páginas tan en calma que parecen vacías o inacabadas.

**Anti-patrón.** Eliminar el reposo: enlazar tres momentos intensos "para mantener la atención"; o el extremo opuesto: una página entera en quiet sin ninguna jerarquía que invite a seguir.

**Corrección.** La recuperación es activa: prepara lo siguiente. El cierre sereno orienta (NextChapter existe precisamente para continuar, D12). Calma ≠ vacío: la composición sigue trabajando con jerarquía y material.

**Decisión futura que condiciona.** Dónde van las zonas de descompresión en cada blueprint; qué páginas son íntegramente de recuperación (FAQ, resources, order-confirmation, 404); el tratamiento de reduced-motion como ciudadanía completa.

---

### D.5 MATERIA

**Definición.** La materia es de qué están hechas las cosas en BAYONA: superficies reales, tipografía con cuerpo, fotografía con grano, luz que revela textura. La marca se siente al tacto aunque sea una pantalla.

**Función.** Resuelve el diagnóstico "demasiado negro y plano" por la vía del material, no del color: la profundidad viene de la calidad de la superficie (§42). Evita el negro infinito y el plástico digital.

**Evidencia (CONFIRMADO).** §42 REGLA PARA EL NEGRO: "La profundidad se creará usando: diferentes superficies; iluminación; fotografía; textura; 3D; contraste; composición; espacios"; escalera de 5 superficies + glass (ds-tokens.css); grano de película existente en la capa luxury de Fase 1 (`v3-finish.css`, feTurbulence — CONFIRMADO como existente, HISTÓRICO como decisión de Fase 1); sombras `--ds-shadow-lift` y `lift-warm` ("elevación con brasa cálida"); Montserrat/Inter/DM Mono como materiales tipográficos con roles fijos.

**Traducción visual.** Cada bloque declara su material: superficie (cuál de las 5), textura (grano contenido o ausente), borde (radio sharp/control/float según naturaleza), sombra (lift cuando hay elevación real). El acento es brasa, no neón: `#F4A261 → #D45D38` es una familia cálida de fuego contenido.

**Traducción espacial.** Los materiales organizan: lo que es fondo (background/deep), lo que es contenido (content), lo que flota (raised/overlay). Un cambio de material puede marcar cambio de capítulo sin necesidad de línea ni título.

**Traducción de movimiento.** La materia se mueve como materia: `image-drift` da profundidad "sin mareo"; nada de elasticidad de goma ni rebotes (reglas de calma); solo `transform` y `opacity` — el material no se deforma, se desplaza y se revela.

**Riesgo.** Materialidad fetichista: acumular texturas, granos y sombras hasta el ruido; o el opuesto: ignorar la materia y volver al negro plano.

**Anti-patrón.** Glassmorphism en todas las tarjetas "porque es premium"; grano visible al punto de distraer de la lectura; sombras dobles en cada elemento.

**Corrección.** Presupuesto material: una vista elige su material dominante; el glass tiene presupuesto explícito (solo ≥900px y con soporte, CONFIRMADO — DESIGN-SYSTEM.md §6); el grano es ambiente, nunca protagonista.

**Decisión futura que condiciona.** Qué superficie/textura corresponde a cada mundo (Bloque 3) y a cada sección de blueprint (Bloque 4); cuándo se admite glass; el uso del acento como brasa contenida.

---

### D.6 PROFUNDIDAD

**Definición.** La profundidad es la percepción de que hay planos: algo detrás, algo delante, algo que se mueve entre ellos. Es el eje Z de la identidad — distinto de la materia (D.5), que es la calidad de cada plano.

**Función.** Es la respuesta directa al deseo del propietario: que el scroll sea "recorrer una experiencia" (§0/§34). Convierte la página en espacio sin convertir la web en videojuego.

**Evidencia (CONFIRMADO).** Visión: "profundidad + movimiento + narrativa + precisión + coherencia" (§0); §42 lista la profundidad como sistema (superficies, iluminación, fotografía, textura, 3D, contraste, composición, espacios); escalera de superficies como planos reales; `image-drift` ("profundidad sin mareo"); Globe3D viva en `/about` (única escena 3D actual — verificado en el checkpoint V2.0); `useScrollHandoff()` preparado para entregar estado de scroll a escenas futuras (PHASE5 §14).

**Traducción visual.** Planos documentales mapeados conceptualmente a la escalera existente: fondo (background/deep) → contenido (content) → elevado (raised) → overlay. **Nota de disciplina:** esta correspondencia es guía conceptual, no equivalencia técnica — una superficie CSS no es automáticamente un plano narrativo (regla del auditor). No se inventan superficies nuevas.

**Traducción espacial.** Cada sección declara cuántos planos usa y para qué. La profundidad espacial se gana por composición (elementos que entran y salen de plano) antes que por efectos.

**Traducción de movimiento.** Parallax contenido (`image-drift`, factor 0.4 en móvil, 0 en reduced-motion); `cinematic-stage` como evolución de planos por estados; el 3D es el plano excepcional y requiere justificación (sección H y WORLD-3D-STRATEGY).

**Riesgo.** Profundidad = mareo: capas que se mueven sin jerarquía, parallax en todo, el visitante pierde el suelo.

**Anti-patrón.** Cinco capas de parallax simultáneas; un fondo 3D permanente detrás del texto de lectura; usar z-index como decoración.

**Corrección.** Una página elige su estrategia de profundidad dominante (composición, parallax contenido, o escena) y las demás quedan supeditadas. Máximo una capa de parallax simultánea en móvil (MOTION-MAP). El plano de lectura nunca compite.

**Decisión futura que condiciona.** Qué blueprints llevan parallax/sticky/3D (Bloque 5); el criterio de admisión de escenas (Fase 7); la jerarquía de planos por mundo (Bloque 3).

---

### D.7 HUMANIDAD

**Definición.** La humanidad es la presencia de personas reales en la identidad: rostros, nombres, situaciones vitales, voz directa de adulto a adulto. BAYONA no habla como marca-corporación; habla como alguien que entrena contigo.

**Función.** Diferencia radical frente al fitness genérico (arquetipos aspiracionales) y frente al SaaS frío (interfaz sin personas). Ancla el "propósito humano" del tagline.

**Evidencia (CONFIRMADO).** Tagline "Movimiento, ciencia y propósito humano" (site.config.js); testimonios biográficos con nombres reales (testimonials.js); "seguimiento humano" y "acompañamiento humano por delante de la promesa rápida" (routeMeta home/about); ELITE nombra a Sebastián personalmente (offerings.js); copy en segunda persona directa y adulta: "TU CUERPO TE HABLA", "NO TIENES TIEMPO" (conversionContent); avatar y bandera circulares como elementos de persona (DOCUMENTO_MAESTRO §7).

**Traducción visual.** Fotografía de personas reales en situaciones reales (no stock de gimnasio genérico); el retrato tiene lugar propio (avatar circular, CONFIRMADO como patrón vivo); la voz del copy es directa sin ser agresiva.

**Traducción espacial.** Los momentos humanos (historia, testimonios, comunidad) tienen espacio de lectura: no se comprimen en carruseles veloces. La sección de personas se trata como lectura, no como decoración.

**Traducción de movimiento.** `editorial-reveal` para testimonios e historia (la lectura manda); nada de efectos que distorsionen rostros o conviertan personas en material de espectáculo; el texto humano entra con calma (`quiet`/`balanced`).

**Riesgo.** Falsa humanidad: stock emocional, frases de poster, "somos una familia" sin evidencia. O el opuesto: convertir lo humano en blandura que diluye la exigencia del método.

**Anti-patrón.** Carrusel de testimonios con música épica y zoom dramático a rostros; copy "únete a nuestra tribu" inventando comunidad donde hay un servicio.

**Corrección.** La humanidad de BAYONA es sobria y exigente: personas reales que hicieron el trabajo (los testimonios describen esfuerzo y resultado honesto, no magia). La voz es cálida pero adulta.

**Decisión futura que condiciona.** Qué fotografía se admite en cada mundo (Bloque 3); cómo se tratan las secciones de testimonios/historia en blueprints (Bloque 4); el tono de copy por tipo de página.

---

### D.8 ACOMPAÑAMIENTO

**Definición.** El acompañamiento es el servicio nuclear hecho estructura: alguien va contigo antes, durante y después de la decisión. Si la humanidad (D.7) es la presencia de personas, el acompañamiento es **lo que esas personas hacen por ti**: leen, construyen, acompañan.

**Función.** Es el diferenciador comercial central y el principio que gobierna la conversión: en BAYONA convertir no es cerrar una venta, es empezar a acompañar. Resuelve el miedo del visitante a decidir solo.

**Evidencia (CONFIRMADO).** Los cuatro planes son grados de acompañamiento ("alguien te ayuda a sostenerlo" → "alguien te guía" → "acompañamiento real" → "cada detalle diseñado alrededor de ti"); método TE LEEMOS → CONSTRUIMOS → TE ACOMPAÑAMOS; comunidad gratuita por WhatsApp (routeMeta); conversión por conversación (WhatsApp en todos los journeys, J1–J8); onboarding como recepción que orienta sin pedir cuenta ni datos (J2); checkout como "configura tu experiencia" que prepara una solicitud, no un pago; NextChapter como continuidad tras cada página (D12).

**Traducción visual.** Los CTAs son invitaciones conversacionales, no órdenes de compra ("conocer mi camino", "solicitar detalles", "empezar gratis"); el plan recomendado se señala con sobriedad (FUERZA destacado "con sobriedad", DOCUMENTO_MAESTRO §7).

**Traducción espacial.** Toda página de decisión tiene una salida humana visible (WhatsApp o videollamada); el embudo es un pasillo acompañado (breadcrumb visible incluso en checkout, CONFIRMADO — J2), nunca un túnel; después de cada conversión hay continuidad (order-confirmation responde "qué ocurre ahora").

**Traducción de movimiento.** El movimiento acompaña sin empujar: `quiet-transition` entre capítulos; el CTA primario nunca se retrasa por movimiento (regla confirmada en MOTION-MAP y SCROLL-STORY-MATRIX); la recepción (onboarding) señala dirección y progreso paso a paso (`editorial-slide`).

**Riesgo.** Acompañamiento = fricción: tantas preguntas y pasos que el visitante que ya decidió no puede comprar. O el opuesto: "acompañar" solo en el copy, con una experiencia que deja solo al usuario.

**Anti-patrón.** Chatbot flotante que interrumpe la lectura; obligar a registrarse para ver precios; CTA que dice "EMPIEZA TU TRANSFORMACIÓN" cuando el producto ofrece una conversación.

**Corrección.** El acompañamiento ofrece, no retiene: cada paso tiene salida directa (J3 compra directa existe; los precios son públicos). La prueba del principio: ¿el visitante siente que alguien le ayuda o que alguien le persigue?

**Decisión futura que condiciona.** La lógica de CTAs y salidas de cada blueprint (Bloque 4); qué páginas llevan continuidad NextChapter vs. salida directa; el tratamiento del embudo como espacio acompañado (Bloques 4–5).

---

### D.9 TERRITORIO

**Definición.** BAYONA existe en un lugar real, con restricciones reales: sesiones presenciales en España, una academia con sede física, una comunidad local, un número de teléfono real. El territorio ancla la marca a lo concreto y le prohíbe fingir ser un producto digital sin suelo.

**Función.** Protege la honestidad (B.3/B.5): la disponibilidad, la presencialidad y los límites geográficos son parte de la identidad, no letra pequeña. Diferencia frente a SaaS desterritorializados y frente a fitness online genérico.

**Evidencia (CONFIRMADO).** Servicio `presencial-espana-1to1` y nota "Presencial en España · sujeto a ubicación y disponibilidad" (shopCatalog.js + PlanCalculator, registro de Fase 2); Parkour Academy con "sede y horarios por confirmar" dicho de frente (routeMeta/FASE4); WhatsApp español como canal (34 614 988 006); testimonios con contexto vital real; la propia marca nace del contexto del propietario (DOCUMENTO_MAESTRO).

**Traducción visual.** Lo presencial se representa como presencia (fotografía de lugar, personas, sesión real), no como iconografía de mapa genérico; los avisos de disponibilidad son tipografía honesta, no disclaimers escondidos ni dominantes (§7: ni eliminar ni dejar dominar).

**Traducción espacial.** Las páginas con componente físico (parkour, shop presencial) reservan lugar para la logística real (sede, disponibilidad, formato) como contenido de primera clase, no como nota al pie.

**Traducción de movimiento.** Ninguna especial: el territorio se expresa por contenido y composición. Cuando aparezca (Fase 7) una representación del lugar, aplicará el criterio 3D de la sección H: ¿qué idea de la página representa? (Parkour: "trayectoria / libertad", §39, dirección conceptual).

**Riesgo.** Territorio = localismo limitante: presentar BAYONA como algo pequeño cuando su método sirve también en remoto (los planes son online con sesiones en vivo). O el opuesto: esconder lo local para parecer global.

**Anti-patrón.** Mapa del mundo animado con puntos "en 40 países" (falso); esconder "sujeto a ubicación" hasta después del pago; tratar la academia como producto digital.

**Corrección.** Dualidad honesta y visible: lo virtual (planes con sesiones en vivo) y lo presencial (España, sede) son dos ofertas distintas con sus condiciones dichas antes de decidir. La escala real de BAYONA es parte de su credibilidad.

**Decisión futura que condiciona.** Cómo se comunica presencial/virtual en fichas y shop (Bloque 4); si el mundo de la academia (Bloque 3) justifica representación espacial del lugar; qué avisos de disponibilidad son estructurales en cada blueprint.

---

### D.10 DECISIÓN

**Definición.** La decisión es el momento en que el visitante elige, y BAYONA lo respeta: en ese instante, todo se aparta. Nada de movimiento, nada de narrativa, nada de estética que compite con la elección. La claridad gana.

**Función.** Protege el negocio sin traicionar la identidad: el sitio puede ser narrativo y profundo porque garantiza que el momento de decidir es limpio. Resuelve la tensión entre espectáculo y conversión de una vez: por turnos.

**Evidencia (CONFIRMADO).** Dirección acordada: "balance premium + **decisión estructural**" (DOCUMENTO_MAESTRO §7); SCROLL-STORY-MATRIX: páginas de decisión en `quiet`, sin sticky ni horizontal, "CTA sin retraso"; checkout "máxima claridad, cero distracción"; FAQ como capítulo "ANTES DE DECIDIR" (chapters.js); comparador y calculadora en Programs (J3); fichas de plan con precio público, PDF y dos salidas claras (WhatsApp / configurador); "el CTA primario nunca se retrasa por movimiento" (MOTION-MAP).

**Traducción visual.** En zona de decisión: jerarquía máxima del precio y del CTA, contraste alto, cero elementos compitiendo; el acento marca la acción, no adorna alrededor.

**Traducción espacial.** La decisión tiene lugar propio y reconocible (fichas, comparador, configurador, cierre de página); no se diluye en mitad de una secuencia narrativa. El embudo es un espacio aparte (grupo EMBUDO, fuera del itinerario a propósito, CONFIRMADO — PAGE-EXPERIENCE-MATRIX).

**Traducción de movimiento.** `quiet` obligatorio; `quiet-transition` como máximo gesto; presupuesto de zona `cta` usado para énfasis puntual que nunca retrasa (MOTION-MAP). Nada de `immersive` en páginas de decisión.

**Riesgo.** Convertir la decisión en frialdad total: que el sitio pierda su identidad justo donde más importa comercialmente. O el opuesto: no poder evitar el teatro ni en el checkout.

**Anti-patrón.** Configurator con transiciones de página cinematográficas entre pasos; precio que aparece con cuenta atrás; CTA que entra volando después de 2 segundos de animación.

**Corrección.** La decisión puede ser elegante (material, tipografía, proporción siguen siendo BAYONA) pero no puede ser lenta ni ruidosa. Regla de oro: si el movimiento añade un solo segundo entre el visitante y su elección, sobra.

**Decisión futura que condiciona.** Qué páginas quedan clasificadas como decisión/conversión en la matriz (Bloque 5); el tratamiento quiet del embudo completo; dónde puede y no puede haber acento narrativo cerca de un CTA.

---

### D.11 VERIFICACIÓN CRÍTICA DE LA ESTRUCTURA (mandato del auditor)

Comprobación ejecutada durante el Bloque 1: duplicados, principios de relleno, dimensiones faltantes.

**Solapamientos evaluados:**

1. **Humanidad (D.7) vs. Acompañamiento (D.8):** no son lo mismo. La humanidad gobierna la **representación** (personas reales, voz adulta, fotografía biográfica); el acompañamiento gobierna la **función** (qué hace BAYONA por ti: lee, construye, acompaña; cómo convierte). Prueba: una página puede tener humanidad sin acompañamiento (una historia) y acompañamiento sin humanidad visible (un checkout acompañado por breadcrumb y continuidad). Se mantienen separados.
2. **Tensión (D.3) vs. Recuperación (D.4):** son fases complementarias del mismo ritmo, no duplicados. La evidencia los trata como pareja (copy de tensión → aspiración serena; movimiento → reposo en las reglas de calma). Ninguno existe sin el otro. Se mantienen.
3. **Materia (D.5) vs. Profundidad (D.6):** la materia es la calidad de cada plano; la profundidad es la relación entre planos. Decisiones distintas: la materia elige superficie/textura/sombra; la profundidad elige cuántos planos y cómo se mueven entre sí. Se mantienen.
4. **Progresión (D.1) vs. Decisión (D.10):** la progresión ordena el tiempo largo (recorridos, planes, capítulos); la decisión protege el instante puntual de elegir. No hay duplicación.

**Dimensiones candidatas evaluadas y resueltas (sin crear principios nuevos):**

5. **Honestidad / anti-hype:** evaluada como posible principio 11. Resolución: no es un principio paralelo sino la **precisión expresiva** de D.2 (claims tipados, sin promesas) más las prohibiciones de C.2/C.3. Convertirla en principio duplicaría D.2. Registrado como decisión documental (PROPUESTO esta absorción; la evidencia base es CONFIRMADA).
6. **Ciencia:** está en el tagline y en servicios (evaluación biomecánica, composición corporal). Evaluada: no tiene traducción visual/espacial propia — se manifiesta como precisión (D.2) y como contenido de catálogo. No se crea principio; se registra su presencia (DERIVADO).
7. **Método:** evaluado: es la combinación de progresión (D.1) + acompañamiento (D.8) — TE LEEMOS/CONSTRUIMOS/TE ACOMPAÑAMOS es un recorrido acompañado. No se crea principio.
8. **Claridad:** evaluada como principio. Resolución: es una **regla transversal por encima de los principios** (sección J), porque no gobierna una dimensión de la identidad sino el desempate entre todas. Elevarla a principio debilitaría su autoridad de veto.

**Principio con menor densidad de evidencia:** Territorio (D.9). Se mantiene: sin él, la web podría presentarse como SaaS desterritorializado, contradiciendo el catálogo (presencial España, academia física). Su evidencia es real aunque menos abundante; queda señalado para que el Bloque 3 lo trate con cuidado (el mundo que lo herede no debe inventar localía).

**Conclusión:** sin problema material. Se mantienen los 10 principios de la hipótesis aprobada. Ninguno existe solo para llegar a diez; ninguna dimensión estructural confirmada queda fuera.

---

## E. CURVA EMOCIONAL MAESTRA

Derivada de los journeys reales J1–J10 (ROUTE-JOURNEYS.md), no inventada. Método: leer los 10 journeys, identificar los estados emocionales comunes, ordenarlos.

### E.1 Los siete estados del recorrido BAYONA

| Estado | Qué siente el visitante | Dónde ocurre (evidencia J1–J10) |
|---|---|---|
| 1. Descubrimiento | "¿Qué es esto?" — curiosidad sin compromiso | J1 (llega por enlace, no quiere pagar), J6 (curioso de BAYONA+), home tres puertas |
| 2. Orientación | "¿Por dónde empiezo?" — necesidad de dirección | J2 (recepción: umbral → 3 preguntas → ruta), J10 (reentrada con memoria), NextChapter |
| 3. Comparación | "¿Qué me conviene?" — evaluación racional | J2/J3 (comparador, fichas, PDF, calculadora), J8 (dudas antes de pagar) |
| 4. Decisión | "Elijo" — instante de compromiso | J2/J3 (WhatsApp o configurador), fichas de plan, checkout |
| 5. Configuración | "Lo hago mío" — personalización de la elección | J2/J3 (CONFIGURADOR: plan → clases → extras → datos) |
| 6. Contacto | "Hablo con alguien" — conversión como conversación | Todos los journeys convergen en WhatsApp (J1–J8); J8 videollamada |
| 7. Continuidad | "¿Qué ocurre ahora?" — post-decisión acompañada | J2/J3 (order-confirmation), J10 (ribbon de memoria), NextChapter |

### E.2 La curva tipo (recorrido completo J2)

```
Descubrimiento (calma) → Orientación (confianza) → [Tensión breve: el problema real]
→ Comparación (claridad) → Decisión (silencio) → Configuración (control)
→ Contacto (humanidad) → Continuidad (serenidad)
```

La tensión aparece como **momento acotado** (D.3), nunca como clima general: el copy editorial la usa al principio ("DESPIERTAS CANSADO") y la resuelve en aspiración serena ("Despiertas con más energía"). La curva termina siempre en recuperación/continuidad, nunca en clímax: la conversión de BAYONA es el inicio de una relación, no un final épico (DERIVADO de J2/order-confirmation).

### E.3 La curva no es igual para todas las páginas (clases de curva)

| Clase de página | Curva emocional | Regla |
|---|---|---|
| **Narrativa** (home, about, parkour) | Descubrimiento → tensión breve → inmersión → recuperación | Admite un momento immersive; la narrativa sirve a la identidad |
| **Lectura** (resources, faq, about-parcial) | Calma sostenida con jerarquía | Sin tensión narrativa; el movimiento no interrumpe la lectura |
| **Decisión** (fichas de plan, programs) | Claridad → silencio de decisión | `quiet`; el CTA sin retraso; la emoción no estorba |
| **Conversión** (checkout, order-confirmation) | Control → serenidad | Cero distracción; continuidad acompañada |
| **Recuperación** (404) | Desorientación → recolocación | Nunca callejón sin salida; tono sereno, sin culpa |

### E.4 Los cuatro estados emocionales que el sistema debe saber producir

- **TENSIÓN:** contenida, breve, resuelta (D.3). Herramientas: copy editorial, un momento immersive, contraste de composición.
- **RECUPERACIÓN:** reposo activo que prepara lo siguiente (D.4). Herramientas: zonas quiet, cierres serenos, 404 que recoloca.
- **CLARIDAD:** eliminación de ruido cuando hay datos o decisiones (D.2/D.10). Herramientas: jerarquía, `data-cascade` contenida, silencio alrededor del dato.
- **DECISIÓN:** el instante protegido (D.10). Herramientas: CTA visible sin retraso, precio público, salida humana.

**Regla vinculante:** la emoción nunca puede reducir la claridad (ver sección J).

---

## F. MATERIALIDAD

### F.1 Materialidad literal (lo que existe hoy — CONFIRMADO)

| Material | Existencia real | Fuente |
|---|---|---|
| Superficies | 5 superficies `--ds-surface-*` (#050505 / #0B0B0C / #0c0c0d / #111111 / #141416) + glass con presupuesto | ds-tokens.css |
| Sombras | `--ds-shadow-lift` (contacto + caída larga), `--ds-shadow-lift-warm` (brasa cálida) | ds-tokens.css |
| Color | Acento #F4A261 / fire #E76F51 / deep #D45D38; tinta white / muted #A3A3A3 / dim #6b6b6b | ds-tokens.css |
| Tipografía | Montserrat (titulares), Inter (cuerpo), DM Mono (etiquetas); escala display→eyebrow | ds-tokens.css |
| Radios | sharp 0 (defecto de marca), control 10, float 16, round | ds-tokens.css |
| Grano | Grano de película (SVG feTurbulence) en la capa luxury de Fase 1; estático bajo reduced-motion | v3-finish.css (HISTÓRICO de Fase 1, existente) |
| Fotografía | Personas reales en testimonios; fotografía de apoyo con parallax contenido | testimonials.js, image-drift |
| Movimiento | 8 recetas + intensidades + presupuesto (material cinético) | engine/recipes |

### F.2 Materialidad sugerida (cualidades que orientan fases futuras — PROPUESTO)

No son componentes ni tokens: son cualidades perceptivas que las futuras implementaciones deben respetar.

- **Textura:** el grano como ambiente de película, nunca como ruido visible; la textura sirve a la materia (D.5), no la sustituye.
- **Contraste:** la luz se gana por diferencia entre superficies, no por brillo añadido ("el problema era la luz, no el color" — DESIGN-SYSTEM §6).
- **Densidad:** alterna deliberadamente (lleno editorial ↔ vacío estructural); el vacío es material de composición.
- **Temperatura:** la familia del acento es brasa contenida (naranja → fuego → profundo); el conjunto es oscuro y cálido en los puntos de acción, frío-neutro en la lectura.
- **Peso:** los elementos importantes se sienten pesados (tipografía grande, sombras lift, reposo); nada flota sin razón.

### F.3 Materialidad prohibida (CONFIRMADO — §38 + §7 + regla del auditor)

- **Neón gratuito** y paletas de energía fluorescente (ajenas a la dirección oscura/editorial/adulta).
- **Glow excesivo:** el brillo es brasa puntual, no atmósfera permanente.
- **Glassmorphism indiscriminado:** el glass existe con presupuesto (≥900px, con soporte) — no es lenguaje general.
- **Estética sci-fi genérica:** partículas azules, hologramas, HUDs — BAYONA es cuerpo y lugar, no nave espacial.
- **Fitness motivacional genérico:** tipografías de impacto, rojo agresivo, cuerpos de stock en pleno grito.
- **Lujo vacío:** dorados ornamentales, mármol digital, "premium" sin estructura.
- **Efectos decorativos sin función:** todo material debe poder responder para qué está.

---

## G. LUZ

Seis tipos de luz, definidos sobre el sistema existente. **Prohibido inventar tokens nuevos** (alcance de Fase 6). Esto es lenguaje y criterio, no CSS.

### G.1 Luz de fondo
La que emana de las superficies mismas: la escalera #050505 → #141416 ES el sistema de luz base (CONFIRMADO). El fondo no es negro muerto: es una gradación fina que ya distingue planos. Regla: el fondo se ilumina cambiando de superficie, no añadiendo brillo (DERIVADO de §42).

### G.2 Luz de acento
El fuego contenido: #F4A261 / #E76F51 / #D45D38 (CONFIRMADO). Es luz direccional de atención — marca acción, jerarquía y brasa. Regla de economía: el acento señala; si todo es acento, nada lo es (PROPUESTO como regla de uso; los tokens son CONFIRMADO).

### G.3 Luz de plano
La que separa elevación: sombras `--ds-shadow-lift` y `--ds-shadow-lift-warm` (CONFIRMADO). Un plano se percibe elevado porque proyecta, no porque brilla. Regla: la sombra es el lenguaje de la elevación; el glass aporta separación por translucidez con presupuesto (CONFIRMADO).

### G.4 Luz tipográfica
La jerarquía como iluminación: white (protagonista) → #A3A3A3 (secundario) → #6b6b6b (apoyo) (CONFIRMADO). El texto se "ilumina" por contraste de tinta, no por efectos. Regla: la lectura nunca depende de animación ni de brillo para ser legible (DERIVADO de §44).

### G.5 Luz fotográfica
La que trae la imagen real: fotografía con luz propia (natural, de sesión, de lugar). Regla: la fotografía es material de primera clase para la profundidad (image-drift) y la humanidad (D.7); su luz no se contamina con overlays gratuitos (PROPUESTO como criterio).

### G.6 Luz de escena
La luz del plano excepcional 3D (hoy: Globe3D en /about; mañana: lo que Fase 7 justifique). **Definir la luz de escena NO es implementar 3D** — es establecer que, cuando exista escena, su luz debe responder a la idea de la página (§39) y degradar a un estado estático coherente con las cinco luces anteriores (fallback antes que escena, CONFIRMADO como arquitectura en BASELINE/PHASE5).

---

## H. PROFUNDIDAD

### H.1 Los cuatro tipos de profundidad

1. **Profundidad documental** (CONFIRMADO/PROPUESTO): la que da el sistema de información — capítulos, itinerario, breadcrumb, NextChapter, ribbon. El visitante percibe que hay más detrás porque el sitio lo revela por pasos (D.1). No requiere ningún efecto visual.
2. **Profundidad visual** (CONFIRMADO): la escalera de superficies + sombras + glass. Planos conceptuales: fondo (background/deep) → contenido (content) → elevado (raised) → overlay. **Disciplina:** correspondencia conceptual, no equivalencia técnica automática — una superficie CSS no es automáticamente un plano narrativo (regla del auditor). No se inventan superficies nuevas.
3. **Profundidad espacial** (CONFIRMADO como gramática disponible): la que crea el movimiento entre planos — `image-drift` (parallax contenido), `cinematic-stage` (evolución por estados), composición que mueve elementos entre planos durante el scroll (§35).
4. **Profundidad 3D excepcional** (CONFIRMADO como excepción viva): Globe3D en /about es hoy la única escena. Regla: **el plano 3D es una excepción que requiere justificación, no una capa obligatoria** (§39: "¿Qué idea de la página representa este objeto?"). Su admisión completa se define en WORLD-3D-STRATEGY (Bloque transversal, aún no escrito).

### H.2 Reglas de profundidad

- Una página elige su estrategia dominante (documental, visual, espacial o 3D) y subordina las demás (PROPUESTO, derivado de la regla "un momento immersive por página").
- El plano de lectura nunca compite con el plano de espectáculo (DERIVADO de SCROLL-STORY-MATRIX: decisión/lectura sin sticky ni horizontal).
- Mobile: menos capas, menos partículas, menor DPR, menos animación simultánea — la profundidad se conserva por composición, no por efectos (§43, CONFIRMADO).
- Reduced-motion: la profundidad queda en la composición y la jerarquía; el movimiento no es requisito para percibir planos (§44, CONFIRMADO).

---

## I. DENSIDAD Y RITMO

Compatibilidad explícita con el sistema existente — sin sinónimos paralelos (prohibido introducir calm/medium/intense).

### I.1 Las tres intensidades son el vocabulario único (CONFIRMADO — intensity.js)

| Intensidad | Carácter | Densidad que gobierna |
|---|---|---|
| `quiet` | Calma máxima, una cosa a la vez | Lectura, datos, fichas, cierres, decisión |
| `balanced` | Estándar BAYONA (default) | Comportamiento general; hasta 2 elementos simultáneos |
| `immersive` | Narrativa espacial completa | Un único momento narrativo por página |

### I.2 El presupuesto por zonas es la ley de densidad (CONFIRMADO — motionBudget.js)

`hero 3 / body 2 / supporting 1 / cta 2 / background 0`, con límites por intensidad (`quiet 6 · balanced 8 · immersive 10`) y máximo una zona de peso 3. Traducción identitaria: **BAYONA gasta movimiento donde comunica, no donde decora** — el fondo pesa 0 porque el fondo de BAYONA es silencio (DERIVADO).

### I.3 Ritmo

- **Micro > macro:** movimientos pequeños y precisos antes que grandes gestos (regla de calma CONFIRMADA; principio D.2).
- **Alternancia movimiento → reposo:** la base del ritmo BAYONA (D.3/D.4 como pareja).
- **Sin rebotes, overshoot, elasticidad ni flashes** (CONFIRMADO): el ritmo de BAYONA es de respiración, no de percusión.
- **Duraciones cerradas** (fast/base/slow/curtain) y distancias cerradas (near/medium/far): el ritmo no se improvisa, se declara (CONFIRMADO — motionTokens.js).

### I.4 Regla de densidad por clase de página (PROPUESTO, derivado de SCROLL-STORY-MATRIX)

- Decisión/conversión: densidad mínima de movimiento (`quiet`), densidad máxima de claridad.
- Lectura: movimiento de revelado contenido; la densidad la lleva la tipografía.
- Narrativa: densidad alta permitida en UN momento; el resto respira.
- Recuperación: densidad mínima en todo.

---

## J. PRINCIPIO DE CLARIDAD (regla de veto)

**Cuando identidad y claridad entren en conflicto en una página de decisión o conversión: LA CLARIDAD GANA.**

- El movimiento sirve a la decisión, no al revés (CONFIRMADO como regla viva: "el CTA primario nunca se retrasa por movimiento" — MOTION-MAP; "máxima claridad, cero distracción" — checkout en SCROLL-STORY-MATRIX).
- La emoción nunca puede reducir la claridad (regla del auditor, Bloque 1).
- Esta regla está **por encima de los 10 principios**: cualquier principio (tensión, profundidad, materia) cede ante ella en zona de decisión. No es un principio más porque no describe la identidad: la limita donde hace falta (ver D.11.8).
- Alcance exacto: rige en páginas de decisión y conversión. En páginas narrativas, la identidad puede llevar el peso — sin eliminar nunca la legibilidad ni la salida (§44: el contenido se entiende sin animación).

---

## K. AUTOAUDITORÍA DEL ADN

### K.1 TEST 1 — Anti-genericidad

**Pregunta:** ¿podría este documento describir cualquier gimnasio premium?

**Resultado: NO.** Especificidad BAYONA verificable en cada sección:
- El producto es acompañamiento humano estructurado, no acceso (B.2, evidencia de offerings.js).
- La honestidad es un sistema operativo con claims tipados, no un tono (B.3, CLAIM_TYPES).
- La conversión es una conversación por WhatsApp sin pago online, no un checkout (B.7).
- El territorio es real y limitado (presencial España, academia con sede), no global ficticio (B.5/D.9).
- El ritmo es respiración con presupuesto, no estímulo constante (I.2/I.3).
- Los testimonios son biografías (postparto, dolor de espalda, familia), no arquetipos (B.4).
Un gimnasio genérico no podría usar este documento sin borrar la mitad: no vende acompañamiento tipado, no convierte por conversación, no declara sus límites.

### K.2 TEST 2 — Anti-copia

**Resultado: PASA.** Ningún principio, sección o regla deriva de Nike, Apple, Arc'teryx, Porsche, Aesop, Gymshark ni de plantillas Awwwards. Todo deriva de: documentos de identidad del proyecto (DOCUMENTO_MAESTRO §6–7, CONTEXTO-MAESTRO §0/§34–44), decisiones registradas (D-001, D-002, DF-006, D-008), código vivo (offerings, conversionContent, testimonials, ds-tokens, engine) y journeys implementados (J1–J10). La dirección "Awwwards-luxury" (D-001) es un nivel de acabado aprobado por Sebastián, no una plantilla conceptual: este documento define el ADN desde BAYONA, no desde referentes.

### K.3 TEST 3 — Anti-espectáculo

**Pregunta:** ¿cada principio aumenta la claridad y la coherencia o solo hace la web más espectacular?

**Resultado: PASA.** Cuatro de los diez principios son directamente anti-espectáculo: recuperación (D.4), precisión (D.2), decisión (D.10) y la regla J de veto. Los principios de carga (tensión, profundidad, materia) llevan presupuesto incorporado: un momento por página, materiales con límite, planos subordinados a la lectura. Ningún principio ordena añadir efectos; todos ordenan decidir. La pregunta de admisión 3D ("¿qué idea representa este objeto?") está incorporada en H.1.4.

### K.4 TEST 4 — Anti-vocabulario paralelo

**Resultado: PASA.** Vocabulario del engine usado exactamente: `quiet/balanced/immersive` (nunca calm/medium/intense); las 8 recetas por su id exacto; zonas `hero/body/supporting/cta/background`; rangos `traverse/enter/pin/exit` no se renombran; duraciones `fast/base/slow/curtain`; distancias `near/medium/far`; tokens `--ds-*` citados por su nombre real. Los términos nuevos de este documento (los 10 principios, los 7 estados de la curva, los 6 tipos de luz, los 4 tipos de profundidad) nombran conceptos identitarios que NO tienen nombre en el engine — no sustituyen ninguno existente. Las correspondencias con el engine se declaran conceptuales, nunca como APIs.

---

*Clasificación global del documento: las citas de código y decisiones son **CONFIRMADO**; las síntesis marcadas son **DERIVADO**; las reglas nuevas de uso son **PROPUESTO** (vinculantes para Bloques 2–5 y Fases 7–8, pero inexistentes hoy en el producto); las referencias a Fase 1 son **HISTÓRICO** donde corresponde. Este documento no implementa nada: gobierna.*
