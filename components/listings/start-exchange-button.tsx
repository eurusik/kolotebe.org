"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { ArrowRightLeft } from "lucide-react"

interface StartExchangeButtonProps {
  isAuthenticated: boolean
  isOwner: boolean
}

export function StartExchangeButton({ isAuthenticated, isOwner }: StartExchangeButtonProps) {
  const { t } = useTranslation()
  
  if (isOwner) {
    return (
      <Button size="lg" className="w-full h-14 text-lg gap-3" disabled>
        <ArrowRightLeft className="h-6 w-6" />
        {t('listings.thisIsYourBook')}
      </Button>
    )
  }

  if (!isAuthenticated) {
    return (
      <Button size="lg" className="w-full h-14 text-lg gap-3" asChild>
        <Link href="/auth/signin">
          <ArrowRightLeft className="h-6 w-6" />
          {t('listings.startExchange')}
        </Link>
      </Button>
    )
  }

  return (
    <Button size="lg" className="w-full h-14 text-lg gap-3">
      <ArrowRightLeft className="h-6 w-6" />
      {t('listings.startExchange')}
    </Button>
  )
}
