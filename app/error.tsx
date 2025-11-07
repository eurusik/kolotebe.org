'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useTranslation } from '@/lib/i18n/locale-provider'
import { classifyError, getErrorTranslationKey } from '@/lib/utils/error-types'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useTranslation()

  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  // Classify error type using enum
  const errorType = classifyError(error)
  const errorMessageKey = getErrorTranslationKey(errorType)

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-16 flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-3xl font-bold mb-4">{t('errors.somethingWentWrong')}</h1>
          <p className="text-muted-foreground mb-2">
            {t(errorMessageKey)}
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <details className="mt-4 p-4 bg-muted rounded-lg text-left">
              <summary className="cursor-pointer text-sm font-medium mb-2">
                {t('errors.technicalDetails')}
              </summary>
              <code className="text-xs break-all">{error.message}</code>
            </details>
          )}
          {error.digest && (
            <p className="text-xs text-muted-foreground mt-4 mb-6">
              Error ID: {error.digest}
            </p>
          )}
          <Button onClick={reset} size="lg" className="mt-4">
            {t('errors.tryAgain')}
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  )
}
