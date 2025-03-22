"use server"

import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function PATCH(request: Request, { params }: { params: { reservationId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      return new NextResponse("No autorizado", { status: 401 })
    }

    const { reservationId } = params
    const body = await request.json()
    const { status } = body

    if (!status) {
      return new NextResponse("Falta el estado", { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return new NextResponse("No autorizado", { status: 401 })
    }

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
      include: {
        listing: true,
      },
    })

    if (!reservation) {
      return new NextResponse("Reserva no encontrada", { status: 404 })
    }

    // Verificar permisos según el tipo de usuario
    if (user.userType === "HOST") {
      // El host solo puede aprobar/rechazar reservas de sus propiedades
      if (reservation.listing.userId !== user.id) {
        return new NextResponse("No autorizado", { status: 403 })
      }

      // El host solo puede cambiar el estado a APPROVED o REJECTED
      if (status !== "APPROVED" && status !== "REJECTED") {
        return new NextResponse("Estado no válido", { status: 400 })
      }
    } else if (user.userType === "GUEST") {
      // El huésped solo puede cancelar sus propias reservas
      if (reservation.userId !== user.id) {
        return new NextResponse("No autorizado", { status: 403 })
      }

      // El huésped solo puede cambiar el estado a CANCELLED
      if (status !== "CANCELLED") {
        return new NextResponse("Estado no válido", { status: 400 })
      }
    } else if (user.userType !== "ADMIN") {
      return new NextResponse("No autorizado", { status: 403 })
    }

    // Actualizar el estado de la reserva
    const updatedReservation = await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status,
      },
    })

    return NextResponse.json(updatedReservation)
  } catch (error) {
    console.error(error)
    return new NextResponse("Error interno", { status: 500 })
  }
}

interface IParams {
  reservationId?: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {
    const { reservationId } = params

    if (!reservationId) {
      return new NextResponse("Reservation id required", { status: 400 })
    }

    const reservation = await prisma.reservation.delete({
      where: {
        id: reservationId,
      },
    })

    return NextResponse.json(reservation)
  } catch (error: any) {
    console.error("RESERVATION_DELETE", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

