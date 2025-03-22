"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

// Mock data for reviews
const reviews = [
  {
    id: 1,
    property: "Villa con vista al mar",
    rating: 5,
    comment: "Increíble lugar, superó todas mis expectativas. El anfitrión fue muy amable y atento.",
    date: "2023-07-15",
    host: {
      name: "Carlos Martínez",
      image: "/images/avatars/avatar-1.jpg",
    },
  },
  {
    id: 2,
    property: "Cabaña en la montaña",
    rating: 4,
    comment: "Un lugar acogedor y tranquilo, perfecto para desconectarse de la ciudad.",
    date: "2023-06-20",
    host: {
      name: "Laura García",
      image: "/images/avatars/avatar-2.jpg",
    },
  },
]

export default function GuestReviews() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Mis reseñas</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card key={review.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Reseña de {review.property}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {format(parseISO(review.date), "d MMM yyyy", { locale: es })}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-muted-foreground">{review.comment}</p>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={review.host.image} alt={review.host.name} />
                  <AvatarFallback>{review.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Anfitrión: {review.host.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No has escrito ninguna reseña</p>
        </div>
      )}
    </div>
  )
}

