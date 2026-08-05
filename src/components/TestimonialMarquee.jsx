import '../styles/community-bridges.css'

const DEFAULT_TESTIMONIALS = [
  {
    quote: 'Dejé de entrenar para castigarme. Ahora entreno para sentirme bien. El grupo me enseñó que no estoy solo. La primera vez que compartí un logro, 5 personas me felicitaron. Eso cambió todo.',
    author: 'MARCO, 35 · ESPAÑA',
  },
  {
    quote: 'Mis hijos encontraron pasión en el parkour. Empezaron tímidos. Ahora saltan muros con confianza. La comunidad los acogió desde el día uno.',
    author: 'MAMÁ RUSA · VALENCIA',
  },
  {
    quote: 'A los 50 pensé que era tarde. La comunidad me demostró que no. Cada semana alguien me empujaba un poco más. Hoy me muevo mejor que a los 40.',
    author: 'MARTÍN, 50 · ARGENTINA',
  },
]

export default function TestimonialMarquee({ testimonials = DEFAULT_TESTIMONIALS }) {
  const loop = [...testimonials, ...testimonials]

  return (
    <div className="cb-marquee" role="region" aria-label="Voces de la comunidad" aria-live="off">
      <div className="cb-marquee-track" role="list">
        {loop.map((testimonial, index) => {
          const duplicate = index >= testimonials.length
          const author = testimonial.author ?? testimonial.name

          return (
            <article
              className="cb-testimonial"
              key={`${author}-${index}`}
              role="listitem"
              aria-hidden={duplicate || undefined}
              tabIndex={duplicate ? -1 : 0}
            >
              <span className="cb-testimonial-mark" aria-hidden="true">"</span>
              <p className="cb-testimonial-quote">{testimonial.quote}</p>
              <span className="cb-testimonial-author">{author}</span>
            </article>
          )
        })}
      </div>
    </div>
  )
}
