import React from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import {
  HOME_EVIDENCE_CONTEXT,
  homeContentModel,
  membershipPlanEditorialProjection,
} from '../config/conversionContent.js'
import {
  calculateExperience,
  membershipPlans,
  sessionServices,
} from '../config/offerings.js'
import {
  draftEvidenceFixture,
  verifiedEvidenceFixture,
} from '../lib/conversion/evidence.testFixtures.js'
import Home, { HomeProofSection } from './Home.jsx'

vi.mock('framer-motion', () => {
  const ignoredProps = new Set(['initial', 'animate', 'exit', 'variants', 'whileInView', 'viewport', 'transition', 'whileHover', 'whileTap'])
  const component = (tag) => React.forwardRef(({ children, ...props }, ref) => {
    const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !ignoredProps.has(key)))
    return React.createElement(tag, { ...domProps, ref }, children)
  })

  // Fase 8 (prototipo E — StickyStage en la sección MÉTODO): el mock debe
  // cubrir el contrato de hooks del engine (useSectionProgress consume
  // useScroll/useTransform). MotionValue mínimo, mismo patrón que el setup.
  const motionValue = () => ({
    get: () => 0,
    set: vi.fn(),
    on: vi.fn(() => () => {}),
  })

  return {
    animate: vi.fn(() => ({ stop: vi.fn() })),
    useInView: vi.fn(() => false),
    useReducedMotion: vi.fn(() => false),
    useScroll: vi.fn(() => ({ scrollY: motionValue(), scrollYProgress: motionValue() })),
    useTransform: vi.fn(() => motionValue()),
    transform: vi.fn(),
    useMotionValue: motionValue,
    useMotionValueEvent: vi.fn(),
    motion: new Proxy({}, { get: (_, tag) => component(tag) }),
  }
})

vi.mock('../components/Layout', async () => {
  const { Link } = await import('react-router-dom')
  return {
    GoldButton: ({ children, to, className = '' }) => <Link className={`gold-button ${className}`.trim()} to={to}>{children}</Link>,
    SectionLabel: ({ children }) => <p>{children}</p>,
  }
})

afterEach(cleanup)

function renderHome() {
  return render(<MemoryRouter><Home /></MemoryRouter>)
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function expectAnimatedTotal(summary, calculation) {
  const count = summary.querySelector('.persistent-summary-count')

  expect(summary).toHaveAttribute('data-total-cop', String(calculation.totalCop))
  expect(count).toHaveTextContent('0')
  expect(count).toHaveAttribute('aria-label', calculation.totalDisplay)
}

describe('Home — narrativa premium y contenido crítico', () => {
  it('presenta un único h1, una escena full-bleed y soporte DOM sin canvas', () => {
    const { container } = renderHome()
    const hero = container.querySelector('.hero-module')

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', {
      level: 1,
      name: homeContentModel.h1,
    })).toBeInTheDocument()
    expect(within(hero).getByText((_, element) => (
      element?.classList.contains('hero-kicker')
      && element.textContent === 'BAYONA · NO ES MOTIVACIÓN · ES ESTRUCTURA'
    ))).toBeInTheDocument()
    expect(within(hero).getByText(/Entrena con dirección, seguimiento real y una estructura que cabe en tu vida\./i)).toBeInTheDocument()
    expect(hero).toHaveAttribute('data-media-key')
    expect(container.querySelector('canvas')).toBeNull()
    expect(container.querySelector('.hero-3d-scene, .hero-canvas, .hero-orbits')).toBeNull()
    expect(container.querySelector('.hero-aurora')).not.toBeNull()
    expect(container.querySelectorAll('.hero-particles > span')).toHaveLength(6)
  })

  it('convierte los 90 días en una escena aspiracional semántica y verificable', () => {
    const { container } = renderHome()
    const visionBlock = homeContentModel.blocks.find(({ id }) => id === 'home-vision')
    const vision = container.querySelector('[data-content-block="home-vision"]')
    const count = vision.querySelector('.vision-90-count')

    expect(vision).toHaveAttribute('data-content-stage', 'vision')
    expect(vision).toHaveAttribute('data-content-placement', 'prelude')
    expect(vision).toHaveAttribute('data-media-key')
    expect(within(vision).getByRole('heading', {
      level: 2,
      name: visionBlock.heading,
    })).toBeInTheDocument()
    expect(within(vision).getByText(visionBlock.body)).toBeInTheDocument()
    expect(within(vision).getByRole('list', {
      name: 'Hábitos de trabajo durante 90 días',
    })).toBeInTheDocument()
    expect(within(vision).getAllByRole('listitem')).toHaveLength(visionBlock.items.length)
    expect(count).toHaveTextContent('0')
    expect(count).toHaveAttribute('aria-label', '90')
    expect(container.querySelector('[data-static-fallback="dom"], .narrative-hero-visual')).toBeNull()
  })

  it('ofrece destinos reales desde el hero y continúa el funnel hacia Nosotros', () => {
    const { container } = renderHome()
    const heroNavigation = screen.getByRole('navigation', {
      name: 'Explorar los programas BAYONA',
    })

    expect(within(heroNavigation).getAllByRole('link')).toHaveLength(3)
    expect(within(heroNavigation).getByRole('link', {
      name: 'VER PLANES',
    })).toHaveAttribute('href', '/programs')
    expect(within(heroNavigation).getByRole('link', {
      name: /IR DIRECTO A LA DECISIÓN/i,
    })).toHaveAttribute('href', '#home-offer-heading')
    expect(container.querySelector('#problemas')).toHaveAttribute(
      'aria-labelledby',
      'transformation-heading',
    )
    expect(screen.getByRole('link', { name: /CONOCER LA HISTORIA/i })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: /COMPARAR PROGRAMAS/i })).toHaveAttribute('href', '/programs')
  })

  it('presenta el diagnóstico editorial sin imágenes encajonadas y conserva el límite sanitario', () => {
    const { container } = renderHome()
    const problemBlock = homeContentModel.blocks.find(({ id }) => id === 'home-problem')
    const problemSection = container.querySelector('[data-content-block="home-problem"]')

    expect(within(problemSection).getByRole('heading', {
      level: 2,
      name: problemBlock.heading,
    })).toBeInTheDocument()
    expect(within(problemSection).getByText(problemBlock.body)).toBeInTheDocument()
    expect(within(problemSection).getAllByRole('listitem')).toHaveLength(problemBlock.items.length)
    problemBlock.items.forEach(({ title, body }) => {
      expect(within(problemSection).getByRole('heading', { level: 3, name: title })).toBeInTheDocument()
      expect(within(problemSection).getByText(body)).toBeInTheDocument()
    })
    expect(within(problemSection).getByText(/consulta a un profesional.*Esto es método, no medicina/i)).toBeInTheDocument()
    expect(problemSection.querySelector('img')).toBeNull()
  })

  it('declara la escena de 90 días como prólogo sin alterar el flujo canónico del modelo', () => {
    const { container } = renderHome()
    const narrativeSections = [...container.querySelectorAll('section[data-content-stage]')]

    expect(homeContentModel.blocks.map(({ stage }) => stage)).toEqual([
      'problem',
      'vision',
      'mechanism',
      'mechanism',
      'proof',
      'proof',
      'offer',
      'action',
    ])
    expect(narrativeSections.slice(0, 3).map(({ dataset }) => dataset.contentBlock)).toEqual([
      'home-vision',
      'home-problem',
      'home-mechanism',
    ])
    expect(narrativeSections[0]).toHaveAttribute('data-content-placement', 'prelude')
  })

  it('expone el método actual con tres pasos y un límite profesional no vacío', () => {
    const { container } = renderHome()
    const mechanismBlock = homeContentModel.blocks.find(({ id }) => id === 'home-mechanism')
    const mechanismSection = container.querySelector('[data-content-block="home-mechanism"]')
    // Fase 8 (prototipo E): los pasos dejaron de ser <ol>/<li> (lista) y son
    // <article class="mechanism-step"> dentro del escenario StickyStage. En el
    // fallback estático (jsdom/móvil) cada frame apila su copia de los pasos:
    // el contrato exige que cada TÍTULO exista (allBy), que los artículos con
    // contenido existan y que el límite profesional siga. Mismos 3 pasos.
    const stepTitles = mechanismBlock.items.map(({ title }) =>
      within(mechanismSection).getAllByRole('heading', { level: 3, name: title }),
    )

    expect(within(mechanismSection).getByRole('heading', {
      level: 2,
      name: mechanismBlock.heading,
    })).toBeInTheDocument()
    expect(within(mechanismSection).getByText(mechanismBlock.body)).toBeInTheDocument()
    expect(stepTitles).toHaveLength(mechanismBlock.items.length)
    stepTitles.forEach((matches) => {
      // Cada paso existe al menos una vez en el DOM del fallback.
      expect(matches.length).toBeGreaterThan(0)
    })
    expect(within(mechanismSection).getByRole('complementary', {
      name: 'Límite profesional',
    })).toHaveTextContent(mechanismBlock.boundary)
    expect(mechanismBlock.boundary).toMatch(/marco no médico.*no diagnostica, trata ni sustituye/i)
  })

  it('presenta beneficios en una única columna lógica sin garantías ni imágenes por tarjeta', () => {
    const { container } = renderHome()
    const benefitsBlock = homeContentModel.blocks.find(({ id }) => id === 'home-process-benefits')
    const benefitsSection = container.querySelector('[data-content-block="home-process-benefits"]')
    const benefits = within(benefitsSection).getAllByRole('listitem')

    expect(within(benefitsSection).getByRole('heading', {
      level: 2,
      name: benefitsBlock.heading,
    })).toBeInTheDocument()
    expect(within(benefitsSection).getByText(benefitsBlock.body)).toBeInTheDocument()
    expect(benefits.map((benefit) => benefit.querySelector('.pillar-number')?.textContent)).toEqual(['01', '02', '03'])
    expect(benefits.map((benefit) => within(benefit).getByRole('heading', { level: 3 }).textContent)).toEqual(
      benefitsBlock.items.map(({ title }) => title),
    )
    expect(benefits.every((benefit) => (
      benefit.dataset.markerColumn === 'inline-start'
      && benefit.firstElementChild?.classList.contains('pillar-number')
      && !benefit.classList.contains('pillar-item-reverse')
    ))).toBe(true)
    expect(benefitsSection.querySelector('img')).toBeNull()
    expect(benefitsSection).not.toHaveTextContent(/garantizamos|resultado asegurado|transformación garantizada/i)
  })

  it('mantiene Evidence_Gate cerrado y publica solo proceso cuando no hay evidencia', () => {
    const { container } = renderHome()
    const processFallback = homeContentModel.blocks.find(({ id }) => id === 'home-process-fallback')
    const proofSection = container.querySelector('[data-evidence-gate="empty"]')

    expect(proofSection).toHaveAttribute('data-content-block', processFallback.id)
    expect(within(proofSection).getByRole('heading', {
      level: 2,
      name: processFallback.heading,
    })).toBeInTheDocument()
    expect(within(proofSection).getByRole('list', {
      name: 'Proceso verificable de BAYONA',
    })).toBeInTheDocument()
    expect(within(proofSection).getAllByRole('listitem')).toHaveLength(processFallback.items.length)
    processFallback.items.forEach(({ title }) => {
      expect(within(proofSection).getByRole('heading', { level: 3, name: title })).toBeInTheDocument()
    })
    expect(proofSection.querySelector('.evidence-list, [data-evidence-slot], .evidence-slot')).toBeNull()
    expect(proofSection).not.toHaveTextContent(/formación europea|estándares europeos|\+8|testimonio de|clientes atendidos/i)
  })

  it('renderiza solo evidencia aprobada junto con su alcance y fuente', () => {
    const approvedRecord = { ...verifiedEvidenceFixture, context: HOME_EVIDENCE_CONTEXT }
    const draftRecord = { ...draftEvidenceFixture, context: HOME_EVIDENCE_CONTEXT }
    const { container } = render(
      <MemoryRouter>
        <HomeProofSection recordsOrRegistry={[draftRecord, approvedRecord]} />
      </MemoryRouter>,
    )
    const proofSection = container.querySelector('[data-evidence-gate="published"]')

    expect(within(proofSection).getByRole('list', {
      name: 'Experiencia verificada de BAYONA',
    })).toBeInTheDocument()
    expect(within(proofSection).getAllByRole('listitem')).toHaveLength(1)
    expect(within(proofSection).getByText(approvedRecord.attribution)).toBeInTheDocument()
    expect(within(proofSection).getByText(approvedRecord.content.statement)).toBeInTheDocument()
    expect(within(proofSection).getByText(approvedRecord.scope)).toBeInTheDocument()
    expect(within(proofSection).getByText(approvedRecord.sourceRef)).toBeInTheDocument()
    expect(within(proofSection).queryByText(draftRecord.attribution)).not.toBeInTheDocument()
    expect(proofSection.querySelector('.proof-process-list, [data-evidence-slot], .evidence-slot')).toBeNull()
  })

  it('integra los cuatro planes, precios accesibles y presentaciones PDF sin alterar sus fuentes', () => {
    const { container } = renderHome()
    const offerBlock = homeContentModel.blocks.find(({ id }) => id === 'home-offer')
    const offerSection = container.querySelector('[data-content-block="home-offer"]')
    const comparison = within(offerSection).getByRole('list', {
      name: 'Comparación de planes por plan',
    })

    expect(within(offerSection).getByRole('heading', {
      level: 2,
      name: offerBlock.heading,
    })).toBeInTheDocument()
    expect(within(offerSection).getByText(offerBlock.body)).toBeInTheDocument()
    expect(within(comparison).getAllByRole('listitem')).toHaveLength(membershipPlans.length)
    expect(within(offerSection).getAllByRole('article')).toHaveLength(1)
    expect(within(comparison).getAllByRole('button').filter((button) => (
      button.getAttribute('aria-pressed') === 'true'
    ))).toHaveLength(1)

    membershipPlanEditorialProjection.forEach(({ plan, overlay }) => {
      const anchor = offerSection.querySelector(`#plan-${plan.id.toLowerCase()}`)
      const selector = within(anchor).getByRole('button', { name: `Ver plan ${plan.name}` })

      fireEvent.click(selector)

      const article = within(offerSection).getByRole('article', { name: plan.name })

      expect(selector).toHaveAttribute('aria-pressed', 'true')
      expect(within(article).getByText(overlay.descriptor)).toBeInTheDocument()
      expect(within(article).getByText(overlay.jtbdSummary)).toBeInTheDocument()
      expect(within(article).getByText(overlay.valueSummary)).toBeInTheDocument()
      expect(within(article).getByRole('button', {
        name: `Ver alcance y condiciones de ${plan.name}`,
      })).toHaveAttribute('aria-expanded', 'false')
      expect(within(article).getByRole('link', {
        name: `Consultar ${plan.name} por WhatsApp`,
      })).toHaveAttribute('href', plan.cta)
      expect(within(article).getByRole('link', {
        name: `Ver presentación de ${plan.name}`,
      })).toHaveAttribute('href', `/plan/${plan.id.toLowerCase()}`)
      expect(article.querySelector('.plan-presentation-thumbnail')).not.toBeNull()
    })
  })
})

describe('Home — extras y resumen persistente', () => {
  it('explora una categoría y anuncia plan, selección y totales desde el catálogo actual', () => {
    const { container } = renderHome()
    const configurator = container.querySelector('.extras-configurator')
    const categoryNavigation = within(configurator).getByRole('navigation', {
      name: 'Categorías de servicios',
    })
    const summary = within(configurator).getByRole('complementary', {
      name: 'Tu selección actual',
    })
    const initialSelection = { planId: membershipPlans[0].id, serviceQuantities: {}, extraIds: [] }

    expect(summary).toHaveAttribute('aria-live', 'polite')
    expect(summary).toHaveAttribute('aria-atomic', 'true')
    expect(summary).toHaveAttribute('tabindex', '0')
    expectAnimatedTotal(summary, calculateExperience(initialSelection))
    expect(within(configurator).queryByRole('checkbox')).not.toBeInTheDocument()

    fireEvent.click(within(categoryNavigation).getByRole('button', {
      name: `Explorar categoría ${sessionServices[0].category}`,
    }))
    const categoryPanel = within(configurator).getByRole('region', {
      name: sessionServices[0].category,
    })
    fireEvent.click(within(categoryPanel).getByRole('button', {
      name: `Ver detalle y opciones de ${sessionServices[0].label}`,
    }))
    fireEvent.change(within(categoryPanel).getByRole('combobox', {
      name: `Cantidad de ${sessionServices[0].label}`,
    }), { target: { value: '2' } })

    const serviceSelection = {
      ...initialSelection,
      serviceQuantities: { [sessionServices[0].id]: 2 },
    }
    expectAnimatedTotal(summary, calculateExperience(serviceSelection))

    const nextPlan = membershipPlans[1]
    fireEvent.click(within(configurator).getByRole('radio', {
      name: new RegExp(`${escapeRegExp(nextPlan.name)}.*${escapeRegExp(nextPlan.priceDisplay)}`, 'i'),
    }))
    expectAnimatedTotal(summary, calculateExperience({
      ...serviceSelection,
      planId: nextPlan.id,
    }))
    expect(within(summary).getByText(nextPlan.name)).toBeInTheDocument()

    const inPersonService = sessionServices.find(({ presencial }) => presencial)
    if (inPersonService.category !== sessionServices[0].category) {
      fireEvent.click(within(categoryNavigation).getByRole('button', {
        name: `Explorar categoría ${inPersonService.category}`,
      }))
    }
    const inPersonPanel = within(configurator).getByRole('region', {
      name: inPersonService.category,
    })
    fireEvent.click(within(inPersonPanel).getByRole('button', {
      name: `Ver detalle y opciones de ${inPersonService.label}`,
    }))
    expect(within(configurator).getByText(
      'presencial sujeto a ubicación y disponibilidad',
    )).toBeInTheDocument()
    expect(within(configurator).queryByRole('link')).not.toBeInTheDocument()
  })
})

describe('Home — preview explícito de Official_WhatsApp', () => {
  it('mantiene WhatsApp bloqueado hasta revisar el mensaje vigente y sus condiciones', () => {
    const { container } = renderHome()
    const preview = container.querySelector('.request-preview')

    expect(preview).toHaveAttribute('data-preview-state', 'pending')
    expect(within(preview).getByRole('button', {
      name: 'Abrir WhatsApp de BAYONA; revisa primero el mensaje',
    })).toBeDisabled()
    expect(within(preview).queryByRole('link')).not.toBeInTheDocument()

    fireEvent.click(within(preview).getByRole('button', { name: 'Revisar mensaje exacto' }))

    const exactPreview = within(preview).getByRole('region', {
      name: 'Vista previa exacta de la solicitud a WhatsApp',
    })
    const message = exactPreview.querySelector('.request-preview-message').textContent
    const whatsapp = within(exactPreview).getByRole('link', {
      name: 'Abrir WhatsApp de BAYONA en una pestaña nueva',
    })
    const parsedUrl = new URL(whatsapp.getAttribute('href'))

    expect(parsedUrl.origin).toBe('https://wa.me')
    expect(parsedUrl.pathname).toBe('/34614988006')
    expect(parsedUrl.searchParams.get('text')).toBe(message)
    expect(within(exactPreview).getByRole('region', {
      name: 'Datos que se incluirán',
    })).toHaveTextContent(membershipPlans[0].name)
    expect(within(exactPreview).getByRole('region', {
      name: 'Condiciones geográficas',
    })).toHaveTextContent('ubicación cuando aplique')
    expect(within(exactPreview).getByRole('region', {
      name: 'Aviso no contractual',
    })).toHaveTextContent('no constituye pago, pedido, inscripción, disponibilidad ni acceso confirmados')
    expect(whatsapp).toHaveAttribute('target', '_blank')
    expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer')

    const updatedPlan = membershipPlans[2]
    fireEvent.click(within(container.querySelector('.extras-configurator')).getByRole('radio', {
      name: new RegExp(`${escapeRegExp(updatedPlan.name)}.*${escapeRegExp(updatedPlan.priceDisplay)}`, 'i'),
    }))

    expect(preview).toHaveAttribute('data-preview-state', 'pending')
    expect(within(preview).queryByRole('link')).not.toBeInTheDocument()
    expect(within(preview).getByRole('button', {
      name: 'Revisar mensaje actualizado',
    })).toBeInTheDocument()
  })
})
