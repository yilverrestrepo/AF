import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import type { Property } from "@/types/property"
import OptimizedImage from "@/components/ui/optimized-image"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface PropertyCardProps {
  property: Property
  locale: string
}

export default function PropertyCard({ property, locale }: PropertyCardProps) {
  return (
    <Link
      href={`/${locale}/properties/${property.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48">
        <OptimizedImage
          src={property.images[0] || "/placeholder.svg?height=400&width=600"}
          alt={property.title}
          fill
          className="object-cover"
        />
        {property.featured && <Badge className="absolute top-2 left-2 bg-primary">Destacado</Badge>}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
          {property.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{property.rating}</span>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-1">
          {property.city}, {property.country}
        </p>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <span>{property.bedrooms} hab.</span>
          <span>•</span>
          <span>{property.bathrooms} baños</span>
          <span>•</span>
          <span>Máx. {property.maxGuests} huéspedes</span>
        </div>
        <div className="mt-3 font-semibold">
          {formatPrice(property.price)} <span className="text-gray-600 font-normal">noche</span>
        </div>
      </div>
    </Link>
  )
}

