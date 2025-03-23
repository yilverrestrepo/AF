import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// Idiomas soportados
const locales = ["es", "en", "fr", "de"]
const defaultLocale = "es"

// Obtener el idioma preferido del usuario
function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Usar un valor predeterminado para languages si Negotiator no puede determinar uno
  let languages: string[] = []
  try {
    languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  } catch (error) {
    console.error("Error al determinar el idioma:", error)
    languages = [defaultLocale]
  }

  return match(languages, locales, defaultLocale)
}

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

  const token = await getToken({ req: request })
  const isAuthenticated = !!token
  const path = request.nextUrl.pathname

  // Verificar si la ruta ya incluye un locale
  const pathnameHasLocale = locales.some((locale) => path.startsWith(`/${locale}/`) || path === `/${locale}`)

  // Si la ruta no tiene locale, redirigir a la ruta con locale
  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${path === "/" ? "" : path}`, request.url)
    newUrl.search = request.nextUrl.search
    return NextResponse.redirect(newUrl)
  }

  // Extraer el locale y la ruta real
  const locale = pathnameHasLocale ? path.split("/")[1] : defaultLocale
  const pathWithoutLocale = pathnameHasLocale ? path.replace(`/${locale}`, "") : path

  // Verificar si la ruta actual requiere autenticación
  const protectedRoutes = [
    "/dashboard",
    "/properties/new",
    "/properties/edit",
    "/reservations",
    "/messages",
    "/settings",
    "/favorites",
  ]

  // Verificar si la ruta actual es específica para anfitriones
  const hostRoutes = ["/dashboard/host", "/properties/new", "/properties/edit"]

  // Verificar si la ruta actual requiere autenticación
  const isProtectedRoute = protectedRoutes.some((route) => pathWithoutLocale.startsWith(route))

  // Verificar si la ruta actual es específica para anfitriones
  const isHostRoute = hostRoutes.some((route) => pathWithoutLocale.startsWith(route))

  // Redirigir a login si la ruta está protegida y el usuario no está autenticado
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL(`/${locale}/login`, request.url)
    url.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(url)
  }

  // Redirigir si el usuario no es anfitrión pero intenta acceder a rutas de anfitrión
  if (isHostRoute && isAuthenticated && token?.role !== "HOST") {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)"],
}

