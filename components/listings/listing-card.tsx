'use client'

import Link from "next/link"
import Image from "next/image"
import { ArrowLeftRight, Coins, Gift, BookOpen } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BookCoverPlaceholder } from "./book-cover-placeholder"
import { WishlistButton } from "./wishlist-button"
import { useTranslation } from "@/lib/i18n/locale-provider"
import type { Listing, BookCopy, Book, User } from "@prisma/client"

interface ListingCardProps {
  listing: Listing & {
    bookCopy: BookCopy & {
      book: Book
      owner: Pick<User, "id" | "name" | "image">
    }
  }
  showActions?: boolean
}

const conditionLabels = {
  NEW: "New",
  LIKE_NEW: "Like New",
  GOOD: "Good",
  FAIR: "Fair",
  POOR: "Poor",
}

export function ListingCard({ listing, showActions = true }: ListingCardProps) {
  const { t } = useTranslation()
  const { bookCopy } = listing
  const { book } = bookCopy

  const coverImage = listing.photos[0] || book.coverImage
  const hasImage = !!coverImage

  const handleStartExchange = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation to detail page
    e.stopPropagation()
    // TODO: Implement exchange flow
    console.log('Start exchange for listing:', listing.slug)
    alert('Exchange flow will be implemented here')
  }

  const transferTypeLabels: Record<string, { label: string; icon: React.ReactNode; color: string; tooltipKey: string }> = {
    FREE: { 
      label: t('transferTypes.FREE'), 
      icon: <Gift className="w-3.5 h-3.5" />,
      color: "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border", 
      tooltipKey: "" 
    },
    FOR_KOLOCOINS: { 
      label: "1 KLC", 
      icon: <Coins className="w-3.5 h-3.5" />,
      color: "bg-muted hover:bg-muted/80 text-muted-foreground border border-border", 
      tooltipKey: "listings.kolocoinTooltip" 
    },
    TRADE: { 
      label: t('transferTypes.TRADE'), 
      icon: <ArrowLeftRight className="w-3.5 h-3.5" />,
      color: "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border", 
      tooltipKey: "listings.tradeTooltip" 
    },
    LOAN: { 
      label: t('transferTypes.LOAN'), 
      icon: <BookOpen className="w-3.5 h-3.5" />,
      color: "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border", 
      tooltipKey: "listings.loanTooltip" 
    },
  }

  return (
    <Link href={`/listings/${listing.slug}`}>
      <Card className="h-full hover:border-primary transition-colors cursor-pointer">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="aspect-[3/4] relative mb-4 rounded-md overflow-hidden bg-muted">
            {hasImage ? (
              <Image
                src={coverImage}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <BookCoverPlaceholder title={book.title} condition={bookCopy.condition} />
            )}
            
            {/* Wishlist button - top left */}
            <WishlistButton listingId={listing.id} />
            
            {/* Main badge - show primary exchange option (not KLC) */}
            {listing.transferTypes.includes('TRADE') ? (
              <div className="absolute bottom-3 left-3 bg-primary/15 text-primary px-3 py-1.5 rounded-lg font-semibold text-sm shadow-md border border-primary/30 flex items-center gap-1.5">
                <ArrowLeftRight className="w-4 h-4" />
                {t('transferTypes.TRADE')}
              </div>
            ) : listing.transferTypes.includes('LOAN') ? (
              <div className="absolute bottom-3 left-3 bg-primary/15 text-primary px-3 py-1.5 rounded-lg font-semibold text-sm shadow-md border border-primary/30 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {t('transferTypes.LOAN')}
              </div>
            ) : listing.transferTypes.includes('FREE') ? (
              <div className="absolute bottom-3 left-3 bg-primary/5 text-primary/60 px-2.5 py-1 rounded-lg font-medium text-xs shadow-sm border border-primary/10">
                {t('transferTypes.FREE')}
              </div>
            ) : null}
          </div>

          <h3 className="font-semibold text-base mb-2 line-clamp-2 leading-snug">{book.title}</h3>
          
          <p className="text-sm text-muted-foreground mb-3">
            {book.author}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {listing.transferTypes
              .filter(type => type !== 'TRADE' && type !== 'LOAN' && type !== 'FREE') // Show only KLC in small badges
              .map((type) => {
                const typeInfo = transferTypeLabels[type as keyof typeof transferTypeLabels]
                return (
                  <TooltipProvider key={type}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge 
                          className={`text-xs px-2 py-0.5 cursor-help transition-colors flex items-center gap-1 ${typeInfo.color}`}
                        >
                          {typeInfo.icon}
                          {typeInfo.label}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t(typeInfo.tooltipKey)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-3 border-t border-border mb-3">
            {bookCopy.owner.image ? (
              <Image
                src={bookCopy.owner.image}
                alt={bookCopy.owner.name || "User"}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                {bookCopy.owner.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <span className="truncate">{bookCopy.owner.name}</span>
          </div>

          {/* CTA Button - always at bottom */}
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 mt-auto"
            size="default"
            onClick={handleStartExchange}
          >
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            {t('listings.startExchange')}
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
