import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Footer, Navbar } from './Layout.jsx'
import { ROUTE_ALIASES, ROUTE_META } from '../lib/seo/routeMeta.js'

/**
 * Fase 4: contrato de la arquitectura de navegación.
 *
 * Fija en tests las decisiones D1/D2/D10:
 * · La barra declara la estructura real del sitio en cuatro grupos por
 *   intención (ENTRENAR / EXPERIENCIAS / CONOCER / APRENDER).
 * · El CTA de la barra lleva a recepción (/onboarding), no a comprar.
 * · El menú móvil numera todos los destinos y remata con la entrada.
 * · El pie repite la arquitectura de grupos + bloque de entrada con WhatsApp.
 * · Todo destino de la navegación existe en el registro de rutas (routeMeta):
 *   la navegación nunca apunta a una ruta muerta.
 */
const KNOWN_ROUTES = new Set([...Object.keys(ROUTE_META), ...Object.keys(ROUTE_ALIASES)])
const GROUP_LABELS = ['ENTRENAR', 'EXPERIENCIAS', 'CONOCER', 'APRENDER']

describe('Navbar — arquitectura de navegación (Fase 4)', () => {
  it('organiza la navegación de escritorio en los cuatro grupos por intención', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)

    const nav = screen.getByRole('navigation', { name: 'Navegación principal' })
    GROUP_LABELS.forEach((label) => {
      expect(within(nav).getByRole('group', { name: label })).toBeInTheDocument()
    })

    // La oferta de entrenamiento vive en ENTRENAR.
    const entrenar = within(nav).getByRole('group', { name: 'ENTRENAR' })
    expect(within(entrenar).getByRole('link', { name: 'Programas' })).toHaveAttribute('href', '/programs')
    expect(within(entrenar).getByRole('link', { name: 'Academia Parkour' })).toHaveAttribute('href', '/parkour-academy')
  })

  it('cada destino de la navegación existe en el registro de rutas', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)

    const nav = screen.getByRole('navigation', { name: 'Navegación principal' })
    const links = within(nav).getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(8)

    links.forEach((link) => {
      expect(KNOWN_ROUTES.has(link.getAttribute('href'))).toBe(true)
    })
  })

  it('el CTA de la barra orienta hacia recepción, no hacia la compra', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)

    const cta = screen.getByRole('link', { name: 'Entrar a BAYONA: recepción y orientación' })
    expect(cta).toHaveAttribute('href', '/onboarding')
    expect(cta).toHaveTextContent('Entrar')
  })

  it('el menú móvil numera los destinos, muestra los grupos y remata con la entrada', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)

    fireEvent.click(screen.getByRole('button', { name: 'Abrir menú' }))

    const mobile = screen.getByRole('navigation', { name: 'Navegación móvil' })
    // Inicio explícito en móvil (en escritorio lo cubre la marca). El número
    // decorativo es aria-hidden: el nombre accesible es solo el destino.
    expect(within(mobile).getByRole('link', { name: /^inicio$/i })).toHaveAttribute('href', '/')
    expect(within(mobile).getByText('01', { selector: 'span[aria-hidden="true"]' })).toBeInTheDocument()
    // Las etiquetas de grupo separan visualmente los destinos.
    GROUP_LABELS.forEach((label) => {
      expect(within(mobile).getByText(label, { selector: '.mobile-nav-group-label' })).toBeInTheDocument()
    })
    // La entrada cierra el menú y apunta a recepción.
    const entry = within(mobile).getByRole('link', { name: /entrar a bayona/i })
    expect(entry).toHaveAttribute('href', '/onboarding')
    // Todos los destinos del menú móvil son rutas reales.
    within(mobile).getAllByRole('link').forEach((link) => {
      expect(KNOWN_ROUTES.has(link.getAttribute('href'))).toBe(true)
    })
  })
})

describe('Footer — arquitectura de navegación (Fase 4)', () => {
  it('repite los cuatro grupos y añade el bloque de entrada con recepción y WhatsApp', () => {
    render(<MemoryRouter><Footer /></MemoryRouter>)

    GROUP_LABELS.forEach((label) => {
      expect(screen.getByRole('navigation', { name: `Pie de página: ${label}` })).toBeInTheDocument()
    })

    const entry = screen.getByText('ENTRAR A BAYONA').closest('a')
    expect(entry).toHaveAttribute('href', '/onboarding')

    const whatsapp = screen.getByRole('link', { name: /hablar por whatsapp/i })
    const url = new URL(whatsapp.href)
    expect(url.origin).toBe('https://wa.me')
    expect(url.pathname).toBe('/34614988006')
  })

  it('cada destino del pie existe en el registro de rutas', () => {
    render(<MemoryRouter><Footer /></MemoryRouter>)

    const columns = GROUP_LABELS.flatMap((label) => (
      within(screen.getByRole('navigation', { name: `Pie de página: ${label}` })).getAllByRole('link')
    ))
    expect(columns.length).toBeGreaterThanOrEqual(8)

    columns.forEach((link) => {
      expect(KNOWN_ROUTES.has(link.getAttribute('href'))).toBe(true)
    })
  })
})
