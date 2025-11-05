import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface KolokoinBalanceCardProps {
  balance: number
}

export function KolokoinBalanceCard({ balance }: KolokoinBalanceCardProps) {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🪙</span>
          Kolokoin Balance
        </CardTitle>
        <CardDescription>Earn 1 KLC for every book you share</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <div className="text-5xl font-bold text-primary mb-2">{balance}</div>
          <div className="text-sm text-muted-foreground">KLC</div>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link href="#transactions">View Transaction History</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
