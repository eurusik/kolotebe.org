'use client'

import { Book } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n/locale-provider"
import type { BookCondition } from "@prisma/client"

interface BookCoverPlaceholderProps {
  title: string
  condition: BookCondition
}

export function BookCoverPlaceholder({ title, condition }: BookCoverPlaceholderProps) {
  const { t } = useTranslation()
  
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border">
      {/* Book Icon with orange tint */}
      <Book className="w-24 h-24 text-muted-foreground/30" strokeWidth={1.5} />
      
      {/* Condition Badge in top-right corner */}
      <Badge 
        variant="secondary" 
        className="absolute top-3 right-3 bg-card text-card-foreground border border-border shadow-md"
      >
        {t(`bookConditions.${condition}`)}
      </Badge>
    </div>
  )
}
