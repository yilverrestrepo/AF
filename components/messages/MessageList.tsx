import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import type { Conversation } from "@/types/message"
import { cn } from "@/lib/utils"

interface MessageListProps {
  conversations: Conversation[]
  selectedConversationId: string | null
  locale: string
}

export default function MessageList({ conversations, selectedConversationId, locale }: MessageListProps) {
  if (conversations.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">No tienes conversaciones</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Conversaciones</h2>
      </div>

      <div className="divide-y">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            href={`/${locale}/messages?conversationId=${conversation.id}`}
            className={cn(
              "flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors",
              selectedConversationId === conversation.id && "bg-gray-100",
            )}
          >
            <Avatar>
              <AvatarImage src={conversation.otherUser.image} />
              <AvatarFallback>{conversation.otherUser.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium truncate">{conversation.otherUser.name}</h3>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
                    addSuffix: true,
                    locale: es,
                  })}
                </span>
              </div>

              <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.content}</p>

              {conversation.unreadCount > 0 && (
                <div className="mt-1 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-600 mr-2" />
                  <span className="text-xs text-blue-600 font-medium">
                    {conversation.unreadCount} {conversation.unreadCount === 1 ? "nuevo mensaje" : "nuevos mensajes"}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

