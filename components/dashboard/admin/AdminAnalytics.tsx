"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Home, Users, Calendar, TrendingUp, Star } from "lucide-react"

export default function AdminAnalytics() {
  // Mock data for analytics
  const analytics = [
    {
      label: "Ingresos totales",
      value: "$54,320",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Propiedades activas",
      value: "45",
      icon: Home,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Usuarios registrados",
      value: "285",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Reservas confirmadas",
      value: "512",
      icon: Calendar,
      color: "bg-amber-100 text-amber-600",
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {analytics.map((stat, index) => (
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

