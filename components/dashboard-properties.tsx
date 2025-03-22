import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Trash, Eye, Plus, Calendar } from "lucide-react"

// Datos de ejemplo para propiedades
const properties = [
  {
    id: 1,
    title: "Villa con vista al mar",
    location: "Cartagena, Colombia",
    price: 250,
    status: "active",
    image: "/placeholder.svg?height=300&width=400",
    views: 128,
    reservations: 5,
    lastUpdated: "2023-05-15",
  },
  {
    id: 2,
    title: "Cabaña en la montaña",
    location: "Santa Elena, Antioquia",
    price: 120,
    status: "active",
    image: "/placeholder.svg?height=300&width=400",
    views: 95,
    reservations: 3,
    lastUpdated: "2023-06-20",
  },
  {
    id: 3,
    title: "Apartamento de lujo",
    location: "Medellín, Colombia",
    price: 180,
    status: "inactive",
    image: "/placeholder.svg?height=300&width=400",
    views: 42,
    reservations: 0,
    lastUpdated: "2023-04-10",
  },
]

export default function DashboardProperties() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mis propiedades</h2>
        <Link href="/list-property">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva propiedad
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="active">Activas</TabsTrigger>
          <TabsTrigger value="inactive">Inactivas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {properties
            .filter((p) => p.status === "active")
            .map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {properties
            .filter((p) => p.status === "inactive")
            .map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PropertyCard({ property }: { property: any }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[200px] h-[150px] relative">
            <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
          </div>
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{property.title}</h3>
                <p className="text-sm text-muted-foreground">{property.location}</p>
              </div>
              <Badge variant={property.status === "active" ? "default" : "secondary"}>
                {property.status === "active" ? "Activa" : "Inactiva"}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold">${property.price}</p>
                <p className="text-xs text-muted-foreground">por noche</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{property.views}</p>
                <p className="text-xs text-muted-foreground">vistas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{property.reservations}</p>
                <p className="text-xs text-muted-foreground">reservas</p>
              </div>
            </div>

            <div className="mt-auto pt-4 flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Última actualización: {property.lastUpdated}</p>
              <div className="flex gap-2">
                <Link href={`/dashboard/calendar/${property.id}`}>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Calendario
                  </Button>
                </Link>
                <Link href={`/property/${property.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                </Link>
                <Link href={`/dashboard/edit-property/${property.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

