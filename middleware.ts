import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import nextIntlConfig from "./next-intl.config"

// Crear el middleware de next-intl
const intlMiddleware = createMiddleware({
  locales: nextIntlConfig.locales,
  defaultLocale: nextIntlConfig.defaultLocale,
  localeDetection: nextIntlConfig.localeDetection,
})

export async function middleware(request: NextRequest) {
  // Ignorar archivos estáticos y API routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/static") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Obtener el token de autenticación
  const token = await getToken({ req: request })
  const isAuthenticated = !!token
  const path = request.nextUrl.pathname

  // Aplicar el middleware de internacionalización
  const response = intlMiddleware(request)

  // Verificar si la ruta actual es específica para anfitriones
  const hostRoutes = ["/dashboard/host", "/properties/new", "/properties/edit"]

  // Extraer el locale y la ruta real
  const locale = path.split("/")[1]
  const pathWithoutLocale = path.replace(`/${locale}`, "")

  // Verificar si la ruta actual es específica para anfitriones
  const isHostRoute = hostRoutes.some((route) => pathWithoutLocale.startsWith(route))

  // Redirigir si el usuario no es anfitrión pero intenta acceder a rutas de anfitrión
  if (isHostRoute && isAuthenticated && token?.role !== "HOST") {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)"],
}

