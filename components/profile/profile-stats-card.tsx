import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProfileStatsCardProps {
  booksCount: number
  activeListingsCount: number
  pendingRequestsCount: number
  myRequestsCount: number
}

export function ProfileStatsCard({
  booksCount,
  activeListingsCount,
  pendingRequestsCount,
  myRequestsCount,
}: ProfileStatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">My Books</span>
          <Badge>{booksCount}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Active Listings</span>
          <Badge>{activeListingsCount}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Pending Requests</span>
          <Badge>{pendingRequestsCount}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">My Requests</span>
          <Badge>{myRequestsCount}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
