import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import ListingList from "@/components/listings/ListingList"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export default function ListingCityPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // En una implementación real, obtendríamos el nombre de la ciudad desde searchParams
  // y cargaríamos los datos correspondientes
  const city = searchParams.city || "cartagena"

  // Mapeo de slugs a nombres de ciudades
  const cityNames: Record<string, string> = {
    cartagena: "Cartagena",
    "santa-marta": "Santa Marta",
    medellin: "Medellín",
    bogota: "Bogotá",
    "san-andres": "San Andrés",
  }

  const cityName = cityNames[city as string] || "Ciudad"

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-6 w-6 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Propiedades en {cityName}</h1>
          </div>
          <p className="text-muted-foreground text-lg">Descubre las mejores propiedades vacacionales en {cityName}</p>
        </div>

        <div className="relative h-[300px] rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-2">Explora {cityName}</h2>
              <p className="text-white/80 max-w-lg mx-auto mb-4">
                Encuentra alojamientos únicos y experiencias inolvidables
              </p>
              <Button className="rounded-full px-8 bg-white text-primary hover:bg-white/90">Ver guía de viaje</Button>
            </div>
          </div>
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

