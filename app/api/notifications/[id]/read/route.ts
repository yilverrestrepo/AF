import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = params

    // Verificar que la notificación pertenece al usuario
    const notification = await prisma.notification.findUnique({
      where: {
        id,
      },
    })

    if (!notification || notification.userId !== session.user.id) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    // Marcar como leída
    const updatedNotification = await prisma.notification.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    })

    return NextResponse.json(updatedNotification)
  } catch (error) {
    console.error("Error marking notification as read:", error)
    return NextResponse.json({ error: "Failed to mark notification as read" }, { status: 500 })
  }
}

