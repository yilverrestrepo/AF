import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Idiomas soportados
const locales = ["es", "en", "fr", "de"];
const defaultLocale = "es";

export function middleware(request: NextRequest) {
  // Ignorar archivos estáticos y API routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Obtener el locale de la URL
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Si ya tiene locale, continuar
  if (pathnameHasLocale) return NextResponse.next();

  // Redirigir a la ruta con locale por defecto
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)"],
};