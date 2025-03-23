import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Pusher from "pusher"

// Inicializar Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
})

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { recipientId, initialMessage, propertyId, propertyTitle } = body

    if (!recipientId || !initialMessage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verificar si ya existe una conversación entre estos usuarios
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          {
            participants: {
              some: {
                userId: session.user.id,
              },
            },
          },
          {
            participants: {
              some: {
                userId: recipientId,
              },
            },
          },
        ],
      },
      include: {
        participants: true,
      },
    })

    let conversationId

    if (existingConversation) {
      // Usar la conversación existente
      conversationId = existingConversation.id
    } else {
      // Crear una nueva conversación
      const newConversation = await prisma.conversation.create({
        data: {
          participants: {
            create: [{ userId: session.user.id }, { userId: recipientId }],
          },
        },
      })

      conversationId = newConversation.id
    }

    // Crear el mensaje inicial
    const message = await prisma.message.create({
      data: {
        content: propertyId ? `${initialMessage}\n\n(Referente a la propiedad: ${propertyTitle})` : initialMessage,
        senderId: session.user.id,
        conversationId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // Formatear el mensaje para enviar a través de Pusher
    const formattedMessage = {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      senderName: message.sender.name,
      senderImage: message.sender.image,
      createdAt: message.createdAt,
    }

    // Enviar el mensaje a través de Pusher
    await pusher.trigger(`conversation-${conversationId}`, "new-message", formattedMessage)

    return NextResponse.json({ conversationId })
  } catch (error) {
    console.error("Error creating conversation:", error)
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 })
  }
}

