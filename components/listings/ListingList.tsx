import ListingCard from "@/components/listings/ListingCard"
import { Button } from "@/components/ui/button"

// Datos de ejemplo para propiedades
const listings = [
  {
    id: 1,
    title: "Villa con vista al mar",
    slug: "villa-con-vista-al-mar",
    location: "Cartagena, Colombia",
    price: 250,
    rating: 4.9,
    reviews: 128,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    features: ["Piscina", "Vista al mar", "WiFi"],
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 2,
    title: "Cabaña en la montaña",
    slug: "cabana-en-la-montana",
    location: "Santa Elena, Antioquia",
    price: 120,
    rating: 4.7,
    reviews: 95,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    features: ["Chimenea", "Jacuzzi", "WiFi"],
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    isFeatured: true,
    isNew: true,
  },
  {
    id: 3,
    title: "Apartamento de lujo",
    slug: "apartamento-de-lujo",
    location: "Medellín, Colombia",
    price: 180,
    rating: 4.8,
    reviews: 112,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    features: ["Gimnasio", "Terraza", "WiFi"],
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 4,
    title: "Casa de playa",
    slug: "casa-de-playa",
    location: "Santa Marta, Colombia",
    price: 200,
    rating: 4.6,
    reviews: 87,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    features: ["Acceso a playa", "Terraza", "WiFi"],
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 5,
    title: "Penthouse con vista panorámica",
    slug: "penthouse-con-vista-panoramica",
    location: "Bogotá, Colombia",
    price: 300,
    rating: 4.9,
    reviews: 64,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    features: ["Vista panorámica", "Terraza", "Jacuzzi"],
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    isFeatured: true,
    isNew: true,
  },
  {
    id: 6,
    title: "Bungalow frente al mar",
    slug: "bungalow-frente-al-mar",
    location: "Isla Barú, Colombia",
    price: 220,
    rating: 4.8,
    reviews: 76,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    features: ["Acceso a playa", "Hamacas", "Kayaks"],
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    isFeatured: true,
    isNew: false,
  },
]

interface ListingListProps {
  searchParams: { [key: string]: string | string[] | undefined }
  variant?: "default" | "compact"
}

export default function ListingList({ searchParams, variant = "default" }: ListingListProps) {
  // Aquí se implementaría la lógica de filtrado basada en searchParams
  // Por ahora, usamos los datos de ejemplo

  return (
    <div className="space-y-8">
      <div
        className={`grid grid-cols-1 ${variant === "compact" ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"} gap-6`}
      >
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} variant={variant} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" className="rounded-full px-8">
          Cargar más
        </Button>
      </div>
    </div>
  )
}

