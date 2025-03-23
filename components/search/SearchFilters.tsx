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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CalendarIcon, Search, X, Filter } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function SearchFilters({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

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
    hasAC: searchParams.hasAC === "true",
    hasParking: searchParams.hasParking === "true",
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
    if (formValues.hasAC) params.set("hasAC", "true")
    if (formValues.hasParking) params.set("hasParking", "true")

    if (dateRange.from) params.set("checkIn", format(dateRange.from, "yyyy-MM-dd"))
    if (dateRange.to) params.set("checkOut", format(dateRange.to, "yyyy-MM-dd"))

    startTransition(() => {
      router.push(`/listings?${params.toString()}`)
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
      hasAC: false,
      hasParking: false,
    })
    setDateRange({ from: undefined, to: undefined })

    startTransition(() => {
      router.push("/listings")
    })
  }

  // Count active filters
  const activeFiltersCount = [
    formValues.location,
    formValues.minPrice > 0,
    formValues.maxPrice < 1000,
    formValues.guests > 1,
    formValues.bedrooms > 1,
    formValues.bathrooms > 1,
    formValues.hasPool,
    formValues.hasWifi,
    formValues.petFriendly,
    formValues.hasAC,
    formValues.hasParking,
    dateRange.from,
    dateRange.to,
  ].filter(Boolean).length

  return (
    <>
      <div className="lg:hidden mb-6 flex items-center justify-between">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          <Filter className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
          Limpiar filtros
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={cn("space-y-6 sticky top-20", isFiltersVisible ? "block" : "hidden lg:block")}
      >
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

          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Precio</AccordionTrigger>
              <AccordionContent>
                <div>
                  <div className="flex justify-between">
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Capacidad</AccordionTrigger>
              <AccordionContent>
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
                      onChange={(e) =>
                        setFormValues({ ...formValues, bathrooms: Number.parseInt(e.target.value) || 1 })
                      }
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Comodidades</AccordionTrigger>
              <AccordionContent>
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="has-ac" className="cursor-pointer">
                      Aire acondicionado
                    </Label>
                    <Switch
                      id="has-ac"
                      checked={formValues.hasAC}
                      onCheckedChange={(checked) => setFormValues({ ...formValues, hasAC: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="has-parking" className="cursor-pointer">
                      Estacionamiento
                    </Label>
                    <Switch
                      id="has-parking"
                      checked={formValues.hasParking}
                      onCheckedChange={(checked) => setFormValues({ ...formValues, hasParking: checked })}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
    </>
  )
}

