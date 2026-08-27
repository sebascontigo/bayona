# SCROLL-STORY-MATRIX — Matriz de narrativa espacial por ruta (Fase 5)

**SOLO DOCUMENTACIÓN.** Esta matriz es la *propuesta* de contrato de movimiento para las
17 rutas públicas. **No se ha aplicado nada a ninguna página en Fase 5**: es el plano que
usarán Fase 6 (World Building/diseño) y Fase 8 (migración) al declarar cada contrato con
`resolvePageMotionContract()` + `validatePageMotionContract()`.

Reglas que la matriz respeta:
- Las páginas de **lectura o decisión** (planes, checkout, FAQ) llevan intensidad `quiet`
  y **nunca** sticky ni horizontal.
- Máximo **un** momento `immersive` (sticky u horizontal) por página.
- El CTA primario nunca se retrasa por movimiento.
- Límite anti-doble-animación con `v2-scroll-motion.css` (ver MOTION-MAP.md).

Leyenda: **Sticky/Horizontal/Parallax** = `—` nada · `○` candidato · `●` propuesto.
**Text Motion**: `none | mask | words`. **3D**: lo consumirá Fase 7 vía `useScrollHandoff()`.

| Ruta | Intensidad | Receta principal | Sticky | Horizontal | Parallax | Text Motion | Futuro 3D | Objetivo narrativo |
|---|---|---|---|---|---|---|---|---|
| `/` | immersive | cinematic-stage + image-drift | ● | ○ | ● | mask | ○ | Entrada: el método se presenta como un recorrido espacial sereno |
| `/about` | balanced | editorial-reveal + image-drift | — | — | ○ | mask | — | La historia se lee con calma; la imagen da profundidad |
| `/programs` | balanced | data-cascade + editorial-slide | — | — | — | none | — | Los programas se comparan sin ruido; jerarquía de datos |
| `/parkour-academy` | immersive | cinematic-stage | ○ | ○ | ○ | mask | ○ | Pre-apertura con un momento narrativo que detiene el tiempo |
| `/plan/raiz` | quiet | editorial-reveal + quiet-transition | — | — | — | none | — | Decisión: lectura limpia, CTA sin retraso |
| `/plan/fuerza` | quiet | editorial-reveal + quiet-transition | — | — | — | none | — | Decisión: lectura limpia, CTA sin retraso |
| `/plan/rendimiento` | quiet | editorial-reveal + quiet-transition | — | — | — | none | — | Decisión: lectura limpia, CTA sin retraso |
| `/plan/elite` | quiet | editorial-reveal + quiet-transition | — | — | — | none | — | Decisión: lectura limpia, CTA sin retraso |
| `/shop` | balanced | data-cascade + compact-rail | — | — | — | none | — | Catálogo compacto; rails decorativos de ambiente |
| `/app` | balanced | editorial-slide + compact-rail | — | ○ | — | mask | — | La app se muestra como sistema en movimiento |
| `/community` | balanced | compact-rail + editorial-reveal | — | — | — | none | — | Voces en rail (patrón marquee ya presente); calidez |
| `/resources` | quiet | editorial-reveal + data-cascade | — | — | — | none | — | Recursos para leer y guardar; movimiento mínimo |
| `/faq` | quiet | editorial-reveal | — | — | — | none | — | Respuestas rápidas; nada compite con la lectura |
| `/checkout` | quiet | quiet-transition | — | — | — | none | — | Decisión final: máxima claridad, cero distracción |
| `/order-confirmation` | quiet | quiet-transition | — | — | — | none | — | Cierre sereno; confirmación sin teatro |
| `/onboarding` | balanced | editorial-slide + quiet-transition | — | — | — | mask | — | Umbral guiado: cada paso señala dirección y progreso |
| `/entrar` | quiet | quiet-transition | — | — | — | none | — | Acceso mínimo y directo |

**Interna (fuera de la matriz pública):** `/design-system` — playground que demuestra las
piezas (bloques 10–16); no forma parte del itinerario ni del sitemap.

---

### Cómo se usará esta matriz (Fase 6/8)
1. Elegir la fila de la ruta y traducirla a declaración de contrato:
   `resolvePageMotionContract({ intensity, sticky, horizontal, parallax, textMotion, zones, recipes })`.
2. Validar con `validatePageMotionContract()` (avisos de calma y presupuesto).
3. Comprobar el presupuesto de zonas con `checkBudget()`.
4. Verificar el límite anti-doble-animación con `v2-scroll-motion.css` antes de añadir JS.
5. Validar la pieza en `/design-system` antes de llevarla a la ruta pública.

*Clasificación: **NO VERIFICADO** como comportamiento — es un plano documental; su
aplicación real corresponde a fases posteriores y ahí se probará.*
