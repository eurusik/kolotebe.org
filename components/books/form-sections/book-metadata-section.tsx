'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/lib/i18n/locale-provider"

interface BookMetadataSectionProps {
  isbn: string
  publicationYear: string
  genre: string
  onIsbnChange: (value: string) => void
  onPublicationYearChange: (value: string) => void
  onGenreChange: (value: string) => void
}

export function BookMetadataSection({
  isbn,
  publicationYear,
  genre,
  onIsbnChange,
  onPublicationYearChange,
  onGenreChange,
}: BookMetadataSectionProps) {
  const { t } = useTranslation()

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="isbn">{t('books.isbnLabel')}</Label>
          <Input
            id="isbn"
            value={isbn}
            onChange={(e) => onIsbnChange(e.target.value)}
            placeholder={t('books.isbnPlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publicationYear">{t('books.publicationYearLabel')}</Label>
          <Input
            id="publicationYear"
            type="number"
            value={publicationYear}
            onChange={(e) => onPublicationYearChange(e.target.value)}
            placeholder={t('books.publicationYearPlaceholder')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="genre">{t('books.genreLabel')}</Label>
        <Input
          id="genre"
          value={genre}
          onChange={(e) => onGenreChange(e.target.value)}
          placeholder={t('books.genrePlaceholder')}
        />
      </div>
    </>
  )
}
