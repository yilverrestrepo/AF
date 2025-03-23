import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { format, parseISO, eachDayOfInterval } from "date-fns"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Verificar si el usuario es anfitrión
  if (session.user.role !== "HOST") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const fromParam = searchParams.get("from")
    const toParam = searchParams.get("to")

    // Validar y parsear las fechas
    const from = fromParam ? parseISO(fromParam) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const to = toParam ? parseISO(toParam) : new Date()

    // Obtener las propiedades del anfitrión
    const properties = await prisma.property.findMany({
      where: {
        ownerId: session.user.id,
      },
      select: {
        id: true,
        title: true,
      },
    })

    const propertyIds = properties.map((property) => property.id)

    // Obtener las reservas en el rango de fechas
    const reservations = await prisma.reservation.findMany({
      where: {
        propertyId: {
          in: propertyIds,
        },
        createdAt: {
          gte: from,
          lte: to,
        },
        isPaid: true,
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    // Obtener las vistas en el rango de fechas
    const views = await prisma.propertyView.findMany({
      where: {
        propertyId: {
          in: propertyIds,
        },
        createdAt: {
          gte: from,
          lte: to,
        },
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    // Generar un array con todos los días en el rango
    const daysInRange = eachDayOfInterval({ start: from, end: to })

    // Inicializar los datos por día
    const reservationsByDate = daysInRange.map((day) => {
      const dateStr = format(day, "yyyy-MM-dd")
      return {
        date: dateStr,
        count: 0,
        revenue: 0,
      }
    })

    const viewsByDate = daysInRange.map((day) => {
      const dateStr = format(day, "yyyy-MM-dd")
      return {
        date: dateStr,
        count: 0,
      }
    })

    // Agrupar reservas por día
    reservations.forEach((reservation) => {
      const dateStr = format(reservation.createdAt, "yyyy-MM-dd")
      const dayIndex = reservationsByDate.findIndex((day) => day.date === dateStr)

      if (dayIndex !== -1) {
        reservationsByDate[dayIndex].count += 1
        reservationsByDate[dayIndex].revenue += reservation.totalPrice
      }
    })

    // Agrupar vistas por día
    views.forEach((view) => {
      const dateStr = format(view.createdAt, "yyyy-MM-dd")
      const dayIndex = viewsByDate.findIndex((day) => day.date === dateStr)

      if (dayIndex !== -1) {
        viewsByDate[dayIndex].count += 1
      }
    })

    // Agrupar reservas por propiedad
    const reservationsByProperty = properties.map((property) => {
      const propertyReservations = reservations.filter((reservation) => reservation.propertyId === property.id)

      return {
        propertyId: property.id,
        propertyName: property.title,
        count: propertyReservations.length,
        revenue: propertyReservations.reduce((total, reservation) => total + reservation.totalPrice, 0),
      }
    })

    // Agrupar vistas por propiedad
    const viewsByProperty = properties.map((property) => {
      const propertyViews = views.filter((view) => view.propertyId === property.id)

      return {
        propertyId: property.id,
        propertyName: property.title,
        count: propertyViews.length,
      }
    })

    // Calcular totales
    const totalReservations = reservations.length
    const totalRevenue = reservations.reduce((total, reservation) => total + reservation.totalPrice, 0)
    const totalViews = views.length

    return NextResponse.json({
      reservations: {
        count: totalReservations,
        revenue: totalRevenue,
        byDate: reservationsByDate,
        byProperty: reservationsByProperty,
      },
      views: {
        count: totalViews,
        byDate: viewsByDate,
        byProperty: viewsByProperty,
      },
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

