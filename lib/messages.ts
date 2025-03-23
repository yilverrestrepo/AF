import type { Conversation } from "@/types/message"

// Función para obtener las conversaciones de un usuario
export async function getUserConversations(userId: string): Promise<Conversation[]> {
  try {
    // En un entorno real, esto se conectaría a la base de datos
    // Por ahora, devolvemos datos de ejemplo
    const conversations: Conversation[] = [
      {
        id: "conv1",
        otherUser: {
          id: "user2",
          name: "Ana García",
          image: "/placeholder.svg?height=100&width=100",
        },
        property: {
          id: "prop1",
          title: "Apartamento con vistas al mar",
        },
        lastMessage: {
          id: "msg1",
          senderId: "user2",
          content: "¿Cuándo llegarás?",
          createdAt: new Date().toISOString(),
        },
        unreadCount: 1,
      },
      {
        id: "conv2",
        otherUser: {
          id: "user3",
          name: "Carlos Martínez",
          image: "/placeholder.svg?height=100&width=100",
        },
        property: {
          id: "prop2",
          title: "Villa de lujo con piscina privada",
        },
        lastMessage: {
          id: "msg2",
          senderId: userId,
          content: "Gracias por la información. Confirmaré mi reserva pronto.",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        unreadCount: 0,
      },
    ]

    return conversations
  } catch (error) {
    console.error("Error al obtener las conversaciones del usuario:", error)
    return []
  }
}

