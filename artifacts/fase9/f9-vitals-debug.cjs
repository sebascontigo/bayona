// LCP laboratorio: ¿qué elemento es el LCP en /? ¿cambió el candidate?
const { chromium } = require('@playwright/test')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.addInitScript(() => {
    window.__lcpEl = null
    try {
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__lcpEl = e.element?.tagName + ':' + (e.element?.className || e.element?.id || '')
      }).observe({ type: 'largest-contentful-paint', buffered: true })
    } catch {}
  })
  // 2 corridas en la misma sesión (warm)
  for (let round = 0; round < 2; round++) {
    await page.goto('http://127.0.0.1:4199/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    const el = await page.evaluate(() => window.__lcpEl)
    const nav = await page.evaluate(() => {
      const [n] = performance.getEntriesByType('navigation')
      return n ? { dcl: round(n.domContentLoadedEventEnd), load: round(n.loadEventEnd) } : null
      function round(x) { return Math.round(x) }
    })
    console.log(`round ${round + 1}: LCP-el=${el} DCL=${nav?.dcl}ms load=${nav?.load}ms`)
  }
  await browser.close()
})()
