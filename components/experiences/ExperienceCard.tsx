"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Experience {
  id: number
  title: string
  slug: string
  location: string
  price: number
  rating: number
  reviews: number
  image: string
  duration: string
  category: string
  isPopular?: boolean
}

interface ExperienceCardProps {
  experience: Experience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/experiences/${experience.slug}`}>
      <Card className="overflow-hidden h-full card-hover border-0 shadow-md group">
        <div className="relative">
          <div className="aspect-[4/3]" style={{ position: "relative" }}>
            <Image
              src={experience.image || "/placeholder.svg"}
              alt={experience.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>

          {experience.isPopular && <Badge className="listing-badge bg-primary text-white">Popular</Badge>}

          <Badge className="absolute top-4 right-4 z-20 bg-white text-primary">{experience.category}</Badge>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-16 z-20 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={toggleFavorite}
          >
            <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
          </Button>

          <div className="listing-price">${experience.price} USD / persona</div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-1">{experience.title}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{experience.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            <span>{experience.location}</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
            <Clock className="h-4 w-4" />
            <span>Duración: {experience.duration}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}

