"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ReservationStatus = "pending" | "confirmed" | "rejected" | "cancelled" | "completed"

interface Reservation {
  id: string
  listingId: string
  listingTitle: string
  hostId: string
  guestId: string
  checkIn: Date
  checkOut: Date
  guests: number
  totalPrice: number
  status: ReservationStatus
  createdAt: Date
  updatedAt: Date
}

interface ReservationContextType {
  createReservationRequest: (
    reservationData: Omit<Reservation, "id" | "status" | "createdAt" | "updatedAt">,
  ) => Promise<Reservation>
  confirmReservation: (reservationId: string) => Promise<Reservation>
  rejectReservation: (reservationId: string, reason: string) => Promise<Reservation>
  cancelReservation: (reservationId: string, reason: string) => Promise<Reservation>
  getReservationById: (reservationId: string) => Promise<Reservation | null>
  getReservationsForGuest: (guestId: string) => Promise<Reservation[]>
  getReservationsForHost: (hostId: string) => Promise<Reservation[]>
  getReservationsForListing: (listingId: string) => Promise<Reservation[]>
  isLoading: boolean
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined)

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)

  // Mock reservations data
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      listingId: "1",
      listingTitle: "Villa con vista al mar",
      hostId: "2",
      guestId: "1",
      checkIn: new Date("2023-07-15"),
      checkOut: new Date("2023-07-20"),
      guests: 4,
      totalPrice: 1250,
      status: "confirmed",
      createdAt: new Date("2023-06-01"),
      updatedAt: new Date("2023-06-02"),
    },
    {
      id: "2",
      listingId: "1",
      listingTitle: "Villa con vista al mar",
      hostId: "2",
      guestId: "3",
      checkIn: new Date("2023-08-05"),
      checkOut: new Date("2023-08-10"),
      guests: 2,
      totalPrice: 1250,
      status: "pending",
      createdAt: new Date("2023-07-01"),
      updatedAt: new Date("2023-07-01"),
    },
  ])

  const createReservationRequest = async (
    reservationData: Omit<Reservation, "id" | "status" | "createdAt" | "updatedAt">,
  ): Promise<Reservation> => {
    setIsLoading(true)
    try {
      // In a real app, this would be a fetch to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newReservation: Reservation = {
        ...reservationData,
        id: Math.random().toString(36).substring(2, 9),
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setReservations((prev) => [...prev, newReservation])
      return newReservation
    } finally {
      setIsLoading(false)
    }
  }

  const confirmReservation = async (reservationId: string): Promise<Reservation> => {
    setIsLoading(true)
    try {
      // In a real app, this would be a fetch to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedReservations = reservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status: "confirmed" as ReservationStatus, updatedAt: new Date() }
          : reservation,
      )

      setReservations(updatedReservations)
      return updatedReservations.find((r) => r.id === reservationId)!
    } finally {
      setIsLoading(false)
    }
  }

  const rejectReservation = async (reservationId: string, reason: string): Promise<Reservation> => {
    setIsLoading(true)
    try {
      // In a real app, this would be a fetch to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedReservations = reservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status: "rejected" as ReservationStatus, updatedAt: new Date() }
          : reservation,
      )

      setReservations(updatedReservations)
      return updatedReservations.find((r) => r.id === reservationId)!
    } finally {
      setIsLoading(false)
    }
  }

  const cancelReservation = async (reservationId: string, reason: string): Promise<Reservation> => {
    setIsLoading(true)
    try {
      // In a real app, this would be a fetch to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedReservations = reservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status: "cancelled" as ReservationStatus, updatedAt: new Date() }
          : reservation,
      )

      setReservations(updatedReservations)
      return updatedReservations.find((r) => r.id === reservationId)!
    } finally {
      setIsLoading(false)
    }
  }

  const getReservationById = async (reservationId: string): Promise<Reservation | null> => {
    setIsLoading(true)
    try {
      // In a real app, this would be a fetch to your API
      await new Promise((resolve) => setTimeout(resolve, 500))

      return reservations.find((r) => r.id === reservationId) || null
    } finally {
      setIsLoading(false)
    }
  }

  const getReservationsForGuest = async (guestId: string): Promise<Reservation[]> => {
    setIsLoading(true)
    try {
      // In a real app, this would be a fetch to your API
      await new Promise((resolve) => setTimeout(resolve, 500))

      return reservations.filter((r) => r.guestId === guestId)
    } finally {
      setIsLoading(false)
    }
  }

  const getReservationsForHost = async (hostId: string): Promise<Reservation[]> => {
    setIsLoading(true)
    try {
      // In a real app, this would be a fetch to your API
      await new Promise((resolve) => setTimeout(resolve, 500))

      return reservations.filter((r) => r.hostId === hostId)
    } finally {
      setIsLoading(false)
    }
  }

  const getReservationsForListing = async (listingId: string): Promise<Reservation[]> => {
    setIsLoading(true)
    try {
      // In a real app, this would be a fetch to your API
      await new Promise((resolve) => setTimeout(resolve, 500))

      return reservations.filter((r) => r.listingId === listingId)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ReservationContext.Provider
      value={{
        createReservationRequest,
        confirmReservation,
        rejectReservation,
        cancelReservation,
        getReservationById,
        getReservationsForGuest,
        getReservationsForHost,
        getReservationsForListing,
        isLoading,
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}

export function useReservation() {
  const context = useContext(ReservationContext)
  if (context === undefined) {
    throw new Error("useReservation must be used within a ReservationProvider")
  }
  return context
}

