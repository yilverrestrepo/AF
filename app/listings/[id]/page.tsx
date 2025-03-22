import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Users,
  Home,
  Calendar,
  MapPin,
  Wifi,
  PocketIcon as Pool,
  CookingPotIcon as Kitchen,
  Wind,
  Car,
  Tv,
  Waves,
  Dog,
} from "lucide-react"
import ListingGallery from "@/components/listings/ListingGallery"
import ListingMap from "@/components/listings/ListingMap"
import ListingReviews from "@/components/listings/ListingReviews"
import ListingHost from "@/components/listings/ListingHost"
import BookingForm from "@/components/listings/BookingForm"

// Mock data for property details
const properties = [
  {
    id: "1",
    title: "Villa con vista al mar",
    description:
      "Hermosa villa con vistas panorámicas al mar Caribe. Disfruta de la tranquilidad y el lujo en este espacio diseñado para relajarse y disfrutar. Cuenta con amplias terrazas, piscina privada y acceso directo a la playa.",
    location: "Cartagena, Colombia",
    price: 250,
    rating: 4.9,
    reviews: 24,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      ac: true,
      parking: true,
      tv: true,
      washer: true,
      petFriendly: false,
    },
    images: Array(6).fill("/placeholder.svg?height=600&width=800"),
    host: {
      name: "Carlos Martínez",
      image: "/placeholder.svg?height=200&width=200",
      joined: "2020",
      isSuperhost: true,
      responseRate: 98,
      responseTime: "en menos de una hora",
    },
    coordinates: {
      lat: 10.391049,
      lng: -75.479426,
    },
  },
  {
    id: "2",
    title: "Cabaña en la montaña",
    description:
      "Acogedora cabaña rodeada de naturaleza en las montañas de Santa Elena. Perfecta para escapar del bullicio de la ciudad y conectar con la naturaleza. Disfruta del clima fresco, hermosos senderos y vistas espectaculares.",
    location: "Santa Elena, Antioquia",
    price: 120,
    rating: 4.7,
    reviews: 18,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: {
      wifi: true,
      pool: false,
      kitchen: true,
      ac: false,
      parking: true,
      tv: true,
      washer: true,
      petFriendly: true,
    },
    images: Array(6).fill("/placeholder.svg?height=600&width=800"),
    host: {
      name: "Ana Gómez",
      image: "/placeholder.svg?height=200&width=200",
      joined: "2019",
      isSuperhost: true,
      responseRate: 95,
      responseTime: "en menos de una hora",
    },
    coordinates: {
      lat: 6.2518,
      lng: -75.5636,
    },
  },
]

export default function PropertyPage({ params }: { params: { id: string } }) {
  // Find the property by ID or use a default one
  const property = properties.find((p) => p.id === params.id) || properties[0]

  return (
    <div className="container px-4 md:px-6 py-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/listings">Propiedades</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{property.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-muted-foreground ml-1">({property.reviews} reseñas)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>

          <ListingGallery images={property.images} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Alojamiento entero</p>
                <p className="text-sm text-muted-foreground">
                  {property.bedrooms} habitaciones • {property.bathrooms} baños
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Hasta {property.guests} huéspedes</p>
                <p className="text-sm text-muted-foreground">Ideal para familias</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Disponibilidad inmediata</p>
                <p className="text-sm text-muted-foreground">Cancelación flexible</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Acerca de este alojamiento</h2>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Lo que ofrece este lugar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.amenities.wifi && (
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  <span>WiFi</span>
                </div>
              )}
              {property.amenities.pool && (
                <div className="flex items-center gap-2">
                  <Pool className="h-5 w-5 text-primary" />
                  <span>Piscina</span>
                </div>
              )}
              {property.amenities.kitchen && (
                <div className="flex items-center gap-2">
                  <Kitchen className="h-5 w-5 text-primary" />
                  <span>Cocina</span>
                </div>
              )}
              {property.amenities.ac && (
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-primary" />
                  <span>Aire acondicionado</span>
                </div>
              )}
              {property.amenities.parking && (
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  <span>Estacionamiento</span>
                </div>
              )}
              {property.amenities.tv && (
                <div className="flex items-center gap-2">
                  <Tv className="h-5 w-5 text-primary" />
                  <span>TV</span>
                </div>
              )}
              {property.amenities.washer && (
                <div className="flex items-center gap-2">
                  <Waves className="h-5 w-5 text-primary" />
                  <span>Lavadora</span>
                </div>
              )}
              {property.amenities.petFriendly && (
                <div className="flex items-center gap-2">
                  <Dog className="h-5 w-5 text-primary" />
                  <span>Acepta mascotas</span>
                </div>
              )}
            </div>
            <Button variant="outline" className="mt-4">
              Ver todas las comodidades
            </Button>
          </div>

          <Tabs defaultValue="reviews" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              <TabsTrigger value="location">Ubicación</TabsTrigger>
              <TabsTrigger value="host">Anfitrión</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="pt-4">
              <ListingReviews rating={property.rating} reviews={property.reviews} />
            </TabsContent>
            <TabsContent value="location" className="pt-4">
              <ListingMap location={property.location} coordinates={property.coordinates} />
            </TabsContent>
            <TabsContent value="host" className="pt-4">
              <ListingHost host={property.host} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-2xl font-bold">
                      ${property.price} <span className="text-base font-normal">noche</span>
                    </p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-muted-foreground ml-1">({property.reviews} reseñas)</span>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Disponible</Badge>
                </div>

                <BookingForm propertyId={property.id} price={property.price} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

