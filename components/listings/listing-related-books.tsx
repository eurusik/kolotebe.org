'use client'

import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { Book } from "@prisma/client"

interface ListingRelatedBooksProps {
  listings: Array<{
    id: string
    slug: string
    bookCopy: {
      book: Book
    }
  }>
  ownerName: string | null
}

export function ListingRelatedBooks({ listings, ownerName }: ListingRelatedBooksProps) {
  const { t } = useTranslation()
  
  if (listings.length === 0) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{t('listings.moreFrom')} {ownerName}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <Link
            key={listing.id}
            href={`/listings/${listing.slug}`}
            className="group"
          >
            <div className="aspect-[3/4] bg-sidebar border border-border rounded-lg overflow-hidden mb-2 group-hover:border-primary/50 transition-colors">
              {listing.bookCopy.book.coverImage ? (
                <Image
                  src={listing.bookCopy.book.coverImage}
                  alt={listing.bookCopy.book.title}
                  width={200}
                  height={300}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="text-4xl">📖</div>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {listing.bookCopy.book.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {listing.bookCopy.book.author}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
