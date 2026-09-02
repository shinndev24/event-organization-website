import { AreaIcon, BathIcon, BedIcon } from '@components/shared/PropertyIcons.jsx'

const formatArea = (value) => Number(value).toFixed(2)

function BuyResults({ results, selectedAreas = [], totals = {}, selectedProvince, onOpenProperty }) {
  const selectedLabel = selectedAreas.length > 0 ? ` en ${selectedAreas.map((area) => area.properties?.name || area.properties?.id).join(', ')}` : ''

  return (
    <>
      <h3 className="buy-results-title">
        Resultados{selectedLabel}{selectedProvince && ` - ${selectedProvince}`}
      </h3>

      {totals?.total !== undefined && (
        <p className="buy-selection-summary">Propiedades en selección: {totals.total}</p>
      )}

      <div className="buy-results-list">
        {results.map((result) => (
          <article id={`result-${result.id}`} className="buy-result-card" key={result.id}>
            <img src={result.image} alt={result.subtitle} loading="lazy" />

            <div className="buy-result-copy">
              <p className="buy-result-price">{result.title}</p>
              <p className="buy-result-subtitle">{result.subtitle}</p>
              <p className="buy-result-description">{result.description}</p>

              <div className="buy-result-meta" aria-label="Datos del inmueble">
                <span className="buy-meta-item">
                  <span className="buy-meta-icon">
                    <BedIcon />
                  </span>
                  <span>{result.bedrooms}</span>
                </span>

                <span className="buy-meta-item">
                  <span className="buy-meta-icon">
                    <BathIcon />
                  </span>
                  <span>{result.bathrooms}</span>
                </span>

                <span className="buy-meta-item">
                  <span className="buy-meta-icon">
                    <AreaIcon />
                  </span>
                  <span>{formatArea(result.areaM2)} m2</span>
                </span>
              </div>

              <p className="buy-result-type">{result.propertyType}</p>
            </div>

            <a
              href="#property"
              className="buy-result-link"
              onClick={(event) => {
                event.preventDefault()
                onOpenProperty(result)
              }}
            >
              Especificaciones
            </a>
          </article>
        ))}

        {results.length === 0 && (
          <p className="buy-empty-results">No hay inmuebles en esta zona. Prueba con otra selección.</p>
        )}
      </div>
    </>
  )
}

export default BuyResults
