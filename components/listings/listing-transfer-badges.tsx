import { Badge } from "@/components/ui/badge"
import { TransferType } from "@prisma/client"

interface ListingTransferBadgesProps {
  transferTypes: TransferType[]
}

const transferConfig = {
  FREE: { icon: "🎁", label: "Free", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  FOR_KOLOCOINS: { icon: "🪙", label: "1 KLC", color: "bg-primary/10 text-primary border-primary/20" },
  TRADE: { icon: "🔄", label: "Trade", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  LOAN: { icon: "📚", label: "Loan", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
}

export function ListingTransferBadges({ transferTypes }: ListingTransferBadgesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-muted-foreground">Available:</span>
      {transferTypes.map((type) => {
        const config = transferConfig[type]
        return (
          <Badge 
            key={type} 
            className={`${config.color} border gap-1.5 px-3 py-1 cursor-default`}
          >
            <span className="text-base">{config.icon}</span>
            <span>{config.label}</span>
          </Badge>
        )
      })}
    </div>
  )
}
