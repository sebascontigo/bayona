import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Resources from './Resources.jsx'
import { socialLinks } from '../config/social.config.js'
import { resolveProfiles } from '../lib/social/platforms.js'

function renderPage() {
  return render(
    <MemoryRouter>
      <Resources />
    </MemoryRouter>,
  )
}

// "Empieza Gratis" se sostiene en tres pilares honestos: reglas por escrito
// antes del reto, una revista viva en lugar de calendarios inventados y una
// consulta por WhatsApp que el usuario revisa antes de enviar.
describe('/resources — Empieza Gratis honesto', () => {
  it('presenta el hero con dos salidas internas verificables', () => {
    renderPage()

    expect(screen.getByRole('heading', { level: 1, name: /ENTRENA CON CRITERIO\.\s*EMPIEZA CON CLARIDAD\./i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /VER REGLAS DEL RETO/i })).toHaveAttribute('href', '#reto')
    expect(screen.getByRole('link', { name: /EXPLORAR RECURSOS/i })).toHaveAttribute('href', '#revista')
  })

  it('anuncia el Reto 30 días con sus reglas visibles antes de empezar', () => {
    const { container } = renderPage()

    const challenge = container.querySelector('#reto')
    expect(challenge).not.toBeNull()
    expect(within(challenge).getByRole('heading', { name: /30 DÍAS\.\s*REGLAS ANTES DE EMPEZAR\./i })).toBeInTheDocument()
    expect(container.textContent).toContain('CONOCE LAS REGLAS ANTES DE ENTRAR.')

    // Sin promesas de resultado ni lenguaje médico en la sección del reto.
    expect(challenge.textContent).not.toMatch(/garantizamos|transformación asegurada|cura|diagnóstico/i)
  })

  it('ofrece la revista como guía web viva, sin descargas simuladas ni calendario inventado', () => {
    const { container } = renderPage()

    const magazine = container.querySelector('#revista')
    expect(magazine).not.toBeNull()
    expect(magazine.querySelector('#magazine-title')).not.toBeNull()
    expect(magazine.textContent).toContain('NO UN CALENDARIO RÍGIDO.')

    // Ningún recurso simula una descarga: todo se lee en la propia página.
    expect(magazine.querySelectorAll('a[download]')).toHaveLength(0)
  })

  it('prepara la consulta con contexto y bloquea datos sensibles antes de WhatsApp', () => {
    renderPage()

    // La página explica el trato de datos antes de pedir nada.
    expect(screen.getAllByText(/Evita incluir información médica sensible\./i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Nada se envía solo\. Tú revisas el mensaje y decides abrir WhatsApp\./i)).toBeInTheDocument()
  })

  it('deriva los canales publicados de social.config.js sin inventar métricas', () => {
    const { container } = renderPage()
    const configuredProfiles = resolveProfiles(socialLinks)
    const channelsSection = container.querySelector('.resources-channels')

    if (configuredProfiles.length > 0) {
      expect(channelsSection).not.toBeNull()
      for (const profile of configuredProfiles) {
        const link = channelsSection.querySelector(`a[href*="${profile.url}"]`)
        expect(link).not.toBeNull()
      }
    }

    // Nunca se muestran conteos de seguidores ni publicaciones falsas.
    expect(container.textContent).not.toMatch(/\d+[.,]\d+\s*(seguidores|followers)/i)
  })
})
