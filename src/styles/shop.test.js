import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(resolve(process.cwd(), 'src/styles/shop.css'), 'utf8')

describe('/shop — contrato visual responsive y accesible', () => {
  it('es mobile-first y amplía el catálogo de forma asimétrica en tablet y escritorio', () => {
    expect(css).toMatch(/\.shop-catalog-list\s*{[^}]*grid-template-columns:\s*1fr/s)
    expect(css).toMatch(/@media\s*\(min-width:\s*700px\)/)
    expect(css).toMatch(/grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/)
    expect(css).toMatch(/@media\s*\(min-width:\s*1040px\)/)
    expect(css).toMatch(/\.shop-catalog-list\s*>\s*li:nth-child\(1\)[\s\S]*grid-column:\s*span\s*7/)
  })

  it('incluye foco visible, controles táctiles y reducción de movimiento', () => {
    expect(css).toMatch(/min-height:\s*48px/)
    expect(css).toMatch(/:focus-visible/)
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
    expect(css).toContain('#050505')
    expect(css).toContain('#f4a261')
    expect(css).not.toMatch(/border-radius:\s*(?!0(?:[;\s]|$))\d/)
  })
})
