import { useRef, useState, useEffect } from 'react'
import heroImage from '@assets/Inicio.png'
import './Nosotros.css'

const aboutBlocks = [
  {
    title: 'Innovación constante',
    text: 'Primera inmobiliaria que hace posible la reserva de una propiedad totalmente online: iReserva',
  },
  {
    title: 'Metodología única',
    text: 'Fuimos calificados por Idealista como la única inmobiliaria europea que fue capaz de vender una vivienda en plena pandemia, cuando todo el mundo permanecía confinado en sus viviendas, gracias a un proceso digital diseñado para hacer posible lo imposible.',
  },
  {
    title: 'Equipo',
    text: 'Reconocemos el valor de aunar experiencia y juventud, madurez y frescura, paciencia y coraje, vísceras y corazón. No son palabras vacías.',
  },
  {
    title: 'Valores y principios',
    text: 'Nuestra conducta profesional se rige por creencias y convicciones sólidas de honradez, respeto, compromiso, transparencia y verdad.',
  },
]

const pressNotes = [
  {
    title: 'Encuentro refuerza su comunicación social',
    body: 'Presentamos nuevas líneas de comunicación que acercan nuestras historias de impacto, innovación y comunidad a medios nacionales y regionales.',
  },
  {
    title: 'iReserva impulsa la venta digital',
    body: 'Nuestros procesos 100% online han cambiado la forma de comprar con confianza, adaptando el sector a las expectativas de clientes modernos.',
  },
  {
    title: 'Una red con propósito',
    body: 'Más de 25 oficinas trabajan cada día con una agenda social que refuerza la seguridad, el arte y la calidad de vida de su entorno.',
  },
]

const mediaLogos = ['El País', 'Idealista', 'Onda Cero', 'EFE']

const agencySeeds = [
  { city: 'Almagro', address: 'C/ Santa Engracia, 38. Madrid' },
  { city: 'Aluche', address: 'Calle Ocaña, 132, 28047, Madrid' },
  { city: 'Castellana', address: 'Serrano 81, 28006, Madrid' },
  { city: 'Castillejos-C.Caminos', address: 'Calle Lérida, 86, 28020, Madrid' },
  { city: 'Canillejas', address: 'Calle Alcalá 584 ,local 5 28022 Madrid.' },
  { city: 'Embajadores', address: 'Embajadores 114, 28045, Madrid' },
  { city: 'Guindalera', address: 'Calle Cartagena, 49. 28028, Madrid.' },
  { city: 'Las Tablas', address: 'C/ Burguete,2. Madrid' },
  { city: 'Malasaña', address: 'Calle Churruca 18, 28004 Madrid' },
  { city: 'Palacio', address: 'Calle Toledo 82, 28005, Madrid' },
  { city: 'Pradillo', address: 'Calle Pradillo 16 28002, Madrid' },
  { city: 'Pacífico', address: 'Calle Cavanilles 16, 28007, Madrid' },
  { city: 'Puerta del Ángel', address: 'Paseo de Extremadura, 87 28011 Madrid' },
  { city: 'San Pascual', address: 'Calle Aristóteles, 1, 28027, Madrid' },
  { city: 'Urgel', address: 'C/ General Ricardos 95' },
  { city: 'Valdezarza', address: 'C/ Isla de Oza 48' },
  { city: 'Vallecas Casco Histórico', address: 'C/ San Jaime 44' },
  { city: 'Alcobendas', address: 'C/ Constitución 104' },
  { city: 'Boadilla', address: 'Av. Siglo XXI, 18' },
  { city: 'Getafe Centro', address: 'C/ Toledo, 19' },
  { city: 'Majadahonda', address: 'C/ Puerto Rico, 1 C.C. Tutti, L19' },
  { city: 'Las Rozas', address: 'C/ Módena 18' },
  { city: 'Móstoles Centro', address: 'C/ Cartaya 5' },
  { city: 'Móstoles Norte', address: 'C/ Salvador Dalí 3' },
  { city: 'Móstoles Sur', address: 'C/ Plaza del Turia 3' },
  { city: 'Pozuelo', address: 'C. de San Pablo 6, Burgos' },
  { city: 'Rivas-VacíaMadrid', address: 'C/ Silvia Munt 4' },
  { city: 'Sevilla Nervión', address: 'C/ Calle Rico Cejudo 6' },
]

function Nosotros({ officeLandings = [], onNavigate }) {
  const [activeKey, setActiveKey] = useState(null)
  const carouselRef = useRef(null)

  const cards = [
    {
      key: 'agencias',
      title: 'Red de agencias',
      desc: 'Nuestra red crece cada día para acompañar a clientes en toda España con presencia local y capacidad digital.',
      image: 'https://images.unsplash.com/photo-1505691723518-36a3e8c8d7e0?auto=format&fit=crop&w=1200&q=80',
    },
    {
      key: 'prensa',
      title: 'Sala de prensa',
      desc: 'Comunicación estratégica que amplifica nuestra voz y construye confianza con los medios y con el mercado.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    },
    {
      key: 'rsc',
      title: 'Responsabilidad Social Corporativa',
      desc: 'Compromisos reales con personas, seguridad y arte que están alineados con nuestro trabajo diario.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    },
  ]

  const agencyCards = agencySeeds.map((agency, index) => ({
    title: `${agency.city}`,
    address: agency.address,
    page: officeLandings[index % officeLandings.length]?.page || 'oficina-1',
    image: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=640&q=80',
      'https://images.unsplash.com/photo-1560185127-6b6f3b5f2b2e?auto=format&fit=crop&w=640&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=640&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=640&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=640&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=640&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=640&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=640&q=80',
    ][index % 8],
  }))

  const handleToggleCard = (key) => {
    setActiveKey((current) => (current === key ? null : key))
  }

  const scrollPress = (direction) => {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({ left: direction * 340, behavior: 'smooth' })
  }

  const [showPressArrows, setShowPressArrows] = useState(false)

  useEffect(() => {
    if (carouselRef.current && typeof carouselRef.current.scrollBy === 'function') {
      // Defer setState to avoid synchronous state update inside effect
      const id = setTimeout(() => setShowPressArrows(true), 0)
      return () => clearTimeout(id)
    }
  }, [])

  const activeCard = cards.find((item) => item.key === activeKey)

  return (
    <section className="nosotros-page">
      <div className="nosotros-shell container">
        <header className="nosotros-header">
          <img className="nosotros-header-image" src={heroImage} alt="Interior moderno de una vivienda" />
          <div className="nosotros-header-overlay" aria-hidden="true" />
          <div className="nosotros-header-content">
            <h1>Nosotros</h1>
            <p>Individualmente somos excelentes.<br></br> Juntos somos únicos, porque así son nuestros clientes.</p>
          </div>
        </header>

        <section className="nosotros-about">
          <div className="nosotros-about-copy">
            <h2>Quiénes somos</h2>
            <p>En tan sólo diez años hemos conseguido cambiar las reglas del mercado inmobiliario, con hechos:</p>
          </div>

          <div className="nosotros-about-cards">
            {aboutBlocks.map((block) => (
              <article key={block.title} className="nosotros-about-card">
                <h3>{block.title}</h3>
                <p>{block.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="nosotros-hero">
          <div className="nosotros-hero-grid" role="tablist" aria-label="Secciones de Nosotros">
            {cards.map((card) => (
              <button
                key={card.key}
                type="button"
                className={`nosotros-hero-card ${activeKey === card.key ? 'is-active' : ''}`}
                aria-expanded={activeKey === card.key}
                aria-controls="nosotros-detail-content"
                onClick={() => handleToggleCard(card.key)}
              >
                <div className="nosotros-hero-media" style={{ backgroundImage: `url(${card.image})` }} />
                <div className="nosotros-hero-body">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="nosotros-detail" id="nosotros-detail-content" hidden={!activeCard}>
            {activeCard && (
              <div className={`nosotros-detail-inner ${activeCard.key === 'agencias' ? 'no-media' : ''}`}>
                {activeCard.key !== 'agencias' && (
                  <div className="nosotros-detail-media" style={{ backgroundImage: `url(${activeCard.image})` }} />
                )}
                <div className="nosotros-detail-body">
                  <h3>{activeCard.title}</h3>
                  <p>{activeCard.desc}</p>

                  {activeCard.key === 'agencias' && (
                    <>
                      <div className="nosotros-agency-grid">
                        {agencyCards.map((agency) => (
                          <button
                            key={`${agency.title}-${agency.address}`}
                            type="button"
                            className="nosotros-agency-card"
                            onClick={() => onNavigate(agency.page)}
                            aria-label={`Abrir landing de ${agency.title}`}
                          >
                            <div className="nosotros-agency-media">
                              <img src={agency.image} alt={`Oficina ${agency.title}`} loading="lazy" />
                            </div>
                            <div className="nosotros-agency-copy">
                              <h4>{agency.title}</h4>
                              <p>{agency.address}</p>
                            </div>
                            <span className="nosotros-agency-link">Abrir landing</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {activeCard.key === 'prensa' && (
                    <>
                      <div className="nosotros-press-headline">
                        <h4>Sala de prensa</h4>
                        <p>Sabemos de la importancia de la Comunicación.</p>
                      </div>

                      {showPressArrows && (
                        <div className="nosotros-press-carousel-toolbar">
                          <button type="button" onClick={() => scrollPress(-1)} aria-label="Anterior nota de prensa">
                            ‹
                          </button>
                          <button type="button" onClick={() => scrollPress(1)} aria-label="Siguiente nota de prensa">
                            ›
                          </button>
                        </div>
                      )}

                      <div className="nosotros-press-carousel" ref={carouselRef}>
                        {pressNotes.map((note) => (
                          <article key={note.title} className="nosotros-press-card">
                            <h5>{note.title}</h5>
                            <p>{note.body}</p>
                            <a href="#contacto" onClick={(event) => { event.preventDefault(); onNavigate('contacto') }}>
                              Leer más
                            </a>
                          </article>
                        ))}
                      </div>

                      <div className="nosotros-media-logos" aria-label="Apariciones en medios">
                        {mediaLogos.map((logo) => (
                          <div key={logo} className="nosotros-media-logo">
                            {logo}
                          </div>
                        ))}
                      </div>

                      <div className="nosotros-contact-press">
                        <p>¿Eres periodista?</p>
                        <button type="button" onClick={() => onNavigate('contacto')}>
                          Contacto
                        </button>
                      </div>
                    </>
                  )}

                  {activeCard.key === 'rsc' && (
                    <>
                      <div className="nosotros-rsc-section">
                        <h4>Responsabilidad Social Corporativa</h4>
                        <p>Sólo comprometiéndonos con un impacto positivo en nuestra comunidad tiene sentido nuestro trabajo.</p>
                      </div>

                      <div className="nosotros-rsc-grid">
                        <article className="nosotros-rsc-card">
                          <h5>Alianza con CalmTag</h5>
                          <p>
                            Inmobiliarias Encuentro y CalmTag han unido fuerzas para abordar una preocupación fundamental de la sociedad: la seguridad de las personas con Alzheimer en situaciones de riesgo.
                          </p>
                          <p>
                            A través de esta alianza, más de 100 asesores inmobiliarios de nuestra compañía han recibido una formación especializada de CalmTag para identificar y comunicar situaciones de desorientación de vecinos que padecen Alzheimer.
                          </p>
                          <p>
                            Esto nos permitirá ser los primeros en advertir y comunicar tales situaciones, brindando apoyo vital a familiares y servicios de emergencia a través de los dispositivos CalmTag.
                          </p>
                          <p>
                            Además de capacitar a nuestros asesores, hemos convertido todas las oficinas de nuestra Red en Puntos Amigos donde los afectados siempre pueden contar con un sitio seguro para esperar en caso de emergencia.
                          </p>
                        </article>

                        <article className="nosotros-rsc-card">
                          <h5>Encuentro con el Arte</h5>
                          <p>
                            Las obras de arte se ven, se sienten, te gustan o no te gustan… Exactamente lo mismo pasa con las casas; las ves, las sientes, te gustan o no. Todo es cuestión de emociones. ¿Y si unimos ambas emociones en una misma iniciativa?
                          </p>
                          <p>
                            Así nace Encuentro con el Arte, una idea que busca que ambos universos se beneficien de las evidentes sinergias.
                          </p>
                          <ul>
                            <li>
                              Inmobiliarias Encuentro patrocinador oficial del Salón de Otoño del Arte: El Salón de Otoño de la Asociación Española de Pintores y Escultores cuenta ya con 114 años de historia, lo que le convierte en el certamen más antiguo y prestigioso de los que se celebran en España.
                            </li>
                            <li>
                              Exposiciones: Nuestra red de oficinas son galerías de arte permanentes para pintores y escultores. No te pierdas nuestras próximas exposiciones.
                            </li>
                          </ul>
                        </article>
                      </div>
                    </>
                  )}

                  <div className="nosotros-detail-actions">
                    <button type="button" className="nosotros-detail-close" onClick={() => setActiveKey(null)}>
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  )
}

export default Nosotros
