export default function FranquiciaTestimonials() {
  const testimonials = [
    {
      name: 'Ricardo Ortega San Miguel',
      text: '"Desde que abrí mi franquicia con Inmobiliarias Encuentro, he visto un crecimiento en la rentabilidad que superó mis expectativas. No solo he recuperado mi inversión inicial rápidamente, sino que también he visto una rentabilidad constante y creciente. Sin duda, esta franquicia ha sido una de las mejores decisiones empresariales que he tomado."',
    },
    {
      name: 'Carmen Conde',
      text: '"La formación continua que ofrece Inmobiliarias Encuentro es clave para mantenernos actualizados y eficaces. El método operativo que enseñan no solo es exhaustivo, sino que también se adapta a las tendencias del mercado y a las necesidades cambiantes. Las sesiones de formación periódicas y las actualizaciones constantes en los procedimientos nos permiten optimizar nuestro trabajo y ofrecer un servicio de alta calidad. Este enfoque en la capacitación continua asegura que siempre estemos a la vanguardia y preparados para enfrentar cualquier desafío."',
    },
    {
      name: 'Jose Luis Álvarez',
      text: '"La formación que recibí al unirme a Inmobiliarias Encuentro fue excepcional. Desde el primer momento, el equipo de formación me proporcionó todas las herramientas y conocimientos necesarios para tener éxito en el sector inmobiliario. Las sesiones prácticas, los recursos continuos y el acompañamiento personalizado me han permitido empezar con confianza y operar con eficacia desde el principio. La inversión en formación realmente marca la diferencia."',
    },
    {
      name: 'Itxaso Jareño',
      text: '"Lo que realmente distingue a Inmobiliarias Encuentro es el apoyo constante que brindan a sus franquiciados. Desde el inicio, he recibido una asistencia continua en todas las áreas, desde la gestión diaria hasta la resolución de problemas específicos. Saber que siempre puedo contar con un equipo de expertos dispuestos a ayudarme me ha permitido enfocarme en hacer crecer mi negocio sin preocupaciones. Este respaldo es invaluable y esencial para el éxito"',
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
