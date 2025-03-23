"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addMonths, format, isSameDay, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface CalendarDay {
  date: Date
  status: "available" | "unavailable" | "pending"
  price?: number
}

interface ListingCalendarProps {
  listingId: string
}

export default function ListingCalendar({ listingId }: ListingCalendarProps) {
  const [month, setMonth] = useState<Date>(new Date())

  // Mock calendar data - in a real app, this would come from an API
  const calendarData: CalendarDay[] = [
    // Available days
    { date: parseISO("2023-08-01"), status: "available", price: 250 },
    { date: parseISO("2023-08-02"), status: "available", price: 250 },
    { date: parseISO("2023-08-03"), status: "available", price: 250 },
    { date: parseISO("2023-08-04"), status: "available", price: 250 },
    { date: parseISO("2023-08-05"), status: "available", price: 250 },

    // Unavailable days
    { date: parseISO("2023-08-10"), status: "unavailable" },
    { date: parseISO("2023-08-11"), status: "unavailable" },
    { date: parseISO("2023-08-12"), status: "unavailable" },
    { date: parseISO("2023-08-13"), status: "unavailable" },
    { date: parseISO("2023-08-14"), status: "unavailable" },

    // Pending days
    { date: parseISO("2023-08-20"), status: "pending" },
    { date: parseISO("2023-08-21"), status: "pending" },
    { date: parseISO("2023-08-22"), status: "pending" },
  ]

  // Function to determine day state
  const getDayState = (date: Date) => {
    const day = calendarData.find((d) => isSameDay(d.date, date))
    return day ? day.status : "available"
  }

  // Function to get price for a day
  const getDayPrice = (date: Date) => {
    const day = calendarData.find((d) => isSameDay(d.date, date))
    return day?.price
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disponibilidad</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 rounded-full bg-success/10 border border-success"></div>
              <span className="text-sm">Disponible</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 rounded-full bg-destructive/10 border border-destructive"></div>
              <span className="text-sm">No disponible</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 rounded-full bg-warning/10 border border-warning"></div>
              <span className="text-sm">Pendiente</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Calendar
              mode="single"
              month={month}
              onMonthChange={setMonth}
              className="rounded-md border"
              locale={es}
              selected={undefined}
              onSelect={() => {}}
              disabled={{ before: new Date() }}
              modifiers={{
                available: (date) => getDayState(date) === "available",
                unavailable: (date) => getDayState(date) === "unavailable",
                pending: (date) => getDayState(date) === "pending",
              }}
              modifiersClassNames={{
                available: "calendar-day-available",
                unavailable: "calendar-day-unavailable",
                pending: "calendar-day-pending",
              }}
              components={{
                Day: ({ date, ...props }) => {
                  const price = getDayPrice(date)
                  const status = getDayState(date)

                  return (
                    <div className="relative">
                      <div
                        className={cn(
                          "calendar-day",
                          status === "available" && "calendar-day-available",
                          status === "unavailable" && "calendar-day-unavailable",
                          status === "pending" && "calendar-day-pending",
                        )}
                        {...props}
                      >
                        {format(date, "d")}
                      </div>
                      {status === "available" && price && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium">${price}</div>
                      )}
                    </div>
                  )
                },
              }}
            />

            <Calendar
              mode="single"
              month={addMonths(month, 1)}
              onMonthChange={(month) => setMonth(addMonths(month, -1))}
              className="rounded-md border"
              locale={es}
              selected={undefined}
              onSelect={() => {}}
              disabled={{ before: new Date() }}
              modifiers={{
                available: (date) => getDayState(date) === "available",
                unavailable: (date) => getDayState(date) === "unavailable",
                pending: (date) => getDayState(date) === "pending",
              }}
              modifiersClassNames={{
                available: "calendar-day-available",
                unavailable: "calendar-day-unavailable",
                pending: "calendar-day-pending",
              }}
              components={{
                Day: ({ date, ...props }) => {
                  const price = getDayPrice(date)
                  const status = getDayState(date)

                  return (
                    <div className="relative">
                      <div
                        className={cn(
                          "calendar-day",
                          status === "available" && "calendar-day-available",
                          status === "unavailable" && "calendar-day-unavailable",
                          status === "pending" && "calendar-day-pending",
                        )}
                        {...props}
                      >
                        {format(date, "d")}
                      </div>
                      {status === "available" && price && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium">${price}</div>
                      )}
                    </div>
                  )
                },
              }}
            />
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            <p>
              Los precios mostrados son por noche. Las fechas no disponibles pueden estar reservadas o bloqueadas por el
              anfitrión.
            </p>
            <p className="mt-2">Para reservar, selecciona las fechas en el formulario de reserva.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

