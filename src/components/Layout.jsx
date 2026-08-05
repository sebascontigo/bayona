import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, MessageCircle, ShoppingCart, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { Toaster } from 'sonner'
import { socialLinks } from '../config/social.config'
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

const links = [
  ['Inicio', '/'], ['Nosotros', '/about'], ['Programas', '/programs'], ['Academia Parkour', '/parkour-academy'],
  ['Tienda', '/shop'], ['App', '/app'], ['Comunidad', '/community'], ['Recursos', '/resources'],
  ['ENTRAR A BAYONA', '/onboarding'],
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
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      window.requestAnimationFrame(() => menuButtonRef.current?.focus())
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <Link className="brand" to="/" onClick={close} aria-label="BAYONA, ir al inicio">
        <span aria-hidden="true">B.</span><strong>BAYONA</strong>
      </Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.slice(0, -1).map(([label, href]) => <NavLink key={href} to={href}>{label}</NavLink>)}
        <NavLink to="/faq">FAQ</NavLink>
        {links.slice(-1).map(([label, href]) => <NavLink key={href} to={href}>{label}</NavLink>)}
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
      <Link className="nav-cta" to="/programs">Tu camino <ArrowUpRight size={15} strokeWidth={1} /></Link>
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
              {links.map(([label, href], index) => (
                <NavLink key={href} to={href} onClick={close}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{label}
                </NavLink>
              ))}
              <Link to="/faq" onClick={close}>
                <span aria-hidden="true">{String(links.length + 1).padStart(2, '0')}</span>
                Preguntas frecuentes
              </Link>
              <button
                className="mobile-cart-action"
                type="button"
                onClick={openCart}
                aria-label={`Abrir carrito${cartCount > 0 ? `, ${cartCount} ${cartCount === 1 ? 'artículo' : 'artículos'}` : ', vacío'}`}
              >
                <span aria-hidden="true">{String(links.length + 2).padStart(2, '0')}</span>
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
      <nav className="footer-links" aria-label="Enlaces del pie de página">
        <Link to="/about">Nosotros</Link>
        <Link to="/programs">Programas</Link>
        <Link to="/shop">Tienda</Link>
        <Link to="/resources">Recursos</Link>
        <Link to="/faq">FAQ</Link>
      </nav>
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
  const message = encodeURIComponent('Hola BAYONA, quiero conocer el camino que mejor encaja conmigo.')
  return <a className="whatsapp-button" href={`https://wa.me/34614988006?text=${message}`} target="_blank" rel="noreferrer" aria-label="Hablar con BAYONA por WhatsApp"><MessageCircle size={20} strokeWidth={1} /><span>Hablemos</span></a>
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
