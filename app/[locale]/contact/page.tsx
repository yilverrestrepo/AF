import ContactForm from "@/components/contact/ContactForm"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactPage({ params }: { params: { locale: string } }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Envíanos un mensaje</h2>
          <p className="text-gray-600 mb-6">
            Completa el formulario y nos pondremos en contacto contigo lo antes posible.
          </p>

          <ContactForm locale={params.locale} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Información de contacto</h2>
          <p className="text-gray-600 mb-6">Puedes contactarnos directamente a través de los siguientes medios:</p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Dirección</h3>
                <p className="text-gray-600">Calle Gran Vía 28, 28013 Madrid, España</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Teléfono</h3>
                <p className="text-gray-600">+34 91 123 45 67</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">info@fincas.com</p>
              </div>
            </div>
          </div>

          <div className="mt-8 h-64 bg-gray-200 rounded-lg">
            {/* Aquí iría un mapa de Google Maps */}
            <div className="h-full flex items-center justify-center text-gray-500">Mapa de ubicación</div>
          </div>
        </div>
      </div>
    </div>
  )
}

