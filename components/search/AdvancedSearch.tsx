"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Search, Filter } from "lucide-react"
import type { PropertyFilter } from "@/types/property"

interface AdvancedSearchProps {
  locale: string
  initialFilters?: PropertyFilter & { sort?: string }
}

export default function AdvancedSearch({ locale, initialFilters }: AdvancedSearchProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [filters, setFilters] = useState<PropertyFilter & { sort?: string }>({
    location: initialFilters?.location || "",
    checkIn: initialFilters?.checkIn || "",
    checkOut: initialFilters?.checkOut || "",
    guests: initialFilters?.guests || 1,
    minPrice: initialFilters?.minPrice || 0,
    maxPrice: initialFilters?.maxPrice || 1000,
    bedrooms: initialFilters?.bedrooms || 1,
    bathrooms: initialFilters?.bathrooms || 1,
    amenities: initialFilters?.amenities || [],
    sort: initialFilters?.sort || "price-asc",
  })

  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutOpen, setCheckOutOpen] = useState(false)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const amenitiesList = [
    { id: "wifi", label: "WiFi" },
    { id: "pool", label: "Piscina" },
    { id: "kitchen", label: "Cocina" },
    { id: "ac", label: "Aire acondicionado" },
    { id: "parking", label: "Aparcamiento" },
    { id: "washer", label: "Lavadora" },
    { id: "terrace", label: "Terraza" },
    { id: "gym", label: "Gimnasio" },
  ]

  const handleSearch = () => {
    // Construir la URL con los parámetros de búsqueda
    const searchParams = new URLSearchParams()

    if (filters.location) searchParams.set("location", filters.location)
    if (filters.checkIn) searchParams.set("checkIn", filters.checkIn)
    if (filters.checkOut) searchParams.set("checkOut", filters.checkOut)
    if (filters.guests) searchParams.set("guests", filters.guests.toString())
    if (filters.minPrice) searchParams.set("minPrice", filters.minPrice.toString())
    if (filters.maxPrice) searchParams.set("maxPrice", filters.maxPrice.toString())
    if (filters.bedrooms) searchParams.set("bedrooms", filters.bedrooms.toString())
    if (filters.bathrooms) searchParams.set("bathrooms", filters.bathrooms.toString())
    if (filters.amenities && filters.amenities.length > 0) {
      filters.amenities.forEach((amenity) => {
        searchParams.append("amenities", amenity)
      })
    }
    if (filters.sort) searchParams.set("sort", filters.sort)

    const queryString = searchParams.toString()

    startTransition(() => {
      router.push(`/${locale}/search${queryString ? `?${queryString}` : ""}`)
    })
  }

  const toggleAmenity = (amenity: string) => {
    setFilters((prev) => {
      const amenities = prev.amenities || []
      if (amenities.includes(amenity)) {
        return { ...prev, amenities: amenities.filter((a) => a !== amenity) }
      } else {
        return { ...prev, amenities: [...amenities, amenity] }
      }
    })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="location">Ubicación</Label>
          <div className="relative">
            <Input
              id="location"
              placeholder="¿A dónde vas?"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="pl-9"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div>
          <Label>Fecha de llegada</Label>
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.checkIn ? (
                  format(new Date(filters.checkIn), "PPP", { locale: es })
                ) : (
                  <span>Seleccionar fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.checkIn ? new Date(filters.checkIn) : undefined}
                onSelect={(date) => {
                  if (date) {
                    setFilters({ ...filters, checkIn: date.toISOString().split("T")[0] })
                    setCheckInOpen(false)
                  }
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Fecha de salida</Label>
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.checkOut ? (
                  format(new Date(filters.checkOut), "PPP", { locale: es })
                ) : (
                  <span>Seleccionar fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.checkOut ? new Date(filters.checkOut) : undefined}
                onSelect={(date) => {
                  if (date) {
                    setFilters({ ...filters, checkOut: date.toISOString().split("T")[0] })
                    setCheckOutOpen(false)
                  }
                }}
                disabled={(date) => {
                  const checkInDate = filters.checkIn ? new Date(filters.checkIn) : new Date()
                  return date <= checkInDate
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="guests">Huéspedes</Label>
          <div className="flex items-center">
            <Input
              id="guests"
              type="number"
              min={1}
              max={20}
              value={filters.guests}
              onChange={(e) => setFilters({ ...filters, guests: Number.parseInt(e.target.value) || 1 })}
              className="w-full"
            />
            <Button onClick={handleSearch} className="ml-2" disabled={isPending}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Button
          variant="outline"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {isAdvancedOpen ? "Ocultar filtros avanzados" : "Mostrar filtros avanzados"}
        </Button>
      </div>

      {isAdvancedOpen && (
        <div className="mt-4 space-y-4 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Dormitorios mínimos</Label>
              <Select
                value={filters.bedrooms?.toString()}
                onValueChange={(value) => setFilters({ ...filters, bedrooms: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Cualquier número" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "dormitorio" : "dormitorios"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Baños mínimos</Label>
              <Select
                value={filters.bathrooms?.toString()}
                onValueChange={(value) => setFilters({ ...filters, bathrooms: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Cualquier número" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "baño" : "baños"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Ordenar por</Label>
              <Select value={filters.sort} onValueChange={(value) => setFilters({ ...filters, sort: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                  <SelectItem value="rating-desc">Mejor valorados</SelectItem>
                  <SelectItem value="newest">Más recientes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Rango de precio (€/noche)</Label>
            <div className="px-2">
              <Slider
                defaultValue={[filters.minPrice || 0, filters.maxPrice || 1000]}
                max={1000}
                step={10}
                onValueChange={(value) => {
                  setFilters({
                    ...filters,
                    minPrice: value[0],
                    maxPrice: value[1],
                  })
                }}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{filters.minPrice}€</span>
                <span>{filters.maxPrice}€</span>
              </div>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Comodidades</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {amenitiesList.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={(filters.amenities || []).includes(amenity.id)}
                    onCheckedChange={() => toggleAmenity(amenity.id)}
                  />
                  <Label htmlFor={amenity.id} className="cursor-pointer">
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setFilters({
                  location: "",
                  checkIn: "",
                  checkOut: "",
                  guests: 1,
                  minPrice: 0,
                  maxPrice: 1000,
                  bedrooms: 1,
                  bathrooms: 1,
                  amenities: [],
                  sort: "price-asc",
                })
              }}
            >
              Limpiar filtros
            </Button>
            <Button onClick={handleSearch} disabled={isPending}>
              {isPending ? "Buscando..." : "Aplicar filtros"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

