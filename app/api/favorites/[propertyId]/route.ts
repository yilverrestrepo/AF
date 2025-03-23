import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { propertyId: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { propertyId } = params

    // Verificar si la propiedad existe
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    })

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    // Verificar si la propiedad está en favoritos
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId: session.user.id,
          propertyId,
        },
      },
    })

    return NextResponse.json({ isFavorite: !!favorite })
  } catch (error) {
    console.error("Error checking favorite status:", error)
    return NextResponse.json({ error: "Failed to check favorite status" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { propertyId: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { propertyId } = params

    // Verificar si la propiedad existe
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    })

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    // Verificar si ya está en favoritos
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId: session.user.id,
          propertyId,
        },
      },
    })

    if (existingFavorite) {
      return NextResponse.json({ message: "Already in favorites" })
    }

    // Añadir a favoritos
    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        propertyId,
      },
    })

    return NextResponse.json(favorite)
  } catch (error) {
    console.error("Error adding to favorites:", error)
    return NextResponse.json({ error: "Failed to add to favorites" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { propertyId: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { propertyId } = params

    // Eliminar de favoritos
    await prisma.favorite.delete({
      where: {
        userId_propertyId: {
          userId: session.user.id,
          propertyId,
        },
      },
    })

    return NextResponse.json({ message: "Removed from favorites" })
  } catch (error) {
    console.error("Error removing from favorites:", error)
    return NextResponse.json({ error: "Failed to remove from favorites" }, { status: 500 })
  }
}

