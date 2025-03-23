import type { Property } from "@/types/property"
import { Bed, Bath, Users, MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import PropertyImageGallery from "./PropertyImageGallery"
import PropertyMap from "./PropertyMap"
import PropertyHost from "./PropertyHost"

interface PropertyDetailProps {
  property: Property
  locale: string
}

export default function PropertyDetail({ property, locale }: PropertyDetailProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>

      <div className="flex items-center gap-2 mb-4">
        {property.rating && (
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-gray-600 ml-1">({property.reviewCount} reseñas)</span>
          </div>
        )}
        <span className="text-gray-600">•</span>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {property.city}, {property.country}
          </span>
        </div>
      </div>

      <PropertyImageGallery images={property.images} title={property.title} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Acerca de este alojamiento</h2>
            <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
          </div>

          <div className="border-b py-6">
            <h2 className="text-xl font-semibold mb-4">Lo que ofrece este lugar</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-gray-600" />
                <span>{property.bedrooms} dormitorios</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-gray-600" />
                <span>{property.bathrooms} baños</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-600" />
                <span>Hasta {property.maxGuests} huéspedes</span>
              </div>

              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <Badge variant="outline">{amenity}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="py-6">
            <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
            <PropertyMap latitude={property.latitude} longitude={property.longitude} address={property.address} />
            <p className="mt-2 text-gray-600">
              {property.address}, {property.city}, {property.zipCode}, {property.country}
            </p>
          </div>
        </div>

        <div>
          <PropertyHost hostId={property.hostId} />
        </div>
      </div>
    </div>
  )
}

