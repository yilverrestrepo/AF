import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { propertyId, reservationId, rating, comment } = body

    if (!propertyId || !rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verificar si el usuario ha reservado la propiedad (opcional si se proporciona reservationId)
    if (reservationId) {
      const reservation = await prisma.reservation.findUnique({
        where: {
          id: reservationId,
          guestId: session.user.id,
          propertyId,
          status: "COMPLETED",
        },
      })

      if (!reservation) {
        return NextResponse.json(
          { error: "No puedes dejar una reseña sin haber completado una estancia" },
          { status: 403 },
        )
      }
    }

    // Verificar si el usuario ya ha dejado una reseña para esta propiedad
    const existingReview = await prisma.review.findFirst({
      where: {
        propertyId,
        userId: session.user.id,
      },
    })

    if (existingReview) {
      return NextResponse.json({ error: "Ya has dejado una reseña para esta propiedad" }, { status: 400 })
    }

    // Crear la reseña
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        propertyId,
        userId: session.user.id,
        reservationId,
      },
    })

    // Actualizar la valoración media de la propiedad
    const reviews = await prisma.review.findMany({
      where: {
        propertyId,
      },
      select: {
        rating: true,
      },
    })

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

    await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        rating: averageRating,
        reviewsCount: reviews.length,
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get("propertyId")

    if (!propertyId) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 })
    }

    const reviews = await prisma.review.findMany({
      where: {
        propertyId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Calcular la valoración media
    const averageRating =
      reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

    return NextResponse.json({
      reviews,
      averageRating,
      totalReviews: reviews.length,
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

