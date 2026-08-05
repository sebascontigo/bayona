import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import Onboarding from './Onboarding.jsx'

const onboardingCss = readFileSync(resolve(process.cwd(), 'src/styles/onboarding.css'), 'utf8')

function renderOnboarding() {
  return render(
    <MemoryRouter>
      <Onboarding />
    </MemoryRouter>,
  )
}

async function enterVisitMenu() {
  fireEvent.click(screen.getByRole('button', { name: /entrar como visitante/i }))
  await screen.findByRole('heading', { name: /cómo quieres recorrer bayona/i })
}

async function enterPersonalQuestions() {
  fireEvent.click(screen.getByRole('button', { name: /encontrar mi camino/i }))
  await screen.findByRole('heading', { name: /hola\. estás dentro de bayona/i })
  fireEvent.click(screen.getByRole('button', { name: /^continuar/i }))
  await screen.findByRole('heading', { name: /tu pase nace mientras eliges/i })
  fireEvent.click(screen.getByRole('button', { name: /construir mi pase/i }))
  await screen.findByRole('heading', { name: /qué quieres construir/i })
}

async function completePersonalPath() {
  await enterPersonalQuestions()
  fireEvent.click(screen.getByRole('radio', { name: /comparar acompañamientos/i }))
  await screen.findByRole('heading', { name: /cuál es tu experiencia/i })
  fireEvent.click(screen.getByRole('radio', { name: /estoy retomando/i }))
  await screen.findByRole('heading', { name: /cuánto espacio tienes en tu semana/i })
  fireEvent.click(screen.getByRole('radio', { name: /1 o 2 momentos por semana/i }))
  await screen.findByRole('heading', { name: /tu primer camino está listo/i })
  fireEvent.click(screen.getByRole('button', { name: /continuar a mis opciones/i }))
  await screen.findByRole('heading', { name: /elige tu siguiente paso/i })
}

afterEach(cleanup)

describe('/onboarding — EL UMBRAL BAYONA', () => {
  it('abre con un umbral saltable y ofrece decisiones claras sin sonido ni datos', () => {
    const { container } = renderOnboarding()

    expect(screen.getByRole('heading', { level: 1, name: /las puertas están abiertas/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /saltar intro/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar como visitante/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /encontrar mi camino/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /recorrido de ingreso bayona/i })).toBeInTheDocument()
    expect(container.querySelector('audio, video, iframe')).not.toBeInTheDocument()
    expect(container.querySelector('input')).not.toBeInTheDocument()
  })

  it('permite una visita libre y muestra un Pase temporal, anónimo y honesto', async () => {
    renderOnboarding()
    await enterVisitMenu()

    fireEvent.click(screen.getByRole('button', { name: /solo quiero conocer bayona/i }))
    const pass = await screen.findByRole('article', { name: /pase bayona temporal y anónimo/i })

    expect(pass).toHaveTextContent(/visitante · acceso temporal/i)
    expect(pass).not.toHaveTextContent(/código visual|identificador permanente|BYN-V/i)
    expect(pass).toHaveTextContent(/pase temporal\. no guardamos tus datos\./i)
  })

  it('construye el pase con tres elecciones y produce una ruta explicable, no diagnóstica', async () => {
    renderOnboarding()
    await enterPersonalQuestions()

    fireEvent.click(screen.getByRole('radio', { name: /construir constancia/i }))
    await screen.findByRole('heading', { name: /cuál es tu experiencia/i })
    fireEvent.click(screen.getByRole('radio', { name: /estoy empezando/i }))
    await screen.findByRole('heading', { name: /cuánto espacio tienes en tu semana/i })
    fireEvent.click(screen.getByRole('radio', { name: /1 o 2 momentos por semana/i }))

    await screen.findByRole('heading', { name: /tu primer camino está listo/i })
    expect(screen.getAllByText('RAÍZ').length).toBeGreaterThan(0)
    expect(screen.getByRole('note')).toHaveTextContent(/orientación, no diagnóstico/i)
    expect(screen.getByRole('note')).toHaveTextContent(/no prescribe ejercicio/i)
  })

  it('mantiene adjuntos ausentes, exige consentimiento y no abre WhatsApp automáticamente', async () => {
    const { container } = renderOnboarding()
    await enterVisitMenu()
    fireEvent.click(screen.getByRole('button', { name: /quiero hablar con una persona/i }))

    const form = await screen.findByRole('form', { name: /hablar por whatsapp/i })
    expect(container.querySelector('input[type="text"], input[type="email"], input[type="tel"]')).not.toBeInTheDocument()
    expect(container.querySelector('input[type="file"]')).not.toBeInTheDocument()
    expect(form).not.toHaveAttribute('action')

    const uploadNotice = screen.getByRole('note', { name: 'Adjuntos deshabilitados' })
    expect(uploadNotice).toHaveTextContent(/no existe un endpoint ni una política de privacidad específica aprobados/i)
    expect(uploadNotice).toHaveTextContent(/imágenes corporales, radiografías, analíticas, informes/i)

    fireEvent.click(within(form).getByRole('button', { name: /preparar orientación/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/consentimiento explícito/i)
    expect(screen.queryByRole('link', { name: /abrir WhatsApp oficial/i })).not.toBeInTheDocument()
  })

  it('prepara el resumen personalizado en el canal oficial solo tras consentir', async () => {
    renderOnboarding()
    await completePersonalPath()

    const form = screen.getByRole('form', { name: /hablar por whatsapp/i })
    fireEvent.click(within(form).getByRole('checkbox', { name: /consiento preparar estas tres selecciones/i }))
    fireEvent.click(within(form).getByRole('button', { name: /preparar orientación/i }))

    const link = await screen.findByRole('link', { name: /abrir WhatsApp oficial/i })
    const url = new URL(link.getAttribute('href'))
    const message = url.searchParams.get('text')

    expect(url.origin).toBe('https://wa.me')
    expect(url.pathname).toBe('/34614988006')
    expect(message).toContain('Comparar acompañamientos')
    expect(message).toContain('Estoy retomando')
    expect(message).toContain('1 o 2 momentos por semana')
    expect(message).toMatch(/no incluye nombre, email, teléfono, archivos ni datos de salud/i)
    expect(message).toMatch(/no un diagnóstico, tratamiento ni respuesta médica/i)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.rel.split(/\s+/)).toEqual(expect.arrayContaining(['noopener', 'noreferrer']))
  })

  it('comunica el límite sanitario y mantiene contratos responsive, táctiles y reduced-motion', async () => {
    renderOnboarding()
    await enterVisitMenu()
    fireEvent.click(screen.getByRole('button', { name: /quiero hablar con una persona/i }))

    await waitFor(() => {
      expect(screen.getByText('ORIENTACIÓN, NO ATENCIÓN SANITARIA').closest('[role="note"]'))
        .toHaveTextContent(/no ofrece diagnóstico, tratamiento, triaje de urgencias ni una respuesta médica/i)
    })
    expect(onboardingCss).toMatch(/min-height:\s*48px/i)
    expect(onboardingCss).toMatch(/:focus-visible/i)
    expect(onboardingCss).toMatch(/@media\s*\(min-width:\s*760px\)/i)
    expect(onboardingCss).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/i)
  })
})
