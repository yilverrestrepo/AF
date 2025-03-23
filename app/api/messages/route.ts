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
    const { conversationId, recipientId, content } = body

    if (!conversationId || !recipientId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verificar si la conversación existe
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        participants: true,
      },
    })

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
    }

    // Verificar si el usuario es participante de la conversación
    const isParticipant = conversation.participants.some((participant) => participant.userId === session.user.id)

    if (!isParticipant) {
      return NextResponse.json({ error: "User is not a participant in this conversation" }, { status: 403 })
    }

    // Crear el mensaje
    const message = await prisma.message.create({
      data: {
        content,
        conversationId,
        senderId: session.user.id,
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

    return NextResponse.json(formattedMessage)
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const userId = session.user.id

    // Obtener todas las conversaciones del usuario
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    // Formatear las conversaciones
    const formattedConversations = conversations.map((conversation) => {
      // Obtener el otro participante (no el usuario actual)
      const otherParticipant = conversation.participants.find((participant) => participant.userId !== userId)

      return {
        id: conversation.id,
        recipient: otherParticipant?.user,
        lastMessage: conversation.messages[0] || null,
        updatedAt: conversation.updatedAt,
      }
    })

    return NextResponse.json(formattedConversations)
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}

