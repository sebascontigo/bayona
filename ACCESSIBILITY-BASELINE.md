# ACCESSIBILITY-BASELINE — Baseline de accesibilidad

**Fase 1 (plan 1.28).** Chequeos estáticos + lint jsx-a11y + e2e de teclado en el
commit BASELINE. Sin herramientas de visión: lo que requiere inspección visual
(contraste, foco visible) queda registrado como pendiente, no inventado.

## 1. Lint jsx-a11y (ESLint 9 + eslint-plugin-jsx-a11y)

**0 errores, 2 warnings de accesibilidad** (de 18 warnings totales, ver BASELINE.md):

| Fichero | Regla | Problema |
|---|---|---|
| `src/components/VideoSection.jsx:71` | `jsx-a11y/media-has-caption` | El `<video>` no tiene `<track>` de subtítulos |
| ~~`src/components/RecommendationGuide.jsx:230`~~ | ~~`jsx-a11y/role-supports-aria-props`~~ | **RESUELTO en Fase 2 (2026-08-26):** `aria-invalid` se movió de cada radio al `fieldset role="radiogroup"` (rol que sí lo soporta), con `aria-labelledby` al legend. Warning eliminado; ver FASE2-CIERRE.md §2E |

Ambos son deuda real menor; se corrigen en las Fases 10/11 (no en la baseline).

## 2. Chequeos estáticos (verificados en el código)

| Chequeo | Resultado |
|---|---|
| `<html lang>` | `lang="es"` en index.html ✅ |
| Imágenes `<img>` con `alt` | **8/8**: 6 descriptivos (nombres/roles de testimonios, descripción de media) y 2 decorativos con `alt=""` intencional (miniaturas de carrito y comunidad con texto adyacente) ✅ |
| `aria-label` declarados | 276 usos en componentes JSX |
| H1 único por ruta | PROBABLE (análisis estático): `PageHero` renderiza `<h1>{title}</h1>`; Home/Resources/Shop usan `motion.h1` (ver SEO-BASELINE §5) |
| Skip link | CONFIRMADO por e2e: existe, es el primer foco tras Tab y lleva al contenido principal (test de teclado verde) |
| Anunciador de ruta | `RouteEffects`: `aria-live` anuncia el título de página y mueve el foco a `<main tabindex="-1">` en cada navegación SPA |
| `prefers-reduced-motion` | Arquitectura completa: `useCapabilities` degrada 3D y animaciones a estático; el spec de baseline visual emula `reducedMotion: reduce` |
| Fallback 3D accesible | `GlobeFallback` con `role="group"` + `aria-label` y el contenido en texto real |
| PWA/manifest | `manifest.webmanifest` con iconos 192/512 y maskable ✅ |

## 3. Brechas conocidas (trabajo registrado, no fallos de baseline)

1. **Menú móvil sin focus trap**: el panel de navegación móvil no implementa
   `role="dialog"` / `aria-modal` ni retiene el foco dentro al abrirse. Es la
   brecha a11y más importante; se corrige en las Fases 10/11 (Navbar).
2. **VideoSection sin subtítulos** (warning lint §1): el vídeo de la home no
   tiene alternativa textual ni track. Decidir en Fase 10 si se subtitula o se
   sustituye.
3. **Contraste y foco visible — NO VERIFICADO**: este agente opera sin visión.
   Pendiente de auditoría visual humana o herramienta tipo axe en CI (Fase 10).
4. **CustomCursor**: el cursor personalizado debe respetar `prefers-reduced-motion`
   y no interferir con el foco del sistema; además está duplicado (ver
   DESIGN-AUDIT.md). Se revisa al unificarlo.
5. ~~**`aria-invalid` mal aplicado** en el recomendador (§1)~~ — **resuelto en la
   Fase 2** (radiogroup + tests actualizados).

## 4. Disciplina acordada

- Ningún test de accesibilidad se salta (`test.skip` prohibido en todo el repo).
- Las correcciones a11y de las Fases 10/11 deben añadir o mantener tests
  (patrón existente: `e2e/*.spec.js` de teclado y los tests de RouteEffects).
- Objetivo de las fases de UI: cero warnings jsx-a11y al terminar la Fase 11.
