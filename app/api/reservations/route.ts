"use server"

import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      return new NextResponse("No autorizado", { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const listingId = searchParams.get("listingId")
    const userId = searchParams.get("userId")
    const authorId = searchParams.get("authorId")

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return new NextResponse("No autorizado", { status: 401 })
    }

    const query: any = {
      include: {
        listing: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    }

    // Si es admin, puede ver todas las reservas
    if (user.userType !== "ADMIN") {
      // Si es host, solo ve reservas de sus propiedades
      if (user.userType === "HOST") {
        query.where = {
          listing: {
            userId: user.id,
          },
        }
      } else {
        // Si es guest, solo ve sus propias reservas
        query.where = {
          userId: user.id,
        }
      }
    }

    // Filtros adicionales
    if (listingId) {
      query.where = {
        ...query.where,
        listingId,
      }
    }

    if (userId) {
      query.where = {
        ...query.where,
        userId,
      }
    }

    if (authorId) {
      query.where = {
        ...query.where,
        listing: {
          userId: authorId,
        },
      }
    }

    const reservations = await prisma.reservation.findMany(query)

    return NextResponse.json(reservations)
  } catch (error) {
    console.error(error)
    return new NextResponse("Error interno", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { listingId, guestId, checkIn, checkOut, guests, totalPrice } = body

    const reservation = await prisma.reservation.create({
      data: {
        listingId,
        guestId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests,
        totalPrice,
      },
    })

    return NextResponse.json(reservation)
  } catch (error: any) {
    console.error("RESERVATIONS_POST", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

