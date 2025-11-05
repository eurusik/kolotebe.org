import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookImageGallery } from "@/components/book-image-gallery"
import { BookConditionBadge } from "@/components/listing/book-condition-badge"
import { ListingTransferBadges } from "@/components/listing/listing-transfer-badges"
import { ListingRequestButton } from "@/components/listing/listing-request-button"
import { ListingBookDetails } from "@/components/listing/listing-book-details"
import { ListingOwnerCard } from "@/components/listing/listing-owner-card"
import { ListingRelatedBooks } from "@/components/listing/listing-related-books"

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const session = await auth()

  const listing = await prisma.listing.findUnique({
    where: {
      slug: slug,
      deletedAt: null,
    },
    include: {
      bookCopy: {
        include: {
          book: true,
          owner: {
            select: {
              id: true,
              name: true,
              image: true,
              createdAt: true,
            },
          },
        },
      },
    },
  })

  if (!listing) {
    notFound()
  }

  const { bookCopy } = listing
  const { book, owner } = bookCopy

  // Prepare images array (listing photos + book cover + placeholder)
  const images = [
    ...(listing.photos || []),
    ...(book.coverImage ? [book.coverImage] : []),
  ].filter(Boolean)

  // If no images, use placeholder
  const displayImages = images.length > 0 ? images : ['/placeholder-book.svg']

  // Fetch other listings from the same owner
  const otherOwnerListings = await prisma.listing.findMany({
    where: {
      bookCopy: {
        ownerId: owner.id,
      },
      slug: {
        not: listing.slug,
      },
      status: 'ACTIVE',
      deletedAt: null,
    },
    include: {
      bookCopy: {
        include: {
          book: true,
        },
      },
    },
    take: 4,
  })

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-border bg-sidebar sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Kolotebe
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/listings">
              <Button variant="ghost">All Books</Button>
            </Link>
            {session && (
              <Link href="/profile">
                <Button variant="outline">Profile</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-primary transition-colors">All Books</Link>
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
              <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
              
              {/* Condition Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm text-muted-foreground">Condition:</span>
                <BookConditionBadge condition={bookCopy.condition} />
              </div>
            </div>

            {/* Transfer Options */}
            <ListingTransferBadges transferTypes={listing.transferTypes} />

            {/* CTA Button */}
            <ListingRequestButton 
              isAuthenticated={!!session}
              isOwner={session?.user?.id === owner.id}
            />

            {/* Description */}
            {book.description && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
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
