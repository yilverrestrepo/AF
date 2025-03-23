import { getUserStats } from "@/lib/dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RecentReservations from "./RecentReservations"
import RevenueChart from "./RevenueChart"
import { Home, Calendar, MessageSquare, Star } from "lucide-react"

interface DashboardOverviewProps {
  userId: string
  locale: string
}

export default async function DashboardOverview({ userId, locale }: DashboardOverviewProps) {
  const stats = await getUserStats(userId)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Propiedades</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.propertyCount}</div>
            <p className="text-xs text-muted-foreground">
              {stats.propertyCountChange >= 0 ? "+" : ""}
              {stats.propertyCountChange} desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reservas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reservationCount}</div>
            <p className="text-xs text-muted-foreground">
              {stats.reservationCountChange >= 0 ? "+" : ""}
              {stats.reservationCountChange} desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Mensajes</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messageCount}</div>
            <p className="text-xs text-muted-foreground">{stats.unreadMessageCount} sin leer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valoración</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">De {stats.reviewCount} reseñas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ingresos</CardTitle>
            <CardDescription>Ingresos de los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <RevenueChart data={stats.revenueData} />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Reservas recientes</CardTitle>
            <CardDescription>Últimas reservas recibidas</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentReservations reservations={stats.recentReservations} locale={locale} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

