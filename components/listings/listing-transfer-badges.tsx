'use client'

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { TransferType } from "@prisma/client"
import { Gift, Coins, ArrowLeftRight, BookOpen } from "lucide-react"

interface ListingTransferBadgesProps {
  transferTypes: TransferType[]
}

export function ListingTransferBadges({ transferTypes }: ListingTransferBadgesProps) {
  const { t } = useTranslation()
  
  const transferConfig: Record<TransferType, { icon: React.ReactNode; labelKey: string; tooltipKey: string; color: string }> = {
    FREE: { 
      icon: <Gift className="w-4 h-4" />, 
      labelKey: "transferTypes.FREE", 
      tooltipKey: "transferTypes.FREE",
      color: "bg-zinc-700 hover:bg-zinc-600 text-zinc-200 border border-zinc-600" 
    },
    FOR_KOLOCOINS: { 
      icon: <Coins className="w-4 h-4" />, 
      labelKey: "transferTypes.FOR_KOLOCOINS", 
      tooltipKey: "listings.kolocoinTooltip",
      color: "bg-zinc-600 hover:bg-zinc-500 text-zinc-100 border border-zinc-500" 
    },
    TRADE: { 
      icon: <ArrowLeftRight className="w-4 h-4" />, 
      labelKey: "transferTypes.TRADE", 
      tooltipKey: "listings.tradeTooltip",
      color: "bg-zinc-700 hover:bg-zinc-600 text-zinc-200 border border-zinc-600" 
    },
    LOAN: { 
      icon: <BookOpen className="w-4 h-4" />, 
      labelKey: "transferTypes.LOAN", 
      tooltipKey: "listings.loanTooltip",
      color: "bg-zinc-700 hover:bg-zinc-600 text-zinc-200 border border-zinc-600" 
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
                  className={`${config.color} gap-1.5 px-3 py-1 cursor-help transition-colors`}
                >
                  {config.icon}
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
