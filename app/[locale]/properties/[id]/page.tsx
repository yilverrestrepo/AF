import { notFound } from "next/navigation"
import { getProperty } from "@/lib/properties"
import PropertyDetail from "@/components/properties/PropertyDetail"
import PropertyReservation from "@/components/properties/PropertyReservation"
import PropertyReviews from "@/components/properties/PropertyReviews"
import { Suspense } from "react"
import PropertyDetailSkeleton from "@/components/properties/PropertyDetailSkeleton"

export default async function PropertyPage({ params }: { params: { locale: string; id: string } }) {
  const property = await getProperty(params.id)

  if (!property) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<PropertyDetailSkeleton />}>
        <PropertyDetail property={property} locale={params.locale} />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <PropertyReviews propertyId={property.id} />
        </div>
        <div>
          <PropertyReservation property={property} locale={params.locale} />
        </div>
      </div>
    </div>
  )
}

