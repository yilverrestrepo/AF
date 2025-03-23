import { Shield, Award, CheckCircle, Clock } from "lucide-react"

export default function TrustBadges() {
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Propiedades Verificadas</h3>
            <p className="text-sm text-muted-foreground">Todos los alojamientos son verificados personalmente</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Anfitriones de Calidad</h3>
            <p className="text-sm text-muted-foreground">Seleccionados por su hospitalidad y atención</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Reserva Segura</h3>
            <p className="text-sm text-muted-foreground">Garantía de reembolso y protección al viajero</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Soporte 24/7</h3>
            <p className="text-sm text-muted-foreground">Asistencia personalizada durante toda tu estancia</p>
          </div>
        </div>
      </div>
    </section>
  )
}

