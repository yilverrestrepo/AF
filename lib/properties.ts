import type { Property, PropertyFilter } from "@/types/property"

// Función para obtener todas las propiedades con filtros
export async function getProperties(filters?: PropertyFilter): Promise<Property[]> {
  try {
    // En un entorno real, esto se conectaría a la base de datos
    // Por ahora, devolvemos datos de ejemplo
    const properties: Property[] = [
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
    // En un entorno real, esto se conectaría a la base de datos
    const properties = await getProperties()
    return properties.find((property) => property.id === id) || null
  } catch (error) {
    console.error(`Error al obtener la propiedad con ID ${id}:`, error)
    return null
  }
}

// Función para obtener las propiedades de un usuario
export async function getUserProperties(userId: string): Promise<Property[]> {
  try {
    // En un entorno real, esto se conectaría a la base de datos
    // Por ahora, devolvemos datos de ejemplo
    const properties: Property[] = [
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
        hostId: userId,
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
        hostId: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        featured: false,
        rating: 4.9,
        reviewCount: 18,
      },
    ]

    return properties
  } catch (error) {
    console.error("Error al obtener las propiedades del usuario:", error)
    return []
  }
}

