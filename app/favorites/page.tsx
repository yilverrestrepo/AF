import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import OptimizedImage from "@/components/ui/optimized-image"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { StarIcon, MapPinIcon, BedIcon, BathIcon, HomeIcon } from "lucide-react"
import FavoriteButton from "@/components/properties/FavoriteButton"

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/login")
  }

  // Obtener los favoritos del usuario
  const favorites = await prisma.favorite.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      property: {
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mis Favoritos</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-6">No tienes propiedades guardadas en favoritos.</p>
          <Button asChild>
            <Link href="/properties">Explorar propiedades</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="relative group">
              <div className="absolute top-3 right-3 z-10">
                <FavoriteButton propertyId={favorite.property.id} initialIsFavorite={true} />
              </div>

              <Link href={`/properties/${favorite.property.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
                  <div className="relative h-48">
                    <OptimizedImage
                      src={favorite.property.images[0] || "/placeholder.svg"}
                      alt={favorite.property.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{favorite.property.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <span className="line-clamp-1">{favorite.property.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">
                          {favorite.property.rating ? favorite.property.rating.toFixed(1) : "Nuevo"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-sm">
                      <div className="flex items-center text-gray-600">
                        <BedIcon className="h-4 w-4 mr-1" />
                        <span>{favorite.property.bedrooms} hab.</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <BathIcon className="h-4 w-4 mr-1" />
                        <span>{favorite.property.bathrooms} baños</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <HomeIcon className="h-4 w-4 mr-1" />
                        <span>{favorite.property.squareFeet} m²</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="font-bold text-lg">€{favorite.property.price}/noche</div>
                      <div className="text-xs text-gray-500">
                        Guardado{" "}
                        {formatDistanceToNow(new Date(favorite.createdAt), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

