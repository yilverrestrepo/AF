import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

interface RateLimitOptions {
  limit: number
  window: number // en segundos
  identifier?: (req: NextRequest) => string
}

export function rateLimit(options: RateLimitOptions) {
  const { limit, window, identifier } = options

  return async (request: NextRequest) => {
    // Obtener identificador (IP por defecto)
    const ip = identifier ? identifier(request) : request.ip || request.headers.get("x-forwarded-for") || "anonymous"

    const key = `rate-limit:${ip}`

    // Obtener el número actual de solicitudes
    const currentCount = (await redis.get<number>(key)) || 0

    // Verificar si se ha excedido el límite
    if (currentCount >= limit) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "Retry-After": window.toString(),
          },
        },
      )
    }

    // Incrementar el contador y establecer TTL si es nuevo
    if (currentCount === 0) {
      await redis.set(key, 1, { ex: window })
    } else {
      await redis.incr(key)
    }

    // Agregar encabezados de límite de tasa
    const response = NextResponse.next()
    response.headers.set("X-RateLimit-Limit", limit.toString())
    response.headers.set("X-RateLimit-Remaining", (limit - currentCount - 1).toString())

    return response
  }
}

