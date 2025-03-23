"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Search, X } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function SearchFilters({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Parse search params with defaults
  const location = (searchParams.location as string) || ""
  const minPrice = Number.parseInt((searchParams.minPrice as string) || "0")
  const maxPrice = Number.parseInt((searchParams.maxPrice as string) || "1000")
  const guests = Number.parseInt((searchParams.guests as string) || "1")
  const bedrooms = Number.parseInt((searchParams.bedrooms as string) || "1")
  const bathrooms = Number.parseInt((searchParams.bathrooms as string) || "1")

  // Local state for form
  const [formValues, setFormValues] = useState({
    location,
    minPrice,
    maxPrice,
    guests,
    bedrooms,
    bathrooms,
    hasPool: searchParams.hasPool === "true",
    hasWifi: searchParams.hasWifi === "true",
    petFriendly: searchParams.petFriendly === "true",
  })

  // Date range
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: searchParams.checkIn ? new Date(searchParams.checkIn as string) : undefined,
    to: searchParams.checkOut ? new Date(searchParams.checkOut as string) : undefined,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()

    if (formValues.location) params.set("location", formValues.location)
    if (formValues.minPrice > 0) params.set("minPrice", formValues.minPrice.toString())
    if (formValues.maxPrice < 1000) params.set("maxPrice", formValues.maxPrice.toString())
    if (formValues.guests > 1) params.set("guests", formValues.guests.toString())
    if (formValues.bedrooms > 1) params.set("bedrooms", formValues.bedrooms.toString())
    if (formValues.bathrooms > 1) params.set("bathrooms", formValues.bathrooms.toString())

    if (formValues.hasPool) params.set("hasPool", "true")
    if (formValues.hasWifi) params.set("hasWifi", "true")
    if (formValues.petFriendly) params.set("petFriendly", "true")

    if (dateRange.from) params.set("checkIn", format(dateRange.from, "yyyy-MM-dd"))
    if (dateRange.to) params.set("checkOut", format(dateRange.to, "yyyy-MM-dd"))

    startTransition(() => {
      router.push(`/search?${params.toString()}`)
    })
  }

  const resetFilters = () => {
    setFormValues({
      location: "",
      minPrice: 0,
      maxPrice: 1000,
      guests: 1,
      bedrooms: 1,
      bathrooms: 1,
      hasPool: false,
      hasWifi: false,
      petFriendly: false,
    })
    setDateRange({ from: undefined, to: undefined })

    startTransition(() => {
      router.push("/search")
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sticky top-20">
      <div className="space-y-4">
        <div>
          <Label htmlFor="location">Ubicación</Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="location"
              placeholder="Ciudad, región o punto de interés"
              className="pl-9"
              value={formValues.location}
              onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label>Fechas</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal mt-1",
                  !dateRange.from && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "d MMM", { locale: es })} -{" "}
                      {format(dateRange.to, "d MMM", { locale: es })}
                    </>
                  ) : (
                    format(dateRange.from, "d MMMM yyyy", { locale: es })
                  )
                ) : (
                  "Seleccionar fechas"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <div className="flex justify-between">
            <Label htmlFor="price-range">Rango de precio</Label>
            <span className="text-sm text-muted-foreground">
              ${formValues.minPrice} - ${formValues.maxPrice}
            </span>
          </div>
          <div className="mt-2">
            <Slider
              defaultValue={[formValues.minPrice, formValues.maxPrice]}
              min={0}
              max={1000}
              step={10}
              onValueChange={(value) =>
                setFormValues({
                  ...formValues,
                  minPrice: value[0],
                  maxPrice: value[1],
                })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="guests">Huéspedes</Label>
            <Input
              id="guests"
              type="number"
              min={1}
              className="mt-1"
              value={formValues.guests}
              onChange={(e) => setFormValues({ ...formValues, guests: Number.parseInt(e.target.value) || 1 })}
            />
          </div>
          <div>
            <Label htmlFor="bedrooms">Habitaciones</Label>
            <Input
              id="bedrooms"
              type="number"
              min={1}
              className="mt-1"
              value={formValues.bedrooms}
              onChange={(e) => setFormValues({ ...formValues, bedrooms: Number.parseInt(e.target.value) || 1 })}
            />
          </div>
          <div>
            <Label htmlFor="bathrooms">Baños</Label>
            <Input
              id="bathrooms"
              type="number"
              min={1}
              className="mt-1"
              value={formValues.bathrooms}
              onChange={(e) => setFormValues({ ...formValues, bathrooms: Number.parseInt(e.target.value) || 1 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Comodidades</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="has-pool" className="cursor-pointer">
                Piscina
              </Label>
              <Switch
                id="has-pool"
                checked={formValues.hasPool}
                onCheckedChange={(checked) => setFormValues({ ...formValues, hasPool: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="has-wifi" className="cursor-pointer">
                WiFi
              </Label>
              <Switch
                id="has-wifi"
                checked={formValues.hasWifi}
                onCheckedChange={(checked) => setFormValues({ ...formValues, hasWifi: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pet-friendly" className="cursor-pointer">
                Acepta mascotas
              </Label>
              <Switch
                id="pet-friendly"
                checked={formValues.petFriendly}
                onCheckedChange={(checked) => setFormValues({ ...formValues, petFriendly: checked })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Aplicando filtros..." : "Aplicar filtros"}
        </Button>
        <Button type="button" variant="outline" onClick={resetFilters} disabled={isPending}>
          <X className="mr-2 h-4 w-4" />
          Limpiar filtros
        </Button>
      </div>
    </form>
  )
}

