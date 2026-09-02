export default function FranquiciaOpportunity() {
  const opportunities = [
    { title: 'Crecimiento', description: 'Crecimiento sostenido del 50% anual' },
    { title: 'Consultoría y Asesoramiento', description: 'Equipo de operaciones, franquicias, marketing, comunicación y recursos humanos para hacer frente de manera exitosa a su negocio' },
    { title: 'Formación', description: 'Más de 50 formaciones específicas cada año.' },
    { title: 'Rentabilidad', description: 'Rendimiento medio cercano a los 400.000 euros.' },
    { title: 'Bolsa de contratación', description: 'Contamos con nuestro propio departamento de RRHH para la contratación de profesionales del sector.' },
    { title: 'Marketing y comunicación', description: 'Acciones de marketing y comunicación que suponen cientos de miles de euros cada trimestre en mancha publicitaria.' },
    { title: 'Marca de prestigio', description: 'Encuentro es sinónimo de solidez y éxito en el sector inmobiliario.' },
    { title: 'Tecnología', description: 'CRM altamente eficiente, MVI y las mejores herramientas colaborativas del sector.' },
    { title: 'Metodología', description: 'El franquiciado en el centro de nuestra estrategia.' },
  ]

  return (
    <section className="franquicia-opportunity">
      <h2 className="section-title">¿Qué ofrecemos?</h2>
      <p className="opportunity-intro">En Encuentro, contarás con el respaldo de una marca reconocida y una red en constante expansión, tendrás todas las herramientas necesarias para el éxito.</p>
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
