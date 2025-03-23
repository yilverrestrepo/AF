"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash, Eye, Calendar, MoreHorizontal, Search } from "lucide-react"
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
import { Input } from "@/components/ui/input"

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

export default function AdminProperties() {
  const { toast } = useToast()
  const [propertiesList, setPropertiesList] = useState(properties)
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredProperties = propertiesList.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold">Gestionar propiedades</h2>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o ubicación"
            className="pl-9 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left">
              <th className="p-2 font-semibold">Propiedad</th>
              <th className="p-2 font-semibold">Ubicación</th>
              <th className="p-2 font-semibold">Precio</th>
              <th className="p-2 font-semibold">Estado</th>
              <th className="p-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.id} className="border-b">
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      width={50}
                      height={50}
                      className="object-cover rounded-md"
                    />
                    {property.title}
                  </div>
                </td>
                <td className="p-2">{property.location}</td>
                <td className="p-2">${property.price}</td>
                <td className="p-2">
                  <Badge className={property.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                    {property.status === "active" ? "Activa" : "Inactiva"}
                  </Badge>
                </td>
                <td className="p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleToggleStatus(property.id)}>
                        {property.status === "active" ? "Desactivar" : "Activar"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/dashboard/admin/properties/${property.id}/edit`} className="flex w-full">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/listings/${property.id}`} className="flex w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/dashboard/admin/properties/${property.id}/calendar`} className="flex w-full">
                          <Calendar className="h-4 w-4 mr-2" />
                          Gestionar calendario
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProperty(property.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

