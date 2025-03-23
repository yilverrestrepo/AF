import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserReservations } from "@/lib/reservations"
import ReservationList from "@/components/reservations/ReservationList"
import ReservationFilters from "@/components/reservations/ReservationFilters"

export default async function ReservationsPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${params.locale}/login?callbackUrl=/${params.locale}/reservations`)
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

