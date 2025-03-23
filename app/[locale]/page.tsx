import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import OptimizedImage from "@/components/ui/optimized-image"

export default async function HomePage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  return (
    <div className="container mx-auto py-8">
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Encuentra tu próximo hogar temporal</h1>
            <p className="text-lg text-gray-600 mb-6">
              Descubre propiedades únicas para alquilar en los mejores destinos
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href={`/${params.locale}/properties`}>Explorar propiedades</Link>
              </Button>
              {!session && (
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${params.locale}/login`}>Iniciar sesión</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <OptimizedImage
              src="/placeholder.svg?height=800&width=600"
              alt="Propiedades destacadas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Cómo funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Busca</h3>
            <p className="text-gray-600">
              Explora nuestra selección de propiedades y encuentra la que mejor se adapte a tus necesidades.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Reserva</h3>
            <p className="text-gray-600">
              Selecciona las fechas y realiza tu reserva de forma segura a través de nuestra plataforma.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Disfruta</h3>
            <p className="text-gray-600">
              Recibe las llaves y disfruta de tu estancia con la tranquilidad de nuestro soporte 24/7.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Destinos populares</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Barcelona", "Madrid", "Valencia", "Sevilla"].map((city) => (
            <Link
              key={city}
              href={`/${params.locale}/properties?location=${city}`}
              className="group relative h-40 rounded-lg overflow-hidden"
            >
              <OptimizedImage
                src={`/placeholder.svg?height=400&width=300&text=${city}`}
                alt={city}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                <h3 className="text-white font-semibold text-lg">{city}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

