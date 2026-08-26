import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Checkout from './Checkout.jsx'
import { extraServices, membershipPlans, sessionServices } from '../config/offerings.js'

describe('Checkout', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('deriva planes, cantidades y extras de Commercial_Config y actualiza el total', async () => {
    render(<Checkout />)

    expect(screen.getAllByRole('radio')).toHaveLength(membershipPlans.length)
    expect(screen.getAllByRole('checkbox')).toHaveLength(extraServices.length)

    const virtualQuantity = screen.getByRole('combobox', { name: /clase virtual 1:1/i })
    expect(within(virtualQuantity).getAllByRole('option').map((option) => Number(option.value)))
      .toEqual(sessionServices.find(({ id }) => id === 'virtual-1to1').quantities)

    fireEvent.click(screen.getByRole('radio', { name: /rendimiento/i }))
    fireEvent.change(virtualQuantity, { target: { value: '2' } })
    fireEvent.click(screen.getByRole('checkbox', { name: /masaje deportivo/i }))

    expect(screen.getByText('$649.000 COP')).toBeInTheDocument()
    expect(screen.getByText('≈ €151')).toBeInTheDocument()
    expect(screen.getByText(/Clase virtual 1:1 extra · 2/i)).toBeInTheDocument()
    // La equivalencia EUR detallada se verifica en el test de envío por
    // WhatsApp, único flujo donde el resumen completo está desplegado.
  })

  it('abre una solicitud detallada al WhatsApp oficial sin afirmar transacción ni acceso', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<Checkout />)

    fireEvent.change(screen.getByRole('textbox', { name: /^nombre$/i }), {
      target: { value: 'Ada Lovelace' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /^email$/i }), {
      target: { value: 'ada@example.com' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /^whatsapp$/i }), {
      target: { value: '+34 600 123 456' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: /clase virtual 1:1/i }), {
      target: { value: '2' },
    })
    fireEvent.click(screen.getByRole('checkbox', { name: /masaje deportivo/i }))
    fireEvent.click(screen.getByRole('button', { name: /solicitar detalles por whatsapp/i }))

    expect(openSpy).toHaveBeenCalledTimes(1)
    const [href, target, features] = openSpy.mock.calls[0]
    const url = new URL(href)
    const message = url.searchParams.get('text')

    expect(url.origin).toBe('https://wa.me')
    expect(url.pathname).toBe('/34614988006')
    expect(message).toContain('Nombre: Ada Lovelace')
    expect(message).toContain('Email: ada@example.com')
    expect(message).toContain('WhatsApp: +34 600 123 456')
    expect(message).toContain('Plan base: RAÍZ — $149.000 COP')
    expect(message).toContain('- Clase virtual 1:1 extra: 2 × $35.000')
    expect(message).toContain('- Masaje deportivo: $80.000')
    expect(message).toContain('Mi camino: $299.000 COP (≈ €70 · ≈ $75 USD)')
    expect(message).toContain('no constituye pago, pedido, inscripción, disponibilidad ni acceso confirmados')
    expect(target).toBe('_blank')
    expect(features).toBe('noopener,noreferrer')

    expect(document.querySelector('input[type="password"]')).not.toBeInTheDocument()
    expect(document.body.textContent).not.toMatch(/número de tarjeta|cvv|pagar ahora/i)
  })

  it('resuelve los cuatro planes canónicos de principio a fin: precio real, resumen y contexto correcto de WhatsApp', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    membershipPlans.forEach((plan) => {
      openSpy.mockClear()
      const { unmount } = render(<Checkout />)

      fireEvent.click(screen.getByRole('radio', { name: new RegExp(plan.name, 'i') }))

      const summary = document.querySelector('.order-summary')
      expect(within(summary).getByText(`BAYONA ${plan.name}`)).toBeInTheDocument()
      // Línea de plan mensual y total estimado coinciden sin extras.
      expect(within(summary).getAllByText(`${plan.priceDisplay} COP`).length).toBeGreaterThanOrEqual(2)

      fireEvent.change(screen.getByRole('textbox', { name: /^nombre$/i }), {
        target: { value: 'Persona Test' },
      })
      fireEvent.change(screen.getByRole('textbox', { name: /^email$/i }), {
        target: { value: 'persona@example.com' },
      })
      fireEvent.change(screen.getByRole('textbox', { name: /^whatsapp$/i }), {
        target: { value: '+34 600 123 456' },
      })
      fireEvent.click(screen.getByRole('button', { name: /solicitar detalles por whatsapp/i }))

      expect(openSpy).toHaveBeenCalledTimes(1)
      const url = new URL(openSpy.mock.calls[0][0])
      const message = url.searchParams.get('text')

      expect(url.origin).toBe('https://wa.me')
      expect(url.pathname).toBe('/34614988006')
      expect(message).toContain(`Plan base: ${plan.name} — ${plan.priceDisplay} ${plan.currency}`)
      expect(message).toContain(`Mi camino: ${plan.priceDisplay} COP`)
      expect(message).toContain('no constituye pago, pedido, inscripción, disponibilidad ni acceso confirmados')

      unmount()
    })
  })
})
