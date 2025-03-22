"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, useAnimation, useInView } from "framer-motion"

const reviews = [
  {
    id: 1,
    name: "Laura G.",
    avatar: "/images/avatars/avatar-1.jpg",
    rating: 5,
    comment: "Increíble experiencia, el lugar superó todas mis expectativas.",
    property: "Villa con vista al mar",
    location: "Cartagena",
  },
  {
    id: 2,
    name: "Carlos M.",
    avatar: "/images/avatars/avatar-2.jpg",
    rating: 5,
    comment: "El anfitrión fue muy atento y la propiedad estaba impecable.",
    property: "Cabaña en la montaña",
    location: "Medellín",
  },
  {
    id: 3,
    name: "Ana P.",
    avatar: "/images/avatars/avatar-3.jpg",
    rating: 5,
    comment: "La mejor vista que he tenido en un alojamiento, volveré seguro.",
    property: "Penthouse con vista panorámica",
    location: "Santa Marta",
  },
  {
    id: 4,
    name: "Miguel R.",
    avatar: "/images/avatars/avatar-4.jpg",
    rating: 5,
    comment: "Proceso de reserva sencillo y excelente atención al cliente.",
    property: "Apartamento de lujo",
    location: "Bogotá",
  },
  {
    id: 5,
    name: "Sofía L.",
    avatar: "/images/avatars/avatar-5.jpg",
    rating: 5,
    comment: "Fincos hizo que nuestras vacaciones fueran perfectas.",
    property: "Casa de playa",
    location: "San Andrés",
  },
  {
    id: 6,
    name: "Javier D.",
    avatar: "/images/avatars/avatar-6.jpg",
    rating: 5,
    comment: "La propiedad tenía todo lo que necesitábamos y más.",
    property: "Villa con piscina",
    location: "Cartagena",
  },
  {
    id: 7,
    name: "Daniela V.",
    avatar: "/images/avatars/avatar-7.jpg",
    rating: 5,
    comment: "Ubicación perfecta, cerca de todo lo que queríamos visitar.",
    property: "Apartamento céntrico",
    location: "Medellín",
  },
  {
    id: 8,
    name: "Roberto S.",
    avatar: "/images/avatars/avatar-8.jpg",
    rating: 5,
    comment: "Excelente relación calidad-precio, recomendado 100%.",
    property: "Cabaña rústica",
    location: "Eje Cafetero",
  },
]

export default function ReviewsSlider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <section className="py-16 overflow-hidden" ref={ref}>
      <div className="flex flex-col gap-6 text-center mb-10">
        <h2 className="section-title">Opiniones verificadas</h2>
        <p className="section-subtitle">Lo que dicen nuestros huéspedes sobre su experiencia con Fincos</p>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-4 md:gap-6"
          variants={{
            hidden: { x: 0 },
            visible: {
              x: [0, -1800, 0],
              transition: {
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              },
            },
          }}
          initial="hidden"
          animate={mainControls}
        >
          {reviews.concat(reviews).map((review, index) => (
            <Card key={`${review.id}-${index}`} className="flex-shrink-0 border-0 shadow-md w-80">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-10 w-10 border border-primary/20">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                  <div className="ml-auto flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm mb-2 line-clamp-3">{review.comment}</p>
                <p className="text-xs text-primary font-medium">{review.property}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

