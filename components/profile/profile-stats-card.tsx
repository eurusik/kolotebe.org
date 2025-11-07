'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n/locale-provider"

interface ProfileStatsCardProps {
  booksCount: number
  activeListingsCount: number
  pendingRequestsCount: number
  myRequestsCount: number
}

export function ProfileStatsCard({
  booksCount,
  activeListingsCount,
  pendingRequestsCount,
  myRequestsCount,
}: ProfileStatsCardProps) {
  const { t } = useTranslation()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.statistics')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('profile.myBooks')}</span>
          <Badge>{booksCount}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('profile.activeListings')}</span>
          <Badge>{activeListingsCount}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('profile.pendingRequests')}</span>
          <Badge>{pendingRequestsCount}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('profile.myRequests')}</span>
          <Badge>{myRequestsCount}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
