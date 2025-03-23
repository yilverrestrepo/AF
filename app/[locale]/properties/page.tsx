import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getProperties } from "@/lib/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import OptimizedImage from "@/components/ui/optimized-image"
import { StarIcon, MapPinIcon, BedIcon, BathIcon } from "lucide-react"
import Price from "@/components/Price"
import AdvancedFilters from "@/components/properties/AdvancedFilters"

interface SearchParams {
  location?: string
  startDate?: string
  endDate?: string
  guests?: string
  page?: string
  limit?: string
}

export default async function PropertiesPage({
  params,
  searchParams,
}: {
  params: { locale: string }
  searchParams: SearchParams
}) {
  const session = await getServerSession(authOptions)

  // Convertir parámetros de búsqueda
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const limit = searchParams.limit ? Number.parseInt(searchParams.limit) : 12

  // Obtener propiedades
  const { properties, pagination } = await getProperties({
    location: searchParams.location,
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
    guests: searchParams.guests ? Number.parseInt(searchParams.guests) : undefined,
    page,
    limit,
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Propiedades disponibles</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          {searchParams.location && (
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {searchParams.location}
              <Link href={`/${params.locale}/properties`} className="ml-2 text-gray-500 hover:text-gray-700">
                ×
              </Link>
            </div>
          )}
          {searchParams.startDate && searchParams.endDate && (
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {new Date(searchParams.startDate).toLocaleDateString()} -{" "}
              {new Date(searchParams.endDate).toLocaleDateString()}
              <Link
                href={`/${params.locale}/properties${searchParams.location ? `?location=${searchParams.location}` : ""}`}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </Link>
            </div>
          )}
        </div>

        <AdvancedFilters
          onApplyFilters={(filters) => {
            console.log("Filtros aplicados:", filters)
            // Implementar la lógica para aplicar filtros
          }}
        />
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No se encontraron propiedades que coincidan con tu búsqueda.</p>
          <Button asChild>
            <Link href={`/${params.locale}/properties`}>Ver todas las propiedades</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <Link key={property.id} href={`/${params.locale}/properties/${property.id}`} className="group">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                  <div className="relative h-48">
                    <OptimizedImage
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                    {property.rating > 0 && (
                      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        {property.rating.toFixed(1)}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h2 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h2>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <BedIcon className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms} hab.</span>
                      </div>
                      <div className="flex items-center">
                        <BathIcon className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms} baños</span>
                      </div>
                    </div>

                    <Price price={property.price} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={{
                      pathname: `/${params.locale}/properties`,
                      query: {
                        ...searchParams,
                        page: pageNum.toString(),
                      },
                    }}
                  >
                    <Button variant={pageNum === page ? "default" : "outline"} size="sm" className="w-10">
                      {pageNum}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

