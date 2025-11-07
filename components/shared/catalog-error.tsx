'use client'

import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/locale-provider"

export function CatalogError({ reset }: { reset: () => void }) {
  const { t } = useTranslation()
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center py-12 bg-sidebar border border-border rounded-lg">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">{t('errors.databaseConnection')}</h2>
        <p className="text-muted-foreground mb-6">
          {t('errors.databaseConnectionDesc')}
        </p>
        <Button onClick={reset}>
          {t('errors.tryAgain')}
        </Button>
      </div>
    </div>
  )
}
