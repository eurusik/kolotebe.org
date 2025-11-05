"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface AddToWishlistButtonProps {
  isAuthenticated: boolean
  isOwner: boolean
}

export function AddToWishlistButton({ isAuthenticated, isOwner }: AddToWishlistButtonProps) {
  // Don't show for book owner
  if (isOwner) {
    return null
  }

  if (!isAuthenticated) {
    return (
      <Button 
        size="lg" 
        variant="outline" 
        className="w-full h-14 text-lg gap-3"
        asChild
      >
        <Link href="/auth/signin">
          <Heart className="h-6 w-6" />
          Add to Wishlist
        </Link>
      </Button>
    )
  }

  return (
    <Button 
      size="lg" 
      variant="outline" 
      className="w-full h-14 text-lg gap-3"
    >
      <Heart className="h-6 w-6" />
      Add to Wishlist
    </Button>
  )
}
