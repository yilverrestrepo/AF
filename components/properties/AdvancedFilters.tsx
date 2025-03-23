"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Filter } from "lucide-react"

export default function AdvancedFilters({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    amenities: {
      wifi: false,
      pool: false,
      parking: false,
      airConditioning: false,
      petFriendly: false,
    },
    propertyType: {
      apartment: false,
      house: false,
      villa: false,
      cabin: false,
    },
    instantBooking: false,
  })

  const handleAmenityChange = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity],
      },
    }))
  }

  const handlePropertyTypeChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      propertyType: {
        ...prev.propertyType,
        [type]: !prev.propertyType[type],
      },
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros avanzados
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtros avanzados</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Rango de precio</h3>
            <div className="px-2">
              <Slider
                defaultValue={filters.priceRange}
                min={0}
                max={1000}
                step={50}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Comodidades</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(filters.amenities).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox id={`amenity-${key}`} checked={value} onCheckedChange={() => handleAmenityChange(key)} />
                  <label htmlFor={`amenity-${key}`} className="text-sm">
                    {key === "wifi"
                      ? "WiFi"
                      : key === "airConditioning"
                        ? "Aire acondicionado"
                        : key === "petFriendly"
                          ? "Acepta mascotas"
                          : key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Tipo de propiedad</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(filters.propertyType).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox id={`type-${key}`} checked={value} onCheckedChange={() => handlePropertyTypeChange(key)} />
                  <label htmlFor={`type-${key}`} className="text-sm">
                    {key === "apartment"
                      ? "Apartamento"
                      : key === "house"
                        ? "Casa"
                        : key === "villa"
                          ? "Villa"
                          : key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="instant-booking"
              checked={filters.instantBooking}
              onCheckedChange={() => setFilters((prev) => ({ ...prev, instantBooking: !prev.instantBooking }))}
            />
            <label htmlFor="instant-booking" className="text-sm">
              Reserva instantánea
            </label>
          </div>
        </div>
        <Button onClick={handleApply}>Aplicar filtros</Button>
      </DialogContent>
    </Dialog>
  )
}

