"use client"

import { Badge } from "@/components/ui/badge"

import { useReservation } from "@/contexts/ReservationContext"
import { useUser } from "@/contexts/UserContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Users, DollarSign, X } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function GuestTrips() {
  const { user } = useUser()
  const { getReservationsForGuest, cancelReservation } = useReservation()
  const [reservations, setReservations] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    const loadReservations = async () => {
      if (user) {
        const guestReservations = await getReservationsForGuest(user.id)
        setReservations(guestReservations)
      }
    }
    loadReservations()
  }, [user, getReservationsForGuest])

  const handleCancelReservation = async (reservationId: string) => {
    try {
      await cancelReservation(reservationId, "Cancelled by guest")
      setReservations((prev) => prev.filter((r) => r.id !== reservationId))
      toast({
        title: "Reserva cancelada",
        description: "Tu reserva ha sido cancelada correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al cancelar la reserva. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Mis viajes</h2>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <Card key={reservation.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{reservation.listingTitle}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{reservation.listingTitle}</span>
                  </div>
                </div>
                <Badge className="bg-blue-500 text-white">Confirmada</Badge>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fechas</p>
                    <p className="font-medium text-sm">
                      {format(reservation.checkIn, "d MMM", { locale: es })} -{" "}
                      {format(reservation.checkOut, "d MMM", { locale: es })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Huéspedes</p>
                    <p className="font-medium text-sm">{reservation.guests}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-medium text-sm">${reservation.totalPrice} USD</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleCancelReservation(reservation.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancelar reserva
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tienes viajes programados</p>
        </div>
      )}
    </div>
  )
}

