# CONTEXTO MAESTRO DE CONTINUIDAD

**Proyecto BAYONA — Rediseño integral de producto, UX, UI, 3D, motion y conversión**

> Documento maestro de continuidad para pegar al agente junto con cada nueva fase, de manera que no pierda el contexto ni vuelva a hacer trabajo ya terminado. Incorpora lo sucedido hasta la Fase 3, los hallazgos reales del repositorio, las decisiones tomadas, las decisiones abiertas y cómo trabajar a partir de ahora. (Origen: auditoría de ChatGPT del 2026-08-27.)

## 0. IDENTIDAD DEL PROYECTO

Proyecto: **BAYONA**

Repositorio: https://github.com/sebascontigo/bayona

Web pública actual: https://bayona-jet.vercel.app

El objetivo del proyecto no es simplemente "hacer una web más bonita". El objetivo es convertir BAYONA en una experiencia digital premium de entrenamiento y performance, con una identidad visual coherente, navegación clara, experiencia dinámica, 3D contextual, scroll storytelling, motion sofisticado y una arquitectura técnica sólida.

La visión del propietario es especialmente importante:

> Las páginas internas actualmente se sienten demasiado negras, planas y similares entre sí. Quiero que cada página tenga una experiencia propia, que al hacer scroll la composición vaya evolucionando y que el usuario sienta que está recorriendo una experiencia, no leyendo una página estática.

La intención NO es llenar todo de animaciones. La intención es: **profundidad + movimiento + narrativa + precisión + coherencia.**

## 1. OBJETIVO FINAL DEL PROYECTO

La web final debe sentirse como:

- una marca premium;
- una marca de performance;
- una experiencia editorial;
- una experiencia tecnológica;
- una interfaz cinematográfica;
- un sistema visual preciso;
- una marca coherente;
- una experiencia digital memorable.

NO debe sentirse como:

- una web genérica de gimnasio;
- una plantilla;
- una colección de landings independientes;
- una demo de Three.js;
- una página llena de efectos gratuitos;
- 17 páginas negras con texto diferente.

La gran meta es: **Cada página debe sentirse diferente, pero todas deben sentirse inequívocamente BAYONA.**

## 2. FORMA DE TRABAJO

El proyecto se está desarrollando en paralelo entre:

**ChatGPT** — Rol: arquitecto; director de producto; auditor; estratega UX; director de diseño; revisor técnico.

**Agente sobre el repositorio** — Rol: exploración del código; implementación; ejecución de tests; commits; push; documentación.

Flujo de trabajo obligatorio:

```
ChatGPT → define fase → usuario la pega al agente → agente inspecciona repo →
agente implementa → agente ejecuta tests/build/e2e → agente entrega informe →
usuario copia informe a ChatGPT → ChatGPT audita el resultado →
se aprueba o se corrige → siguiente fase
```

**Regla fundamental:** NO entregar todas las fases de golpe al agente. Se trabaja: **PLAN MAESTRO + FASE ACTUAL** y nada más. La razón es evitar que el agente se adelante y tome decisiones arquitectónicas correspondientes a fases posteriores.

## 3. PRINCIPIO DE NO REGRESIÓN

Cada fase debe preservar las decisiones y contratos ya cerrados. No se deben romper: rutas; catálogo; precios; WhatsApp; checkout; PDFs; SEO; analytics; consentimiento; formularios; navegación; accesibilidad existente; sistema de tests; build.

No se permite utilizar `test.skip`, `it.skip`, `describe.skip`, `xit`, `xdescribe` para ocultar regresiones. Cada fallo debe resolverse por causa raíz.

## 4. MAPA MAESTRO DE FASES

Roadmap general aprobado:

- **FASE 1** — Estabilización técnica + baseline.
- **FASE 2** — Integridad comercial + planes + PDFs + recomendador + checkout.
- **FASE 3** — Design System 2.0.
- **FASE 4** — Arquitectura UX + información + navegación + content journey.
- **FASE 5** — Motion Engine + Scroll Storytelling.
- **FASE 6** — World Building por página.
- **FASE 7** — Sistema 3D contextual.
- **FASE 8** — Rediseño profundo de las 17 páginas.
- **FASE 9** — Refinamiento integral de Home.
- **FASE 10** — Responsive + mobile + accesibilidad de interfaz.
- **FASE 11** — Accesibilidad completa.
- **FASE 12** — Performance profunda.
- **FASE 13** — SEO técnico + contenido.
- **FASE 14** — PDFs + recursos + ecosistema de contenidos.
- **FASE 15** — Analytics + CRO + embudo.
- **FASE 16** — QA completo.
- **FASE 17** — Deploy + auditoría final.

## 5. FASE 1 — ESTADO FINAL

**FASE 1 = COMPLETADA.** Objetivo: estabilizar el proyecto y establecer una baseline antes de rediseñar.

Resultado final:

- Tests: 217/217 después del cierre de Fase 2.
- E2E: 39/39.
- Build: OK.
- Lint: 0 errores.
- Rutas: 17 rutas públicas declaradas + 404.
- Baseline visual: 34 capturas: 17 rutas × desktop + mobile.
- Assets: inventariados.
- PDFs: 4 PDFs localizados.
- SEO: baseline documentada.
- Accesibilidad: baseline documentada.
- Performance: baseline documentada.
- Arquitectura 3D: auditada.

## 6. FASE 1 — HALLAZGOS TÉCNICOS CLAVE

Se identificaron: deuda CSS; capas históricas; problemas iniciales de tests; inconsistencias de catálogo; problemas de recomendación; duplicación de WhatsApp; dominio incorrecto; falta de error boundary específico para escenas 3D; problemas de StrictMode en navegación; brechas de accesibilidad.

Todo eso fue documentado y estabilizado.

## 7. FASE 2 — ESTADO FINAL

**FASE 2 = COMPLETADA.** La Fase 2 original había quedado parcialmente resuelta antes de su cierre formal y después se cerró el remanente.

Se verificó:

- Catálogo: 4 planes canónicos: RAÍZ, FUERZA, RENDIMIENTO, ELITE.
- Precios: alineados con el catálogo publicado.
- Identificadores: alineados.
- Slugs: alineados.
- Recomendador: determinista y validado.
- Checkout: los cuatro planes funcionan de principio a fin.
- WhatsApp: es fuente única de verdad.
- PDFs: 4/4 alineados con catálogo.
- Accesibilidad: aria-invalid corregido en RecommendationGuide.

## 8. FASE 2 — HALLAZGOS QUE QUEDARON ABIERTOS

Los datos comerciales ya están correctos. Quedaron decisiones de producto/UX pendientes:

- **DP-1** — Los PDFs no contienen CTA, WhatsApp ni contacto.
- **DP-2** — presentationUrl existe pero actualmente no tiene una entrada UI real.
- **DP-3** — /checkout existe y funciona, pero no tiene entrada visible desde la navegación actual.
- **DP-4** — RecommendationGuide existe pero no está montada en una ruta de producción.
- **DP-5** — Existe una decisión legal/comercial pendiente sobre la expresión "acceso de por vida" de ELITE.

IMPORTANTE: estas decisiones NO fueron forzadas arbitrariamente. Quedaron reservadas para las fases de UX, arquitectura y contenido donde puedan decidirse correctamente.

## 9. RESULTADO DE LA FASE 2

Al cierre de Fase 2: Tests 217/217. E2E 39/39. Build OK. Lint 0 errores.

## 10. FASE 3 — ESTADO FINAL

**FASE 3 = COMPLETADA.** La Fase 3 construyó el Design System sin rediseñar todavía las páginas públicas.

Este punto es fundamental: **no se modificó el aspecto de las 17 páginas públicas en Fase 3.** Se creó la infraestructura necesaria para poder hacerlo correctamente en fases posteriores.

## 11. DESIGN SYSTEM 2.0

Se creó:

- `src/styles/ds-tokens.css`
- `src/styles/ds-base.css`
- `src/components/ds/`

Con componentes: Container, Section, Surface, Button, Link, SectionLabel, HeroBase, CardBase, Metric, MediaBlock, CTABlock.

## 12. TOKENS GLOBALES

El Design System tiene: color; superficies; tipografía; spacing; grid; borders; radius; z-index; motion; 3D; breakpoints.

Todos los tokens están bajo namespace `--ds-*`. No se debe crear otro sistema paralelo.

## 13. TIPOGRAFÍA

Se adoptó la escala v2 existente como base del sistema. Esto se hizo porque ya existía una escala semántica útil y testada. No se creó una nueva escala arbitraria. Se añadieron conceptos para: CTA; valores numéricos.

La tipografía actual utiliza: Montserrat; Inter; DM Mono; según el papel semántico.

## 14. GRID

Se consolidó: container máximo aproximado 1240 px; gutter desktop; gutter mobile; 12 columnas; gap consistente.

El principio es: **todos los elementos deben poder alinearse sobre las mismas líneas.** Títulos, imágenes, datos, botones y 3D deben compartir una lógica de composición.

## 15. SPACING

Se estableció una escala basada en 4 px. El objetivo es eliminar gradualmente `margin: 37px;` / `padding: 53px;` cuando esos valores no tengan una razón de diseño.

## 16. COLOR

Se mantiene la identidad oscura. No queremos convertir BAYONA en una web llena de color. La profundidad debe aparecer mediante: tonos; superficies; luz; material; transparencia moderada; imagen; grano; 3D.

**El negro es la base, no la totalidad de la experiencia.**

## 17. RADIOS

Regla de marca:

- defecto: **0 px**.
- controles: **10 px**.
- superficies flotantes: **16 px**.

Esto debe mantenerse salvo decisión explícita posterior.

## 18. MOTION SYSTEM

Existe un sistema semántico: micro; standard; emphasis; cinematic.

- Motor principal de UI: **Framer Motion**.
- Smooth scrolling: **Lenis**.
- No se introdujo GSAP. No se debe introducir otro motor de animación sin una razón arquitectónica muy fuerte.

## 19. INFRAESTRUCTURA DE SCROLL

Ya existe: useReveal; useScrollProgress; useLenis; Parallax; PageTransition. Y se añadió: useSticky.

Esta infraestructura está preparada pero todavía no se ha aplicado masivamente a las páginas. Eso pertenece a las fases posteriores.

## 20. SISTEMA 3D

El proyecto ya utiliza: Three.js; React Three Fiber; Drei; postprocessing.

Existe: CapabilityProvider; useCapabilities; sceneRegistry; resolveSceneConfig; SceneMount; SceneErrorBoundary; LightingRig.

También se añadieron presets para: cámara; materiales; profundidad; movimiento.

## 21. ESTADO ACTUAL DEL 3D

En el baseline solamente existe una escena 3D viva: **/about** mediante Globe3D. Las demás rutas todavía NO tienen escenas.

Esto es intencional. El objetivo es que el sistema 3D se aplique correctamente posteriormente, página por página.

## 22. FALLBACK 3D

El sistema contempla:

- desktop: experiencia completa.
- tablet/mobile: degradación.
- reduced motion: degradación adicional.
- sin WebGL: fallback.
- error de escena: la capa 3D falla pero la página continúa funcionando.

Esto debe conservarse.

## 23. CURSOR

Existían dos cursores. Se unificaron. Ahora el cursor vive en `engine/effects/CustomCursor`. Respeta: capacidades; touch; reduced-motion. Visual actual: **anillo vivo**. Esta decisión está aprobada.

## 24. PLAYGROUND

Existe `/design-system` como ruta interna. Es: noindex; fuera del sitemap; fuera del HTML estático público; destinada a validar el sistema.

No debe convertirse en una página comercial pública salvo decisión explícita.

## 25. TESTING ACTUAL

Después de Fase 3: Tests 273/273. E2E 41/41. Lint 0 errores. Build OK.

Se han creado tests específicos para: Design System; tokens; motion; breakpoints; presets 3D; useSticky; cursor; playground; contratos del sistema.

## 26. CSS ACTUAL

El repositorio tiene alrededor de 46 hojas CSS y aproximadamente 770 KB sin minificar. Existe una mezcla histórica de: styles.css; overrides; v2; v3; luxury; premium; refinements; CSS por página.

IMPORTANTE: en Fase 3 no se eliminó todo eso porque todavía hay páginas que dependen de esas capas. La migración debe hacerse progresivamente.

## 27. CSS QUE DEBE DESAPARECER PROGRESIVAMENTE

Especialmente: `overrides.css` y pequeños archivos de `*-refinements.css` cuando sus reglas hayan sido absorbidas de forma segura.

NO crear `v4-*`. NO crear otra capa gigante de overrides.

## 28. DEPENDENCIAS

Hay cinco candidatas a estar muertas: gsap; swiper; react-window; react-intersection-observer; clsx.

Esto está documentado. NO eliminarlas arbitrariamente durante el rediseño. Su eliminación debe hacerse cuando corresponda, con build/tests.

## 29. PERFORMANCE ACTUAL

El build ya está code-split por ruta. La Home es estática y se protege el LCP. El 3D no se descarga globalmente.

El bundle de Three.js es actualmente una de las mayores cargas cuando se utiliza: aproximadamente 827 KB minificados. Esto debe considerarse antes de añadir escenas complejas a 17 páginas.

## 30. ASSETS

`public/` pesa aproximadamente 42,6 MB. Hay: 161 imágenes; 30 imágenes de testimonios; 4 PDFs. Hay múltiples JPG pesados. No hay AVIF/WebP actualmente.

Esto está reservado principalmente para la Fase 12. NO convertir ahora toda la carpeta indiscriminadamente mientras hacemos el diseño.

## 31. SEO ACTUAL

Existe generación de HTML por ruta durante el build. Hay metadata por ruta. Existe: canonical; Open Graph; Twitter; JSON-LD; sitemap; robots.

El dominio canónico actual es: **https://bayona-jet.vercel.app**. Fue adoptado como dominio actual del despliegue. No cambiar esto durante el rediseño salvo decisión explícita.

## 32. RUTAS ACTUALES

Las 17 rutas públicas son:

```
/
/about
/programs
/parkour-academy
/plan/raiz
/plan/fuerza
/plan/rendimiento
/plan/elite
/shop
/app
/community
/resources
/faq
/checkout
/order-confirmation
/onboarding
/entrar
```

Además existe 404 y la ruta interna `/design-system`.

## 33. FUNCIÓN DE CADA FAMILIA DE PÁGINAS

Todavía NO es la arquitectura UX definitiva. Pero el sistema actual se puede entender así:

- **Home** — Visión + adquisición + entrada.
- **Programs** — Descubrimiento y comparación de programas.
- **Planes** — Profundización comercial.
- **Parkour** — Experiencia específica.
- **About** — Historia / persona / marca.
- **Community** — Pertenencia.
- **Resources** — Valor gratuito / contenido.
- **FAQ** — Resolución de objeciones.
- **App** — Tecnología / futuro.
- **Shop** — Comercio / extras / productos.
- **Onboarding** — Entrada guiada.
- **Checkout** — Configuración de solicitud.
- **Confirmation** — Continuidad posterior.

Esto será analizado y posiblemente reorganizado en la Fase 4.

## 34. IDEA CENTRAL DE DISEÑO QUE GUIARÁ LAS SIGUIENTES FASES

El propietario ha indicado específicamente que las páginas posteriores a la Home son demasiado negras y planas. Y quiere: más dinamismo; más 3D; más profundidad; elementos alineados; tipografía simétrica; cambios de composición durante el scroll; experiencias diferentes por página; sensación premium; sensación cinematográfica.

Interpretación correcta: NO significa "poner una animación cada segundo". Significa: **hacer que el scroll sea una narrativa visual.**

## 35. PRINCIPIO DE SCROLL

Ejemplo conceptual:

```
HERO → presentación → elemento aparece → cámara cambia → texto se reconfigura →
objeto se transforma → contenido cambia de plano → nueva sección → CTA
```

No todas las páginas deben usar exactamente esta secuencia. Debe existir variedad.

## 36. PRINCIPIO DE DIFERENCIACIÓN

No queremos: Hero → Texto → Cards → Botón → Footer repetido 17 veces.

Queremos: Página A editorial. Página B 3D. Página C datos. Página D fotografía. Página E storytelling. Pero todas: **BAYONA**.

## 37. FUTURO LENGUAJE VISUAL

La dirección artística acordada conceptualmente es:

- **Editorial** — Grandes titulares y composiciones.
- **Arquitectónica** — Grid, espacio, proporción.
- **Performance** — Movimiento y energía.
- **Tecnológica** — Sistemas y precisión.
- **Cinematográfica** — Escala, profundidad y narrativa.
- **3D** — Objetos que comunican ideas.

## 38. LO QUE NO QUEREMOS

Evitar: 3D decorativo aleatorio; exceso de partículas; neon; glow excesivo; glassmorphism indiscriminado; animaciones infantiles; efectos "wow" sin propósito; scroll hijacking; vídeos pesados innecesarios; tipografía desordenada; 17 diseños incompatibles; CSS parcheado.

## 39. REGLA PARA EL 3D

Cada escena deberá responder: **¿Qué idea de la página representa este objeto?** No debe existir una esfera solo porque es fácil hacer una esfera.

Ejemplo conceptual:

- Fuerza: tensión / masa / compresión.
- Rendimiento: velocidad / trayectoria.
- Élite: precisión / control.
- Comunidad: sistema / conexión.
- Parkour: trayectoria / libertad.

Estas son direcciones conceptuales, NO implementaciones definitivas.

## 40. REGLA PARA LA TIPOGRAFÍA

Toda la web debe sentirse tipográficamente relacionada. Debe existir: una misma jerarquía; una misma escala; una misma lógica de spacing; una misma alineación.

Las páginas podrán variar la composición. No podrán romper el sistema.

## 41. REGLA PARA EL GRID

Todo debe tener una razón de alineación: los títulos; las imágenes; las tarjetas; los datos; los objetos 3D; los botones; las líneas; la navegación.

La web debe transmitir: **precisión**.

## 42. REGLA PARA EL NEGRO

El negro seguirá siendo una parte fundamental. Pero no debe ser fondo negro infinito.

La profundidad se creará usando: diferentes superficies; iluminación; fotografía; textura; 3D; contraste; composición; espacios.

## 43. REGLA PARA MOBILE

Mobile no es una versión mini de desktop. Debe conservar: narrativa; jerarquía; identidad; acción. Pero con: menos complejidad 3D; menor DPR; menos partículas; menos capas; menos animación simultánea.

## 44. REDUCED MOTION

Siempre debe existir una experiencia usable con `prefers-reduced-motion`, sin depender de animaciones para entender el contenido.

## 45. WHAT TO PRESERVE

No romper:

- **Comercial**: catálogo; precios; planes; WhatsApp; checkout; PDFs.
- **Producto**: onboarding; app; community; shop.
- **SEO**: routeMeta; canonical; structured data; sitemap; robots.
- **Técnica**: tests; error boundaries; capabilities; 3D fallback; consent; analytics.

## 46. DECISIONES YA APROBADAS

Estas decisiones pueden considerarse cerradas:

- **Tipografía** — Se acepta la escala v2 como base del Design System.
- **Radios** — 0 px como defecto de marca. 10 px para controles. 16 px para superficies flotantes.
- **Cursor** — Anillo vivo.
- **Motion** — Framer Motion + Lenis como base.
- **3D** — Three.js / React Three Fiber existentes.
- **Design System** — `--ds-*` como namespace.
- **Playground** — /design-system interno y no indexable.

## 47. DECISIONES AÚN ABIERTAS

No resolver arbitrariamente:

- **DP-1** — CTA en PDFs.
- **DP-2** — Uso de presentationUrl.
- **DP-3** — Entrada visible a /checkout.
- **DP-4** — Dónde vive RecommendationGuide.
- **DP-5** — "Acceso de por vida" de ELITE.

Estas decisiones deben estudiarse desde la arquitectura UX cuando corresponda.

## 48. SIGUIENTE OBJETIVO

La siguiente fase es: **FASE 4 — ARQUITECTURA DE EXPERIENCIA**.

No es una fase de decoración. Es una fase de: Information Architecture; UX Architecture; Navigation; Content Journey; Conversion Journey; Page roles; route hierarchy.

## 49. OBJETIVO DE FASE 4

Definir claramente: **¿Qué función cumple cada una de las 17 rutas?** Y: **¿Cómo pasa un usuario de descubrir BAYONA a convertirse en cliente?**

## 50. FASE 4 DEBE RESOLVER

- **Navegación** — Qué aparece en desktop. Qué aparece en mobile. Qué va en navegación primaria. Qué va en navegación secundaria.
- **Jerarquía** — Agrupación de las 17 rutas.
- **Journey** — Por ejemplo: descubrir → entender → comparar → elegir → configurar → contactar → continuar. Pero el journey definitivo debe salir del análisis del negocio y de las páginas reales.
- **RecommendationGuide** — Determinar dónde debe existir. No necesariamente Home.
- **Checkout** — Determinar su papel. Puede ser: checkout; configurador; propuesta personalizada; handoff a WhatsApp.
- **PDFs** — Determinar si son: documentos de referencia; fichas de venta; materiales descargables.
- **Breadcrumbs** — Determinar si deben aparecer visualmente.
- **CTA hierarchy** — Definir: CTA principal; CTA secundario; CTA contextual.

## 51. FASE 4 NO DEBE HACER

No: rehacer todo el CSS; crear escenas 3D; rediseñar visualmente las 17 páginas; llenar las páginas de animaciones; cambiar la tipografía; introducir otro framework.

**La fase define arquitectura.**

## 52. FASE 5

Después de aprobar Fase 4: **MOTION ENGINE + SCROLL STORYTELLING**. Aquí convertimos el scroll en narrativa. Se definirá: pacing; reveal; sticky; transitions; camera movement; section choreography.

## 53. FASE 6

**WORLD BUILDING.** Aquí definimos: ¿Qué mundo visual tiene cada página? Cada ruta recibe una personalidad visual.

## 54. FASE 7

**3D CONTEXTUAL.** Se implementan: escenas; objetos; materiales; cámara; iluminación; profundidad; interacción.

## 55. FASE 8

**REBUILD DE LAS 17 PÁGINAS.** Aquí ocurre el gran cambio. Cada página dejará de ser una pantalla plana. Cada página recibirá: composición; narrativa; motion; 3D; fotografía; tipografía; CTA.

## 56. FASES POSTERIORES

- Fase 9 — Home.
- Fase 10 — Responsive + interfaz.
- Fase 11 — Accesibilidad.
- Fase 12 — Performance.
- Fase 13 — SEO.
- Fase 14 — PDFs y recursos.
- Fase 15 — Analytics/CRO.
- Fase 16 — QA.
- Fase 17 — Deploy final.

## 57. ESTADO AL INICIO DE FASE 4

Actualmente se debe considerar:

- Fase 1 ✅ cerrada.
- Fase 2 ✅ cerrada.
- Fase 3 ✅ cerrada.
- Fase 4 ⏳ siguiente.

## 58. REGLA DE ORO A PARTIR DE AHORA

No debemos confundir **infraestructura** con **diseño**.

Primero: arquitectura. Después: experiencia. Después: 3D/motion. Después: implementación visual.

## 59. CRITERIO DE ÉXITO DEL PROYECTO

Cuando el proyecto esté terminado, el usuario debería poder navegar por BAYONA y sentir:

> "Esta página es diferente de la anterior."

Pero inmediatamente después:

> "Esto sigue siendo BAYONA."

Y al hacer scroll:

> "La página está evolucionando conmigo."

Y al llegar al CTA:

> "Sé exactamente qué hacer después."

## 60. CRITERIO DE CALIDAD TÉCNICA

Nunca aceptar una mejora visual que: rompa tests; rompa navegación; empeore accesibilidad; destruya mobile; provoque una regresión comercial; dispare innecesariamente el bundle; cree otra capa de CSS descontrolada.

## 61. REGLA FINAL PARA EL AGENTE

Antes de implementar cualquier fase:

1. leer el repositorio actual;
2. leer los documentos generados;
3. respetar las decisiones cerradas;
4. respetar las decisiones abiertas;
5. no repetir trabajo ya realizado;
6. no adelantarse a fases posteriores;
7. implementar solo el alcance de la fase actual;
8. ejecutar tests;
9. ejecutar build;
10. ejecutar E2E;
11. documentar cambios;
12. detenerse al terminar la fase.

Cuando una fase termine: **STOP. No empezar automáticamente la siguiente.**

## 62. REFERENCIAS PRINCIPALES DEL ESTADO ACTUAL

Documentos importantes en la raíz del repositorio:

- BASELINE.md
- ROUTES.md
- TEST-MATRIX.md
- DESIGN-AUDIT.md
- ASSETS-INVENTORY.md
- PERFORMANCE-BASELINE.md
- SEO-BASELINE.md
- ACCESSIBILITY-BASELINE.md
- FASE2-CIERRE.md
- DESIGN-SYSTEM.md

Estos documentos son la memoria técnica del proyecto. Antes de tomar decisiones importantes, deben consultarse.

## 63. RESUMEN EJECUTIVO

BAYONA ya no está en fase de "arreglar errores básicos". Ahora está en una posición de: **base técnica sólida → sistema comercial coherente → Design System preparado → arquitectura UX pendiente → transformación visual pendiente.**

La siguiente decisión importante no es "¿Qué animación ponemos?". Es: **"¿Cómo queremos que una persona recorra BAYONA?"**

Una vez resuelto eso, podemos diseñar el movimiento, los mundos visuales, el 3D y las 17 páginas con mucho más criterio.

## 64. INSTRUCCIÓN DE CONTINUIDAD

Este documento debe considerarse contexto permanente del proyecto.

- No repetir las Fases 1–3.
- No rehacer auditorías ya completadas salvo que exista una razón específica.
- No modificar decisiones cerradas sin comunicarlo.
- No resolver decisiones abiertas por intuición.

La próxima fase a ejecutar es: **FASE 4 — ARQUITECTURA DE EXPERIENCIA**, y esa fase debe centrarse en: arquitectura + navegación + journeys + roles de página + recomendador + checkout + PDFs + jerarquía de contenidos + estrategia de conversión.

**No empezar todavía el rediseño visual completo.**
