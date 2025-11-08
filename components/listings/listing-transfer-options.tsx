import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransferType } from "@prisma/client"

interface ListingTransferOptionsProps {
  transferTypes: TransferType[]
}

export function ListingTransferOptions({ transferTypes }: ListingTransferOptionsProps) {
  return (
    <Card className="mb-6 border-primary/20 bg-sidebar/50">
      <CardHeader>
        <CardTitle className="text-lg">Available Transfer Options</CardTitle>
        <CardDescription>Choose how you want to get this book</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {transferTypes.includes('FREE') && (
          <div className="p-4 border-2 border-success/30 bg-success/5 rounded-lg text-center hover:border-success/50 transition-colors cursor-pointer">
            <div className="text-2xl mb-2">🎁</div>
            <div className="font-semibold text-success">Free</div>
            <div className="text-xs text-muted-foreground">Take it for free</div>
          </div>
        )}
        
        {transferTypes.includes('FOR_KOLOCOINS') && (
          <div className="p-4 border-2 border-primary/30 bg-primary/5 rounded-lg text-center hover:border-primary/50 transition-colors cursor-pointer">
            <div className="text-2xl mb-2">🪙</div>
            <div className="font-semibold text-primary">1 Kolocoin</div>
            <div className="text-xs text-muted-foreground">Pay with KLC</div>
          </div>
        )}
        
        {transferTypes.includes('TRADE') && (
          <div className="p-4 border-2 border-info/30 bg-info/5 rounded-lg text-center hover:border-info/50 transition-colors cursor-pointer">
            <div className="text-2xl mb-2">🔄</div>
            <div className="font-semibold text-info">Trade</div>
            <div className="text-xs text-muted-foreground">Exchange for a book</div>
          </div>
        )}
        
        {transferTypes.includes('LOAN') && (
          <div className="p-4 border-2 border-warning/30 bg-warning/5 rounded-lg text-center hover:border-warning/50 transition-colors cursor-pointer">
            <div className="text-2xl mb-2">📚</div>
            <div className="font-semibold text-warning">Loan</div>
            <div className="text-xs text-muted-foreground">Borrow temporarily</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
