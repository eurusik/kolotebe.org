'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/lib/i18n/locale-provider"

interface BookBasicInfoSectionProps {
  title: string
  author: string
  onTitleChange: (value: string) => void
  onAuthorChange: (value: string) => void
}

export function BookBasicInfoSection({
  title,
  author,
  onTitleChange,
  onAuthorChange,
}: BookBasicInfoSectionProps) {
  const { t } = useTranslation()

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">{t('books.titleLabel')}</Label>
        <Input
          id="title"
          required
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={t('books.titlePlaceholder')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">{t('books.authorLabel')}</Label>
        <Input
          id="author"
          required
          value={author}
          onChange={(e) => onAuthorChange(e.target.value)}
          placeholder={t('books.authorPlaceholder')}
        />
      </div>
    </>
  )
}
