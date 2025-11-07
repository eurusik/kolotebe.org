'use client'

import { BookOpen } from "lucide-react"
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
    <div className="relative w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-border/50">
      {/* Book Icon with orange tint */}
      <BookOpen className="w-24 h-24 text-primary/20" strokeWidth={1.5} />
      
      {/* Condition Badge in top-right corner */}
      <Badge 
        variant="secondary" 
        className="absolute top-3 right-3 bg-black/60 text-white border-0 backdrop-blur-sm"
      >
        {t(`bookConditions.${condition}`)}
      </Badge>
    </div>
  )
}
