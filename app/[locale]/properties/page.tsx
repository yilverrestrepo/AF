import { Suspense } from "react"
import PropertySearch from "@/components/properties/PropertySearch"
import PropertyList from "@/components/properties/PropertyList"
import PropertyListSkeleton from "@/components/properties/PropertyListSkeleton"
import type { PropertyFilter } from "@/types/property"

export default function PropertiesPage({
  params,
  searchParams,
}: { params: { locale: string }; searchParams: PropertyFilter }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Propiedades en alquiler</h1>

      <PropertySearch locale={params.locale} initialFilters={searchParams} />

      <Suspense fallback={<PropertyListSkeleton />}>
        <PropertyList locale={params.locale} filters={searchParams} />
      </Suspense>
    </div>
  )
}

