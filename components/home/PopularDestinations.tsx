"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { motion } from "framer-motion"

// Datos de ejemplo para destinos populares
const destinations = [
  {
    id: 1,
    name: "Cartagena",
    image: "/images/destinations/cartagena.jpg",
    properties: 48,
    slug: "cartagena",
    description: "Ciudad histórica con playas paradisíacas",
  },
  {
    id: 2,
    name: "Santa Marta",
    image: "/images/destinations/santa-marta.jpg",
    properties: 36,
    slug: "santa-marta",
    description: "Playas, montañas y parques naturales",
  },
  {
    id: 3,
    name: "Medellín",
    image: "/images/destinations/medellin.jpg",
    properties: 42,
    slug: "medellin",
    description: "La ciudad de la eterna primavera",
  },
  {
    id: 4,
    name: "San Andrés",
    image: "/images/destinations/san-andres.jpg",
    properties: 24,
    slug: "san-andres",
    description: "Isla paradisíaca en el Caribe",
  },
  {
    id: 5,
    name: "Bogotá",
    image: "/images/destinations/bogota.jpg",
    properties: 30,
    slug: "bogota",
    description: "Capital cultural y gastronómica",
  },
]

export default function PopularDestinations() {
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
      <div className="flex flex-col gap-6 text-center mb-10">
        <h2 className="section-title">Destinos Populares</h2>
        <p className="section-subtitle">Descubre los lugares más buscados por nuestros usuarios</p>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {destinations.map((destination) => (
          <motion.div key={destination.id} variants={item}>
            <Link href={`/taxonomy/listing_city?city=${destination.slug}`} className="block h-full">
              <Card className="overflow-hidden h-full card-hover border-0 shadow-md">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={destination.image || "/placeholder.svg?height=400&width=600"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm text-white/80 mb-2">{destination.description}</p>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      <span>{destination.properties} propiedades</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

