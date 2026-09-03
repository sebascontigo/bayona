# FASE 10.0 — HUMAN MATERIAL & ART DIRECTION AUDIT

Diagnóstico de humanidad visual de BAYONA + blueprint de dirección artística.
**Diseño, NO implementación** (§38-39 del prompt maestro del arquitecto: "NO
implementes material sin diagnóstico").

Fecha: 2026-09-03 · Base: `8595ef1` (= origin/main, árbol limpio) · Tras el
cierre de Fase 9 (AUDIT-LOG 019).

---

## 0. Inventario REAL de media (medido contra el repo, no asumido)

| Superficie | Media hoy | Origen | Humanidad del FUNDADOR |
|---|---|---|---|
| HOME hero | 0 media — texto + aurora + partículas (CSS/SVG) | — | **NINGUNA** |
| HOME imágenes (9) | stock | Burst CDN (curado en siteMedia.js) | 0 |
| HOME video "EL MÉTODO EN 2 MIN" | **placeholder vivo**: sin `videoId` → "VIDEO PRÓXIMAMENTE" + botón deshabilitado | — | 0 |
| ABOUT (5) | stock | Burst | **0 fotos del fundador** en toda la línea de vida (2003/2014/2019/2026) |
| PARKOUR (2) | stock (salto "a-person-mid-jump", 1,2 MB) | Burst | 0 |
| COMMUNITY (8) | stock | Burst | 0 |
| PROGRAMS (8) | stock | Burst | 0 |
| APP video "CONCEPTO EN 90 SEG" | placeholder vivo (sin videoId) | — | 0 |
| PROGRAMS video "CÓMO ELEGIR TU CAMINO" | placeholder vivo (sin videoId) | — | 0 |
| Testimonios (30 archivos: 10 personas × 3 tamaños) | locales, servidas del repo | **POR VERIFICAR con Sebastián** (curadas 18-24 ago) | El "sebastian-atleta" es un CLIENTE de 14 años (Joven atleta, Bogotá) — NO el fundador |
| OG social | bayona-og.png (marca) | propio | 0 (logo, no humano) |

**Cifra total del inventario:** 161 archivos en `public/images` (131 Burst +
30 testimonios) + 0 vídeo + 0 fotos del fundador. **La presencia humana del
fundador hoy es 100% TEXTO** (copy, quotes, WhatsApp CTA "Hola Sebastián").

**Hallazgo 10.0-A (el más accionable):** el componente `VideoSection.jsx`
está COMPLETO y bien construido (embed youtube-nocookie, captions track,
reduced-motion → autoplay=0, a11y, validación de ID) — montado 3 veces con
`hasVideo=false`. El delta entre "VIDEO PRÓXIMAMENTE" (hoy, botón muerto) y
un vídeo real de Sebastián hablando es **exactamente una string de
`videoId`**. Es la palanca humano-visual más barata de todo el mapa: grabar 3
vídeos → subirlos a YouTube → pegar 3 IDs.

**Hallazgo 10.0-B:** los 3 placeholders prometen contenido en primera persona
("Sebastián resume…", "Sebastián te guía…", "Sebastián presenta…") — el copy
YA vende humanidad que la media no entrega.

---

## 1. Human Material Map (¿dónde necesita qué?)

| Zona | Necesita | Por qué | Prioridad |
|---|---|---|---|
| HOME hero | 1 retrato/foto fuerte del fundador (o vídeo corto) | primer pliegue = promesa de marca personal | **P0** |
| HOME video método | 1 vídeo 2 min (talking-head/estructurado) | placeholder YA vivo + conversión | **P0** |
| ABOUT línea de vida | 3-4 fotos por era (2003 niño/2014 parkour/2019-25 entrenador/2026 fundador) | la narrativa existe en texto; sin rostro no es biografía | **P0** |
| PROGRAMS video elección | 1 vídeo 2 min | placeholder vivo | P1 |
| APP concepto | 1 vídeo 90 s | placeholder vivo | P2 |
| PARKOUR | 1 foto REAL de salto/precision propia | la página vende parkour con stock | P1 |
| COMMUNITY | fotos de personas reales (clientes) o decisión honesta de abstenerse | vende ecosistema; stock lo contradice | P1 (requiere consentimiento) |
| PLAN pages / FOOTER / CHECKOUT | **SILENCIO VISUAL deliberado** | mundo DECISIÓN quiet (blueprint): nada de humanidad espectacular en el embudo | NO |
| Testimonios | verificar si las 10 fotos son clientes reales con consentimiento | credibilidad | P1 (verificación) |

## 2. Photography Shot List (lista de rodaje para Sebastián)

Estilo global (§14 del prompt): DISCIPLINA · FUERZA · PRECISIÓN · CALMA ·
MOVIMIENTO · PROGRESIÓN · CIENCIA · HUMANIDAD · RESULTADO. Evitar: poses de
gimnasio genéricas, sonrisa publicitaria, estética influencer, saturación
excesiva, músculo como único mensaje. BAYONA vende estructura +
acompañamiento + resultado.

**Sesión A — Retrato fundador (la foto maestra):**
1. Retrato frontal 3/4, mirada a cámara, negro puro de fondo (estudio o
   pared sin detalle), luz lateral suave de ventana — calma+precisión.
2. Perfil lateral en reposo, mismo fondo — disciplina.
3. Medio cuerpo con material (cronómetro/laptop/cinta métrica) — ciencia.
4. Cuerpo completo de pie, postura neutra fuerte — estructura.
5. Detalle de manos (magnesia/apretar puño/anotar) — la textura humana.

**Sesión B — Línea de vida ABOUT (1 foto por era, pueden ser actuales
"recreando" con honestidad de pie de foto):**
6. Era 2003 (niño/origen): símbolo — si no existe foto real de la infancia,
   NO forzar stock: usar imagen de objeto/lugar real o quedarse en texto.
7. Era 2014 (parkour): foto propia de salto/precision REAL.
8. Era 2019-25 (entrenador): trabajando con persona real (si hay
   consentimiento) o plano de sesión solitaria (pizarra, material).
9. Era 2026 (fundador): el retrato A1 sirve.

**Sesión C — PARKOUR (acción propia):**
10. Precision/salto con encuadre bajo y espacio negativo ARRIBA (el ascenso).
11. Detalle de aterrizaje/zapatos/mano en muro.

**Sesión D — detalle/entorno (relleno editorial):**
12. Espacio de trabajo real (escritorio, luz natural, sin staging perfecto).
13. Material propio real (no catálogo).

**Specs por foto (mínimo aceptable):** máster 3000px lado largo, JPG fino o
RAW; ratio 4:5 (vertical retrato) o 3:2/16:9 según zona; espacio negativo
deliberado hacia donde mira el sujeto (el diseño BAYONA compone con negro).

## 3. Video Shot List

Los 3 placeholders ya definen título+duración+público — la lista es literal:

| # | Título (ya en la web) | Duración | Estructura sugerida | Fondo |
|---|---|---|---|---|
| V1 | EL MÉTODO BAYONA EN 2 MIN (Home) | 120s | Sebastián a cámara: punto de partida → plan → frecuencia (lo que dice el subtitle) | negro / espacio de trabajo |
| V2 | CÓMO ELEGIR TU CAMINO (Programs) | 120s | RAÍZ vs FUERZA vs RENDIMIENTO vs ELITE en 4 frases + cierre "si dudas, empieza en RAÍZ" | negro |
| V3 | BAYONA+ CONCEPTO EN 90 SEG (App) | 90s | dirección del producto, lo explorado, lo por definir | espacio de trabajo |

Más (futuras, no placeholder — NO priorizar):
- V4 salto/parkour en loop corto para hero (si el hero futuro pide vídeo).

**Specs de rodaje:** 1080p vertical + horizontal (o rodar 4K y reencuadrar),
30fps, audio con corbata/lavalier (el audio amateur mata la credibilidad más
que el vídeo amateur), luz de ventana o 1 panel LED suave, plano medio
pecho-arriba, mirar a cámara, guion de 6-8 frases por vídeo (2 min hablando
sereno ≈ 260-300 palabras).

## 4. Asset Technical Specification (lo que consumirá el sistema)

- **Foto delivery:** AVIF + WebP, `srcset` 390/768/1200/1920 + `sizes`,
  `width/height` fijos (anti-CLS), ratio declarado. Máster → delivery
  objetivo: **≤ 180 KB AVIF a 1920w**; retrato hero vertical ≤ 120 KB a 768w.
- **Video delivery:** YouTube (nocookie) para V1-V3 — **coste de bundle: 0**
  (iframe lazy); no auto-hospedar H.264 en el repo. Si en el futuro hay hero
  vídeo auto-hospedado: master ProRes/H.264 → H.264+HEVC/AV1, mute+loop,
  poster AVIF, ≤ 4 MB desktop / ≤ 2 MB móvil, `preload=none` + carga por
  interacción o IntersectionObserver.
- **Naming/registro:** TODO asset entra por `src/config/siteMedia.js`
  (SSoT existente — clave `founder-*`, NO mezclar con Burst) o por
  `public/images/founder/`. Los testimonios nuevos entran con el pattern
  256/960 existente.
- **Consentimiento:** personas distintas del fundador = consentimiento
  escrito registrado antes de subir (COMMUNITY y testimonios).

## 5. Placement Map (dónde entra cada pieza)

| Asset | Página | Zona exacta | Reemplaza a |
|---|---|---|---|
| Retrato A1 (vertical) | HOME | hero: columna derecha del layout (hoy vacía de media) o fondo tratado al 15% tras aurora | nada (añade) |
| V1 | HOME | VideoSection existente (solo videoId) | placeholder muerto |
| A1/B9 | ABOUT | etapa 2026 de la línea de vida (StickyStage G) | nada (la etapa existe sin rostro) |
| B7 (o foto de época real) | ABOUT | etapa 2014 | texto plano |
| B8 | ABOUT | etapa 2019-25 | texto plano |
| C10 | PARKOUR | zona hero/tres niveles | stock de salto |
| V2 | PROGRAMS | VideoSection existente | placeholder muerto |
| V3 | APP | VideoSection existente | placeholder muerto |
| D12-13 | ABOUT/COMMUNITY | texto editorial (opcional, relleno) | stock débil |

## 6. Responsive Crop Map

| Breakpoint | Retrato hero | Línea de vida | Parkour acción |
|---|---|---|---|
| 390 | crop 4:5 centrado en rostro, focal superior, texto SIEMPRE encima con fondo protector | pila estática (StickyStage fallback ya existe): 4:3 centrado | 9:16 vertical, sujeto en tercio inferior |
| 768 | 4:5 completo | 4:3 | 3:4 |
| 1024+ | 3:4 con espacio negativo derecho (composición desktop) | 16:10 | 16:9 con aire arriba (el ascenso) |
| Regla | `object-position` declarado por breakpoint, NO un solo fit | mismo plano de reemplazo (diseño G) | espacio negativo = dirección del movimiento |

Safe areas: en móvil el texto sobre imagen lleva degradado inferior del
sistema (tokens existentes); nunca poner CTA sobre el rostro.

## 7. Performance Budget (por zona, medible en el lab existente)

| Zona | Presupuesto | Medición |
|---|---|---|
| Hero foto | LCP element sigue siendo el texto del hero (como hoy) o la foto; si la foto gana, budget LCP ≤ 2.500ms en el lab preview 4174 (hoy ~1.100-1.500) | webvitals-lab + LCP observer |
| Hero foto bytes | ≤ 120 KB AVIF (768w) / ≤ 180 KB (1920w) | network-audit |
| V1-V3 (YouTube) | 0 KB hasta clic (iframe lazy ya implementado) | network-audit |
| Parkour foto | ≤ 150 KB AVIF, `loading=lazy` (está bajo el fold) | idem |
| Vídeo auto-hospedado futuro | PROHIBIDO sin fase específica con presupuesto propio | guard mental + §24 prompt |
| CLS | 0 adicional: TODO img con width/height/ratio declarado | webvitals |

## 8. Art Direction Board (coherencia con el sistema)

- **Paleta:** fotos tratadas para convivir con negro puro `#050505` y acento
  naranja `--bayona-orange` / champán `--luxury-accent`: fondos oscuros o
  luz natural cálida, NUNCA fondos blancos de estudio genérico.
- **Tratamiento:** sin filtros Instagram; permitir el grain global existente
  hacer su trabajo (la textura ya unifica). Contraste alto, saturación
  natural baja (no B&N total: la calidez es humanidad).
- **Cuerpo:** el cuerpo de Sebastián aparece TRABAJANDO (precisión, anotar,
  corregir), no posando. La progresión > el físico.
- **Tipografía sobre foto:** H1 Montserrat ya validado con degradado
  protector — no mover la jerarquía 9.1.

## 9. Hero Media Architecture (opciones §15 del prompt, evaluadas)

Criterio del prompt: impacto / coste / performance / mobile / conversión.

| Opción | Impacto | Riesgo composición validada | Perf | Móvil | Veredicto |
|---|---|---|---|---|---|
| A. Full-bleed video | alto | DESTRUYE la composición validada (texto+aurora+partículas con LCP baselined) | vídeo en primer pliegue = presupuesto crítico | autoplay policies | NO ahora |
| E. Hybrid 2D + foto/ vídeo en columna | alto | conserva layout (la hero-grid ya tiene columna) | foto estática = barata | crop fácil | **RECOMENDADA como primer paso (foto)** |
| H. Photo still + micro motion | medio-alto | conserva composición; la foto "respira" con la deriva existente | mínimo | fácil | **RECOMENDADA (variante de E)** |
| B/C/D/F/G | — | — | — | — | descartadas por costo/riesgo sin evidencia |

**Recomendación:** E+H — foto del fundador en columna derecha con la misma
deriva orgánica del hero (reutilizar hero-particle-drift), texto y jerarquía
INTACTOS. El vídeo full-bleed queda detrás de una fase futura con presupuesto
propio (§24).

## 10. About Media Architecture
Línea de vida G: cada etapa gana SU foto (2003/2014/2019-25/2026) en el
mismo plano de reemplazo — el mecanismo StickyStage ya hace el reemplazo; la
foto entra como fondo tratado 15-20% o como imagen lateral. Era sin foto
real disponible → la era queda en texto (honestidad > stock).

## 11. Community Media Architecture
Opciones: (a) fotos reales de clientes con consentimiento, (b) sin rostros —
plano de detalle/entorno real (manos, zapatillas, cuaderno), (c) mantener
testimonial MAPA 2D (ya es interacción) + avatares verificados. Decisión de
Sebastián + consentimientos; el stock actual en community es la zona más
contradictoria con la promesa de "ecosistema".

## 12. Conversion Media Architecture
- CHECKOUT/PLAN/ORDER: **sin humanidad nueva** (mundo DECISIÓN quiet) —
  único cambio permitido futuro: foto pequeña del fundador como "firma" de
  confianza junto a la garantía (opcional, medir).
- WhatsApp CTA "Hola Sebastián": un retrato pequeño junto al mensaje ya
  humaniza el salto (botón fijo z 30, sin tocar layout).
- El V1 (método en 2 min) es el asset de conversión #1: contesta la pregunta
  "¿en qué me estoy metiendo?" antes del plan.

---

## Red Team (antes de cerrar)

1. **¿Esto no es sobre-diseño?** No: 3 placeholders muertos prometen vídeos
   que no existen (brecha promesa-realidad medible) y el diagnóstico 9.2-A ya
   fijó material humano como P1 TOTAL con el arquitecto VALIDÁNDOLO.
2. **¿El hero con foto rompe 9.1/9.2?** La composición se conserva (opción
   E/H); cualquier cambio real será una fase 10.1 con gates y medición LCP.
3. **¿Stock actual es "mentira"?** No lo etiquetamos así: Burst es
   atmósfera editorial legítima; el problema es que la PROMESA de persona
   (copy en primera persona + WhatsApp a Sebastián) no tiene rostro. Se
   sustituye por prioridad, no por purga.
4. **¿Riesgo de galería pesada?** Presupuesto §7 + prohibición de
   auto-hospedaje de vídeo sin fase propia.
5. **¿Fotos de época inexistentes?** Documentado: era sin foto → texto. NO
   stock de infancia (falsedad).

## Estado

DONE (diagnóstico + blueprint de diseño; 0 implementación, 0 producción).

## Única siguiente acción

**Decisión de Sebastián** (es SU material y SU sesión): elegir el paquete
de rodaje mínimo viable = (V1 vídeo método 2 min + 5 fotos retrato sesión A +
1 foto parkour C10) — con eso se ejecuta Fase 10.1 (integración con gates:
visual + responsive + performance budget §7). El arquitecto audita este
documento mientras tanto.
