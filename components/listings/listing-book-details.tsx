'use client'

import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { DeliveryMethod } from "@prisma/client"

interface ListingBookDetailsProps {
  book: {
    isbn: string | null
    publicationYear: number | null
    genre: string | null
  }
  deliveryMethods: DeliveryMethod[]
}

export function ListingBookDetails({ book, deliveryMethods }: ListingBookDetailsProps) {
  const { t } = useTranslation()
  
  return (
    <>
      <Separator className="my-6" />

      <div className="space-y-3 mb-6">
        <h3 className="font-semibold mb-3">{t('books.bookDetails')}</h3>
        
        {book.isbn && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('books.isbn')}</span>
            <span className="font-mono text-sm">{book.isbn}</span>
          </div>
        )}

        {book.publicationYear && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('books.yearPublished')}</span>
            <span>{book.publicationYear}</span>
          </div>
        )}

        {book.genre && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('books.genre')}</span>
            <span>{book.genre}</span>
          </div>
        )}

        {deliveryMethods.length > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('books.delivery')}</span>
            <span className="text-sm">
              {deliveryMethods.map(method => t(`deliveryMethods.${method}`)).join(', ')}
            </span>
          </div>
        )}
      </div>

      <Separator className="my-6" />
    </>
  )
}
