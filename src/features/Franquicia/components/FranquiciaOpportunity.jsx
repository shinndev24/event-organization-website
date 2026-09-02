export default function FranquiciaOpportunity() {
  const opportunities = [
    { title: 'Crecimiento', description: 'Un modelo preparado para crecer con proyectos cada vez más ambiciosos.' },
    { title: 'Dirección creativa', description: 'Un equipo de estrategia, producción, diseño y comunicación a tu lado.' },
    { title: 'Formación', description: 'Sesiones prácticas para elevar tu criterio y tu forma de producir.' },
    { title: 'Rentabilidad', description: 'Procesos claros para convertir buenas ideas en proyectos sostenibles.' },
    { title: 'Red de talento', description: 'Conecta con profesionales creativos, técnicos y productores de confianza.' },
    { title: 'Marketing y comunicación', description: 'Contenido y campañas que hacen visible cada experiencia.' },
    { title: 'Marca con personalidad', description: 'Una identidad reconocible para crear proyectos con carácter.' },
    { title: 'Tecnología', description: 'Herramientas colaborativas para organizar ideas, equipos y entregas.' },
    { title: 'Método', description: 'La persona y la idea en el centro de cada proyecto.' },
  ]

  return (
    <section className="franquicia-opportunity">
      <h2 className="section-title">¿Qué ofrecemos?</h2>
      <p className="opportunity-intro">Contarás con el respaldo de una marca reconocida y una red creativa en expansión, con herramientas para hacer realidad tus ideas.</p>
      <div className="opportunity-cards">
        {opportunities.map((opp) => (
          <div className="opportunity-card" key={opp.title}>
            <h3>{opp.title}</h3>
            <p>{opp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
