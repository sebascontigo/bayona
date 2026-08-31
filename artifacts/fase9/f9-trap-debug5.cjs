// Inspección del momento exacto del escape: ¿por qué el handler no redirigió?
const { chromium } = require('@playwright/test')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto('http://127.0.0.1:4199/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /abrir menú/i }).click()
  await page.waitForTimeout(400)
  // instrumentar: log del activeElement en cada keydown ANTES del default
  await page.evaluate(() => {
    window.__trapLog = []
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const el = document.activeElement
        window.__trapLog.push({
          before: (el?.textContent || el?.tagName || '').slice(0, 20),
          inCycle: !!el?.closest('.mobile-nav') || el?.classList?.contains('menu-button'),
        })
      }
    }, true) // capture: corre antes que el listener del componente
  })
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    await page.waitForTimeout(35)
  }
  const log = await page.evaluate(() => window.__trapLog)
  log.forEach((l, i) => console.log(`keydown ${i + 1}: before=${l.before} inCycle=${l.inCycle}`))
  await browser.close()
})()
