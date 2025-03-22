import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Carlos Rodríguez",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Huésped",
    content:
      "Increíble experiencia. La propiedad era exactamente como en las fotos y el anfitrión fue muy atento. Definitivamente volveré a reservar con Fincos.",
    rating: 5,
  },
  {
    name: "María González",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Propietaria",
    content:
      "Como propietaria, Fincos me ha facilitado enormemente la gestión de mi propiedad. El sistema es intuitivo y el soporte es excelente.",
    rating: 5,
  },
  {
    name: "Juan Pérez",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Huésped",
    content:
      "Reservar fue muy sencillo y la comunicación con el propietario fue fluida. La propiedad superó nuestras expectativas.",
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <section className="py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Lo que dicen nuestros usuarios</h2>
          <p className="text-muted-foreground mx-auto max-w-[700px]">
            Descubre las experiencias de huéspedes y propietarios que han utilizado nuestra plataforma
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
                <p className="text-sm">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

