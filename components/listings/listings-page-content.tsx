'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { ListingCard } from "./listing-card"

interface ListingsPageContentProps {
  listings: any[]
}

export function ListingsPageContent({ listings }: ListingsPageContentProps) {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">{t('listings.title')}</h1>
          <p className="text-muted-foreground">
            {t('listings.description')}
          </p>
        </div>
        <Link href="/books/add">
          <Button>{t('listings.addYourBook')}</Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">
            {t('listings.noListings')}
          </p>
          <Link href="/books/add">
            <Button>{t('listings.addYourBook')}</Button>
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
