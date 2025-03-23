"use client"

import { useEffect, useRef, useState } from "react"

type Coordinates = {
  lat: number
  lng: number
}

export default function PropertyMap({ coordinates }: { coordinates: Coordinates }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Simulación de carga de mapa
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4">
      <div ref={mapRef} className="h-[300px] w-full bg-gray-100 rounded-lg relative">
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Mapa de ubicación (Google Maps o Mapbox se integraría aquí)</p>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Ubicación</h3>
        <p className="text-muted-foreground">
          La ubicación exacta se compartirá una vez confirmada la reserva. La propiedad se encuentra en una zona segura
          y de fácil acceso.
        </p>
      </div>
    </div>
  )
}

