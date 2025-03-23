"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
import NotificationItem from "./NotificationItem"
import type { Notification } from "@/types/notification"

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  // Consulta para obtener notificaciones
  const { data: notifications = [], isLoading } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await fetch("/api/notifications")
      if (!res.ok) throw new Error("Error al cargar notificaciones")
      return res.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  // Filtrar notificaciones no leídas
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Marcar todas como leídas
  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications/mark-all-read", {
        method: "POST",
      })
      // Invalidar la consulta para actualizar los datos
      // queryClient.invalidateQueries(["notifications"])
    } catch (error) {
      console.error("Error al marcar notificaciones como leídas:", error)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notificaciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notificaciones</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto py-1 px-2 text-xs">
              Marcar todas como leídas
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Cargando notificaciones...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No tienes notificaciones</div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
                <NotificationItem notification={notification} onClose={() => setIsOpen(false)} />
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center">
          <a href="/notifications" className="w-full text-center text-sm text-primary">
            Ver todas las notificaciones
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

