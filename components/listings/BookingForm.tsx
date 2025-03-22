"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Users, Info, Check, Clock } from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useReservation } from "@/contexts/ReservationContext"
import { useUser } from "@/contexts/UserContext"

type Listing = {
  id: number
  title: string
  slug: string
  price: number
  guests: number
}

export default function BookingForm({ listing }: { listing: Listing }) {
  const { toast } = useToast()
  const { createReservationRequest, isLoading } = useReservation()
  const { user } = useUser()

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const [guests, setGuests] = useState(1)
  const [message, setMessage] = useState("")
  const [step, setStep] = useState<"dates" | "details" | "confirmation">("dates")

  // Calcular número de noches
  const nights = dateRange.from && dateRange.to ? differenceInDays(dateRange.to, dateRange.from) : 0

  // Calcular subtotal
  const subtotal = nights * listing.price

  // Calcular impuestos (19% IVA)
  const tax = subtotal * 0.19

  // Calcular tarifa de servicio (10%)
  const serviceFee = subtotal * 0.1

  // Calcular total
  const total = subtotal + tax + serviceFee

  const handleNextStep = () => {
    if (step === "dates") {
      if (!dateRange.from || !dateRange.to) {
        toast({
          title: "Error",
          description: "Por favor selecciona las fechas de tu estancia",
          variant: "destructive",
        })
        return
      }
      setStep("details")
    } else if (step === "details") {
      setStep("confirmation")
    }
  }

  const handlePrevStep = () => {
    if (step === "details") {
      setStep("dates")
    } else if (step === "confirmation") {
      setStep("details")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para realizar una reserva",
        variant: "destructive",
      })
      return
    }

    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Error",
        description: "Por favor selecciona las fechas de tu estancia",
        variant: "destructive",
      })
      return
    }

    try {
      // Create reservation request
      await createReservationRequest({
        listingId: listing.id.toString(),
        listingTitle: listing.title,
        hostId: "2", // Mock host ID
        guestId: user.id,
        checkIn: dateRange.from,
        checkOut: dateRange.to,
        guests,
        totalPrice: total,
      })

      // Show success message
      toast({
        title: "¡Solicitud enviada!",
        description: "Tu solicitud de reserva ha sido enviada al anfitrión. Te notificaremos cuando responda.",
        variant: "default",
      })

      // Reset form
      setDateRange({ from: undefined, to: undefined })
      setGuests(1)
      setMessage("")
      setStep("dates")
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al enviar tu solicitud. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="border rounded-xl p-6 shadow-lg bg-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === "dates" && (
          <>
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-2xl">${listing.price} USD</span>
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
                          "w-full justify-start text-left font-normal h-12 rounded-xl",
                          !dateRange.from && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
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
                        disabled={{ before: new Date() }}
                        locale={es}
                        className="rounded-xl"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="font-medium">Huéspedes</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                    <Input
                      type="number"
                      min="1"
                      max={listing.guests}
                      className="pl-9 h-12 rounded-xl"
                      value={guests}
                      onChange={(e) => setGuests(Number.parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Máximo {listing.guests} huéspedes</p>
                </div>
              </div>
            </div>

            {nights > 0 && (
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    ${listing.price} x {nights} noches
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
                <div className="flex justify-between font-bold border-t pt-3 mt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)} USD</span>
                </div>
              </div>
            )}

            <Button
              type="button"
              className="w-full h-12 rounded-xl text-base btn-primary-gradient"
              disabled={!dateRange.from || !dateRange.to}
              onClick={handleNextStep}
            >
              Continuar
            </Button>
          </>
        )}

        {step === "details" && (
          <>
            <div>
              <h3 className="font-semibold text-lg mb-4">Detalles de la reserva</h3>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fechas</span>
                  <span className="font-medium">
                    {dateRange.from && dateRange.to ? (
                      <>
                        {format(dateRange.from, "d MMM", { locale: es })} -{" "}
                        {format(dateRange.to, "d MMM", { locale: es })}
                      </>
                    ) : (
                      "No seleccionadas"
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Huéspedes</span>
                  <span className="font-medium">{guests}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">${total.toFixed(2)} USD</span>
                </div>

                <div className="space-y-2 pt-4">
                  <label className="font-medium text-sm">Mensaje para el anfitrión (opcional)</label>
                  <Textarea
                    placeholder="Preséntate y cuéntale al anfitrión por qué viajas"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl" onClick={handlePrevStep}>
                Atrás
              </Button>

              <Button type="button" className="flex-1 h-12 rounded-xl btn-primary-gradient" onClick={handleNextStep}>
                Continuar
              </Button>
            </div>
          </>
        )}

        {step === "confirmation" && (
          <>
            <div>
              <h3 className="font-semibold text-lg mb-4">Confirmar solicitud</h3>

              <div className="bg-accent/50 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Solicitud de reserva</p>
                    <p className="text-sm text-muted-foreground">
                      Esta no es una reserva instantánea. El anfitrión tiene 24 horas para confirmar tu solicitud.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Propiedad</span>
                  <span className="font-medium">{listing.title}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fechas</span>
                  <span className="font-medium">
                    {dateRange.from && dateRange.to ? (
                      <>
                        {format(dateRange.from, "d MMM", { locale: es })} -{" "}
                        {format(dateRange.to, "d MMM", { locale: es })}
                      </>
                    ) : (
                      "No seleccionadas"
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Huéspedes</span>
                  <span className="font-medium">{guests}</span>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      ${listing.price} x {nights} noches
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
                  <div className="flex justify-between font-bold border-t pt-3 mt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)} USD</span>
                  </div>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Política de pago</p>
                      <p className="text-sm text-muted-foreground">
                        No se te cobrará hasta que el anfitrión confirme tu solicitud. Una vez confirmada, se procesará
                        el pago.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl" onClick={handlePrevStep}>
                Atrás
              </Button>

              <Button type="submit" className="flex-1 h-12 rounded-xl btn-primary-gradient" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Enviar solicitud"
                )}
              </Button>
            </div>
          </>
        )}

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <p>No se te cobrará hasta la confirmación</p>
        </div>

        <div className="bg-accent/50 p-3 rounded-lg flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">Cancelación gratuita hasta 48 horas antes de la llegada</p>
        </div>
      </form>
    </div>
  )
}

