"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import ExperienceCard from "@/components/experiences/ExperienceCard"
import { motion } from "framer-motion"

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
    image: "/images/experiences/experience-1.jpg",
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
    image: "/images/experiences/experience-2.jpg",
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
    image: "/images/experiences/experience-3.jpg",
    duration: "4 horas",
    category: "Cultura",
    isPopular: true,
  },
]

export default function ExperiencesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-16">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="section-title">Experiencias únicas</h2>
            <p className="text-muted-foreground text-lg">Actividades memorables organizadas por expertos locales</p>
          </div>
          <Link href="/experiences">
            <Button variant="ghost" className="group">
              Ver todas
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((experience) => (
            <motion.div key={experience.id} variants={item}>
              <ExperienceCard experience={experience} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

