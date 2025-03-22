"use client"

import { useEffect, useRef, useState } from "react"

// Datos de ejemplo para marcadores en el mapa
const mapMarkers = [
  { id: 1, lat: 10.391049, lng: -75.479426, title: "Villa con vista al mar", price: 250 },
  { id: 2, lat: 6.217, lng: -75.567, title: "Cabaña en la montaña", price: 120 },
  { id: 3, lat: 6.235, lng: -75.575, title: "Apartamento de lujo", price: 180 },
  { id: 4, lat: 11.241, lng: -74.211, title: "Casa de playa", price: 200 },
]

export default function SearchMap() {
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
    <div ref={mapRef} className="h-full w-full bg-gray-100 relative">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">Mapa interactivo (Google Maps o Mapbox se integraría aquí)</p>
          <div className="absolute top-4 right-4 bg-background p-2 rounded-md shadow-md text-sm">
            {mapMarkers.length} propiedades en esta área
          </div>
        </div>
      )}
    </div>
  )
}

