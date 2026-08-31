// ¿Dónde ocurren los 2 escapes restantes del trap v2?
const { chromium } = require('@playwright/test')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto('http://127.0.0.1:4199/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /abrir menú/i }).click()
  await page.waitForTimeout(400)
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab')
    await page.waitForTimeout(35)
    const info = await page.evaluate(() => {
      const el = document.activeElement
      return { t: (el?.textContent || el?.getAttribute?.('aria-label') || el?.tagName || '').slice(0, 25), h: !!el?.closest('header') }
    })
    if (!info.h) console.log(`Tab ${i + 1} ESCAPA a:`, JSON.stringify(info))
  }
  await browser.close()
})()
