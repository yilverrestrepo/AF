import Image from "next/image"
import { Star } from "lucide-react"

// Datos de ejemplo para reseñas
const reviews = [
  {
    id: 1,
    user: {
      name: "Laura García",
      image: "/placeholder.svg?height=100&width=100",
    },
    rating: 5,
    date: "Marzo 2023",
    content:
      "Excelente propiedad, todo estaba impecable y tal como se muestra en las fotos. La vista al mar es espectacular y la piscina privada es perfecta. El anfitrión fue muy atento y respondió rápidamente a todas nuestras consultas. Definitivamente volveremos.",
  },
  {
    id: 2,
    user: {
      name: "Miguel Rodríguez",
      image: "/placeholder.svg?height=100&width=100",
    },
    rating: 4,
    date: "Febrero 2023",
    content:
      "Muy buena experiencia en general. La casa es amplia y cómoda, con todas las comodidades necesarias. La ubicación es excelente, cerca de restaurantes y playas. Lo único que podría mejorar es la presión del agua en las duchas, pero no fue un problema mayor.",
  },
  {
    id: 3,
    user: {
      name: "Ana Martínez",
      image: "/placeholder.svg?height=100&width=100",
    },
    rating: 5,
    date: "Enero 2023",
    content:
      "Pasamos unas vacaciones increíbles en esta propiedad. La casa es hermosa y muy bien mantenida. La piscina y la terraza son perfectas para relajarse. El anfitrión nos dio excelentes recomendaciones de lugares para visitar y restaurantes. Totalmente recomendado.",
  },
  {
    id: 4,
    user: {
      name: "Juan Pérez",
      image: "/placeholder.svg?height=100&width=100",
    },
    rating: 5,
    date: "Diciembre 2022",
    content:
      "La propiedad superó nuestras expectativas. Muy espaciosa, limpia y con una vista impresionante. La comunicación con el anfitrión fue excelente. Sin duda volveremos a hospedarnos aquí en nuestra próxima visita a Cartagena.",
  },
]

// Datos de ejemplo para calificaciones
const ratings = {
  overall: 4.9,
  categories: [
    { name: "Limpieza", value: 5.0 },
    { name: "Precisión", value: 4.8 },
    { name: "Comunicación", value: 5.0 },
    { name: "Ubicación", value: 4.9 },
    { name: "Llegada", value: 4.7 },
    { name: "Relación calidad-precio", value: 4.8 },
  ],
}

export default function PropertyReviews({ propertyId }: { propertyId: number }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <span className="font-semibold text-lg">{ratings.overall}</span>
        <span className="text-muted-foreground">· {reviews.length} reseñas</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ratings.categories.map((category, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-40">{category.name}</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-primary rounded-full" style={{ width: `${(category.value / 5) * 100}%` }} />
            </div>
            <span className="text-sm">{category.value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-6 mt-6">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={review.user.image || "/placeholder.svg"}
                  alt={review.user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{review.user.name}</p>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </div>
            </div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-sm">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

