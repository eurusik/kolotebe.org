import { auth } from "@/lib/auth/config"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { ListingStatus, TransferStatus } from "@prisma/client"
import { ProfilePageContent } from "@/components/profile/profile-page-content"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  // Fetch user data with balance
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      balance: true,
      locations: {
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  // Fetch user's book copies
  const bookCopies = await prisma.bookCopy.findMany({
    where: {
      ownerId: session.user.id,
      deletedAt: null,
    },
    include: {
      book: true,
      listing: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Fetch user's active listings
  const activeListings = await prisma.listing.findMany({
    where: {
      userId: session.user.id,
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

  // Fetch recent transactions
  const transactions = await prisma.userBalanceTransaction.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      transfer: {
        include: {
          listing: {
            include: {
              bookCopy: {
                include: {
                  book: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  })

  // Fetch requested transfers (books user requested)
  const requestedTransfers = await prisma.bookTransfer.findMany({
    where: {
      requesterId: session.user.id,
      status: {
        in: [TransferStatus.REQUESTED, TransferStatus.AGREED, TransferStatus.IN_TRANSIT, TransferStatus.DELIVERED],
      },
    },
    include: {
      listing: {
        include: {
          bookCopy: {
            include: {
              book: true,
            },
          },
        },
      },
      owner: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Fetch owned transfers (requests for user's books)
  const ownedTransfers = await prisma.bookTransfer.findMany({
    where: {
      ownerId: session.user.id,
      status: {
        in: [TransferStatus.REQUESTED, TransferStatus.AGREED, TransferStatus.IN_TRANSIT, TransferStatus.DELIVERED],
      },
    },
    include: {
      listing: {
        include: {
          bookCopy: {
            include: {
              book: true,
            },
          },
        },
      },
      requester: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const balance = user?.balance?.balance || 0

  return (
    <ProfilePageContent
      user={user}
      bookCopies={bookCopies}
      activeListings={activeListings}
      transactions={transactions}
      requestedTransfers={requestedTransfers}
      ownedTransfers={ownedTransfers}
      balance={balance}
      session={session}
    />
  )
}
