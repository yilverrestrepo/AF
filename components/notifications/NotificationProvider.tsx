"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import Pusher from "pusher-js"
import { pusherConfig } from "@/lib/socket"

interface Notification {
  id: string
  message: string
  type: "info" | "success" | "warning" | "error"
  createdAt: Date
  read: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // For development, we'll add some mock notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        message: "Nueva reserva recibida para Villa Paraíso",
        type: "info",
        createdAt: new Date(),
        read: false,
      },
      {
        id: "2",
        message: "Pago confirmado para la reserva #12345",
        type: "success",
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        read: false,
      },
      {
        id: "3",
        message: "Nuevo mensaje de Juan Pérez",
        type: "info",
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        read: true,
      },
    ]

    setNotifications(mockNotifications)

    // In a real app, we would connect to Pusher here
    // For development, we'll just simulate it
    try {
      const pusher = new Pusher(pusherConfig.key, {
        cluster: pusherConfig.cluster,
      })

      const channel = pusher.subscribe("notifications")

      channel.bind("new-notification", (data: Notification) => {
        setNotifications((prev) => [data, ...prev])
      })

      return () => {
        pusher.unsubscribe("notifications")
        pusher.disconnect()
      }
    } catch (error) {
      console.log("Pusher connection failed (development mode)")
      // In development, we'll just simulate new notifications
      const interval = setInterval(() => {
        // Uncomment this to simulate new notifications during development
        // const randomNotification: Notification = {
        //   id: Math.random().toString(36).substring(7),
        //   message: `Notificación de prueba ${new Date().toLocaleTimeString()}`,
        //   type: "info",
        //   createdAt: new Date(),
        //   read: false,
        // }
        // setNotifications((prev) => [randomNotification, ...prev])
      }, 60000) // Every minute

      return () => clearInterval(interval)
    }
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

