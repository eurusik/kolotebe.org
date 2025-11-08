'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'

interface WishlistButtonProps {
  listingId: string
}

export function WishlistButton({ listingId }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsLoading(true)
    
    try {
      // TODO: Implement API call to add/remove from wishlist
      console.log('Toggle wishlist for listing:', listingId)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setIsInWishlist(!isInWishlist)
    } catch (error) {
      console.error('Failed to toggle wishlist:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="absolute top-3 left-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-md hover:bg-card hover:scale-110 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart 
        className={`w-4 h-4 transition-colors ${
          isInWishlist 
            ? 'fill-primary text-primary' 
            : 'text-muted-foreground group-hover:text-primary'
        }`}
      />
    </button>
  )
}
