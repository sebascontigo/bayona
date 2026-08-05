import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PlanCalculator from './PlanCalculator.jsx'

describe('PlanCalculator', () => {
  it('consume los planes compartidos y actualiza el total y WhatsApp', () => {
    render(<PlanCalculator />)

    expect(screen.getByRole('group', { name: /elige tu plan base/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /añade clases 1:1/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /elige extras/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /RAÍZ.*\$149\.000 COP\/mes/i })).toBeChecked()
    expect(screen.getByRole('radio', { name: /PERFORMANCE.*\$399\.000 COP\/mes/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /ELITE.*\$899\.000 COP\/mes/i })).toBeInTheDocument()

    fireEvent.change(screen.getByRole('combobox', { name: /clase virtual 1:1/i }), { target: { value: '2' } })
    fireEvent.click(screen.getByRole('checkbox', { name: /masaje deportivo en españa/i }))
    fireEvent.click(screen.getByRole('checkbox', { name: /optimización.*biohacking/i }))

    expect(screen.getByText('$349.000 COP')).toBeInTheDocument()
    const whatsapp = screen.getByRole('link', { name: /solicitar confirmación por whatsapp/i })
    const decodedUrl = decodeURIComponent(whatsapp.getAttribute('href'))
    expect(decodedUrl).toContain('Total calculado: $349.000 COP')
    expect(decodedUrl).toContain('Masaje deportivo en España: $80.000')
    expect(decodedUrl).toContain('Sesión de optimización / biohacking: $50.000')
  })

  it('explica disponibilidad presencial y límites de salud sin garantías médicas', () => {
    render(<PlanCalculator />)

    expect(screen.getAllByText(/sujeto a ubicación y disponibilidad/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/sin diagnóstico, cura ni promesas médicas/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/salud, nutrición, recuperación y biohacking es educativa y de bienestar/i)).toBeInTheDocument()
    expect(document.body.textContent).not.toMatch(/devolución|30 días|cura garantizada/i)
  })
})
