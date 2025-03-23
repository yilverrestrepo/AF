"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface Recipient {
  id: string
  name: string
  image?: string
}

interface Message {
  id: string
  content: string
  senderId: string
  createdAt: string
}

interface Conversation {
  id: string
  recipient: Recipient
  lastMessage: Message | null
  updatedAt: string
}

interface MessagesListProps {
  conversations: Conversation[]
}

export default function MessagesList({ conversations }: MessagesListProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card className="overflow-hidden">
          <div className="divide-y">
            {conversations.map((conversation) => (
              <Link
                key={conversation.id}
                href={`/messages/${conversation.id}`}
                className={`block p-4 hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? "bg-gray-50" : ""
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.recipient.image} alt={conversation.recipient.name} />
                    <AvatarFallback>{conversation.recipient.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium truncate">{conversation.recipient.name}</h3>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(conversation.updatedAt), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </span>
                    </div>

                    {conversation.lastMessage ? (
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage.content}</p>
                    ) : (
                      <p className="text-sm text-gray-400 italic">No hay mensajes aún</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="md:col-span-2">
        {selectedConversation ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Selecciona una conversación para ver los mensajes</p>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Selecciona una conversación para ver los mensajes</p>
          </div>
        )}
      </div>
    </div>
  )
}

