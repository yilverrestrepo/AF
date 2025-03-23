"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface FavoriteButtonProps {
  propertyId: string
  initialIsFavorite?: boolean
  variant?: "icon" | "button"
  size?: "sm" | "md" | "lg"
}

export default function FavoriteButton({
  propertyId,
  initialIsFavorite = false,
  variant = "icon",
  size = "md",
}: FavoriteButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isLoading, setIsLoading] = useState(false)

  // Actualizar el estado cuando cambia initialIsFavorite
  useEffect(() => {
    setIsFavorite(initialIsFavorite)
  }, [initialIsFavorite])

  const toggleFavorite = async () => {
    if (!session) {
      toast({
        title: "Inicia sesión primero",
        description: "Necesitas iniciar sesión para guardar favoritos",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/favorites/${propertyId}`, {
        method: isFavorite ? "DELETE" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Error al actualizar favoritos")
      }

      setIsFavorite(!isFavorite)
      toast({
        title: isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos",
        description: isFavorite
          ? "La propiedad ha sido eliminada de tu lista de favoritos"
          : "La propiedad ha sido añadida a tu lista de favoritos",
      })
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al actualizar favoritos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Tamaños para el icono
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  if (variant === "icon") {
    return (
      <button
        onClick={toggleFavorite}
        disabled={isLoading}
        className={`rounded-full p-2 ${
          isFavorite ? "bg-red-100 text-red-500 hover:bg-red-200" : "bg-white/80 text-gray-600 hover:bg-gray-100"
        } transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
        aria-label={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
      >
        <Heart className={`${sizeClasses[size]} ${isFavorite ? "fill-red-500" : ""}`} />
      </button>
    )
  }

  return (
    <Button
      onClick={toggleFavorite}
      disabled={isLoading}
      variant={isFavorite ? "destructive" : "outline"}
      size="sm"
      className="flex items-center gap-2"
    >
      <Heart className={`${sizeClasses.sm} ${isFavorite ? "fill-current" : ""}`} />
      {isFavorite ? "Guardado" : "Guardar"}
    </Button>
  )
}

