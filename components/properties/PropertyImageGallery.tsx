"use client"

import { useState } from "react"
import OptimizedImage from "@/components/ui/optimized-image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface PropertyImageGalleryProps {
  images: string[]
  title: string
}

export default function PropertyImageGallery({ images, title }: PropertyImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  // Si no hay imágenes, mostrar un placeholder
  const displayImages = images.length > 0 ? images : ["/placeholder.svg?height=600&width=800"]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[400px]">
        <div className="relative rounded-lg overflow-hidden cursor-pointer" onClick={() => setIsOpen(true)}>
          <OptimizedImage src={displayImages[0]} alt={`${title} - Imagen principal`} fill className="object-cover" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {displayImages.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden cursor-pointer"
              onClick={() => {
                setCurrentIndex(index + 1)
                setIsOpen(true)
              }}
            >
              <OptimizedImage src={image} alt={`${title} - Imagen ${index + 2}`} fill className="object-cover" />

              {index === 3 && displayImages.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">+{displayImages.length - 5}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <div className="relative h-[80vh]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 text-white bg-black/50 hover:bg-black/70"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar</span>
            </Button>

            <div className="absolute inset-0 flex items-center justify-center">
              <OptimizedImage
                src={displayImages[currentIndex]}
                alt={`${title} - Imagen ${currentIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Anterior</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Siguiente</span>
            </Button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
              {currentIndex + 1} / {displayImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

