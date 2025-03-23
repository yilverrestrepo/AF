import { getHostInfo } from "@/lib/users"
import OptimizedImage from "@/components/ui/optimized-image"
import { Button } from "@/components/ui/button"
import { MessageSquare, Shield, Star } from "lucide-react"

interface PropertyHostProps {
  hostId: string
}

export default async function PropertyHost({ hostId }: PropertyHostProps) {
  const host = await getHostInfo(hostId)

  if (!host) {
    return null
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Anfitrión: {host.name}</h3>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden">
          <OptimizedImage
            src={host.image || "/placeholder.svg?height=100&width=100"}
            alt={host.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm text-gray-600">Miembro desde {host.memberSince}</p>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm">
              {host.rating} · {host.reviewCount} reseñas
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span className="text-sm">Identidad verificada</span>
        </div>
        <p className="text-sm">{host.bio}</p>
      </div>

      <Button className="w-full flex items-center justify-center gap-2">
        <MessageSquare className="h-4 w-4" />
        Contactar con el anfitrión
      </Button>
    </div>
  )
}

