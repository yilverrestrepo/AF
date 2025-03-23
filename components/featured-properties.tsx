import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"

// Datos de ejemplo para propiedades destacadas
const featuredProperties = [
  {
    id: 1,
    title: "Villa con vista al mar",
    location: "Cartagena, Colombia",
    price: 250,
    rating: 4.9,
    reviews: 128,
    image: "/placeholder.svg?height=300&width=400",
    features: ["Piscina", "Vista al mar", "WiFi"],
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
  },
  {
    id: 2,
    title: "Cabaña en la montaña",
    location: "Santa Elena, Antioquia",
    price: 120,
    rating: 4.7,
    reviews: 95,
    image: "/placeholder.svg?height=300&width=400",
    features: ["Chimenea", "Jacuzzi", "WiFi"],
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
  },
  {
    id: 3,
    title: "Apartamento de lujo",
    location: "Medellín, Colombia",
    price: 180,
    rating: 4.8,
    reviews: 112,
    image: "/placeholder.svg?height=300&width=400",
    features: ["Gimnasio", "Terraza", "WiFi"],
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
  },
  {
    id: 4,
    title: "Casa de playa",
    location: "Santa Marta, Colombia",
    price: 200,
    rating: 4.6,
    reviews: 87,
    image: "/placeholder.svg?height=300&width=400",
    features: ["Acceso a playa", "Terraza", "WiFi"],
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
  },
]

export default function FeaturedProperties() {
  return (
    <section className="py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Propiedades destacadas</h2>
          <p className="text-muted-foreground">Descubre nuestras propiedades más populares y mejor valoradas</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <Link href={`/property/${property.id}`} key={property.id}>
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                <div className="aspect-square relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white text-black hover:bg-white/90">${property.price} USD / noche</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold line-clamp-1">{property.title}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{property.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {property.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
                  {property.bedrooms} hab. · {property.bathrooms} baños · Hasta {property.guests} huéspedes
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/search">
            <Button variant="outline">Ver más propiedades</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

import { Button } from "@/components/ui/button"

