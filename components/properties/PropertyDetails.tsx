import type React from "react"
import {
  StarIcon,
  MapPinIcon,
  BedIcon,
  BathIcon,
  HomeIcon,
  WifiIcon,
  TvIcon,
  CarIcon,
  UtensilsIcon,
} from "lucide-react"
import OptimizedImage from "@/components/ui/optimized-image"
import { Badge } from "@/components/ui/badge"

interface PropertyDetailsProps {
  property: {
    id: string
    title: string
    description: string
    location: string
    price: number
    bedrooms: number
    bathrooms: number
    squareFeet: number
    amenities: string[]
    images: string[]
    ownerId: string
    owner?: {
      id: string
      name: string
      image?: string
    }
    rating?: number
    reviewsCount?: number
  }
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  // Mapeo de amenidades a iconos
  const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <WifiIcon className="h-4 w-4 mr-2" />,
    tv: <TvIcon className="h-4 w-4 mr-2" />,
    parking: <CarIcon className="h-4 w-4 mr-2" />,
    kitchen: <UtensilsIcon className="h-4 w-4 mr-2" />,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{property.location}</span>
          </div>
          {property.rating && (
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-medium">{property.rating.toFixed(1)}</span>
              {property.reviewsCount && <span className="text-gray-500 ml-1">({property.reviewsCount} reseñas)</span>}
            </div>
          )}
        </div>
      </div>

      {property.images && property.images.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <OptimizedImage
              src={property.images[0]}
              alt={property.title}
              width={800}
              height={500}
              className="rounded-lg w-full h-[400px] object-cover"
            />
          </div>
          {property.images.slice(1, 5).map((image, index) => (
            <OptimizedImage
              key={index}
              src={image}
              alt={`${property.title} - Imagen ${index + 2}`}
              width={400}
              height={300}
              className="rounded-lg w-full h-[200px] object-cover"
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Descripción</h2>
            <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Características</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <BedIcon className="h-5 w-5 mr-2 text-gray-500" />
                <span>
                  {property.bedrooms} {property.bedrooms === 1 ? "Habitación" : "Habitaciones"}
                </span>
              </div>
              <div className="flex items-center">
                <BathIcon className="h-5 w-5 mr-2 text-gray-500" />
                <span>
                  {property.bathrooms} {property.bathrooms === 1 ? "Baño" : "Baños"}
                </span>
              </div>
              <div className="flex items-center">
                <HomeIcon className="h-5 w-5 mr-2 text-gray-500" />
                <span>{property.squareFeet} m²</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Comodidades</h2>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <Badge key={amenity} variant="outline" className="flex items-center px-3 py-1">
                  {amenityIcons[amenity.toLowerCase()] || null}
                  <span>{amenity}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          {property.owner && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Anfitrión</h3>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                  {property.owner.image ? (
                    <OptimizedImage
                      src={property.owner.image}
                      alt={property.owner.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground">
                      {property.owner.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{property.owner.name}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

