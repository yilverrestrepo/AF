"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Search } from "lucide-react"
import type { PropertyFilter } from "@/types/property"

interface PropertySearchProps {
  locale: string
  initialFilters?: PropertyFilter
}

export default function PropertySearch({ locale, initialFilters }: PropertySearchProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [filters, setFilters] = useState<PropertyFilter>({
    location: initialFilters?.location || "",
    checkIn: initialFilters?.checkIn || "",
    checkOut: initialFilters?.checkOut || "",
    guests: initialFilters?.guests || 1,
    minPrice: initialFilters?.minPrice || 0,
    maxPrice: initialFilters?.maxPrice || 1000,
  })

  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutOpen, setCheckOutOpen] = useState(false)

  const handleSearch = () => {
    // Construir la URL con los parámetros de búsqueda
    const searchParams = new URLSearchParams()

    if (filters.location) searchParams.set("location", filters.location)
    if (filters.checkIn) searchParams.set("checkIn", filters.checkIn)
    if (filters.checkOut) searchParams.set("checkOut", filters.checkOut)
    if (filters.guests) searchParams.set("guests", filters.guests.toString())
    if (filters.minPrice) searchParams.set("minPrice", filters.minPrice.toString())
    if (filters.maxPrice) searchParams.set("maxPrice", filters.maxPrice.toString())

    const queryString = searchParams.toString()

    startTransition(() => {
      router.push(`/${locale}/properties${queryString ? `?${queryString}` : ""}`)
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
    </div>
  )
}

