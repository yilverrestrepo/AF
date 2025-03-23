"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDate, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import OptimizedImage from "@/components/ui/optimized-image"
import type { Reservation } from "@/types/reservation"
import { toast } from "@/hooks/use-toast"
import { Calendar, MapPin, MessageSquare, User, Home, CreditCard } from "lucide-react"
import { differenceInDays } from "date-fns"

interface ReservationDetailProps {
  reservation: Reservation
  locale: string
}

export default function ReservationDetail({ reservation, locale }: ReservationDetailProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  // Calcular el número de noches
  const nights = differenceInDays(new Date(reservation.checkOut), new Date(reservation.checkIn))

  // Función para obtener el color de la insignia según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Función para traducir el estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "pending":
        return "Pendiente"
      case "cancelled":
        return "Cancelada"
      case "completed":
        return "Completada"
      default:
        return status
    }
  }

  const handleCancelReservation = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/reservations/${reservation.id}/cancel`, {
        method: "POST",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Error al cancelar la reserva")
      }

      toast({
        title: "Reserva cancelada",
        description: "Tu reserva ha sido cancelada correctamente",
      })

      // Recargar la página para actualizar el estado
      router.refresh()
    } catch (error) {
      console.error("Error al cancelar la reserva:", error)
      toast({
        title: "Error al cancelar la reserva",
        description: error instanceof Error ? error.message : "Ha ocurrido un error inesperado",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setShowCancelDialog(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Información de la reserva</CardTitle>
                <CardDescription>Detalles de tu reserva</CardDescription>
              </div>
              <Badge className={getStatusColor(reservation.status)}>{getStatusText(reservation.status)}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Fechas</p>
                  <p className="text-gray-600">
                    {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
                  </p>
                  <p className="text-gray-600">{nights} noches</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <User className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Huéspedes</p>
                  <p className="text-gray-600">{reservation.guests} huéspedes</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-2">
              <CreditCard className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Información de pago</p>
                <p className="text-gray-600">Total pagado: {formatPrice(reservation.totalPrice)}</p>
                <p className="text-gray-600">Método de pago: Tarjeta de crédito</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            {reservation.status === "confirmed" && (
              <>
                <Button variant="outline" asChild>
                  <Link href={`/${locale}/messages?reservationId=${reservation.id}`}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contactar anfitrión
                  </Link>
                </Button>
                <Button variant="destructive" onClick={() => setShowCancelDialog(true)} disabled={isLoading}>
                  Cancelar reserva
                </Button>
              </>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instrucciones de llegada</CardTitle>
            <CardDescription>Información para tu llegada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Dirección</p>
                <p className="text-gray-600">{reservation.property?.location}</p>
                <p className="text-gray-600">Código postal: 28001</p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="font-medium">Instrucciones del anfitrión</p>
              <p className="text-gray-600 mt-1">
                Las llaves se encuentran en la recepción del edificio. Por favor, muestra tu confirmación de reserva al
                llegar. El check-in es a partir de las 15:00 y el check-out antes de las 11:00.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Propiedad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-48 rounded-lg overflow-hidden">
              <OptimizedImage
                src={reservation.property?.images[0] || "/placeholder.svg?height=400&width=600"}
                alt={reservation.property?.title || "Propiedad"}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="font-semibold text-lg">{reservation.property?.title}</h3>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{reservation.property?.location}</span>
              </div>
            </div>

            <Button asChild className="w-full">
              <Link href={`/${locale}/properties/${reservation.property?.id}`}>
                <Home className="h-4 w-4 mr-2" />
                Ver propiedad
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción cancelará tu reserva. Dependiendo de la política de cancelación, podrías recibir un reembolso
              parcial o total.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, mantener reserva</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelReservation}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Cancelando..." : "Sí, cancelar reserva"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

