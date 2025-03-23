import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getProperty } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import OptimizedImage from "@/components/ui/optimized-image"
import PropertyDetails from "@/components/properties/PropertyDetails"
import Price from "@/components/Price"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ContactHost from "@/components/properties/ContactHost"
import FavoriteButton from "@/components/properties/FavoriteButton"
import AvailabilityCalendar from "@/components/properties/AvailabilityCalendar"

interface SearchParams {
  startDate?: string
  endDate?: string
}

export default async function PropertyPage({
  params,
  searchParams,
}: {
  params: { id: string; locale: string }
  searchParams: SearchParams
}) {
  const session = await getServerSession(authOptions)
  const property = await getProperty(params.id)

  if (!property) {
    notFound()
  }

  // Verificar si el usuario es el propietario
  const isOwner = session?.user?.id === property.ownerId

  // Verificar si la propiedad está en favoritos
  let isFavorite = false
  if (session?.user) {
    const favoriteResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/favorites/${property.id}`, {
      headers: {
        Cookie: `next-auth.session-token=${session.user.id}`,
      },
    })
      .then((res) => res.json())
      .catch(() => ({ isFavorite: false }))

    isFavorite = favoriteResponse.isFavorite
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href={`/${params.locale}/properties`} className="text-primary hover:underline">
          ← Volver a propiedades
        </Link>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <OptimizedImage
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative h-[190px] rounded-lg overflow-hidden">
                <OptimizedImage
                  src={image}
                  alt={`${property.title} - Imagen ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="absolute top-4 right-4 z-10">
            <FavoriteButton propertyId={property.id} initialIsFavorite={isFavorite} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PropertyDetails property={property} />

            <div className="mt-8">
              <AvailabilityCalendar propertyId={property.id} isOwner={isOwner} />
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <Price price={property.price} size="lg" />

                {property.rating > 0 && (
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 font-medium">{property.rating.toFixed(1)}</span>
                    <span className="text-gray-500 ml-1">({property.reviewsCount})</span>
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Llegada</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {searchParams.startDate ? (
                            format(new Date(searchParams.startDate), "dd/MM/yyyy")
                          ) : (
                            <span>Seleccionar</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" disabled={(date) => date < new Date()} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Salida</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {searchParams.endDate ? (
                            format(new Date(searchParams.endDate), "dd/MM/yyyy")
                          ) : (
                            <span>Seleccionar</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" disabled={(date) => date < new Date()} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {!isOwner && (
                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    Reservar ahora
                  </Button>

                  <ContactHost hostId={property.ownerId} propertyId={property.id} propertyTitle={property.title} />
                </div>
              )}

              {isOwner && (
                <div className="space-y-4">
                  <Button asChild className="w-full">
                    <Link href={`/${params.locale}/properties/${property.id}/edit`}>Editar propiedad</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

