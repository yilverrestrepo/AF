import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ListingGallery from "@/components/listings/ListingGallery"
import ListingAmenities from "@/components/listings/ListingAmenities"
import ListingReviews from "@/components/listings/ListingReviews"
import ListingMap from "@/components/listings/ListingMap"
import BookingForm from "@/components/listings/BookingForm"
import ListingHost from "@/components/listings/ListingHost"
import ListingCalendar from "@/components/listings/ListingCalendar"
import { MapPin, Users, Bed, Bath, Star, Share2, Heart, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Datos de ejemplo para una propiedad
const listings = {
  "villa-con-vista-al-mar": {
    id: 1,
    title: "Villa con vista al mar",
    slug: "villa-con-vista-al-mar",
    location: "Cartagena, Colombia",
    price: 250,
    rating: 4.9,
    reviews: 128,
    description:
      "Hermosa villa con vista panorámica al mar Caribe. Disfruta de atardeceres espectaculares desde la terraza privada con piscina infinita. La propiedad cuenta con amplios espacios, decoración moderna y todas las comodidades para una estancia inolvidable.\n\nUbicada en una zona exclusiva de Cartagena, a solo 10 minutos de la ciudad amurallada y a 5 minutos de la playa. Perfecta para familias o grupos de amigos que buscan privacidad y confort.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    amenities: [
      { name: "Piscina privada", category: "Exterior" },
      { name: "Vista al mar", category: "Exterior" },
      { name: "Terraza", category: "Exterior" },
      { name: "Jardín", category: "Exterior" },
      { name: "Parrilla", category: "Exterior" },
      { name: "WiFi de alta velocidad", category: "Tecnología" },
      { name: "Smart TV", category: "Tecnología" },
      { name: "Sistema de sonido", category: "Tecnología" },
      { name: "Cocina completa", category: "Interior" },
      { name: "Aire acondicionado", category: "Interior" },
      { name: "Lavadora", category: "Interior" },
      { name: "Secadora", category: "Interior" },
      { name: "Estacionamiento", category: "Servicios" },
      { name: "Seguridad 24/7", category: "Servicios" },
    ],
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    host: {
      name: "Carlos Martínez",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      responseRate: 98,
      responseTime: "En menos de una hora",
      joined: "Abril 2019",
      isSuperhost: true,
    },
    houseRules: [
      "No se permiten fiestas o eventos",
      "No fumar",
      "Hora de llegada: 15:00 - 20:00",
      "Hora de salida: 11:00",
      "Depósito de seguridad reembolsable: $200",
    ],
    coordinates: {
      lat: 10.391049,
      lng: -75.479426,
    },
  },
  // Añadir más propiedades según sea necesario
}

export default function ListingPage({ params }: { params: { slug: string } }) {
  // Obtener la propiedad según el slug o usar una por defecto
  const listing = listings[params.slug as keyof typeof listings] || listings["villa-con-vista-al-mar"]

  return (
    <div className="container px-4 md:px-6 py-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/listings">Propiedades</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{listing.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-8">
        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-3xl md:text-4xl font-bold">{listing.title}</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{listing.rating}</span>
              <Link href="#reviews" className="text-muted-foreground hover:underline">
                ({listing.reviews} reseñas)
              </Link>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{listing.location}</span>
            </div>
          </div>
        </div>

        <ListingGallery images={listing.images} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b pb-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">Alojamiento entero - Anfitrión: {listing.host.name}</h2>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span>{listing.guests} huéspedes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <span>{listing.bedrooms} habitaciones</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <span>{listing.bathrooms} baños</span>
                    </div>
                  </div>
                </div>

                {listing.host.isSuperhost && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
                    <Home className="h-3 w-3 mr-1" />
                    Superanfitrión
                  </Badge>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                <div className="text-muted-foreground whitespace-pre-line">{listing.description}</div>
              </div>
            </div>

            <Tabs defaultValue="amenities" className="mt-8">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="amenities">Comodidades</TabsTrigger>
                <TabsTrigger value="location">Ubicación</TabsTrigger>
                <TabsTrigger value="calendar">Disponibilidad</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                <TabsTrigger value="rules">Reglas</TabsTrigger>
              </TabsList>
              <TabsContent value="amenities" className="pt-6">
                <ListingAmenities amenities={listing.amenities} />
              </TabsContent>
              <TabsContent value="location" className="pt-6">
                <ListingMap coordinates={listing.coordinates} />
              </TabsContent>
              <TabsContent value="calendar" className="pt-6">
                <ListingCalendar listingId={listing.id.toString()} />
              </TabsContent>
              <TabsContent value="reviews" className="pt-6" id="reviews">
                <ListingReviews listingId={listing.id} />
              </TabsContent>
              <TabsContent value="rules" className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Reglas de la casa</h3>
                  <ul className="space-y-2">
                    {listing.houseRules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center rounded-full bg-primary/10 mt-0.5">
                          <span className="text-xs text-primary font-medium">{index + 1}</span>
                        </div>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <ListingHost host={listing.host} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

