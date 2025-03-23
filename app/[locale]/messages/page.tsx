import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUserConversations } from "@/lib/messages"
import MessageList from "@/components/messages/MessageList"
import MessageDetail from "@/components/messages/MessageDetail"
import { MessageSquare } from "lucide-react"

export default async function MessagesPage({
  params,
  searchParams,
}: { params: { locale: string }; searchParams: { conversationId?: string } }) {
  const session = await getServerSession(authOptions)

  // Si el usuario no está autenticado, mostrar un mensaje informativo
  if (!session) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12 border rounded-lg">
          <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Mensajes</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Para ver y enviar mensajes a anfitriones y huéspedes, por favor inicia sesión o regístrate.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href={`/${params.locale}/login?callbackUrl=/${params.locale}/messages`}>Iniciar sesión</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${params.locale}/properties`}>Explorar propiedades</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const conversations = await getUserConversations(session.user.id)
  const selectedConversationId = searchParams.conversationId || (conversations.length > 0 ? conversations[0].id : null)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mensajes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <MessageList
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            locale={params.locale}
          />
        </div>

        <div className="md:col-span-2">
          {selectedConversationId ? (
            <MessageDetail conversationId={selectedConversationId} userId={session.user.id} locale={params.locale} />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600">Selecciona una conversación para ver los mensajes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

