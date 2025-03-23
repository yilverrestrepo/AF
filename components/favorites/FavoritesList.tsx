"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types/property"
import PropertyCard from "@/components/properties/PropertyCard"
import { toast } from "@/hooks/use-toast"
import { Heart } from "lucide-react"

interface FavoritesListProps {
  favorites: Property[]
  locale: string
}

export default function FavoritesList({ favorites, locale }: FavoritesListProps) {
  const router = useRouter()
  const [isRemoving, setIsRemoving] = useState<string | null>(null)

  const handleRemoveFavorite = async (propertyId: string) => {
    setIsRemoving(propertyId)

    try {
      const response = await fetch(`/api/favorites/${propertyId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Error al eliminar de favoritos")
      }

      toast({
        title: "Eliminado de favoritos",
        description: "La propiedad ha sido eliminada de tus favoritos",
      })

      // Recargar la página para actualizar la lista
      router.refresh()
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error)
      toast({
        title: "Error al eliminar de favoritos",
        description: error instanceof Error ? error.message : "Ha ocurrido un error inesperado",
        variant: "destructive",
      })
    } finally {
      setIsRemoving(null)
    }
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No tienes favoritos</h2>
        <p className="text-gray-600 mb-4">Guarda propiedades que te gusten para verlas más tarde</p>
        <Button asChild>
          <Link href={`/${locale}/properties`}>Explorar propiedades</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((property) => (
        <div key={property.id} className="relative group">
          <PropertyCard property={property} locale={locale} />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleRemoveFavorite(property.id)}
            disabled={isRemoving === property.id}
          >
            <Heart className="h-4 w-4 fill-current" />
            <span className="sr-only">Eliminar de favoritos</span>
          </Button>
        </div>
      ))}
    </div>
  )
}

