"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Verificar si el usuario ya ha instalado la app o ha rechazado la instalación
    const hasPromptedUser = localStorage.getItem("pwaPromptDismissed")

    if (hasPromptedUser) return

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

    // Resetear el deferredPrompt - solo se puede usar una vez
    setDeferredPrompt(null)
    setShowPrompt(false)

    // Guardar la decisión del usuario
    if (choiceResult.outcome === "accepted") {
      console.log("Usuario aceptó la instalación")
    } else {
      console.log("Usuario rechazó la instalación")
      // Guardar en localStorage para no volver a mostrar el prompt
      localStorage.setItem("pwaPromptDismissed", "true")
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Guardar en localStorage para no volver a mostrar el prompt inmediatamente
    // Podemos establecer un tiempo de espera antes de volver a mostrar
    localStorage.setItem("pwaPromptDismissed", "true")
  }

  if (!showPrompt) return null

  return (
    <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Instalar FINCAS</DialogTitle>
          <DialogDescription>
            Instala nuestra aplicación en tu dispositivo para una mejor experiencia, acceso rápido y funcionalidad
            offline.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center py-4">
          <img src="/icons/icon-192x192.png" alt="FINCAS App" className="w-24 h-24 rounded-xl shadow-md" />
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleDismiss} className="sm:flex-1">
            Ahora no
          </Button>
          <Button onClick={handleInstall} className="sm:flex-1">
            <Download className="mr-2 h-4 w-4" />
            Instalar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

