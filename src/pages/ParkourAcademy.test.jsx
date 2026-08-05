import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCartStore } from '../store/cartStore.js'
import ParkourAcademy from './ParkourAcademy.jsx'

vi.mock('../components/Layout.jsx', () => ({
  SectionLabel: ({ children }) => <p>{children}</p>,
}))

vi.mock('../components/SceneBackground.jsx', () => ({
  sceneBackgroundProps: (_, props) => props,
}))

describe('Parkour Academy — precios de pre-lanzamiento', () => {
  beforeEach(() => {
    useCartStore.getState().clear()
    useCartStore.getState().setOpen(false)
  })

  it('publica membresías, clases sueltas y permite añadir una clase al carrito', () => {
    render(<MemoryRouter><ParkourAcademy /></MemoryRouter>)

    expect(screen.getByText('MEMBRESÍAS PARKOUR')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /TRES RITMOS\. UN MISMO MÉTODO/i })).toBeInTheDocument()
    expect(screen.getByText('$220.000 COP/mes')).toBeInTheDocument()
    expect(screen.getByText('$400.000 COP/mes')).toBeInTheDocument()
    expect(screen.getByText('$550.000 COP/mes')).toBeInTheDocument()
    expect(screen.getByText('$60.000 COP/sesión')).toBeInTheDocument()
    expect(screen.getByText('$90.000 COP/sesión')).toBeInTheDocument()
    expect(screen.getByText('$35.000 COP/sesión')).toBeInTheDocument()
    expect(screen.getByText(/sede y horarios por confirmar/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /añadir clase parkour 1:1 virtual al carrito/i }))

    expect(useCartStore.getState()).toMatchObject({ isOpen: true })
    expect(useCartStore.getState().items).toEqual([
      expect.objectContaining({
        type: 'servicio',
        name: 'Clase parkour 1:1 virtual',
        priceCOP: 60000,
      }),
    ])
  })
})
