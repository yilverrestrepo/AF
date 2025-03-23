import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUserReservations } from "@/lib/reservations"
import ReservationList from "@/components/reservations/ReservationList"
import ReservationFilters from "@/components/reservations/ReservationFilters"
import { Calendar } from "lucide-react"

export default async function ReservationsPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  // Si el usuario no está autenticado, mostrar un mensaje informativo
  if (!session) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12 border rounded-lg">
          <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Mis reservas</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Para ver y gestionar tus reservas, por favor inicia sesión o regístrate.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href={`/${params.locale}/login?callbackUrl=/${params.locale}/reservations`}>Iniciar sesión</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${params.locale}/properties`}>Explorar propiedades</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const reservations = await getUserReservations(session.user.id)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mis reservas</h1>

      <ReservationFilters locale={params.locale} />

      <div className="mt-6">
        <ReservationList reservations={reservations} locale={params.locale} />
      </div>
    </div>
  )
}

