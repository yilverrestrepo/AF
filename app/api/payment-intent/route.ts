import { NextResponse } from "next/server"
import Stripe from "stripe"
import { env } from "@/lib/env"

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const { amount, reservationId } = await request.json()

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: "eur",
      metadata: {
        reservationId,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error: any) {
    console.error("PAYMENT_INTENT_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

