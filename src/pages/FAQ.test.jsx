import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  COMMERCIAL_SCOPE_NOTICE,
  membershipPlans,
  programAudiences,
  sessionServices,
} from '../config/offerings.js'
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

const faqCss = readFileSync(resolve(process.cwd(), 'src/styles/faq.css'), 'utf8')

function renderPage() {
  return render(<MemoryRouter><FAQ /></MemoryRouter>)
}

function openAnswer(question) {
  const button = screen.getByRole('button', { name: question })
  if (button.getAttribute('aria-expanded') !== 'true') fireEvent.click(button)
  return screen.getByRole('region', { name: question })
}

afterEach(cleanup)

describe('/faq — preguntas frecuentes verificables', () => {
  it('identifica la página como FAQ / PREGUNTAS FRECUENTES y elimina la presencia global inventada', () => {
    const { container } = renderPage()

    expect(screen.getByRole('heading', { level: 1, name: 'FAQ / PREGUNTAS FRECUENTES' })).toBeInTheDocument()
    expect(screen.getByText(/estas respuestas reflejan la oferta comercial publicada/i)).toBeInTheDocument()
    expect(container.textContent).not.toMatch(/PRESENCIA GLOBAL|hub SALITRE|sin fronteras/i)
    expect(container.querySelector('.flags-row, .world-grid')).not.toBeInTheDocument()
  })

  it('deriva precios, prestaciones, edades y sesiones de Commercial_Config', () => {
    renderPage()

    const priceAnswer = openAnswer('¿Cuánto cuesta?')
    membershipPlans.forEach((plan) => {
      expect(priceAnswer).toHaveTextContent(`${plan.name}: ${plan.priceDisplay} ${plan.currency}`)
    })
    expect(priceAnswer).toHaveTextContent(/equivalencias en EUR son aproximadas y no contractuales/i)

    const benefitsAnswer = openAnswer('¿Qué incluye cada plan?')
    membershipPlans.forEach((plan) => {
      expect(benefitsAnswer).toHaveTextContent(plan.name)
      expect(benefitsAnswer).toHaveTextContent(plan.included[0])
    })

    const agesAnswer = openAnswer('¿Hay programas para niños?')
    programAudiences
      .filter((audience) => audience.id === 'ninos' || audience.id === 'jovenes')
      .forEach((audience) => expect(agesAnswer).toHaveTextContent(audience.detail))

    const sessionsAnswer = openAnswer('¿Hay clases presenciales?')
    sessionServices.forEach((service) => {
      expect(sessionsAnswer).toHaveTextContent(service.label)
      expect(sessionsAnswer).toHaveTextContent(service.priceDisplay)
    })
    expect(sessionsAnswer).toHaveTextContent(/sujetos a ubicación y disponibilidad/i)

    const healthAnswer = openAnswer('¿Es apto si tengo una lesión?')
    expect(healthAnswer).toHaveTextContent(COMMERCIAL_SCOPE_NOTICE)
  })

  it('expone como no publicadas las condiciones no respaldadas y evita claims positivos', () => {
    renderPage()

    expect(openAnswer('¿Qué métodos de pago aceptáis?')).toHaveTextContent(/no especifica medios de pago/i)
    expect(openAnswer('¿Hay descuentos para familias?')).toHaveTextContent(/no incluye descuentos familiares/i)
    expect(openAnswer('¿Hay permanencia?')).toHaveTextContent(/no especifica permanencia, pausas ni cancelaciones/i)
    expect(openAnswer('¿La app funciona en iOS y Android?')).toHaveTextContent(/no se publica disponibilidad operativa/i)
    expect(openAnswer('¿Puedo regalar una membresía?')).toHaveTextContent(/no define tarjetas regalo/i)

    const answerCopy = screen.getByRole('region', { name: '¿Puedo regalar una membresía?' }).textContent
    expect(answerCopy).not.toMatch(/prepararemos|regalo confirmado/i)
    expect(document.body.textContent).not.toMatch(/WhatsApp Pay|respuesta en 24 horas|acceso garantizado/i)
  })

  it('implementa un acordeón accesible con estado, relación y foco semánticos', () => {
    renderPage()

    const firstQuestion = screen.getByRole('button', { name: '¿Necesito experiencia previa?' })
    const controlledAnswer = firstQuestion.getAttribute('aria-controls')

    expect(firstQuestion).toHaveAttribute('type', 'button')
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById(controlledAnswer)).toHaveAttribute('role', 'region')
    expect(document.getElementById(controlledAnswer)).toHaveAttribute('aria-labelledby', firstQuestion.id)

    fireEvent.click(firstQuestion)
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById(controlledAnswer)).not.toBeInTheDocument()

    const secondQuestion = screen.getByRole('button', { name: '¿Hay programas para niños?' })
    fireEvent.click(secondQuestion)
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('region', { name: '¿Hay programas para niños?' })).toBeInTheDocument()
  })

  it('diferencia videollamada informativa, consulta rápida y Empieza Gratis sin promesas', () => {
    renderPage()

    const videoCall = screen.getByRole('link', { name: /solicitar videollamada/i })
    const videoUrl = new URL(videoCall.getAttribute('href'))
    const videoMessage = videoUrl.searchParams.get('text')
    expect(videoUrl.origin).toBe('https://wa.me')
    expect(videoUrl.pathname).toBe('/34614988006')
    expect(videoMessage).toMatch(/solicitar información para coordinar una videollamada informativa/i)
    expect(videoMessage).toMatch(/disponibilidad deben confirmarse/i)
    expect(videoMessage).not.toMatch(/cita confirmada|disponibilidad garantizada/i)

    const quickQuestion = screen.getByRole('link', { name: /abrir WhatsApp/i })
    const quickUrl = new URL(quickQuestion.getAttribute('href'))
    expect(quickUrl.origin).toBe('https://wa.me')
    expect(quickUrl.pathname).toBe('/34614988006')
    expect(quickUrl.searchParams.get('text')).toMatch(/consulta concreta sobre la oferta publicada/i)

    expect(screen.getByText(/“Rápida” describe la consulta, no promete tiempo de respuesta/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'EMPIEZA GRATIS' })).toHaveAttribute('href', '/resources')
    expect(screen.getByText(/ningún canal confirma una cita, disponibilidad ni un plazo de respuesta/i)).toBeInTheDocument()
  })

  it('incluye contratos visuales responsive, de foco y movimiento reducido', () => {
    expect(faqCss).toMatch(/min-height:\s*48px/)
    expect(faqCss).toMatch(/:focus-visible/)
    expect(faqCss).toMatch(/@media\s*\(max-width:\s*680px\)/)
    expect(faqCss).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
    expect(faqCss).toMatch(/animation:\s*none\s*!important/)
  })
})
