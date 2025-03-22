"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DollarSign, Calendar, Shield, Users, ChevronRight } from "lucide-react"

export default function BecomeHostSection() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Para propietarios
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conviértete en anfitrión y genera ingresos con tu propiedad
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Únete a nuestra comunidad de anfitriones y comienza a recibir huéspedes de todo el mundo. Te ofrecemos las
              herramientas y el soporte necesarios para que tengas éxito.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Ingresos Adicionales</h3>
                  <p className="text-sm text-muted-foreground">Gana dinero compartiendo tu espacio</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Flexibilidad Total</h3>
                  <p className="text-sm text-muted-foreground">Tú controlas tu disponibilidad</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Protección Garantizada</h3>
                  <p className="text-sm text-muted-foreground">Seguro de responsabilidad civil incluido</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Soporte Dedicado</h3>
                  <p className="text-sm text-muted-foreground">Asistencia personalizada 24/7</p>
                </div>
              </div>
            </div>

            <Link href="/become-host">
              <Button size="lg" className="rounded-full px-8 btn-primary-gradient">
                Comenzar ahora
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <img
                src="/images/become-host.jpg"
                alt="Conviértete en anfitrión"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Ganancias Estimadas</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Los anfitriones en Colombia ganan en promedio:</p>
              <p className="text-2xl font-bold text-primary">$1,200 USD / mes</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

