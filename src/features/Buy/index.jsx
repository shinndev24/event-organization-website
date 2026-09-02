import './Buy.css'
import buyImage from '@assets/comprar.png'
import BuyFilters from './components/BuyFilters.jsx'
import BuyMap from './components/BuyMap.jsx'
import BuyResults from './components/BuyResults.jsx'
import { useBuyFilters } from './hooks/useBuyFilters.js'
import { useBuyResults } from './hooks/useBuyResults.js'
import { servicesPageSections } from '@data/siteContent.js'

function Buy({ onNavigate }) {
  const { filters, setters, handleClearFilters } = useBuyFilters()
  const { selectedAreas, results, totals } = useBuyResults(filters)

  const handleClearMapSelections = () => {
    setters.setSelectedAreas([])
    setters.setMapPolygons([])
  }

  return (
    <section className="buy-section" id="compra">
      <div className="buy-shell">
        <div className="buy-top">
          <img className="buy-main-image" src={buyImage} alt="Salon moderno" />
          <BuyFilters filters={filters} setters={setters} onClear={handleClearFilters} />
          <BuyMap
            selectedAreas={selectedAreas}
            mapPolygons={filters.mapPolygons}
            onAreaToggle={setters.toggleSelectedArea}
            onClearAreas={handleClearMapSelections}
            onAddMapPolygon={setters.addMapPolygon}
            onSetMapPolygons={setters.setMapPolygons}
            totals={totals}
          />
        </div>

        <BuyResults
          results={results}
          selectedAreas={selectedAreas}
          totals={totals}
          selectedProvince={filters.selectedProvince}
          onOpenProperty={(property) => onNavigate('selectProperty', { property, returnTo: 'compra' })}
        />

        <section className="related-services">
          <div className="buy-services-header">
            <h2>Nuestros servicios de compra</h2>
          </div>

          <div className="news-template">
            <div className="news-template-carousel" aria-label="Carrusel de servicios">
              {(servicesPageSections.comprar || []).map((s) => (
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

export default Buy
