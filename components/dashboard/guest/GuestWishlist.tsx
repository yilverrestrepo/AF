"use client"

import { Badge } from "@/components/ui/badge"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for wishlist items
const wishlistItems = [
  {
    id: 1,
    title: "Villa con vista al mar",
    location: "Cartagena, Colombia",
    price: 250,
    rating: 4.9,
    image: "/images/listings/listing-1.jpg",
  },
  {
    id: 2,
    title: "Cabaña en la montaña",
    location: "Santa Elena, Antioquia",
    price: 120,
    rating: 4.7,
    image: "/images/listings/listing-2.jpg",
  },
  {
    id: 3,
    title: "Apartamento de lujo",
    location: "Medellín, Colombia",
    price: 180,
    rating: 4.8,
    image: "/images/listings/listing-3.jpg",
  },
]

export default function GuestWishlist() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Mi lista de deseos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="object-cover h-48 w-full" />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-blue-500 text-white">Favorito</Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{item.rating}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold text-xl">${item.price}</span>
                  <Link href={`/listings/${item.id}`}>
                    <Button size="sm" className="rounded-full">
                      Ver detalles
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

