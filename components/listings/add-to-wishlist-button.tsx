"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { Heart } from "lucide-react"

interface AddToWishlistButtonProps {
  isAuthenticated: boolean
  isOwner: boolean
}

export function AddToWishlistButton({ isAuthenticated, isOwner }: AddToWishlistButtonProps) {
  const { t } = useTranslation()
  
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
          {t('listings.addToWishlist')}
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
      {t('listings.addToWishlist')}
    </Button>
  )
}
