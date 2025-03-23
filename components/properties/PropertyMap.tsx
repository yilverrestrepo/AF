"use client"

import { useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"

interface PropertyMapProps {
  latitude: number
  longitude: number
  address: string
}

export default function PropertyMap({ latitude, longitude, address }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Cargar la API de Google Maps
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
      })

      try {
        const google = await loader.load()
        const mapOptions = {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }

        const map = new google.maps.Map(mapRef.current!, mapOptions)

        // Añadir un marcador
        new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map,
          title: address,
        })
      } catch (error) {
        console.error("Error al cargar el mapa:", error)
      }
    }

    if (mapRef.current) {
      initMap()
    }
  }, [latitude, longitude, address])

  return (
    <div ref={mapRef} className="h-64 rounded-lg overflow-hidden">
      {/* El mapa se cargará aquí */}
    </div>
  )
}

