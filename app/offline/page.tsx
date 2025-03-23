import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WifiOff } from "lucide-react"

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-md">
        <WifiOff className="h-16 w-16 mx-auto mb-6 text-gray-400" />
        <h1 className="text-3xl font-bold mb-4">Sin conexión</h1>
        <p className="text-gray-600 mb-8">
          Parece que no tienes conexión a Internet. Algunas funciones pueden no estar disponibles hasta que te vuelvas a
          conectar.
        </p>
        <Button asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}

