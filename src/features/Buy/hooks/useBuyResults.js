import { useMemo } from 'react'
import { booleanPointInPolygon } from '@turf/boolean-point-in-polygon'
import { buyResults } from '../../../data/siteContent.js'

function pointInBounds(point, bounds) {
  if (!bounds) return true
  const { north, south, east, west } = bounds
  const [lng, lat] = point
  return lat <= north && lat >= south && lng <= east && lng >= west
}

export function useBuyResults(filters) {
  const selectedAreas = useMemo(() => filters.selectedAreas || [], [filters.selectedAreas])

  const filteredBuyResults = useMemo(() => {
    let results = buyResults

    if (selectedAreas && selectedAreas.length) {
      results = results.filter((property) =>
        selectedAreas.some((area) =>
          booleanPointInPolygon([property.coordinates.lng, property.coordinates.lat], area),
        ),
      )
    }

    // mapPolygons (drawn areas)
    if (filters.mapPolygons && filters.mapPolygons.length) {
      results = results.filter((property) =>
        filters.mapPolygons.some((poly) =>
          booleanPointInPolygon([property.coordinates.lng, property.coordinates.lat], poly),
        ),
      )
    }

    // bounding box
    if (filters.mapBounds) {
      results = results.filter((property) =>
        pointInBounds([property.coordinates.lng, property.coordinates.lat], filters.mapBounds),
      )
    }

    return results
  }, [filters.mapPolygons, filters.mapBounds, selectedAreas])

  const finalFilteredResults = useMemo(() => {
    let results = filteredBuyResults

    if (filters.selectedProvince) {
      results = results.filter((p) => p.province === filters.selectedProvince)
    }

    if (filters.selectedMunicipality) {
      results = results.filter((p) => p.municipality === filters.selectedMunicipality)
    }

    if (filters.selectedPropertyType) {
      results = results.filter((p) => p.propertyType === filters.selectedPropertyType)
    }

    if (filters.selectedOperationType) {
      results = results.filter((p) => p.operationType === filters.selectedOperationType)
    }

    if (filters.selectedStatus) {
      results = results.filter((p) => p.status === filters.selectedStatus)
    }

    if (filters.selectedBedrooms) {
      results = results.filter((p) => p.bedrooms === Number(filters.selectedBedrooms))
    }

    if (filters.selectedBathrooms) {
      results = results.filter((p) => p.bathrooms === Number(filters.selectedBathrooms))
    }

    if (filters.minArea) {
      results = results.filter((p) => p.areaM2 >= Number(filters.minArea))
    }

    if (filters.maxArea) {
      results = results.filter((p) => p.areaM2 <= Number(filters.maxArea))
    }

    if (filters.minPrice) {
      results = results.filter((p) => p.priceValue >= Number(filters.minPrice))
    }

    if (filters.maxPrice) {
      results = results.filter((p) => p.priceValue <= Number(filters.maxPrice))
    }

    if (filters.propertyIdQuery) {
      const normalizedPropertyId = filters.propertyIdQuery.toLowerCase()
      results = results.filter((p) => p.propertyReference.toLowerCase().includes(normalizedPropertyId))
    }

    if (filters.labelQuery) {
      const normalizedLabel = filters.labelQuery.toLowerCase()
      results = results.filter((p) => p.label.toLowerCase().includes(normalizedLabel))
    }

    if (filters.locationQuery) {
      const normalizedLocation = filters.locationQuery.toLowerCase()
      results = results.filter((p) =>
        [p.subtitle, p.province, p.municipality, p.propertyReference]
          .join(' ')
          .toLowerCase()
          .includes(normalizedLocation),
      )
    }

    return results
  }, [
    filteredBuyResults,
    filters.selectedBathrooms,
    filters.selectedBedrooms,
    filters.selectedMunicipality,
    filters.selectedOperationType,
    filters.selectedPropertyType,
    filters.selectedProvince,
    filters.selectedStatus,
    filters.labelQuery,
    filters.locationQuery,
    filters.maxArea,
    filters.maxPrice,
    filters.minArea,
    filters.minPrice,
    filters.propertyIdQuery,
  ])

  return {
    selectedAreas,
    results: finalFilteredResults,
    totals: {
      total: finalFilteredResults.length,
      perArea: selectedAreas.map((area) => ({
        id: area.properties.id,
        level: area.properties.level,
        name: area.properties.name || area.properties.id,
        count: finalFilteredResults.filter((p) => booleanPointInPolygon([p.coordinates.lng, p.coordinates.lat], area)).length,
      })),
      perPolygon: (filters.mapPolygons || []).map((poly) => ({
        id: poly.properties?.id || null,
        count: finalFilteredResults.filter((p) => booleanPointInPolygon([p.coordinates.lng, p.coordinates.lat], poly)).length,
      })),
    },
  }
}
