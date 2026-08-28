# PAGE-BLUEPRINTS — Planos de experiencia por ruta

> FASE 6 · **BLOQUE 4** (PAGE BLUEPRINTS DE ALTA PRECISIÓN + AUDITORÍA DE NO-INTERCAMBIABILIDAD).
> Autorización del auditor (ChatGPT, 2026-08-28): **BLOQUE 4 ÚNICAMENTE**, sobre el cierre del BLOQUE 3.
> Documentos rectores: `BAYONA-WORLD-BIBLE.md` (ADN + Mundos 00–08), `SPATIAL-LANGUAGE.md` (gramática espacial), `PLAN-FASE-6-WORLD-BUILDING.md` §0.2/§BLOQUE 4.
> Condiciones vinculantes vigentes: **DF-009** (disciplina de evidencia), **DF-010** (territorio no es folclore), **DF-011** (diferenciación real), **DF-012** (anti-burocracia). **DP-5** (ELITE "acceso de por vida") NO se toca ni se resuelve aquí.
> Estado: **PROPUESTA DOCUMENTAL VINCULANTE** para el BLOQUE 5 y Fases 7–8. **No implementa nada**: cero código, cero CSS, cero componentes, cero escenas.

**Etiquetas de evidencia (DF-009):**
- **CONFIRMADO** — verificable en código, documentos aprobados del repo, decisiones registradas o contenido comercial vivo.
- **DERIVADO** — inferencia directa trazable a evidencia concreta; responde "¿de dónde sale esto?".
- **PROPUESTO** — decisión nueva de este Bloque 4; no existe hoy en el producto.
- **HISTÓRICO** — registro del pasado; no describe el estado actual.

**Regla de relación con el engine (requisito del auditor):** las referencias a recetas, intensidades y zonas son **CONCEPTUALES, NO APIs**. Este documento no crea contratos, tokens ni firmas; declara experiencia. La traducción a `resolvePageMotionContract()` pertenece al BLOQUE 5 (matriz de decisión) y a Fase 8 (implementación), no a este bloque.

---

# COBERTURA DEL DOCUMENTO

Este documento usa **exclusivamente** las cuatro categorías normalizadas de `PLAN-FASE-6-WORLD-BUILDING.md` §0.2 (corrección obligatoria #4, vinculante). Inventario verificado contra `src/lib/seo/routeMeta.js` (`ROUTE_META` = 17 claves; `ROUTE_ALIASES` = 1 alias; `NOT_FOUND_META` = fallback) y contra el contrato de baseline (`baselineContract.test.js`, ROUTES.md).

| Categoría | Definición | Rutas cubiertas | Total | Cobertura |
|---|---|---|---|---|
| **A. Rutas públicas canónicas** | Contenido propio y pathname propio en `ROUTE_META` | `/`, `/about`, `/programs`, `/parkour-academy`, `/shop`, `/app`, `/community`, `/resources`, `/faq`, `/onboarding`, `/checkout`*, `/order-confirmation`*, `/plan/raiz`, `/plan/fuerza`, `/plan/rendimiento`, `/plan/elite` | **16** | 16/16 → §blueprints 1–16 |
| **B. Alias** | Renderiza el componente de otra ruta; solo la canónica se indexa | `/entrar` → `/onboarding` | **1** | 1/1 → entrada 17 |
| **C. Fallback 404** | Metadatos de ruta inexistente (`NOT_FOUND_META`); nunca indexada | catch-all `*` | **1** | 1/1 → entrada 18 |
| **D. Ruta interna** | En `ROUTE_META`, fuera del sitio público (noindex + Disallow + fuera de sitemap) | `/design-system` | **1** | Nota explícita → sección D (sin blueprint completo) |

**Demostración de cobertura (D-01 no puede fallar por categorías):**
- A: 16 canónicas listadas = 13 estáticas de `ROUTE_META` (7 raíz de grupo: `/`, `/about`, `/programs`, `/parkour-academy`, `/shop`, `/app`, `/community` + 4 de APRENDER/embudo: `/resources`, `/faq`, `/onboarding` + 2 de embudo noindex: `/checkout`, `/order-confirmation`) − intersección 0 + 4 dinámicas `/plan/:id` generadas por `buildPlanRoutes()` desde `membershipPlans` (RAÍZ, FUERZA, RENDIMIENTO, ELITE) = **16**. ✓
- A + B = las "17 rutas públicas" del contrato de baseline. ✓
- `ROUTE_META` (17 claves) = A (16) + D (1: `/design-system`). ✓
- Sitemap (`indexableRoutes()`): exactamente las **14 indexables** de A (16 − `/checkout` − `/order-confirmation`). ✓
- Total de entradas de blueprint: **16 + 1 alias + 1 fallback = 18**, + 1 nota de exclusión para la categoría D. Ni falta ni sobra ninguna ruta del inventario §0.2. ✓

**Convenciones de lectura:**
- Cada blueprint de categoría A tiene los 15 campos obligatorios (§5 del prompt rector).
- Vocabulario cerrado del engine, sin sinónimos: intensidades `quiet / balanced / immersive`; recetas `editorial-reveal`, `editorial-slide`, `compact-rail`, `cinematic-stage`, `data-cascade`, `image-drift`, `horizontal-passage`, `quiet-transition`; zonas `hero / body / supporting / cta / background`; rangos `traverse / enter / pin / exit`. Estados espaciales (capa conceptual, Bloque 2): `ENTRADA / APROXIMACIÓN / TENSIÓN / INMERSIÓN / DESCUBRIMIENTO / DECISIÓN / SALIDA`.
- "Contrato propuesto" resume intensidad/sticky/horizontal/parallax/text-motion/3D por ruta. Es la lectura experiencial compatible con `SCROLL-STORY-MATRIX.md` (Fase 5), NO la declaración técnica (eso es BLOQUE 5).
- Los estados marcados **(estructura)** son estructurales (la página no funciona sin ellos); **(admite)** son opcionales.

---

## 1. `/` — HOME · EL MÉTODO SE RECORRE

### 1.1 Identidad de la ruta
- **Ruta:** `/` · **Nombre funcional:** Raíz/orientación (CONFIRMADO — PAGE-EXPERIENCE-MATRIX fila 1).
- **Mundo dominante:** 00 ORIGEN · **Mundo secundario:** 02 MÉTODO (DERIVADO — ambos figuran como rutas nucleares del Bloque 3; la home es la única ruta que habita dos mundos a plena vista).
- **Función real:** orientar en segundos a tres tipos de llegada distintas sin pedirles nada todavía: el curioso (J1), el indeciso (J2) y el decidido (J3).

### 1.2 Pregunta del visitante
"¿Esto es para mí y por dónde empiezo?" — No es una pregunta publicitaria: es la duda de alguien que aterriza sin saber si BAYONA es gimnasio, app, academia o venta de humo. (DERIVADO — tres puertas validadas D11; HOME_DESCRIPTION: "Sin humo ni promesas de resultado".)

### 1.3 Trabajo que la página debe resolver
Entre la llegada y la salida, el visitante debe pasar de "no sé qué es esto" a "sé qué es BAYONA y sé cuál de las tres puertas es la mía". La home no convierte: **reparte**. Si el visitante sale sin elegir puerta pero entendiendo el método, la página cumplió. (DERIVADO — J1/J2/J3 parten todos de `/`.)

### 1.4 Estado de llegada
Sabe: que busca algo relacionado con entrenamiento (o nada: J1). No sabe: qué es el método, quién está detrás, cuánto cuesta, si hay trampa. Necesita: una primera frase que descarte el humo y una puerta que le parezca suya. (CONFIRMADO — hero editorial "DESPIERTAS CANSADO…", conversionContent.js.)

### 1.5 Estado de salida
Comprende: el método (dirección, no improvisación), que hay acompañamiento humano real y que los precios existen y están publicados. Puede: haber elegido puerta y avanzar a recepción, programas o recursos. Siente: calma editorial, no presión comercial. (DERIVADO — curva E.2 de la World Bible.)

### 1.6 Secuencia espacial
1. **ENTRADA (estructura):** umbral con tres puertas (EXPLORAR / ENCONTRAR MI CAMINO / VER PLANES). Recibe sin pedir; jerarquía inmediata. (CONFIRMADO — D11.)
2. **APROXIMACIÓN (admite):** el método TE LEEMOS → CONSTRUIMOS → TE ACOMPAÑAMOS da contexto antes de pedir. (CONFIRMADO — conversionContent.js.)
3. **TENSIÓN (un momento, admite):** el copy de apertura nombra el problema real ("despiertas cansado") y lo resuelve en aspiración serena. Breve y resuelto — nunca clima. (DERIVADO — BIBLE D.3 + hero vivo.)
4. **INMERSIÓN (un momento, admite):** el método como recorrido espacial: un escenario que evoluciona por estados mientras se baja. (CONFIRMADO como propuesta — SCROLL-STORY-MATRIX fila `/`: cinematic-stage sticky ●.)
5. **DESCUBRIMIENTO (admite):** prueba social sin arrastrar three.js: las voces publicadas como dato (testimonials.js) + recursos gratuitos como hallazgo. (CONFIRMADO — hallazgo F6-04 del Bloque 3.)
6. **DECISIÓN (estructura, suave):** el ancla de oferta (VER PLANES) y las cuatro tarjetas de plan con precio público. Sin retraso. (CONFIRMADO — J3: GoldButton VER PLANES → ancla de oferta.)
7. **SALIDA (estructura):** NextChapter hacia `/about` (itinerario canónico, chapters.js). (CONFIRMADO.)

### 1.7 Arquitectura narrativa
1. **Umbral** — la primera pantalla establece tono de adulto a adulto y ofrece reparto de caminos. Razón: la home atiende 3 journeys; el error sería forzar uno solo.
2. **El problema real** — nombrar la fatiga/improvisación con honestidad editorial. Razón: sin problema no hay método; es el único momento de tensión y está resuelto por la aspiración inmediata.
3. **El método como recorrido** — el momento immersive: el visitante *recorre* el método en vez de leerlo. Razón: es la respuesta de identidad al diagnóstico original ("páginas planas y similares"); solo la home carga la identidad completa.
4. **Prueba sin teatro** — voces publicadas + cuerpo que entrena. Razón: la prueba social de BAYONA es humana, no numérica (marco editorial de testimonials.js: nunca "evidencia verificada").
5. **La oferta visible** — cuatro niveles con precio publicado en COP. Razón: la transparencia de precios es parte del método (D-002; nada oculta precio ni condiciones).
6. **Continuidad** — salida al siguiente capítulo. Razón: la home nunca es un final, es el inicio del itinerario.

### 1.8 Geometría de información
**Exploratoria-orientadora.** Tres puertas como decisión de primer orden y después un hilo vertical narrativo que converge en la oferta. Justificación: la home debe repartir sin abandonar a quien solo baja; ninguna otra ruta del sitio tiene esta doble naturaleza (puertas + relato). (DERIVADO — D11 + curva E.3 clase narrativa.)

### 1.9 Densidad y ritmo
**`immersive`** (un solo momento: el escenario del método). Justificación: es la página que carga la identidad del sitio y la visión del propietario ("recorrer una experiencia, no leer una página estática"); el presupuesto `immersive` se gasta íntegro aquí y en ninguna otra sección. (CONFIRMADO — SCROLL-STORY-MATRIX: `/` immersive; MOTION-MAP: un único momento narrativo.)

### 1.10 Movimiento conceptual
- `cinematic-stage` — el escenario del método evoluciona por estados (zona `hero`/`body`, único momento immersive). CONFIRMADO como propuesta de Fase 5 (matriz).
- `image-drift` — deriva contenida de imagen para profundidad sin mareo en el relato. CONFIRMADO (matriz Fase 5).
- `editorial-reveal` — lectura de bloques editoriales al ritmo de lectura. (PROPUESTO — dentro del vocabulario, sin contradecir la matriz.)
- Text motion: `mask` en titulares (CONFIRMADO — matriz).
- Relación conceptual: zona `hero` peso 3 una sola vez; `cta` sin retraso. **Relaciones conceptuales, no APIs.**

### 1.11 Presupuesto de atención
Concentra: el umbral (puertas) y el escenario del método. Recupera: en la sección de voces (ritmo rail/reveal suave) y en el silencio alrededor del ancla de oferta — antes del precio, todo se aquietó. La oferta final llega en calma para que la decisión no herede agitación. (PROPUESTO, compatible con `checkBudget`.)

### 1.12 Momento irreductible
**El reparto de puertas.** Si se eliminara la elección EXPLORAR / ENCONTRAR MI CAMINO / VER PLANES y la home fuera un relato único con un CTA, dejaría de ser la página que atiende a los tres visitantes reales y se volvería un embudo disfrazado de portada. Es el único lugar del sitio donde BAYONA declara: "no todos llegáis igual". (CONFIRMADO como decisión D11; el resto es DERIVADO.)

### 1.13 Prohibiciones específicas
- Prohibido **duplicar el globo**: las voces viven como dato (testimonials.js); Globe3D es de `/about`. (CONFIRMADO — hallazgo F6-04.)
- Prohibido que el momento immersive retrase o desplace el ancla de oferta: la home es narrativa, no de decisión, pero contiene decisión. (DERIVADO — regla de claridad §7 del SPATIAL-LANGUAGE.)
- Prohibido inventar métricas de resultado: las voces son "experiencias publicadas", nunca "evidencia verificada". (CONFIRMADO — marco editorial de testimonials.js.)
- Prohibido copiar el patrón de `/programs` (comparador + calculadora): aquí no se compara, se reparte. (PROPUESTO.)

### 1.14 CTA y continuidad
CTA según puerta: recepción (J2), recursos (J1), ancla de planes (J3). Después: `/onboarding`, `/resources` o `/programs`. Continuidad canónica: NextChapter → `/about`. (CONFIRMADO — chapters.js.)

### 1.15 Evidencia
CONFIRMADO: tres puertas (D11), hero editorial y método (conversionContent.js), precios públicos (offerings.js), matriz Fase 5 (cinematic-stage/image-drift/mask), F6-04, itinerario chapters.js. DERIVADO: mundos 00+02, curva emocional, presupuesto de atención. PROPUESTO: geometría exploratoria-orientadora, prohibiciones 3–4, `editorial-reveal` como receta complementaria.

---
## 2. `/about` — NOSOTROS · LA HISTORIA DETRÁS DEL MÉTODO

### 2.1 Identidad de la ruta
- **Ruta:** `/about` · **Nombre funcional:** Marca (CONFIRMADO — matriz Fase 4 fila 2).
- **Mundo dominante:** 00 ORIGEN · **Mundo secundario:** 05 COMUNIDAD (DERIVADO — el mapa de voces del globo es la prueba de que el acompañamiento cruza fronteras; los mundos 00 y 05 comparten aquí terreno con roles distintos).
- **Función real:** responder quién está detrás de BAYONA y por qué el método pone el acompañamiento por delante de la promesa rápida. (CONFIRMADO — title/description en routeMeta.js.)

### 2.2 Pregunta del visitante
"¿Quién es esta persona y por qué debería confiarme a su método?" — La pregunta de la confianza, no del catálogo. (DERIVADO — CHAPTERS['/about'].teaser: "La historia de Sebastián y diez experiencias reales en el mapa".)

### 2.3 Trabajo que la página debe resolver
Convertir la familiaridad ("me suena BAYONA") en confianza razonada: cara, historia, criterio y prueba humanas. Entre llegada y salida, "alguien en internet" pasa a ser "una persona concreta con método y gente real detrás". (DERIVADO — CTA "conocer mi camino".)

### 2.4 Estado de llegada
Sabe: que existe un método y quizá una oferta. No sabe: quién es Sebastián, de dónde viene el criterio, si hay personas reales detrás. Necesita: una historia verificable y una cara. (DERIVADO — segunda parada del itinerario, chapters.js.)

### 2.5 Estado de salida
Comprende: la razón de ser del método y su escala honesta (una persona real acompañando). Puede: escribir por WhatsApp o seguir el itinerario. Siente: confianza, cercanía sin familiaridad falsa. (DERIVADO.)

### 2.6 Secuencia espacial
1. **ENTRADA (estructura):** recepción editorial quieta: quién está detrás, sin banner de venta. (CONFIRMADO — clase narrativa, `/about` balanced.)
2. **APROXIMACIÓN (estructura):** la historia de Sebastián como contexto antes de cualquier petición. (DERIVADO — principio D.1.)
3. **DESCUBRIMIENTO (estructura):** el mapa del globo: experiencias reales explorables por curiosidad. (CONFIRMADO — Globe3D + GlobeTestimonials montan en About.jsx; marco editorial de testimonios.)
4. **SALIDA (estructura):** WhatsApp "conocer mi camino" + NextChapter → `/programs`. (CONFIRMADO — matriz Fase 4, chapters.js.)

### 2.7 Arquitectura narrativa
1. **La historia** — de dónde sale el método, en voz de primera persona. Razón: la confianza nace del origen.
2. **El mapa** — la única escena 3D viva del sitio: personas reales sobre el mundo. Razón: el globo no decora, **demostr**a el principio D.8 (acompañamiento) y D.7 (humanidad).
3. **El criterio** — por qué "movimiento, ciencia y propósito humano" y no otra promesa. Razón: separar BAYONA del ruido fitness.
4. **La salida humana** — un mensaje directo, no un formulario. Razón: si el valor es el acompañamiento humano, la conversión es una conversación.

### 2.8 Geometría de información
**Editorial-narrativa.** Un relato con un único momento central (el mapa). Justificación: es la única ruta donde el contenido ES una biografía; la geometría de relato distingue a `/about` de toda página de servicio. (PROPUESTO sobre estructura CONFIRMADA de clase narrativa.)

### 2.9 Densidad y ritmo
**`balanced`.** Justificación: la historia se lee con calma; el globo ya aporta la profundidad. Un `immersive` adicional competiría con la escena existente — y el ADN dice: una excepción no es licencia. (CONFIRMADO — matriz Fase 5 `/about` balanced; ADN sección H: 3D como excepción.)

### 2.10 Movimiento conceptual
- `editorial-reveal` — el relato emerge al ritmo de lectura (CONFIRMADO — matriz Fase 5).
- `image-drift` — profundidad contenida en imágenes de apoyo (CONFIRMADO — matriz).
- Text motion: `mask` (CONFIRMADO — matriz). Parallax: candidato ○ (CONFIRMADO — matriz).
- 3D: **EXISTENTE / EXCEPCIONAL** — Globe3D es la única escena viva del sitio (CONFIRMADO — `src/components/Globe3D.jsx` montada en `src/pages/About.jsx`). Ningún blueprint le añade escenas ni le concede licencia multiplicadora. **Corrección explícita a SCROLL-STORY-MATRIX:** su fila `/about` marca "Futuro 3D —"; se mantiene para el futuro, pero este blueprint registra que el 3D **ya existe** aquí como excepción (la matriz describe el futuro, no el presente). (Corrección declarada según tarea 3 del Bloque 4.)

### 2.11 Presupuesto de atención
Concentra: la historia (apertura) y el mapa (centro). Recupera: el cierre editorial tranquilo antes de la salida por WhatsApp. El globo es el pico; nada más compite por asombro. (PROPUESTO.)

### 2.12 Momento irreductible
**El globo de voces reales.** La promesa "acompañamiento humano real" convertida en mapa: personas con nombre, edad, ciudad. Sin el globo, `/about` sería otra biografía de entrenador; con él, es la demostración espacial de que la promesa ya ocurre en el mundo. (CONFIRMADO — la escena existe; su significado narrativo, DERIVADO.)

### 2.13 Prohibiciones específicas
- Prohibido multiplicar escenas 3D "porque la página ya tiene una". (CONFIRMADO — ADN H: excepción, no licencia.)
- Prohibido convertir testimonios en métricas o promesas de resultado. (CONFIRMADO — marco editorial testimonials.js: son "experiencias publicadas", nunca "evidencia verificada".)
- Prohibido el hero de espectáculo: si `/about` abre con algo más llamativo que el propio relato, la página compite consigo misma. (PROPUESTO.)
- Prohibido folclore territorial: el globo es presencialidad real, no estética de "mundialidad". (CONFIRMADO — DF-010.)

### 2.14 CTA y continuidad
CTA primario: WhatsApp "conocer mi camino" (CONFIRMADO). Continuidad: NextChapter → `/programs`; JourneyRibbon si hay memoria. (CONFIRMADO.)

### 2.15 Evidencia
CONFIRMADO: Globe3D en About.jsx, testimonials.js y su marco, routeMeta, matriz Fase 4/5, chapters.js, tagline site.config.js. DERIVADO: mundos 00+05, curva, geometría. PROPUESTO: prohibición del hero de espectáculo, presupuesto de atención.

---

## 3. `/onboarding` — RECEPCIÓN · EL UMBRAL QUE ORIENTA

### 3.1 Identidad de la ruta
- **Ruta:** `/onboarding` (alias `/entrar` — ver entrada 17) · **Nombre funcional:** Recepción (CONFIRMADO — matriz Fase 4 fila 16).
- **Mundo dominante:** 00 ORIGEN · **Mundo secundario:** 07 DECISIÓN en su paso final suave (DERIVADO — el mundo 00 habita la recepción; la ruta recomendada D9 es un anticipo de decisión, no la decisión comercial).
- **Función real:** orientar mediante 3 preguntas y entregar una ruta recomendada, sin vender.

### 3.2 Pregunta del visitante
"¿Cuál es mi camino?" (CONFIRMADO — matriz Fase 4 col. 5). Es la pregunta más pura del sitio: no pregunta por precios ni por contenido, pregunta por dirección personal.

### 3.3 Trabajo que la página debe resolver
Transformar "quiero pero no sé por dónde" en "empieza aquí" con nombre propio: plan recomendado (`route.planHref`, D9) con salidas honestas (comparar, WhatsApp, recursos). Sin recepción, el indeciso (J2) se pierde o aterriza directamente en precio. (CONFIRMADO — J2; D9.)

### 3.4 Estado de llegada
Sabe: que quiere algo de BAYONA (llegó por "Entrar" o la puerta ENCONTRAR MI CAMINO). No sabe: qué nivel le corresponde ni qué significa cada plan. Necesita: que le pregunten bien y poco. (DERIVADO — origen de la memoria J10.)

### 3.5 Estado de salida
Comprende: cuál de los cuatro niveles encaja con su momento y por qué. Puede: ir a su ficha, comparar planes, preguntar por WhatsApp o probar gratis. Siente: haber sido leído ("TE LEEMOS" antes de CONSTRUIMOS). (CONFIRMADO — conversionContent.js; D9.)

### 3.6 Secuencia espacial
1. **ENTRADA (estructura, especial):** umbral **inmersivo sin chrome** — la única entrada del sitio que absorbe al visitante: sin breadcrumb, sin navegación que distraiga. (CONFIRMADO — J2 "inmersivo, sin breadcrumb"; nota 4.6 de SPATIAL-LANGUAGE.)
2. **APROXIMACIÓN (estructura):** 3 preguntas que construyen contexto antes de la respuesta. (CONFIRMADO — J2; `editorial-slide` "señala dirección y progreso".)
3. **DECISIÓN (estructura, suave):** la ruta recomendada: una elección presentada, no una venta cerrada; admite comparar y rechazar. (CONFIRMADO — salidas secundarias de la fila 16.)
4. **SALIDA (estructura):** hacia la ficha del plan recomendado u otras salidas; aquí nace la memoria (JourneyRibbon). (CONFIRMADO — J10.)

### 3.7 Arquitectura narrativa
1. **El umbral** — cierre del mundo, foco total. Razón: una recepción con chrome reparte la atención justo cuando debe concentrarla.
2. **Las tres preguntas** — cada paso señala progreso y dirección. Razón: es el método BAYONA aplicado al propio sitio (se gana por pasos, D.1).
3. **La ruta** — una recomendación nombrada con su razón. Razón: la confianza nace de saber el porqué, no de un sorteo.
4. **Las salidas honestas** — comparar / WhatsApp / gratis. Razón: orientar no es encerrar; la recepción que obliga es una trampa disfrazada.

### 3.8 Geometría de información
**Guiada-conversacional.** Una pregunta a la vez, progreso visible, cero ramificación lateral. Justificación: es la única ruta del sitio donde la información se revela por diálogo en lugar de por lectura o comparación. (PROPUESTO sobre base CONFIRMADA del flujo 3 preguntas.)

### 3.9 Densidad y ritmo
**`balanced`** (CONFIRMADO — matriz Fase 5: editorial-slide + quiet-transition). La "inmersión" de la recepción es **absorción sin distracción**, no espectáculo: se produce por composición (sin chrome) y no por movimiento. (DERIVADO — nota 4.6 de SPATIAL-LANGUAGE.)

### 3.10 Movimiento conceptual
- `editorial-slide` — cada pregunta entra señalando dirección y progreso (CONFIRMADO — matriz Fase 5).
- `quiet-transition` — apertura del umbral y cierre hacia la ruta (CONFIRMADO — matriz).
- Text motion: `mask` (CONFIRMADO — matriz). Sticky/Horizontal/Parallax: ninguno (CONFIRMADO — matriz).
- 3D: **PROHIBIDO.** (CONFIRMADO — clasificación del mundo 00 en el Bloque 3: opcional solo en su uso ORIGEN de entrada del sitio; en recepción el umbral sin chrome ya ES el momento fuerte.)

### 3.11 Presupuesto de atención
Concentra: todo en la pregunta en curso. Recupera: la transición quieta entre pasos. No existe el "resto de la página": el presupuesto entero vive en el diálogo. (PROPUESTO, compatible con zonas.)

### 3.12 Momento irreductible
**La recepción sin chrome que devuelve una ruta nombrada.** Es la única página del sitio que se atreve a quitar la navegación para devolver al visitante una dirección personal. Si se eliminara (o se convirtiera en un formulario con menú), el sitio perdería su gesto de acompañamiento más literal. (CONFIRMADO — J2/D9 como hechos; su papel narrativo, DERIVADO.)

### 3.13 Prohibiciones específicas
- Prohibido mostrar precios o catálogo durante las preguntas: orienta primero, vende después (en la ficha). (DERIVADO — regla de claridad: el contexto precede a la petición.)
- Prohibido convertir la recomendación en un candado: siempre debe poder rechazarse y comparar. (CONFIRMADO — salidas secundarias fila 16.)
- Prohibido mascarilla de venta (contadores, urgencia): la recepción no fabrica prisa. (PROPUESTO — coherente con D-002 y el anti-urgency de offerings.js.)
- Prohibido un estado INMERSIÓN por efectos: su inmersión es la ausencia de chrome, no una escena. (DERIVADO — nota 4.6.)

### 3.14 CTA y continuidad
CTA primario: paso final → ficha del plan recomendado (`route.planHref`, D9). Secundarios: comparar planes, WhatsApp, recursos. No pinta breadcrumb ni NextChapter (es el inicio del itinerario). (CONFIRMADO — matriz fila 16.)

### 3.15 Evidencia
CONFIRMADO: J2/D9/J10, matriz Fase 4 fila 16, matriz Fase 5, nota 4.6 SPATIAL-LANGUAGE, chapters.js. DERIVADO: mundos 00+07, geometría guiada, momento irreductible como papel narrativo. PROPUESTO: prohibiciones 1 y 3, presupuesto.

---

## 4. `/programs` — PROGRAMAS · COMPARAR SIN RUIDO

### 4.1 Identidad de la ruta
- **Ruta:** `/programs` · **Nombre funcional:** Catálogo/comparador (CONFIRMADO — matriz Fase 4 fila 3).
- **Mundo dominante:** 07 DECISIÓN · **Mundo secundario:** 02 MÉTODO (DERIVADO — comparar los niveles es comparar cómo el método escala el acompañamiento).
- **Función real:** dejar ver los cuatro niveles, las clases y la recuperación con precios publicados, y llevar al visitante a su ficha o al configurador.

### 4.2 Pregunta del visitante
"¿Qué puedo entrenar y cuánto cuesta?" (CONFIRMADO — matriz Fase 4 col. 5). Es la pregunta del precio y del alcance, hecha antes de la confianza total.

### 4.3 Trabajo que la página debe resolver
Que la comparación sea posible sin abrir cuatro pestañas: diferencias claras de sesiones, seguimiento y precio (149k/299k/499k/899k COP), y una salida directa a ficha, configurador o WhatsApp. Entre llegada y salida, "¿cuánto vale?" pasa a "este es el mío". (CONFIRMADO — offerings.js; D6 GoldButton bajo la calculadora.)

### 4.4 Estado de llegada
Sabe: que hay una oferta (o llega desde recepción con una recomendación). No sabe: qué distingue a un nivel de otro ni qué es exactamente lo que cuesta. Necesita: una vista comparativa y una calculadora honesta. (DERIVADO — entrada de embudo col. 12.)

### 4.5 Estado de salida
Comprende: la estructura completa de la oferta y qué cambia entre niveles. Puede: abrir ficha, abrir configurador (`/checkout`), pedir por WhatsApp. Siente: control — nadie eligió por él. (DERIVADO — clase decisión.)

### 4.6 Secuencia espacial
1. **ENTRADA (estructura):** apertura que presenta el mapa de la oferta sin marear. (CONFIRMADO — clase decisión: estados prohibidos TENSIÓN/INMERSIÓN.)
2. **APROXIMACIÓN (admite, breve):** contexto mínimo de cómo leer la comparación (qué significan las sesiones y el seguimiento). (CONFIRMADO — clase decisión admite aproximación breve.)
3. **DECISIÓN (estructura):** comparador + calculadora; el precio se construye delante del visitante. (CONFIRMADO — D6, commercialSync.)
4. **SALIDA (estructura):** ficha / configurador / WhatsApp; NextChapter → `/parkour-academy`. (CONFIRMADO — chapters.js.)

### 4.7 Arquitectura narrativa
1. **El mapa de niveles** — cuatro tarjetas comparables de un vistazo. Razón: el visitante de `/programs` ya está midiendo; el ruido retrasa su medición.
2. **La calculadora** — configurar cantidad de sesiones/extras con precios vivos. Razón: la transparencia es el argumento comercial; D6 la convierte en puerta del configurador.
3. **Las fichas llamadas** — cada nivel termina en su propia ruta. Razón: la decisión fina pertenece a `/plan/*`; aquí se elige la dirección, no el detalle.

### 4.8 Geometría de información
**Comparativa.** Filas/columnas equivalentes, jerarquía de datos, diferencias primero. Justificación: es la única ruta cuya función ES comparar; ninguna otra comparte esta geometría (los planes individuales son progresivas hacia decisión, no comparativas). (PROPUESTO sobre base CONFIRMADA de comparador + calculadora.)

### 4.9 Densidad y ritmo
**`balanced`** (CONFIRMADO — matriz Fase 5: data-cascade + editorial-slide; sin sticky ni horizontal). La intensidad de decisión exige quiet pero la comparación de catálogo sostiene `balanced` sin competir. (DERIVADO — clases de página: decisión; nota 4.3.)

### 4.10 Movimiento conceptual
- `data-cascade` — los datos (precios, sesiones, seguimiento) aparecen con jerarquía sin ruido (CONFIRMADO — matriz Fase 5).
- `editorial-slide` — etiquetas e índices de sección señalan progreso (CONFIRMADO — matriz).
- Text motion: `none` (CONFIRMADO — matriz; los datos no se maquillan).
- 3D: **PROHIBIDO** (CONFIRMADO — clasificación del mundo 07).

### 4.11 Presupuesto de atención
Concentra: el comparador y la calculadora. Recupera: el silencio entre tarjetas; nada parpadea junto al precio. El CTA de configurador aparece sin retraso bajo la calculadora (CONFIRMADO — D6). (PROPUESTO la lectura de recuperación.)

### 4.12 Momento irreductible
**El precio que se construye delante del visitante.** La calculadora que suma sesiones y extras con precios reales y desemboca en el configurador: en ningún otro punto del sitio la oferta se muestra tan honestamente operativa. Si `/programs` fuera solo cuatro tarjetas con precios fijos, sería un catálogo genérico. (CONFIRMADO — D6/commercialSync como hechos; su papel como momento, DERIVADO.)

### 4.13 Prohibiciones específicas
- Prohibido cualquier sticky/horizontal/inmersión: clase decisión (CONFIRMADO — §4.3 SPATIAL-LANGUAGE).
- Prohibido resolver aquí la decisión fina de cada plan: eso pertenece a las fichas; duplicarlas sería competir consigo mismo. (PROPUESTO.)
- Prohibido ocultar o aplazar el precio: los precios publicados en COP son contrato (CONFIRMADO — D-002; MOTION-MAP: nada retrasa datos críticos).
- Prohibido el patrón de `/shop` (carrito por producto): aquí se elige acompañamiento, no se compra por sesión. (PROPUESTO.)

### 4.14 CTA y continuidad
CTA primario: comparador → ficha de plan; WhatsApp general como salida humana. Secundario: GoldButton "ABRIR EL CONFIGURADOR BAYONA COMPLETO" bajo la calculadora (CONFIRMADO — D6). Continuidad: NextChapter → `/parkour-academy` (CONFIRMADO).

### 4.15 Evidencia
CONFIRMADO: matriz Fase 4 fila 3, D6, offerings.js (precios), matriz Fase 5, chapters.js, clases de página §4.3. DERIVADO: mundos 07+02, geometría comparativa, momento irreductible. PROPUESTO: prohibiciones 2 y 4.

---

## 5–8. LAS CUATRO FICHAS DE PLAN — UN SISTEMA, CUATRO EXPERIENCIAS

**Regla común (CONFIRMADO):** las cuatro fichas comparten clase **decisión** (§4.3), intensidad `quiet`, recetas `editorial-reveal` + `quiet-transition`, text motion `none`, sin sticky/horizontal/parallax, 3D **PROHIBIDO**, breadcrumb `Inicio / Programas / Plan X`, CTA primario "QUIERO EMPEZAR" (WhatsApp) y salidas configurador + PDF (D6/D8). **Lo que no comparten es el argumento**: cada ficha existe porque un visitante distinto está resolviendo una pregunta distinta. La diferenciación documentada abajo es la respuesta a la exigencia de que no sean "cuatro copias con precio diferente". (Estructura CONFIRMADA — matriz Fase 4 filas 5–8, SCROLL-STORY-MATRIX; diferenciación DERIVADO del contenido vivo de offerings.js + conversionContent.js.)

---

## 5. `/plan/raiz` — RAÍZ · RECONSTRUCCIÓN

### 5.1 Identidad
Mundo dominante: **07 DECISIÓN** · secundario: **01 CUERPO** (DERIVADO — RAÍZ habla del cuerpo que lleva tiempo sin entrenar). Función: ficha del nivel de entrada "PARA EMPEZAR BIEN". Precio vivo: $149.000 COP/mes. (CONFIRMADO — offerings.js.)

### 5.2 Pregunta del visitante
"¿Por dónde empiezo si llevo tiempo sin entrenar?" (DERIVADO — `audience`: "Llevas tiempo sin entrenar y quieres empezar bien".)

### 5.3 Trabajo que la página debe resolver
Quitarle el miedo al retorno: estructurar el primer paso ("Cada día sabes qué hacer y alguien te ayuda a sostenerlo") y hacerlo accesible ($149k, 1 sesión virtual, seguimiento quincenal, alimentación simple). (CONFIRMADO — offerings.js RAÍZ.)

### 5.4 Estado de llegada
Sabe: que quiere volver. No sabe: si su cuerpo está listo, si será demasiado, si merece un plan "de verdad". Necesita: permiso explícito de empezar pequeño. (DERIVADO — `problem`/`feeling` de RAÍZ.)

### 5.5 Estado de salida
Comprende: que RAÍZ está diseñado para exactamente su momento. Puede: WhatsApp con precio publicado, PDF, configurador. Siente: "el primer paso, el más importante" — dignidad, no vergüenza. (CONFIRMADO — `closing` RAÍZ.)

### 5.6 Secuencia espacial
ENTRADA (estructura) → APROXIMACIÓN breve (admite: qué incluye y cómo funciona el mes) → DECISIÓN (estructura) → SALIDA (estructura). **TENSIÓN e INMERSIÓN prohibidas** (CONFIRMADO — §4.3).

### 5.7 Arquitectura narrativa
1. **El retorno** — nombrar al que lleva tiempo sin entrenar sin condescendencia. 2. **El mes RAÍZ** — qué pasa cada semana (plan diario, sesión 1:1, seguimiento quincenal). 3. **El precio honesto** — publicado y completo. 4. **La salida** — QUIERO EMPEZAR o configurador.

### 5.8 Geometría de información
**Lineal-progresiva suave**: del reconocimiento ("sé que cuesta volver") al qué-incluye al precio. Justificación: RAÍZ no compara ni mide: acompaña la vuelta. (PROPUESTO sobre catálogo CONFIRMADO.)

### 5.9 Densidad y ritmo
**`quiet`** (CONFIRMADO — matriz Fase 5). Justificación: decisión pura; el movimiento nunca compite.

### 5.10 Movimiento conceptual
`editorial-reveal` (lectura limpia) + `quiet-transition` (cierre) (CONFIRMADO — matriz). Text motion `none` (CONFIRMADO). 3D: **PROHIBIDO** (CONFIRMADO — mundo 07).

### 5.11 Presupuesto de atención
Concentra: el qué-incluye (los 7 ítems reales). Recupera: el cierre antes del CTA. El precio es visible desde la comparación y la ficha sin retraso. (CONFIRMADO el catálogo; PROPUESTO el ritmo.)

### 5.12 Momento irreductible
**"Tu primer paso. El más importante."** La ficha que honra al que vuelve en vez de pedirle que ya debería estar entrenando. Ninguna otra ruta tiene este permiso explícito de empezar pequeño. (CONFIRMADO — `closing` de RAÍZ; su papel de momento, DERIVADO.)

### 5.13 Prohibiciones específicas
- Prohibido avergonzar o presionar ("¿a qué esperas?"): tono de adulto a adulto. (DERIVADO — D.7.)
- Prohibido inflar RAÍZ con promesas de RENDIMIENTO: su valor es la estructura, no el resultado visible. (PROPUESTO.)
- Prohibido esconder que no incluye videollamadas privadas: el `excluded` es parte del contrato. (CONFIRMADO — offerings.js `excluded`.)

### 5.14 CTA y continuidad
CTA: QUIERO EMPEZAR (WhatsApp con precio publicado) (CONFIRMADO — buildPlanWhatsAppUrl). Secundarios: configurador `/checkout?plan=RAIZ` (fail-closed), PDF presentación. Vecinos: puentes a FUERZA (escalado natural). (CONFIRMADO — matriz fila 5.)

### 5.15 Evidencia
CONFIRMADO: offerings.js RAÍZ completo, matriz Fase 4/5, D6/D8, §4.3. DERIVADO: mundos 07+01, geometría, momento. PROPUESTO: prohibiciones 1–2.

---

## 6. `/plan/fuerza` — FUERZA · PROGRESO REAL

### 6.1 Identidad
Mundo dominante: **07 DECISIÓN** · secundarios: **01 CUERPO + 02 MÉTODO** (DERIVADO — FUERZA es el nivel donde alguien revisa y corrige: cuerpo guiado por método). Función: ficha del nivel destacado "ENTRENA CON ALGUIEN". Precio vivo: $299.000 COP/mes. `featured: true` (CONFIRMADO — offerings.js).

### 6.2 Pregunta del visitante
"¿Quién revisa que lo esté haciendo bien?" (DERIVADO — `audience`: "Ya entrenas, pero quieres que alguien revise y corrija").

### 6.3 Trabajo que la página debe resolver
Terminar con la duda técnica: 2 sesiones virtuales 1:1 al mes, seguimiento semanal, alimentación personalizada, videollamada mensual con Sebastián, respuestas prioritarias. "Dejas de dudar si lo estás haciendo bien." (CONFIRMADO — offerings.js FUERZA.)

### 6.4 Estado de llegada
Sabe: entrenar ya sabe. No sabe: si su ejecución y su estructura son correctas. Necesita: ojos expertos encima, no un plan nuevo. (DERIVADO.)

### 6.5 Estado de salida
Comprende: FUERZA es guía en vivo, no más material. Puede: decidir por WhatsApp/PDF/configurador. Siente: seguridad técnica. (CONFIRMADO — `feeling`/`socialProof` FUERZA.)

### 6.6 Secuencia espacial
ENTRADA (estructura) → APROXIMACIÓN breve (admite: "todo RAÍZ más:" como puente de continuidad) → DECISIÓN (estructura) → SALIDA (estructura). TENSIÓN/INMERSIÓN prohibidas (CONFIRMADO — §4.3).

### 6.7 Arquitectura narrativa
1. **Ya entrenas; falta dirección** — el valor no es empezar, es corregir. 2. **Las dos sesiones en vivo** — el corazón del nivel (guiar y empujar). 3. **Todo RAÍZ más:** — continuidad honesta con el nivel anterior (precio y contenido transparentes). 4. **La salida** — QUIERO EMPEZAR / configurador / PDF.

### 6.8 Geometría de información
**Progresiva-escalada**: se lee como "base + adiciones" (`includedLead: 'Todo RAÍZ más:'`). Justificación: es la única ficha cuya estructura informativa ES una escalada desde otra; RAÍZ no presupone nada, RENDIMIENTO/ELITE acumulan sobre esta lógica. (CONFIRMADO el `includedLead`; geometría DERIVADO.)

### 6.9 Densidad y ritmo
**`quiet`** (CONFIRMADO — matriz Fase 5). Justificación: decisión pura; el `featured` destaca por orden y peso visual, nunca por animación que retrase el precio. (DERIVADO — regla de claridad.)

### 6.10 Movimiento conceptual
`editorial-reveal` + `quiet-transition` (CONFIRMADO — matriz). Text motion `none` (CONFIRMADO). 3D: **PROHIBIDO** (CONFIRMADO — mundo 07).

### 6.11 Presupuesto de atención
Concentra: las dos sesiones 1:1 y el seguimiento semanal. Recupera: el bloque "todo RAÍZ más" leído como continuidad, no como letra pequeña. (PROPUESTO.)

### 6.12 Momento irreductible
**"Dejas de dudar si lo estás haciendo bien."** Es la única ficha cuyo producto central es la corrección en vivo: otra gente. Si se eliminara el argumento de la revisión humana constante, FUERZA sería "RAÍZ con más sesiones" — una línea de precio, no una experiencia. (CONFIRMADO — `feeling`; papel DERIVADO.)

### 6.13 Prohibiciones específicas
- Prohibido vender FUERZA como "el intermedio de relleno": su argumento es la corrección, no el precio entre dos extremos. (PROPUESTO.)
- Prohibido duplicar aquí el comparador de `/programs`: la ficha profundiza, no compara. (PROPUESTO.)
- Prohibido ocultar la base RAÍZ que incluye: la escalada es parte del contrato visible. (CONFIRMADO — `includedLead`.)

### 6.14 CTA y continuidad
CTA: QUIERO EMPEZAR (CONFIRMADO). Secundarios: `/checkout?plan=FUERZA`, PDF. Vecinos: puentes a RAÍZ (descenso) y RENDIMIENTO (escalado). (CONFIRMADO — matriz fila 6.)

### 6.15 Evidencia
CONFIRMADO: offerings.js FUERZA completo (`featured`, `socialProof`, `includedLead`), matrices Fase 4/5, D6/D8. DERIVADO: mundos 07+01+02, geometría de escalada, momento. PROPUESTO: prohibiciones 1–2.

---

## 7. `/plan/rendimiento` — RENDIMIENTO · TRANSFORMACIÓN TOTAL

### 7.1 Identidad
Mundo dominante: **07 DECISIÓN** · secundario: **02 MÉTODO** (DERIVADO — RENDIMIENTO es el nivel de la medición y el ajuste continuo: evaluación, protocolos, biohacking). Función: ficha "RESULTADOS VISIBLES". Precio vivo: $499.000 COP/mes. (CONFIRMADO — offerings.js.)

### 7.2 Pregunta del visitante
"¿Cómo mido y acelero lo que estoy consiguiendo?" (DERIVADO — `audience`: "Vas en serio…"; overlay: "Quiero medir el proceso y ajustar con mayor frecuencia").

### 7.3 Trabajo que la página debe resolver
Convertir el esfuerzo en proceso medible: 4 sesiones 1:1, evaluación biomecánica inicial completa, protocolos de biohacking, alimentación avanzada con ajustes semanales, WhatsApp 24/7, acceso anticipado a BAYONA+. (CONFIRMADO — offerings.js RENDIMIENTO.)

### 7.4 Estado de llegada
Sabe: que va en serio y quiere resultados visibles. No sabe: qué está frenando su progreso ni cómo se mediría. Necesita: una evaluación real y ajustes frecuentes. (DERIVADO.)

### 7.5 Estado de salida
Comprende: aquí el método se vuelve instrumento (medir → ajustar → transformar). Puede: decidir por las salidas estándar. Siente: "te ves y te sientes diferente" como consecuencia de un proceso, no de un azar. (CONFIRMADO — `feeling` RENDIMIENTO.)

### 7.6 Secuencia espacial
ENTRADA (estructura) → APROXIMACIÓN breve (admite: "todo FUERZA más:" + el papel de la evaluación) → DECISIÓN (estructura) → SALIDA (estructura). TENSIÓN/INMERSIÓN prohibidas (CONFIRMADO — §4.3).

### 7.7 Arquitectura narrativa
1. **Vas en serio** — reconocer al que ya no necesita motivación sino método avanzado. 2. **La evaluación inicial** — medir antes de transformar; apertura técnica del nivel. 3. **El ajuste semanal** — la frecuencia como producto (4 sesiones + ajustes). 4. **La salida** — estándar de ficha.

### 7.8 Geometría de información
**Progresiva-técnica**: del objetivo a la instrumentación (evaluación → protocolos → ajustes → precio). Justificación: RENDIMIENTO es la única ficha cuyo contenido técnico (biomecánica, biohacking) exige secuencia de instrumentos; no es una escalada simple ni un relato: es un sistema. (DERIVADO del contenido incluido CONFIRMADO.)

### 7.9 Densidad y ritmo
**`quiet`** (CONFIRMADO — matriz Fase 5). La técnica no necesita espectáculo: la precisión del dato ES el estilo. (DERIVADO — D.2.)

### 7.10 Movimiento conceptual
`editorial-reveal` + `quiet-transition` (CONFIRMADO — matriz). Text motion `none` (CONFIRMADO). 3D: **PROHIBIDO** (CONFIRMADO — mundo 07; la dirección conceptual de Fase 7 para velocidad/trayectoria no autoriza aquí nada).

### 7.11 Presupuesto de atención
Concentra: la evaluación biomecánica como apertura técnica y el bloque de ajuste semanal. Recupera: la claridad del precio frente a la densidad técnica — nada compite con las cifras. (PROPUESTO.)

### 7.12 Momento irreductible
**La evaluación biomecánica inicial completa.** Es el único punto de todo el catálogo donde BAYONA mide antes de prometer: convierte "transformación total" en un proceso verificable. Sin ella, RENDIMIENTO sería FUERZA con más sesiones. (CONFIRMADO — ítem incluido; papel DERIVADO.)

### 7.13 Prohibiciones específicas
- Prohibido dramatizar el "RESULTADOS VISIBLES" con teatro visual: el resultado se vende por instrumentación, no por brillo. (PROPUESTO.)
- Prohibido prometer resultados concretos: sin lenguaje médico ni garantías (CONFIRMADO — reglas de routeMeta; D-002).
- Prohibido ocultar que BAYONA+ está en desarrollo: "acceso anticipado" es eso y no más. (CONFIRMADO — CONTENT_STATES `concept`/`unavailable` para la app.)

### 7.14 CTA y continuidad
CTA: QUIERO EMPEZAR (CONFIRMADO). Secundarios: `/checkout?plan=RENDIMIENTO`, PDF. Vecinos: FUERZA (descenso), ELITE (escalado). (CONFIRMADO — matriz fila 7.)

### 7.15 Evidencia
CONFIRMADO: offerings.js RENDIMIENTO completo, overlays de conversionContent.js, matrices Fase 4/5. DERIVADO: mundos 07+02, geometría técnica, momento. PROPUESTO: prohibición 1.

---

## 8. `/plan/elite` — ELITE · ACOMPAÑAMIENTO PRIVADO

### 8.1 Identidad
Mundo dominante: **07 DECISIÓN** · secundario: **08 CONTINUIDAD** (DERIVADO — ELITE es la única ficha que vende una relación continua y directa: WhatsApp directo con Sebastián, eventos privados, 8 sesiones). Función: ficha tope "ACOMPAÑAMIENTO PRIVADO · MÁXIMO 10 CUPOS". Precio vivo: $899.000 COP/mes. (CONFIRMADO — offerings.js.)

### 8.2 Pregunta del visitante
"¿Puedo tener a Sebastián para mí, y qué implica exactamente?" (DERIVADO — `audience` y `shortDescription` de ELITE.)

### 8.3 Trabajo que la página debe resolver
Presentar la oferta privada con todas sus consecuencias visibles: 8 sesiones privadas (virtuales o presenciales en España), WhatsApp directo, plan 100% personalizado, eventos VIP, "acceso de por vida", tope real de 10 cupos. **DP-5** (alcance legal/comercial de "acceso de por vida") NO se toca ni se resuelve aquí: se documenta tal como está publicado. (CONFIRMADO — offerings.js ELITE; DP-5 pendiente en PROJECT-STATE.)

### 8.4 Estado de llegada
Sabe: que existe un tope. No sabe: qué significa tener a Sebastián directamente (frecuencia, canal, presencialidad). Necesita: precisión de lo que compra y confianza en la exclusividad real. (DERIVADO.)

### 8.5 Estado de salida
Comprende: ELITE es una relación privada con condiciones explícitas y disponibilidad limitada de verdad. Puede: iniciar conversación (las solicitudes de ELITE son naturalmente conversación, no impulso). Siente: "transformación completa. Cuerpo, mente y método" sin agobio comercial. (CONFIRMADO — `feeling`; DERIVADO el tono.)

### 8.6 Secuencia espacial
ENTRADA (estructura) → APROXIMACIÓN breve (admite: "todo RENDIMIENTO más:" + condiciones) → DECISIÓN (estructura) → SALIDA (estructura). TENSIÓN/INMERSIÓN prohibidas (CONFIRMADO — §4.3).

### 8.7 Arquitectura narrativa
1. **La escala honesta** — máximo 10 personas: exclusividad por diseño, no por marketing. 2. **La relación** — WhatsApp directo con Sebastián: el canal es el producto. 3. **El detalle** — 8 sesiones privadas, personalización total, eventos. 4. **La salida conversacional** — QUIERO EMPEZAR abre el diálogo, no un carrito.

### 8.8 Geometría de información
**Progresiva-relacional**: de la persona (Sebastián) al contenido ("todo RENDIMIENTO más") a las condiciones (cupos, presencialidad en España). Justificación: es la única ficha donde la oferta ES una relación personal con disponibilidad limitada; RAÍZ/FUERZA/RENDIMIENTO venden método, ELITE vende acceso directo. (DERIVADO — `scarcity` real sin contador + contenido CONFIRMADO.)

### 8.9 Densidad y ritmo
**`quiet`** (CONFIRMADO — matriz Fase 5). La escasez real (10 cupos, dato estable) se expresa en tipografía y silencio, nunca en urgencia animada. (CONFIRMADO — offerings.js eliminó el contador hardcodeado de urgencia por riesgo de publicidad engañosa; DERIVADO el tratamiento.)

### 8.10 Movimiento conceptual
`editorial-reveal` + `quiet-transition` (CONFIRMADO — matriz). Text motion `none` (CONFIRMADO). 3D: **PROHIBIDO** (CONFIRMADO — mundo 07; la dirección conceptual "precisión/control" de Fase 7 no autoriza nada aquí).

### 8.11 Presupuesto de atención
Concentra: la persona y las condiciones. Recupera: nada compite con el número de cupos ni con el precio — silencio alrededor. (PROPUESTO.)

### 8.12 Momento irreductible
**"WhatsApp DIRECTO con Sebastián" + el tope real de 10 cupos.** La única ruta donde el producto es una línea directa a la persona del método, con una escasez verificable en lugar de un contador inventado. Sin esto, ELITE es RENDIMIENTO caro. (CONFIRMADO — `included`, `scarity`→`scarcity`, eliminación histórica de `urgency`; papel DERIVADO.)

### 8.13 Prohibiciones específicas
- Prohibido fabricar urgencia (contadores, "quedan 3"): la escasez publicada es el tope, no una cuenta manipulada. (CONFIRMADO — comentario histórico de offerings.js sobre `urgency` eliminado.)
- Prohibido ampliar o reinterpretar "acceso de por vida" (DP-5): se replica tal cual está publicado; su resolución es de Sebastián. (CONFIRMADO — PROJECT-STATE.)
- Prohibida la gala dorada o estética "premium genérica": lujo BAYONA = acceso y precisión, no brillo. (PROPUESTO — coherente con ADN: materialidad del sistema, no variante.)

### 8.14 CTA y continuidad
CTA: QUIERO EMPEZAR (WhatsApp) (CONFIRMADO). Secundarios: `/checkout?plan=ELITE`, PDF. Vecinos: RENDIMIENTO. Fuera de itinerario: la continuidad es la propia conversación. (CONFIRMADO — matriz fila 8; chapters.js: planes fuera de itinerario.)

### 8.15 Evidencia
CONFIRMADO: offerings.js ELITE completo (`scarcity`, `badge`, `included`), DP-5 pendiente (PROJECT-STATE), matrices Fase 4/5. DERIVADO: mundos 07+08, geometría relacional, momento. PROPUESTO: prohibiciones 1 y 3.

---

## 9. `/parkour-academy` — ACADEMIA · LA TRAYECTORIA COMO MÉTODO

### 9.1 Identidad
- **Ruta:** `/parkour-academy` · **Nombre funcional:** Academia (CONFIRMADO — matriz Fase 4 fila 4).
- **Mundo dominante:** 03 MOVIMIENTO · **Mundo secundario:** 05 COMUNIDAD (DERIVADO — los grupos por edades NIÑOS/JÓVENES/ADULTOS/DEPORTISTAS son también un sistema de comunidad; el mundo 03 habita aquí como territorio propio).
- **Función real:** explicar la formación en parkour por progresiones y registrar interés sin pago (pre-apertura).

### 9.2 Pregunta del visitante
"¿Cómo aprendo parkour desde donde estoy — y de verdad hay sitio para aprenderlo bien?" (DERIVADO — routeMeta description "desde iniciación hasta nivel avanzado"; programaAudiences por edad.)

### 9.3 Trabajo que la página debe resolver
Que un padre o un atleta entienda la progresión técnica y confíe en registrarse por WhatsApp. Es una página de **umbral de comunidad**: se registra interés, no se compra. (CONFIRMADO — J5: registro de interés sin pago.)

### 9.4 Estado de llegada
Sabe: que parkour existe en BAYONA. No sabe: niveles, edades, seguridad, logística. Necesita: ver la progresión y sentir rigor antes que espectáculo. (DERIVADO — CHAPTERS teaser: "del primer salto al control".)

### 9.5 Estado de salida
Comprende: cómo se aprende aquí (progresiones + fuerza aplicada) y para quién es cada grupo. Puede: registrar interés por WhatsApp. Siente: deseo de movimiento y confianza en el método formativo. (CONFIRMADO — J5; routeMeta.)

### 9.6 Secuencia espacial
1. **ENTRADA (estructura):** recepción que declara el tono: técnica y control. (CONFIRMADO — clase narrativa.)
2. **TENSIÓN (un momento, admite):** el instante antes del salto: la página detiene el tiempo una vez para mostrar de qué es capaz el cuerpo cuando hay método. Resuelta por la progresión siguiente. (CONFIRMADO como propuesta — matriz Fase 5: cinematic-stage que "detiene el tiempo".)
3. **DESCUBRIMIENTO (estructura):** niveles por edad/nivel, logística, qué significa cada progresión. (CONFIRMADO — contenido de grupos y niveles.)
4. **SALIDA (estructura):** registro de interés (WhatsApp) + NextChapter → `/app`. (CONFIRMADO — J5, chapters.js.)

### 9.7 Arquitectura narrativa
1. **El gesto** — un momento que muestra trayectoria y control (el único momento immersive). 2. **La progresión** — del primer salto al control: el método formativo desplegado. 3. **Los grupos** — edades y niveles con realismo (5–11, 12–17, 18–59, deportistas). 4. **El registro** — interés sin fricción ni pago.

### 9.8 Geometría de información
**Progresiva por niveles** (itinerario formativo): se recorre como una escala de habilidad. Justificación: es la única ruta cuyo contenido ES una progresión técnica temporal; la geometría de "escalera" la distingue de todo catálogo. (PROPUESTO sobre base CONFIRMADA de grupos/niveles.)

### 9.9 Densidad y ritmo
**`immersive`** — un solo momento (CONFIRMADO — matriz Fase 5: cinematic-stage). Es la segunda página que se lo permite (con `/`); el mundo 03 es JUSTIFICADO en 3D por el Bloque 3, pero ese consumo será de Fase 7 vía `useScrollHandoff()`, no de este blueprint.

### 9.10 Movimiento conceptual
- `cinematic-stage` — el escenario que detiene el tiempo (CONFIRMADO — matriz).
- Text motion: `mask` (CONFIRMADO — matriz). Sticky/Horizontal: candidatos ○ (CONFIRMADO — matriz).
- 3D: **POSIBLE CON JUSTIFICACIÓN** (el mundo 03 es "JUSTIFICADO" en el Bloque 3 — trayectoria/libertad como dirección conceptual). Este blueprint no diseña nada: la decisión concreta de escena pertenece a `WORLD-3D-STRATEGY` y su implementación a Fase 7 vía `useScrollHandoff()`. (CONFIRMADO la clasificación del Bloque 3; DERIVADO el límite de esta fase.)

### 9.11 Presupuesto de atención
Concentra: el momento de trayectoria y la escalera de niveles. Recupera: la sección de grupos con ritmo utilitario antes del registro. El CTA de registro nunca queda detrás del momento narrativo. (PROPUESTO, compatible con presupuesto.)

### 9.12 Momento irreductible
**La escalera de progresión del primer salto al control.** Es la única página donde el método se mide en habilidad acumulada, no en planes ni productos: si se quitara la progresión, quedaría un anuncio de clases genérico. (DERIVADO — teaser CHAPTERS + routeMeta + audiencias reales.)

### 9.13 Prohibiciones específicas
- Prohibido el parkour como adrenalina de marketing (saltos ilegales, azoteas, vandalismo): la academia es técnica, control y seguridad. (DERIVADO — routeMeta "control"; ADN "qué NO es BAYONA".)
- Prohibido prometer resultados acrobáticos concretos: progresión, no promesa. (DERIVADO — reglas copy routeMeta.)
- **Hallazgo F6-04 del Bloque 3 (deferido aquí):** en reduced-motion la trayectoria debe sostenerse por composición (diagonales, líneas de fuga, jerarquía), no por efecto. Este blueprint la recoge como obligación de diseño de Fase 8. (CONFIRMADO — hallazgo del Bloque 3.)
- Prohibido copiar el momento de `/`: aquí el escenario muestra TRAYECTORIA (movimiento), allí muestra MÉTODO (estructura). (PROPUESTO.)

### 9.14 CTA y continuidad
CTA primario: registro de interés por WhatsApp (sin pago) (CONFIRMADO — J5). Continuidad: NextChapter → `/app`; puente a `/shop` a cargo del itinerario canónico (CONFIRMADO — J5: "ya no del sistema retirado").

### 9.15 Evidencia
CONFIRMADO: matriz Fase 4 fila 4, J5, matriz Fase 5, programAudiences (offerings.js), chapters.js, F6-04, clasificación 3D del mundo 03. DERIVADO: mundos 03+05, geometría de escalera, momento. PROPUESTO: prohibiciones 1 y 4.

---

## 10. `/shop` — TIENDA · SESIONES SUELTAS, SIN MEMBRESÍA

### 10.1 Identidad
- **Ruta:** `/shop` · **Nombre funcional:** Tienda (CONFIRMADO — matriz Fase 4 fila 9).
- **Mundo dominante:** 04 EXPERIENCIA · **Mundo secundario:** 08 CONTINUIDAD leve (DERIVADO — el pedido se cierra por WhatsApp con confirmación humana; la conversación es continuidad, no checkout).
- **Función real:** dejar comprar (o consultar) sin membresía: servicios por sesión, productos consultables, carrito → pedido por WhatsApp.

### 10.2 Pregunta del visitante
"¿Qué puedo comprar sin contratar ningún plan?" (CONFIRMADO — matriz Fase 4 col. 5; CHAPTERS teaser.)

### 10.3 Trabajo que la página debe resolver
Ofrecer una vía de entrada sin compromiso: clases 1:1, masaje deportivo, movilidad, pilates, evaluaciones (sessionServices/extraServices) e indumentaria consultable (catalogItems OBJ-01…06). Carrito persistente (`bayona:cart:v1`) → WhatsApp con contexto de producto. Sin pago online (contrato del sitio). (CONFIRMADO — J4, shopCatalog.js.)

### 10.4 Estado de llegada
Sabe: que no quiere (o no puede) una membresía. No sabe: qué se puede comprar suelto ni cómo se cierra un pedido. Necesita: precios por sesión, categorías claras y un cierre sencillo. (DERIVADO — J4.)

### 10.5 Estado de salida
Comprende: qué hay disponible hoy por sesión y que la confirmación es humana (precio, disponibilidad y condiciones vigentes se confirman por WhatsApp). Puede: haber armado y enviado su pedido. Siente: utilidad y cero presión. (CONFIRMADO — buildCatalogItemWhatsAppUrl: pide confirmar "precio, disponibilidad, detalles y condiciones vigentes".)

### 10.6 Secuencia espacial
1. **ENTRADA (estructura):** catálogo visible de inmediato: sin relato previo. (DERIVADO — geometría utilitaria.)
2. **DESCUBRIMIENTO (estructura):** explorar categorías y servicios por curiosidad. (CONFIRMADO — clase de experiencia; matriz Fase 5.)
3. **DECISIÓN (admite, comercial paralela):** añadir al carrito / consultar. Rodeada de claridad: los servicios de salud llevan su scope (`healthScope`) y los presenciales su condición. (CONFIRMADO — flags en offerings.js.)
4. **SALIDA (estructura):** pedido por WhatsApp / NextChapter → `/faq`. (CONFIRMADO — chapters.js.)

### 10.7 Arquitectura narrativa
1. **El catálogo** — todo a la vista, filtrable. 2. **El carrito** — persistente y accesible desde barra y menú móvil. 3. **La confirmación humana** — el pedido no es un pago: es una conversación. Razón de cada momento: la tienda sirve a la entrada sin fricción; su "narrativa" es la utilidad.

### 10.8 Geometría de información
**Exploratoria-utilitaria** (catálogo filtrable + carrito). Justificación: es la única ruta donde el visitante arma algo en vez de leer; la geometría de herramienta la separa de los catálogos de planes (comparativa) y de recursos (biblioteca). (PROPUESTO sobre base CONFIRMADA.)

### 10.9 Densidad y ritmo
**`balanced`** (CONFIRMADO — matriz Fase 5: data-cascade + compact-rail). El rail es ambiente declarado, nunca información crítica en bucle (CONFIRMADO — MOTION-MAP "Evitar: información crítica o única").

### 10.10 Movimiento conceptual
- `data-cascade` — servicios con jerarquía sin ruido (CONFIRMADO — matriz).
- `compact-rail` — rails decorativos de ambiente (CONFIRMADO — matriz).
- Text motion `none`, sin sticky/horizontal/parallax (CONFIRMADO — matriz).
- 3D: **PROHIBIDO** (CONFIRMADO — clasificación del mundo 04 en su uso comercial; el 3D de la marca no vende zapatillas).

### 10.11 Presupuesto de atención
Concentra: el catálogo y el estado del carrito. Recupera: el movimiento de ambiente nunca entre el visitante y su carrito. El WhatsApp de pedido siempre visible. (PROPUESTO.)

### 10.12 Momento irreductible
**El carrito que termina en una conversación, no en un pago.** La única "caja" del sitio que deliberadamente NO es un checkout: pedido por WhatsApp con confirmación humana de precio y disponibilidad. Sin esto, la tienda es un ecommerce genérico con el botón roto. (CONFIRMADO — J4 + texto del mensaje; papel DERIVADO.)

### 10.13 Prohibiciones específicas
- Prohibido inventar checkout online o precios fijados en el carrito: la confirmación es humana por contrato. (CONFIRMADO — J4 "Sin pago online (contrato del sitio)"; catálogo pide confirmar condiciones vigentes.)
- Prohibido mezclar la conversión paralela de la tienda con el embudo de membresía: son conversión distinta (col. 12 "Conversión paralela"). (CONFIRMADO — matriz Fase 4.)
- Prohibido promesas de resultado en servicios de salud: scope declarado (`healthScope`), sin lenguaje médico. (CONFIRMADO — flags + reglas routeMeta.)
- Prohibido copiar el comparador de `/programs`: aquí no se comparan planes, se compra por sesión. (PROPUESTO.)

### 10.14 CTA y continuidad
CTA primario: carrito → pedido WhatsApp por producto (CONFIRMADO). Secundario: consulta directa por artículo. Continuidad: NextChapter → `/faq` (CONFIRMADO — chapters.js).

### 10.15 Evidencia
CONFIRMADO: J4, shopCatalog.js, sessionServices/extraServices, matriz Fase 4 fila 9, matriz Fase 5, chapters.js. DERIVADO: mundos 04+08, geometría, momento. PROPUESTO: prohibiciones 3–4.

---

## 11. `/app` — BAYONA+ · EL PRODUCTO DIGITAL EN DESARROLLO

### 11.1 Identidad
- **Ruta:** `/app` · **Nombre funcional:** Producto digital (CONFIRMADO — matriz Fase 4 fila 10).
- **Mundo dominante:** 02 MÉTODO · **Mundo secundario:** 06 CONOCIMIENTO (DERIVADO — BAYONA+ digitaliza el método y lo convierte en sistema de aprendizaje en desarrollo).
- **Función real:** explicar el concepto de BAYONA+ y captar early access por WhatsApp, **sin prometer fecha ni producto operativo**. (CONFIRMADO — routeMeta: "todavía no hay app operativa para descargar… sin fechas comprometidas".)

### 11.2 Pregunta del visitante
"¿Qué está construyendo BAYONA para el móvil y cuándo estará?" (CONFIRMADO — CHAPTERS teaser: "Qué se está construyendo y qué no está confirmado todavía".)

### 11.3 Trabajo que la página debe resolver
Equilibrar entusiasmo y honestidad: mostrar el concepto y sus funciones en exploración, dejar una lista de early access por WhatsApp, y **nunca** vender como app existente. (CONFIRMADO — J6; CONTENT_STATES `concept`/`unavailable`.)

### 11.4 Estado de llegada
Sabe: que BAYONA tiene web. No sabe: si hay app, cuándo, ni qué haría. Necesita: claridad de estado más que espectáculo. (DERIVADO — J6.)

### 11.5 Estado de salida
Comprende: qué es BAYONA+ (concepto en construcción), qué funciones se exploran y que la vía de entrada es early access por WhatsApp. Puede: registrarse. Siente: curiosidad honesta, no frustración por una promesa rota. (CONFIRMADO — J6.)

### 11.6 Secuencia espacial
1. **ENTRADA (estructura):** estado declarado sin ambigüedad (concepto en desarrollo). (CONFIRMADO — routeMeta.)
2. **DESCUBRIMIENTO (estructura):** el sistema/módulos en exploración como maqueta conceptual. (CONFIRMADO — clase narrativa balanced.)
3. **DECISIÓN (admite, suave):** early access por WhatsApp. (CONFIRMADO — J6.)
4. **SALIDA (estructura):** NextChapter → `/community`. (CONFIRMADO — chapters.js.)

### 11.7 Arquitectura narrativa
1. **Estado real** — abrir con lo que NO es (todavía): descarga, fechas, garantías. Razón: la confianza de BAYONA exige no fingir. 2. **El concepto** — qué haría BAYONA+ cuando exista (módulos, sistema). Razón: la maqueta despierta deseo sin engañar. 3. **Early access** — una lista, no una venta. Razón: captar interés sin prometer fecha (anti-promesa).

### 11.8 Geometría de información
**Exploratoria-conceptual** (maqueta de producto, no catálogo). Justificación: es la única ruta donde se muestra un producto que aún no existe; la geometría es la de un concept deck, no la de una ficha. (PROPUESTO sobre estado CONFIRMADO.)

### 11.9 Densidad y ritmo
**`balanced`** (CONFIRMADO — matriz Fase 5: editorial-slide + compact-rail). El sistema se muestra en movimiento contenido (`image-drift` como fondo, sin exigir atención). (CONFIRMADO — matriz.)

### 11.10 Movimiento conceptual
- `editorial-slide` — módulos/líneas que señalan dirección (CONFIRMADO — matriz).
- `compact-rail` — rails de funciones (CONFIRMADO — matriz).
- Text motion: `mask` (CONFIRMADO). Horizontal: candidato ○ (CONFIRMADO — matriz).
- 3D: **PROHIBIDO** (CONFIRMADO — clasificación del mundo 02; un producto en desarrollo no necesita escena, necesita claridad de estado).

### 11.11 Presupuesto de atención
Concentra: el estado real y el concepto. Recupera: las transiciones quietas entre módulos; el early access se presenta sin prisa. (PROPUESTO.)

### 11.12 Momento irreductible
**La declaración honesta de producto en desarrollo.** Es la única página de todo el sitio que dice explícitamente "todavía no existe, pero aquí está lo que construimos". Ese gesto de no-promesa ES la marca; sin él, sería un anuncio de app fantasma. (CONFIRMADO — routeMeta/description y J6; papel DERIVADO.)

### 11.13 Prohibiciones específicas
- Prohibido mostrar interfaces "finales", screenshots inventados o fechas. (CONFIRMADO — "sin fechas comprometidas", CONTENT_STATES.)
- Prohibido que el early access parezca una compra: es una lista. (CONFIRMADO — J6.)
- Prohibido copiar la estructura de una ficha de plan: aquí no hay precio ni membresía. (PROPUESTO.)

### 11.14 CTA y continuidad
CTA primario: early access por WhatsApp (CONFIRMADO). Continuidad: NextChapter → `/community` (CONFIRMADO).

### 11.15 Evidencia
CONFIRMADO: routeMeta `/app`, J6, matriz Fase 4/5, chapters.js, CONTENT_STATES. DERIVADO: mundos 02+06, geometría. PROPUESTO: prohibiciones 1 y 3.

---

## 12. `/community` — COMUNIDAD · EL ACOMPAÑAMIENTO ABIERTO

### 12.1 Identidad
- **Ruta:** `/community` · **Nombre funcional:** Comunidad (CONFIRMADO — matriz Fase 4 fila 11).
- **Mundo dominante:** 05 COMUNIDAD · **Mundo secundario:** 08 CONTINUIDAD (DERIVADO — la comunidad sostiene el hábito en el tiempo: entrar es continuar).
- **Función real:** explicar la comunidad abierta y gratuita (WhatsApp) y dejar solicitar acceso sin coste. (CONFIRMADO — J7: "Solicitar acceso por WhatsApp (gratis)".)

### 12.2 Pregunta del visitante
"¿Entrenar acompañado cuesta algo, y cómo entro?" (CONFIRMADO — routeMeta: "acceso abierto y gratuito… no necesitas contratar un plan".)

### 12.3 Trabajo que la página debe resolver
Quitar la barrera del "no soy cliente todavía": la comunidad existe SIN plan, y entrar es pedirlo por WhatsApp. Es una página de **pertenencia**, no de venta. (CONFIRMADO — J7, routeMeta.)

### 12.4 Estado de llegada
Sabe: que hay una comunidad (o llega por puentes de fichas/NextChapter). No sabe: si es gratis, si exige plan, qué cambia al entrar. Necesita: una puerta sin condiciones. (DERIVADO — J7.)

### 12.5 Estado de salida
Comprende: BAYONA comunidad es abierta, gratuita y por WhatsApp. Puede: solicitar acceso. Siente: "aquí entrenas acompañado, sin importar tu plan". (CONFIRMADO — J7.)

### 12.6 Secuencia espacial
1. **ENTRADA (estructura):** declaración de acceso abierto, sin rodeos. (DERIVADO — clase narrativa balanced.)
2. **DESCUBRIMIENTO (estructura):** voces en rail: el patrón marquee ya presente, calidez de la comunidad vivida. (CONFIRMADO — matriz Fase 5.)
3. **DECISIÓN (admite, suave):** solicitar acceso (gratis). (CONFIRMADO — J7.)
4. **SALIDA (estructura):** NextChapter → `/resources`. (CONFIRMADO — chapters.js.)

### 12.7 Arquitectura narrativa
1. **La puerta abierta** — acceso sin plan, dicho primero. Razón: la valla mental es exactamente esa. 2. **Las voces** — comunidad mostrada con sus personas. Razón: el sentido de pertenencia se contagia por testimonio vivo, no por eslóganes. 3. **La entrada** — WhatsApp, un gesto humano. Razón: la comunidad de BAYONA no se registra con formulario: se presenta.

### 12.8 Geometría de información
**Exploratoria-cálida** (rail de voces + acceso). Justificación: ninguna otra página muestra comunidad como experiencia; es la única ruta cuya geometría es social (voces, conversación) y no informativa. (PROPUESTO sobre rail CONFIRMADO.)

### 12.9 Densidad y ritmo
**`balanced`** (CONFIRMADO — matriz Fase 5: compact-rail + editorial-reveal). Ritmo cálido, nunca frenético; la comunidad se siente como una conversación. (DERIVADO — mundo 05.)

### 12.10 Movimiento conceptual
- `compact-rail` — el marquee de voces ya vivo (CONFIRMADO — matriz Fase 5).
- `editorial-reveal` — bloques que emergen con calma (CONFIRMADO — matriz).
- Text motion: `none` (CONFIRMADO — matriz). Sin sticky/horizontal/parallax (CONFIRMADO).
- 3D: **PROHIBIDO** — y además es el hallazgo F6-05 del Bloque 3 (deferido): la comunidad DEBE evitar el globo de `/about`; su voz visual es el rail, no otra escena. (CONFIRMADO — F6-05, Bloque 3.)

### 12.11 Presupuesto de atención
Concentra: la declaración de acceso y las voces. Recupera: cero agitación antes del acceso: el paso a WhatsApp llega en calma. (PROPUESTO.)

### 12.12 Momento irreductible
**El acceso gratuito y sin plan de verdad.** Es la única página que le dice al no-cliente "entra, no necesitas comprar nada". Esa puerta lateral del embudo define el carácter de BAYONA; sin ella, la comunidad sería marketing decorativo. (CONFIRMADO — routeMeta/J7; papel DERIVADO.)

### 12.13 Prohibiciones específicas
- Prohibido copiar el globo de `/about` (F6-05): la comunidad tiene su propia gramática visual (rail). (CONFIRMADO — F6-05.)
- Prohibido incentivar la comunidad como "paso previo táctico para vender": es abierta por diseño. (DERIVADO — routeMeta.)
- Prohibido densidad comercial: sin precios, sin cupos, sin catálogo aquí. (PROPUESTO.)
- Prohibido el patrón marquee para información crítica: el rail es ambiente (CONFIRMADO — MOTION-MAP "Evitar: información crítica o única").

### 12.14 CTA y continuidad
CTA primario: solicitar acceso por WhatsApp (gratis) (CONFIRMADO — J7). Continuidad: NextChapter → `/resources` (CONFIRMADO — chapters.js).

### 12.15 Evidencia
CONFIRMADO: J7, routeMeta `/community`, matriz Fase 4/5, F6-05, chapters.js. DERIVADO: mundos 05+08, geometría. PROPUESTO: prohibiciones 1–3.

---

## 13. `/resources` — RECURSOS · LA PUERTA GRATUITA AL MÉTODO

### 13.1 Identidad
- **Ruta:** `/resources` · **Nombre funcional:** Gratuito (CONFIRMADO — matriz Fase 4 fila 12).
- **Mundo dominante:** 06 CONOCIMIENTO · **Mundo secundario:** 00 ORIGEN (DERIVADO — los recursos gratuitos son la primera experiencia del método para el visitante J1).
- **Función real:** entregar valor sin pedir nada: Reto 30 días, Protocolo 7 días y guías; salida por WhatsApp con contexto de recurso. (CONFIRMADO — J1.)

### 13.2 Pregunta del visitante
"¿Qué puedo probar gratis, sin pagar ni darte mis datos?" (DERIVADO — J1: "sin fricción, sin cuenta, sin datos (promesa de privacidad)".)

### 13.3 Trabajo que la página debe resolver
Demostrar el método regalando una primera experiencia útil: el recurso gratuito ES la conversión. Debe leerse, guardarse y usarse; nunca sentirse como cebo. (CONFIRMADO — J1.)

### 13.4 Estado de llegada
Sabe: que BAYONA suena interesante. No sabe: si el método se sostiene o es humo. Necesita: probar algo real antes de cualquier decisión. (DERIVADO — J1.)

### 13.5 Estado de salida
Comprende: qué es el método por experiencia propia. Puede: salir por WhatsApp con contexto del recurso, o continuar al siguiente capítulo. Siente: "esto funciona, me ha servido algo hoy". (CONFIRMADO — J1.)

### 13.6 Secuencia espacial
1. **ENTRADA (estructura):** biblioteca de recursos presentada con calma, sin urgencia. (DERIVADO — clase lectura.)
2. **DESCUBRIMIENTO (admite):** explorar los recursos por categoría (Reto 30 días, Protocolo 7 días, guías). (CONFIRMADO — J1.)
3. **DECISIÓN (admite, suave):** usar un recurso / salir por WhatsApp con contexto. (CONFIRMADO — J1.)
4. **SALIDA (estructura):** NextChapter → `/shop`. (CONFIRMADO — chapters.js.)

### 13.7 Arquitectura narrativa
1. **La biblioteca** — los recursos a la vista, no enterrados. Razón: el valor se entrega, no se anuncia. 2. **El recurso singular** — cada guía presentada como herramienta usable. Razón: usarlo hoy crea la prueba que la página necesita. 3. **La salida con contexto** — WhatsApp que añade contexto de recurso. Razón: si alguien quiere contacto, que el recurso sea el puente (sin datos, sin cuenta).

### 13.8 Geometría de información
**Utilitaria-biblioteca** (index + fichas de recurso). Justificación: es la única ruta donde el contenido se *consume* fuera del sitio (guías), no se compara ni se decide; la geometría es de estantería. (PROPUESTO sobre base CONFIRMADA de lista de recursos.)

### 13.9 Densidad y ritmo
**`quiet`** (CONFIRMADO — matriz Fase 5: editorial-reveal + data-cascade). "Recursos para leer y guardar; movimiento mínimo". (CONFIRMADO — SCROLL-STORY-MATRIX.)

### 13.10 Movimiento conceptual
- `editorial-reveal` — las fichas emergen al ritmo de lectura (CONFIRMADO — matriz).
- `data-cascade` — índice de recursos con jerarquía (CONFIRMADO — matriz).
- Text motion: `none` (CONFIRMADO — matriz). Sin sticky/horizontal/parallax (CONFIRMADO).
- 3D: **PROHIBIDO** (CONFIRMADO — mundo 06; el conocimiento se lee, no se contempla).

### 13.11 Presupuesto de atención
Concentra: la utilidad del recurso. Recupera: el silencio que permite imprimir/guardar. Nada parpadea: la página es un anaquel, no un escenario. (PROPUESTO.)

### 13.12 Momento irreductible
**El recurso gratis real y usable (Reto 30 días / Protocolo 7 días).** Es la única promesa del sitio que se cumple sin pedir datos ni tarjeta: la conversión gratuita. Si se eliminara, J1 no tendría puerta de entrada y el "método con acompañamiento" sería solo un discurso. (CONFIRMADO — J1; papel DERIVADO.)

### 13.13 Prohibiciones específicas
- Prohibido pedir datos, cuenta o "probar el plan": la promesa de privacidad manda. (CONFIRMADO — J1.)
- Prohibido el patrón de venta (contadores, urgencia, "últimos días"): un recurso que no es libre no es recurso. (DERIVADO — J1.)
- Prohibido esconder el recurso detrás de un relato largo: biblioteca visible. (PROPUESTO.)
- Prohibido copiar la geometría de `/programs` (comparativa): aquí no se comparan planes, se ofrecen herramientas. (PROPUESTO.)

### 13.14 CTA y continuidad
CTA primario: recurso → WhatsApp con contexto (no forzada; el recurso es la conversión) (CONFIRMADO — J1). Continuidad: NextChapter → `/shop` (CONFIRMADO — chapters.js).

### 13.15 Evidencia
CONFIRMADO: J1, routeMeta `/resources`, matriz Fase 4/5, chapters.js. DERIVADO: mundos 06+00, geometría. PROPUESTO: prohibiciones 2–4.

---

## 14. `/faq` — FAQ · LA CLARIDAD ANTES DE DECIDIR

### 14.1 Identidad
- **Ruta:** `/faq` · **Nombre funcional:** Objeciones (CONFIRMADO — matriz Fase 4 fila 13).
- **Mundo dominante:** 07 DECISIÓN · **Mundo secundario:** 06 CONOCIMIENTO (DERIVADO — responder objeciones es conocimiento aplicado a la decisión).
- **Función real:** disolver dudas concretas (precios, lesiones, presencialidad, garantía, BAYONA+) para que quien duda pueda decidir; cierre por videollamada/pregunta por WhatsApp. (CONFIRMADO — J8, routeMeta.)

### 14.2 Pregunta del visitante
"¿Qué dudas me quedan antes de decidir?" (CONFIRMADO — matriz Fase 4 col. 5.)

### 14.3 Trabajo que la página debe resolver
Respuesta directa sin rodeos a cada objeción, por categorías, y una salida humana si la duda persiste (videollamada, pregunta rápida por WhatsApp). (CONFIRMADO — J8.)

### 14.4 Estado de llegada
Sabe: que le interesa o ya eligió dirección. No sabe: la respuesta a la duda concreta que lo frena. Necesita: precisión, no persuasión. (DERIVADO — J8.)

### 14.5 Estado de salida
Comprende: la respuesta a su duda. Puede: decidir, reservar videollamada, preguntar, o volver a recepción (NextChapter). Siente: "me han respondido, no me han vendido". (CONFIRMADO — J8.)

### 14.6 Secuencia espacial
1. **ENTRADA (estructura):** índice por categorías visible. (DERIVADO — clase lectura.)
2. **DESCUBRIMIENTO (admite):** navegar las respuestas con calma y jerarquía. (CONFIRMADO — clase lectura sin tensión/inmersión según §4.5 de SPATIAL-LANGUAGE.)
3. **DECISIÓN (admite, suave):** videollamada / pregunta por WhatsApp. (CONFIRMADO — J8.)
4. **SALIDA (estructura):** NextChapter → `/` (devolver al inicio del itinerario). (CONFIRMADO — J8: "NextChapter devuelve al inicio del itinerario (recepción)".)

### 14.7 Arquitectura narrativa
1. **El índice** — categorías para encontrar la duda. Razón: FAQ sirve al que busca UNA respuesta. 2. **Las respuestas** — directas, sin rodeos ni relleno. Razón: la transparencia es el argumento. 3. **La salida humana** — videollamada o WhatsApp si la duda no cabe en texto. Razón: una duda que queda abierta es una venta perdida honesta; BAYONA prefiere la conversación.

### 14.8 Geometría de información
**Utilitaria-pregunta-respuesta** (índice + acordeones por categoría). Justificación: ninguna otra página organiza información por pregunta; la geometría es de soporte, no de narración. (PROPUESTO sobre base CONFIRMADA de categorías.)

### 14.9 Densidad y ritmo
**`quiet`** (CONFIRMADO — matriz Fase 5: editorial-reveal únicamente). "Respuestas rápidas; nada compite con la lectura". (CONFIRMADO — SCROLL-STORY-MATRIX.)

### 14.10 Movimiento conceptual
- `editorial-reveal` — despliegue contenido de respuestas (CONFIRMADO — matriz).
- Text motion: `none` (CONFIRMADO). Sin sticky/horizontal/parallax (CONFIRMADO).
- 3D: **PROHIBIDO** — y la exigencia del auditor es explícita: "no intentes convertir una página de claridad en una experiencia cinematográfica". Esta prohibición ES el blueprint. (CONFIRMADO — prompt del auditor, §7.)

### 14.11 Presupuesto de atención
Concentra: la respuesta en pantalla. Recupera: el silencio entre acordeones para poder leer con calma. Cero movimiento compitiendo. (PROPUESTO.)

### 14.12 Momento irreductible
**Las respuestas directas que no venden.** Es la única página donde BAYONA se abstiene de persuadir: se limita a responder (incluyendo limitaciones y letra pequeña honesta). Ese silencio comercial es, paradójicamente, su pico de confianza. (CONFIRMADO — J8/categorías; papel DERIVADO.)

### 14.13 Prohibiciones específicas
- Prohibido convertir la FAQ en experiencia cinematográfica o narrativa. (CONFIRMADO — auditor §7.)
- Prohibido retrasar la respuesta: el acordeón nunca esconde contenido crítico (precios, condiciones, lesiones). (DERIVADO — clase lectura/regla de claridad.)
- Prohibido respuestas evasivas ("depende" sin aclarar): transparencia por contrato. (DERIVADO — D-002.)
- Prohibido copiar el patrón rail/immersive de `/community` o `/`: quiet puro. (CONFIRMADO — matriz Fase 5.)

### 14.14 CTA y continuidad
CTA primario: videollamada / pregunta rápida por WhatsApp (CONFIRMADO — J8). Continuidad: NextChapter devuelve al inicio de itinerario (recepción) (CONFIRMADO — J8/chapters.js).

### 14.15 Evidencia
CONFIRMADO: J8, routeMeta `/faq`, matriz Fase 4 fila 13, matriz Fase 5, auditor §7, chapters.js. DERIVADO: mundos 07+06, momento. PROPUESTO: prohibiciones 2–4.

---

## 15. `/checkout` — CONFIGURADOR · EL EMBUDO SIN TEATRO

### 15.1 Identidad
- **Ruta:** `/checkout` · **Nombre funcional:** CONFIGURADOR BAYONA / embudo (CONFIRMADO — matriz Fase 4 fila 14).
- **Mundo dominante:** 07 DECISIÓN (en su forma más pura) · **Sin mundo secundario** (DERIVADO — el embudo no hospeda otra realidad: cualquier adorno narrativo es ruido).
- **Función real:** configurar plan → clases → extras → datos y enviar la solicitud por WhatsApp con detalle completo. `noindex`. (CONFIRMADO — J2/J3, D6/D7.)

### 15.2 Pregunta del visitante
"¿Cómo queda mi solicitud y cuánto sería?" (CONFIRMADO — matriz Fase 4 col. 5.)

### 15.3 Trabajo que la página debe resolver
Cero fricción hacia el envío: precarga del plan (`?plan=` fail-closed), pasos PLAN→CLASES→EXTRAS→DATOS, total con COP/€/USD, y handoff a `/order-confirmation`. La confianza ES el producto: precio claro, condiciones explícitas (sin confirmación automática). (CONFIRMADO — D6/D7, commercialSync.)

### 15.4 Estado de llegada
Sabe: qué plan (llega desde ficha o desde `?plan=`). No sabe: la configuración final ni el total exacto. Necesita: ver cómo se construye su solicitud y confirmar antes de enviar. (DERIVADO — J2/J3.)

### 15.5 Estado de salida
Comprende: qué solicitó exactamente y el total desglosado. Puede: enviar la solicitud por WhatsApp (mensaje con detalle) o volver atrás sin castigo. Siente: control absoluto, cero presión, cero ambigüedad. (CONFIRMADO — buildExperienceWhatsAppUrl: mensaje con desglose + "no constituye pago/inscripción".)

### 15.6 Secuencia espacial
1. **DECISIÓN (estructura, única):** la página ES el momento de decisión de principio a fin. (CONFIRMADO — clase conversión: "Cero distracción", §4.6 SPATIAL-LANGUAGE.)
2. **SALIDA (estructura):** handoff en calma a `/order-confirmation`. (CONFIRMADO — D7.)

Estado prohibido: DESCUBRIMIENTO (el visitante no explora aquí; confirma), TENSIÓN, INMERSIÓN. No hay APROXIMACIÓN: se llega sabiendo. (CONFIRMADO — §4.6.)

### 15.7 Arquitectura narrativa
1. **El plan precargado** — reconocimiento ("esto era lo que viste"). 2. **CLASES → EXTRAS → DATOS** — construcción progresiva y revisable. 3. **El total vivo** — la cifra se construye delante, siempre visible. 4. **El envío** — WhatsApp con desglose; "Esta solicitud no constituye pago…". Razón de cada paso: el visitante debe *verificar*, no adivinar.

### 15.8 Geometría de información
**Guiada-lineal estricta** (pasos en orden, revisables, sin ramas). Justificación: es la única ruta donde la geometría es un formulario de confirmación; nada de narrativa, nada de exploración: pasos → total → envío. (DERIVADO — D6 orden PLAN→CLASES→EXTRAS→DATOS.)

### 15.9 Densidad y ritmo
**`quiet`** (CONFIRMADO — matriz Fase 5: quiet-transition únicamente). "Decisión final: máxima claridad, cero distracción". (CONFIRMADO — SCROLL-STORY-MATRIX.)

### 15.10 Movimiento conceptual
- `quiet-transition` — entradas/salidas serenas, nunca cortina que retrase (CONFIRMADO — matriz).
- Text motion: `none` (CONFIRMADO). Sin sticky/horizontal/parallax (CONFIRMADO).
- 3D: **PROHIBIDO ABSOLUTO** — el auditor lo prohíbe explícitamente para `/checkout`. (CONFIRMADO — auditor §7.)

### 15.11 Presupuesto de atención
Concentra: el paso en curso y el total. Recupera: cero; aquí no se recupera atención, se mantiene. Toda el área es zona de claridad; el CTA "SOLICITAR DETALLES POR WHATSAPP" nunca se retrasa por movimiento. (CONFIRMADO — auditor §7 + MOTION-MAP.)

### 15.12 Momento irreductible
**El paso de DATOS → envío con desglose explícito y disclaimer honesto.** Es el único lugar donde BAYONA le entrega al visitante una solicitud completa y verificable antes de un solo clic de envío. Sin este momento, el embudo presumiría una compra que no es (no hay pago online). (CONFIRMADO — buildExperienceWhatsAppUrl + D6/D7; papel DERIVADO.)

### 15.13 Prohibiciones específicas
- Prohibido espectáculo, narrativa, inmersión o 3D en cualquier forma. (CONFIRMADO — auditor §7.)
- Prohibido presentar el envío como pago/inscripción confirmada: el mensaje explícito lo impide. (CONFIRMADO — texto del mensaje.)
- Prohibido ocultar precio, cantidades o condiciones: todo desglosado en el paso de envío. (CONFIRMADO — commercialSync.)
- Prohibido urgencia fabricada ("completa antes de…"): contrato anti-urgency de offerings.js. (CONFIRMADO.)

### 15.14 CTA y continuidad
CTA primario: SOLICITAR DETALLES POR WHATSAPP (CONFIRMADO — matriz fila 14). Continuidad: handoff → `/order-confirmation`. Breadcrumb no pinta en el itinerario; permanece visible (CONFIRMADO — J2: "Breadcrumb visible incluso en el embudo"). Sin NextChapter (la continuidad es el propio embudo). (CONFIRMADO — matriz.)

### 15.15 Evidencia
CONFIRMADO: D6/D7, J2/J3, matriz Fase 4 fila 14, matriz Fase 5, auditor §7, buildExperienceWhatsAppUrl, commercialSync/Checkout.test.jsx. DERIVADO: mundo 07 puro, momento. PROPUESTO: ninguno nuevo (todo aquí es confirmado).

---

## 16. `/order-confirmation` — CONFIRMACIÓN · LA CONTINUIDAD SERENA

### 16.1 Identidad
- **Ruta:** `/order-confirmation` · **Nombre funcional:** Post-solicitud (CONFIRMADO — matriz Fase 4 fila 15).
- **Mundo dominante:** 08 CONTINUIDAD (obligación explícita del auditor: "Debe pertenecer al mundo de CONTINUIDAD") · **Sin mundo secundario.**
- **Función real:** decir qué ocurre ahora (siguientes pasos) tras el handoff del checkout; revisar la solicitud en WhatsApp. `noindex`. (CONFIRMADO — D7.)

### 16.2 Pregunta del visitante
"Ya envié mi solicitud… ¿y ahora qué?" (CONFIRMADO — matriz Fase 4 col. 5: "¿Qué ocurre ahora?"; J2.)

### 16.3 Trabajo que la página debe resolver
Cerrar el ciclo con serenidad y sin teatro: confirmar la recepción, explicar los siguientes pasos (revisión humana, contacto por WhatsApp) y ofrecer salidas útiles (recursos, programas). **No es otra página de venta.** (CONFIRMADO — auditor §7; J2/J3.)

### 16.4 Estado de llegada
Sabe: que acaba de enviar una solicitud con desglose. No sabe: qué pasa ahora ni cuándo le hablarán. Necesita: calma y pasos claros. (DERIVADO — D7.)

### 16.5 Estado de salida
Comprende: su solicitud está recibida, será revisada por una persona y le contactarán por WhatsApp. Puede: revisarla, ver recursos/programas. Siente: serenidad ("esto sigue en buenas manos"). (DERIVADO — mundo 08.)

### 16.6 Secuencia espacial
1. **ENTRADA (estructura):** confirmación de recepción en calma, sin fuegos artificiales. (CONFIRMADO — clase conversión.)
2. **DESCUBRIMIENTO (admite, muy suave):** siguientes pasos y qué puede hacer mientras. (DERIVADO — D7.)
3. **SALIDA (estructura):** revisar en WhatsApp / recursos / programas. (CONFIRMADO — matriz fila 15.)

Estado prohibido: inmersión, espectáculo, urgencia, venta. Cierre sereno. (CONFIRMADO — clase conversión, auditor §7.)

### 16.7 Arquitectura narrativa
1. **La confirmación** — "recibido, y esto es lo que sigue": certeza. 2. **Los pasos** — qué pasará y cuándo (revisión humana, contacto). Razón: la ansiedad se cura con expectativa clara, no con confeti. 3. **La salida útil** — recursos/programas para no dejar al visitante en un callejón de espera. Razón: continuidad real, no cierre comercial.

### 16.8 Geometría de información
**Lineal-cerrada** (recepción → pasos → salidas). Justificación: es la única ruta que cierra un ciclo; su geometría es de despedida acompañada, ni catálogo ni relato. (DERIVADO — mundo 08 + D7.)

### 16.9 Densidad y ritmo
**`quiet`** (CONFIRMADO — matriz Fase 5: quiet-transition). "Cierre sereno; confirmación sin teatro". (CONFIRMADO — SCROLL-STORY-MATRIX.)

### 16.10 Movimiento conceptual
- `quiet-transition` — aparición serena de la confirmación (CONFIRMADO — matriz).
- Text motion: `none` (CONFIRMADO). Sin sticky/horizontal/parallax (CONFIRMADO).
- 3D: **PROHIBIDO** (CONFIRMADO — mundo 08 no admite escenas; el momento ya es suficientemente fuerte).

### 16.11 Presupuesto de atención
Concentra: la confirmación y los pasos. Recupera: silencio visual total; las salidas son enlaces serenos. Nada compite con la tranquilidad. (PROPUESTO.)

### 16.12 Momento irreductible
**El "qué ocurre ahora" con expectativa de contacto humano.** Es la única página de todo el sitio donde ya no hay conversión que ganar: solo acompañamiento post-entrega. Si se eliminara (o se convirtiera en otra oferta), el ciclo J2 perdería su cierre y el visitante quedaría a la deriva tras enviar su solicitud. (CONFIRMADO — D7/matriz; papel DERIVADO.)

### 16.13 Prohibiciones específicas
- Prohibido vender aquí: no es otra página de conversión. (CONFIRMADO — auditor §7; mundo 08.)
- Prohibido espectáculo/confeti de "compra completada": no hay pago online; hay solicitud recibida. (CONFIRMADO.)
- Prohibido dejar al visitante sin salida ("solo espera"): recursos/programas a mano. (DERIVADO — matriz fila 15.)
- Prohibido fabricar urgencia o plazos inventados de contacto. (DERIVADO.)

### 16.14 CTA y continuidad
CTA primario: revisar en WhatsApp (CONFIRMADO — matriz fila 15). Secundarios: recursos / programas. Fuera de itinerario (NextChapter no aplica; la continuidad es la vida real). (CONFIRMADO — chapters.js.)

### 16.15 Evidencia
CONFIRMADO: D7, J2/J3, matriz Fase 4 fila 15, matriz Fase 5, auditor §7, chapters.js. DERIVADO: mundo 08, geometría. PROPUESTO: presupuesto, prohibición 4.

---

# BLUEPRINTS ENTRE 17–18 Y NOTA D (CATEGORÍAS B, C Y D)

## 17. `/entrar` — ALIAS DE `/onboarding`

### 17.1 Identidad (categoría B)
**NO es una experiencia independiente.** `/entrar` renderiza el componente de `/onboarding`; solo la canónica se indexa (`ROUTE_ALIASES` → `/onboarding`, canonical apuntando a la ruta real). (CONFIRMADO — routeMeta.js `ROUTE_ALIASES`; regla "un alias nunca es canónico de sí mismo".)

### 17.2 Qué define el alias
- **Mundo dominante:** 00 ORIGEN (mismo que su canónica). (DERIVADO.)
- **Función real:** un atajo verbal ("Entrar") para el CTA de la barra y las puertas de la home que lleven al umbral. (CONFIRMADO — D2: CTA "Entrar" de barra; J2.)
- **Pregunta del visitante:** idéntica a la de `/onboarding`. El alias no formula preguntas nuevas.

### 17.3 Secuencia espacial y movimiento
Deben ser una réplica calma de la canónica, con una sola matización documentada:
- La SCROLL-STORY-MATRIX lo marca `quiet`/`quiet-transition` (acceso mínimo y directo). Este blueprint mantiene esa lectura para el acceso directo y deja la intención `balanced` (editorial-slide en preguntas) a la canónica. (CONFIRMADO vs. matriz — sin corrección: ambos niveles son compatibles; la matriz trata la ruta como alias directo.)

### 17.4 Prohibiciones específicas
- Prohibido darle personalidad propia (experiencia, movimiento o 3D exclusivos del alias). (CONFIRMADO — naturaleza de alias.)
- Prohibido indexarlo: su canonical es `/onboarding`. (CONFIRMADO — routeMeta.)

### 17.5 Evidencia
CONFIRMADO: ROUTE_ALIASES, D2, J2, SCROLL-STORY-MATRIX. DERIVADO: mundo 00.

---

## 18. `*` (404) — RECUPERACIÓN · NUNCA UN CALLEJÓN

### 18.1 Identidad (categoría C)
- **Ruta:** catch-all `*` → NotFound · **Nombre funcional:** Recuperación (CONFIRMADO — matriz Fase 4 fila 17).
- **Mundo:** sin mundo asignado — la 404 **recoloca**, no habita: su función es devolver al mapa real. (DERIVADO — clase recuperación; J9.)

### 18.2 Pregunta del visitante
"Me he perdido, ¿dónde iba?" (CONFIRMADO — matriz Fase 4 col. 5.)

### 18.3 Trabajo que la página debe resolver
Recolocar en accesos principales con las 4 tarjetas de recuperación, sin culpa y sin callejón sin salida. Ton = sereno, NO de venta. (CONFIRMADO — J9; matriz fila 17.)

### 18.4 Estado de llegada
Sabe: que la URL no existe. No sabe: a dónde ir. Necesita: salidas claras e inmediatas. (DERIVADO — J9.)

### 18.5 Estado de salida
Comprende: que hay un camino de vuelta. Puede: volver a home/programas/recursos/comunidad. Siente: "no pasa nada, aquí está el sitio". (CONFIRMADO — J9.)

### 18.6 Secuencia espacial
1. **ENTRADA (estructura):** reconocimiento sereno del error, sin dramatismo. 2. **SALIDA (estructura):** la recolocación inmediata. **Solo estos dos estados** (§3 SPATIAL-LANGUAGE: "404 solo entrada+salida"; clase recuperación). (CONFIRMADO — J9; §4.7.)

### 18.7 Arquitectura narrativa
1. **El gesto** — "esta página no existe" en tono adulto. 2. **Las 4 rutas** — accesos principales (home, programas, recursos, comunidad). Razón: devolver con un mapa mínimo, no con un inventario.

### 18.8 Geometría de información
**Utilitaria-mínima** (mensaje + 4 enlaces). Justificación: es la única ruta sin contenido propio; su geometría es puramente funcional. (PROPUESTO.)

### 18.9 Densidad y ritmo
**`quiet` absoluto** — sin movimiento retórico. La recuperación se logra con claridad, no con efectos. (PROPUESTO, coherente con clase recuperación.)

### 18.10 Movimiento conceptual
`quiet-transition` — aparición serena; nada más. Text motion `none`. Sin sticky/horizontal/parallax. 3D: **PROHIBIDO** (CONFIRMADO — clase recuperación.)

### 18.11 Presupuesto de atención
Concentra: las 4 tarjetas. Recupera: cero — la 404 no tiene tiempo de recuperación, solo salida. (PROPUESTO.)

### 18.12 Momento irreductible
**Las cuatro tarjetas de recolocación.** Sin ellas, la 404 sería una URL muerta con un mensaje; con ellas, es el final sereno de todo camino roto. (CONFIRMADO — J9; papel DERIVADO.)

### 18.13 Prohibiciones específicas
- Prohibido vender en la 404 (ofertas, cupones, "mientras estás aquí…"). (CONFIRMADO — auditor §7: "Recoloca. No venda".)
- Prohibido el humor oscuro o la culpa hacia el visitante. (DERIVADO — mundo/tono sereno.)
- Prohibido el listado exhaustivo de rutas: 4 accesos principales bastan (CONFIRMADO — J9).

### 18.14 CTA y continuidad
CTA: las 4 tarjetas de recuperación (CONFIRMADO — J9). Sin NextChapter, sin breadcrumb (recuperación propia). `noindex` + HTTP 404 real (OBS-2 del PROJECT-STATE: hoy soft-404; endurecimiento en ROADMAP). (CONFIRMADO — matriz fila 17; PROJECT-STATE.)

### 18.15 Evidencia
CONFIRMADO: J9, matriz Fase 4 fila 17, auditor §7, OBS-2/PROJECT-STATE. DERIVADO: mundo sin asignar, geometría. PROPUESTO: secuencia/ritmo.

---

## NOTA D — RUTA INTERNA `/design-system`

**Categoría D:** en `ROUTE_META` pero fuera del sitio público: `noindex` + `Disallow` en robots + fuera de sitemap (`INTERNAL_ROUTES`, contrato de rutas). (CONFIRMADO — DESIGN-SYSTEM.md §12; PROJECT-STATE.)

- **Sin blueprint público completo.** Es un playground interno que **demuestra las piezas** del Design System (bloques 10–16 del playground), no parte del itinerario ni del sitemap. (CONFIRMADO — SCROLL-STORY-MATRIX línea interna; FASE3-VEREDICTO.)
- **No pertenece a ningún mundo**: no es una experiencia de visitante, es una herramienta de construcción. (DERIVADO.)
- **Lo que debe conservar:** acceso directo sin navegación pública, `noindex`, Disallow y exclusión del sitemap y del HTML estático. (CONFIRMADO — FASE3 gate: build sin HTML estático de la ruta interna.)
- **Prohibido:** convertirlo en showcase público, darle CTA de venta o asignarle curva de visitante. (CONFIRMADO — naturaleza interna.)

Evidencia: DESIGN-SYSTEM.md §12, SCROLL-STORY-MATRIX (interna), FASE3-VEREDICTO.md (gate), PROJECT-STATE OBS-1.

---

# AUDITORÍA DE NO-INTERCAMBIABILIDAD (REQUISITO CRÍTICO DEL CONTRATO §6)

## TEST 1 — Intercambio de blueprint
Para cada ruta se preguntó: *"Si cambio el nombre de esta ruta por otra, ¿seguiría teniendo sentido?"*

**Resultado: NINGÚN blueprint supera la prueba con otro nombre.** La prueba explícita por las 5 parejas de mayor riesgo está en la sección siguiente (TEST 2). El complejo de fichas de plan (5–8) es el caso límite controlado: comparten sistema (decisión `quiet`), pero la prueba de intercambio de **nombre+función** falla en los cuatro (RAÍZ "primer paso" ≠ FUERZA "corrección" ≠ RENDIMIENTO "medición" ≠ ELITE "relación"), por lo que el requisito se cumple incluso en el peor caso. (Fallo intencionado del intercambio = requisito cumplido.)

## TEST 2 — Intercambio de hero (parejas explícitas)

| Pareja en riesgo | ¿El hero de una podría pertenecer a la otra? | Fallo del intercambio |
|---|---|---|
| `/programs` ↔ `/resources` | **NO.** `/programs` abre con el mapa de niveles y precio (comparación); `/resources` abre con biblioteca y el recurso gratis (prueba sin datos). La pregunta y la geometría difieren: comparar ≠ probar. | El hero de `/programs` (precio/estructura) sería ruido en una página que promete "sin datos"; el de `/resources` (invitación a usar) sería insuficiente para alguien que viene a medir. |
| `/about` ↔ `/community` | **NO.** `/about` abre con historia individual y cierra en el mapa (confianza en la persona); `/community` abre con acceso gratuito y voces en rail (pertenencia). | El hero de `/about` (biografía) no pertenece a una página que debe decir "entra gratis"; el de `/community` (acceso) enterraría el relato personal de la marca. |
| `/plan/raiz` ↔ `/plan/elite` | **NO.** RAÍZ abre con "tu primer paso" (permiso de volver); ELITE abre con persona/cupos (acceso directo). | Intercambiarlos invierte el argumento: el que vuelve no busca exclusividad y el que busca a Sebastián no necesita permiso de empezar. |
| `/checkout` ↔ `/faq` | **NO.** `/checkout` abre en mitad de la decisión (plan precargado, pasos); `/faq` abre con un índice de dudas (claridad de lectura). | El hero de `/checkout` (paso de configuración) no tiene sentido sin selección previa; el de `/faq` (índice) sería una barrera en un embudo que debe ser todo-acción. |
| `/parkour-academy` ↔ `/app` | **NO.** Academia abre con el gesto (control) y la escalera; la app abre con el estado real (concepto en desarrollo). | El momento «detiene el tiempo» de la academia sería engañoso para un producto que aún no existe; la honestidad de estado de la app carecería de potencia narrativa para una escuela que sí existe. |

## TEST 3 — Intercambio de ritmo (intensidades compartidas)
Páginas que comparten intensidad pero NO experiencia — la prueba de lectura completa por blueprint confirma diferencias de pregunta, geometría, secuencia, momento y continuidad:

- **`quiet`** comparten: fichas 5–8, `/resources`, `/faq`, `/checkout`, `/order-confirmation`, `/entrar`, 404. Aun así, geometrías distintas: RAÍZ (lineal-progresiva), RENDIMIENTO (técnica), FAQ (P-R), checkout (guiada-lineal estricta), 404 (mínima). Ni una sola comparte momento irreductible.
- **`balanced`** comparten: `/about`, `/onboarding`, `/programs`, `/shop`, `/app`, `/community`. Su diferenciación se prueba en Test 2 (heroes) y en los momentos irreductibles: mapa-persona vs. acceso-gratis vs. precio-vivo vs. carrito-conversación vs. no-promesa vs. umbral.
- **`immersive`** comparten: `/` y `/parkour-academy` (máximo permitido: un momento narrativo por página, MOTION-MAP). `/` inmerge en el MÉTODO (estructura); la academia inmerge en la TRAYECTORIA (movimiento). Mismo género, distinto objeto: la prueba de *contenido* del momento no se intercambia.

## TEST 4 — Nueve mundos no son nueve estilos
Regla: prohibido resolver la diferenciación como "mundo diferente = color/gradiente/tema diferente".
- Ningún blueprint introduce paleta, material o estilo propios de mundo; la diferenciación se expresa en **función, geometría, pregunta, momento y secuencia**. (DERIVADO — BIBLE §W matrices; DF-011.)
- La única variación cromática real del sistema es la que ya existe en tokens (acento/fire/deep), compartida por todas las rutas. (CONFIRMADO — ds-tokens.css.)
- ✓ Requisito cumplido: los 9 mundos conviven con UN material, porque la diferenciación de BAYONA es experiencial, no decorativa.

---

# MAPA DE RELACIONES ENTRE BLUEPRINTS (CONTRATO §8)

## 8.1 Respuestas al mapa

1. **Rutas que se parecen superficialmente pero deben comportarse distinto:** `/programs` vs `/resources` (comparar vs probar), `/about` vs `/community` (confianza en la persona vs pertenencia), las 4 fichas de plan entre sí (prueba fallada por función, TEST 2), `/shop` vs `/programs` (comprar por sesión vs elegir acompañamiento), `/faq` vs `/checkout` (leer vs actuar).
2. **Rutas que comparten infraestructura pero no experiencia:** las 4 fichas (misma estructura de ficha, distinta argumentación), `/onboarding` y su alias `/entrar` (mismo componente, distinto canal de llegada), las rutas `quiet` (mismo presupuesto, distinta geometría).
3. **Mayor continuidad del sitio:** el itinerario canónico (chapters.js): `/` → `/about` → `/programs` → `/parkour-academy` → `/app` → `/community` → `/resources` → `/shop` → `/faq` → (vuelta a `/`). Es la espina dorsal de la que dependen J1–J10 y NextChapter.
4. **Ruptura deliberada (dónde y por qué):** en el embudo (`/checkout`, `/order-confirmation`) y en `/onboarding` (recepción sin chrome), donde la gramática cambia a decisión/umbral absoluta. La ruptura es deliberada porque ahí la identidad sirve a la claridad, no a la narrativa (regla de oro del plan §14).
5. **Rutas que funcionan como puertas:** `/` (reparte a los 3 journeys), `/onboarding` (umbral de orientación), `/resources` (puerta gratuita, J1), `/community` (puerta lateral gratuita, J7).
6. **Rutas estación:** `/programs` (comparación), `/shop` (compra paralela), `/app` (concepto), `/parkour-academy` (academia), `/about` (marca) — reciben, muestran y dejan seguir.
7. **Rutas de decisión:** las 4 fichas `/plan/*`, `/checkout` (decisión pura), `/faq` (pre-decisión: disuelve dudas).
8. **Ruta con mayor obligación de silencio visual:** `/checkout`. Su prohibición es la más severa del documento: sin narrativa, sin inmersión, sin 3D, sin urgencia — solo claridad. Le siguen `/faq` (quiet) y `/order-confirmation` (serenidad).

## 8.2 Tabla final (matriz de decisión del BLOQUE 5)

| Ruta | Mundo | Pregunta | Geometría | Intensidad | Momento irreductible | Mayor riesgo |
|---|---|---|---|---|---|---|
| `/` | 00+02 | ¿Es esto para mí y por dónde empiezo? | Exploratoria-orientadora | immersive | El reparto de puertas | Que el momento narrativo retrase el ancla de oferta |
| `/about` | 00+05 | ¿Quién está detrás y por qué confiar? | Editorial-narrativa | balanced | El globo de voces reales | Multiplicar escenas 3D (excepción→licencia) |
| `/onboarding` | 00+07 | ¿Cuál es mi camino? | Guiada-conversacional | balanced | Recepción sin chrome que devuelve ruta | Convertirse en formulario de venta |
| `/programs` | 07+02 | ¿Qué puedo entrenar y cuánto cuesta? | Comparativa | balanced | El precio que se construye delante | Ruido que emborrona la comparación |
| `/plan/raiz` | 07+01 | ¿Por dónde empiezo si llevo tiempo? | Lineal-progresiva | quiet | "Tu primer paso" | Avergonzar al que vuelve |
| `/plan/fuerza` | 07+01+02 | ¿Quién revisa que lo hago bien? | Progresiva-escalada | quiet | "Dejas de dudar si lo haces bien" | Venderlo como relleno intermedio |
| `/plan/rendimiento` | 07+02 | ¿Cómo mido y acelero mi progreso? | Progresiva-técnica | quiet | La evaluación biomecánica | Teatro visual en "resultados" |
| `/plan/elite` | 07+08 | ¿Puedo tener a Sebastián para mí? | Progresiva-relacional | quiet | WhatsApp directo + 10 cupos | Tocar/ampliar DP-5; urgencia fabricada |
| `/parkour-academy` | 03+05 | ¿Cómo aprendo parkour bien? | Progresiva por niveles | immersive | La escalera primer salto→control | Parkour como adrenalina de marketing |
| `/shop` | 04+08 | ¿Qué compro sin membresía? | Exploratoria-utilitaria | balanced | El carrito que termina en conversación | Inventar checkout online |
| `/app` | 02+06 | ¿Qué está construyendo BAYONA? | Exploratoria-conceptual | balanced | La no-promesa de producto en desarrollo | Vender app que no existe |
| `/community` | 05+08 | ¿Cuesta algo entrenar acompañado? | Exploratoria-cálida | balanced | El acceso gratuito y sin plan | Copiar el globo de `/about` |
| `/resources` | 06+00 | ¿Qué puedo probar gratis sin datos? | Utilitaria-biblioteca | quiet | El recurso gratis real y usable | Pedir datos o convertirla en cebo |
| `/faq` | 07+06 | ¿Qué dudas me quedan? | Utilitaria P-R | quiet | Las respuestas que no venden | Convertirla en cinematográfica |
| `/checkout` | 07 | ¿Cómo queda mi solicitud y cuánto? | Guiada-lineal estricta | quiet | Envío desglosado + disclaimer | Cualquier atisbo de espectáculo |
| `/order-confirmation` | 08 | ¿Y ahora qué? | Lineal-cerrada | quiet | El "qué ocurre ahora" humano | Vender después de la solicitud |
| `/entrar` (alias) | 00 | (idéntica a `/onboarding`) | (replica) | quiet | — (remite a su canónica) | Ganar identidad propia |
| `*` (404) | — | Me he perdido, ¿dónde iba? | Utilitaria-mínima | quiet | Las 4 tarjetas de recolocación | Vender en el error |
| `/design-system` | — (interna) | — | — | — | — (playground de piezas) | Nota D: exclusión obligatoria |

> ⚠️ **Nota de alcance:** esta tabla ES la semilla del **BLOQUE 5** (matriz de decisión final). Según el contrato §17, el BLOQUE 5 queda **PENDIENTE DE AUTORIZACIÓN**: no se transformará aquí en `resolvePageMotionContract()` ni en declaraciones técnicas. (Stop absoluto.)

---

# AUTOAUDITORÍA DEL BLOQUE 4 (CONTRATO §13)

## A. Cobertura
- **A (canónicas):** 16/16 blueprints completos (§1–16). **B (alias):** 1/1 (§17). **C (fallback):** 1/1 (§18). **D (interna):** nota de exclusión obligatoria (NOTA D). Verificado contra `routeMeta.js` y §0.2 del plan (16+1+1+nota = 18 entradas). ✓
- Total de entradas de blueprint: 18 + 1 nota. Ni falta ni sobra.

## B. Intercambiabilidad
Identificadas explícitamente (TEST 2): `/programs`↔`/resources`, `/about`↔`/community`, `/plan/raiz`↔`/plan/elite`, `/checkout`↔`/faq`, `/parkour-academy`↔`/app`. La prueba de intercambio falla en las 5. Además, el complejo de fichas 5–8 pasa su propia prueba de función (TEST 1/3). ✓

## C. Vocabulario
Solo las 8 recetas reales: `editorial-reveal`, `editorial-slide`, `compact-rail`, `cinematic-stage`, `data-cascade`, `image-drift`, `horizontal-passage`, `quiet-transition`. Solo 3 intensidades reales. Solo los 7 estados de SPATIAL-LANGUAGE. Zonas y rangos citados sin renombrar. Sin sinónimos. (Verificado contra `src/engine/recipes/index.js`, `intensity.js`, `motionBudget.js`.) ✓

## D. Engine
Cero APIs inventadas. `resolvePageMotionContract()` / `validatePageMotionContract()` / `checkBudget()` / `useScrollHandoff()` se citan solo como infraestructura existente para fases posteriores (Bloque 5/7/8), nunca se les añaden firmas ni contratos. Las relaciones son conceptuales ("puede expresarse mediante"). ✓

## E. 3D
Nada diseñado: sin geometrías, modelos, cámaras, shaders ni objetos. Solo clasificaciones: PROHIBIDO (mayoría), EXISTENTE/EXCEPCIONAL (`/about` Globe3D), POSIBLE CON JUSTIFICACIÓN (`/parkour-academy`, delegado a WORLD-3D-STRATEGY/Fase 7 vía `useScrollHandoff()`). ✓

## F. Producción
Diff previsto: **solo este fichero `.md` nuevo en la raíz**. Cero archivos de producción modificados. (Se verificará con `git status`/`git diff` antes del commit.) ✓

## G. Idioma
Todo el contenido nuevo humano está en español. Identificadores y vocabulario técnico conservados tal cual. ✓

## H. Calidad (test del diseñador senior)
Un diseñador senior que reciba este documento puede responder, por cada ruta de Fase 8: mundo, pregunta, geometría, secuencia espacial, intensidad, recetas conceptuales, 3D permitido/prohibido, momento irreductible, prohibiciones y continuidad — sin reinterpretar la filosofía. La tabla §8.2 es la semilla directa del Bloque 5. ✓

## Correcciones declaradas a SCROLL-STORY-MATRIX (Fase 5)
1. `/about`: el 3D ya existe (Globe3D) — la matriz lo lista como futuro; se registra la realidad presente sin cambiar la matriz (aplicable a la implementación de Fase 8). (Justificada en §2.10.)
2. `/entrar`: se documenta compatibilidad `quiet` (alias directo) con la intención `balanced` de la canónica. (Justificada en §17.3.)

---

# DEFINICIÓN DE ÉXITO (VERIFICACIÓN FINAL)

Al leer dos blueprints diferentes se siente que: las personas llegan con preguntas diferentes (16 preguntas propias), las geometrías difieren (exploratoria, editorial, guiada, comparativa, progresiva, técnica, relacional, biblioteca, P-R, lineal-estricta, cerrada, mínima…), los ritmos varían cuando deben (immersive solo en `/` y academia; balanced en las de experiencia; quiet en todo lo de decisión/lectura/embudo), los momentos irreductibles no compiten (ninguno se repite), las páginas no son copias con otro contenido, y todo sigue siendo inequívocamente BAYONA (un solo mundo material, una gramática de 7 estados, un vocabulario de 8 recetas).

**BLOQUE 4 ÚNICAMENTE. PRECISIÓN ANTES QUE VOLUMEN. EVIDENCIA ANTES QUE DECORACIÓN. DIFERENCIACIÓN ANTES QUE ESPECTÁCULO. CLARIDAD POR ENCIMA DE TODO.**

---

# STOP ABSOLUTO (CONTRATO §17)

- ✋ NO se inicia el **BLOQUE 5** (la tabla §8.2 queda como semilla; la conversión a `resolvePageMotionContract()` requiere autorización).
- ✋ NO se crea `WORLD-3D-STRATEGY.md` ni se diseñan escenas.
- ✋ NO se crean los tests documentales D-01…D-07 (pertenecen a la verificación del entregable, autorización posterior).
- ✋ NO se toca producción, código, CSS, componentes, catálogo, precios, SEO, sitemap, robots ni embudo.
- ✋ NO se resuelve **DP-5** (ELITE "acceso de por vida": solo Sebastián).
- ✋ Fases 7 y 8 NO comienzan.

El resultado queda **a la espera de la auditoría de ChatGPT** (revisión del informe + coherencia con el repo), tal como ordena el auditor: tú eres el puente; no me das el siguiente bloque sin auditoría.










