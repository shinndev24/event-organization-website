import { useState } from 'react'
import './Services.css'
import { serviceAccordionContent } from '@data/creativeContent.js'

function Services({ heroImage, services = [], serviceSections = {}, onNavigate }) {
  const [openGroups, setOpenGroups] = useState({
    comprar: true,
    vender: true,
    independiente: true,
  })
  const [openServiceAccordions, setOpenServiceAccordions] = useState({})

  const visibleServices = services.filter((service, index, list) => list.findIndex((item) => item.title === service.title) === index)

  const groupedSections = {
    comprar: (serviceSections.comprar || visibleServices.filter((service) => service.category === 'comprar')).filter(
      (service, index, list) => list.findIndex((item) => item.title === service.title) === index,
    ),
    vender: (serviceSections.vender || visibleServices.filter((service) => service.category === 'vender')).filter(
      (service, index, list) => list.findIndex((item) => item.title === service.title) === index,
    ),
    independiente: (serviceSections.independiente || visibleServices.filter((service) => service.category === 'independiente')).filter(
      (service, index, list) => list.findIndex((item) => item.title === service.title) === index,
    ),
  }

  const heroImageSource =
    heroImage || groupedSections.comprar[0]?.image || groupedSections.vender[0]?.image || groupedSections.independiente[0]?.image || ''

  const extraServices = [
    { title: '¿Quieres franquiciarte?', target: 'franquiciate' },
    { title: 'Únete a nosotros', target: 'unete' },
  ]

  const categorySections = [
    {
      key: 'comprar',
      eyebrow: 'Compra',
      title: 'Experiencias · formatos asociados',
      accent: 'category-comprar',
      image: groupedSections.comprar[0]?.image,
      items: groupedSections.comprar,
      text: 'Diseñamos experiencias que conectan personas, marcas y comunidades.',
    },
    {
      key: 'vender',
      eyebrow: 'Venta',
      title: 'Proyectos · formatos asociados',
      accent: 'category-vender',
      image: groupedSections.vender[0]?.image,
      items: groupedSections.vender,
      text: 'Convertimos retos creativos en proyectos con ritmo, identidad y resultados.',
    },
    {
      key: 'independiente',
      eyebrow: 'Estrategia',
      title: 'Estrategia · servicio creativo',
      accent: 'category-independiente',
      image: groupedSections.independiente[0]?.image,
      items: groupedSections.independiente,
      text: 'Finmoo es una marca comercial, siendo la empresa GARANTÍA FINANCIERA S.L. la empresa habilitada por el Banco de España para realizar los servicios de intermediación financiera ofrecidos bajo la marca FINMOO.',
    },
  ]

  const toggleGroup = (groupKey) => {
    setOpenGroups((currentGroups) => ({
      ...currentGroups,
      [groupKey]: !currentGroups[groupKey],
    }))
  }

  const handleServiceAccordionToggle = (serviceTitle, blockId, isOpen) => {
    setOpenServiceAccordions((current) => {
      const currentOpenBlockId = current[serviceTitle]

      if (isOpen) {
        return {
          ...current,
          [serviceTitle]: blockId,
        }
      }

      if (currentOpenBlockId !== blockId) {
        return current
      }

      return {
        ...current,
        [serviceTitle]: null,
      }
    })
  }

  const renderServiceCard = (service) => {
    const accordionBlocks = serviceAccordionContent[service.title] || []

    return (
      <article className="service-detail-card" key={service.title}>
        <div className="service-detail-header">
          <div className="service-detail-media">
            <img src={service.image} alt={service.title} loading="lazy" />
          </div>
          <div className="service-detail-copy">
            <p className="service-detail-tag">Servicio</p>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p className="service-detail-expanded">{service.expandedDescription || service.description}</p>
          </div>
        </div>
        <div className="service-detail-accordion-list">
          {accordionBlocks.map((block) => (
            <details
              className="service-detail-accordion"
              key={block.id}
              open={openServiceAccordions[service.title] === block.id}
              onToggle={(event) => handleServiceAccordionToggle(service.title, block.id, event.currentTarget.open)}
            >
              <summary>
                <span className="service-detail-accordion-title">{block.title.replace(/\s*[+-]\s*$/, '')}</span>
                <span className="service-detail-accordion-symbol" aria-hidden="true">
                  {openServiceAccordions[service.title] === block.id ? '-' : '+'}
                </span>
              </summary>
              <div className="service-detail-accordion-body">
                  {block.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
              </div>
            </details>
          ))}
        </div>
      </article>
    )
  }

  return (
    <section className="services-page">
      <section className="services-hero" style={heroImageSource ? { backgroundImage: `url(${heroImageSource})` } : undefined}>
        <div className="services-hero-overlay" />
        <div className="services-hero-content container">
          <p className="services-hero-kicker">Servicios</p>
          <h1>Nuestros servicios</h1>
          <p>
              Ideas que se viven y proyectos que se recuerdan.
          </p>
          
        </div>
      </section>

      <section className="services-main">
        <div className="container services-container">
          <div className="services-intro">
            <h2>Servicios creativos y personalizados</h2>
            <p>Cubrimos cada necesidad antes, durante y después de tu evento o experiencia.<br></br>

              Nuestro enfoque integral asegura que cada etapa del proyecto tenga intención y energía.</p>
          </div>

          <div className="services-groups">
            {categorySections.map((section) => {
              const isOpen = openGroups[section.key]

              return (
                <article
                  key={section.key}
                  className={`services-group-card ${section.key === 'independiente' ? 'services-group-independent' : ''} ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className={`services-group-header ${section.accent}`}
                    aria-expanded={isOpen}
                    onClick={() => toggleGroup(section.key)}
                  >
                    <div className="services-group-header-media">
                      <img src={section.image} alt={section.title} loading="lazy" />
                    </div>
                    <div className="services-group-header-copy">
                      <p className="services-group-eyebrow">{section.eyebrow}</p>
                      <h2 className="services-group-title">{section.title}</h2>
                      <p>{section.text}</p>
                      <span className="services-group-count">{section.items.length} servicios</span>
                    </div>
                    <span className="services-group-chevron" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div className={`services-group-panel ${isOpen ? 'is-open' : ''}`}>
                    <div className="services-service-grid" role="list">
                      {section.items.length > 0 ? (
                        section.items.map((service) => (
                          <div className="services-service-grid-item" role="listitem" key={`${section.key}-${service.title}`}>
                            {renderServiceCard(service)}
                          </div>
                        ))
                      ) : (
                        <p className="services-empty-group">No hay servicios disponibles en esta categoría.</p>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="services-extra-columns">
            {extraServices.map((service) => (
              <button type="button" key={service.title} className="services-extra-button" onClick={() => onNavigate?.(service.target)}>
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}

export default Services
