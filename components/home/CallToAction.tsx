"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CallToAction() {
  return (
    <section className="py-16">
      <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>

        <motion.div
          className="flex flex-col gap-6 max-w-2xl relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            ¿Listo para vivir una experiencia inolvidable?
          </h2>
          <p className="text-white/90 text-lg">
            Encuentra el alojamiento perfecto para tus próximas vacaciones y crea recuerdos que durarán toda la vida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/listings">
              <Button size="lg" className="rounded-full px-8 bg-white text-primary hover:bg-white/90">
                Explorar propiedades
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-white text-white hover:bg-white/10"
              >
                Contactar soporte
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="absolute -bottom-10 right-10 hidden lg:block">
          <motion.img
            src="/images/cta-illustration.png"
            alt="Illustration"
            className="h-64 w-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </section>
  )
}

