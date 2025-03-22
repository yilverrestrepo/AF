"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, MapPin, Users, SearchIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [guests, setGuests] = useState(1)
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

    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="mx-auto max-w-4xl w-full bg-card rounded-xl shadow-lg -mt-16 relative z-30 border">
      <form onSubmit={handleSearch} className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="¿A dónde vas?"
            className="pl-9"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "d MMM", { locale: es })} - {format(dateRange.to, "d MMM", { locale: es })}
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

        <div className="relative">
          <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="number"
            min="1"
            placeholder="Huéspedes"
            className="pl-9"
            value={guests}
            onChange={(e) => setGuests(Number.parseInt(e.target.value) || 1)}
          />
        </div>

        <Button type="submit" className="w-full">
          <SearchIcon className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </form>
    </div>
  )
}

