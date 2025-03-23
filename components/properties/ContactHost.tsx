"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

interface ContactHostProps {
  hostId: string
  propertyId: string
  propertyTitle: string
}

export default function ContactHost({ hostId, propertyId, propertyTitle }: ContactHostProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSendMessage = async () => {
    if (!session) {
      toast({
        title: "Inicia sesión primero",
        description: "Necesitas iniciar sesión para contactar al anfitrión",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!message.trim()) {
      toast({
        title: "Mensaje vacío",
        description: "Por favor, escribe un mensaje",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Crear o obtener una conversación existente
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientId: hostId,
          initialMessage: message,
          propertyId,
          propertyTitle,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje")
      }

      // Redirigir a la conversación
      router.push(`/messages/${data.conversationId}`)
      setIsOpen(false)
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al enviar el mensaje",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Contactar al anfitrión
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contactar al anfitrión sobre {propertyTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Escribe tu mensaje aquí..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="resize-none"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !message.trim()} className="w-full">
            {isLoading ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

