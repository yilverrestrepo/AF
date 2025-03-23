import Link from "next/link"
import { Button } from "@/components/ui/button"
import { unstable_setRequestLocale } from "next-intl/server"

export default function LocaleNotFound({ params }: { params: { locale: string } }) {
  // Establecer el locale para la solicitud actual
  unstable_setRequestLocale(params.locale)

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h2 className="text-3xl font-bold mb-4">Página no encontrada</h2>
      <p className="text-gray-600 mb-6">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
      <Button asChild>
        <Link href={`/${params.locale}`}>Volver al inicio</Link>
      </Button>
    </div>
  )
}

