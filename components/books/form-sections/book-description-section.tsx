'use client'

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/lib/i18n/locale-provider"

interface BookDescriptionSectionProps {
  description: string
  onDescriptionChange: (value: string) => void
}

export function BookDescriptionSection({
  description,
  onDescriptionChange,
}: BookDescriptionSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <Label htmlFor="description">{t('books.descriptionLabel')}</Label>
      <Textarea
        id="description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder={t('books.descriptionPlaceholder')}
        rows={4}
      />
    </div>
  )
}
