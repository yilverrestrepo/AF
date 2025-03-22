"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Grid } from "lucide-react"

export default function PropertyGallery({ images }: { images: string[] }) {
  const [showAllImages, setShowAllImages] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px]">
          <div className="md:col-span-2 md:row-span-2 relative rounded-tl-lg rounded-bl-lg overflow-hidden">
            <Image src={images[0] || "/placeholder.svg"} alt="Imagen principal" fill className="object-cover" />
          </div>
          <div className="hidden md:block relative rounded-tr-lg overflow-hidden">
            <Image src={images[1] || "/placeholder.svg"} alt="Imagen secundaria" fill className="object-cover" />
          </div>
          <div className="hidden md:block relative overflow-hidden">
            <Image src={images[2] || "/placeholder.svg"} alt="Imagen secundaria" fill className="object-cover" />
          </div>
          <div className="hidden md:block relative overflow-hidden">
            <Image src={images[3] || "/placeholder.svg"} alt="Imagen secundaria" fill className="object-cover" />
          </div>
          <div className="hidden md:block relative rounded-br-lg overflow-hidden">
            <Image src={images[4] || "/placeholder.svg"} alt="Imagen secundaria" fill className="object-cover" />
          </div>
        </div>
        <Button variant="secondary" className="absolute bottom-4 right-4 gap-2" onClick={() => setShowAllImages(true)}>
          <Grid className="h-4 w-4" />
          Ver todas las fotos
        </Button>
      </div>

      <Dialog open={showAllImages} onOpenChange={setShowAllImages}>
        <DialogContent className="max-w-5xl h-[80vh] p-0">
          <div className="relative h-full flex flex-col">
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => setShowAllImages(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 relative">
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={`Imagen ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-4 bg-background">
              <p className="text-center">
                {currentImageIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

