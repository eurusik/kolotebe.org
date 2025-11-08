'use client'

import { useTranslation } from "@/lib/i18n/locale-provider"
import { AddBookForm } from "./add-book-form"

interface AddBookPageContentProps {
  userId: string
}

export function AddBookPageContent({ userId }: AddBookPageContentProps) {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">{t('books.addBookTitle')}</h1>
        <p className="text-muted-foreground">
          {t('books.addBookDescription')}
        </p>
      </div>
      
      <AddBookForm userId={userId} />
    </div>
  )
}
