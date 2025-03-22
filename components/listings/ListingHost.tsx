import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageSquare, Shield, Star, Clock, Home } from "lucide-react"

interface Host {
  name: string
  image: string
  rating: number
  responseRate: number
  responseTime: string
  joined: string
  isSuperhost?: boolean
}

export default function ListingHost({ host }: { host: Host }) {
  return (
    <div className="border rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden">
          <Image src={host.image || "/placeholder.svg"} alt={host.name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Anfitrión: {host.name}</h3>
          <p className="text-sm text-muted-foreground">Miembro desde {host.joined}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
            <Star className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{host.rating} estrellas</p>
            <p className="text-sm text-muted-foreground">Calificación</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">Identidad verificada</p>
            <p className="text-sm text-muted-foreground">Seguridad</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{host.responseTime}</p>
            <p className="text-sm text-muted-foreground">Tiempo de respuesta</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{host.responseRate}%</p>
            <p className="text-sm text-muted-foreground">Tasa de respuesta</p>
          </div>
        </div>
      </div>

      {host.isSuperhost && (
        <div className="bg-accent/50 p-4 rounded-lg flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center shrink-0">
            <Home className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium">{host.name} es Superanfitrión</p>
            <p className="text-sm text-muted-foreground">
              Los Superanfitriones son anfitriones experimentados y evaluados al más alto nivel, que se comprometen a
              ofrecer estancias excelentes a sus huéspedes.
            </p>
          </div>
        </div>
      )}

      <Button className="w-full rounded-full">
        <MessageSquare className="mr-2 h-4 w-4" />
        Contactar al anfitrión
      </Button>
    </div>
  )
}

