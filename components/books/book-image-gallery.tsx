"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils/cn"

interface BookImageGalleryProps {
  images: string[]
  bookTitle: string
}

export function BookImageGallery({ images, bookTitle }: BookImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="sticky top-24">
      {/* Main Image */}
      <div className="relative aspect-[3/4] bg-sidebar border border-border rounded-2xl overflow-hidden mb-3">
        {images.length > 0 ? (
          <Image
            src={images[selectedImage]}
            alt={`${bookTitle} - Image ${selectedImage + 1}`}
            fill
            className="object-cover"
            priority={selectedImage === 0}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="text-center">
              <div className="text-8xl mb-4">📖</div>
              <div className="text-primary font-bold text-2xl">No Cover</div>
              <div className="text-muted-foreground">Image</div>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery - only show if more than 1 image */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all",
                selectedImage === index
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border hover:border-primary/50"
              )}
            >
              <Image
                src={image}
                alt={`${bookTitle} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
