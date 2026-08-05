import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import AppExperience from './AppExperience.jsx'

const { sceneMountSpy } = vi.hoisted(() => ({ sceneMountSpy: vi.fn() }))

vi.mock('../components/Layout', () => ({
  SectionLabel: ({ children }) => <p>{children}</p>,
}))

vi.mock('../engine/scene/SceneMount.jsx', () => ({
  SceneMount: (props) => {
    sceneMountSpy(props)
    return <div data-testid="shared-scene-host" />
  },
}))

afterEach(() => {
  cleanup()
  sceneMountSpy.mockClear()
})

function renderPage() {
  return render(<MemoryRouter><AppExperience /></MemoryRouter>)
}

describe('/app — BAYONA+ conceptual y honesta', () => {
  it('renombra la identidad visible y comunica claramente el estado de desarrollo', () => {
    const { container } = renderPage()

    expect(screen.getByText('BAYONA+ / EN DESARROLLO')).toBeInTheDocument()
    const h1Headings = screen.getAllByRole('heading', { level: 1 })
    expect(h1Headings).toHaveLength(1)
    expect(screen.getByRole('heading', {
      level: 1,
      name: 'TU ENTRENADOR Y ASESOR PERSONAL. SIEMPRE CONTIGO.',
    })).toBe(h1Headings[0])
    expect(screen.getByRole('heading', { name: /BAYONA\+ ESTÁ\s*EN DESARROLLO\./i })).toBeInTheDocument()
    expect(container.textContent).not.toMatch(/BAYONA\s+OS/i)
  })

  it('presenta teléfono, tablet y reloj como mockups no operativos, sin claims falsos', () => {
    const { container } = renderPage()
    const copy = container.textContent

    expect(screen.getByLabelText('Vista conceptual de BAYONA+ para teléfono')).toBeInTheDocument()
    expect(screen.getByLabelText('Vista conceptual de BAYONA+ para tablet')).toBeInTheDocument()
    expect(screen.getByLabelText('Vista conceptual de BAYONA+ para reloj')).toBeInTheDocument()
    expect(screen.getByText(/composiciones visuales estáticas/i)).toBeInTheDocument()
    expect(screen.getByText(/no muestran datos reales, sincronización, inteligencia artificial ni funciones conectadas a un backend/i)).toBeInTheDocument()

    expect(copy).not.toMatch(/disponible (?:en|para) (?:App Store|Google Play)|descargas|usuarios activos|sincroniza tus datos|IA funcional|compatible con todos|acceso inmediato garantizado|promete acceso inmediato/i)
  })

  it('presenta la tablet como figura conceptual accesible vinculada al disclaimer común', () => {
    const { container } = renderPage()

    const tablet = screen.getByRole('figure', { name: 'Tablet / concepto' })
    const commonDisclaimer = container.querySelector('#app-concept-disclaimer')

    expect(tablet.tagName).toBe('FIGURE')
    expect(tablet).toHaveAttribute('aria-labelledby', 'app-tablet-caption')
    expect(tablet).toHaveAttribute('aria-describedby', 'app-concept-disclaimer')
    expect(commonDisclaimer).toHaveTextContent(
      /composiciones visuales estáticas\. no muestran datos reales, sincronización, inteligencia artificial ni funciones conectadas a un backend\./i,
    )
    expect(tablet).toHaveTextContent(/tablet \/ concepto/i)
    expect(tablet).toHaveTextContent(/estructura visual ilustrativa\. sin información personal\./i)
    expect(
      tablet.querySelectorAll('a, button, input, select, textarea, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])'),
    ).toHaveLength(0)
    expect(tablet.textContent).not.toMatch(
      /datos personales de|backend (?:activo|conectado)|sincronización activa|funciones conectadas activas|datos actualizados en tiempo real|disponible (?:ahora|en|para)|acceso (?:activo|garantizado)/i,
    )
  })

  it('presenta el reloj como figura conceptual accesible con caja, correa y disclaimer común', () => {
    const { container } = renderPage()

    const watch = screen.getByRole('figure', { name: 'Reloj / concepto' })
    const commonDisclaimer = container.querySelector('#app-concept-disclaimer')
    const watchCase = watch.querySelector('.app-device-frame')
    const watchStrap = watch.querySelector('.app-watch-strap')

    expect(watch.tagName).toBe('FIGURE')
    expect(watch).toHaveAttribute('aria-labelledby', 'app-watch-caption')
    expect(watch).toHaveAttribute('aria-describedby', 'app-concept-disclaimer')
    expect(commonDisclaimer).toHaveTextContent(
      /composiciones visuales estáticas\. no muestran datos reales, sincronización, inteligencia artificial ni funciones conectadas a un backend\./i,
    )
    expect(watchCase).toBeVisible()
    expect(watchCase).toHaveAccessibleName('Vista conceptual de BAYONA+ para reloj')
    expect(watchStrap).toBeVisible()
    expect(watchStrap).toHaveAttribute('aria-hidden', 'true')
    expect(watch).toHaveTextContent(/reloj \/ concepto/i)
    expect(watch).toHaveTextContent(/vista no operativa/i)
    expect(
      watch.querySelectorAll('a, button, input, select, textarea, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])'),
    ).toHaveLength(0)
    expect(watch.textContent).not.toMatch(
      /datos personales de|backend (?:activo|conectado)|sincronización activa|funciones conectadas activas|datos actualizados en tiempo real|disponible (?:ahora|en|para)|acceso (?:activo|garantizado)/i,
    )
  })

  it('usa una sola escena compartida configurada sin añadir otro Canvas', () => {
    const { container } = renderPage()

    expect(screen.getByTestId('shared-scene-host')).toBeInTheDocument()
    expect(sceneMountSpy).toHaveBeenCalledTimes(1)
    expect(sceneMountSpy.mock.calls[0][0].config).toMatchObject({
      variant: 'signature',
      particles: true,
      postProcessing: true,
      parallax: false,
    })
    expect(container.querySelector('canvas')).not.toBeInTheDocument()
  })

  it('limita la conversión a WhatsApp verificable o navegación interna válida', () => {
    renderPage()

    const updateLinks = screen.getAllByRole('link', { name: /recibir novedades por WhatsApp/i })
    expect(updateLinks).toHaveLength(2)
    updateLinks.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/34614988006\?text=/)
      expect(decodeURIComponent(link.getAttribute('href'))).toContain('desarrollo de BAYONA+')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })

    expect(screen.getByRole('link', { name: /conocer los programas actuales/i })).toHaveAttribute('href', '/programs')
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('construye un teléfono 3D conceptual con anatomía accesible y controles físicos distinguibles', () => {
    renderPage()

    const phone = screen.getByRole('figure', { name: 'Teléfono 3D / concepto no operativo' })
    expect(phone).toHaveAttribute(
      'aria-describedby',
      'app-concept-disclaimer app-phone-demo-disclaimer',
    )

    ;['perspective', 'depth', 'frame', 'bezel', 'camera-sensor', 'screen'].forEach((part) => {
      expect(phone.querySelector(`[data-phone-part="${part}"]`)).toBeInTheDocument()
    })

    const sideControlGroups = phone.querySelectorAll('[data-phone-part="side-controls"]')
    expect(sideControlGroups).toHaveLength(2)
    sideControlGroups.forEach((group) => expect(group).toHaveAttribute('aria-hidden', 'true'))
    expect(
      [...phone.querySelectorAll('[data-phone-control]')].map((control) => control.dataset.phoneControl),
    ).toEqual(['mute', 'volume-up', 'volume-down', 'power'])
    expect(phone.querySelector('canvas')).not.toBeInTheDocument()
  })

  it('muestra exactamente los seis módulos conceptuales con valores marcados como demo y sin interacción', () => {
    renderPage()

    const dashboard = screen.getByRole('region', { name: 'Dashboard conceptual BAYONA+' })
    const modules = [...dashboard.querySelectorAll('[data-dashboard-module]')]
    const expectedModules = ['READINESS', 'MÉTRICAS', 'RUTINA', 'PROGRESO', 'COMUNIDAD', 'FOTOS']

    expect(modules).toHaveLength(6)
    expect(modules.map((module) => module.dataset.dashboardModule)).toEqual(expectedModules)
    expectedModules.forEach((label, index) => {
      expect(screen.getByRole('heading', { level: 4, name: label })).toBeInTheDocument()
      expect(modules[index]).toHaveTextContent('DEMO / CONCEPTO')
      expect(modules[index].querySelector('strong')).toHaveAccessibleName(/valor ilustrativo de demostración/i)
    })

    expect(dashboard.querySelectorAll('[role="listitem"]')).toHaveLength(6)
    expect(
      dashboard.querySelectorAll('a, button, input, select, textarea, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])'),
    ).toHaveLength(0)
  })

  it('declara el dashboard como demo sin datos personales, backend, sincronización ni disponibilidad', () => {
    renderPage()

    const phone = screen.getByRole('figure', { name: 'Teléfono 3D / concepto no operativo' })
    const dashboard = screen.getByRole('region', { name: 'Dashboard conceptual BAYONA+' })
    const disclaimer = screen.getByText(
      /valores ilustrativos de demostración; no son datos personales reales\. sin backend, sincronización ni disponibilidad operativa\./i,
    )

    expect(disclaimer).toHaveAttribute('id', 'app-phone-demo-disclaimer')
    expect(dashboard).toHaveAttribute('aria-describedby', 'app-phone-demo-disclaimer')
    expect(phone).toHaveTextContent(/demo \/ concepto/i)
    expect(phone.textContent).not.toMatch(
      /backend (?:activo|conectado)|sincronización activa|datos personales de|datos actualizados en tiempo real|disponible (?:ahora|en|para)|acceso (?:activo|garantizado)/i,
    )
  })
})


describe('/app — Feature_Catalog canónico (T092)', () => {
  const CANONICAL_TITLES = [
    'TU PLAN TU RITMO',
    'DATOS REALES',
    'TU CUERPO TU MAPA',
    'ESPACIO PRIVADO',
    'ANATOMÍA EN MOVIMIENTO',
    'INTEGRACIÓN WEARABLES',
    'COMUNIDAD ACTIVA',
    'PLAN PERSONALIZADO',
    'MODO OFFLINE',
  ]

  it('renderiza exactamente las nueve features en el orden canónico definido', () => {
    renderPage()

    const list = screen.getByRole('list', { name: /features conceptuales/i })
    const items = [...list.querySelectorAll('[role="listitem"]')]

    expect(items).toHaveLength(9)
    const titles = items.map((item) => item.querySelector('h3').textContent)
    expect(titles).toEqual(CANONICAL_TITLES)
  })

  it('no contiene duplicados ni entradas adicionales fuera de las nueve canónicas', () => {
    renderPage()

    const list = screen.getByRole('list', { name: /features conceptuales/i })
    const items = [...list.querySelectorAll('[role="listitem"]')]
    const titles = items.map((item) => item.querySelector('h3').textContent)

    // Sin duplicados
    expect(new Set(titles).size).toBe(titles.length)
    // Exactamente el conjunto canónico
    expect(new Set(titles)).toEqual(new Set(CANONICAL_TITLES))
    // Cardinalidad estricta
    expect(titles.length).toBe(9)
  })

  it('identifica el catálogo como visión conceptual de BAYONA+ en desarrollo', () => {
    const { container } = renderPage()

    const section = container.querySelector('.app-features')
    expect(section).toBeInTheDocument()
    expect(section.textContent).toMatch(/visión conceptual/i)
    expect(section.textContent).toMatch(/en desarrollo/i)
    // El disclaimer niega explícitamente estos claims
    expect(section.textContent).toMatch(/no representan funciones operativas/i)
    // No debe haber claims afirmativos de operatividad fuera del disclaimer
    expect(section.textContent).not.toMatch(
      /ya disponible|acceso garantizado|resultados comprobados|servicio operativo/i,
    )
  })

  it('no contiene la palabra "protocolos" en ningún lugar de /app', () => {
    const { container } = renderPage()

    expect(container.textContent).not.toMatch(/protocolos/i)
  })
})


describe('/app — Early_Access_Notice (T093)', () => {
  it('muestra el aviso exacto de desarrollo y acceso anticipado', () => {
    renderPage()

    const notice = screen.getByText(
      'BAYONA+ en desarrollo. Acceso anticipado para PERFORMANCE y ELITE.',
    )
    expect(notice).toBeInTheDocument()
    expect(notice).toBeVisible()
  })

  it('el aviso no promete fecha, plaza, disponibilidad ni acceso confirmado', () => {
    renderPage()

    const notice = screen.getByText(
      'BAYONA+ en desarrollo. Acceso anticipado para PERFORMANCE y ELITE.',
    )
    expect(notice.textContent).not.toMatch(
      /fecha|plaza|disponible ya|acceso confirmado|garantizado|inmediato/i,
    )
  })
})


describe('/app — CTAs finales con destinos verificables (T094)', () => {
  it('"Unirme a PERFORMANCE" es un Link interno a /programs', () => {
    renderPage()

    const link = screen.getByRole('link', { name: /unirme a performance/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/programs')
  })

  it('"Solicitar acceso" enlaza a wa.me/34614988006 con mensaje contextual', () => {
    renderPage()

    const link = screen.getByRole('link', { name: /solicitar acceso/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')

    const href = link.getAttribute('href')
    expect(href).toMatch(/^https:\/\/wa\.me\/34614988006\?text=/)
  })

  it('el mensaje decodificado identifica BAYONA+, solicita info de acceso anticipado y menciona PERFORMANCE o ELITE', () => {
    renderPage()

    const link = screen.getByRole('link', { name: /solicitar acceso/i })
    const decoded = decodeURIComponent(link.getAttribute('href'))

    expect(decoded).toMatch(/BAYONA\+/i)
    expect(decoded).toMatch(/acceso anticipado/i)
    expect(decoded).toMatch(/PERFORMANCE|ELITE/i)
  })

  it('el mensaje no confirma acceso ni disponibilidad', () => {
    renderPage()

    const link = screen.getByRole('link', { name: /solicitar acceso/i })
    const decoded = decodeURIComponent(link.getAttribute('href'))

    expect(decoded).not.toMatch(/acceso confirmado|garantizado|inmediato|ya disponible/i)
  })
})
