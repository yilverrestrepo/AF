import Link from "next/link"
import { formatDate, formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import OptimizedImage from "@/components/ui/optimized-image"
import type { Reservation } from "@/types/reservation"
import { Calendar, MapPin } from "lucide-react"

interface ReservationListProps {
  reservations: Reservation[]
  locale: string
}

export default function ReservationList({ reservations, locale }: ReservationListProps) {
  if (reservations.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">No tienes reservas</h2>
        <p className="text-gray-600 mb-4">Explora propiedades y realiza tu primera reserva</p>
        <Button asChild>
          <Link href={`/${locale}/properties`}>Explorar propiedades</Link>
        </Button>
      </div>
    )
  }

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

  return (
    <div className="space-y-6">
      {reservations.map((reservation) => (
        <div key={reservation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative h-48 md:h-full">
              <OptimizedImage
                src={reservation.property?.images[0] || "/placeholder.svg?height=400&width=600"}
                alt={reservation.property?.title || "Propiedad"}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 md:col-span-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{reservation.property?.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{reservation.property?.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
                    </span>
                  </div>

                  <Badge className={getStatusColor(reservation.status)}>{getStatusText(reservation.status)}</Badge>
                </div>

                <div className="text-right">
                  <div className="text-xl font-semibold">{formatPrice(reservation.totalPrice)}</div>
                  <div className="text-sm text-gray-600">{reservation.guests} huéspedes</div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                {reservation.status === "confirmed" && (
                  <Button variant="outline" asChild>
                    <Link href={`/${locale}/messages?reservationId=${reservation.id}`}>Contactar anfitrión</Link>
                  </Button>
                )}

                <Button asChild>
                  <Link href={`/${locale}/reservations/${reservation.id}`}>Ver detalles</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

