"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Users } from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

type Property = {
  id: number
  price: number
  guests: number
}

export default function BookingForm({ property }: { property: Property }) {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const [guests, setGuests] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calcular número de noches
  const nights = dateRange.from && dateRange.to ? differenceInDays(dateRange.to, dateRange.from) : 0

  // Calcular subtotal
  const subtotal = nights * property.price

  // Calcular impuestos (19% IVA)
  const tax = subtotal * 0.19

  // Calcular tarifa de servicio (10%)
  const serviceFee = subtotal * 0.1

  // Calcular total
  const total = subtotal + tax + serviceFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!dateRange.from || !dateRange.to) {
      alert("Por favor selecciona las fechas de tu estancia")
      return
    }

    setIsSubmitting(true)

    // Simulación de envío de formulario
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redireccionar a página de pago (simulado)
    alert(`Reserva iniciada para ${nights} noches. Total: $${total.toFixed(2)} USD`)

    setIsSubmitting(false)
  }

  return (
    <div className="border rounded-lg p-6 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-xl">${property.price} USD</span>
            <span className="text-muted-foreground">/ noche</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-medium">Fechas</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
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
                    defaultMonth={new Date()}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    disabled={{ before: new Date() }}
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Huéspedes</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="number"
                  min="1"
                  max={property.guests}
                  className="pl-9"
                  value={guests}
                  onChange={(e) => setGuests(Number.parseInt(e.target.value) || 1)}
                />
              </div>
              <p className="text-xs text-muted-foreground">Máximo {property.guests} huéspedes</p>
            </div>
          </div>
        </div>

        {nights > 0 && (
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                ${property.price} x {nights} noches
              </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Impuestos (19%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tarifa de servicio</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)} USD</span>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting || nights === 0}>
          {isSubmitting ? "Procesando..." : nights > 0 ? "Reservar ahora" : "Selecciona fechas"}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          No se te cobrará todavía. Confirmarás los detalles en el siguiente paso.
        </p>
      </form>
    </div>
  )
}

