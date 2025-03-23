import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ChatInterface from "@/components/messaging/ChatInterface"

export default async function ConversationPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/login")
  }

  // Obtener la conversación
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: params.id,
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
    },
  })

  if (!conversation) {
    notFound()
  }

  // Verificar si el usuario es participante de la conversación
  const isParticipant = conversation.participants.some((participant) => participant.userId === session.user.id)

  if (!isParticipant) {
    redirect("/messages")
  }

  // Obtener el otro participante (no el usuario actual)
  const otherParticipant = conversation.participants.find((participant) => participant.userId !== session.user.id)

  if (!otherParticipant) {
    redirect("/messages")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Conversación con {otherParticipant.user.name}</h1>

      <ChatInterface
        conversationId={conversation.id}
        recipientId={otherParticipant.user.id}
        recipientName={otherParticipant.user.name}
        recipientImage={otherParticipant.user.image}
      />
    </div>
  )
}

