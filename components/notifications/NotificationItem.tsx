"use client"

import type React from "react"

import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { Notification } from "@/types/notification"
import Link from "next/link"

interface NotificationItemProps {
  notification: Notification
  onClose?: () => void
}

export default function NotificationItem({ notification, onClose }: NotificationItemProps) {
  // Función para marcar como leída
  const markAsRead = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (notification.read) return

    try {
      await fetch(`/api/notifications/${notification.id}/read`, {
        method: "POST",
      })
      // Invalidar la consulta para actualizar los datos
      // queryClient.invalidateQueries(["notifications"])
    } catch (error) {
      console.error("Error al marcar notificación como leída:", error)
    }
  }

  // Obtener el tiempo relativo
  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
    locale: es,
  })

  // Determinar el ícono según el tipo
  const getIcon = () => {
    switch (notification.type) {
      case "message":
        return (
          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
        )
      case "reservation":
        return (
          <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )
      case "system":
        return (
          <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )
      default:
        return (
          <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        )
    }
  }

  return (
    <Link
      href={notification.link || "#"}
      className={cn(
        "flex items-start gap-3 p-3 w-full hover:bg-gray-50 transition-colors",
        !notification.read && "bg-blue-50/50",
      )}
      onClick={(e) => {
        markAsRead(e)
        onClose?.()
      }}
    >
      {getIcon()}
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm text-gray-900 line-clamp-2", !notification.read && "font-medium")}>
          {notification.message}
        </p>
        <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
      </div>
      {!notification.read && <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5" />}
    </Link>
  )
}

