import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, MessageSquare, Calendar } from "lucide-react"

// Datos de ejemplo para reservas
const reservations = [
  {
    id: 1,
    property: "Villa con vista al mar",
    guest: "Laura García",
    checkIn: "2023-07-15",
    checkOut: "2023-07-20",
    guests: 4,
    total: 1250,
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: 2,
    property: "Villa con vista al mar",
    guest: "Carlos Rodríguez",
    checkIn: "2023-08-05",
    checkOut: "2023-08-10",
    guests: 2,
    total: 1250,
    status: "pending",
    paymentStatus: "pending",
  },
  {
    id: 3,
    property: "Cabaña en la montaña",
    guest: "Miguel Pérez",
    checkIn: "2023-07-25",
    checkOut: "2023-07-28",
    guests: 3,
    total: 360,
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: 4,
    property: "Apartamento de lujo",
    guest: "Ana Martínez",
    checkIn: "2023-09-10",
    checkOut: "2023-09-15",
    guests: 2,
    total: 900,
    status: "cancelled",
    paymentStatus: "refunded",
  },
]

export default function DashboardReservations() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Mis reservas</h2>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmadas</TabsTrigger>
          <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {reservations
            .filter((r) => r.status === "pending")
            .map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          {reservations
            .filter((r) => r.status === "confirmed")
            .map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {reservations
            .filter((r) => r.status === "cancelled")
            .map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReservationCard({ reservation }: { reservation: any }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{reservation.property}</h3>
                <p className="text-sm text-muted-foreground">Reserva #{reservation.id}</p>
              </div>
              <Badge
                variant={
                  reservation.status === "confirmed"
                    ? "default"
                    : reservation.status === "pending"
                      ? "outline"
                      : "secondary"
                }
              >
                {reservation.status === "confirmed"
                  ? "Confirmada"
                  : reservation.status === "pending"
                    ? "Pendiente"
                    : "Cancelada"}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Huésped</p>
                <p className="font-medium">{reservation.guest}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fechas</p>
                <p className="font-medium">
                  {reservation.checkIn} - {reservation.checkOut}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Huéspedes</p>
                <p className="font-medium">{reservation.guests}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-medium">${reservation.total} USD</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <p className="text-sm">Estado de pago:</p>
              <Badge
                variant={
                  reservation.paymentStatus === "paid"
                    ? "default"
                    : reservation.paymentStatus === "pending"
                      ? "outline"
                      : "secondary"
                }
              >
                {reservation.paymentStatus === "paid"
                  ? "Pagado"
                  : reservation.paymentStatus === "pending"
                    ? "Pendiente"
                    : "Reembolsado"}
              </Badge>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-2 justify-end">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              Mensaje
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-1" />
              Detalles
            </Button>
            {reservation.status === "pending" && (
              <>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Check className="h-4 w-4 mr-1" />
                  Aceptar
                </Button>
                <Button variant="destructive" size="sm">
                  <X className="h-4 w-4 mr-1" />
                  Rechazar
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

