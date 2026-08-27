import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Onboarding from './Onboarding.jsx'

function renderOnboarding() {
  return render(
    <MemoryRouter>
      <Onboarding />
    </MemoryRouter>,
  )
}

async function startFunnel() {
  fireEvent.click(screen.getByRole('button', { name: /EMPEZAR · 60 SEGUNDOS/i }))
  // AnimatePresence mode="wait": la pregunta entra cuando termina la salida.
  await screen.findByRole('radiogroup', { name: '¿QUÉ QUIERES CONSTRUIR?' }, { timeout: 4000 })
}

async function answerQuestion(headingPattern, optionPattern) {
  const group = await screen.findByRole('radiogroup', { name: headingPattern }, { timeout: 4000 })
  fireEvent.click(within(group).getByRole('radio', { name: optionPattern }))
}

// El umbral convierte curiosos en recorridos de tres decisiones. Este
// contrato protege la honestidad del paso a paso y su consentimiento final.
describe('/onboarding — EL UMBRAL BAYONA', () => {
  it('abre con un umbral saltable y dos decisiones claras, sin sonido ni datos', () => {
    const { container } = renderOnboarding()

    expect(screen.getByRole('heading', { level: 1, name: 'BIENVENIDO A BAYONA.' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /SALTAR INTRO/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /EMPEZAR · 60 SEGUNDOS/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /SOLO QUIERO MIRAR/i })).toHaveAttribute('href', '/programs')
    expect(screen.getByText(/SIN CUENTA · SIN COOKIES · SIN DATOS GUARDADOS/i)).toBeInTheDocument()
    expect(container.querySelector('audio, video, iframe')).not.toBeInTheDocument()
    expect(container.querySelector('input')).not.toBeInTheDocument()
  })

  it('recorre tres preguntas y aterriza en una ruta explicada, no diagnóstica', async () => {
    renderOnboarding()
    await startFunnel()

    await answerQuestion('¿QUÉ QUIERES CONSTRUIR?', /Comparar planes/i)
    await answerQuestion('¿DÓNDE ESTÁS HOY?', /Ya entreno/i)
    await answerQuestion('¿CUÁNTO TIEMPO TIENES?', /3 días/i)

    expect(await screen.findByRole('heading', { level: 1, name: /TU PUNTO DE PARTIDA\s*ESTÁ AQUÍ\./i }, { timeout: 4000 })).toBeInTheDocument()
    const recommendation = await screen.findByRole('region', { name: 'Tu recomendación BAYONA' }, { timeout: 4000 })
    expect(recommendation).toHaveTextContent('PLAN SUGERIDO')
    // Marco sanitario explícito: orientación, nunca diagnóstico.
    expect(screen.getByText(/No es un diagnóstico\./i)).toBeInTheDocument()
    expect(screen.getByText(/ORIENTACIÓN, NO ATENCIÓN SANITARIA/i)).toBeInTheDocument()
  })

  it('mantiene el pase visible durante las preguntas sin pedir identidad', async () => {
    renderOnboarding()
    startFunnel()

    const passColumn = await screen.findByLabelText('Tu Pase BAYONA en construcción')
    expect(passColumn).toBeInTheDocument()
    expect(passColumn).toHaveTextContent(/POR DEFINIR/i)
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('prepara el mensaje para WhatsApp solo tras consentimiento explícito', async () => {
    renderOnboarding()
    await startFunnel()

    await answerQuestion('¿QUÉ QUIERES CONSTRUIR?', /Comparar planes/i)
    await answerQuestion('¿DÓNDE ESTÁS HOY?', /Ya entreno/i)
    await answerQuestion('¿CUÁNTO TIEMPO TIENES?', /3 días/i)
    fireEvent.click(await screen.findByRole('button', { name: /VER MI SIGUIENTE PASO/i }, { timeout: 4000 }))

    expect(await screen.findByRole('heading', { level: 1, name: '¿EMPEZAMOS?' }, { timeout: 4000 })).toBeInTheDocument()

    // El canal se abre a demanda y sin consentimiento no hay mensaje preparado.
    fireEvent.click(screen.getByRole('button', { name: /HABLAR POR WHATSAPP/i }))
    await screen.findByRole('checkbox', { name: /Consiento preparar mis tres selecciones/i }, { timeout: 4000 })
    fireEvent.click(screen.getByRole('button', { name: /^PREPARAR/i }))
    expect(screen.queryByRole('link', { name: /REVISAR Y ABRIR WHATSAPP/i })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('checkbox', { name: /Consiento preparar mis tres selecciones/i }))
    fireEvent.click(screen.getByRole('button', { name: /^PREPARAR/i }))

    const whatsappLink = screen.getByRole('link', { name: /REVISAR Y ABRIR WHATSAPP/i })
    expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('https://wa.me/34614988006'))
    expect(screen.getByText(/Preparar no envía datos\./i)).toBeInTheDocument()
  })

  it('el paso final lleva a la ficha del plan recomendado y deja comparar planes como alternativa (Fase 4)', async () => {
    renderOnboarding()
    await startFunnel()

    await answerQuestion('¿QUÉ QUIERES CONSTRUIR?', /Comparar planes/i)
    await answerQuestion('¿DÓNDE ESTÁS HOY?', /Ya entreno/i)
    await answerQuestion('¿CUÁNTO TIEMPO TIENES?', /3 días/i)
    fireEvent.click(await screen.findByRole('button', { name: /VER MI SIGUIENTE PASO/i }, { timeout: 4000 }))

    await screen.findByRole('heading', { level: 1, name: '¿EMPEZAMOS?' }, { timeout: 4000 })

    // Matriz de rutas: comparar-planes + constante + 3 días → ELITE.
    const primary = screen.getByRole('link', { name: /EMPIEZA TU CAMINO/i })
    expect(primary).toHaveAttribute('href', '/plan/elite')
    expect(screen.getByRole('link', { name: /COMPARAR TODOS LOS PLANES/i })).toHaveAttribute('href', '/programs')
    expect(screen.getByRole('link', { name: /EXPLORAR RECURSOS GRATIS/i })).toHaveAttribute('href', '/resources')
  })
})
