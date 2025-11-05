import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface PendingRequestCardProps {
  requesterName: string | null
  requesterImage: string | null
  bookTitle: string
  transferType: string
  deliveryMethod: string
  status: string
  createdAt: Date
}

export function PendingRequestCard({
  requesterName,
  requesterImage,
  bookTitle,
  transferType,
  deliveryMethod,
  status,
  createdAt,
}: PendingRequestCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={requesterImage || ""} />
              <AvatarFallback>{requesterName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{requesterName} requested</p>
              <p className="text-sm text-muted-foreground">{bookTitle}</p>
              <div className="flex gap-2 mt-2">
                <Badge>{transferType.replace("_", " ")}</Badge>
                <Badge>{deliveryMethod.replace("_", " ")}</Badge>
                <Badge>{status}</Badge>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
