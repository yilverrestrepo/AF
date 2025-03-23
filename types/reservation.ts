export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed"

export interface Reservation {
  id: string
  propertyId: string
  userId: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: ReservationStatus
  createdAt: string
  updatedAt: string
  property?: Property
  user?: User
}

export interface Property {
  id: string
  title: string
  images: string[]
  location: string
  price: number
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
}

