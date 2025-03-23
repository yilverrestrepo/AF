import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import ExperienceList from "@/components/experiences/ExperienceList"
import ExperienceCategories from "@/components/experiences/ExperienceCategories"
import { Button } from "@/components/ui/button"

export default function ExperiencesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Experiencias únicas</h1>
          <p className="text-muted-foreground text-lg">
            Descubre actividades inolvidables organizadas por expertos locales en los mejores destinos de Colombia
          </p>
        </div>

        <ExperienceCategories />

        <div className="space-y-8">
          <Suspense fallback={<ExperienceListSkeleton />}>
            <ExperienceList searchParams={searchParams} />
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

function ExperienceListSkeleton() {
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
          </div>
        </div>
      ))}
    </div>
  )
}

