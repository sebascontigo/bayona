// Tests de los niveles semanticos de movimiento (Design System, Fase 3).
//
// Los tiers aliasan las claves de motionTokens sin anadir valores nuevos:
// la Property 7 (variants.pbt.test.js) sigue siendo la guardiana de que no
// exista ninguna duracion/curva fuera de motionTokens.

import { describe, expect, it } from 'vitest'

import { distancePx, motionTokens, tierDuration, tierEase } from './motionTokens.js'

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

describe('motionTokens — Fase 5 (curvas narrativas y distancias)', () => {
  it('las tres curvas originales se conservan intactas', () => {
    expect(motionTokens.ease.standard).toEqual([0.4, 0, 0.2, 1])
    expect(motionTokens.ease.entrance).toEqual([0.16, 1, 0.3, 1])
    expect(motionTokens.ease.curtain).toEqual([0.76, 0, 0.24, 1])
  })

  it('anade las curvas de salida, desplazamiento y transformacion', () => {
    expect(motionTokens.ease.exit).toEqual([0.4, 0, 1, 1])
    expect(motionTokens.ease.travel).toEqual([0.45, 0, 0.55, 1])
    expect(motionTokens.ease.transform).toEqual([0.65, 0, 0.35, 1])
  })

  it('toda curva es un cubic-bezier valido de 4 numeros en [0, 1]', () => {
    for (const [name, curve] of Object.entries(motionTokens.ease)) {
      expect(Array.isArray(curve), `ease.${name} es un array`).toBe(true)
      expect(curve, `ease.${name} tiene 4 valores`).toHaveLength(4)
      for (const value of curve) {
        expect(Number.isFinite(value), `ease.${name} finito`).toBe(true)
        expect(value, `ease.${name} en [0,1]`).toBeGreaterThanOrEqual(0)
        expect(value, `ease.${name} en [0,1]`).toBeLessThanOrEqual(1)
      }
    }
  })

  it('la escala de distancias cubre near/medium/far en pixles crecientes', () => {
    const { near, medium, far } = motionTokens.distance
    expect(near).toBe(16)
    expect(medium).toBe(48)
    expect(far).toBe(120)
    expect(near).toBeLessThan(medium)
    expect(medium).toBeLessThan(far)
  })

  it('distancePx resuelve el nivel pedido y degrada a medium', () => {
    expect(distancePx('near')).toBe(motionTokens.distance.near)
    expect(distancePx('medium')).toBe(motionTokens.distance.medium)
    expect(distancePx('far')).toBe(motionTokens.distance.far)
    expect(distancePx('inexistente')).toBe(motionTokens.distance.medium)
    expect(distancePx(undefined)).toBe(motionTokens.distance.medium)
  })
})
