"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarIcon } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ReviewFormProps {
  propertyId: string
  reservationId?: string
  onSuccess?: () => void
}

export default function ReviewForm({ propertyId, reservationId, onSuccess }: ReviewFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      toast({
        title: "Inicia sesión primero",
        description: "Necesitas iniciar sesión para dejar una reseña",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (rating === 0) {
      toast({
        title: "Valoración requerida",
        description: "Por favor, selecciona una valoración",
        variant: "destructive",
      })
      return
    }

    if (!comment.trim()) {
      toast({
        title: "Comentario requerido",
        description: "Por favor, escribe un comentario",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId,
          reservationId,
          rating,
          comment,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar la reseña")
      }

      toast({
        title: "Reseña enviada",
        description: "Tu reseña ha sido publicada correctamente",
      })

      // Resetear el formulario
      setRating(0)
      setComment("")

      // Refrescar la página o ejecutar callback
      if (onSuccess) {
        onSuccess()
      } else {
        router.refresh()
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al enviar la reseña",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Deja tu valoración</h3>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1"
            >
              <StarIcon
                className={`h-8 w-8 ${
                  star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {rating > 0 ? `${rating} de 5 estrellas` : "Selecciona una valoración"}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium mb-2">
          Tu comentario
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comparte tu experiencia con esta propiedad..."
          rows={4}
          className="resize-none"
        />
      </div>

      <Button type="submit" disabled={isSubmitting || rating === 0 || !comment.trim()}>
        {isSubmitting ? "Enviando..." : "Publicar reseña"}
      </Button>
    </form>
  )
}

