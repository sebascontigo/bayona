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

describe('/about — historia, honestidad y conversión', () => {
  it('muestra el hero y el problema con el copy aprobado', () => {
    render(<MemoryRouter><About /></MemoryRouter>)

    expect(screen.getByText('ESTÁNDARES EUROPEOS. PASIÓN LATINOAMERICANA. VISIÓN GLOBAL.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /NUESTRA\s*HISTORIA\./i })).toBeInTheDocument()
    expect(screen.getByText('Del movimiento a la ciencia. De la intuición al método. Una misión: ayudarte a avanzar.')).toBeInTheDocument()
    expect(screen.getByText(/empieza motivada, pero sin una dirección clara puede perderse o entrenar con miedo a lesionarse/i)).toBeInTheDocument()
  })

  it('presenta la cronología y los cuatro valores sin inventar credenciales', () => {
    const { container } = render(<MemoryRouter><About /></MemoryRouter>)
    const copy = container.textContent

    expect(copy).toContain('2003')
    expect(copy).toContain('ETAPA DE PARKOUR')
    expect(copy).toContain('2019–2025')
    expect(copy).toContain('gimnasios, clubes y contextos deportivos de Colombia')
    expect(copy).toContain('carrera tecnológica en entrenamiento personal y funcional')
    expect(copy).toContain('formación europea en preparación física')
    expect(copy).toContain('2026')
    expect(copy).toContain('salud, entrenamiento, recuperación y longevidad')
    expect(screen.getByText('CIENCIA')).toBeInTheDocument()
    expect(screen.getByText('RESPETO')).toBeInTheDocument()
    expect(screen.getByText('EDUCACIÓN')).toBeInTheDocument()
    expect(screen.getByText('EXCELENCIA')).toBeInTheDocument()

    expect(copy).not.toMatch(/ESSA|\+1[.\s]?000|personas transformadas|casos de éxito reales|clientes por país|para siempre|De Colombia al Mediterráneo/i)
  })

  it('integra el globo antes de la frase final y usa CTAs verificables', () => {
    const { container } = render(<MemoryRouter><About /></MemoryRouter>)
    const globe = screen.getByTestId('globe-3d')
    const quote = screen.getByText('No te doy una rutina más. Construimos un método que puedas entender y sostener.')

    expect(globe.compareDocumentPosition(quote) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.getByRole('link', { name: /conocer los programas/i })).toHaveAttribute('href', '/programs')

    const call = screen.getByRole('link', { name: /agendar una videollamada de 15 min/i })
    expect(call.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/34614988006\?text=/)
    expect(decodeURIComponent(call.getAttribute('href'))).toContain('para conocernos y resolver algunas dudas')
    expect(container.textContent).not.toMatch(/gratis|garantizad[ao]|casos de éxito/i)
  })
})
