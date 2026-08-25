import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { catalogItems } from '../config/shopCatalog.js'
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

describe('/shop — landing editorial y catálogo consultable', () => {
  it('explica el alcance honesto y no presenta claims comerciales o técnicos falsos', () => {
    const { container } = renderShop()
    const copy = container.textContent

    expect(screen.getByRole('heading', { name: /CATÁLOGO\s*BAYONA/i })).toBeInTheDocument()
    expect(screen.getByText(/funciona como catálogo editorial, no como tienda con inventario en tiempo real/i)).toBeInTheDocument()
    expect(screen.getAllByText('Sujeto a confirmación')).toHaveLength(catalogItems.length)
    expect(screen.getAllByText('Consulta disponibilidad por WhatsApp')).toHaveLength(catalogItems.length)
    expect(screen.getAllByText('Detalles técnicos por confirmar')).toHaveLength(catalogItems.length)

    expect(copy).not.toMatch(/\$\s?\d|€\s?\d|COP|comprar|añadir al carrito|pago|algodón|entrega en|garantía|certificad|reseñas|ventas|stock disponible|SSL|tarjeta/i)
  })

  it('usa enlaces WhatsApp específicos por artículo con el número y mensaje exigidos', () => {
    renderShop()
    const links = document.querySelectorAll('a[data-catalog-item]')

    expect(links).toHaveLength(catalogItems.length + 1)
    for (const link of links) {
      const item = catalogItems.find(({ id }) => id === link.dataset.catalogItem)
      const url = new URL(link.getAttribute('href'))
      const message = url.searchParams.get('text')

      expect(item).toBeDefined()
      expect(url.pathname).toBe('/34614988006')
      expect(message).toContain(item.name)
      expect(message).toMatch(/precio/i)
      expect(message).toMatch(/disponibilidad/i)
      expect(message).toMatch(/condiciones vigentes/i)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    }
  })

  it('permite filtrar y buscar con controles accesibles, y comunica resultados vacíos', () => {
    renderShop()

    const filterGroup = screen.getByRole('group', { name: /filtrar catálogo por categoría/i })
    const ropaFilter = within(filterGroup).getByRole('button', { name: 'Ropa' })
    fireEvent.click(ropaFilter)

    expect(ropaFilter).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('status', { name: '' })).toHaveTextContent('2 referencias')
    expect(screen.getByRole('heading', { name: 'Hoodie BAYONA' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Zapatillas MOVE' })).not.toBeInTheDocument()

    const search = screen.getByRole('searchbox', { name: /buscar por nombre/i })
    fireEvent.change(search, { target: { value: 'sin coincidencias' } })

    expect(screen.getByText('NO HAY COINCIDENCIAS.')).toBeInTheDocument()
    expect(screen.getByText(/prueba con otro nombre o selecciona una categoría distinta/i)).toBeInTheDocument()
  })

  it('mantiene jerarquía semántica de catálogo y fichas consultables', () => {
    renderShop()

    const catalog = screen.getByRole('heading', { name: /EXPLORA LA\s*SELECCIÓN/i }).closest('section')
    expect(catalog).toHaveAttribute('id', 'shop-catalog')
    expect(within(catalog).getByRole('list')).toBeInTheDocument()
    expect(within(catalog).getAllByRole('article')).toHaveLength(catalogItems.length)
    expect(screen.getByRole('link', { name: /explorar la selección/i })).toHaveAttribute('href', '#shop-catalog')
    expect(screen.getByRole('heading', { name: /TRES PASOS.*SIN CHECKOUT FICTICIO/i })).toBeInTheDocument()
  })
})
