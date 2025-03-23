import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users, Bed, Bath, Check } from "lucide-react"

// Datos de ejemplo para propiedades
const properties = [
  {
    id: 1,
    title: "Villa con vista al mar",
    location: "Cartagena, Colombia",
    price: 250,
    rating: 4.9,
    reviews: 128,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Hermosa villa con vista panorámica al mar Caribe. Disfruta de atardeceres espectaculares desde la terraza privada con piscina infinita.",
    features: ["Piscina", "Vista al mar", "WiFi", "Cocina", "Aire acondicionado"],
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
    description:
      "Acogedora cabaña rodeada de naturaleza. Perfecta para desconectar y disfrutar del clima fresco de la montaña.",
    features: ["Chimenea", "Jacuzzi", "WiFi", "Cocina", "Parqueadero"],
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
    description:
      "Moderno apartamento en el exclusivo barrio El Poblado. A pocos minutos de restaurantes, tiendas y vida nocturna.",
    features: ["Gimnasio", "Terraza", "WiFi", "Cocina", "Aire acondicionado"],
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
    description:
      "Casa frente al mar con acceso directo a la playa. Disfruta del sonido de las olas desde tu habitación.",
    features: ["Acceso a playa", "Terraza", "WiFi", "Cocina", "Aire acondicionado"],
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
  },
]

export default function PropertyList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Aquí se implementaría la lógica de filtrado basada en searchParams
  // Por ahora, usamos los datos de ejemplo

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Mostrando {properties.length} propiedades</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Ordenar por:</span>
          <select className="text-sm border rounded-md px-2 py-1">
            <option>Recomendados</option>
            <option>Precio: menor a mayor</option>
            <option>Precio: mayor a menor</option>
            <option>Mejor valorados</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {properties.map((property) => (
          <div key={property.id} className="flex flex-col md:flex-row gap-4 border rounded-lg overflow-hidden">
            <div className="md:w-[300px] h-[200px] relative">
              <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
            </div>
            <div className="flex-1 p-4 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{property.title}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-muted-foreground text-sm">({property.reviews})</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                <span>{property.location}</span>
              </div>
              <p className="text-sm mt-2 line-clamp-2">{property.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{property.guests} huéspedes</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bedrooms} habitaciones</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bathrooms} baños</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {property.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Check className="h-3 w-3 mr-1" />
                    {feature}
                  </Badge>
                ))}
                {property.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{property.features.length - 3} más
                  </Badge>
                )}
              </div>
              <div className="mt-auto pt-4 flex justify-between items-center">
                <div>
                  <span className="font-bold text-lg">${property.price} USD</span>
                  <span className="text-sm text-muted-foreground"> / noche</span>
                </div>
                <Link href={`/property/${property.id}`}>
                  <Button>Ver detalles</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

