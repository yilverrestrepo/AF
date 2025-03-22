"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

type Coordinates = {
  lat: number
  lng: number
}

export default function ListingMap({ coordinates }: { coordinates: Coordinates }) {
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
      <div ref={mapRef} className="h-[400px] w-full bg-accent rounded-lg relative overflow-hidden">
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover opacity-70"></div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="animate-bounce">
                <div className="h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="h-4 w-4 bg-primary rounded-full mx-auto -mt-2 shadow-lg"></div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4">
              <Button className="rounded-full">Ver en Google Maps</Button>
            </div>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Ubicación</h3>
        <p className="text-muted-foreground">
          La ubicación exacta se compartirá una vez confirmada la reserva. La propiedad se encuentra en una zona segura
          y de fácil acceso, a pocos minutos de restaurantes, tiendas y atracciones turísticas.
        </p>
      </div>
    </div>
  )
}

