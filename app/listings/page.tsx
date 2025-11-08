import { prisma } from "@/lib/db/prisma"
import { ListingStatus } from "@prisma/client"
import { ListingsPageContent } from "@/components/listings/listings-page-content"

// Force dynamic rendering to avoid DB connection during build
export const dynamic = 'force-dynamic'

export default async function ListingsPage() {
  const listings = await prisma.listing.findMany({
    where: {
      status: ListingStatus.ACTIVE,
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

  return <ListingsPageContent listings={listings} />
}
