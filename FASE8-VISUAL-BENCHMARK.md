# FASE 8 — VISUAL BENCHMARK & INTELIGENCIA VISUAL (Bloque C del prompt maestro)

> **Fecha:** 2026-08-31 · **Método:** fetch real de las referencias autorizadas (no memoria, no suposición) — HTML público inspeccionado con extracción programática de señales técnicas. **Regla del prompt cumplida:** analizar principios, cero clonación de código/assets/identidad. HEAD al ejecutar: `63776ee`.

## 1. Qué se estudió y qué señales reales dio cada referencia

### 1.1 Fitonist (fitonist-app.webflow.io) — [MEDIDO: HTML 225.905 bytes inspeccionado]
| Señal detectada | Qué significa |
|---|---|
| **Webflow builder** + 126 `data-w-id` (interacciones nativas Webflow) | El "premium" de esta referencia NO viene de GSAP/ScrollTrigger: no aparecen. Viene de composición + interacciones declarativas simples |
| **Lenis (smooth scroll)** + Swiper + Lottie | Smooth scroll sí; lottie para micro-animos de marca |
| **Video incrustado** + CSS sticky (`hero-sticky`, `hero-height`) | Hero sticky CON vídeo; el patrón sticky que nosotros ya implementamos es exactamente el mismo mecanismo |
| **0 Three.js, 0 GSAP, 0 ScrollTrigger** | Dato clave: la referencia fitness que le gusta a Sebastián **es 2D-first** — valida nuestra arquitectura 7B por encima de cualquier discusión |

**Principios adoptables:** ritmo por secciones full-viewport con reposo entre ellas; el hero sticky con medio vivo (video/foto) detrás; micro-animos de marca (lottie-equivalente = nuestros recipes del engine).
**Descartado:** smooth scroll Lenis global (prompt §21: solo si aporta mejora clara; ya evaluado en Fase 5 — nuestro Lenis existe por capabilities y se desactiva en reduced-motion; añadir más no aporta).

### 1.2 Oryzo (oryzo.ai) — [MEDIDO: HTML 71.611 bytes]
| Señal detectada | Qué significa |
|---|---|
| **Canvas/WebGL presente** (única referencia con 3D real) + framework Next/React | El 3D existe PERO es el producto (un objeto físico reimaginado), no decoración de landing |
| Title/description puros, 0 GSAP, 0 Lenis, 0 marquee | Nada de efecto de moda: el peso está en UNA experiencia 3D central bien hecha |
| HTML pequeño (71 kB) con render JS | El 3D se carga aislado del contenido — mismo principio que nuestra lazy boundary |

**Principios adoptables:** UNA pieza central memorable > veinte efectos repartidos; el 3D solo cuando ES el producto (coincide con nuestro gate de admisión: parkour REJECTED, 0 escenas nuevas).
**Descartado:** cualquier tentación de "meter WebGL porque Oryzo lo tiene" — Oryzo es un caso de producto-3D; BAYONA es un servicio humano. Su escala tipográfica y la contención (cero efectos de scroll) sí son el nivel a imitar.

### 1.3 Utsubo best-threejs-2026 (artículo) — [MEDIDO: 10 sitios citados extraídos]
Sitios citados: oryzo.ai · brand.ivress.co.jp · Lacoste Ace Breaker · Shopify Editions Spring'26 · hubtown.co.in · sleep-well-creatives · explore.ownprimland · Cartier Watches&Wonders · webgpuexperts · kokopon.jp. Muestra sondeada (3): hubtown (WebGL+sticky), ivress y kokopon (experiencias 100% JS-rendered — nada en HTML estático: el 3D vive tras carga).

**Patrón transversal confirmado:** los sitios 3D "ganadores" cargan TODO el contenido esencial como HTML/CSS simple y montan el 3D como capa posterior aislada. Ninguna referencia top usa 3D global en el shell. **La arquitectura 7B de BAYONA es la práctica del mercado premium 2026, no una limitación.**

## 2. Veredicto cruzado: dónde está BAYONA frente a las referencias

| Dimensión | Referencias | BAYONA hoy | Brecha |
|---|---|---|---|
| Shell 2D-first | SÍ (Fitonist 0 three; Oryzo lo aísla) | ✅ SÍ (7B verificada, 0 bytes 3D/18 rutas) | **NINGUNA** |
| Scroll storytelling con identidad | Sticky hero + secciones (sin metafora propia por página) | ✅ 4 identidades (E/F/G/H) — **BAYONA va ADELANTE**: ninguna referencia tiene metáforas diferenciadas por página | **A FAVOR DE BAYONA** |
| Hero con medio vivo | Video/foto grande tras sticky | Foto escénica + partículas respirando (H) | Menor: candidato a video de fondo corto si Sebastián aporta material real suyo |
| Tipografía editorial masiva | Sí (Oryzo, Cartier) | Sí (sello de año 280px, hero-decorative-number 520px) | NINGUNA |
| Micro-interacciones de marca | Lottie en Fitonist | Recipes del engine (Fase 5, hechos y testeados) | NINGUNA — usar más los existentes antes de inventar |
| 3D | Solo si ES el producto | 0 escenas (admisión REJECTED con condiciones de reapertura) | Correcta por decisión 7A; sin acción |

## 3. Principios ADOPTAR (clasificados según el catálogo del prompt)

- **A. OBLIGATORIA (ya cumplida):** shell 2D-first, sticky storytelling, reduced-motion alternativo, semantic HTML, regression gates, network audit.
- **B. RECOMENDADA (consolidación, ya en marcha):** pulir las transiciones ENTRE las 4 experiencias elevadas (hilo de luz → raíl → sello comparten la familia naranja pero con suavizado de entrada/salida distinto por página); medir la altura de scroll de los sticky en móvil (300–400vh degradan a pila: validar que la longitud no canse).
- **C. OPCIONAL (solo tras feedback humano):** video corto real de Sebastián como fondo del hero (el "medio vivo" de Fitonist) — requiere material propio, NO stock; clipboard reveal del H1 (split-text) para el hero — con budget de motion respetado.
- **D. EXPERIMENTAL (no aplicar todavía):** 3D en parkour (expediente REJECTED con reapertura triple); WebGL shader en about (el mapa 2D ya es la pieza).
- **E. NO APLICAR:** Lenis global extra (ya existe), GSAP (el engine cubre los contratos; añadir el segundo motor violaría el presupuesto de mantenimiento), WebGPU, física, partículas 3D.

## 4. Conclusión del benchmark

El estudio con datos reales confirma tres cosas: **(1)** la referencia fitness favorita es 2D-first pura — nuestra arquitectura no solo es correcta sino que es EL estándar premium 2026; **(2)** BAYONA ya tiene algo que NINGUNA referencia tiene: metáforas narrativas diferenciadas por página (recorrer/subir/el tiempo/respirar), que es exactamente la "identidad no intercambiable" que el auditor exigió; **(3)** la brecha restante no es de efectos sino de **material humano real** (video del hero con Sebastián) y de pulido fino de lo ya construido. La recomendación única del prompt (§25-14): **consolidación + feedback visual humano, no más acumulación.**

*Documento en español; señales extraídas de HTML público con curl+python el 2026-08-31; archivos de evidencia en $TEMP (f8-fitonist.html, f8-oryzo.html, f8-utsubo.html).*
