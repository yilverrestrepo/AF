"use client"

import { useUser } from "@/contexts/UserContext"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Calendar, DollarSign, Star, TrendingUp, Users } from "lucide-react"

export default function AdminHeader() {
  const { user } = useUser()

  // Mock data for admin dashboard
  const stats = [
    {
      label: "Usuarios",
      value: "125",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Propiedades",
      value: "50",
      icon: Home,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Reservas",
      value: "240",
      icon: Calendar,
      color: "bg-amber-100 text-amber-600",
    },
    {
      label: "Ingresos (mes)",
      value: "$12,450",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Valoración media",
      value: "4.7",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Ocupación media",
      value: "68%",
      icon: TrendingUp,
      color: "bg-indigo-100 text-indigo-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary">
          <AvatarImage src={user?.image} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">Panel de administración</h1>
          <p className="text-muted-foreground">Bienvenido, {user?.name}</p>
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

