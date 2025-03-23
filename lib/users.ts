import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { UserProfile } from "@/types/user"
import { getUserProfileFromDB } from "./db-utils"

interface HostInfo {
  id: string
  name: string
  image?: string
  memberSince: string
  bio: string
  rating: number
  reviewCount: number
}

// Función para obtener información de un anfitrión
export async function getHostInfo(hostId: string): Promise<HostInfo | null> {
  try {
    // En un entorno real, esto se conectaría a la base de datos
    // Por ahora, devolvemos datos de ejemplo
    const hostInfo: HostInfo = {
      id: hostId,
      name: "Carlos Rodríguez",
      image: "/placeholder.svg?height=200&width=200",
      memberSince: format(new Date(2020, 5, 15), "MMMM yyyy", { locale: es }),
      bio: "Apasionado de los viajes y la hospitalidad. Me encanta recibir huéspedes de todo el mundo y compartir los mejores lugares de mi ciudad.",
      rating: 4.9,
      reviewCount: 87,
    }

    return hostInfo
  } catch (error) {
    console.error(`Error al obtener información del anfitrión ${hostId}:`, error)
    return null
  }
}

// Función para obtener el perfil de un usuario
export async function getUserProfile(userId: string): Promise<UserProfile> {
  try {
    const userProfile = await getUserProfileFromDB(userId)
    return {
      ...userProfile,
      memberSince: format(new Date(userProfile.memberSince), "MMMM yyyy", { locale: es }),
    }
  } catch (error) {
    console.error(`Error al obtener el perfil del usuario ${userId}:`, error)
    // Devolver un perfil vacío en caso de error
    return {
      id: userId,
      name: "",
      email: "",
      role: "USER",
      memberSince: format(new Date(), "MMMM yyyy", { locale: es }),
    }
  }
}

