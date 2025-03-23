import { NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        // Obtener los metadatos de la sesión
        const { reservationId, propertyId, guestId } = session.metadata as {
          reservationId: string
          propertyId: string
          guestId: string
        }

        // Actualizar el estado de la reserva
        await prisma.reservation.update({
          where: {
            id: reservationId,
          },
          data: {
            isPaid: true,
            paymentIntentId: session.payment_intent as string,
          },
        })

        // Actualizar las estadísticas de la propiedad
        await prisma.property.update({
          where: {
            id: propertyId,
          },
          data: {
            reservationsCount: {
              increment: 1,
            },
          },
        })

        break
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Buscar la reserva asociada al paymentIntent
        const reservation = await prisma.reservation.findFirst({
          where: {
            paymentIntentId: paymentIntent.id,
          },
        })

        if (reservation) {
          // Actualizar el estado de la reserva
          await prisma.reservation.update({
            where: {
              id: reservation.id,
            },
            data: {
              isPaid: true,
              paymentStatus: "COMPLETED",
            },
          })
        }

        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Buscar la reserva asociada al paymentIntent
        const reservation = await prisma.reservation.findFirst({
          where: {
            paymentIntentId: paymentIntent.id,
          },
        })

        if (reservation) {
          // Actualizar el estado de la reserva
          await prisma.reservation.update({
            where: {
              id: reservation.id,
            },
            data: {
              paymentStatus: "FAILED",
            },
          })
        }

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
  }
}

