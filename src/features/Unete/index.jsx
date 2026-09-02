import heroImage from '@assets/Inicio.png'
import './Unete.css'

function Unete() {
  const benefits = [
    {
      title: 'Dptos a tu servicio',
    },
    {
      title: 'Formación constante',
    },
    {
      title: 'RSC',
    },
    {
      title: 'Marca que impulsa',
    },
    {
      title: 'Inversión con método',
    },
    {
      title: 'Menos riesgo, más garantías',
    },
    {
      title: 'Pioneros en IA',
      description: 'Una apuesta que nos permite operar de forma más inteligente, rápida y precisa, ofreciendo a nuestros franquiciados una clara ventaja competitiva.'
    },
    {
      title: 'Departamentos a tu servicio',
      description: ' Contamos con departamentos como RRHH, Marketing, Jurídico, Expansión, Comercial y otros más que estarán a tu servicio en cualquier momento que necesites.'
    },
    {
      title: 'Responsabilidad Social Corporativa',
      description: ' Tenemos acciones de RSC como, encuentro con el arte o la alianza con CalmTag. También tenemos asesores formados para ayudar a personas con Alzheimer y sus familias.',
    },
  ]

  return (
    <section className="unete-page">
      <div className="unete-container">
        <div className="unete-header">
          <img className="unete-header-image" src={heroImage} alt="Interior moderno de una vivienda" />
          <div className="unete-header-overlay" aria-hidden="true" />
          <div className="unete-header-content">
            <h1>Por qué nuestra inmobiliaria</h1>
            <p>
              Somos más que una inmobiliaria; somos tu asesor.<br></br>
              Hoy por ti, mañana también.
            </p>
          </div>
        </div>

        {/* show detailed benefit cards (those with descriptions) above the main "Por qué unirse" grid */}
        {benefits.filter((b) => b.description).length > 0 && (
          <div className="unete-detailed">
            <div className="benefits-grid">
              {benefits.filter((b) => b.description).map((benefit) => (
                <article className="benefit-card" key={`d-${benefit.title}`}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="unete-benefits">
          <h2>Por qué unirse</h2>
          <div className="benefits-grid">
            {benefits.filter((b) => !b.description).map((benefit) => (
              <article className="benefit-card" key={`s-${benefit.title}`}>
                <h3>{benefit.title}</h3>
              </article>
            ))}
          </div>
        </div>

        <div className="unete-cta">
          <h2>¿Listo para empezar?</h2>
          <p>Completa el siguiente formulario y nos pondremos en contacto pronto.</p>
          <form className="unete-form">
            <div className="form-group">
              <input type="text" placeholder="Nombre y apellidos" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Correo electrónico" required />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Teléfono" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Cuéntanos sobre ti..." required rows="4"></textarea>
            </div>
            <button type="submit" className="submit-button">Enviar Solicitud</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Unete
