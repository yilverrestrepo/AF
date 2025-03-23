import { getProperties } from "@/lib/properties"
import PropertyCard from "./PropertyCard"
import type { PropertyFilter } from "@/types/property"

interface PropertyListProps {
  locale: string
  filters?: PropertyFilter
}

export default async function PropertyList({ locale, filters }: PropertyListProps) {
  // Obtener propiedades con los filtros aplicados
  const properties = await getProperties(filters)

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No se encontraron propiedades</h2>
        <p className="text-gray-600">Intenta con otros filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} locale={locale} />
      ))}
    </div>
  )
}

