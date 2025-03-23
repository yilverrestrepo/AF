import type { Property, PropertyFilter } from "@/types/property"
import { getPropertiesFromDB, getPropertyFromDB, getUserPropertiesFromDB } from "./db-utils"

// Función para obtener todas las propiedades con filtros
export async function getProperties(filters?: PropertyFilter): Promise<Property[]> {
  try {
    // Obtener propiedades de la base de datos
    const properties = await getPropertiesFromDB(filters)

    // Aplicar filtros si existen
    let filteredProperties = [...properties]

    if (filters) {
      if (filters.location) {
        filteredProperties = filteredProperties.filter((property) =>
          property.city.toLowerCase().includes(filters.location!.toLowerCase()),
        )
      }

      if (filters.minPrice) {
        filteredProperties = filteredProperties.filter((property) => property.price >= filters.minPrice!)
      }

      if (filters.maxPrice) {
        filteredProperties = filteredProperties.filter((property) => property.price <= filters.maxPrice!)
      }

      if (filters.bedrooms) {
        filteredProperties = filteredProperties.filter((property) => property.bedrooms >= filters.bedrooms!)
      }

      if (filters.bathrooms) {
        filteredProperties = filteredProperties.filter((property) => property.bathrooms >= filters.bathrooms!)
      }

      if (filters.guests) {
        filteredProperties = filteredProperties.filter((property) => property.maxGuests >= filters.guests!)
      }

      if (filters.amenities && filters.amenities.length > 0) {
        filteredProperties = filteredProperties.filter((property) =>
          filters.amenities!.every((amenity) => property.amenities.includes(amenity)),
        )
      }
    }

    return filteredProperties
  } catch (error) {
    console.error("Error al obtener propiedades:", error)
    return []
  }
}

// Función para obtener una propiedad por ID
export async function getProperty(id: string): Promise<Property | null> {
  try {
    return await getPropertyFromDB(id)
  } catch (error) {
    console.error(`Error al obtener la propiedad con ID ${id}:`, error)
    return null
  }
}

// Función para obtener las propiedades de un usuario
export async function getUserProperties(userId: string): Promise<Property[]> {
  try {
    return await getUserPropertiesFromDB(userId)
  } catch (error) {
    console.error("Error al obtener las propiedades del usuario:", error)
    return []
  }
}

