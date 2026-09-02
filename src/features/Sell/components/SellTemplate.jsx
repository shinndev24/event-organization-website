import { useState } from 'react'
import logo from '@assets/logo.png'
import heroLocationIcon from '@assets/hero-location.svg'
import heroPhoneIcon from '@assets/hero-phone.svg'
import heroEmailIcon from '@assets/hero-email.svg'
import locationIcon from '@assets/ubicacion.png'
import contactIcon from '@assets/contacto.png'
import Footer from '@components/Footer/Footer.jsx'
import '../OfficeLanding.css'

function SellTemplate({ content, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visibleListings, setVisibleListings] = useState(2)
  const handleSellSubmit = (event) => event.preventDefault()
  const handleNavigate = (page) => {
    setMenuOpen(false)
    onNavigate(page)
  }
  const handleLoadMore = () => {
    setVisibleListings((prev) => prev + 2)
  }
  const handleLoadLess = () => {
    setVisibleListings(2)
  }
  const handlePropertyClick = (property) => {
    onNavigate('selectProperty', { property, returnTo: content.sectionId })
  }

  return (
    <main className="office-page" id={content.sectionId}>
      <header className="office-navbar">
        <div className="office-navbar-shell">
          <a className="office-brand" href={`#${content.sectionId}`} aria-label={content.officeName}>
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
            <a href="#office-listings" onClick={() => setMenuOpen(false)}>
              En venta
            </a>
            <a href="#office-contact" onClick={() => setMenuOpen(false)}>
              Contacto
            </a>
            <a href="#office-about" onClick={() => setMenuOpen(false)}>
              Sobre la oficina
            </a>
          </div>
        </div>
      </header>

      <section className="office-header" id="office-header">
        <div className="office-header-brand">
          <div className="office-header-title-block">
            <p className="office-eyebrow">{content.formTitle}</p>
            <h1>{content.officeName}</h1>
            <div className="office-top-actions">
              <span className="office-top-action">
                <img className="office-top-action-icon" src={heroLocationIcon} alt="" aria-hidden="true" />
                {content.topActions[0].label}
              </span>
              <span className="office-top-action">
                <img className="office-top-action-icon" src={heroPhoneIcon} alt="" aria-hidden="true" />
                {content.topActions[1].label}
              </span>
              <span className="office-top-action">
                <img className="office-top-action-icon" src={heroEmailIcon} alt="" aria-hidden="true" />
                {content.topActions[2].label}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="office-hero">
        <img className="office-hero-image" src={content.heroImage} alt={content.heroAlt} />
      </section>

      <section className="office-listings" id="office-listings">
        <div className="office-listings-shell">
          <h2>{content.sectionTitle}</h2>

          <div className="office-listings-list">
            {content.listings.slice(0, visibleListings).map((listing) => (
              <article className="office-listing-card" key={listing.id}>
                <img className="office-listing-image" src={listing.image} alt={listing.title} loading="lazy" />

                <div className="office-listing-copy">
                  <h3>{listing.title}</h3>
                  <p>{listing.subtitle}</p>
                  <p>{listing.description}</p>
                </div>

                <div className="office-listing-specs" role="button" tabIndex="0" onClick={() => handlePropertyClick(listing)} onKeyDown={(e) => e.key === 'Enter' && handlePropertyClick(listing)} style={{ cursor: 'pointer' }}>{listing.specs}</div>
              </article>
            ))}
          </div>

          {visibleListings < content.listings.length && (
            <button type="button" className="office-load-more" onClick={handleLoadMore}>
              {content.loadMoreLabel}
            </button>
          )}
          {visibleListings >= content.listings.length && visibleListings > 2 && (
            <button type="button" className="office-load-more" onClick={handleLoadLess}>
              Cargar menos
            </button>
          )}
        </div>
      </section>

      <section className="office-info" id="office-contact">
        <div className="office-info-grid">
          <article className="office-contact-card">
            <h3>{content.contactTitle}</h3>
            <div className="office-contact-item office-contact-location">
              <img className="office-contact-icon" src={locationIcon} alt="" aria-hidden="true" />
              <span>{content.contactItems[0].label}</span>
            </div>
            <div className="office-contact-row office-contact-row-iconized">
              <strong>Teléfono:</strong>
              <span>
                <img className="office-inline-icon" src={contactIcon} alt="" aria-hidden="true" />
                {content.contactItems[1].value}
              </span>
            </div>
            <div className="office-contact-row">
              <strong>Correo:</strong>
              <span>
                <img className="office-inline-icon" src={contactIcon} alt="" aria-hidden="true" />
                {content.contactItems[2].value}
              </span>
            </div>
          </article>

          <article className="office-about-card" id="office-about">
            <h3>{content.aboutTitle}</h3>
            <p>{content.aboutText}</p>
          </article>
        </div>
      </section>

      <Footer />

      <form className="office-form-sr-only" onSubmit={handleSellSubmit} aria-hidden="true">
        {content.formRows.map((row) =>
          row.map((field) => (
            <input key={field.id} type={field.type} placeholder={field.placeholder} required={field.required} />
          )),
        )}
      </form>
    </main>
  )
}

export default SellTemplate