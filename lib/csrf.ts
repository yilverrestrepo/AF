import { type NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { cookies } from "next/headers"
import { encrypt, decrypt } from "./encryption"

// Generar token CSRF
export function generateCsrfToken() {
  const token = nanoid(32)
  const encrypted = encrypt(token)
  const cookieStore = cookies()

  // Establecer cookie con el token
  cookieStore.set("csrf_token", encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hora
  })

  return token
}

// Verificar token CSRF
export function validateCsrfToken(request: NextRequest, formToken: string) {
  const cookieToken = request.cookies.get("csrf_token")?.value

  if (!cookieToken || !formToken) {
    return false
  }

  try {
    const decryptedToken = decrypt(cookieToken)
    return decryptedToken === formToken
  } catch (error) {
    return false
  }
}

// Middleware para protección CSRF
export function csrfProtection(handler: Function) {
  return async (request: NextRequest) => {
    if (request.method !== "GET") {
      const formData = await request.formData()
      const csrfToken = formData.get("csrf_token") as string

      if (!validateCsrfToken(request, csrfToken)) {
        return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 })
      }
    }

    return handler(request)
  }
}

