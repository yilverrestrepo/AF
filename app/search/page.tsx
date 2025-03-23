import { Suspense } from "react"
import SearchFilters from "@/components/search-filters"
import PropertyList from "@/components/property-list"
import SearchMap from "@/components/search-map"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="container px-4 md:px-6 py-6">
      <h1 className="text-3xl font-bold mb-6">Buscar propiedades</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SearchFilters searchParams={searchParams} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="h-[300px] md:h-[400px] rounded-lg overflow-hidden border">
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <SearchMap />
            </Suspense>
          </div>

          <Suspense fallback={<PropertyListSkeleton />}>
            <PropertyList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function PropertyListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
          <Skeleton className="h-[200px] md:w-[300px] rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-32 mt-4" />
          </div>
        </div>
      ))}
    </div>
  )
}

