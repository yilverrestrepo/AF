import { Check } from "lucide-react"

type Amenity = {
  name: string
  category: string
}

export default function PropertyAmenities({ amenities }: { amenities: Amenity[] }) {
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
    <div className="space-y-6">
      {Object.entries(amenitiesByCategory).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-3">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
            {items.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

