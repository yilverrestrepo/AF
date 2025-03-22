"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Search } from "lucide-react"

// Datos de ejemplo para conversaciones
const conversations = [
  {
    id: 1,
    user: {
      name: "Laura García",
      image: "/placeholder.svg?height=100&width=100",
      lastActive: "En línea",
    },
    lastMessage: {
      text: "Hola, me gustaría saber si la propiedad está disponible para las fechas del 15 al 20 de julio.",
      time: "10:30",
      isRead: true,
      isOwn: false,
    },
    property: "Villa con vista al mar",
  },
  {
    id: 2,
    user: {
      name: "Carlos Rodríguez",
      image: "/placeholder.svg?height=100&width=100",
      lastActive: "Hace 2 horas",
    },
    lastMessage: {
      text: "Gracias por la información. Realizaré la reserva hoy mismo.",
      time: "Ayer",
      isRead: false,
      isOwn: false,
    },
    property: "Villa con vista al mar",
  },
  {
    id: 3,
    user: {
      name: "Miguel Pérez",
      image: "/placeholder.svg?height=100&width=100",
      lastActive: "Hace 1 día",
    },
    lastMessage: {
      text: "Perfecto, muchas gracias por tu ayuda.",
      time: "23/06",
      isRead: true,
      isOwn: true,
    },
    property: "Cabaña en la montaña",
  },
]

// Datos de ejemplo para mensajes de una conversación
const messages = [
  {
    id: 1,
    text: "Hola, me gustaría saber si la propiedad está disponible para las fechas del 15 al 20 de julio.",
    time: "10:30",
    isOwn: false,
  },
  {
    id: 2,
    text: "Hola Laura, gracias por tu interés. Sí, la propiedad está disponible para esas fechas.",
    time: "10:35",
    isOwn: true,
  },
  {
    id: 3,
    text: "¿Cuál sería el precio total para 4 personas?",
    time: "10:37",
    isOwn: false,
  },
  {
    id: 4,
    text: "El precio total para 4 personas durante 5 noches sería de $1,250 USD. Esto incluye todos los servicios mencionados en la descripción.",
    time: "10:40",
    isOwn: true,
  },
  {
    id: 5,
    text: "Perfecto, me interesa. ¿Cómo puedo proceder con la reserva?",
    time: "10:45",
    isOwn: false,
  },
]

export default function DashboardMessages() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    // Aquí se implementaría la lógica para enviar el mensaje
    console.log("Mensaje enviado:", newMessage)
    setNewMessage("")
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[600px]">
      <div className="md:w-1/3 border rounded-lg overflow-hidden flex flex-col">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar conversaciones" className="pl-9" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 border-b cursor-pointer hover:bg-accent transition-colors ${
                selectedConversation === conversation.id ? "bg-accent" : ""
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={conversation.user.image || "/placeholder.svg"}
                    alt={conversation.user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium truncate">{conversation.user.name}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.lastMessage.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage.isOwn ? "Tú: " : ""}
                    {conversation.lastMessage.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{conversation.property}</p>
                </div>
              </div>
              {!conversation.lastMessage.isRead && !conversation.lastMessage.isOwn && (
                <div className="flex justify-end mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 border rounded-lg overflow-hidden flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-3 border-b">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={conversations.find((c) => c.id === selectedConversation)?.user.image || ""}
                    alt={conversations.find((c) => c.id === selectedConversation)?.user.name || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{conversations.find((c) => c.id === selectedConversation)?.user.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {conversations.find((c) => c.id === selectedConversation)?.user.lastActive}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isOwn ? "bg-primary text-primary-foreground" : "bg-accent"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Escribe un mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-muted-foreground">Selecciona una conversación para ver los mensajes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

