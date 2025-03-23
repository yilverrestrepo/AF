"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Verificar si el usuario ya ha instalado la aplicación o ha descartado el prompt
    const hasPromptBeenShown = localStorage.getItem("pwaPromptShown")

    if (hasPromptBeenShown) return

    // Escuchar el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenir que Chrome muestre el prompt automáticamente
      e.preventDefault()
      // Guardar el evento para usarlo más tarde
      setDeferredPrompt(e)
      // Mostrar nuestro prompt personalizado
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    // Mostrar el prompt de instalación
    deferredPrompt.prompt()

    // Esperar a que el usuario responda al prompt
    const choiceResult = await deferredPrompt.userChoice

    // Ocultar nuestro prompt personalizado independientemente de la respuesta
    setShowPrompt(false)
    setDeferredPrompt(null)

    // Guardar que el prompt ha sido mostrado
    localStorage.setItem("pwaPromptShown", "true")

    // Registrar la respuesta del usuario
    if (choiceResult.outcome === "accepted") {
      console.log("Usuario aceptó la instalación")
    } else {
      console.log("Usuario rechazó la instalación")
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Guardar que el usuario ha descartado el prompt
    localStorage.setItem("pwaPromptShown", "true")
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50 border-t">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Instala FINCAS</h3>
          <p className="text-sm text-gray-600">Añade nuestra app a tu pantalla de inicio para un acceso más rápido</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDismiss}>
            Ahora no
          </Button>
          <Button size="sm" onClick={handleInstall}>
            Instalar
          </Button>
          <button onClick={handleDismiss} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

