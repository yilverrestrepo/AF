"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, MessageSquare, Calendar, User, Home, DollarSign, Clock, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo para reservas
const reservations = [
  {
    id: 1,
    property: {
      id: 1,
      title: "Villa con vista al mar",
      image: "/images/listings/listing-1.jpg",
    },
    guest: {
      id: 1,
      name: "Laura García",
      image: "/images/avatars/avatar-1.jpg",
    },
    checkIn: "2023-08-15",
    checkOut: "2023-08-20",
    guests: 4,
    total: 1250,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2023-07-01",
  },
  {
    id: 2,
    property: {
      id: 1,
      title: "Villa con vista al mar",
      image: "/images/listings/listing-1.jpg",
    },
    guest: {
      id: 2,
      name: "Carlos Rodríguez",
      image: "/images/avatars/avatar-2.jpg",
    },
    checkIn: "2023-08-25",
    checkOut: "2023-08-30",
    guests: 2,
    total: 1250,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2023-07-15",
  },
  {
    id: 3,
    property: {
      id: 2,
      title: "Cabaña en la montaña",
      image: "/images/listings/listing-2.jpg",
    },
    guest: {
      id: 3,
      name: "Miguel Pérez",
      image: "/images/avatars/avatar-3.jpg",
    },
    checkIn: "2023-09-05",
    checkOut: "2023-09-08",
    guests: 3,
    total: 360,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2023-07-20",
  },
  {
    id: 4,
    property: {
      id: 3,
      title: "Apartamento de lujo",
      image: "/images/listings/listing-3.jpg",
    },
    guest: {
      id: 4,
      name: "Ana Martínez",
      image: "/images/avatars/avatar-4.jpg",
    },
    checkIn: "2023-09-10",
    checkOut: "2023-09-15",
    guests: 2,
    total: 900,
    status: "cancelled",
    paymentStatus: "refunded",
    createdAt: "2023-07-25",
  },
  {
    id: 5,
    property: {
      id: 4,
      title: "Casa de playa",
      image: "/images/listings/listing-4.jpg",
    },
    guest: {
      id: 5,
      name: "Sofía López",
      image: "/images/avatars/avatar-5.jpg",
    },
    checkIn: "2023-10-01",
    checkOut: "2023-10-05",
    guests: 6,
    total: 800,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2023-08-01",
  },
]

export default function HostReservations() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [reservationsList, setReservationsList] = useState(reservations)

  const handleAcceptReservation = (id: number) => {
    setReservationsList(
      reservationsList.map((reservation) =>
        reservation.id === id ? { ...reservation, status: "confirmed" } : reservation,
      ),
    )

    toast({
      title: "Reserva aceptada",
      description: "La reserva ha sido aceptada correctamente.",
    })
  }

  const handleRejectReservation = (id: number) => {
    // Show confirmation toast
    toast({
      title: "¿Estás seguro?",
      description: "Esta acción no se puede deshacer.",
      action: (
        <Button
          variant="destructive"
          onClick={() => {
            setReservationsList(
              reservationsList.map((reservation) =>
                reservation.id === id ? { ...reservation, status: "cancelled" } : reservation,
              ),
            )

            toast({
              title: "Reserva rechazada",
              description: "La reserva ha sido rechazada correctamente.",
            })
          }}
        >
          Rechazar
        </Button>
      ),
    })
  }

  const filteredReservations = reservationsList.filter(
    (reservation) =>
      reservation.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.property.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold">Mis reservas</h2>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por huésped o propiedad"
            className="pl-9 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmadas</TabsTrigger>
          <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onAccept={() => handleAcceptReservation(reservation.id)}
                onReject={() => handleRejectReservation(reservation.id)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No se encontraron reservas</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filteredReservations
            .filter((r) => r.status === "pending")
            .map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onAccept={() => handleAcceptReservation(reservation.id)}
                onReject={() => handleRejectReservation(reservation.id)}
              />
            ))}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          {filteredReservations
            .filter((r) => r.status === "confirmed")
            .map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onAccept={() => handleAcceptReservation(reservation.id)}
                onReject={() => handleRejectReservation(reservation.id)}
              />
            ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {filteredReservations
            .filter((r) => r.status === "cancelled")
            .map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onAccept={() => handleAcceptReservation(reservation.id)}
                onReject={() => handleRejectReservation(reservation.id)}
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReservationCard({
  reservation,
  onAccept,
  onReject,
}: {
  reservation: any
  onAccept: () => void
  onReject: () => void
}) {
  const checkIn = parseISO(reservation.checkIn)
  const checkOut = parseISO(reservation.checkOut)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={reservation.guest.image || "/placeholder.svg"}
                    alt={reservation.guest.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{reservation.guest.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{reservation.guests} huéspedes</span>
                  </div>
                </div>
              </div>
              <Badge
                className={
                  reservation.status === "confirmed"
                    ? "bg-green-500"
                    : reservation.status === "pending"
                      ? "bg-amber-500"
                      : "bg-gray-500"
                }
              >
                {reservation.status === "confirmed"
                  ? "Confirmada"
                  : reservation.status === "pending"
                    ? "Pendiente"
                    : "Cancelada"}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Propiedad</p>
                  <p className="font-medium text-sm">{reservation.property.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Fechas</p>
                  <p className="font-medium text-sm">
                    {format(checkIn, "d MMM", { locale: es })} - {format(checkOut, "d MMM", { locale: es })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-medium text-sm">${reservation.total} USD</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <p className="text-sm">Estado de pago:</p>
              <Badge
                variant="outline"
                className={
                  reservation.paymentStatus === "paid"
                    ? "border-green-500 text-green-600"
                    : reservation.paymentStatus === "pending"
                      ? "border-amber-500 text-amber-600"
                      : "border-gray-500 text-gray-600"
                }
              >
                {reservation.paymentStatus === "paid"
                  ? "Pagado"
                  : reservation.paymentStatus === "pending"
                    ? "Pendiente"
                    : "Reembolsado"}
              </Badge>
              <p className="text-xs text-muted-foreground ml-auto">
                <Clock className="h-3 w-3 inline mr-1" />
                Solicitada el {format(parseISO(reservation.createdAt), "d MMM yyyy", { locale: es })}
              </p>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-2 justify-end">
            <Button variant="outline" size="sm" className="rounded-full">
              <MessageSquare className="h-4 w-4 mr-1" />
              Mensaje
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Calendar className="h-4 w-4 mr-1" />
              Detalles
            </Button>
            {reservation.status === "pending" && (
              <>
                <Button size="sm" className="rounded-full bg-green-600 hover:bg-green-700" onClick={onAccept}>
                  <Check className="h-4 w-4 mr-1" />
                  Aceptar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-destructive border-destructive hover:bg-destructive/10"
                  onClick={onReject}
                >
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

