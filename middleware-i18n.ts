import { type NextRequest, NextResponse } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// Idiomas soportados
const locales = ["es", "en", "fr", "de"]
const defaultLocale = "es"

// Obtener el idioma preferido del usuario
function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return match(languages, locales, defaultLocale)
}

// Middleware para i18n
export function i18nMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Verificar si la ruta ya incluye un locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirigir a la ruta con el locale
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  newUrl.search = request.nextUrl.search

  return NextResponse.redirect(newUrl)
}

