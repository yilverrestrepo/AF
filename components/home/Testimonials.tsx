"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

// Datos de ejemplo para testimonios
const testimonials = [
  {
    id: 1,
    name: "Laura García",
    avatar: "/images/avatars/avatar-1.jpg",
    role: "Huésped",
    content:
      "Increíble experiencia. La propiedad era exactamente como en las fotos y el anfitrión fue muy atento. Definitivamente volveré a reservar con Fincos.",
    rating: 5,
    location: "Cartagena",
  },
  {
    id: 2,
    name: "María González",
    avatar: "/images/avatars/avatar-2.jpg",
    role: "Propietaria",
    content:
      "Como propietaria, Fincos me ha facilitado enormemente la gestión de mi propiedad. El sistema es intuitivo y el soporte es excelente.",
    rating: 5,
    location: "Medellín",
  },
  {
    id: 3,
    name: "Juan Pérez",
    avatar: "/images/avatars/avatar-3.jpg",
    role: "Huésped",
    content:
      "Reservar fue muy sencillo y la comunicación con el propietario fue fluida. La propiedad superó nuestras expectativas.",
    rating: 4,
    location: "Bogotá",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="flex flex-col gap-6 text-center">
        <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
        <p className="section-subtitle">
          Descubre las experiencias de huéspedes y propietarios que han utilizado nuestra plataforma
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full card-hover border-0 shadow-md overflow-hidden">
                <CardContent className="p-6 flex flex-col gap-4 relative">
                  <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/10" />

                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

