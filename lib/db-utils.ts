// Este archivo proporciona funciones de utilidad para operaciones de base de datos
// que pueden funcionar con o sin Prisma

import type { Property, Reservation, User } from "@/types/property"

// Datos de ejemplo para usar cuando no hay base de datos disponible
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Apartamento con vistas al mar",
    description:
      "Hermoso apartamento con vistas panorámicas al mar Mediterráneo. Completamente renovado y equipado con todas las comodidades modernas.",
    price: 120,
    location: "Barcelona",
    address: "Calle Marina 45",
    city: "Barcelona",
    country: "España",
    zipCode: "08005",
    latitude: 41.3851,
    longitude: 2.1734,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ["WiFi", "Cocina", "Aire acondicionado", "Lavadora", "Terraza"],
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    hostId: "host1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: true,
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: "2",
    title: "Villa de lujo con piscina privada",
    description:
      "Espectacular villa con piscina privada y jardín. Ideal para familias o grupos que buscan tranquilidad y confort.",
    price: 350,
    location: "Marbella",
    address: "Urbanización Las Brisas 12",
    city: "Marbella",
    country: "España",
    zipCode: "29660",
    latitude: 36.5092,
    longitude: -4.8854,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["Piscina", "WiFi", "Cocina", "Aire acondicionado", "Jardín", "Barbacoa"],
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    hostId: "host2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: false,
    rating: 4.9,
    reviewCount: 18,
  },
  {
    id: "3",
    title: "Ático moderno en el centro",
    description:
      "Ático de diseño en pleno centro de la ciudad. Terraza con vistas espectaculares y todas las comodidades.",
    price: 180,
    location: "Madrid",
    address: "Calle Gran Vía 56",
    city: "Madrid",
    country: "España",
    zipCode: "28013",
    latitude: 40.4168,
    longitude: -3.7038,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ["WiFi", "Cocina", "Aire acondicionado", "Terraza", "Ascensor"],
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    hostId: "host3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: true,
    rating: 4.7,
    reviewCount: 32,
  },
]

// Función para obtener propiedades con filtros
export async function getPropertiesFromDB(filters?: any): Promise<Property[]> {
  // En un entorno real, esto se conectaría a la base de datos
  return mockProperties
}

// Función para obtener una propiedad por ID
export async function getPropertyFromDB(id: string): Promise<Property | null> {
  // En un entorno real, esto se conectaría a la base de datos
  return mockProperties.find((property) => property.id === id) || null
}

// Función para obtener las propiedades de un usuario
export async function getUserPropertiesFromDB(userId: string): Promise<Property[]> {
  // En un entorno real, esto se conectaría a la base de datos
  return mockProperties.filter((property) => property.hostId === userId)
}

// Función para obtener las reservas de un usuario
export async function getUserReservationsFromDB(userId: string): Promise<Reservation[]> {
  // En un entorno real, esto se conectaría a la base de datos
  return [
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
}

// Función para obtener una reserva por ID
export async function getReservationFromDB(id: string): Promise<Reservation | null> {
  // En un entorno real, esto se conectaría a la base de datos
  const reservations = await getUserReservationsFromDB("any-user-id")
  return reservations.find((reservation) => reservation.id === id) || null
}

// Función para obtener el perfil de un usuario
export async function getUserProfileFromDB(userId: string): Promise<User> {
  // En un entorno real, esto se conectaría a la base de datos
  return {
    id: userId,
    name: "Usuario de Prueba",
    email: "usuario@example.com",
    image: "/placeholder.svg?height=200&width=200",
    role: "USER",
    memberSince: new Date(2021, 3, 10).toISOString(),
    phone: "+34 612 345 678",
    bio: "Amante de los viajes y las nuevas experiencias. Siempre buscando lugares únicos para visitar.",
    address: "Calle Principal 123",
    city: "Madrid",
    country: "España",
    zipCode: "28001",
  }
}

