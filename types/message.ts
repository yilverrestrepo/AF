export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  createdAt: string
}

export interface Conversation {
  id: string
  otherUser: {
    id: string
    name: string
    image?: string
  }
  property: {
    id: string
    title: string
  }
  lastMessage: {
    id: string
    senderId: string
    content: string
    createdAt: string
  }
  unreadCount: number
}

