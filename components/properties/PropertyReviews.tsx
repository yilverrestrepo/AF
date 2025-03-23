import { getPropertyReviews } from "@/lib/reviews"
import { formatDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface PropertyReviewsProps {
  propertyId: string
}

export default async function PropertyReviews({ propertyId }: PropertyReviewsProps) {
  const reviews = await getPropertyReviews(propertyId)

  if (reviews.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Reseñas</h2>
        <p className="text-gray-600">Aún no hay reseñas para esta propiedad.</p>
      </div>
    )
  }

  // Calcular la puntuación media
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  // Agrupar las reseñas por puntuación
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage: (reviews.filter((review) => review.rating === rating).length / reviews.length) * 100,
  }))

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Reseñas ({reviews.length})</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            <span className="text-2xl font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-gray-600">de 5</span>
          </div>

          <div className="space-y-2">
            {ratingCounts.map((item) => (
              <div key={item.rating} className="flex items-center gap-2">
                <span className="w-4 text-sm">{item.rating}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400" style={{ width: `${item.percentage}%` }} />
                </div>
                <span className="text-sm text-gray-600">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Lo que dicen los huéspedes sobre:</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium">Limpieza</div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.8</span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium">Ubicación</div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.7</span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium">Comunicación</div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.9</span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium">Calidad-precio</div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-t pt-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={review.user.image} />
                <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">{review.user.name}</div>
                <div className="text-sm text-gray-600">{formatDate(review.createdAt)}</div>

                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

