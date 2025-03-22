"use client"

import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const reviews = [
  {
    id: 1,
    name: "Laura G.",
    avatar: "/images/avatars/avatar-1.jpg",
    rating: 5,
    comment: "Increíble experiencia, el lugar superó todas mis expectativas.",
    location: "Cartagena",
  },
  {
    id: 2,
    name: "Carlos M.",
    avatar: "/images/avatars/avatar-2.jpg",
    rating: 5,
    comment: "El anfitrión fue muy atento y la propiedad estaba impecable.",
    location: "Medellín",
  },
  {
    id: 3,
    name: "Ana P.",
    avatar: "/images/avatars/avatar-3.jpg",
    rating: 5,
    comment: "La mejor vista que he tenido en un alojamiento, volveré seguro.",
    location: "Santa Marta",
  },
  {
    id: 4,
    name: "Miguel R.",
    avatar: "/images/avatars/avatar-4.jpg",
    rating: 5,
    comment: "Proceso de reserva sencillo y excelente atención al cliente.",
    location: "Bogotá",
  },
  {
    id: 5,
    name: "Sofía L.",
    avatar: "/images/avatars/avatar-5.jpg",
    rating: 5,
    comment: "Fincos hizo que nuestras vacaciones fueran perfectas.",
    location: "San Andrés",
  },
]

export default function ReviewsBar() {
  return (
    <div className="w-full overflow-hidden glass py-4">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white font-medium">4.9 de 5 basado en más de 10,000 reseñas</span>
          </div>
          <div className="hidden md:block">
            <span className="text-white/80 text-sm">Opiniones verificadas de huéspedes reales</span>
          </div>
        </div>

        <div className="relative w-full">
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{ x: [0, -1500] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }}
          >
            {reviews.concat(reviews).map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-3 w-72"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white text-sm font-medium">{review.name}</p>
                    <p className="text-white/70 text-xs">{review.location}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-white/90 text-sm line-clamp-2">{review.comment}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

