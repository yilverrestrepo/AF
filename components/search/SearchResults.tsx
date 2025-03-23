import type { Property } from "@/types/property"
import PropertyCard from "@/components/properties/PropertyCard"
import { MapPin } from "lucide-react"

interface SearchResultsProps {
  properties: Property[]
  locale: string
}

export default function SearchResults({ properties, locale }: SearchResultsProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No se encontraron propiedades</h2>
        <p className="text-gray-600">Intenta con otros filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-4 text-gray-600">{properties.length} propiedades encontradas</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} locale={locale} />
        ))}
      </div>
    </div>
  )
}

