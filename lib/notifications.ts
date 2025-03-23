import { prisma } from "@/lib/prisma"
import Pusher from "pusher"

// Inicializar Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
})

export type NotificationType =
  | "RESERVATION_REQUEST"
  | "RESERVATION_CONFIRMED"
  | "RESERVATION_CANCELLED"
  | "PAYMENT_RECEIVED"
  | "NEW_MESSAGE"
  | "NEW_REVIEW"
  | "PROPERTY_APPROVED"
  | "PROPERTY_REJECTED"
  | "ACCOUNT_UPDATE"
  | "SYSTEM"

interface NotificationData {
  userId: string
  title: string
  message: string
  type: NotificationType
  link?: string
}

export async function sendNotification(data: NotificationData) {
  try {
    // Crear la notificación en la base de datos
    const notification = await prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        link: data.link,
      },
    })

    // Enviar la notificación en tiempo real a través de Pusher
    await pusher.trigger(`user-${data.userId}`, "new-notification", notification)

    return notification
  } catch (error) {
    console.error("Error sending notification:", error)
    throw error
  }
}

export async function sendReservationNotification(
  hostId: string,
  guestId: string,
  propertyId: string,
  propertyTitle: string,
  reservationId: string,
  status: "REQUESTED" | "CONFIRMED" | "CANCELLED" | "COMPLETED",
) {
  try {
    let hostNotification: NotificationData | null = null
    let guestNotification: NotificationData | null = null

    switch (status) {
      case "REQUESTED":
        hostNotification = {
          userId: hostId,
          title: "Nueva solicitud de reserva",
          message: `Has recibido una nueva solicitud de reserva para "${propertyTitle}"`,
          type: "RESERVATION_REQUEST",
          link: `/reservations/${reservationId}`,
        }
        break

      case "CONFIRMED":
        guestNotification = {
          userId: guestId,
          title: "Reserva confirmada",
          message: `Tu reserva para "${propertyTitle}" ha sido confirmada`,
          type: "RESERVATION_CONFIRMED",
          link: `/reservations/${reservationId}`,
        }
        break

      case "CANCELLED":
        // Notificar tanto al anfitrión como al huésped
        hostNotification = {
          userId: hostId,
          title: "Reserva cancelada",
          message: `Una reserva para "${propertyTitle}" ha sido cancelada`,
          type: "RESERVATION_CANCELLED",
          link: `/reservations/${reservationId}`,
        }

        guestNotification = {
          userId: guestId,
          title: "Reserva cancelada",
          message: `Tu reserva para "${propertyTitle}" ha sido cancelada`,
          type: "RESERVATION_CANCELLED",
          link: `/reservations/${reservationId}`,
        }
        break

      case "COMPLETED":
        guestNotification = {
          userId: guestId,
          title: "Estancia completada",
          message: `Tu estancia en "${propertyTitle}" ha finalizado. ¿Qué tal ha ido? Deja una reseña`,
          type: "SYSTEM",
          link: `/properties/${propertyId}/reviews`,
        }
        break
    }

    // Enviar notificaciones
    if (hostNotification) {
      await sendNotification(hostNotification)
    }

    if (guestNotification) {
      await sendNotification(guestNotification)
    }
  } catch (error) {
    console.error("Error sending reservation notification:", error)
    throw error
  }
}

