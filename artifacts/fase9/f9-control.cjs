// Control de entorno: /programs (intocada por F8/F9) — LCP cold x3
const { chromium } = require('@playwright/test')
;(async () => {
  const results = []
  for (let i = 0; i < 3; i++) {
    const browser = await chromium.launch()
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    await page.addInitScript(() => {
      window.__lcp = null
      try {
        new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime }).observe({ type: 'largest-contentful-paint', buffered: true })
      } catch {}
    })
    await page.goto('http://127.0.0.1:4199/programs', { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)
    results.push(await page.evaluate(() => window.__lcp))
    await browser.close()
  }
  console.log('/programs COLD LCP x3:', results.map((r) => Math.round(r)))
  console.log('mediana:', Math.round(results.sort((a, b) => a - b)[1]))
})()
