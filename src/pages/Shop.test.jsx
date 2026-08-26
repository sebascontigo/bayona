import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCartStore } from '../store/cartStore.js'
import { shopProducts } from '../config/shopProducts.js'
import Shop from './Shop.jsx'

vi.mock('framer-motion', () => {
  const ignoredProps = new Set(['initial', 'animate', 'exit', 'variants', 'whileInView', 'viewport', 'transition', 'whileHover', 'whileTap'])
  const component = (tag) => React.forwardRef(({ children, ...props }, ref) => {
    const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !ignoredProps.has(key)))
    return React.createElement(tag, { ...domProps, ref }, children)
  })

  return {
    motion: new Proxy({}, { get: (_, tag) => component(tag) }),
    AnimatePresence: ({ children }) => children,
    useReducedMotion: () => false,
  }
})

vi.mock('../components/Layout', () => ({
  PageHero: ({ title, kicker, children }) => <section><p>{kicker}</p><h1>{title}</h1>{children}</section>,
  SectionLabel: ({ children }) => <p>{children}</p>,
}))

vi.mock('../engine/hooks/useCapabilities.js', () => ({
  useCapabilities: () => ({ reducedMotion: false, mode: 'desktop' }),
}))

function renderShop() {
  return render(<MemoryRouter><Shop /></MemoryRouter>)
}

beforeEach(() => {
  useCartStore.getState().clear()
  useCartStore.getState().setOpen(false)
})

// La tienda es un catálogo editorial consultable (sin pagos ni inventario).
// Este contrato protege su estructura real y sus salidas verificables.
describe('/shop — landing editorial y catálogo consultable', () => {
  it('presenta hero, colecciones y catálogo sin claims médicos ni de pago', () => {
    const { container } = renderShop()
    const copy = container.textContent

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /CUATRO CAMINOS/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ENCUENTRA LO\s*QUE TE REPRESENTA/i })).toBeInTheDocument()

    // Catálogo editorial: nada de diagnóstico médico ni promesas de resultado.
    expect(copy).not.toMatch(/diagn[oó]stico|cura garantizada|resultados asegurados|pago seguro/i)
  })

  it('expone un enlace WhatsApp propio por producto con el número oficial', () => {
    renderShop()

    const productLinks = [...document.querySelectorAll('a[data-shop-product]')]
    // El producto destacado aparece dos veces (colección + catálogo): los
    // identificadores únicos deben cubrir el catálogo completo.
    expect(new Set(productLinks.map((link) => link.dataset.shopProduct)).size)
      .toBe(shopProducts.length)

    for (const link of productLinks) {
      const url = new URL(link.getAttribute('href'))
      expect(url.origin).toBe('https://wa.me')
      expect(url.pathname).toBe('/34614988006')
      expect(url.searchParams.get('text').length).toBeGreaterThan(0)
    }
  })

  it('permite filtrar por categoría y buscar, comunicando el estado vacío', () => {
    renderShop()

    expect(screen.getByRole('group', { name: 'Por categoría' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Por colección' })).toBeInTheDocument()

    const search = screen.getByRole('searchbox', { name: 'Buscar producto' })
    fireEvent.change(search, { target: { value: 'zzz-sin-coincidencias' } })

    const emptyState = screen.getByRole('status')
    expect(emptyState).toHaveTextContent('NO ENCONTRAMOS ESA PIEZA.')
    fireEvent.click(within(emptyState).getByRole('button', { name: new RegExp(`VER LOS ${shopProducts.length} PRODUCTOS`, 'i') }))
    expect(screen.queryByText('NO ENCONTRAMOS ESA PIEZA.')).not.toBeInTheDocument()
  })

  it('añade productos al carrito con su variante y abre el carrito', () => {
    renderShop()

    const addButtons = screen.getAllByRole('button', { name: /^Añadir .+ al carrito$/i })
    expect(addButtons.length).toBeGreaterThan(0)
    fireEvent.click(addButtons[0])

    const state = useCartStore.getState()
    expect(state.items).toHaveLength(1)
    expect(state.isOpen).toBe(true)
  })
})
