import { useEffect, useMemo, useRef, useState } from 'react'
import { locationData, operationTypes, propertyTypes } from '@data/siteContent.js'
import './BuyFilters.css'

function BuyFilters({ filters, setters, onClear }) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)

  const suggestions = useMemo(() => {
    if (!filters.locationQuery) return []

    const q = filters.locationQuery.toLowerCase()
    const provs = Object.keys(locationData)
    const matches = []

    for (const prov of provs) {
      if (prov.toLowerCase().includes(q)) matches.push(prov + ', ' + prov)
      const mun = locationData[prov]?.municipalities || []
      for (const m of mun) {
        if (m.toLowerCase().includes(q)) matches.push(m + ', ' + prov)
      }
    }

    return matches.slice(0, 8)
  }, [filters.locationQuery])

  useEffect(() => {
    const outside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('click', outside)
    return () => document.removeEventListener('click', outside)
  }, [])

  const applySuggestion = (val) => {
    setters.setLocationQuery(val)
    setShowSuggestions(false)
  }

  return (
    <div className="buy-search-column compact">
      <h2>Buscar propiedades</h2>
      <p className="muted">Filtra y busca en el mapa</p>

      <div className="buy-search-bar" role="search">
        <div className="input-group location" ref={inputRef}>
          <label className="visually-hidden">Ubicación</label>
          <input
            type="text"
            value={filters.locationQuery}
            onChange={(e) => {
              setters.setLocationQuery(e.target.value)
              setShowSuggestions(true)
            }}
            placeholder="Ciudad, barrio o código postal"
            aria-label="Buscar por ubicación"
            autoComplete="off"
          />

          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions" role="listbox">
              {suggestions.map((s) => (
                <li key={s} onClick={() => applySuggestion(s)} role="option">
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <select
          value={filters.selectedOperationType}
          onChange={(e) => setters.setSelectedOperationType(e.target.value)}
          aria-label="Compra o Alquiler"
        >
          <option value="">Operación</option>
          {operationTypes.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>

        <select
          value={filters.selectedPropertyType}
          onChange={(e) => setters.setSelectedPropertyType(e.target.value)}
          aria-label="Tipo de propiedad"
        >
          <option value="">Tipo</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={filters.selectedBedrooms}
          onChange={(e) => setters.setSelectedBedrooms(e.target.value)}
          aria-label="Dormitorios"
        >
          <option value="">Dorm.</option>
          {[1, 2, 3, 4, 5].map((b) => (
            <option key={b} value={b}>
              {b}+
            </option>
          ))}
        </select>

        <div className="price-group">
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => setters.setMinPrice(e.target.value)}
            placeholder="Precio min"
            aria-label="Precio mínimo"
          />

          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => setters.setMaxPrice(e.target.value)}
            placeholder="Precio max"
            aria-label="Precio máximo"
          />
        </div>

        <div className="actions">
          <button type="button" className="clear" onClick={onClear} aria-label="Limpiar filtros">
            Limpiar
          </button>
          <button type="button" className="search-primary" aria-label="Buscar">
            Buscar
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuyFilters
