import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PaseBayona from './PaseBayona.jsx'

vi.mock('framer-motion', () => {
  const component = (tag) => ({ children, ...props }) => React.createElement(tag, props, children)
  return {
    AnimatePresence: ({ children }) => children,
    motion: new Proxy({}, { get: (_, tag) => component(tag) }),
  }
})

describe('PaseBayona', () => {
  it('deja únicamente los datos útiles y una nota breve de privacidad', () => {
    render(
      <PaseBayona
        answers={{ goal: '', experience: '', availability: '' }}
        route={null}
        visitType="personalized"
      />,
    )

    const pass = screen.getByRole('article', { name: /pase bayona temporal y anónimo/i })
    expect(pass).toHaveTextContent(/PASE BAYONA/i)
    expect(pass).toHaveTextContent(/VISITANTE · ACCESO TEMPORAL/i)
    expect(pass).toHaveTextContent(/OBJETIVO|EXPERIENCIA|RITMO SEMANAL|RUTA SUGERIDA/i)
    expect(pass).toHaveTextContent(/Este pase es temporal y se borra al salir\. No pedimos cuenta, nombre ni foto\./i)
    // El pase puede mostrar un código visual, pero nunca presentarse como
    // identificador permanente ni prometer persistencia del visitante.
    expect(pass).toHaveTextContent(/NO ES UN IDENTIFICADOR PERMANENTE/i)
    expect(pass).not.toHaveTextContent(/identificador permanente y único|tu código se guarda/i)
  })
})
