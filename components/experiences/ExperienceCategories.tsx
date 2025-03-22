import Link from "next/link"
import { Utensils, Compass, Mountain, Waves, Music, Camera, Coffee, Bike } from "lucide-react"

const categories = [
  { name: "Gastronomía", icon: Utensils, slug: "gastronomia" },
  { name: "Tours", icon: Compass, slug: "tours" },
  { name: "Aventura", icon: Mountain, slug: "aventura" },
  { name: "Acuáticas", icon: Waves, slug: "acuaticas" },
  { name: "Música y Danza", icon: Music, slug: "musica-danza" },
  { name: "Fotografía", icon: Camera, slug: "fotografia" },
  { name: "Café", icon: Coffee, slug: "cafe" },
  { name: "Ciclismo", icon: Bike, slug: "ciclismo" },
]

export default function ExperienceCategories() {
  return (
    <div className="py-6">
      <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/taxonomy/experience_category?category=${category.slug}`}
            className="flex flex-col items-center gap-2 min-w-[100px] group"
          >
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <category.icon className="h-8 w-8 text-primary" />
            </div>
            <span className="text-sm font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

