import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import About from './About.jsx'

vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag) => React.forwardRef(({ children, initial, whileInView, viewport, transition, ...props }, ref) => (
      React.createElement(tag, { ...props, ref }, children)
    )),
  }),
  AnimatePresence: ({ children }) => children,
  useReducedMotion: () => false,
  // Fase 8 (bloque G — StickyStage en la sección RECORRIDO): el mock debe
  // cubrir el contrato de hooks del engine (useSectionProgress consume
  // useScroll/useTransform). MotionValue mínimo.
  useScroll: () => ({
    scrollY: { get: () => 0, set: () => {}, on: () => () => {} },
    scrollYProgress: { get: () => 0, set: () => {}, on: () => () => {} },
  }),
  useTransform: () => ({ get: () => 0, set: () => {}, on: () => () => {} }),
  useMotionValue: () => ({ get: () => 0, set: () => {}, on: () => () => {} }),
  useMotionValueEvent: () => {},
}))

vi.mock('../components/Layout', () => ({
  PageHero: ({ title, kicker, children }) => (
    <section>
      <p>{kicker}</p>
      <h1>{title}</h1>
      {children}
    </section>
  ),
  SectionLabel: ({ children }) => <p>{children}</p>,
}))

vi.mock('../components/Globe3D.jsx', () => ({
  default: () => <div data-testid="globe-3d" />,
}))

// La página /about actual narra método, recorrido y valores sin inventar
// credenciales. Este contrato protege esa honestidad editorial.
describe('/about — historia, honestidad y conversión', () => {
  it('muestra el hero del método y el problema que resuelve BAYONA', () => {
    render(<MemoryRouter><About /></MemoryRouter>)

    expect(screen.getByText('BAYONA • SOBRE EL MÉTODO')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /MOVIMIENTO\. FORMACIÓN\.\s*MÉTODO\./i })).toBeInTheDocument()
    expect(screen.getByText('Entrenamiento, fuerza y nutrición organizados alrededor de tu punto de partida.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /UN PLAN SIRVE\s*CUANDO ENCAJA CONTIGO/i })).toBeInTheDocument()
    expect(screen.getByText('VALORAR ANTES DE PRESCRIBIR')).toBeInTheDocument()
    expect(screen.getByText('EXPLICAR ANTES DE EXIGIR')).toBeInTheDocument()
    expect(screen.getByText('REVISAR ANTES DE AJUSTAR')).toBeInTheDocument()
  })

  it('presenta la cronología y los cuatro valores sin inventar credenciales', () => {
    const { container } = render(<MemoryRouter><About /></MemoryRouter>)
    const copy = container.textContent

    expect(copy).toContain('2003')
    expect(copy).toContain('LA PRÁCTICA DEL PARKOUR')
    expect(copy).toContain('2019-2025')
    expect(copy).toContain('formación europea en preparación física')
    expect(copy).toContain('2026')
    for (const value of ['CRITERIO', 'RESPETO', 'EDUCACIÓN', 'RIGOR']) {
      expect(screen.getByText(value)).toBeInTheDocument()
    }

    // Sin métricas infladas ni marcas de catálogos anteriores.
    expect(copy).not.toMatch(/ESSA|\+1[.\s]?000|personas transformadas|casos de éxito|para siempre/i)
  })

  it('cierra con el método y CTAs verificables hacia planes y WhatsApp', () => {
    const { container } = render(<MemoryRouter><About /></MemoryRouter>)

    expect(screen.getByRole('heading', { name: /HISTORIAS\s*EN MOVIMIENTO/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /NO ES UNA RUTINA\.\s*ES UNA DECISIÓN TRAS OTRA\./i })).toBeInTheDocument()
    expect(container.textContent).toContain('ENTRENAR, REGISTRAR Y AJUSTAR. SIN PROMESAS VACÍAS.')

    expect(screen.getByRole('link', { name: /VER PLANES/i })).toHaveAttribute('href', '/programs')

    const call = screen.getByRole('link', { name: /HABLAR CON SEBASTIÁN/i })
    expect(call.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/34614988006\?text=/)
    expect(decodeURIComponent(call.getAttribute('href'))).toContain('quiero conocer mi camino con BAYONA')

    expect(container.textContent).toMatch(/No diagnostica, trata ni sustituye atención sanitaria\./)
  })
})
