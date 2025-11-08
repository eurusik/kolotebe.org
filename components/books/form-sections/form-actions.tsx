'use client'

import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/locale-provider"

interface FormActionsProps {
  loading: boolean
  onCancel: () => void
}

export function FormActions({ loading, onCancel }: FormActionsProps) {
  const { t } = useTranslation()

  return (
    <div className="flex gap-4">
      <Button type="submit" disabled={loading} className="flex-1">
        {loading ? t('books.addingBook') : t('books.continueToListing')}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={loading}
      >
        {t('books.cancel')}
      </Button>
    </div>
  )
}
