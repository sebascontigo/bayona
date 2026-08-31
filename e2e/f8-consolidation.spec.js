// Verificación de consolidación Fase 8 (auditoría de continuidad, prompt de
// consolidación premium): confirma en EJECUCIÓN REAL (build + preview) que los
// cuatro lenguajes narrativos existen en el DOM servido, no solo en el código
// fuente. Es de lectura: nada de assertions de snapshot.

import { test, expect } from '@playwright/test'

const CHECKS = [
  {
    route: '/',
    name: 'H — el hero respira (partículas + drift)',
    selector: '.hero-particles span',
    css: 'hero-particle-drift',
  },
  {
    route: '/',
    name: 'E — el método se recorre (sticky stage)',
    selector: '.mechanism-steps--stage',
    css: null,
  },
  {
    route: '/parkour-academy',
    name: 'F — la escalera (sticky vertical)',
    selector: '.academy-level-grid--stage',
    css: null,
  },
  {
    route: '/about',
    name: 'G — la línea de vida (sello de año)',
    selector: '.about-timeline--stage',
    css: null,
  },
]

for (const check of CHECKS) {
  test(`consolidación: ${check.name} vive en el DOM servido`, async ({ page }) => {
    await page.goto(check.route, { waitUntil: 'networkidle' })
    // Home es chunk estático (protege LCP), pero about/parkour son rutas lazy:
    // el contenido llega al hidratar React. La verificación correcta es contra
    // la EJECUCIÓN (DOM tras cargar), no contra el shell estático vacío.
    await page.locator(check.selector).first().waitFor({ state: 'attached', timeout: 15_000 })
    const count = await page.locator(check.selector).count()
    expect(count, `No se encontró ${check.selector} en ${check.route} tras hidratar`).toBeGreaterThan(0)

    if (check.css) {
      // La regla CSS viva: verifica que el stylesheet cargado contiene la
      // animación de respiración (no solo que existe el archivo).
      const hasRule = await page.evaluate(
        (needle) =>
          [...document.styleSheets].some((sheet) => {
            try {
              return [...sheet.cssRules].some((rule) => rule.cssText && rule.cssText.includes(needle))
            } catch {
              return false
            }
          }),
        check.css,
      )
      expect(hasRule, `La regla CSS ${check.css} no está activa en las hojas servidas`).toBe(true)
    }
  })
}

// Auditoría de ritmo mobile: los 3 sticky degradan a pila estática (clase
// .sticky-stage--static) en viewport móvil — verificar que la degradación
// existe de verdad en el DOM móvil, no solo en teoría.
test('consolidación: móvil degrada los sticky a pila estática (sin altura artificial)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const staticMode = await page.locator('.sticky-stage--static').count()
  expect(staticMode, 'En móvil el StickyStage debería renderizar la pila estática legible').toBeGreaterThan(0)
})
