import { NextResponse } from "next/server"
import Stripe from "stripe"
import { PrismaClient } from "@prisma/client"
import { env } from "@/lib/env"

const prisma = new PrismaClient()

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
  } catch (error: any) {
    console.error("WEBHOOK_ERROR", error.message)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.PaymentIntent

  if (event.type === "payment_intent.succeeded") {
    const reservationId = session.metadata?.reservationId

    if (reservationId) {
      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          isPaid: true,
          status: "PAID",
        },
      })
    }
  }

  return new NextResponse(null, { status: 200 })
}

