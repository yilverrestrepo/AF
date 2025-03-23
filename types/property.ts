export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  address: string
  city: string
  country: string
  zipCode: string
  latitude: number
  longitude: number
  bedrooms: number
  bathrooms: number
  maxGuests: number
  amenities: string[]
  images: string[]
  hostId: string
  createdAt: string
  updatedAt: string
  featured?: boolean
  rating?: number
  reviewCount?: number
}

export interface PropertyFilter {
  location?: string
  checkIn?: string
  checkOut?: string
  guests?: number
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  amenities?: string[]
}

