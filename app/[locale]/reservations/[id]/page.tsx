import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { getReservation } from "@/lib/reservations"
import ReservationDetail from "@/components/reservations/ReservationDetail"

export default async function ReservationDetailPage({ params }: { params: { locale: string; id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${params.locale}/login?callbackUrl=/${params.locale}/reservations/${params.id}`)
  }

  const reservation = await getReservation(params.id)

  if (!reservation) {
    notFound()
  }

  // Verificar que la reserva pertenece al usuario actual
  if (reservation.userId !== session.user.id) {
    redirect(`/${params.locale}/reservations`)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Detalles de la reserva</h1>

      <ReservationDetail reservation={reservation} locale={params.locale} />
    </div>
  )
}

