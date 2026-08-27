// Tests del estado dinamico de scroll del ExperienceProvider (Fase 5):
// velocidad y direccion publicadas como MotionValues en la MISMA suscripcion
// que el progreso, por los dos caminos (Lenis y fallback nativo).

import { render, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Fake de Lenis: captura los handlers del evento `scroll` para poder emitir
// desde el test, y registra las instancias creadas.
vi.mock('lenis', () => {
  class FakeLenis {
    static instances = []

    constructor() {
      this.handlers = {}
      this.progress = 0
      this.destroyed = false
      FakeLenis.instances.push(this)
    }

    on(event, handler) {
      this.handlers[event] = this.handlers[event] ?? []
      this.handlers[event].push(handler)
    }

    off(event, handler) {
      this.handlers[event] = (this.handlers[event] ?? []).filter((h) => h !== handler)
    }

    raf() {}

    destroy() {
      this.destroyed = true
      this.handlers = {}
    }

    emit(event, payload) {
      for (const handler of this.handlers[event] ?? []) handler(payload)
    }
  }

  return { default: FakeLenis }
})

import Lenis from 'lenis'
import { ExperienceProvider, useEngineScroll, useScrollState } from './ExperienceProvider.jsx'

/** Redefine una propiedad de solo lectura del entorno jsdom. */
function defineProp(target, key, value) {
  Object.defineProperty(target, key, { value, configurable: true, writable: true })
}

/** matchMedia a medida: permite simular prefers-reduced-motion por test. */
function mockMatchMedia(reducedMotion) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: reducedMotion && query === '(prefers-reduced-motion: reduce)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

beforeEach(() => {
  Lenis.instances.length = 0
  mockMatchMedia(false)
})

describe('ExperienceProvider — camino Lenis (movimiento normal)', () => {
  it('publica progreso, velocidad y direccion desde el evento de Lenis', () => {
    const { result } = renderHook(() => ({ progress: useEngineScroll(), state: useScrollState() }), {
      wrapper: ExperienceProvider,
    })

    expect(result.current.progress).not.toBeNull()
    expect(result.current.state).not.toBeNull()

    const lenis = Lenis.instances.at(-1)
    expect(lenis).toBeDefined()

    lenis.emit('scroll', { progress: 0.5, velocity: 12.5, direction: 1 })
    expect(result.current.progress.get()).toBe(0.5)
    expect(result.current.state.velocity.get()).toBe(12.5)
    expect(result.current.state.direction.get()).toBe(1)

    lenis.emit('scroll', { progress: 0.7, velocity: -4, direction: -1 })
    expect(result.current.progress.get()).toBe(0.7)
    expect(result.current.state.velocity.get()).toBe(-4)
    expect(result.current.state.direction.get()).toBe(-1)
  })

  it('ignora valores no finitos sin corromper el estado previo', () => {
    const { result } = renderHook(() => ({ progress: useEngineScroll(), state: useScrollState() }), {
      wrapper: ExperienceProvider,
    })

    const lenis = Lenis.instances.at(-1)
    lenis.emit('scroll', { progress: 0.3, velocity: 8, direction: 1 })
    lenis.emit('scroll', { progress: 0.4, velocity: Number.NaN, direction: undefined })

    expect(result.current.progress.get()).toBe(0.4)
    expect(result.current.state.velocity.get()).toBe(8)
    expect(result.current.state.direction.get()).toBe(1)
  })

  it('libera la suscripcion y destruye Lenis al desmontar', () => {
    const { unmount } = renderHook(() => useScrollState(), { wrapper: ExperienceProvider })
    const lenis = Lenis.instances.at(-1)

    expect(lenis.destroyed).toBe(false)
    unmount()
    expect(lenis.destroyed).toBe(true)
  })
})

describe('ExperienceProvider — camino nativo (movimiento reducido)', () => {
  it('no instancia Lenis y deriva velocidad/direccion del scroll nativo', () => {
    mockMatchMedia(true)
    defineProp(window, 'scrollY', 0)
    defineProp(document.documentElement, 'scrollHeight', 1000)
    defineProp(document.documentElement, 'clientHeight', 500)

    const { result } = renderHook(() => ({ progress: useEngineScroll(), state: useScrollState() }), {
      wrapper: ExperienceProvider,
    })

    expect(Lenis.instances).toHaveLength(0)
    expect(result.current.state).not.toBeNull()

    defineProp(window, 'scrollY', 120)
    window.dispatchEvent(new Event('scroll'))

    expect(result.current.progress.get()).toBeCloseTo(0.24)
    expect(result.current.state.velocity.get()).toBe(120)
    expect(result.current.state.direction.get()).toBe(1)

    defineProp(window, 'scrollY', 80)
    window.dispatchEvent(new Event('scroll'))

    expect(result.current.state.velocity.get()).toBe(-40)
    expect(result.current.state.direction.get()).toBe(-1)
  })
})

describe('ExperienceProvider — composicion', () => {
  it('renderiza el contenido dentro de los contextos de scroll', () => {
    const { getByText } = render(<p>contenido de prueba</p>, { wrapper: ExperienceProvider })
    expect(getByText('contenido de prueba')).toBeInTheDocument()
  })
})
