// H-09.0-A: reproducción del riesgo de duplicación N×N en fallback móvil.
// Lee el build real (preview), cuenta artículos por página en 390px.
const { chromium } = require('playwright')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const routes = [
    ['/', '.mechanism-step--stage', 'pasos método', 3],
    ['/parkour-academy', '.academy-level--stage', 'niveles', 3],
    ['/about', '.about-timeline-entry--stage', 'etapas vida', 4],
  ]
  for (const [route, sel, label, expected] of routes) {
    await page.goto('http://127.0.0.1:4199' + route, { waitUntil: 'networkidle' })
    await page.locator(sel).first().waitFor({ state: 'attached', timeout: 15000 })
    const count = await page.locator(sel).count()
    // visibilidad de cada uno (los duplicados ocultos también cuentan para a11y)
    const visible = await page.locator(sel + ' >> visible=true').count()
    const h3s = await page.locator(sel + ' h3').count()
    console.log(`${route}: ${label} esperados=${expected} EN DOM=${count} visibles=${visible} h3 totales=${h3s} => ${count === expected ? 'OK' : 'DUPLICACIÓN ' + (count / expected) + 'x'}`)
  }
  await browser.close()
})()
