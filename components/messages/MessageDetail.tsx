"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatDate } from "@/lib/utils"
import type { Message, Conversation } from "@/types/message"
import { toast } from "@/hooks/use-toast"
import { Send } from "lucide-react"

interface MessageDetailProps {
  conversationId: string
  userId: string
  locale: string
}

export default function MessageDetail({ conversationId, userId, locale }: MessageDetailProps) {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  // Cargar la conversación y los mensajes
  useEffect(() => {
    const fetchConversation = async () => {
      setIsLoading(true)

      try {
        // En un entorno real, esto se conectaría a la API
        // Por ahora, simulamos una respuesta

        // Simular una conversación
        const mockConversation: Conversation = {
          id: conversationId,
          otherUser: {
            id: "other-user",
            name: "Ana García",
            image: "/placeholder.svg?height=100&width=100",
          },
          property: {
            id: "property-1",
            title: "Apartamento con vistas al mar",
          },
          lastMessage: {
            id: "last-message",
            senderId: "other-user",
            content: "¿Cuándo llegarás?",
            createdAt: new Date().toISOString(),
          },
          unreadCount: 0,
        }

        // Simular mensajes
        const mockMessages: Message[] = [
          {
            id: "message-1",
            conversationId,
            senderId: userId,
            content: "Hola, estoy interesado en tu propiedad. ¿Está disponible para las fechas que seleccioné?",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "message-2",
            conversationId,
            senderId: "other-user",
            content: "¡Hola! Sí, la propiedad está disponible para esas fechas. ¿Tienes alguna pregunta específica?",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "message-3",
            conversationId,
            senderId: userId,
            content: "Genial. Me gustaría saber si hay aparcamiento cerca y si el check-in es flexible.",
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "message-4",
            conversationId,
            senderId: "other-user",
            content:
              "Hay un parking público a 100 metros. El check-in es de 14:00 a 22:00, pero podemos ser flexibles si lo necesitas. ¿Cuándo llegarás?",
            createdAt: new Date().toISOString(),
          },
        ]

        setConversation(mockConversation)
        setMessages(mockMessages)
      } catch (error) {
        console.error("Error al cargar la conversación:", error)
        toast({
          title: "Error al cargar la conversación",
          description: "No se pudieron cargar los mensajes",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (conversationId) {
      fetchConversation()
    }
  }, [conversationId, userId])

  // Desplazarse al último mensaje cuando se cargan los mensajes o se envía uno nuevo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    setIsSending(true)

    try {
      // En un entorno real, esto enviaría el mensaje a la API
      // Por ahora, simulamos el envío

      // Crear un nuevo mensaje
      const newMessageObj: Message = {
        id: `message-${Date.now()}`,
        conversationId,
        senderId: userId,
        content: newMessage,
        createdAt: new Date().toISOString(),
      }

      // Actualizar la lista de mensajes
      setMessages((prev) => [...prev, newMessageObj])

      // Limpiar el campo de entrada
      setNewMessage("")

      // Actualizar la conversación con el último mensaje
      if (conversation) {
        setConversation({
          ...conversation,
          lastMessage: {
            id: newMessageObj.id,
            senderId: newMessageObj.senderId,
            content: newMessageObj.content,
            createdAt: newMessageObj.createdAt,
          },
        })
      }

      // En un entorno real, aquí se invalidaría la caché de la consulta
      // para actualizar la lista de conversaciones
    } catch (error) {
      console.error("Error al enviar el mensaje:", error)
      toast({
        title: "Error al enviar el mensaje",
        description: "No se pudo enviar el mensaje",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">Cargando conversación...</p>
      </div>
    )
  }

  if (!conversation) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">No se encontró la conversación</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={conversation.otherUser.image} />
            <AvatarFallback>{conversation.otherUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{conversation.otherUser.name}</h2>
            <p className="text-sm text-gray-600">{conversation.property.title}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === userId

          return (
            <div key={message.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isOwnMessage ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${isOwnMessage ? "text-primary-foreground/70" : "text-gray-500"}`}>
                  {formatDate(message.createdAt, "es-ES")}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          disabled={isSending}
          className="flex-1"
        />
        <Button type="submit" disabled={isSending || !newMessage.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
    </div>
  )
}

