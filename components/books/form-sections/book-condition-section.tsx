'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { BookCondition } from "@prisma/client"

interface BookConditionSectionProps {
  condition: BookCondition
  onConditionChange: (value: BookCondition) => void
}

export function BookConditionSection({
  condition,
  onConditionChange,
}: BookConditionSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <Label htmlFor="condition">{t('books.conditionLabel')}</Label>
      <Select
        value={condition}
        onValueChange={(value) => onConditionChange(value as BookCondition)}
      >
        <SelectTrigger id="condition">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="NEW">{t('bookConditions.NEW')}</SelectItem>
          <SelectItem value="LIKE_NEW">{t('bookConditions.LIKE_NEW')}</SelectItem>
          <SelectItem value="GOOD">{t('bookConditions.GOOD')}</SelectItem>
          <SelectItem value="FAIR">{t('bookConditions.FAIR')}</SelectItem>
          <SelectItem value="POOR">{t('bookConditions.POOR')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
