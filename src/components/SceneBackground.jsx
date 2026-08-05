function cssUrl(value) {
  const escaped = String(value).replace(/(["\\])/g, '\\$1')
  return `url("${escaped}")`
}

/**
 * Attaches a decorative image to an existing element. The image is painted by
 * the `.scene-bg` pseudo-element, so this helper never adds DOM or affects flow.
 */
export function sceneBackgroundProps(media, {
  className = '',
  style,
  variant = 'subtle',
  pseudo = 'before',
  position = 'center',
  opacity,
  overlay,
  blur,
  motion = false,
} = {}) {
  if (!media?.src) return { className, style }

  const classes = [
    className,
    'scene-bg',
    `scene-bg--${variant}`,
    pseudo === 'after' && 'scene-bg--after',
    motion && 'scene-bg--motion',
  ].filter(Boolean).join(' ')

  return {
    className: classes,
    style: {
      '--scene-image': cssUrl(media.src),
      '--scene-position': position,
      ...(opacity == null ? {} : { '--scene-opacity': String(opacity) }),
      ...(overlay == null ? {} : { '--scene-overlay': overlay }),
      ...(blur == null ? {} : { '--scene-blur': typeof blur === 'number' ? `${blur}px` : blur }),
      ...style,
    },
    'data-media-key': media.key,
    'data-media-source': media.source,
    'data-media-role': 'decorative',
  }
}

export function StockImage({
  media,
  className = '',
  priority = false,
  sizes = '(max-width: 680px) 92vw, (max-width: 1100px) 45vw, 28vw',
}) {
  if (!media?.src) return null

  return (
    <img
      className={className}
      src={media.src}
      alt={media.description ?? ''}
      width={media.width ?? 1000}
      height={media.height ?? 1250}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      referrerPolicy="strict-origin-when-cross-origin"
      sizes={sizes}
      data-media-key={media.key}
      data-media-source={media.source}
      data-media-role="product"
    />
  )
}
