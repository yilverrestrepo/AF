"use server"

import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const listings = await prisma.listing.findMany()
    return NextResponse.json(listings)
  } catch (error: any) {
    console.error("LISTINGS_GET", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      return new NextResponse("No autorizado", { status: 401 })
    }

    const body = await request.json()
    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price, amenities } =
      body

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return new NextResponse("No autorizado", { status: 401 })
    }

    if (user.userType !== "HOST" && user.userType !== "ADMIN") {
      return new NextResponse("Solo los anfitriones pueden crear propiedades", { status: 403 })
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: Number.parseInt(price, 10),
        amenities,
        userId: user.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error(error)
    return new NextResponse("Error interno", { status: 500 })
  }
}

