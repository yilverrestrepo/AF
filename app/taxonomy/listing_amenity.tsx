import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import ListingList from "@/components/listings/ListingList"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function ListingAmenityPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // En una implementación real, obtendríamos el nombre de la amenidad desde searchParams
  // y cargaríamos los datos correspondientes
  const amenity = searchParams.amenity || "piscina"

  // Mapeo de slugs a nombres de amenidades
  const amenityNames: Record<string, string> = {
    piscina: "Piscina",
    wifi: "WiFi",
    "vista-al-mar": "Vista al mar",
    "aire-acondicionado": "Aire acondicionado",
    mascotas: "Acepta mascotas",
  }

  const amenityName = amenityNames[amenity as string] || "Amenidad"

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Propiedades con {amenityName}</h1>
          </div>
          <p className="text-muted-foreground text-lg">Encuentra las mejores propiedades que ofrecen {amenityName}</p>
        </div>

        <div className="space-y-8">
          <Suspense fallback={<ListingListSkeleton />}>
            <ListingList searchParams={searchParams} />
          </Suspense>

          <div className="flex justify-center">
            <Button variant="outline" className="rounded-full px-8">
              Cargar más
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ListingListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

