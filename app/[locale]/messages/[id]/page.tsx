import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ChatInterface from "@/components/messaging/ChatInterface"

export default async function ConversationPage({
  params,
}: {
  params: { id: string; locale: string }
}) {
  // Obtener la sesión del usuario
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    // Si no está autenticado, redirigir al login
    return redirect(`/${params.locale}/login`)
  }

  // Obtener la conversación desde la base de datos
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
    // Si no se encuentra la conversación, lanzar 404
    return notFound()
  }

  // Verificar si el usuario actual es un participante de la conversación
  const isParticipant = conversation.participants.some(
    (participant) => participant.userId === session.user.id
  )

  if (!isParticipant) {
    // Si no es participante, redirigir a la lista de mensajes
    return redirect(`/${params.locale}/messages`)
  }

  // Obtener el otro participante (no el usuario actual)
  const otherParticipant = conversation.participants.find(
    (participant) => participant.userId !== session.user.id
  )

  if (!otherParticipant) {
    // Si no se encuentra el otro participante, redirigir a la lista de mensajes
    return redirect(`/${params.locale}/messages`)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Conversación con {otherParticipant.user.name}</h1>

      <ChatInterface
        conversationId={conversation.id}
        recipientId={otherParticipant.user.id}
        recipientName={otherParticipant.user.name}
        recipientImage={otherParticipant.user.image}
        locale={params.locale}
      />
    </div>
  )
}

