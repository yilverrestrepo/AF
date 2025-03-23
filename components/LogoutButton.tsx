"use client"

import { signOut } from "next-auth/react"
import { useState } from "react"

export default function LogoutButton({ locale }: { locale: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await signOut({ callbackUrl: `/${locale}` })
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button onClick={handleLogout} className="w-full text-left" disabled={isLoading}>
      {isLoading ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  )
}

