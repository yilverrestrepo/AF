"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  containerClassName?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  containerClassName,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("overflow-hidden relative", containerClassName)}>
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        className={cn("transition-opacity duration-500", isLoading ? "opacity-0" : "opacity-100", className)}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  )
}

