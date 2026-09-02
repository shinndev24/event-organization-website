export default function FranquiciaTestimonials() {
  const testimonials = [
    {
      name: 'Nora Valdés',
      text: '"Llegamos con una idea todavía borrosa y salimos con un evento que tenía ritmo, personalidad y una energía increíble. El equipo entendió lo que queríamos decir y lo convirtió en algo que la gente pudo sentir."',
    },
    {
      name: 'Leo Marín',
      text: '"La dirección artística dio coherencia a cada detalle, desde la invitación hasta la última luz del espacio. Fue una experiencia elegante, cercana y muy nuestra. Todavía seguimos hablando de ella."',
    },
    {
      name: 'Mara Soler',
      text: '"Trabajar con el estudio nos ayudó a lanzar nuestra marca de una forma que no habíamos imaginado. La producción fue impecable y el contenido posterior hizo que el proyecto siguiera vivo mucho después del evento."',
    },
    {
      name: 'Bruno Castaño',
      text: '"Lo mejor fue sentir que formábamos un solo equipo. Hubo creatividad, pero también método, escucha y mucha calma cuando aparecieron imprevistos. El resultado superó todas nuestras expectativas."',
    },
  ]

  return (
    <section className="franquicia-testimonials" id="franquicia-testimonios">
      <h2 className="section-title testimonials-centered">Testimonios</h2>
      <div className="testimonials-grid">
        {testimonials.map((item) => (
          <article className="testimonial-card" key={item.name}>
            <div className="testimonial-media">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80" alt={`Foto de ${item.name}`} loading="lazy" />
            </div>
            <p>{item.text}</p>
            <h4>{item.name}</h4>
          </article>
        ))}
      </div>
    </section>
  )
}
