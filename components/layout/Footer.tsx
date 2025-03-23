import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-accent dark:bg-accent/10 border-t">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Fincos
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              La mejor plataforma para encontrar y reservar propiedades vacacionales premium en Colombia.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Destinos Populares</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/taxonomy/listing_city?city=cartagena"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  Cartagena
                </Link>
              </li>
              <li>
                <Link
                  href="/taxonomy/listing_city?city=santa-marta"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  Santa Marta
                </Link>
              </li>
              <li>
                <Link
                  href="/taxonomy/listing_city?city=medellin"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  Medellín
                </Link>
              </li>
              <li>
                <Link
                  href="/taxonomy/listing_city?city=bogota"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  Bogotá
                </Link>
              </li>
              <li>
                <Link
                  href="/taxonomy/listing_city?city=san-andres"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  San Andrés
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-primary hover:underline font-medium">
                  Ver todos los destinos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Páginas</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-muted-foreground hover:text-primary transition-colors">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-muted-foreground hover:text-primary transition-colors">
                  Experiencias
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Calle 10 #34-56, Medellín, Colombia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">info@fincos.co</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Suscríbete a nuestro boletín</h4>
              <div className="flex gap-2">
                <Input type="email" placeholder="Tu correo electrónico" className="bg-background" />
                <Button type="submit" size="sm">
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Fincos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

