"use client"

import { useUser } from "@/contexts/UserContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Calendar, MessageSquare, DollarSign, Star, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"

export default function HostHeader() {
  const { user } = useUser()

  // Mock data for host dashboard
  const stats = [
    {
      label: "Propiedades",
      value: "5",
      icon: Home,
      color: "bg-blue-100 text-blue-600",
      link: "#properties",
    },
    {
      label: "Reservas activas",
      value: "12",
      icon: Calendar,
      color: "bg-green-100 text-green-600",
      link: "#reservations",
    },
    {
      label: "Mensajes nuevos",
      value: "8",
      icon: MessageSquare,
      color: "bg-amber-100 text-amber-600",
      link: "#messages",
    },
    {
      label: "Ingresos (mes)",
      value: "$2,450",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
      link: "#analytics",
    },
    {
      label: "Valoración",
      value: "4.9",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
      link: "#reviews",
    },
    {
      label: "Ocupación",
      value: "78%",
      icon: TrendingUp,
      color: "bg-indigo-100 text-indigo-600",
      link: "#analytics",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Hola, {user?.name}</h1>
            <p className="text-muted-foreground">Panel de anfitrión</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/listings/create">
            <Button className="rounded-full">
              <Plus className="mr-2 h-4 w-4" />
              Nueva propiedad
            </Button>
          </Link>
          <Link href="/dashboard/host/settings">
            <Button variant="outline" className="rounded-full">
              Configuración
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className={`${stat.color} p-3 rounded-full mb-3`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

