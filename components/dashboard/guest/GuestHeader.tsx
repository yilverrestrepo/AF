"use client"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { useUser } from "@/contexts/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Home, Calendar, Heart, Star, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"

export default function GuestHeader() {
  const { user } = useUser()

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
            <p className="text-muted-foreground">Panel de huésped</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/listings">
            <Button className="rounded-full">
              <Home className="mr-2 h-4 w-4" />
              Explorar propiedades
            </Button>
          </Link>
          <Link href="/dashboard/guest/settings">
            <Button variant="outline" className="rounded-full">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3">
              <Calendar className="h-5 w-5" />
            </div>
            <p className="text-muted-foreground text-sm">Próximos viajes</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-red-100 text-red-600 p-3 rounded-full mb-3">
              <Heart className="h-5 w-5" />
            </div>
            <p className="text-muted-foreground text-sm">Lista de deseos</p>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-green-100 text-green-600 p-3 rounded-full mb-3">
              <Star className="h-5 w-5" />
            </div>
            <p className="text-muted-foreground text-sm">Reseñas</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-full mb-3">
              <MessageSquare className="h-5 w-5" />
            </div>
            <p className="text-muted-foreground text-sm">Mensajes</p>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

