'use client'

import { useTranslation } from '@/lib/i18n/locale-provider'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

export function LocaleSwitcher() {
  const { locale, setLocale } = useTranslation()

  const toggleLocale = () => {
    setLocale(locale === 'uk' ? 'en' : 'uk')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="gap-2"
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {locale === 'uk' ? 'EN' : 'УК'}
      </span>
    </Button>
  )
}
