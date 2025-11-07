import { auth } from "@/lib/auth/config"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ListingCard } from "@/components/listing-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileInfoCard } from "@/components/profile/profile-info-card"
import { KolokoinBalanceCard } from "@/components/profile/kolokoin-balance-card"
import { ProfileStatsCard } from "@/components/profile/profile-stats-card"
import { PendingRequestCard } from "@/components/profile/pending-request-card"
import { MyRequestCard } from "@/components/profile/my-request-card"
import { BookCopyCard } from "@/components/profile/book-copy-card"
import { TransactionItem } from "@/components/profile/transaction-item"

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
        in: ["REQUESTED", "AGREED", "IN_TRANSIT", "DELIVERED"],
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
        in: ["REQUESTED", "AGREED", "IN_TRANSIT", "DELIVERED"],
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
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info & Balance */}
        <div className="lg:col-span-1 space-y-6">
          <ProfileInfoCard
            name={session.user.name || null}
            email={session.user.email || ""}
            image={session.user.image || null}
            phone={user?.phone || null}
            phoneVerified={user?.phoneVerified || false}
            createdAt={user?.createdAt || new Date()}
          />

          <KolokoinBalanceCard balance={balance} />

          <ProfileStatsCard
            booksCount={bookCopies.length}
            activeListingsCount={activeListings.length}
            pendingRequestsCount={ownedTransfers.length}
            myRequestsCount={requestedTransfers.length}
          />
        </div>

        {/* Right Column - Books, Listings, Transactions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pending Requests for My Books */}
          {ownedTransfers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests for My Books</CardTitle>
                <CardDescription>
                  Review and manage incoming requests from other members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ownedTransfers.map((transfer) => (
                  <PendingRequestCard
                    key={transfer.id}
                    requesterName={transfer.requester.name}
                    requesterImage={transfer.requester.image}
                    bookTitle={transfer.listing.bookCopy.book.title}
                    transferType={transfer.transferType}
                    deliveryMethod={transfer.deliveryMethod}
                    status={transfer.status}
                    createdAt={transfer.createdAt}
                  />
                ))}
              </CardContent>
            </Card>
          )}

          {/* My Requests */}
          {requestedTransfers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>My Book Requests</CardTitle>
                <CardDescription>
                  Track your requests for books from other members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {requestedTransfers.map((transfer) => (
                  <MyRequestCard
                    key={transfer.id}
                    ownerName={transfer.owner.name}
                    ownerImage={transfer.owner.image}
                    bookTitle={transfer.listing.bookCopy.book.title}
                    transferType={transfer.transferType}
                    deliveryMethod={transfer.deliveryMethod}
                    status={transfer.status}
                    createdAt={transfer.createdAt}
                  />
                ))}
              </CardContent>
            </Card>
          )}

          {/* Active Listings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Active Listings</CardTitle>
                  <CardDescription>
                    Books currently available for sharing
                  </CardDescription>
                </div>
                <Link href="/books/add">
                  <Button>Add New Book</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {activeListings.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    You don't have any active listings yet.
                  </p>
                  <Link href="/books/add">
                    <Button>Create Your First Listing</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {activeListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      showActions={true}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* My Books */}
          <Card>
            <CardHeader>
              <CardTitle>All My Books</CardTitle>
              <CardDescription>
                Your complete book collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookCopies.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    You haven't added any books yet.
                  </p>
                  <Link href="/books/add">
                    <Button>Add Your First Book</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookCopies.map((copy) => (
                    <BookCopyCard
                      key={copy.id}
                      bookCopyId={copy.id}
                      title={copy.book.title}
                      author={copy.book.author}
                      condition={copy.condition}
                      hasListing={!!copy.listing}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card id="transactions">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Track your Kolokoin earnings and spending
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No transactions yet. Share books to earn Kolocoins!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <TransactionItem
                      key={tx.id}
                      amount={tx.amount}
                      type={tx.type}
                      bookTitle={tx.transfer?.listing.bookCopy.book.title}
                      description={tx.description}
                      createdAt={tx.createdAt}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
      <Footer />
    </>
  )
}
