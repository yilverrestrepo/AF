import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
      <div
        className="relative h-[600px] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
      >
        <div className="container relative z-20 flex h-full flex-col items-center justify-center px-4 text-center md:px-6">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Encuentra tu próximo destino vacacional
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Descubre propiedades únicas y vive experiencias inolvidables en los mejores destinos
            </p>
            <div className="flex flex-col gap-2 sm:flex-row justify-center">
              <Link href="/search">
                <Button size="lg">Buscar propiedades</Button>
              </Link>
              <Link href="/list-property">
                <Button variant="outline" size="lg">
                  Publicar propiedad
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

