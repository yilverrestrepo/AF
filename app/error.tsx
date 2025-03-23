"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Registrar el error en un servicio de análisis de errores
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
      <p className="text-gray-600 mb-6">Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.</p>
      <Button
        onClick={
          // Intentar recuperarse del error reiniciando el componente
          () => reset()
        }
      >
        Intentar de nuevo
      </Button>
    </div>
  )
}

