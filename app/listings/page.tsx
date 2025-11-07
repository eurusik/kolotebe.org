import { prisma } from "@/lib/db/prisma"
import { ListingCard } from "@/components/listings/listing-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Force dynamic rendering to avoid DB connection during build
export const dynamic = 'force-dynamic'

export default async function ListingsPage() {
  const listings = await prisma.listing.findMany({
    where: {
      status: "ACTIVE",
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
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Browse Books</h1>
            <p className="text-muted-foreground">
              Discover books shared by the community
            </p>
          </div>
          <Link href="/books/add">
            <Button>Add Your Book</Button>
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              No listings available yet. Be the first to share a book!
            </p>
            <Link href="/books/add">
              <Button>Add Book</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
    </div>
  )
}
