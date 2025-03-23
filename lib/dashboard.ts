import type { Reservation } from "@/types/reservation"

interface UserStats {
  propertyCount: number
  propertyCountChange: number
  reservationCount: number
  reservationCountChange: number
  messageCount: number
  unreadMessageCount: number
  averageRating: number
  reviewCount: number
  revenueData: {
    month: string
    revenue: number
  }[]
  recentReservations: Reservation[]
}

// Función para obtener estadísticas del usuario para el dashboard
export async function getUserStats(userId: string): Promise<UserStats> {
  try {
    // En un entorno real, esto se conectaría a la base de datos
    // Por ahora, devolvemos datos de ejemplo

    // Datos de ingresos de los últimos 6 meses
    const revenueData = [
      { month: "Enero", revenue: 1200 },
      { month: "Febrero", revenue: 1800 },
      { month: "Marzo", revenue: 2400 },
      { month: "Abril", revenue: 2100 },
      { month: "Mayo", revenue: 2800 },
      { month: "Junio", revenue: 3200 },
    ]

    // Reservas recientes
    const recentReservations: Reservation[] = [
      {
        id: "1",
        propertyId: "1",
        userId,
        checkIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        checkOut: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        guests: 2,
        totalPrice: 840,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        property: {
          id: "1",
          title: "Apartamento con vistas al mar",
          images: ["/placeholder.svg?height=600&width=800"],
          location: "Barcelona, España",
          price: 120,
        },
      },
      {
        id: "2",
        propertyId: "2",
        userId,
        checkIn: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        checkOut: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
        guests: 4,
        totalPrice: 2450,
        status: "completed",
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        property: {
          id: "2",
          title: "Villa de lujo con piscina privada",
          images: ["/placeholder.svg?height=600&width=800"],
          location: "Marbella, España",
          price: 350,
        },
      },
    ]

    return {
      propertyCount: 3,
      propertyCountChange: 1,
      reservationCount: 12,
      reservationCountChange: 4,
      messageCount: 8,
      unreadMessageCount: 2,
      averageRating: 4.8,
      reviewCount: 24,
      revenueData,
      recentReservations,
    }
  } catch (error) {
    console.error("Error al obtener estadísticas del usuario:", error)
    return {
      propertyCount: 0,
      propertyCountChange: 0,
      reservationCount: 0,
      reservationCountChange: 0,
      messageCount: 0,
      unreadMessageCount: 0,
      averageRating: 0,
      reviewCount: 0,
      revenueData: [],
      recentReservations: [],
    }
  }
}

