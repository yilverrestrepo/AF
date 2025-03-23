"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addMonths, format, isSameDay, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Check, X, Clock, CalendarDays } from "lucide-react"

// Mock data for reservations
const reservations = [
  {
    id: "1",
    listingId: "1",
    listingTitle: "Villa con vista al mar",
    checkIn: parseISO("2023-08-10"),
    checkOut: parseISO("2023-08-15"),
    guestName: "Laura García",
    status: "confirmed",
    guests: 4,
    totalPrice: 1250,
  },
  {
    id: "2",
    listingId: "1",
    listingTitle: "Villa con vista al mar",
    checkIn: parseISO("2023-08-20"),
    checkOut: parseISO("2023-08-23"),
    guestName: "Carlos Rodríguez",
    status: "pending",
    guests: 2,
    totalPrice: 750,
  },
  {
    id: "3",
    listingId: "2",
    listingTitle: "Cabaña en la montaña",
    checkIn: parseISO("2023-08-05"),
    checkOut: parseISO("2023-08-08"),
    guestName: "Miguel Pérez",
    status: "confirmed",
    guests: 3,
    totalPrice: 360,
  },
]

// Mock data for blocked dates
const blockedDates = [
  { date: parseISO("2023-08-01"), listingId: "1" },
  { date: parseISO("2023-08-02"), listingId: "1" },
  { date: parseISO("2023-08-03"), listingId: "1" },
  { date: parseISO("2023-08-16"), listingId: "1" },
  { date: parseISO("2023-08-17"), listingId: "1" },
  { date: parseISO("2023-08-18"), listingId: "1" },
  { date: parseISO("2023-08-19"), listingId: "1" },
]

// Mock data for properties
const properties = [
  { id: "1", title: "Villa con vista al mar" },
  { id: "2", title: "Cabaña en la montaña" },
  { id: "3", title: "Apartamento de lujo" },
  { id: "4", title: "Casa de playa" },
  { id: "5", title: "Penthouse con vista panorámica" },
]

export default function HostCalendar() {
  const [month, setMonth] = useState<Date>(new Date())
  const [selectedProperty, setSelectedProperty] = useState<string>("all")

  // Function to determine day state
  const getDayState = (date: Date) => {
    // Check if date is in a reservation
    const reservation = reservations.find(
      (r) =>
        (selectedProperty === "all" || r.listingId === selectedProperty) && date >= r.checkIn && date <= r.checkOut,
    )

    if (reservation) {
      return reservation.status === "confirmed" ? "reserved" : "pending"
    }

    // Check if date is blocked
    const isBlocked = blockedDates.some(
      (d) => (selectedProperty === "all" || d.listingId === selectedProperty) && isSameDay(d.date, date),
    )

    if (isBlocked) {
      return "blocked"
    }

    return "available"
  }

  // Function to get reservation for a day
  const getReservationForDay = (date: Date) => {
    return reservations.find(
      (r) =>
        (selectedProperty === "all" || r.listingId === selectedProperty) && date >= r.checkIn && date <= r.checkOut,
    )
  }

  // Function to navigate to previous month
  const prevMonth = () => {
    setMonth((prev) => addMonths(prev, -1))
  }

  // Function to navigate to next month
  const nextMonth = () => {
    setMonth((prev) => addMonths(prev, 1))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold">Calendario de disponibilidad</h2>

        <div className="flex items-center gap-3">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar propiedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las propiedades</SelectItem>
              {properties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={() => setMonth(new Date())}>
            Hoy
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Mes anterior
        </Button>

        <h3 className="text-lg font-medium">{format(month, "MMMM yyyy", { locale: es })}</h3>

        <Button variant="outline" size="sm" onClick={nextMonth}>
          Mes siguiente
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Calendario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-sm">Disponible</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Reservado</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                  <span className="text-sm">Pendiente</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                  <span className="text-sm">Bloqueado</span>
                </div>
              </div>

              <Calendar
                mode="single"
                month={month}
                onMonthChange={setMonth}
                className="rounded-md border"
                locale={es}
                selected={undefined}
                onSelect={() => {}}
                components={{
                  Day: ({ date, ...props }) => {
                    const state = getDayState(date)
                    const reservation = getReservationForDay(date)

                    return (
                      <div className="relative">
                        <div
                          className={cn(
                            "calendar-day",
                            state === "available" && "bg-green-100 text-green-800 hover:bg-green-200",
                            state === "reserved" && "bg-blue-100 text-blue-800 hover:bg-blue-200",
                            state === "pending" && "bg-amber-100 text-amber-800 hover:bg-amber-200",
                            state === "blocked" && "bg-gray-100 text-gray-800 hover:bg-gray-200",
                          )}
                          {...props}
                        >
                          {format(date, "d")}
                        </div>
                        {reservation && (
                          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium">
                            {reservation.status === "confirmed" ? "✓" : "⏱"}
                          </div>
                        )}
                      </div>
                    )
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Próximas reservas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservations.length > 0 ? (
                reservations
                  .filter((r) => selectedProperty === "all" || r.listingId === selectedProperty)
                  .sort((a, b) => a.checkIn.getTime() - b.checkIn.getTime())
                  .map((reservation) => (
                    <div
                      key={reservation.id}
                      className={cn(
                        "p-3 rounded-lg border flex flex-col gap-2",
                        reservation.status === "confirmed"
                          ? "border-blue-200 bg-blue-50"
                          : "border-amber-200 bg-amber-50",
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{reservation.listingTitle}</h4>
                          <p className="text-sm">{reservation.guestName}</p>
                        </div>
                        <Badge className={reservation.status === "confirmed" ? "bg-blue-500" : "bg-amber-500"}>
                          {reservation.status === "confirmed" ? (
                            <>
                              <Check className="h-3 w-3 mr-1" /> Confirmada
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" /> Pendiente
                            </>
                          )}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {format(reservation.checkIn, "d MMM", { locale: es })} -{" "}
                          {format(reservation.checkOut, "d MMM", { locale: es })}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{reservation.guests} huéspedes</span>
                        <span className="font-medium">${reservation.totalPrice} USD</span>
                      </div>

                      {reservation.status === "pending" && (
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                            <Check className="h-4 w-4 mr-1" />
                            Aceptar
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-destructive">
                            <X className="h-4 w-4 mr-1" />
                            Rechazar
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No hay reservas próximas</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

