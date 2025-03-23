"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, differenceInDays, addDays } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import type { Property } from "@/types/property"
import { toast } from "@/hooks/use-toast"

interface PropertyReservationProps {
  property: Property
  locale: string
}

export default function PropertyReservation({ property, locale }: PropertyReservationProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutOpen, setCheckOutOpen] = useState(false)

  const [reservation, setReservation] = useState({
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: 1,
  })

  // Calcular el número de noches
  const nights =
    reservation.checkIn && reservation.checkOut ? differenceInDays(reservation.checkOut, reservation.checkIn) : 0

  // Calcular el precio total
  const subtotal = property.price * nights
  const serviceFee = Math.round(subtotal * 0.12) // 12% de tarifa de servicio
  const total = subtotal + serviceFee

  const handleReserve = async () => {
    if (!reservation.checkIn || !reservation.checkOut) {
      toast({
        title: "Error de validación",
        description: "Por favor, selecciona las fechas de entrada y salida",
        variant: "destructive",
      })
      return
    }

    if (nights <= 0) {
      toast({
        title: "Error de validación",
        description: "La fecha de salida debe ser posterior a la fecha de entrada",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property.id,
          checkIn: reservation.checkIn.toISOString(),
          checkOut: reservation.checkOut.toISOString(),
          guests: reservation.guests,
          totalPrice: total,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Error al realizar la reserva")
      }

      const data = await response.json()

      toast({
        title: "Reserva realizada",
        description: "Tu reserva ha sido realizada con éxito",
      })

      // Redirigir a la página de confirmación
      router.push(`/${locale}/reservations/${data.id}/confirmation`)
    } catch (error) {
      console.error("Error al realizar la reserva:", error)
      toast({
        title: "Error al realizar la reserva",
        description: error instanceof Error ? error.message : "Ha ocurrido un error inesperado",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
      <div className="flex items-baseline justify-between mb-4">
        <div className="text-xl font-semibold">{formatPrice(property.price)}</div>
        <div className="text-sm text-gray-600">noche</div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Llegada</Label>
            <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {reservation.checkIn ? format(reservation.checkIn, "PPP", { locale: es }) : <span>Seleccionar</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={reservation.checkIn}
                  onSelect={(date) => {
                    setReservation((prev) => ({
                      ...prev,
                      checkIn: date,
                      // Si la fecha de salida es anterior o igual a la nueva fecha de entrada,
                      // actualizar la fecha de salida para que sea el día siguiente
                      checkOut: prev.checkOut && date && prev.checkOut <= date ? addDays(date, 1) : prev.checkOut,
                    }))
                    setCheckInOpen(false)
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Salida</Label>
            <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {reservation.checkOut ? (
                    format(reservation.checkOut, "PPP", { locale: es })
                  ) : (
                    <span>Seleccionar</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={reservation.checkOut}
                  onSelect={(date) => {
                    setReservation((prev) => ({ ...prev, checkOut: date }))
                    setCheckOutOpen(false)
                  }}
                  disabled={(date) => {
                    const minDate = reservation.checkIn ? addDays(reservation.checkIn, 1) : new Date()
                    return date < minDate
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label htmlFor="guests">Huéspedes</Label>
          <Input
            id="guests"
            type="number"
            min={1}
            max={property.maxGuests}
            value={reservation.guests}
            onChange={(e) => setReservation((prev) => ({ ...prev, guests: Number.parseInt(e.target.value) || 1 }))}
          />
        </div>

        <Button
          className="w-full"
          disabled={isLoading || !reservation.checkIn || !reservation.checkOut || nights <= 0}
          onClick={handleReserve}
        >
          {isLoading ? "Procesando..." : "Reservar"}
        </Button>

        <p className="text-center text-sm text-gray-600">No se te cobrará todavía</p>

        {nights > 0 && (
          <div className="space-y-2 border-t pt-4 mt-4">
            <div className="flex justify-between">
              <span>
                {formatPrice(property.price)} x {nights} noches
              </span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tarifa de servicio</span>
              <span>{formatPrice(serviceFee)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2 mt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

