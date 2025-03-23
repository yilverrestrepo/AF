interface Review {
  id: string
  propertyId: string
  userId: string
  rating: number
  comment: string
  createdAt: string
  user: {
    id: string
    name: string
    image?: string
  }
}

// Función para obtener las reseñas de una propiedad
export async function getPropertyReviews(propertyId: string): Promise<Review[]> {
  try {
    // En un entorno real, esto se conectaría a la base de datos
    // Por ahora, devolvemos datos de ejemplo
    const reviews: Review[] = [
      {
        id: "1",
        propertyId,
        userId: "user1",
        rating: 5,
        comment:
          "Excelente ubicación y el apartamento estaba impecable. La comunicación con el anfitrión fue perfecta.",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        user: {
          id: "user1",
          name: "María García",
          image: "/placeholder.svg?height=100&width=100",
        },
      },
      {
        id: "2",
        propertyId,
        userId: "user2",
        rating: 4,
        comment:
          "Muy buena experiencia en general. El apartamento es cómodo y bien equipado. La única pega es que el WiFi era un poco lento.",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        user: {
          id: "user2",
          name: "Juan Pérez",
          image: "/placeholder.svg?height=100&width=100",
        },
      },
      {
        id: "3",
        propertyId,
        userId: "user3",
        rating: 5,
        comment: "¡Increíble! Las vistas son espectaculares y el anfitrión fue muy atento. Definitivamente volveré.",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        user: {
          id: "user3",
          name: "Laura Martínez",
          image: "/placeholder.svg?height=100&width=100",
        },
      },
    ]

    return reviews
  } catch (error) {
    console.error(`Error al obtener las reseñas para la propiedad ${propertyId}:`, error)
    return []
  }
}

