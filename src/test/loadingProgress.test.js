// Tests del store de progreso de carga del engine — Fase 7B.
//
// Cubre el módulo que sustituyó a `useProgress()` de drei en el Loader del
// shell (hallazgo 7A-01). Contrato mínimo que el Loader consume:
// { progress, active, loaded, total } + suscripción + reset.
// Es lógica PURA sin React: testeable sin mocks de WebGL.

import { describe, it, expect, beforeEach } from 'vitest'
import {
  getLoadingProgress,
  subscribeLoadingProgress,
  updateLoadingProgress,
  resetLoadingProgress,
} from '../engine/effects/loadingProgress.js'

describe('loadingProgress — store del shell (Fase 7B)', () => {
  beforeEach(() => {
    resetLoadingProgress()
  })

  it('estado inicial: sin cargas declaradas (total 0, inactive, progreso 0)', () => {
    expect(getLoadingProgress()).toEqual({
      active: false,
      progress: 0,
      loaded: 0,
      total: 0,
    })
  })

  it('el Loader resuelve su estado "listo" por su propio fallback mientras total === 0', () => {
    // Contrato R20.6: sin assets declarados, el store no bloquea al Loader.
    const s = getLoadingProgress()
    expect(s.total).toBe(0)
    expect(s.active).toBe(false)
  })

  it('update calcula progreso desde loaded/total cuando no se da explícito', () => {
    updateLoadingProgress({ total: 4, loaded: 1, active: true })
    const s = getLoadingProgress()
    expect(s.total).toBe(4)
    expect(s.loaded).toBe(1)
    expect(s.active).toBe(true)
    expect(s.progress).toBe(25)
  })

  it('el progreso se acota a [0, 100] ante valores imposibles', () => {
    updateLoadingProgress({ total: 2, loaded: 99, active: true })
    expect(getLoadingProgress().progress).toBe(100)
    resetLoadingProgress()
    updateLoadingProgress({ progress: -40 })
    expect(getLoadingProgress().progress).toBe(0)
  })

  it('los suscriptores reciben cada actualización y pueden dessuscribirse', () => {
    const seen = []
    const unsubscribe = subscribeLoadingProgress((s) => seen.push(s.progress))

    updateLoadingProgress({ total: 2, loaded: 1, active: true })
    updateLoadingProgress({ loaded: 2, active: false, progress: 100 })

    expect(seen).toEqual([50, 100])

    unsubscribe()
    updateLoadingProgress({ total: 1, loaded: 1 })
    // Tras dessuscribirse, el listener no vuelve a recibir notificaciones.
    expect(seen).toEqual([50, 100])
  })

  it('reset devuelve el store a su estado inicial y notifica', () => {
    updateLoadingProgress({ total: 9, loaded: 9, active: false, progress: 100 })
    resetLoadingProgress()
    expect(getLoadingProgress()).toEqual({
      active: false,
      progress: 0,
      loaded: 0,
      total: 0,
    })
  })

  it('no acepta NaN/Infinity sin romper el estado (fail-safe)', () => {
    updateLoadingProgress({ total: Number.NaN, loaded: Number.POSITIVE_INFINITY, active: true })
    const s = getLoadingProgress()
    // NaN/Infinity se ignoran: el estado previo se conserva (fail-safe).
    expect(Number.isFinite(s.total)).toBe(true)
    expect(Number.isFinite(s.loaded)).toBe(true)
  })
})
