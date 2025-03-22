"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Eye, Plus, Calendar, MoreHorizontal, Star, DollarSign, Users, BarChart } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo para propiedades
const properties = [
  {
    id: 1,
    title: "Villa con vista al mar",
    location: "Cartagena, Colombia",
    price: 250,
    status: "active",
    image: "/images/listings/listing-1.jpg",
    views: 128,
    reservations: 5,
    occupancyRate: 78,
    earnings: 1250,
    rating: 4.9,
    reviews: 24,
    lastUpdated: "2023-05-15",
  },
  {
    id: 2,
    title: "Cabaña en la montaña",
    location: "Santa Elena, Antioquia",
    price: 120,
    status: "active",
    image: "/images/listings/listing-2.jpg",
    views: 95,
    reservations: 3,
    occupancyRate: 65,
    earnings: 720,
    rating: 4.7,
    reviews: 18,
    lastUpdated: "2023-06-20",
  },
  {
    id: 3,
    title: "Apartamento de lujo",
    location: "Medellín, Colombia",
    price: 180,
    status: "inactive",
    image: "/images/listings/listing-3.jpg",
    views: 42,
    reservations: 0,
    occupancyRate: 0,
    earnings: 0,
    rating: 4.8,
    reviews: 15,
    lastUpdated: "2023-04-10",
  },
  {
    id: 4,
    title: "Casa de playa",
    location: "Santa Marta, Colombia",
    price: 200,
    status: "active",
    image: "/images/listings/listing-4.jpg",
    views: 110,
    reservations: 4,
    occupancyRate: 72,
    earnings: 800,
    rating: 4.6,
    reviews: 20,
    lastUpdated: "2023-07-05",
  },
  {
    id: 5,
    title: "Penthouse con vista panorámica",
    location: "Bogotá, Colombia",
    price: 300,
    status: "active",
    image: "/images/listings/listing-5.jpg",
    views: 85,
    reservations: 2,
    occupancyRate: 45,
    earnings: 600,
    rating: 4.9,
    reviews: 12,
    lastUpdated: "2023-07-15",
  },
]

export default function HostProperties() {
  const { toast } = useToast()
  const [propertiesList, setPropertiesList] = useState(properties)

  const handleDeleteProperty = (id: number) => {
    // Show confirmation toast
    toast({
      title: "¿Estás seguro?",
      description: "Esta acción no se puede deshacer.",
      action: (
        <Button
          variant="destructive"
          onClick={() => {
            setPropertiesList(propertiesList.filter((p) => p.id !== id))
            toast({
              title: "Propiedad eliminada",
              description: "La propiedad ha sido eliminada correctamente.",
            })
          }}
        >
          Eliminar
        </Button>
      ),
    })
  }

  const handleToggleStatus = (id: number) => {
    setPropertiesList(
      propertiesList.map((property) =>
        property.id === id ? { ...property, status: property.status === "active" ? "inactive" : "active" } : property,
      ),
    )

    toast({
      title: "Estado actualizado",
      description: "El estado de la propiedad ha sido actualizado correctamente.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mis propiedades</h2>
        <Link href="/listings/create">
          <Button className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Nueva propiedad
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="active">Activas</TabsTrigger>
            <TabsTrigger value="inactive">Inactivas</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ordenar por:</span>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Más recientes</option>
              <option>Más reservas</option>
              <option>Mayor precio</option>
              <option>Mejor valoradas</option>
            </select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {propertiesList.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={() => handleDeleteProperty(property.id)}
              onToggleStatus={() => handleToggleStatus(property.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {propertiesList
            .filter((p) => p.status === "active")
            .map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onDelete={() => handleDeleteProperty(property.id)}
                onToggleStatus={() => handleToggleStatus(property.id)}
              />
            ))}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {propertiesList
            .filter((p) => p.status === "inactive")
            .map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onDelete={() => handleDeleteProperty(property.id)}
                onToggleStatus={() => handleToggleStatus(property.id)}
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PropertyCard({
  property,
  onDelete,
  onToggleStatus,
}: {
  property: any
  onDelete: () => void
  onToggleStatus: () => void
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[250px] h-[200px] relative">
            <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
            <Badge className={`absolute top-2 left-2 ${property.status === "active" ? "bg-green-500" : "bg-gray-500"}`}>
              {property.status === "active" ? "Activa" : "Inactiva"}
            </Badge>
          </div>
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{property.title}</h3>
                <p className="text-sm text-muted-foreground">{property.location}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onToggleStatus}>
                    {property.status === "active" ? "Desactivar" : "Activar"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/dashboard/host/properties/${property.id}/edit`} className="flex w-full">
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/dashboard/host/properties/${property.id}/calendar`} className="flex w-full">
                      Gestionar calendario
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/dashboard/host/properties/${property.id}/pricing`} className="flex w-full">
                      Gestionar precios
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="flex flex-col items-center text-center p-2 bg-accent/30 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary mb-1" />
                <p className="text-lg font-bold">${property.price}</p>
                <p className="text-xs text-muted-foreground">por noche</p>
              </div>
              <div className="flex flex-col items-center text-center p-2 bg-accent/30 rounded-lg">
                <Users className="h-5 w-5 text-primary mb-1" />
                <p className="text-lg font-bold">{property.reservations}</p>
                <p className="text-xs text-muted-foreground">reservas</p>
              </div>
              <div className="flex flex-col items-center text-center p-2 bg-accent/30 rounded-lg">
                <Star className="h-5 w-5 text-primary mb-1" />
                <p className="text-lg font-bold">{property.rating}</p>
                <p className="text-xs text-muted-foreground">{property.reviews} reseñas</p>
              </div>
              <div className="flex flex-col items-center text-center p-2 bg-accent/30 rounded-lg">
                <BarChart className="h-5 w-5 text-primary mb-1" />
                <p className="text-lg font-bold">{property.occupancyRate}%</p>
                <p className="text-xs text-muted-foreground">ocupación</p>
              </div>
            </div>

            <div className="mt-auto pt-4 flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Última actualización: {property.lastUpdated}</p>
              <div className="flex gap-2">
                <Link href={`/dashboard/host/properties/${property.id}/calendar`}>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Calendar className="h-4 w-4 mr-1" />
                    Calendario
                  </Button>
                </Link>
                <Link href={`/listings/${property.id}`}>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                </Link>
                <Link href={`/dashboard/host/properties/${property.id}/edit`}>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

