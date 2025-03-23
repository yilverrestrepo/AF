import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h2 className="text-3xl font-bold mb-4">Página no encontrada</h2>
      <p className="text-gray-600 mb-6">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  )
}

