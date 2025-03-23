import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { UserProfile } from "@/types/user"

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
    // En un entorno real, esto se conectaría a la base de datos
    // Por ahora, devolvemos datos de ejemplo
    const userProfile: UserProfile = {
      id: userId,
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      image: "/placeholder.svg?height=200&width=200",
      role: "USER",
      memberSince: format(new Date(2021, 3, 10), "MMMM yyyy", { locale: es }),
      phone: "+34 612 345 678",
      bio: "Amante de los viajes y las nuevas experiencias. Siempre buscando lugares únicos para visitar.",
      address: "Calle Principal 123",
      city: "Madrid",
      country: "España",
      zipCode: "28001",
    }

    return userProfile
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

