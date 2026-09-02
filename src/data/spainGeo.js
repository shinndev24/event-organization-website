import { feature } from 'topojson-client'
import provincesTopo from 'es-atlas/es/provinces.json'
import municipalitiesTopo from 'es-atlas/es/municipalities.json'

function walkCoordinates(coords, callback) {
  if (!Array.isArray(coords)) return

  if (typeof coords[0] === 'number') {
    callback(coords)
    return
  }

  coords.forEach((item) => walkCoordinates(item, callback))
}

function getFeatureBounds(geoFeature) {
  let west = Infinity
  let south = Infinity
  let east = -Infinity
  let north = -Infinity

  walkCoordinates(geoFeature.geometry.coordinates, ([lng, lat]) => {
    west = Math.min(west, lng)
    south = Math.min(south, lat)
    east = Math.max(east, lng)
    north = Math.max(north, lat)
  })

  return { west, south, east, north }
}

function createFeatureId(level, index, name) {
  return `${level}:${index}:${String(name).toLowerCase().replace(/[^a-z0-9]+/gi, '-')}`
}

function normalizeFeature(geoFeature, level, index) {
  const name = geoFeature.properties?.name || `${level}-${index + 1}`
  const bounds = getFeatureBounds(geoFeature)

  return {
    ...geoFeature,
    properties: {
      ...geoFeature.properties,
      id: createFeatureId(level, index, name),
      level,
      name,
      bounds,
    },
  }
}

function toFeatureCollection(topology, objectName, level) {
  const collection = feature(topology, topology.objects[objectName])
  return collection.features.map((geoFeature, index) => normalizeFeature(geoFeature, level, index))
}

function createGridCell(bounds, row, column, rows, columns) {
  const width = (bounds.east - bounds.west) / columns
  const height = (bounds.north - bounds.south) / rows

  const west = bounds.west + column * width
  const east = west + width
  const north = bounds.north - row * height
  const south = north - height

  return {
    type: 'Feature',
    properties: {
      id: `barrio:${row}:${column}:${west.toFixed(3)}:${south.toFixed(3)}`,
      level: 'barrio',
      name: `Barrio ${row + 1}-${column + 1}`,
      bounds: { west, south, east, north },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [west, north],
        [east, north],
        [east, south],
        [west, south],
        [west, north],
      ]],
    },
  }
}

export const provinceAreas = toFeatureCollection(provincesTopo, 'provinces', 'province')
export const municipalityAreas = toFeatureCollection(municipalitiesTopo, 'municipalities', 'municipality')

export function createNeighborhoodAreas(municipalityFeature, rows = 2, columns = 2) {
  const bounds = municipalityFeature.properties?.bounds || getFeatureBounds(municipalityFeature)
  return Array.from({ length: rows * columns }, (_, index) =>
    createGridCell(bounds, Math.floor(index / columns), index % columns, rows, columns),
  )
}

export function boundsIntersect(featureBounds, viewportBounds) {
  if (!featureBounds || !viewportBounds) return true

  const { west, south, east, north } = featureBounds
  const { west: vw, south: vs, east: ve, north: vn } = viewportBounds

  return !(east < vw || west > ve || north < vs || south > vn)
}

export function featureInViewport(feature, viewportBounds) {
  return boundsIntersect(feature.properties?.bounds, viewportBounds)
}
