import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserConversations } from "@/lib/messages"
import MessageList from "@/components/messages/MessageList"
import MessageDetail from "@/components/messages/MessageDetail"

export default async function MessagesPage({
  params,
  searchParams,
}: { params: { locale: string }; searchParams: { conversationId?: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${params.locale}/login?callbackUrl=/${params.locale}/messages`)
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

