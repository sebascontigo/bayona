import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Checkout from './Checkout.jsx'
import { extraServices, membershipPlans, sessionServices } from '../config/offerings.js'

describe('Checkout', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('deriva planes, cantidades y extras de Commercial_Config y actualiza el total', () => {
    render(<Checkout />)

    expect(screen.getAllByRole('radio')).toHaveLength(membershipPlans.length)
    expect(screen.getAllByRole('checkbox')).toHaveLength(extraServices.length)

    const virtualQuantity = screen.getByRole('combobox', { name: /clase virtual 1:1/i })
    expect(within(virtualQuantity).getAllByRole('option').map((option) => Number(option.value)))
      .toEqual(sessionServices.find(({ id }) => id === 'virtual-1to1').quantities)

    fireEvent.click(screen.getByRole('radio', { name: /performance/i }))
    fireEvent.change(virtualQuantity, { target: { value: '2' } })
    fireEvent.click(screen.getByRole('checkbox', { name: /masaje deportivo en españa/i }))

    expect(screen.getByText('$549.000 COP')).toBeInTheDocument()
    expect(screen.getByText('≈ €128')).toBeInTheDocument()
    expect(screen.getByText(/Clase virtual 1:1 · 2/i)).toBeInTheDocument()
    expect(screen.getByText(/equivalencia EUR aproximada y no contractual/i)).toBeInTheDocument()
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
    fireEvent.click(screen.getByRole('checkbox', { name: /masaje deportivo en españa/i }))
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
    expect(message).toContain('Plan base: RAÍZ — $149.000 COP/mes')
    expect(message).toContain('Clase virtual 1:1: 2 × $35.000')
    expect(message).toContain('Masaje deportivo en España: $80.000')
    expect(message).toContain('Total calculado: $299.000 COP (≈ €70, equivalencia aproximada no contractual)')
    expect(message).toContain('no constituye pago, pedido, inscripción, disponibilidad ni acceso confirmados')
    expect(target).toBe('_blank')
    expect(features).toBe('noopener,noreferrer')

    expect(document.querySelector('input[type="password"]')).not.toBeInTheDocument()
    expect(document.body.textContent).not.toMatch(/número de tarjeta|cvv|pagar ahora/i)
  })
})
