"use client"

import { Search, Calendar, CreditCard, Home, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Search,
    title: "Busca",
    description: "Encuentra la propiedad perfecta utilizando nuestros filtros avanzados",
  },
  {
    icon: Calendar,
    title: "Solicita",
    description: "Envía una solicitud de reserva para las fechas que deseas",
  },
  {
    icon: CheckCircle,
    title: "Confirma",
    description: "El anfitrión revisará tu solicitud y confirmará la disponibilidad",
  },
  {
    icon: CreditCard,
    title: "Paga",
    description: "Realiza el pago de forma segura a través de nuestra plataforma",
  },
  {
    icon: Home,
    title: "Disfruta",
    description: "Vive una experiencia inolvidable en tu destino",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="flex flex-col gap-6 text-center">
        <h2 className="section-title">¿Cómo funciona?</h2>
        <p className="section-subtitle">Reservar tu próxima propiedad vacacional es fácil y seguro con Fincos</p>

        <div className="flex flex-col md:flex-row justify-between items-center relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 hidden md:block"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center gap-4 group relative bg-background md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 border-4 border-background">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

