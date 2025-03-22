import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import ReviewsBar from "@/components/home/ReviewsBar"

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="absolute inset-0 object-cover w-full h-full">
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      <div className="container relative z-20 flex h-full flex-col items-center justify-center px-4 text-center md:px-6">
        <div className="space-y-6 max-w-4xl animate-fade-in">
          <div className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            Más de 10,000 propiedades verificadas en toda Colombia
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Descubre lugares <span className="text-primary">extraordinarios</span> para hospedarte
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-white/90 md:text-xl">
            Alojamientos únicos, experiencias auténticas y momentos inolvidables te esperan
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Link href="/listings">
              <Button size="lg" className="rounded-full px-8 btn-primary-gradient">
                Explorar propiedades
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/become-host">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
              >
                Conviértete en anfitrión
              </Button>
            </Link>
          </div>
        </div>

        {/* Reviews bar at the bottom */}
        <div className="absolute bottom-8 left-0 right-0 z-30">
          <ReviewsBar />
        </div>
      </div>
    </section>
  )
}

