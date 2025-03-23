/// <reference lib="webworker" />

// Tipado para el Service Worker
declare const self: ServiceWorkerGlobalScope

// Versión de la caché
const CACHE_NAME = "fincas-v1"

// Recursos para cachear
const STATIC_ASSETS = ["/", "/offline", "/manifest.json", "/icons/icon-192x192.png", "/icons/icon-512x512.png"]

// Instalar el Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    }),
  )
  // Activar inmediatamente
  self.skipWaiting()
})

// Activar el Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => caches.delete(cacheName)),
      )
    }),
  )
  // Reclamar clientes
  self.clients.claim()
})

// Estrategia de caché: Network first, fallback to cache
self.addEventListener("fetch", (event) => {
  // Solo manejar solicitudes GET
  if (event.request.method !== "GET") return

  // Ignorar solicitudes a la API
  if (event.request.url.includes("/api/")) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar la respuesta para almacenarla en caché
        const responseClone = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone)
        })
        return response
      })
      .catch(() => {
        // Si la red falla, intentar desde la caché
        return caches.match(event.request).then((cachedResponse) => {
          // Si está en caché, devolver la respuesta en caché
          if (cachedResponse) {
            return cachedResponse
          }

          // Si es una solicitud de página, mostrar la página offline
          if (event.request.headers.get("Accept")?.includes("text/html")) {
            return caches.match("/offline")
          }

          // Si no está en caché y no es una página, devolver un error
          return new Response("Network error", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          })
        })
      }),
  )
})

// Manejar notificaciones push
self.addEventListener("push", (event) => {
  if (!event.data) return

  const data = event.data.json()

  const options = {
    body: data.message,
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    data: {
      url: data.link || "/",
    },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Manejar clic en notificaciones
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      const url = event.notification.data.url

      // Si ya hay una ventana abierta, enfocarla y navegar
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus()
        }
      }

      // Si no hay ventanas abiertas, abrir una nueva
      if (clients.openWindow) {
        return clients.openWindow(url)
      }
    }),
  )
})

export {}

