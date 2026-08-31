const { chromium } = require('@playwright/test')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto('http://127.0.0.1:4199/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /abrir menú/i }).click()
  await page.waitForTimeout(400)
  const info = await page.evaluate(() => {
    const nav = document.querySelector('.mobile-nav')
    const links = [...nav.querySelectorAll('a[href], button:not([disabled])')]
    const menuBtn = document.querySelector('.menu-button')
    const all = [...links, menuBtn]
    return {
      total: all.length,
      ultimo: links[links.length - 1]?.textContent?.slice(0, 30),
      ultimoEsMenuBtn: all[all.length - 1] === menuBtn,
      // posiciones DOM relativas
      navContainsBtn: nav.contains(menuBtn),
    }
  })
  console.log(JSON.stringify(info, null, 1))
  await browser.close()
})()
