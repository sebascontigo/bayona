// Tests de los niveles semanticos de movimiento (Design System, Fase 3).
//
// Los tiers aliasan las claves de motionTokens sin anadir valores nuevos:
// la Property 7 (variants.pbt.test.js) sigue siendo la guardiana de que no
// exista ninguna duracion/curva fuera de motionTokens.

import { describe, expect, it } from 'vitest'

import { motionTokens, tierDuration, tierEase } from './motionTokens.js'

describe('motionTokens — niveles semanticos', () => {
  it('cada tier apunta a una duracion existente (sin valores nuevos)', () => {
    for (const [tier, key] of Object.entries(motionTokens.tier)) {
      expect(Object.keys(motionTokens.duration), `tier ${tier}`).toContain(key)
    }
  })

  it('cubre exactamente los cuatro niveles del sistema', () => {
    expect(Object.keys(motionTokens.tier)).toEqual([
      'micro',
      'standard',
      'emphasis',
      'cinematic',
    ])
  })

  it('tierDuration resuelve la duracion del nivel pedido', () => {
    expect(tierDuration('micro')).toBe(motionTokens.duration.fast)
    expect(tierDuration('standard')).toBe(motionTokens.duration.base)
    expect(tierDuration('emphasis')).toBe(motionTokens.duration.slow)
    expect(tierDuration('cinematic')).toBe(motionTokens.duration.curtain)
  })

  it('tierDuration degrada a base ante un nivel desconocido', () => {
    expect(tierDuration('inexistente')).toBe(motionTokens.duration.base)
    expect(tierDuration(undefined)).toBe(motionTokens.duration.base)
  })

  it('tierEase asigna la curva segun la intencion', () => {
    expect(tierEase('micro')).toEqual(motionTokens.ease.standard)
    expect(tierEase('standard')).toEqual(motionTokens.ease.standard)
    expect(tierEase('emphasis')).toEqual(motionTokens.ease.entrance)
    expect(tierEase('cinematic')).toEqual(motionTokens.ease.curtain)
  })

  it('el conjunto de duraciones sigue cerrado (4 valores, Property 7)', () => {
    expect(Object.keys(motionTokens.duration)).toHaveLength(4)
  })
})
