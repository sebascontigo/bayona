const { chromium } = require('@playwright/test')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto('http://127.0.0.1:4199/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /abrir menú/i }).click()
  await page.waitForTimeout(400)
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab')
    await page.waitForTimeout(40)
    const info = await page.evaluate(() => {
      const el = document.activeElement
      return {
        tag: el?.tagName,
        text: (el?.textContent || '').slice(0, 25),
        inHeader: !!el?.closest('header'),
        inMobileNav: !!el?.closest('.mobile-nav'),
      }
    })
    console.log(`Tab ${i + 1}:`, JSON.stringify(info))
  }
  await browser.close()
})()
