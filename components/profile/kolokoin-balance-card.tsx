'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/locale-provider"
import Link from "next/link"

interface KolocoinBalanceCardProps {
  balance: number
}

export function KolocoinBalanceCard({ balance }: KolocoinBalanceCardProps) {
  const { t } = useTranslation()
  
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🪙</span>
          {t('profile.kolocoinBalance')}
        </CardTitle>
        <CardDescription>{t('profile.earnKLC')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <div className="text-5xl font-bold text-primary mb-2">{balance}</div>
          <div className="text-sm text-muted-foreground">KLC</div>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link href="#transactions">{t('profile.viewTransactionHistory')}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
