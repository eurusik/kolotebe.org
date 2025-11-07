'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { ListingCard } from "@/components/listings/listing-card"
import { useSession } from "next-auth/react"

interface CatalogSectionProps {
  listings: any[]
}

export function CatalogSection({ listings }: CatalogSectionProps) {
  const { t } = useTranslation()
  const { data: session } = useSession()

  return (
    <div id="catalog" className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">{t('listings.availableBooks')}</h2>
          <p className="text-muted-foreground">
            {t('listings.description')}
          </p>
        </div>
        <Link href="/listings">
          <Button variant="outline">{t('listings.viewAll')}</Button>
        </Link>
      </div>

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              showActions={!!session}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            {t('listings.noListings')}
          </p>
          {session && (
            <Link href="/books/add">
              <Button>{t('listings.addYourBook')}</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
