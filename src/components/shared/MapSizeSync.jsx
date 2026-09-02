import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

function MapSizeSync() {
  const map = useMap()

  useEffect(() => {
    const container = map.getContainer()
    const syncSize = () => map.invalidateSize({ pan: false })

    syncSize()
    const frameId = window.requestAnimationFrame(syncSize)

    const observer = new ResizeObserver(syncSize)
    observer.observe(container)

    return () => {
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [map])

  return null
}

export default MapSizeSync
