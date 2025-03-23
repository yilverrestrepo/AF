import type { Reservation } from "@/types/reservation"
import { getUserReservationsFromDB, getReservationFromDB } from "./db-utils"

// Función para obtener las reservas de un usuario
export async function getUserReservations(userId: string): Promise<Reservation[]> {
  try {
    return await getUserReservationsFromDB(userId)
  } catch (error) {
    console.error("Error al obtener las reservas del usuario:", error)
    return []
  }
}

// Función para obtener una reserva por ID
export async function getReservation(id: string): Promise<Reservation | null> {
  try {
    return await getReservationFromDB(id)
  } catch (error) {
    console.error(`Error al obtener la reserva con ID ${id}:`, error)
    return null
  }
}

