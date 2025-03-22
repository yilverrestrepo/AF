import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="py-12">
      <div className="rounded-xl bg-primary/10 p-8 md:p-12 relative overflow-hidden">
        <div className="flex flex-col gap-4 max-w-2xl relative z-10">
          <h2 className="text-3xl font-bold tracking-tight">¿Tienes una propiedad para alquilar?</h2>
          <p className="text-muted-foreground">
            Únete a nuestra comunidad de propietarios y comienza a recibir reservas hoy mismo. Publicar tu propiedad es
            fácil y rápido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/list-property">
              <Button size="lg">Publicar propiedad</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Conocer más
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/20 to-transparent hidden md:block" />
      </div>
    </section>
  )
}

