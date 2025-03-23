import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.error("REGISTRATION_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

