import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Checkout from './Checkout.jsx'
import OrderConfirmation from './OrderConfirmation.jsx'

vi.mock('../components/Layout', () => ({
  SectionLabel: ({ children }) => <p>{children}</p>,
}))

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('flujo de solicitud por WhatsApp', () => {
  it('Checkout solicita únicamente los datos de contacto y el plan, sin campos de tarjeta', () => {
    render(<Checkout />)

    expect(screen.getByRole('textbox', { name: 'Nombre' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'WhatsApp' })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(4)
    expect(screen.queryByText(/número de tarjeta|caducidad|cvc|pago seguro/i)).not.toBeInTheDocument()
  })

  it('Checkout finaliza abriendo WhatsApp con los datos introducidos y sin efectuar cobros', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<Checkout />)

    fireEvent.change(screen.getByRole('textbox', { name: 'Nombre' }), { target: { value: 'Ana Pérez' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'ana@example.com' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'WhatsApp' }), { target: { value: '+34 600 123 456' } })
    fireEvent.click(screen.getByRole('radio', { name: /ELITE/i }))
    fireEvent.click(screen.getByRole('button', { name: /solicitar detalles por whatsapp/i }))

    expect(open).toHaveBeenCalledTimes(1)
    const [url, target, features] = open.mock.calls[0]
    const decodedUrl = decodeURIComponent(url)
    expect(decodedUrl).toContain('https://wa.me/34614988006?text=')
    expect(decodedUrl).toContain('Nombre: Ana Pérez')
    expect(decodedUrl).toContain('Email: ana@example.com')
    expect(decodedUrl).toContain('WhatsApp: +34 600 123 456')
    expect(decodedUrl).toContain('Plan base: ELITE — $899.000 COP/mes')
    expect(target).toBe('_blank')
    expect(features).toBe('noopener,noreferrer')
    expect(screen.getByText(/aquí no se procesa ningún pago/i)).toBeInTheDocument()
  })

  it('OrderConfirmation confirma solo la recepción y deriva la conversación a WhatsApp', () => {
    render(<MemoryRouter><OrderConfirmation /></MemoryRouter>)

    expect(screen.getByRole('heading', { name: /¡recibí tu solicitud!/i })).toBeInTheDocument()
    expect(screen.getByText(/la conversación y la confirmación de los siguientes pasos continúan por WhatsApp/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /revisar en whatsapp/i })).toHaveAttribute('href', expect.stringContaining('https://wa.me/34614988006'))
    expect(screen.queryByText(/pedido confirmado|pago confirmado|enviado.*email/i)).not.toBeInTheDocument()
  })
})
