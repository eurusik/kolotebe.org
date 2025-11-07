'use client'

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/locale-provider"

interface ListingOwnerCardProps {
  owner: {
    id: string
    name: string | null
    image: string | null
    createdAt: Date
  }
}

export function ListingOwnerCard({ owner }: ListingOwnerCardProps) {
  const { t } = useTranslation()
  
  return (
    <Card className="bg-sidebar/50">
      <CardHeader>
        <CardTitle className="text-lg">{t('listings.bookOwner')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={owner.image || undefined} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {owner.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold text-lg">{owner.name}</div>
            <div className="text-sm text-muted-foreground">
              {t('listings.memberSince')} {new Date(owner.createdAt).getFullYear()}
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/users/${owner.id}`}>{t('listings.viewProfile')}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
