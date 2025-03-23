import type { Reservation } from "@/types/reservation"

// Función para obtener las reservas de un usuario
export async function getUserReservations(userId: string): Promise<Reservation[]> {
  try {
    // En un entorno real, esto se conectaría a la base de datos
    // Por ahora, devolvemos datos de ejemplo
    const reservations: Reservation[] = [
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
      {
        id: "3",
        propertyId: "3",
        userId,
        checkIn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        checkOut: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000).toISOString(),
        guests: 2,
        totalPrice: 1260,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        property: {
          id: "3",
          title: "Ático moderno en el centro",
          images: ["/placeholder.svg?height=600&width=800"],
          location: "Madrid, España",
          price: 180,
        },
      },
    ]

    return reservations
  } catch (error) {
    console.error("Error al obtener las reservas del usuario:", error)
    return []
  }
}

// Función para obtener una reserva por ID
export async function getReservation(id: string): Promise<Reservation | null> {
  try {
    // En un entorno real, esto se conectaría a la base de datos
    const reservations = await getUserReservations("any-user-id")
    return reservations.find((reservation) => reservation.id === id) || null
  } catch (error) {
    console.error(`Error al obtener la reserva con ID ${id}:`, error)
    return null
  }
}

