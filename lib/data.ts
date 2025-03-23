import { prisma } from "@/lib/prisma"

export async function getProperty(id: string) {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
          },
        },
      },
    })

    if (!property) {
      return null
    }

    // Calcular la valoración media
    const averageRating =
      property.reviews.length > 0
        ? property.reviews.reduce((sum, review) => sum + review.rating, 0) / property.reviews.length
        : 0

    return {
      ...property,
      rating: averageRating,
      reviewsCount: property.reviews.length,
    }
  } catch (error) {
    console.error("Error fetching property:", error)
    return null
  }
}

export async function getProperties(params: {
  location?: string
  startDate?: string
  endDate?: string
  guests?: number
  bedrooms?: number
  bathrooms?: number
  minPrice?: number
  maxPrice?: number
  amenities?: string[]
  page?: number
  limit?: number
}) {
  try {
    const {
      location,
      startDate,
      endDate,
      guests,
      bedrooms,
      bathrooms,
      minPrice,
      maxPrice,
      amenities,
      page = 1,
      limit = 10,
    } = params

    // Construir la consulta
    const where: any = {}

    // Filtrar por ubicación
    if (location) {
      where.location = {
        contains: location,
        mode: "insensitive",
      }
    }

    // Filtrar por número de habitaciones
    if (bedrooms) {
      where.bedrooms = {
        gte: Number(bedrooms),
      }
    }

    // Filtrar por número de baños
    if (bathrooms) {
      where.bathrooms = {
        gte: Number(bathrooms),
      }
    }

    // Filtrar por precio
    if (minPrice || maxPrice) {
      where.price = {}

      if (minPrice) {
        where.price.gte = Number(minPrice)
      }

      if (maxPrice) {
        where.price.lte = Number(maxPrice)
      }
    }

    // Filtrar por comodidades
    if (amenities && amenities.length > 0) {
      where.amenities = {
        hasSome: amenities,
      }
    }

    // Calcular paginación
    const skip = (page - 1) * limit

    // Obtener propiedades
    const properties = await prisma.property.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    })

    // Obtener el total de propiedades para la paginación
    const total = await prisma.property.count({ where })

    // Calcular la valoración media para cada propiedad
    const propertiesWithRating = properties.map((property) => {
      const averageRating =
        property.reviews.length > 0
          ? property.reviews.reduce((sum, review) => sum + review.rating, 0) / property.reviews.length
          : 0

      return {
        ...property,
        rating: averageRating,
        reviewsCount: property.reviews.length,
      }
    })

    return {
      properties: propertiesWithRating,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error("Error fetching properties:", error)
    return {
      properties: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    }
  }
}

