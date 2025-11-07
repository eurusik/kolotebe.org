import { Badge } from "@/components/ui/badge"
import { BookCondition } from "@prisma/client"

interface BookConditionBadgeProps {
  condition: BookCondition
  className?: string
}

export function BookConditionBadge({ condition, className }: BookConditionBadgeProps) {
  const getConditionColor = (cond: BookCondition) => {
    switch (cond) {
      case 'LIKE_NEW':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'GOOD':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'FAIR':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'POOR':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  const formatCondition = (cond: BookCondition) => {
    return cond.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ')
  }

  return (
    <Badge className={`${getConditionColor(condition)} border ${className || ''}`}>
      {formatCondition(condition)}
    </Badge>
  )
}
