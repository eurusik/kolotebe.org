import { StartExchangeButton } from "./start-exchange-button"
import { AddToWishlistButton } from "./add-to-wishlist-button"

interface ListingRequestButtonProps {
  isAuthenticated: boolean
  isOwner: boolean
}

export function ListingRequestButton({ isAuthenticated, isOwner }: ListingRequestButtonProps) {
  return (
    <div className="space-y-3 mb-6">
      <StartExchangeButton isAuthenticated={isAuthenticated} isOwner={isOwner} />
      <AddToWishlistButton isAuthenticated={isAuthenticated} isOwner={isOwner} />
    </div>
  )
}
