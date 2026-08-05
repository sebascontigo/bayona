import { useEffect, useRef, useState } from 'react'

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'summary',
  '[role="button"]',
  '[data-cursor]',
].join(',')

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const frameRef = useRef(0)
  const pointerRef = useRef({ x: -40, y: -40, interactive: false, visible: false })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateAvailability = () => setEnabled(finePointer.matches && !reducedMotion.matches)

    updateAvailability()
    finePointer.addEventListener('change', updateAvailability)
    reducedMotion.addEventListener('change', updateAvailability)

    return () => {
      finePointer.removeEventListener('change', updateAvailability)
      reducedMotion.removeEventListener('change', updateAvailability)
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!enabled || !cursor) return undefined

    const renderPointer = () => {
      frameRef.current = 0
      const { x, y, interactive, visible } = pointerRef.current
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
      cursor.style.opacity = visible ? '1' : '0'
      cursor.classList.toggle('is-interactive', interactive)
    }

    const scheduleRender = () => {
      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(renderPointer)
    }

    const handlePointerMove = (event) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        interactive: event.target instanceof Element && Boolean(event.target.closest(INTERACTIVE_SELECTOR)),
        visible: true,
      }
      scheduleRender()
    }

    const hidePointer = () => {
      pointerRef.current.visible = false
      scheduleRender()
    }

    document.documentElement.classList.add('has-custom-cursor')
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('blur', hidePointer)
    document.documentElement.addEventListener('mouseleave', hidePointer)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', hidePointer)
      document.documentElement.removeEventListener('mouseleave', hidePointer)
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
      frameRef.current = 0
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <span ref={cursorRef} className="bayona-cursor" aria-hidden="true">
        <span className="bayona-cursor__ring" />
      </span>
      <style>{`
        html.has-custom-cursor,
        html.has-custom-cursor * {
          cursor: none !important;
        }

        .bayona-cursor {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99999;
          width: 0;
          height: 0;
          opacity: 0;
          pointer-events: none;
          will-change: transform;
          transition: opacity 120ms ease;
        }

        .bayona-cursor__ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 12px;
          height: 12px;
          border: 1px solid #f4a261;
          border-radius: 50%;
          background: rgba(244, 162, 97, 0.2);
          box-shadow: 0 0 14px rgba(244, 162, 97, 0.28);
          transform: translate(-50%, -50%);
          transition: width 180ms ease, height 180ms ease, background-color 180ms ease;
        }

        .bayona-cursor.is-interactive .bayona-cursor__ring {
          width: 28px;
          height: 28px;
          background: rgba(244, 162, 97, 0.1);
        }

        @media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
          .bayona-cursor {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
