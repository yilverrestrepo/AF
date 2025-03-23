import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validar los datos
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 })
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return NextResponse.json({ error: "El correo electrónico ya está registrado" }, { status: 400 })
    }

    // Hashear la contraseña
    const hashedPassword = await hash(password, 10)

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        salt: "",
      },
    })

    // Eliminar la contraseña hasheada de la respuesta
    const { hashedPassword: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 })
  }
}

