import logo from '@assets/logo.png'
import locationIcon from '@assets/ubicacion.png'
import contactIcon from '@assets/contacto.png'
import Footer from '@components/Footer/Footer.jsx'
import '../OfficeLanding.css'
import { useState } from 'react'

function PropertyLanding({ property, returnTo = 'oficina-1', onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const defaultHouseImages = [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1400&q=80',
  ]

  const carouselImages = property.images?.length
    ? property.images
    : [property.image, ...defaultHouseImages].filter(Boolean)

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))
  }

  const handleNavigate = (page) => {
    setMenuOpen(false)
    onNavigate(page)
  }

  const handleBackToOffice = () => {
    onNavigate(returnTo)
  }

  return (
    <main className="office-page property-landing">
      <header className="office-navbar">
        <div className="office-navbar-shell">
          <button
            type="button"
            className="office-back-button"
            onClick={handleBackToOffice}
            aria-label="Volver"
          >
            ← Volver
          </button>

          <a className="office-brand" href="#property" aria-label={property.title}>
            <img className="office-brand-logo" src={logo} alt="Encuentro" />
          </a>

          <button
            type="button"
            className="office-menu-button"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`office-dropdown ${menuOpen ? 'is-open' : ''}`}>
            <a href="#compra" onClick={(event) => { event.preventDefault(); handleNavigate('compra') }}>
              Comprar
            </a>
            <a href="#venta" onClick={(event) => { event.preventDefault(); handleNavigate('venta') }}>
              Vender
            </a>
            <a href="#servicios" onClick={(event) => { event.preventDefault(); handleNavigate('servicios') }}>
              Servicios
            </a>
            <a href="#contacto" onClick={(event) => { event.preventDefault(); handleNavigate('contacto') }}>
              Contacto
            </a>
          </div>
        </div>
      </header>

      <section className="property-hero">
        <div className="property-carousel">
          <img
            className="property-hero-image"
            src={carouselImages[currentImageIndex]}
            alt={`${property.title} - Imagen ${currentImageIndex + 1}`}
          />

          {carouselImages.length > 1 && (
            <>
              <button
                type="button"
                className="carousel-button carousel-button-prev"
                onClick={handlePrevImage}
                aria-label="Imagen anterior"
              >
                ‹
              </button>
              <button
                type="button"
                className="carousel-button carousel-button-next"
                onClick={handleNextImage}
                aria-label="Imagen siguiente"
              >
                ›
              </button>

              <div className="carousel-indicators" role="tablist" aria-label="Selector de imágenes">
                {carouselImages.map((_, index) => (
                  <button
                    key={`property-image-${index}`}
                    type="button"
                    className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="property-content">
        <div className="property-content-shell">
          <div className="property-info-grid">
            <div className="property-main-info">
              <h1>{property.title}</h1>
              <p className="property-subtitle">{property.subtitle}</p>
              <p className="property-description">{property.description}</p>

              <div className="property-details-card">
                <h2>Especificaciones</h2>
                <p>{property.specs}</p>
              </div>

              <button
                type="button"
                className="property-contact-cta"
                onClick={() => handleNavigate('contacto')}
              >
                Solicitar más información
              </button>
            </div>

            <aside className="property-sidebar">
              <div className="property-contact-card">
                <h3>Contactar</h3>
                <div className="property-contact-item">
                  <img className="property-contact-icon" src={locationIcon} alt="" aria-hidden="true" />
                  <span>Ubicación de la oficina</span>
                </div>
                <div className="property-contact-row">
                  <strong>Teléfono:</strong>
                  <span>
                    <img className="property-inline-icon" src={contactIcon} alt="" aria-hidden="true" />
                    +34 999 999 999
                  </span>
                </div>
                <div className="property-contact-row">
                  <strong>Correo:</strong>
                  <span>
                    <img className="property-inline-icon" src={contactIcon} alt="" aria-hidden="true" />
                    correo@correo.es
                  </span>
                </div>
              </div>

              <div className="property-features-card">
                <h3>Características</h3>
                <ul className="property-features-list">
                  <li>Espacio amplio</li>
                  <li>Buena iluminación</li>
                  <li>Parking disponible</li>
                  <li>Acceso inmediato</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default PropertyLanding
