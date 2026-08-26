// Test del playground del Design System (ruta interna /design-system, Fase 3).

import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import DesignSystem from './DesignSystem.jsx'

vi.mock('framer-motion', () => {
  const ignoredProps = new Set([
    'initial',
    'animate',
    'exit',
    'transition',
    'layout',
    'whileInView',
    'viewport',
    'variants',
  ])
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
  return render(
    <MemoryRouter>
      <DesignSystem />
    </MemoryRouter>,
  )
}

describe('página DesignSystem (playground interno)', () => {
  it('se presenta como ruta interna, no como contenido público', () => {
    renderPage()

    expect(screen.getByRole('heading', { level: 1, name: 'BAYONA Design System' })).toBeInTheDocument()
    expect(
      screen.getByText('Ruta interna · no indexable · fuera del sitemap'),
    ).toBeInTheDocument()
  })

  it('muestra las nueve secciones del sistema', () => {
    renderPage()

    for (const label of [
      '01 · Color',
      '02 · Superficies',
      '03 · Tipografía',
      '04 · Espaciado',
      '05 · Componentes base',
      '06 · Movimiento',
      '07 · Presets 3D',
      '08 · Escala z-index',
      '09 · Breakpoints',
    ]) {
      expect(screen.getByText(label), label).toBeInTheDocument()
    }
  })

  it('expone los componentes base con sus estados', () => {
    renderPage()

    expect(screen.getByRole('button', { name: 'Acción principal' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Acción secundaria' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Acción mínima' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Bloqueada' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Enviando' })).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('link', { name: 'Como enlace' })).toBeInTheDocument()
  })

  it('vuelca los presets reales del engine (sin datos inventados)', () => {
    renderPage()

    // Cámaras y materiales de scenePresets.js.
    expect(screen.getByText('hero')).toBeInTheDocument()
    expect(screen.getByText('portrait')).toBeInTheDocument()
    expect(screen.getByText('matte')).toBeInTheDocument()
    expect(screen.getByText('accent')).toBeInTheDocument()

    // Niveles de movimiento de motionTokens.js.
    expect(screen.getByText('micro')).toBeInTheDocument()
    expect(screen.getByText('cinematic')).toBeInTheDocument()
  })
})
