import { useEffect, useMemo, useRef, useState } from 'react'
import { GeoJSON, MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import MapSizeSync from '@components/shared/MapSizeSync.jsx'
import { spainBounds } from '@data/siteContent.js'
import { boundsIntersect, municipalityAreas, provinceAreas } from '@data/spainGeo.js'

function MapStateSync({ onZoomChange, onBoundsChange }) {
  const map = useMap()

  useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom())
      const bounds = map.getBounds()
      onBoundsChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      })
    },
    moveend: () => {
      const bounds = map.getBounds()
      onBoundsChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      })
    },
  })

  useEffect(() => {
    onZoomChange(map.getZoom())
    const bounds = map.getBounds()
    onBoundsChange({
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest(),
    })
  }, [map, onBoundsChange, onZoomChange])

  return null
}

const drawnAreaStyle = {
  color: '#b79456',
  weight: 2,
  fillColor: '#d7c8a8',
  fillOpacity: 0.24,
}

function DrawAreaControls({ mapPolygons, onAddMapPolygon, onSetMapPolygons }) {
  const map = useMap()
  const featureGroupRef = useRef(null)

  useEffect(() => {
    const featureGroup = new L.FeatureGroup()
    featureGroupRef.current = featureGroup
    map.addLayer(featureGroup)

    const drawControl = new L.Control.Draw({
      position: 'topleft',
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
          shapeOptions: drawnAreaStyle,
        },
        rectangle: false,
        polyline: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup,
        remove: true,
      },
    })

    map.addControl(drawControl)

    const toFeatureWithMeta = (layer) => {
      const feature = layer.toGeoJSON()
      const id = feature.properties?.id || `${Date.now()}-${Math.round(Math.random() * 1000000)}`
      const withMeta = {
        ...feature,
        properties: {
          ...(feature.properties || {}),
          id,
          level: 'drawn',
          name: 'Area dibujada',
        },
      }
      layer.feature = withMeta
      return withMeta
    }

    const handleCreated = (event) => {
      featureGroup.addLayer(event.layer)
      const feature = toFeatureWithMeta(event.layer)
      onAddMapPolygon(feature)
    }

    const handleEdited = (event) => {
      const updates = new Map()

      event.layers.eachLayer((layer) => {
        const feature = toFeatureWithMeta(layer)
        updates.set(feature.properties.id, feature)
      })

      if (!updates.size) return

      onSetMapPolygons((current) =>
        current.map((feature) => updates.get(feature.properties?.id) || feature),
      )
    }

    const handleDeleted = (event) => {
      const removedIds = new Set()

      event.layers.eachLayer((layer) => {
        const id = layer.feature?.properties?.id
        if (id) removedIds.add(id)
      })

      if (!removedIds.size) return

      onSetMapPolygons((current) =>
        current.filter((feature) => !removedIds.has(feature.properties?.id)),
      )
    }

    map.on(L.Draw.Event.CREATED, handleCreated)
    map.on(L.Draw.Event.EDITED, handleEdited)
    map.on(L.Draw.Event.DELETED, handleDeleted)

    return () => {
      map.off(L.Draw.Event.CREATED, handleCreated)
      map.off(L.Draw.Event.EDITED, handleEdited)
      map.off(L.Draw.Event.DELETED, handleDeleted)
      map.removeControl(drawControl)
      map.removeLayer(featureGroup)
      featureGroupRef.current = null
    }
  }, [map, onAddMapPolygon, onSetMapPolygons])

  useEffect(() => {
    const featureGroup = featureGroupRef.current
    if (!featureGroup) return

    featureGroup.clearLayers()

    mapPolygons.forEach((feature) => {
      const geoLayer = L.geoJSON(feature, { style: drawnAreaStyle })
      geoLayer.eachLayer((layer) => {
        layer.feature = feature
        featureGroup.addLayer(layer)
      })
    })
  }, [mapPolygons])

  return null
}

function BuyMap({
  selectedAreas = [],
  mapPolygons = [],
  onAreaToggle,
  onClearAreas,
  onAddMapPolygon,
  onSetMapPolygons,
  totals = {},
}) {
  const [zoom, setZoom] = useState(6)
  const [viewportBounds, setViewportBounds] = useState(null)
  const level = zoom >= 8 ? 'municipality' : 'province'

  const selectedAreasKey = useMemo(
    () => selectedAreas.map((area) => area.properties.id).sort().join('|'),
    [selectedAreas],
  )

  const visibleProvinces = useMemo(
    () => provinceAreas.filter((area) => boundsIntersect(area.properties.bounds, viewportBounds)),
    [viewportBounds],
  )
  const visibleMunicipalities = useMemo(
    () => municipalityAreas.filter((area) => boundsIntersect(area.properties.bounds, viewportBounds)),
    [viewportBounds],
  )

  const currentAreas = level === 'municipality' ? visibleMunicipalities : visibleProvinces

  const isSelected = (area) => selectedAreas.some((item) => item.properties.id === area.properties.id)

  const areaStyle = (area) => ({
    color: isSelected(area) ? '#7b5a2c' : level === 'municipality' ? '#6f8798' : '#9f8a61',
    weight: isSelected(area) ? 2.5 : 1.1,
    fillColor: isSelected(area) ? '#b79456' : level === 'municipality' ? '#c7d4df' : '#d7c8a8',
    fillOpacity: isSelected(area) ? 0.45 : 0.18,
  })

  const onEachArea = (feature, layer) => {
    layer.on({
      click: () => onAreaToggle(feature),
      mouseover: () => layer.setStyle({ fillOpacity: 0.36, weight: 2 }),
      mouseout: () => layer.setStyle(areaStyle(feature)),
    })
  }

  return (
    <div className="buy-map-column">
      <h3 className="buy-map-title">Mapa por áreas</h3>
      <div className="buy-map-shell">
        <MapContainer
          center={[40.4168, -3.7038]}
          zoom={zoom}
          scrollWheelZoom
          className="buy-leaflet-map"
          maxBounds={spainBounds}
          maxBoundsViscosity={1}
          minZoom={5}
        >
          <MapSizeSync />
          <MapStateSync onZoomChange={setZoom} onBoundsChange={setViewportBounds} />
          <DrawAreaControls
            mapPolygons={mapPolygons}
            onAddMapPolygon={onAddMapPolygon}
            onSetMapPolygons={onSetMapPolygons}
          />

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap
          />

          {currentAreas.length > 0 && (
            <GeoJSON
              key={`areas-${level}-${selectedAreasKey}`}
              data={{ type: 'FeatureCollection', features: currentAreas }}
              style={areaStyle}
              onEachFeature={onEachArea}
            />
          )}
        </MapContainer>
      </div>

      <div className="buy-map-actions">
        <button type="button" onClick={onClearAreas} disabled={!selectedAreas.length && !mapPolygons.length}>
          Limpiar selección
        </button>
        <p>Zoom actual: {zoom}</p>
        <p>Modo: {level === 'municipality' ? 'Municipios' : 'Provincias'}</p>
        <p>Áreas dibujadas: {mapPolygons.length}</p>
      </div>

      <div className="map-selection-totals">
        <p>Proyectos en selección: {totals?.total ?? 0}</p>
        {(totals?.perArea || []).map((area) => (
          <p key={area.id} className="per-zone-count">
            {area.level === 'municipality' ? 'Municipio' : 'Provincia'} {area.name}: {area.count}
          </p>
        ))}
        {(totals?.perPolygon || []).map((area, index) => (
          <p key={area.id || `drawn-${index}`} className="per-zone-count">
            Área dibujada {index + 1}: {area.count}
          </p>
        ))}
      </div>
    </div>
  )
}

export default BuyMap
