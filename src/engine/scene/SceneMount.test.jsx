import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SceneMount } from './SceneMount.jsx'

vi.mock('./Scene3D.jsx', () => ({
  Scene3D: ({ eventSource }) => (
    <div
      data-testid="r3f-host"
      data-event-source={eventSource?.dataset.testid ?? ''}
    />
  ),
}))

vi.mock('../hooks/useCapabilities.js', () => ({
  useCapabilities: () => ({
    mode: 'desktop',
    reducedMotion: false,
    canHover: true,
    finePointer: true,
    dprLimit: 2,
  }),
}))

afterEach(cleanup)

describe('SceneMount pointer layering', () => {
  it('conecta R3F al hero padre y habilita puntero detrás de la UI', async () => {
    const { container } = render(
      <section data-testid="hero">
        <SceneMount config={{ variant: 'signature' }} className="test-scene" />
        <a href="/programs">CTA</a>
      </section>,
    )

    const r3fHost = await screen.findByTestId('r3f-host')
    const sceneLayer = container.querySelector('.test-scene')

    expect(r3fHost).toHaveAttribute('data-event-source', 'hero')
    expect(sceneLayer).toHaveStyle({ pointerEvents: 'auto', zIndex: '0' })
    expect(screen.getByRole('link', { name: 'CTA' })).toBeInTheDocument()
  })
})
