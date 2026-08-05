import { describe, expect, it } from 'vitest'
import {
  buildExperienceWhatsAppUrl,
  calculateExperience,
  COMMERCIAL_SCOPE_NOTICE,
  editorialServices,
  extraServices,
  membershipPlans,
  programAudiences,
  sessionServices,
} from './offerings.js'

describe('configuración compartida de planes y servicios', () => {
  it('publica las tres identidades y precios acordados desde una única fuente', () => {
    expect(membershipPlans.map(({ id, name, priceCop, priceDisplay, eur }) => ({ id, name, priceCop, priceDisplay, eur }))).toEqual([
      { id: 'RAIZ', name: 'RAÍZ', priceCop: 149000, priceDisplay: '$149.000', eur: '≈ €35' },
      { id: 'PERFORMANCE', name: 'PERFORMANCE', priceCop: 399000, priceDisplay: '$399.000', eur: '≈ €93' },
      { id: 'ELITE', name: 'ELITE', priceCop: 899000, priceDisplay: '$899.000', eur: '≈ €209' },
    ])

    expect(JSON.stringify(membershipPlans)).not.toMatch(/FOUNDATIONS|ESSA|para siempre|de por vida/i)
  })

  it('define la categoría Deportistas y sincroniza el catálogo editorial con los servicios calculables', () => {
    expect(programAudiences.find(({ id }) => id === 'deportistas')).toMatchObject({
      title: 'DEPORTISTAS',
      detail: 'OBJETIVO / RENDIMIENTO',
    })
    expect(editorialServices).toEqual([...sessionServices, ...extraServices])
    expect(editorialServices.filter(({ category }) => category === 'DEPORTISTAS').map(({ id }) => id)).toEqual([
      'parkour-tecnico',
      'preparacion-fisica',
    ])
    expect(sessionServices.find(({ id }) => id === 'virtual-1to1')?.quantities).toEqual([0, 1, 2, 4, 8, 12])
    expect(sessionServices.find(({ id }) => id === 'presencial-espana-1to1')?.quantities).toEqual([0, 1, 2, 4])
    expect(extraServices).toHaveLength(7)
  })

  it('genera un enlace específico y correctamente codificado para cada servicio', () => {
    const urls = editorialServices.map((service) => {
      const url = new URL(service.cta)
      expect(url.origin).toBe('https://wa.me')
      expect(url.pathname).toBe('/34614988006')
      expect(url.searchParams.get('text')).toContain(`quiero consultar el servicio ${service.label}`)
      expect(url.searchParams.get('text')).toContain(`Precio publicado: ${service.priceDisplay} COP`)
      if (service.presencial) expect(url.searchParams.get('text')).toContain('Sujeto a ubicación y disponibilidad')
      if (service.healthScope) expect(url.searchParams.get('text')).toContain('sin diagnóstico, cura ni promesas médicas')
      return service.cta
    })

    expect(new Set(urls).size).toBe(editorialServices.length)
    expect(COMMERCIAL_SCOPE_NOTICE).toMatch(/salud, nutrición, recuperación y biohacking/i)
    expect(COMMERCIAL_SCOPE_NOTICE).toMatch(/no ofrece diagnóstico, cura ni promesas médicas/i)
  })
})

describe('cálculo puro de experiencia', () => {
  it('suma el plan, las cantidades y los extras exclusivamente en enteros COP', () => {
    const result = calculateExperience({
      planId: 'RAIZ',
      serviceQuantities: {
        'virtual-1to1': 12,
        'presencial-espana-1to1': 4,
      },
      extraIds: extraServices.map(({ id }) => id),
    })

    expect(result.totalCop).toBe(1149000)
    expect(Number.isInteger(result.totalCop)).toBe(true)
    expect(result.totalDisplay).toBe('$1.149.000')
    expect(result.eurApprox).toBe('≈ €267')
  })

  it('rechaza cantidades que no pertenecen a los selectores publicados', () => {
    expect(() => calculateExperience({
      planId: 'RAIZ',
      serviceQuantities: { 'presencial-espana-1to1': 12 },
    })).toThrow(/Cantidad no permitida/)
  })

  it('rechaza identificadores desconocidos antes de calcular', () => {
    expect(() => calculateExperience({ planId: 'INEXISTENTE' })).toThrow(/Plan desconocido: INEXISTENTE/)
    expect(() => calculateExperience({
      planId: 'RAIZ',
      serviceQuantities: { 'servicio-inexistente': 1 },
    })).toThrow(/Servicio por cantidad desconocido: servicio-inexistente/)
    expect(() => calculateExperience({
      planId: 'RAIZ',
      extraIds: ['extra-inexistente'],
    })).toThrow(/Servicio extra desconocido: extra-inexistente/)
  })

  it('mantiene total entero para todas las combinaciones publicadas de cantidades', () => {
    for (const plan of membershipPlans) {
      for (const virtual of sessionServices[0].quantities) {
        for (const presencial of sessionServices[1].quantities) {
          const result = calculateExperience({
            planId: plan.id,
            serviceQuantities: {
              'virtual-1to1': virtual,
              'presencial-espana-1to1': presencial,
            },
          })
          expect(Number.isInteger(result.totalCop)).toBe(true)
          expect(result.totalCop).toBe(plan.priceCop + virtual * 35000 + presencial * 60000)
        }
      }
    }
  })
})

describe('mensaje WhatsApp de la calculadora', () => {
  it('detalla plan, extras, total y solicita confirmar precio y disponibilidad', () => {
    const decoded = decodeURIComponent(buildExperienceWhatsAppUrl({
      planId: 'PERFORMANCE',
      serviceQuantities: { 'virtual-1to1': 2, 'presencial-espana-1to1': 1 },
      extraIds: ['masaje-deportivo'],
    }))

    expect(decoded).toContain('https://wa.me/34614988006?text=')
    expect(decoded).toContain('Plan base: PERFORMANCE — $399.000 COP/mes')
    expect(decoded).toContain('Clase virtual 1:1: 2 × $35.000')
    expect(decoded).toContain('Masaje deportivo en España: $80.000')
    expect(decoded).toContain('Total calculado: $609.000 COP (≈ €142, equivalencia aproximada no contractual)')
    expect(decoded).toContain('confirmar disponibilidad, ubicación cuando aplique y precio vigente')
  })

  it('incorpora datos mínimos normalizados sin convertir la solicitud en una confirmación', () => {
    const url = new URL(buildExperienceWhatsAppUrl({
      planId: 'RAIZ',
      contact: {
        nombre: '  Ada\nLovelace  ',
        email: 'ada@example.com',
        whatsapp: '+34 600 123 456',
      },
    }))
    const message = url.searchParams.get('text')

    expect(url.origin).toBe('https://wa.me')
    expect(url.pathname).toBe('/34614988006')
    expect(message).toContain('Nombre: Ada Lovelace')
    expect(message).toContain('Email: ada@example.com')
    expect(message).toContain('WhatsApp: +34 600 123 456')
    expect(message).toContain('no constituye pago, pedido, inscripción, disponibilidad ni acceso confirmados')
  })
})
