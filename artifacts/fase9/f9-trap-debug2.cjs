const { chromium } = require('@playwright/test')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto('http://127.0.0.1:4199/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /abrir menú/i }).click()
  await page.waitForTimeout(400)
  // recorrer TODOS los tabs (el menu tiene ~12 links + cta + cart + brand...)
  let lastInHeader = 0
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab')
    await page.waitForTimeout(35)
    const info = await page.evaluate(() => {
      const el = document.activeElement
      return {
        t: (el?.textContent || el?.getAttribute?.('aria-label') || el?.tagName || '').slice(0, 28),
        h: !!el?.closest('header'),
      }
    })
    if (!info.h && lastInHeader === i - 1) console.log(`>>> PRIMER ESCAPE en Tab ${i + 1}:`, JSON.stringify(info))
    if (info.h) lastInHeader = i
  }
  console.log('ultimo Tab dentro del header:', lastInHeader + 1)
  await browser.close()
})()
