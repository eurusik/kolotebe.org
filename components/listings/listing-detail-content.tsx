'use client'

import Link from "next/link"
import { BookImageGallery } from "@/components/books/book-image-gallery"
import { BookConditionBadge } from "@/components/listings/book-condition-badge"
import { ListingTransferBadges } from "@/components/listings/listing-transfer-badges"
import { ListingRequestButton } from "@/components/listings/listing-request-button"
import { ListingBookDetails } from "@/components/listings/listing-book-details"
import { ListingOwnerCard } from "@/components/listings/listing-owner-card"
import { ListingRelatedBooks } from "@/components/listings/listing-related-books"
import { useTranslation } from "@/lib/i18n/locale-provider"
import type { Listing, BookCopy, Book, User } from "@prisma/client"

interface ListingDetailContentProps {
  listing: Listing & {
    bookCopy: BookCopy & {
      book: Book
      owner: Pick<User, 'id' | 'name' | 'image' | 'createdAt'>
    }
  }
  displayImages: string[]
  otherOwnerListings: any[]
  isAuthenticated: boolean
}

export function ListingDetailContent({
  listing,
  displayImages,
  otherOwnerListings,
  isAuthenticated
}: ListingDetailContentProps) {
  const { t } = useTranslation()
  const { bookCopy } = listing
  const { book, owner } = bookCopy

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            {t('listings.home')}
          </Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-primary transition-colors">
            {t('listings.allBooks')}
          </Link>
          <span>/</span>
          <span className="text-foreground">{book.title}</span>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 mb-12">
            {/* Left - Book Image Gallery (2 columns) */}
            <div className="lg:col-span-2">
              <BookImageGallery images={displayImages} bookTitle={book.title} />
            </div>

            {/* Right - Book Details (3 columns) */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {t('listings.by')} {book.author}
                </p>
                
                {/* Condition Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm text-muted-foreground">
                    {t('listings.condition')}:
                  </span>
                  <BookConditionBadge condition={bookCopy.condition} />
                </div>
              </div>

              {/* Transfer Options */}
              <ListingTransferBadges transferTypes={listing.transferTypes} />

              {/* CTA Button */}
              <ListingRequestButton 
                isAuthenticated={isAuthenticated}
                isOwner={false}
              />

              {/* Description */}
              {book.description && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">{t('books.description')}</h3>
                  <p className="text-muted-foreground">{book.description}</p>
                </div>
              )}

              {/* Book Details */}
              <ListingBookDetails 
                book={{
                  isbn: book.isbn,
                  publicationYear: book.publicationYear,
                  genre: book.genre,
                }}
                deliveryMethods={listing.deliveryMethods}
              />

              {/* Owner Info */}
              <ListingOwnerCard owner={owner} />
            </div>
          </div>
        </div>

        {/* Other books from this owner */}
        <ListingRelatedBooks 
          listings={otherOwnerListings}
          ownerName={owner.name}
        />
      </div>
    </main>
  )
}
