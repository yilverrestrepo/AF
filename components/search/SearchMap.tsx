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
    <div ref={mapRef} className="h-full w-full bg-accent relative">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover opacity-30"></div>

          {/* Marcadores simulados */}
          <div className="absolute left-1/4 top-1/3">
            <MapMarker title="Villa con vista al mar" price={250} />
          </div>
          <div className="absolute right-1/3 top-1/2">
            <MapMarker title="Cabaña en la montaña" price={120} />
          </div>
          <div className="absolute left-1/2 bottom-1/4">
            <MapMarker title="Apartamento de lujo" price={180} />
          </div>
          <div className="absolute right-1/4 top-1/4">
            <MapMarker title="Casa de playa" price={200} />
          </div>

          <div className="absolute top-4 right-4 bg-background p-2 rounded-md shadow-md text-sm">
            {mapMarkers.length} propiedades en esta área
          </div>
        </div>
      )}
    </div>
  )
}

function MapMarker({ title, price }: { title: string; price: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
        <span className="font-bold">${price}</span>
      </div>

      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white p-2 rounded shadow-md whitespace-nowrap z-10">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-primary font-bold">${price} / noche</p>
        </div>
      )}
    </div>
  )
}

