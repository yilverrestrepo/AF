import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { reservationId } = body

    // Obtener la reserva
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
      include: {
        property: true,
        guest: true,
      },
    })

    if (!reservation) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }

    if (reservation.guestId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Crear sesión de checkout de Stripe
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: reservation.property.title,
              description: `Reserva del ${new Date(reservation.startDate).toLocaleDateString()} al ${new Date(reservation.endDate).toLocaleDateString()}`,
              images: [reservation.property.images[0]],
            },
            unit_amount: Math.round(reservation.totalPrice * 100), // Stripe usa céntimos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/reservations/${reservation.id}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/reservations/${reservation.id}/cancel`,
      metadata: {
        reservationId: reservation.id,
        propertyId: reservation.propertyId,
        guestId: reservation.guestId,
      },
    })

    return NextResponse.json({ url: stripeSession.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}

