'use client'

import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/locale-provider"
import Link from "next/link"

export function ProfileHeader() {
  const { t } = useTranslation()
  
  return (
    <div className="mb-8">
      <Link href="/">
        <Button variant="ghost" className="mb-4">{t('profile.backToHome')}</Button>
      </Link>
      <h1 className="text-4xl font-bold text-primary mb-2">{t('profile.myProfile')}</h1>
      <p className="text-muted-foreground">
        {t('profile.manageProfile')}
      </p>
    </div>
  )
}
