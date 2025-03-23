import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  user: {
    id: string
    name: string
    image?: string
  }
}

interface ReviewsListProps {
  reviews: Review[]
  averageRating?: number
}

export default function ReviewsList({ reviews, averageRating }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Esta propiedad aún no tiene reseñas.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {averageRating !== undefined && (
        <div className="flex items-center mb-6">
          <div className="flex items-center">
            <StarIcon className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            <span className="ml-2 text-xl font-semibold">{averageRating.toFixed(1)}</span>
          </div>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-600">{reviews.length} reseñas</span>
        </div>
      )}

      <div className="divide-y">
        {reviews.map((review) => (
          <div key={review.id} className="py-6 first:pt-0">
            <div className="flex items-start">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={review.user.image} alt={review.user.name} />
                <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="font-medium">{review.user.name}</h4>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <time className="text-sm text-gray-500 mt-1 sm:mt-0">
                    {formatDistanceToNow(new Date(review.createdAt), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </time>
                </div>

                <p className="mt-3 text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

