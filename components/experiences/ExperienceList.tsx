import ExperienceCard from "@/components/experiences/ExperienceCard"

// Datos de ejemplo para experiencias
const experiences = [
  {
    id: 1,
    title: "Tour en catamarán al atardecer",
    slug: "tour-en-catamaran-al-atardecer",
    location: "Cartagena, Colombia",
    price: 80,
    rating: 4.9,
    reviews: 64,
    image: "/placeholder.svg?height=300&width=400",
    duration: "3 horas",
    category: "Navegación",
    isPopular: true,
  },
  {
    id: 2,
    title: "Clase de cocina colombiana",
    slug: "clase-de-cocina-colombiana",
    location: "Medellín, Colombia",
    price: 45,
    rating: 4.8,
    reviews: 52,
    image: "/placeholder.svg?height=300&width=400",
    duration: "2 horas",
    category: "Gastronomía",
    isPopular: true,
  },
  {
    id: 3,
    title: "Tour de café en finca cafetera",
    slug: "tour-de-cafe-en-finca-cafetera",
    location: "Eje Cafetero, Colombia",
    price: 35,
    rating: 4.7,
    reviews: 48,
    image: "/placeholder.svg?height=300&width=400",
    duration: "4 horas",
    category: "Cultura",
    isPopular: true,
  },
  {
    id: 4,
    title: "Excursión a Ciudad Perdida",
    slug: "excursion-a-ciudad-perdida",
    location: "Santa Marta, Colombia",
    price: 250,
    rating: 4.9,
    reviews: 36,
    image: "/placeholder.svg?height=300&width=400",
    duration: "4 días",
    category: "Aventura",
    isPopular: false,
  },
  {
    id: 5,
    title: "Paseo en globo aerostático",
    slug: "paseo-en-globo-aerostatico",
    location: "Villa de Leyva, Colombia",
    price: 120,
    rating: 4.8,
    reviews: 42,
    image: "/placeholder.svg?height=300&width=400",
    duration: "1 hora",
    category: "Aventura",
    isPopular: false,
  },
  {
    id: 6,
    title: "Clase de salsa",
    slug: "clase-de-salsa",
    location: "Cali, Colombia",
    price: 30,
    rating: 4.6,
    reviews: 58,
    image: "/placeholder.svg?height=300&width=400",
    duration: "2 horas",
    category: "Cultura",
    isPopular: false,
  },
]

interface ExperienceListProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ExperienceList({ searchParams }: ExperienceListProps) {
  // Aquí se implementaría la lógica de filtrado basada en searchParams
  // Por ahora, usamos los datos de ejemplo

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  )
}

