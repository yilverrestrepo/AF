import Link from "next/link"
import { formatDate, formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Reservation } from "@/types/reservation"

interface RecentReservationsProps {
  reservations: Reservation[]
  locale: string
}

export default function RecentReservations({ reservations, locale }: RecentReservationsProps) {
  if (reservations.length === 0) {
    return <p className="text-gray-500">No hay reservas recientes.</p>
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
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <Link
          key={reservation.id}
          href={`/${locale}/reservations/${reservation.id}`}
          className="block p-4 rounded-lg border hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{reservation.property?.title}</h3>
              <p className="text-sm text-gray-600">
                {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
              </p>
              <p className="text-sm text-gray-600">{reservation.guests} huéspedes</p>
            </div>
            <div className="text-right">
              <Badge className={getStatusColor(reservation.status)}>{getStatusText(reservation.status)}</Badge>
              <p className="font-medium mt-1">{formatPrice(reservation.totalPrice)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

