"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users, Bed, Bath, Heart, Home } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Listing {
  id: number
  title: string
  slug: string
  location: string
  price: number
  rating: number
  reviews: number
  image: string
  images: string[]
  features: string[]
  bedrooms: number
  bathrooms: number
  guests: number
  isFeatured?: boolean
  isNew?: boolean
  isSuperhost?: boolean
}

interface ListingCardProps {
  listing: Listing
  variant?: "default" | "compact"
}

export default function ListingCard({ listing, variant = "default" }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/listings/${listing.slug}`}>
      <Card className="overflow-hidden h-full card-hover border-0 shadow-md group">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {listing.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div
                    className={variant === "compact" ? "aspect-[4/3]" : "aspect-square"}
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${listing.title} - imagen ${index + 1}`}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Carousel>

          {listing.isNew && <Badge className="listing-badge bg-green-500 text-white">Nuevo</Badge>}

          {listing.isFeatured && !listing.isNew && (
            <Badge className="listing-badge bg-primary text-white">Destacado</Badge>
          )}

          {listing.isSuperhost && (
            <Badge className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
              <Home className="h-3 w-3 mr-1" />
              Superanfitrión
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-4 right-4 z-20 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white",
              listing.isSuperhost && "right-36",
            )}
            onClick={toggleFavorite}
          >
            <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
          </Button>

          <div className="listing-price">${listing.price} USD / noche</div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{listing.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            <span>{listing.location}</span>
          </div>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{listing.bedrooms} hab.</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{listing.bathrooms} baños</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{listing.guests} huéspedes</span>
            </div>
          </div>

          {variant === "default" && (
            <div className="flex flex-wrap gap-1 mt-3">
              {listing.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-accent/50">
                  {feature}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}

