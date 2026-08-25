import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import Resources from './Resources.jsx'
import { socialLinks } from '../config/social.config.js'
import { resolveProfiles } from '../lib/social/platforms.js'

const resourcesCss = readFileSync(resolve(process.cwd(), 'src/styles/resources.css'), 'utf8')

function renderPage() {
  return render(
    <MemoryRouter>
      <Resources />
    </MemoryRouter>,
  )
}

afterEach(cleanup)

describe('/resources — Empieza Gratis honesto', () => {
  it('presenta el hero aprobado y describe los recursos gratis sin prometer resultados', () => {
    const { container } = renderPage()

    expect(screen.getByRole('heading', { level: 1, name: 'EMPIEZA ANTES DE PAGAR' })).toBeInTheDocument()
    expect(screen.getByText(/explora recursos gratuitos/i)).toHaveTextContent(
      /no prometen transformaciones, resultados ni sustituyen atención médica/i,
    )
    expect(screen.getByRole('link', { name: /explorar el reto/i })).toHaveAttribute('href', '#reto-30-dias')
    expect(screen.getByRole('link', { name: /ver protocolo 7 días/i })).toHaveAttribute('href', '#protocolo-7-dias')
    expect(container.textContent).not.toMatch(/resultado garantizado|transformación garantizada/i)
  })

  it('presenta el Reto 30 días como voluntario y adaptable con una solicitud informativa por WhatsApp', () => {
    renderPage()

    const challenge = screen.getByRole('heading', { level: 2, name: 'RETO 30 DÍAS' }).closest('section')
    expect(challenge).toHaveTextContent(/voluntaria, adaptable y educativa/i)
    expect(challenge).toHaveTextContent(/no es una evaluación, tratamiento ni indicación médica/i)
    expect(within(challenge).getAllByRole('listitem')).toHaveLength(4)

    const cta = within(challenge).getByRole('link', { name: /pedir información del reto/i })
    const url = new URL(cta.getAttribute('href'))
    const message = url.searchParams.get('text')

    expect(url.origin).toBe('https://wa.me')
    expect(url.pathname).toBe('/34614988006')
    expect(message).toMatch(/solicitar información sobre el Reto voluntario de 30 días/i)
    expect(message).toMatch(/no me inscribe automáticamente/i)
    expect(message).not.toMatch(/inscripción confirmada|plaza reservada|resultado garantizado/i)
  })

  it('mantiene el Protocolo 7 días como guía web y no simula una descarga', () => {
    const { container } = renderPage()

    const protocol = screen.getByRole('heading', { level: 2, name: 'PROTOCOLO 7 DÍAS' }).closest('section')
    expect(within(protocol).getAllByRole('listitem')).toHaveLength(7)
    expect(protocol).toHaveTextContent(/actualmente no existe un PDF ni otro archivo descargable/i)
    expect(container.textContent).not.toMatch(/descargar pdf/i)
    expect(container.querySelector('[download]')).not.toBeInTheDocument()

    const cta = within(protocol).getByRole('link', { name: /pedir orientación sobre la guía/i })
    const url = new URL(cta.getAttribute('href'))
    expect(url.origin).toBe('https://wa.me')
    expect(url.pathname).toBe('/34614988006')
    expect(url.searchParams.get('text')).toMatch(/Protocolo de 7 días/i)
  })

  it('publica únicamente el calendario orientativo de lunes, miércoles y viernes', () => {
    renderPage()

    const schedule = screen.getByRole('list', {
      name: 'Calendario orientativo de lunes, miércoles y viernes',
    })
    const entries = within(schedule).getAllByRole('listitem')

    expect(entries).toHaveLength(3)
    expect(entries.map((entry) => within(entry).getByText(/LUNES|MIÉRCOLES|VIERNES/).textContent)).toEqual([
      'LUNES',
      'MIÉRCOLES',
      'VIERNES',
    ])
    expect(screen.getByText(/no garantizan una publicación, actividad o respuesta en una fecha concreta/i)).toBeInTheDocument()
  })

  it('deriva los canales activos de social.config.js sin inventar publicaciones ni métricas', () => {
    renderPage()

    const expectedProfiles = resolveProfiles(socialLinks)
    const channelList = screen.getByRole('list', { name: 'Canales sociales oficiales' })
    const channelLinks = within(channelList).getAllByRole('link')

    expect(channelLinks).toHaveLength(expectedProfiles.length)
    expectedProfiles.forEach((profile) => {
      const link = within(channelList).getByRole('link', { name: new RegExp(profile.label, 'i') })
      expect(link).toHaveAttribute('href', profile.url)
      expect(link).toHaveAttribute('target', '_blank')
    })

    expect(screen.getByText('SIN PUBLICACIONES VERIFICADAS AQUÍ')).toBeInTheDocument()
    expect(screen.getByText(/no hay un feed cargado en esta página/i)).toBeInTheDocument()
    expect(channelList.textContent).not.toMatch(/seguidores|publicaciones disponibles|\d+[kKmM]\b/i)
  })

  it('usa @sebasbayona en Instagram y TikTok y conserva @sevisionari en YouTube', () => {
    expect(socialLinks).toMatchObject({
      instagram: 'https://instagram.com/sebasbayona',
      tiktok: 'https://tiktok.com/@sebasbayona',
      youtube: 'https://youtube.com/@sevisionari',
    })

    const profilesById = new Map(resolveProfiles(socialLinks).map((profile) => [profile.id, profile]))

    expect(profilesById.get('instagram')?.handle).toBe('sebasbayona')
    expect(profilesById.get('tiktok')?.handle).toBe('sebasbayona')
    expect(profilesById.get('youtube')?.handle).toBe('sevisionari')
  })

  it('permite navegar categorías por teclado o puntero y muestra un estado vacío honesto sin conteos', () => {
    renderPage()

    const categoryNav = screen.getByRole('navigation', { name: 'Categorías de recursos' })
    const buttons = within(categoryNav).getAllByRole('button')
    expect(buttons.map((button) => button.textContent)).toEqual(['MOVILIDAD', 'FUERZA', 'HÁBITOS', 'TÉCNICA'])
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true')
    buttons.forEach((button) => expect(button.textContent).not.toMatch(/\d/))

    fireEvent.click(within(categoryNav).getByRole('button', { name: 'FUERZA' }))

    expect(within(categoryNav).getByRole('button', { name: 'FUERZA' })).toHaveAttribute('aria-pressed', 'true')
    const panel = screen.getByRole('region', { name: 'FUERZA' })
    expect(panel).toHaveTextContent('PRÓXIMAMENTE')
    expect(panel).toHaveTextContent(/aún no hay recursos verificables publicados en esta categoría/i)
  })

  it('explica propósito, tratamiento y canal antes de validar una pregunta consentida', () => {
    const { container } = renderPage()
    const section = screen.getByRole('heading', { level: 2, name: /PREGUNTA CON CUIDADO/i }).closest('section')
    const form = within(section).getByRole('form', { name: /PREGUNTA CON CUIDADO/i })

    expect(within(section).getByText('PROPÓSITO')).toBeInTheDocument()
    expect(within(section).getByText('TRATAMIENTO')).toBeInTheDocument()
    expect(within(section).getByText('CANAL')).toBeInTheDocument()
    expect(section).toHaveTextContent(/no recibirás un diagnóstico ni una respuesta médica/i)
    expect(section).toHaveTextContent(/no existe un endpoint ni una política de privacidad específica aprobados/i)
    expect(screen.getByText(/no compartas datos médicos o sensibles/i)).toBeInTheDocument()
    expect(screen.getByText(/nada se envía automáticamente/i)).toBeInTheDocument()
    expect(container.querySelector('input[type="file"]')).not.toBeInTheDocument()
    expect(form).not.toHaveAttribute('action')

    fireEvent.click(screen.getByRole('button', { name: /preparar consulta/i }))
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent(/selecciona un tema general/i)
    expect(alert).toHaveTextContent(/al menos 10 caracteres/i)
    expect(alert).toHaveTextContent(/confirma que has leído el propósito/i)
    expect(screen.queryByRole('link', { name: /abrir consulta en WhatsApp/i })).not.toBeInTheDocument()

    const question = '¿Cómo adapto la guía a una semana con poco tiempo?'
    fireEvent.change(screen.getByRole('combobox', { name: 'Tema general' }), {
      target: { value: 'protocolo' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Tu pregunta general' }), {
      target: { value: question },
    })
    fireEvent.click(screen.getByRole('checkbox', { name: /consiento preparar esta pregunta/i }))
    fireEvent.click(screen.getByRole('button', { name: /preparar consulta/i }))

    const link = screen.getByRole('link', { name: /abrir consulta en WhatsApp/i })
    const url = new URL(link.getAttribute('href'))
    expect(url.origin).toBe('https://wa.me')
    expect(url.pathname).toBe('/34614988006')
    expect(url.searchParams.get('text')).toContain('Tema: Protocolo 7 días.')
    expect(url.searchParams.get('text')).toContain(question)
    expect(url.searchParams.get('text')).toMatch(/no adjunto archivos/i)
    expect(url.searchParams.get('text')).toMatch(/no solicito diagnóstico, tratamiento o respuesta médica/i)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.rel.split(/\s+/)).toEqual(expect.arrayContaining(['noopener', 'noreferrer']))
  })

  it('bloquea la preparación cuando la pregunta parece incluir datos sensibles', () => {
    renderPage()

    fireEvent.change(screen.getByRole('combobox', { name: 'Tema general' }), {
      target: { value: 'recursos' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Tu pregunta general' }), {
      target: { value: '¿Podéis revisar mi radiografía y darme un diagnóstico?' },
    })
    fireEvent.click(screen.getByRole('checkbox', { name: /consiento preparar esta pregunta/i }))
    fireEvent.click(screen.getByRole('button', { name: /preparar consulta/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/parezca incluir datos de salud/i)
    expect(screen.queryByRole('link', { name: /abrir consulta en WhatsApp/i })).not.toBeInTheDocument()
  })

  it('incluye contratos visuales responsive, de foco y reduced motion', () => {
    expect(resourcesCss).toMatch(/min-height:\s*48px/)
    expect(resourcesCss).toMatch(/:focus-visible/)
    expect(resourcesCss).toMatch(/@media\s*\(min-width:\s*680px\)/)
    expect(resourcesCss).toMatch(/@media\s*\(min-width:\s*960px\)/)
    expect(resourcesCss).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
    expect(resourcesCss).toMatch(/animation:\s*none/)
  })
})
