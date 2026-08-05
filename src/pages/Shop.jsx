import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Fuse from 'fuse.js'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Cpu,
  Download,
  Dumbbell,
  Eye,
  Footprints,
  Leaf,
  MessageCircle,
  Move,
  Package,
  PackageCheck,
  Pill,
  Search,
  Shirt,
  ShoppingCart,
  Sunrise,
  X,
} from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import Marquee from 'react-fast-marquee'
import { toast } from 'sonner'
import { SectionLabel } from '../components/Layout'
import { sceneBackgroundProps, StockImage } from '../components/SceneBackground.jsx'
import VideoSection from '../components/VideoSection.jsx'
import {
  filterShopProducts,
  shopCategoryFilters,
  shopCollectionFilters,
  shopCollections,
  shopProducts,
} from '../config/shopProducts.js'
import { siteMedia } from '../config/siteMedia.js'
import { motionTokens } from '../engine/config/motionTokens.js'
import { useCapabilities } from '../engine/hooks/useCapabilities.js'
import { useCartStore } from '../store/cartStore.js'
import '../styles/shop.css'

const HERO_LINES = ['EQUIPA TU', 'MOVIMIENTO.']
const PRODUCT_COUNT = shopProducts.length
const SHOP_ICONS = Object.freeze({
  cpu: Cpu,
  download: Download,
  dumbbell: Dumbbell,
  footprints: Footprints,
  leaf: Leaf,
  move: Move,
  package: Package,
  pill: Pill,
  shirt: Shirt,
  sunrise: Sunrise,
})

const CART_PRODUCT_VARIANTS = Object.freeze({
  'kettlebell-pro': Object.freeze([
    Object.freeze({ label: '8 kg', priceIndex: 0 }),
    Object.freeze({ label: '24 kg', priceIndex: 1 }),
  ]),
})

const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.035,
    },
  },
}

const heroLetterVariants = {
  hidden: { opacity: 0, y: '0.7em', rotateX: -70 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.58, ease: [0.2, 0.72, 0.2, 1] },
  },
}

function ShopIcon({ name, size = 28, className = '' }) {
  const Icon = SHOP_ICONS[name] ?? Package
  return <Icon className={className} size={size} strokeWidth={1} aria-hidden="true" />
}

function HeroTitle({ reducedMotion }) {
  return (
    <motion.h1
      aria-label="Equipa tu movimiento."
      variants={reducedMotion ? undefined : heroContainerVariants}
      initial={reducedMotion ? false : 'hidden'}
      animate={reducedMotion ? undefined : 'visible'}
    >
      {HERO_LINES.map((line) => (
        <span className="shop-hero-line" key={line} aria-hidden="true">
          {Array.from(line).map((letter, index) => (
            <motion.span
              className={letter === ' ' ? 'is-space' : ''}
              key={`${line}-${index}`}
              variants={reducedMotion ? undefined : heroLetterVariants}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  )
}

function CollectionCard({ collection, active, onSelect, reducedMotion }) {
  return (
    <motion.button
      {...sceneBackgroundProps(collection.media, {
        className: 'shop-collection-card',
        variant: 'subtle',
        pseudo: 'after',
      })}
      data-collection={collection.id}
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(collection.id)}
      whileHover={reducedMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.24 }}
    >
      <span className="shop-collection-card-line" aria-hidden="true" />
      <span className="shop-collection-card-number">{collection.number}</span>
      <span className="shop-collection-card-icon"><ShopIcon name={collection.icon} size={30} /></span>
      <strong>{collection.title}</strong>
      <span className="shop-collection-card-statement">{collection.fullStatement}</span>
      <ArrowRight size={18} strokeWidth={1} aria-hidden="true" />
    </motion.button>
  )
}

function PillGroup({ label, options, value, onChange, getValue = (option) => option, getLabel = (option) => option }) {
  return (
    <div className="shop-pill-group" role="group" aria-label={label}>
      <span>{label}</span>
      <div>
        {options.map((option) => {
          const optionValue = getValue(option)
          return (
            <button
              type="button"
              key={optionValue}
              aria-pressed={value === optionValue}
              onClick={() => onChange(optionValue)}
            >
              {getLabel(option)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function updateCardSpotlight(event) {
  const card = event.currentTarget
  const bounds = card.getBoundingClientRect()
  if (!bounds.width || !bounds.height) return

  const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100))
  const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100))
  card.style.setProperty('--shop-pointer-x', `${x.toFixed(2)}%`)
  card.style.setProperty('--shop-pointer-y', `${y.toFixed(2)}%`)
}

function resetCardSpotlight(event) {
  event.currentTarget.style.removeProperty('--shop-pointer-x')
  event.currentTarget.style.removeProperty('--shop-pointer-y')
}

function ProductCard({ product, reducedMotion }) {
  const { finePointer, mode } = useCapabilities()
  const addItem = useCartStore((state) => state.addItem)
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const pointerEffects = mode === 'desktop' && finePointer && !reducedMotion
  const variantDefinitions = CART_PRODUCT_VARIANTS[product.id] ?? []
  const variantDefinition = variantDefinitions[selectedVariantIndex]
  const selectedVariant = variantDefinition && Array.isArray(product.priceRange)
    ? { ...variantDefinition, priceCOP: product.priceRange[variantDefinition.priceIndex] }
    : null
  const cartPriceCOP = product.priceCop ?? selectedVariant?.priceCOP
  const baseProductName = product.name.replace(/\s*\([^)]*\)\s*$/, '')
  const cartItemName = selectedVariant ? `${baseProductName} — ${selectedVariant.label}` : product.name
  const canAddToCart = Number.isFinite(cartPriceCOP)
  const cartHelpId = `shop-cart-help-${product.id}`
  const previewId = `shop-product-preview-${product.id}`

  const handleAddToCart = () => {
    if (!canAddToCart) return

    addItem({
      type: 'producto',
      name: cartItemName,
      priceCOP: cartPriceCOP,
      qty: 1,
      media: product.media,
      icon: product.icon,
    })
    toast.success('Añadido', { description: `${cartItemName} está en tu carrito.` })
  }

  return (
    <Tilt
      className="shop-product-tilt"
      tiltEnable={pointerEffects}
      tiltMaxAngleX={3}
      tiltMaxAngleY={4}
      scale={pointerEffects ? 1.006 : 1}
      transitionSpeed={pointerEffects ? 1100 : 0}
      glareEnable={pointerEffects}
      glareMaxOpacity={0.055}
      glareColor="#f4a261"
      glarePosition="all"
      glareBorderRadius="0"
    >
      <article
        className={`shop-product-card${previewOpen ? ' is-preview-open' : ''}`}
        data-product-id={product.id}
        onPointerMove={pointerEffects ? updateCardSpotlight : undefined}
        onPointerLeave={pointerEffects ? resetCardSpotlight : undefined}
      >
        <div className="shop-product-visual" id={previewId}>
          {product.media?.src ? (
            <StockImage
              className="shop-product-image stock-media-image"
              media={product.media}
              sizes="(max-width: 699px) 92vw, (max-width: 1079px) 46vw, (max-width: 1499px) 31vw, 24vw"
            />
          ) : (
            <ShopIcon name={product.icon} size={32} />
          )}
          <button
            className="shop-product-preview-toggle"
            type="button"
            aria-expanded={previewOpen}
            aria-controls={previewId}
            aria-label={`${previewOpen ? 'Contraer' : 'Ampliar'} vista de ${product.name}`}
            onClick={() => setPreviewOpen((current) => !current)}
          >
            <Eye size={15} strokeWidth={1.2} aria-hidden="true" />
            <span>{previewOpen ? 'CERRAR' : 'AMPLIAR'}</span>
          </button>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="shop-product-price">
          <strong>{product.priceDisplay}</strong>
          <small>{product.eurDisplay} · {product.usdDisplay}</small>
        </div>
        {variantDefinitions.length > 0 && (
          <label className="shop-product-variant" htmlFor={`shop-cart-variant-${product.id}`}>
            <span>PESO PARA EL CARRITO</span>
            <select
              id={`shop-cart-variant-${product.id}`}
              value={selectedVariantIndex}
              onChange={(event) => setSelectedVariantIndex(Number(event.target.value))}
            >
              {variantDefinitions.map((variant, index) => (
                <option key={variant.label} value={index}>
                  {variant.label} · ${Number(product.priceRange[variant.priceIndex]).toLocaleString('es-CO')} COP
                </option>
              ))}
            </select>
            <small>Los demás pesos y sus precios se confirman por WhatsApp.</small>
          </label>
        )}
        <div className="shop-product-actions">
          <button
            className="shop-add-to-cart"
            type="button"
            disabled={!canAddToCart}
            aria-label={`Añadir ${cartItemName} al carrito`}
            aria-describedby={!canAddToCart ? cartHelpId : undefined}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={15} strokeWidth={1} aria-hidden="true" />
            AÑADIR AL CARRITO
          </button>
          <a
            href={product.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            data-shop-product={product.id}
            aria-label={`Lo quiero: ${product.name}, ${product.priceDisplay}`}
            onClick={() => toast.success(`${product.name}: abrimos WhatsApp para ti.`)}
          >
            LO QUIERO <ArrowUpRight size={16} strokeWidth={1} aria-hidden="true" />
          </a>
        </div>
        {!canAddToCart && (
          <small className="shop-product-cart-note" id={cartHelpId}>
            Elige el peso y confirma el precio publicado por WhatsApp antes de añadirlo.
          </small>
        )}
      </article>
    </Tilt>
  )
}

function updateFeatureParallax(event) {
  const visual = event.currentTarget
  const bounds = visual.getBoundingClientRect()
  if (!bounds.width || !bounds.height) return

  const x = (((event.clientX - bounds.left) / bounds.width) - 0.5) * 12
  const y = (((event.clientY - bounds.top) / bounds.height) - 0.5) * 8
  visual.style.setProperty('--shop-feature-x', `${x.toFixed(2)}px`)
  visual.style.setProperty('--shop-feature-y', `${y.toFixed(2)}px`)
}

function resetFeatureParallax(event) {
  event.currentTarget.style.removeProperty('--shop-feature-x')
  event.currentTarget.style.removeProperty('--shop-feature-y')
}

function FeatureVisual({ product, reducedMotion }) {
  const { finePointer, mode } = useCapabilities()
  const parallaxEnabled = mode === 'desktop' && finePointer && !reducedMotion

  return (
    <div
      className="shop-feature-visual"
      role="presentation"
      onPointerMove={parallaxEnabled ? updateFeatureParallax : undefined}
      onPointerLeave={parallaxEnabled ? resetFeatureParallax : undefined}
    >
      <span className="shop-feature-aura" aria-hidden="true" />
      {product.media?.src ? (
        <StockImage
          className="shop-feature-image stock-media-image"
          media={product.media}
          sizes="(max-width: 699px) 78vw, 46vw"
        />
      ) : (
        <ShopIcon className="shop-feature-icon" name={product.icon} size={32} aria-hidden="true" />
      )}
      <span className="shop-feature-shadow" aria-hidden="true" />
    </div>
  )
}

function ProductGrid({ products, reducedMotion, className = '' }) {
  return (
    <motion.ul
      className={`shop-products-masonry ${className}`.trim()}
      layout={reducedMotion ? false : 'position'}
      transition={{ layout: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } }}
    >
      {products.map((product) => (
        <motion.li
          className={`shop-product-entry is-${product.cardSize}`}
          key={product.id}
          layout={reducedMotion ? false : 'position'}
          transition={{ layout: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } }}
        >
          <ProductCard product={product} reducedMotion={reducedMotion} />
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default function Shop() {
  const [collectionId, setCollectionId] = useState('all')
  const [category, setCategory] = useState('Todo')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef(null)
  const addItem = useCartStore((state) => state.addItem)
  const { reducedMotion } = useCapabilities()
  const featuredProduct = shopProducts.find(({ featured }) => featured) ?? shopProducts[0]
  const fuse = useMemo(() => new Fuse(shopProducts, {
    keys: ['name', 'description', 'category', 'collection', 'collectionTitle'],
    threshold: 0.34,
    distance: 100,
    ignoreLocation: true,
    minMatchCharLength: 2,
  }), [])
  const searchedProducts = useMemo(
    () => query.trim() ? fuse.search(query.trim()).map(({ item }) => item) : shopProducts,
    [fuse, query],
  )
  const visibleProducts = useMemo(
    () => filterShopProducts(searchedProducts, { collectionId, category }),
    [searchedProducts, collectionId, category],
  )
  const groupedProducts = useMemo(
    () => shopCollections.map((collection) => ({
      collection,
      products: visibleProducts.filter((product) => product.collectionId === collection.id),
    })).filter(({ products }) => products.length > 0),
    [visibleProducts],
  )
  const hasFilters = collectionId !== 'all' || category !== 'Todo' || query.trim() !== ''
  const groupedView = collectionId === 'all' && category === 'Todo' && query.trim() === ''

  const scrollToCatalog = () => {
    document.querySelector('#shop-catalog')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const selectCollectionCard = (nextCollectionId) => {
    setCollectionId(nextCollectionId)
    setCategory('Todo')
    window.requestAnimationFrame(scrollToCatalog)
  }

  const selectCategory = (nextCategory) => {
    setCategory(nextCategory)
    if (nextCategory === 'Todo') setCollectionId('all')
  }

  const selectCollectionFilter = (nextCollectionId) => {
    setCollectionId(nextCollectionId)
    if (nextCollectionId === 'all') setCategory('Todo')
  }

  const resetFilters = () => {
    setCollectionId('all')
    setCategory('Todo')
    setQuery('')
    setSearchOpen(false)
  }

  const toggleSearch = () => {
    if (searchOpen && !query) {
      setSearchOpen(false)
      return
    }

    setSearchOpen(true)
    window.requestAnimationFrame(() => searchInputRef.current?.focus())
  }

  const addFeaturedProductToCart = () => {
    if (!Number.isFinite(featuredProduct.priceCop)) return

    addItem({
      type: 'producto',
      name: featuredProduct.name,
      priceCOP: featuredProduct.priceCop,
      qty: 1,
      media: featuredProduct.media,
      icon: featuredProduct.icon,
    })
    toast.success('Añadido', { description: `${featuredProduct.name} está en tu carrito.` })
  }

  return (
    <div className="shop-page" id="shop-top">

      <section
        {...sceneBackgroundProps(siteMedia.shop.hero, {
          className: 'shop-hero',
          variant: 'hero',
          pseudo: 'after',
          motion: true,
        })}
        aria-labelledby="shop-hero-title"
      >
        <div className="shop-hero-content">
          <div id="shop-hero-title"><HeroTitle reducedMotion={reducedMotion} /></div>
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reducedMotion ? 0 : 1.05 }}
          >
            Objetos para entrenar, recuperar y moverte cada día.<br />Elige lo que encaja con tu práctica real.
          </motion.p>
          <motion.a
            className="shop-scroll-indicator"
            href="#shop-collections"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={reducedMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: reducedMotion ? 0 : 1.45 }}
          >
            <span>DESCUBRE TU COLECCIÓN</span>
            <ArrowDown size={16} strokeWidth={1} aria-hidden="true" />
          </motion.a>
        </div>

        <div className="shop-hero-marquee" aria-label="BAYONA, built to move">
          <Marquee autoFill gradient={false} speed={32} pauseOnHover play={!reducedMotion}>
            <span>BAYONA</span><i>•</i><span>BUILT TO MOVE</span><i>•</i>
          </Marquee>
        </div>
      </section>

      <section id="shop-collections" className="shop-collections section-shell" aria-labelledby="shop-collections-title">
        <header className="shop-section-heading">
          <div>
            <SectionLabel>01 / ELIGE TU IDENTIDAD</SectionLabel>
            <h2 id="shop-collections-title">CUATRO CAMINOS.<br /><span>UNA MISMA ACTITUD.</span></h2>
          </div>
          <p>Encuentra la colección que representa quién estás construyendo.</p>
        </header>

        <VideoSection
          title="LA COLECCIÓN"
          subtitle="Sebastián presenta la identidad detrás de cada pieza: movimiento, pertenencia y transformación que puedes llevar contigo."
          poster={siteMedia.shop.collections.movement.src}
          duration="90 SEG"
          placement="contained"
        />

        <div className="shop-collection-cards">
          {shopCollections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              active={collectionId === collection.id}
              onSelect={selectCollectionCard}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </section>

      <motion.section 
        className="shop-feature" 
        aria-labelledby="shop-feature-title"
        initial={reducedMotion ? false : { opacity: 0 }}
        whileInView={reducedMotion ? undefined : { opacity: 1 }}
        viewport={{ 
          once: true, 
          margin: '-100px',
          amount: 0.3 
        }}
        transition={{ 
          duration: 0.8, 
          ease: motionTokens.ease.entrance 
        }}
        onViewportEnter={(entry) => {
          // Eliminar aria-hidden que Framer Motion aplica automáticamente
          if (entry?.target) {
            entry.target.removeAttribute('aria-hidden')
            entry.target.removeAttribute('data-aria-hidden')
          }
        }}
      >
        <FeatureVisual product={featuredProduct} reducedMotion={reducedMotion} />
        <motion.div
          className="shop-feature-copy"
          initial={reducedMotion ? false : { opacity: 0, x: 28 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease.entrance }}
        >
          <SectionLabel>02 / PIEZA DESTACADA</SectionLabel>
          <h2 id="shop-feature-title">{featuredProduct.name}</h2>
          <p>{featuredProduct.description} Una señal de que ya decidiste avanzar.</p>
          <div className="shop-feature-price">
            <strong>{featuredProduct.priceDisplay}</strong>
            <small>{featuredProduct.eurDisplay} · {featuredProduct.usdDisplay}</small>
          </div>
          <div className="shop-feature-actions">
            <button className="shop-add-to-cart" type="button" onClick={addFeaturedProductToCart}>
              <ShoppingCart size={17} strokeWidth={1} aria-hidden="true" />
              AÑADIR AL CARRITO
            </button>
            <motion.a
              href={featuredProduct.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-shop-product={featuredProduct.id}
              whileHover={reducedMotion ? undefined : { x: 5 }}
              onClick={() => toast.success(`${featuredProduct.name}: abrimos WhatsApp para ti.`)}
            >
              LO QUIERO <ArrowUpRight size={18} strokeWidth={1} aria-hidden="true" />
            </motion.a>
          </div>
          <small className="shop-feature-note">La pieza que marca el inicio.</small>
        </motion.div>
      </motion.section>

      <section id="shop-catalog" className="shop-catalog section-shell" aria-labelledby="shop-catalog-title">
        <header className="shop-catalog-intro">
          <div>
            <SectionLabel>03 / BAYONA COLLECTION</SectionLabel>
            <h2 id="shop-catalog-title">ENCUENTRA LO<br /><span>QUE TE REPRESENTA.</span></h2>
          </div>
          <p>{PRODUCT_COUNT} piezas. Una decisión: llevar tu transformación contigo.</p>
        </header>

        <div className="shop-filter-bar">
          <PillGroup
            label="Por categoría"
            options={shopCategoryFilters}
            value={category}
            onChange={selectCategory}
          />
          <PillGroup
            label="Por colección"
            options={shopCollectionFilters}
            value={collectionId}
            onChange={selectCollectionFilter}
            getValue={(option) => option.id}
            getLabel={(option) => option.label}
          />

          <div className={`shop-search-box${searchOpen ? ' is-open' : ''}`} role="search">
            <button
              type="button"
              className="shop-search-toggle"
              aria-label={searchOpen ? 'Enfocar búsqueda de productos' : 'Abrir búsqueda de productos'}
              aria-expanded={searchOpen}
              onClick={toggleSearch}
            >
              <Search size={18} strokeWidth={1} aria-hidden="true" />
            </button>
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar producto..."
              aria-label="Buscar producto"
              tabIndex={searchOpen ? 0 : -1}
            />
            {searchOpen && query && (
              <button type="button" className="shop-search-clear" aria-label="Limpiar búsqueda" onClick={() => setQuery('')}>
                <X size={15} strokeWidth={1} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="shop-filter-meta" aria-live="polite">
            <span>{visibleProducts.length} {visibleProducts.length === 1 ? 'producto' : 'productos'}</span>
            {hasFilters && <button type="button" onClick={resetFilters}>Limpiar filtros</button>}
          </div>
        </div>

        {visibleProducts.length > 0 ? (
          groupedView ? (
            <div className="shop-collection-groups">
              {groupedProducts.map(({ collection, products }) => (
                <section className="shop-product-collection" key={collection.id} aria-labelledby={`collection-${collection.id}-title`}>
                  <header className="shop-product-collection-heading">
                    <span><ShopIcon name={collection.icon} size={28} /></span>
                    <div>
                      <h3 id={`collection-${collection.id}-title`}>{collection.title}</h3>
                      <p>{collection.statement}</p>
                    </div>
                    <button type="button" onClick={() => selectCollectionCard(collection.id)}>
                      VER TODO <ArrowRight size={15} strokeWidth={1} aria-hidden="true" />
                    </button>
                  </header>
                  <ProductGrid products={products} reducedMotion={reducedMotion} />
                </section>
              ))}
            </div>
          ) : (
            <div className="shop-flat-results">
              <ProductGrid products={visibleProducts} reducedMotion={reducedMotion} className="is-flat" />
            </div>
          )
        ) : (
          <div className="shop-empty" role="status">
            <strong>NO ENCONTRAMOS ESA PIEZA.</strong>
            <p>Prueba otra palabra o vuelve a la colección completa.</p>
            <button type="button" onClick={resetFilters}>VER LOS {PRODUCT_COUNT} PRODUCTOS</button>
          </div>
        )}
      </section>

      <section className="shop-process section-shell" aria-labelledby="shop-process-title">
        <SectionLabel>04 / CÓMO COMPRAR</SectionLabel>
        <h2 id="shop-process-title">SIMPLE. RÁPIDO.<br /><span>TUYO.</span></h2>
        <div className="shop-process-flow">
          <div><Eye size={28} strokeWidth={1} aria-hidden="true" /><strong>ELIGE</strong></div>
          <ChevronRight size={20} strokeWidth={1} aria-hidden="true" />
          <div><MessageCircle size={28} strokeWidth={1} aria-hidden="true" /><strong>CONTACTA</strong></div>
          <ChevronRight size={20} strokeWidth={1} aria-hidden="true" />
          <div><PackageCheck size={28} strokeWidth={1} aria-hidden="true" /><strong>RECIBE</strong></div>
        </div>
        <p>Eliges, escribes por WhatsApp y confirmamos disponibilidad, talla y envío.</p>
      </section>

      <aside className="shop-commercial-note section-shell" aria-label="Información comercial">
        Precios publicados en COP. Disponibilidad, variantes, envío y condiciones finales se coordinan por WhatsApp.
      </aside>

      <aside className="shop-training-bridge section-shell" aria-label="Enlace a programas de entrenamiento">
        <p>¿BUSCAS ENTRENAMIENTO?</p>
        <Link to="/programs">VER PROGRAMAS <ArrowUpRight size={16} strokeWidth={1} aria-hidden="true" /></Link>
      </aside>

    </div>
  )
}
