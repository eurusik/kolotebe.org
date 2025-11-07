'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ListingCard } from "@/components/listings/listing-card"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileInfoCard } from "@/components/profile/profile-info-card"
import { KolocoinBalanceCard } from "@/components/profile/kolokoin-balance-card"
import { ProfileStatsCard } from "@/components/profile/profile-stats-card"
import { PendingRequestCard } from "@/components/profile/pending-request-card"
import { MyRequestCard } from "@/components/profile/my-request-card"
import { BookCopyCard } from "@/components/profile/book-copy-card"
import { TransactionItem } from "@/components/profile/transaction-item"
import { useTranslation } from "@/lib/i18n/locale-provider"

interface ProfilePageContentProps {
  user: any
  bookCopies: any[]
  activeListings: any[]
  transactions: any[]
  requestedTransfers: any[]
  ownedTransfers: any[]
  balance: number
  session: any
}

export function ProfilePageContent({
  user,
  bookCopies,
  activeListings,
  transactions,
  requestedTransfers,
  ownedTransfers,
  balance,
  session
}: ProfilePageContentProps) {
  const { t } = useTranslation()

  return (
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

          <KolocoinBalanceCard balance={balance} />

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
                <CardTitle>{t('profile.pendingRequestsTitle')}</CardTitle>
                <CardDescription>
                  {t('profile.pendingRequestsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ownedTransfers.map((transfer: any) => (
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
                <CardTitle>{t('profile.myRequestsTitle')}</CardTitle>
                <CardDescription>
                  {t('profile.myRequestsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {requestedTransfers.map((transfer: any) => (
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
                  <CardTitle>{t('profile.myActiveListings')}</CardTitle>
                  <CardDescription>
                    {t('profile.booksAvailableForSharing')}
                  </CardDescription>
                </div>
                <Link href="/books/add">
                  <Button>{t('profile.addNewBook')}</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {activeListings.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    {t('profile.noActiveListings')}
                  </p>
                  <Link href="/books/add">
                    <Button>{t('profile.createFirstListing')}</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {activeListings.map((listing: any) => (
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
              <CardTitle>{t('profile.allMyBooks')}</CardTitle>
              <CardDescription>
                {t('profile.completeBookCollection')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookCopies.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    {t('profile.noBooksYet')}
                  </p>
                  <Link href="/books/add">
                    <Button>{t('profile.addFirstBook')}</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookCopies.map((copy: any) => (
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
              <CardTitle>{t('profile.transactionHistory')}</CardTitle>
              <CardDescription>
                {t('profile.trackKolocoins')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {t('profile.noTransactions')}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((tx: any) => (
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
  )
}
