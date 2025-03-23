import { Suspense } from "react"
import SearchFilters from "@/components/search/SearchFilters"
import ListingList from "@/components/listings/ListingList"
import SearchMap from "@/components/search/SearchMap"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapIcon, LayoutGrid } from "lucide-react"

export default function ListingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="container px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Propiedades</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SearchFilters searchParams={searchParams} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="text-muted-foreground">Mostrando 24 propiedades</div>
              <TabsList>
                <TabsTrigger value="grid" className="flex items-center gap-1">
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Cuadrícula</span>
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center gap-1">
                  <MapIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Mapa</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid">
              <Suspense fallback={<ListingListSkeleton />}>
                <ListingList searchParams={searchParams} />
              </Suspense>
            </TabsContent>

            <TabsContent value="map">
              <div className="h-[600px] rounded-lg overflow-hidden border mb-6">
                <Suspense fallback={<Skeleton className="h-full w-full" />}>
                  <SearchMap />
                </Suspense>
              </div>
              <Suspense fallback={<ListingListSkeleton />}>
                <ListingList searchParams={searchParams} variant="compact" />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function ListingListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

