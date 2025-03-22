"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import ListingCard from "@/components/listings/ListingCard"
import { motion } from "framer-motion"

// Datos de ejemplo para propiedades destacadas
const featuredListings = [
  {
    id: 1,
    title: "Villa con vista al mar",
    slug: "villa-con-vista-al-mar",
    location: "Cartagena, Colombia",
    price: 250,
    rating: 4.9,
    reviews: 128,
    image: "/images/listings/listing-1.jpg",
    images: ["/images/listings/listing-1.jpg", "/images/listings/listing-1-2.jpg", "/images/listings/listing-1-3.jpg"],
    features: ["Piscina", "Vista al mar", "WiFi"],
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    isFeatured: true,
    isNew: false,
    isSuperhost: true,
  },
  {
    id: 2,
    title: "Cabaña en la montaña",
    slug: "cabana-en-la-montana",
    location: "Santa Elena, Antioquia",
    price: 120,
    rating: 4.7,
    reviews: 95,
    image: "/images/listings/listing-2.jpg",
    images: ["/images/listings/listing-2.jpg", "/images/listings/listing-2-2.jpg", "/images/listings/listing-2-3.jpg"],
    features: ["Chimenea", "Jacuzzi", "WiFi"],
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    isFeatured: true,
    isNew: true,
    isSuperhost: false,
  },
  {
    id: 3,
    title: "Apartamento de lujo",
    slug: "apartamento-de-lujo",
    location: "Medellín, Colombia",
    price: 180,
    rating: 4.8,
    reviews: 112,
    image: "/images/listings/listing-3.jpg",
    images: ["/images/listings/listing-3.jpg", "/images/listings/listing-3-2.jpg", "/images/listings/listing-3-3.jpg"],
    features: ["Gimnasio", "Terraza", "WiFi"],
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    isFeatured: true,
    isNew: false,
    isSuperhost: true,
  },
]

export default function FeaturedListings() {
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
            <h2 className="section-title">Alojamientos destacados</h2>
            <p className="text-muted-foreground text-lg">
              Propiedades seleccionadas por su calidad y valoraciones excepcionales
            </p>
          </div>
          <Link href="/listings">
            <Button variant="ghost" className="group">
              Ver todos
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
          {featuredListings.map((listing) => (
            <motion.div key={listing.id} variants={item}>
              <ListingCard listing={listing} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

