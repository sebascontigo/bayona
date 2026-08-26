import React from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildWhatsAppUrl, membershipPlans } from '../config/offerings.js'
import { questionCategories } from '../config/faqContent.js'
import FAQ from './FAQ.jsx'

vi.mock('framer-motion', () => {
  const ignoredProps = new Set(['initial', 'animate', 'exit', 'transition', 'layout'])
  const component = (tag) => React.forwardRef(({ children, ...props }, ref) => {
    const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !ignoredProps.has(key)))
    return React.createElement(tag, { ...domProps, ref }, children)
  })

  const motion = new Proxy({}, {
    get: (_, tag) => (tag === 'create'
      ? (BaseComponent) => component(BaseComponent)
      : component(tag)),
  })

  return {
    AnimatePresence: ({ children }) => children,
    motion,
    useReducedMotion: () => false,
  }
})

function renderPage() {
  return render(<MemoryRouter><FAQ /></MemoryRouter>)
}

afterEach(cleanup)

// La página de FAQ se sostiene en dos fuentes: el catálogo comercial
// (membershipPlans) y faqContent. Este contrato impide que precios o
// preguntas vuelvan a hardcodearse a mano.
describe('/faq — preguntas frecuentes verificables', () => {
  it('identifica la página como FAQ / PREGUNTAS FRECUENTES con un único h1', () => {
    renderPage()

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveAttribute('aria-label', 'FAQ / PREGUNTAS FRECUENTES')
  })

  it('publica exactamente los cuatro planes y equivalencias desde Commercial_Config', () => {
    const { container } = renderPage()

    // La tabla de precios vive dentro de la respuesta "¿Cuánto cuesta?".
    fireEvent.click(screen.getByRole('button', { name: /¿Cuánto cuesta\?/ }))
    const pricing = container.querySelector('[aria-label="Opciones y precios mensuales BAYONA"]')
    expect(pricing).not.toBeNull()
    for (const plan of membershipPlans) {
      expect(within(pricing).getByText(plan.name)).toBeInTheDocument()
      expect(within(pricing).getByText(plan.priceDisplay)).toBeInTheDocument()
      expect(pricing.querySelector(`[aria-label="Equivalencias aproximadas de ${plan.name}"]`))
        .toHaveTextContent(plan.eur)
    }
    expect(within(pricing).getAllByRole('article')).toHaveLength(membershipPlans.length)
    expect(within(pricing).getByText(/Equivalencias aproximadas\. Confirma importe, disponibilidad y condiciones vigentes antes de pagar\./i)).toBeInTheDocument()
  })

  it('deriva las preguntas de faqContent y permite desplegar respuestas', () => {
    const { container } = renderPage()

    const totalQuestions = questionCategories.reduce(
      (sum, category) => sum + category.questions.length,
      0,
    )

    const toggles = [...container.querySelectorAll('button[aria-expanded]')]
    expect(toggles.length).toBeGreaterThanOrEqual(totalQuestions)

    const firstToggle = toggles[0]
    const wasOpen = firstToggle.getAttribute('aria-expanded') === 'true'
    fireEvent.click(firstToggle)
    expect(firstToggle).toHaveAttribute('aria-expanded', String(!wasOpen))
  })

  it('ofrece tres salidas honestas: videollamada, pregunta concreta y recursos gratuitos', () => {
    renderPage()

    const videoLink = screen.getByRole('link', { name: /SOLICITAR VIDEOLLAMADA/i })
    expect(videoLink).toHaveAttribute(
      'href',
      buildWhatsAppUrl('Hola BAYONA, quiero coordinar una videollamada informativa de 15 minutos con Sebastián.\n¿Qué disponibilidad tenéis?'),
    )

    const quickLink = screen.getByRole('link', { name: /CONSULTAR POR WHATSAPP/i })
    expect(quickLink).toHaveAttribute(
      'href',
      buildWhatsAppUrl('Hola BAYONA, tengo una pregunta concreta sobre los programas y servicios.\n¿Podéis ayudarme?'),
    )

    expect(screen.getByRole('link', { name: /VER RECURSOS/i })).toHaveAttribute('href', '/resources')
    expect(document.body.textContent).not.toMatch(/garantizamos|resultados asegurados/i)
  })
})
