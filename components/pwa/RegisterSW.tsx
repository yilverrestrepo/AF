"use client"

import { useEffect } from "react"

export default function RegisterSW() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && window.workbox !== undefined) {
      // Registrar el service worker
      navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
          console.log("Service Worker registered with scope:", registration.scope)
        },
        (err) => {
          console.error("Service Worker registration failed:", err)
        },
      )
    }
  }, [])

  return null
}

