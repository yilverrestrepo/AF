import { Search, Home, Calendar, CreditCard } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Busca",
    description: "Encuentra la propiedad perfecta utilizando nuestros filtros avanzados",
  },
  {
    icon: Calendar,
    title: "Reserva",
    description: "Selecciona tus fechas y realiza tu reserva en minutos",
  },
  {
    icon: CreditCard,
    title: "Paga",
    description: "Utiliza nuestro sistema seguro de pagos online",
  },
  {
    icon: Home,
    title: "Disfruta",
    description: "Vive una experiencia inolvidable en tu destino",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">¿Cómo funciona?</h2>
          <p className="text-muted-foreground mx-auto max-w-[700px]">
            Reservar tu próxima propiedad vacacional es fácil y rápido con Fincos
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

