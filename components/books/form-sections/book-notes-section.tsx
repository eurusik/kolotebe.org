'use client'

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/lib/i18n/locale-provider"

interface BookNotesSectionProps {
  notes: string
  onNotesChange: (value: string) => void
}

export function BookNotesSection({
  notes,
  onNotesChange,
}: BookNotesSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <Label htmlFor="notes">{t('books.personalNotesLabel')}</Label>
      <Textarea
        id="notes"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder={t('books.personalNotesPlaceholder')}
        rows={3}
      />
    </div>
  )
}
