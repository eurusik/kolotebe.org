import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db/prisma"
import { ListingStatus } from "@prisma/client"
import { notFound } from "next/navigation"
import { ListingDetailContent } from "@/components/listings/listing-detail-content"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

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
      status: ListingStatus.ACTIVE,
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
    <ListingDetailContent
      listing={listing}
      displayImages={displayImages}
      otherOwnerListings={otherOwnerListings}
      isAuthenticated={!!session}
    />
  )
}
