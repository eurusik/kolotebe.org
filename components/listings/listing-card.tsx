'use client'

import Link from "next/link"
import Image from "next/image"
import { ArrowLeftRight, Coins } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BookCoverPlaceholder } from "./book-cover-placeholder"
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

  const transferTypeLabels: Record<string, { label: string; color: string; tooltipKey: string }> = {
    FREE: { label: t('transferTypes.FREE'), color: "bg-zinc-700 hover:bg-zinc-600 text-zinc-200", tooltipKey: "" },
    FOR_KOLOCOINS: { label: "1 KLC", color: "bg-zinc-700 hover:bg-zinc-600 text-zinc-200", tooltipKey: "listings.kolocoinTooltip" },
    TRADE: { label: t('transferTypes.TRADE'), color: "bg-zinc-700 hover:bg-zinc-600 text-zinc-200", tooltipKey: "listings.tradeTooltip" },
    LOAN: { label: t('transferTypes.LOAN'), color: "bg-zinc-700 hover:bg-zinc-600 text-zinc-200", tooltipKey: "listings.loanTooltip" },
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
            
            {/* Price/Free Badge */}
            {listing.transferTypes.includes('FOR_KOLOCOINS') ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute bottom-3 left-3 bg-white/95 text-black px-3 py-1.5 rounded-lg font-bold text-lg shadow-lg flex items-center gap-1.5 cursor-help">
                      <Coins className="w-5 h-5" />
                      1 KLC
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('listings.kolocoinTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : listing.transferTypes.includes('FREE') ? (
              <div className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1.5 rounded-lg font-bold text-lg shadow-lg">
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
              .filter(type => type !== 'FOR_KOLOCOINS' && type !== 'FREE') // Hide price types
              .map((type) => {
                const typeInfo = transferTypeLabels[type as keyof typeof transferTypeLabels]
                return (
                  <TooltipProvider key={type}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge 
                          className={`text-xs px-2 py-0.5 border-0 cursor-help ${typeInfo.color}`}
                        >
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
              <div className="w-6 h-6 rounded-full bg-zinc-700/20 flex items-center justify-center text-xs font-semibold text-zinc-400">
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
