import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, MessageCircle, ShoppingCart, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { Toaster } from 'sonner'
import { socialLinks } from '../config/social.config'
import { whatsAppLink } from '../config/site.config.js'
import { resolveProfiles } from '../lib/social/platforms'
import { selectCartCount, useCartStore } from '../store/cartStore.js'
import CartDrawer from './cart/CartDrawer.jsx'
import { sceneBackgroundProps } from './SceneBackground.jsx'
import Glyph from './social/Glyph'
// Import DIRECTO del montador (no el barrel): preserva el code-splitting de R3F.
import { SceneMount } from '../engine/scene/SceneMount.jsx'
// Import DIRECTO del hook (no el barrel): magnetismo del CTA compartido.
import { useMagnetic } from '../engine/hooks/useMagnetic.js'

const MotionLink = motion.create(Link)

/**
 * Arquitectura de navegación (Fase 4).
 *
 * La barra anterior listaba 10 destinos planos con un `slice` frágil y un CTA
 * que llevaba a comprar (/programs). Ahora la navegación declara la estructura
 * real del sitio: cuatro grupos por intención + una sola entrada a recepción.
 *
 * · ENTRENAR    — la oferta de entrenamiento (programas y academia).
 * · EXPERIENCIAS— lo que se vive sin membresía (tienda, app, comunidad).
 * · CONOCER     — la marca (nosotros).
 * · APRENDER    — lo gratuito (recursos, faq).
 * · ENTRAR      — recepción (/onboarding): orienta antes de decidir.
 *
 * Inicio no se repite como enlace de escritorio: la marca ya es el enlace al
 * inicio. En móvil sí aparece explícito y numerado.
 */
const NAV_GROUPS = [
  {
    id: 'entrenar',
    label: 'ENTRENAR',
    links: [
      ['Programas', '/programs'],
      ['Academia Parkour', '/parkour-academy'],
    ],
  },
  {
    id: 'experiencias',
    label: 'EXPERIENCIAS',
    links: [
      ['Tienda', '/shop'],
      ['BAYONA+', '/app'],
      ['Comunidad', '/community'],
    ],
  },
  {
    id: 'conocer',
    label: 'CONOCER',
    links: [
      ['Nosotros', '/about'],
    ],
  },
  {
    id: 'aprender',
    label: 'APRENDER',
    links: [
      ['Recursos', '/resources'],
      ['FAQ', '/faq'],
    ],
  },
]

/** Lista plana del menú móvil: inicio + grupos + entrada, siempre numerada. */
const MOBILE_NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  ...NAV_GROUPS.flatMap((group) => group.links.map(([label, href]) => ({
    label,
    href,
    groupLabel: group.label,
  }))),
  { label: 'ENTRAR A BAYONA', href: '/onboarding', entry: true },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const cartCount = useCartStore(selectCartCount)
  const cartOpen = useCartStore((state) => state.isOpen)
  const setCartOpen = useCartStore((state) => state.setOpen)
  const menuButtonRef = useRef(null)
  const mobileNavRef = useRef(null)
  const close = () => setOpen(false)
  const openCart = () => {
    if (!open) {
      setCartOpen(true)
      return
    }

    setOpen(false)
    window.requestAnimationFrame(() => setCartOpen(true))
  }

  useEffect(() => {
    const updateScrolledState = () => setScrolled(window.scrollY > 24)
    updateScrolledState()
    window.addEventListener('scroll', updateScrolledState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolledState)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => {
      mobileNavRef.current?.querySelector('a')?.focus()
    })

    // Fase 9.0-B (hallazgo del arquitecto): focus TRAP real dentro del menú.
    // El Tab desde el último enlace ya no escapa al contenido oculto detrás
    // del overlay: el ciclo se cierra entre el botón de menú y los enlaces.
    // Infraestructura existente (keydown), 0 dependencias nuevas.
    const FOCUSABLE_SELECTOR =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const trapTabKey = (event) => {
      if (event.key !== 'Tab') return

      // Ciclo REAL de foco del menú abierto: enlaces del panel + botón que
      // lo abre/cierra (que vive en el header, fuera del panel). La
      // depuración en ejecución (f9-trap-debug) mostró que el navegador
      // sigue el orden DOM: tras el último enlace del panel el Tab natural
      // aterriza en elementos del BODY (ancla VER PLANES), no en el botón.
      // Por eso el trap NO asume un "último" del array: captura el Tab
      // siempre que el foco actual NO esté ya en el ciclo, y entonces lo
      // redirige al extremo correcto. Si el foco está dentro del ciclo,
      // el Tab natural entre elementos del ciclo se respeta.
      const panelItems = [
        ...(mobileNavRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []),
      ].filter(Boolean)
      if (panelItems.length === 0) return

      const menuButton = menuButtonRef.current
      const active = document.activeElement
      const lastPanelItem = panelItems[panelItems.length - 1]

      if (event.shiftKey) {
        // Shift+Tab desde el botón del menú: saltar al final del panel (el
        // anterior natural del botón es contenido del body, no el panel).
        if (menuButton && active === menuButton) {
          event.preventDefault()
          lastPanelItem.focus()
          return
        }
        // Shift+Tab con el foco perdido fuera del anillo: volver al botón.
        if (!panelItems.includes(active) && active !== menuButton) {
          event.preventDefault()
          ;(menuButton ?? lastPanelItem).focus()
        }
      } else {
        // Tab desde el último elemento del panel: el siguiente natural en el
        // DOM es contenido del BODY (VER PLANES), no el botón del menú
        // (que está antes del panel). Cerramos el anillo a mano.
        if (active === lastPanelItem) {
          event.preventDefault()
          ;(menuButton ?? panelItems[0]).focus()
          return
        }
        // Tab con el foco perdido fuera del anillo: volver al primer enlace.
        if (!panelItems.includes(active) && active !== menuButton) {
          event.preventDefault()
          panelItems[0].focus()
        }
      }
    }

    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      window.requestAnimationFrame(() => menuButtonRef.current?.focus())
    }

    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('keydown', trapTabKey)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('keydown', trapTabKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <Link className="brand" to="/" onClick={close} aria-label="BAYONA, ir al inicio">
        <span aria-hidden="true">B.</span><strong>BAYONA</strong>
      </Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {NAV_GROUPS.map((group) => (
          <div className="nav-group" role="group" aria-label={group.label} key={group.id}>
            <span className="nav-group-label" aria-hidden="true">{group.label}</span>
            {group.links.map(([label, href]) => <NavLink key={href} to={href}>{label}</NavLink>)}
          </div>
        ))}
      </nav>
      <button
        className="nav-cart-button"
        type="button"
        onClick={openCart}
        aria-label={`Abrir carrito${cartCount > 0 ? `, ${cartCount} ${cartCount === 1 ? 'artículo' : 'artículos'}` : ', vacío'}`}
      >
        <ShoppingCart size={18} strokeWidth={1} aria-hidden="true" />
        <span className="nav-cart-label">Carrito</span>
        <span className="nav-cart-count" aria-hidden="true">{cartCount}</span>
      </button>
      {/*
        El CTA de la barra lleva a recepción, no a comprar: quien entra desde
        cualquier página primero orienta su camino (tres preguntas, sin cuenta)
        y después decide. La compra directa ya vive en Programas y en los planes.
      */}
      <Link className="nav-cta" to="/onboarding" aria-label="Entrar a BAYONA: recepción y orientación">
        Entrar <ArrowUpRight size={15} strokeWidth={1} />
      </Link>
      <button
        ref={menuButtonRef}
        className="menu-button"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls="bayona-mobile-navigation"
      >
        {open ? <X strokeWidth={1} /> : <Menu strokeWidth={1} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            ref={mobileNavRef}
            id="bayona-mobile-navigation"
            className="mobile-nav"
            aria-label="Navegación móvil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>BAYONA / NAVEGACIÓN</p>
            <div>
              {MOBILE_NAV_ITEMS.map((item, index) => (
                <Fragment key={item.href}>
                  {item.groupLabel && item.groupLabel !== MOBILE_NAV_ITEMS[index - 1]?.groupLabel && (
                    <p className="mobile-nav-group-label">{item.groupLabel}</p>
                  )}
                  <NavLink
                    to={item.href}
                    onClick={close}
                    className={item.entry ? 'mobile-nav-entry' : undefined}
                  >
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item.label}
                  </NavLink>
                </Fragment>
              ))}
              <button
                className="mobile-cart-action"
                type="button"
                onClick={openCart}
                aria-label={`Abrir carrito${cartCount > 0 ? `, ${cartCount} ${cartCount === 1 ? 'artículo' : 'artículos'}` : ', vacío'}`}
              >
                <span aria-hidden="true">{String(MOBILE_NAV_ITEMS.length + 1).padStart(2, '0')}</span>
                <span className="mobile-cart-copy">
                  <strong>Carrito</strong>
                  <small>{cartCount > 0 ? `${cartCount} ${cartCount === 1 ? 'artículo' : 'artículos'}` : 'Vacío'}</small>
                </span>
                <ShoppingCart size={22} strokeWidth={1} aria-hidden="true" />
              </button>
            </div>
            <small>Movimiento, ciencia y propósito humano.</small>
          </motion.nav>
        )}
      </AnimatePresence>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <Toaster position="bottom-center" theme="dark" richColors />
    </header>
  )
}

export function Footer() {
  const profiles = useMemo(() => resolveProfiles(socialLinks), [])
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link className="footer-mark" to="/" aria-label="BAYONA, ir al inicio">BAYONA</Link>
        <p>Movimiento, ciencia y propósito humano.</p>
      </div>
      {/*
        El pie repite la arquitectura de la barra (Fase 4): los cuatro grupos
        por intención más el bloque de entrada. El pie anterior solo ofrecía
        cinco enlaces y dejaba fuera la recepción y el canal humano.
      */}
      <div className="footer-columns">
        {NAV_GROUPS.map((group) => (
          <nav className="footer-column" aria-label={`Pie de página: ${group.label}`} key={group.id}>
            <p>{group.label}</p>
            {group.links.map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}
          </nav>
        ))}
        <div className="footer-column footer-entry">
          <p>ENTRAR</p>
          <Link to="/onboarding">ENTRAR A BAYONA</Link>
          <a
            href={whatsAppLink('Hola BAYONA, quiero conocer el camino que mejor encaja conmigo.')}
            target="_blank"
            rel="noreferrer"
          >
            HABLAR POR WHATSAPP
          </a>
        </div>
      </div>
      {profiles.length > 0 && (
        <div className="footer-social" aria-label="Redes BAYONA">
          {profiles.map((profile) => (
            <a key={profile.id} href={profile.url} target="_blank" rel="noreferrer" aria-label={`${profile.verbo} en ${profile.label}`}>
              <Glyph name={profile.glyph} size={16} />
            </a>
          ))}
        </div>
      )}
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} BAYONA</small>
        <small>DISEÑADO PARA AVANZAR</small>
      </div>
    </footer>
  )
}

export function WhatsAppButton() {
  const href = whatsAppLink('Hola BAYONA, quiero conocer el camino que mejor encaja conmigo.')
  return <a className="whatsapp-button" href={href} target="_blank" rel="noreferrer" aria-label="Hablar con BAYONA por WhatsApp"><MessageCircle size={20} strokeWidth={1} /><span>Hablemos</span></a>
}

export function SectionLabel({ children }) {
  return <p className="eyebrow"><span />{children}</p>
}

export function GoldButton({ children, to = '/programs', className = '' }) {
  const { ref, x, y } = useMagnetic()
  return (
    <MotionLink ref={ref} to={to} className={`gold-button ${className}`} style={{ x, y }}>
      {children}
      <ArrowUpRight size={18} strokeWidth={1} />
    </MotionLink>
  )
}

export function PageHero({ title, kicker, media, children, compact = false, scene }) {
  const classes = ['page-hero', compact ? 'compact' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <section className={classes}>
      {scene && <SceneMount config={scene} className="page-hero-canvas" />}
      <div
        {...sceneBackgroundProps(media, {
          className: 'page-hero-backdrop',
          style: { position: 'absolute', inset: 0, zIndex: 0 },
          variant: 'hero',
          motion: true,
        })}
      />
      <div className="page-hero-content" style={{ position: 'relative', zIndex: 1 }}>
        {kicker && <SectionLabel>{kicker}</SectionLabel>}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}
