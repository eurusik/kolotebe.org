'use client'

import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { BookCondition } from "@prisma/client"

interface BookConditionBadgeProps {
  condition: BookCondition
  className?: string
}

export function BookConditionBadge({ condition, className }: BookConditionBadgeProps) {
  const { t } = useTranslation()
  
  const getConditionColor = (cond: BookCondition) => {
    // Unified dark theme - all conditions use same gray color
    return 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200 border border-zinc-600 transition-colors'
  }

  return (
    <Badge className={`${getConditionColor(condition)} border ${className || ''}`}>
      {t(`bookConditions.${condition}`)}
    </Badge>
  )
}
