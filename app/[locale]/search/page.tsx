import { Suspense } from "react"
import { getProperties } from "@/lib/properties"
import AdvancedSearch from "@/components/search/AdvancedSearch"
import SearchResults from "@/components/search/SearchResults"
import SearchResultsSkeleton from "@/components/search/SearchResultsSkeleton"
import type { PropertyFilter } from "@/types/property"

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { locale: string }
  searchParams: PropertyFilter & { sort?: string }
}) {
  const properties = await getProperties(searchParams)

  // Ordenar propiedades según el parámetro sort
  const sortedProperties = [...properties]
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "price-asc":
        sortedProperties.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sortedProperties.sort((a, b) => b.price - a.price)
        break
      case "rating-desc":
        sortedProperties.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "newest":
        sortedProperties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Búsqueda avanzada</h1>

      <AdvancedSearch locale={params.locale} initialFilters={searchParams} />

      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults properties={sortedProperties} locale={params.locale} />
      </Suspense>
    </div>
  )
}

