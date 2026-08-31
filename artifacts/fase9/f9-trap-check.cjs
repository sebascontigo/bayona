// H-09.0-B: verificar focus trap del menú móvil en ejecución real.
const { chromium } = require('@playwright/test')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto('http://127.0.0.1:4199/', { waitUntil: 'networkidle' })

  const menuButton = page.getByRole('button', { name: /abrir menú/i })
  await menuButton.click()
  await page.waitForTimeout(400)

  // ¿Todos los focos permanecen dentro del header mientras navegamos con Tab?
  let escapes = 0
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab')
    await page.waitForTimeout(30)
    const inHeader = await page.evaluate(() => !!document.activeElement?.closest('header'))
    if (!inHeader) escapes++
  }
  // Escape cierra y devuelve el foco al botón
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
  const focusRestored = await page.evaluate(() => {
    const btn = document.querySelector('.menu-button')
    return document.activeElement === btn
  })
  console.log(`Tab×25: escapes del header=${escapes} (esperado 0)`)
  console.log(`Escape restaura foco al botón: ${focusRestored}`)
  console.log(escapes === 0 && focusRestored ? 'TRAP OK' : 'TRAP FALLA')
  await browser.close()
})()
