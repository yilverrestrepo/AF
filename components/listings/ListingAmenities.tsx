import { Check } from "lucide-react"

type Amenity = {
  name: string
  category: string
}

export default function ListingAmenities({ amenities }: { amenities: Amenity[] }) {
  // Agrupar amenidades por categoría
  const amenitiesByCategory = amenities.reduce(
    (acc, amenity) => {
      if (!acc[amenity.category]) {
        acc[amenity.category] = []
      }
      acc[amenity.category].push(amenity)
      return acc
    },
    {} as Record<string, Amenity[]>,
  )

  return (
    <div className="space-y-8">
      {Object.entries(amenitiesByCategory).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
            {items.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span>{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

