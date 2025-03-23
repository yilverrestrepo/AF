"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Apple, Play } from "lucide-react"

export default function AppDownload() {
  return (
    <section className="py-16 bg-accent rounded-3xl overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Lleva Fincos contigo a donde vayas</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Descarga nuestra aplicación móvil y gestiona tus reservas, comunícate con anfitriones y descubre nuevos
              alojamientos desde cualquier lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="rounded-full px-6 bg-black text-white hover:bg-black/90 h-14">
                <Apple className="mr-2 h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Descargar en</span>
                  <span className="text-sm font-medium">App Store</span>
                </div>
              </Button>

              <Button className="rounded-full px-6 bg-black text-white hover:bg-black/90 h-14">
                <Play className="mr-2 h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Disponible en</span>
                  <span className="text-sm font-medium">Google Play</span>
                </div>
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">4.9/5</span> basado en más de 10,000 reseñas
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] md:h-[600px]">
              <img
                src="/images/app-mockup.png"
                alt="Fincos App"
                className="absolute top-0 left-1/2 -translate-x-1/2 h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Star() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 0L10.2571 5.08661L16 5.87336L11.856 9.79339L12.9443 16L8 12.9866L3.05573 16L4.144 9.79339L0 5.87336L5.74291 5.08661L8 0Z"
        fill="#FFD700"
      />
    </svg>
  )
}

