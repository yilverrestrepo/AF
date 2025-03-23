"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, MapPin, Users, Search, Home, Palmtree, Mountain, Building, Tent } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchBarProps {
  className?: string
}

export default function SearchBar({ className }: SearchBarProps) {
  const router = useRouter()
  const [searchType, setSearchType] = useState("stays")
  const [location, setLocation] = useState("")
  const [guests, setGuests] = useState(1)
  const [propertyType, setPropertyType] = useState("")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (guests > 0) params.set("guests", guests.toString())
    if (dateRange.from) params.set("checkIn", format(dateRange.from, "yyyy-MM-dd"))
    if (dateRange.to) params.set("checkOut", format(dateRange.to, "yyyy-MM-dd"))
    if (propertyType) params.set("type", propertyType)

    if (searchType === "stays") {
      router.push(`/listings?${params.toString()}`)
    } else {
      router.push(`/experiences?${params.toString()}`)
    }
  }

  return (
    <div className={cn("w-full bg-white rounded-2xl shadow-xl border", className)}>
      <Tabs defaultValue="stays" onValueChange={setSearchType}>
        <div className="px-2 pt-2">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="stays" className="rounded-full">
              <Home className="mr-2 h-4 w-4" />
              Alojamientos
            </TabsTrigger>
            <TabsTrigger value="experiences" className="rounded-full">
              <Palmtree className="mr-2 h-4 w-4" />
              Experiencias
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="stays">
          <form onSubmit={handleSearch} className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative md:col-span-2">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
              <Input
                placeholder="¿A dónde vas?"
                className="pl-10 h-14 rounded-xl text-base"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal h-14 rounded-xl",
                    !dateRange.from && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
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
                  className="rounded-xl"
                />
              </PopoverContent>
            </Popover>

            <div className="relative">
              <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
              <Select onValueChange={(value) => setGuests(Number.parseInt(value))}>
                <SelectTrigger className="h-14 pl-10 rounded-xl text-base">
                  <SelectValue placeholder="Huéspedes" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "huésped" : "huéspedes"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full h-14 rounded-xl text-base btn-primary-gradient">
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </Button>
          </form>

          <div className="px-6 pb-6 pt-0 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full flex items-center gap-1"
              onClick={() => setPropertyType("house")}
            >
              <Home className="h-3.5 w-3.5" />
              Casas
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full flex items-center gap-1"
              onClick={() => setPropertyType("apartment")}
            >
              <Building className="h-3.5 w-3.5" />
              Apartamentos
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full flex items-center gap-1"
              onClick={() => setPropertyType("villa")}
            >
              <Palmtree className="h-3.5 w-3.5" />
              Villas
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full flex items-center gap-1"
              onClick={() => setPropertyType("cabin")}
            >
              <Mountain className="h-3.5 w-3.5" />
              Cabañas
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full flex items-center gap-1"
              onClick={() => setPropertyType("glamping")}
            >
              <Tent className="h-3.5 w-3.5" />
              Glamping
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="experiences">
          <form onSubmit={handleSearch} className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
              <Input
                placeholder="¿Dónde buscas experiencias?"
                className="pl-10 h-14 rounded-xl text-base"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal h-14 rounded-xl",
                    !dateRange.from && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                  {dateRange.from ? format(dateRange.from, "d MMMM yyyy", { locale: es }) : "¿Qué día?"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => setDateRange({ from: date, to: undefined })}
                  locale={es}
                  className="rounded-xl"
                />
              </PopoverContent>
            </Popover>

            <Button type="submit" className="w-full h-14 rounded-xl text-base btn-primary-gradient">
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </Button>
          </form>

          <div className="px-6 pb-6 pt-0 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              Gastronomía
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Aventura
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Cultura
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Naturaleza
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Bienestar
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

