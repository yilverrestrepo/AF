import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import MessagesList from "@/components/messaging/MessagesList"

export default async function MessagesPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect(`/${params.locale}/login`)
  }

  // Obtener las conversaciones del usuario
  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: session.user.id,
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
    const otherParticipant = conversation.participants.find((participant) => participant.userId !== session.user.id)

    return {
      id: conversation.id,
      recipient: otherParticipant?.user,
      lastMessage: conversation.messages[0] || null,
      updatedAt: conversation.updatedAt,
    }
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mensajes</h1>

      {formattedConversations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No tienes conversaciones aún.</p>
        </div>
      ) : (
        <MessagesList conversations={formattedConversations} locale={params.locale} />
      )}
    </div>
  )
}

