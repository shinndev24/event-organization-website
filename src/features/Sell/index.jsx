import './Sell.css'
import { useRef, useEffect } from 'react'
import { sellSteps, servicesPageSections } from '@data/creativeContent.js'

function Sell() {
  const handleSellSubmit = (event) => {
    event.preventDefault()
  }

  const servicesTrackRef = useRef(null)
  const formRef = useRef(null)
  const imageRef = useRef(null)

  const scrollServicesTrack = (direction) => {
    const track = servicesTrackRef.current
    if (!track) return

    const amount = track.clientWidth * 0.72 * direction
    track.scrollBy({ left: amount, behavior: 'smooth' })
  }

  useEffect(() => {
    const adjustImage = () => {
      const formEl = formRef.current
      const imgEl = imageRef.current
      if (!formEl || !imgEl) return
      // limit image height to form height so it never exceeds the form
      imgEl.style.maxHeight = `${formEl.clientHeight}px`
    }

    adjustImage()
    window.addEventListener('resize', adjustImage)
    return () => window.removeEventListener('resize', adjustImage)
  }, [])

  return (
    <section className="sell-section" id="vende">
      <div className="sell-shell">
        <div className="sell-top">
          <div className="sell-image-wrapper">
            <img
              ref={imageRef}
              className="sell-image"
              src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1100&q=80"
              alt="Espacio interior decorado"
            />
          </div>

          <form ref={formRef} className="sell-form" onSubmit={handleSellSubmit}>
            <h2>Cuéntanos tu idea</h2>

            <input type="text" placeholder="Nombre y apellidos" required />
            <input type="email" placeholder="Correo electronico" required />

            <div className="sell-form-row">
              <input type="tel" placeholder="Teléfono" required />
              <input type="text" placeholder="Tipo de proyecto" required />
            </div>

            <p>* Politica de privacidad *</p>
            <p>* Recibir notificaciones *</p>
            <p className="sell-policy-link">(Desplegable) Politica de privacidad(leer)</p>

            <button type="submit">Enviar</button>
          </form>
        </div>

        <section className="sell-process-layout" aria-labelledby="sell-process-title">
          <aside className="sell-process-aside">
            <h2 className="sell-steps-title" id="sell-process-title">Nuestro proceso creativo</h2>
            <p className="sell-process-description">
              Seguimos un proceso creativo estructurado para convertir una idea en una experiencia memorable.<br></br>

              Nuestro enfoque está basado en la profesionalidad y atención personalizada en cada etapa.<br></br>
              
            </p>
            <h3 className="sell-process-related-title">
              <span className="sell-process-related-text">Servicios relacionados</span>
              <span className="sell-process-related-arrow" aria-hidden="true">↓</span>
            </h3>
            <p className="sell-process-description sell-process-related-description">
              Combinamos estrategia, diseño, producción y contenido para que cada proyecto tenga una identidad propia.<br></br>
            </p>
          </aside>

          <div className="sell-steps-grid">
            {sellSteps.map((step) => (
              <article className="sell-step-card" key={step.title}>
                <div className="sell-step-media">
                  <img src={step.image} alt={step.title} loading="lazy" />
                </div>
                <div className="sell-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="related-services">
          <div className="news-template">
            <div className="sell-services-header">
              <h2>Más formas de crear juntos</h2>
            </div>

            <div className="news-template-controls">
              <button type="button" className="news-template-control" onClick={() => scrollServicesTrack(-1)} aria-label="Anterior">←</button>
              <button type="button" className="news-template-control" onClick={() => scrollServicesTrack(1)} aria-label="Siguiente">→</button>
            </div>

            <div className="news-template-carousel" ref={servicesTrackRef} aria-label="Carrusel de servicios">
              {(servicesPageSections.vender || []).map((s) => (
                <article key={s.title} className="news-template-card">
                  <img className="news-template-image" src={s.image} alt={s.title} loading="lazy" />
                  <div className="news-template-copy">
                    <p className="news-template-subtitle">Servicio</p>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Sell
