import { useState } from 'react'

export function useBuyFilters() {
  const [selectedAreas, setSelectedAreas] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedMunicipality, setSelectedMunicipality] = useState('')
  const [selectedPropertyType, setSelectedPropertyType] = useState('')
  const [selectedOperationType, setSelectedOperationType] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedBedrooms, setSelectedBedrooms] = useState('')
  const [selectedBathrooms, setSelectedBathrooms] = useState('')
  const [minArea, setMinArea] = useState('')
  const [maxArea, setMaxArea] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [propertyIdQuery, setPropertyIdQuery] = useState('')
  const [labelQuery, setLabelQuery] = useState('')
  const [mapBounds, setMapBounds] = useState(null)
  const [mapPolygons, setMapPolygons] = useState([])

  const addMapPolygon = (poly) => {
    // ensure feature has an id
    const feature = poly && poly.type === 'Feature' ? poly : { type: 'Feature', properties: {}, geometry: poly }
    if (!feature.properties) feature.properties = {}
    if (!feature.properties.id) feature.properties.id = Date.now().toString()
    setMapPolygons((current) => [...current, feature])
  }

  const removeMapPolygon = (id) => {
    setMapPolygons((current) => current.filter((p) => p.properties?.id !== id))
  }

  const handleClearFilters = () => {
    setSelectedProvince('')
    setSelectedMunicipality('')
    setSelectedPropertyType('')
    setSelectedOperationType('')
    setLocationQuery('')
    setSelectedStatus('')
    setSelectedBedrooms('')
    setSelectedBathrooms('')
    setMinArea('')
    setMaxArea('')
    setMinPrice('')
    setMaxPrice('')
    setPropertyIdQuery('')
    setLabelQuery('')
    setSelectedAreas([])
    setMapBounds(null)
    setMapPolygons([])
  }

  const toggleSelectedArea = (area) => {
    if (!area || !area.properties?.id) return

    setSelectedAreas((current) => {
      const exists = current.some((item) => item.properties?.id === area.properties.id)
      if (exists) {
        return current.filter((item) => item.properties?.id !== area.properties.id)
      }

      return [...current, area]
    })
  }

  return {
    filters: {
      selectedAreas,
      mapPolygons,
      mapBounds,
      selectedProvince,
      selectedMunicipality,
      selectedPropertyType,
      selectedOperationType,
      locationQuery,
      selectedStatus,
      selectedBedrooms,
      selectedBathrooms,
      minArea,
      maxArea,
      minPrice,
      maxPrice,
      propertyIdQuery,
      labelQuery,
    },
    setters: {
      setSelectedAreas,
      setSelectedProvince,
      setSelectedMunicipality,
      setSelectedPropertyType,
      setSelectedOperationType,
      setLocationQuery,
      setSelectedStatus,
      setSelectedBedrooms,
      setSelectedBathrooms,
      setMinArea,
      setMaxArea,
      setMinPrice,
      setMaxPrice,
      setPropertyIdQuery,
      setLabelQuery,
      setMapBounds,
      setMapPolygons,
      addMapPolygon,
      removeMapPolygon,
      toggleSelectedArea,
    },
    handleClearFilters,
  }
}
