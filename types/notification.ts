export type NotificationType = "message" | "reservation" | "system" | "payment"

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  message: string
  link?: string
  read: boolean
  createdAt: string
  data?: Record<string, any>
}

