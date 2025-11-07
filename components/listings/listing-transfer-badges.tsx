'use client'

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { TransferType } from "@prisma/client"

interface ListingTransferBadgesProps {
  transferTypes: TransferType[]
}

export function ListingTransferBadges({ transferTypes }: ListingTransferBadgesProps) {
  const { t } = useTranslation()
  
  const transferConfig: Record<TransferType, { icon: string; labelKey: string; tooltipKey: string; color: string }> = {
    FREE: { 
      icon: "🎁", 
      labelKey: "transferTypes.FREE", 
      tooltipKey: "transferTypes.FREE",
      color: "bg-green-500/10 text-green-400 border-green-500/20" 
    },
    FOR_KOLOCOINS: { 
      icon: "🪙", 
      labelKey: "transferTypes.FOR_KOLOCOINS", 
      tooltipKey: "listings.kolocoinTooltip",
      color: "bg-primary/10 text-primary border-primary/20" 
    },
    TRADE: { 
      icon: "🔄", 
      labelKey: "transferTypes.TRADE", 
      tooltipKey: "listings.tradeTooltip",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20" 
    },
    LOAN: { 
      icon: "📚", 
      labelKey: "transferTypes.LOAN", 
      tooltipKey: "listings.loanTooltip",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20" 
    },
  }
  
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-muted-foreground">{t('listings.available')}:</span>
      {transferTypes.map((type) => {
        const config = transferConfig[type]
        return (
          <TooltipProvider key={type}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  className={`${config.color} border gap-1.5 px-3 py-1 cursor-help`}
                >
                  <span className="text-base">{config.icon}</span>
                  <span>{t(config.labelKey)}</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t(config.tooltipKey)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      })}
    </div>
  )
}
