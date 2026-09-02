import { useRef, useState } from 'react'
import './Home.css'

function Home({ heroImage, services = [], serviceSections = {}, onNavigate }) {
  const [activeMode, setActiveMode] = useState('comprar')
  const newsTrackRef = useRef(null)

  const categoryLabels = {
    comprar: 'Experiencias',
    vender: 'Proyectos',
    independiente: 'Estrategia',
  }

  const allServices = Object.entries(serviceSections).flatMap(([category, items]) =>
    (items || []).map((service) => ({
      ...service,
      category,
    })),
  )

  const visibleServices = [...services, ...allServices].filter(
    (service, index, list) => list.findIndex((item) => item.title === service.title) === index,
  )

  const newsItems = [
    {
      title: 'Fiesta de Entrega de Premios',
      subtitle: 'febrero 4, 2025',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=80',
      content:
        'Sigue leyendo',
    },
    {
      title: 'Las ideas que transforman una experiencia',
      subtitle: 'agosto 3, 2022',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80',
      content:
        'Sigue leyendo',
    },
    {
      title: '¿Qué hace memorable a un evento?',
      subtitle: 'septiembre 20, 2022',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
      content:
        'Sigue leyendo',
    },
  ]

  const renderServiceCard = (service) => {
    return (
      <article className="service-summary-card" key={service.title} role="listitem">
        <div className="service-summary-media">
          <img className="service-summary-image" src={service.image} alt={service.title} loading="lazy" />
        </div>
        <div className="service-summary-copy">
          <p className="service-summary-badge">{categoryLabels[service.category] || service.category}</p>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      </article>
    )
  }


  return (
    <>
      <section className="hero" id="inicio-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay" />
        <div className="hero-content container">
          <h1>Imaginamos experiencias que dejan huella</h1>

          <div className="search-panel">
            <div className="search-tabs">
              <button
                type="button"
                className={`search-tab ${activeMode === 'comprar' ? 'is-active' : ''}`}
                onClick={() => setActiveMode('comprar')}
              >
                Quiero vivirlo
              </button>
              <button
                type="button"
                className={`search-tab ${activeMode === 'vender' ? 'is-active' : ''}`}
                onClick={() => setActiveMode('vender')}
              >
                Quiero crearlo
              </button>
            </div>

            <div className="search-row">
              <button type="button" className="search-icon" aria-label="Buscar">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11 4a7 7 0 1 0 4.4 12.4l3.1 3.1 1.4-1.4-3.1-3.1A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
                </svg>
              </button>
              <input type="text" placeholder="Busca una experiencia o lugar..." aria-label="Buscar experiencia o lugar" />
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="servicios">
        <div className="container">
          <h2>NUESTRAS EXPERIENCIAS</h2>

          <div className="services-grid" role="list" aria-label="Servicios que ofrecemos">
            {visibleServices.length > 0 ? (
              visibleServices.map((service) => renderServiceCard(service))
            ) : (
              <p className="services-empty-group">No hay servicios disponibles.</p>
            )}
          </div>

          <div className="services-extra-columns">
            <button
              type="button"
              className="services-extra-button"
              onClick={() => onNavigate?.('franquiciate')}
            >
              ¿Quieres colaborar?
            </button>

            <button
              type="button"
              className="services-extra-button"
              onClick={() => onNavigate?.('unete')}
            >
              Únete a nosotros
            </button>
          </div>
        </div>
      </section>

      <section className="news-template" id="noticias">
        <div className="container">
          <div className="news-template-header">
            <p className="news-template-kicker">Noticias</p>
            <h2>Tablón de noticias</h2>
            <p>Últimas noticias</p>
          </div>

          <div className="news-template-carousel" ref={newsTrackRef} aria-label="Carrusel de noticias">
            {newsItems.slice(0, 3).map((item) => (
              <article className="news-template-card" key={item.title}>
                <img className="news-template-image" src={item.image} alt={item.title} loading="lazy" />
                <div className="news-template-copy">
                  <p className="news-template-subtitle">{item.subtitle}</p>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
