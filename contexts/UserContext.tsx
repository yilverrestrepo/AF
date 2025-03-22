"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type UserRole = "guest" | "host" | "admin" | null

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  isVerified: boolean
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
  isGuest: boolean
  isHost: boolean
  isAdmin: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  // Always provide a mock user for development
  const [user, setUser] = useState<User>({
    id: "dev-user",
    name: "Developer User",
    email: "dev@example.com",
    role: "host", // Default to host role for maximum feature access
    avatar: "/placeholder.svg?height=200&width=200",
    isVerified: true,
  })

  const [isLoading, setIsLoading] = useState(false)

  // Simplified methods that don't actually do authentication
  const login = async (email: string, password: string) => {
    // No-op for development
    return Promise.resolve()
  }

  const logout = () => {
    // No-op for development
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // No-op for development
    return Promise.resolve()
  }

  const updateUser = async (userData: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...userData }))
    return Promise.resolve()
  }

  // Role checks based on the mock user
  const isGuest = user.role === "guest"
  const isHost = user.role === "host"
  const isAdmin = user.role === "admin"

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        updateUser,
        isGuest,
        isHost,
        isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

