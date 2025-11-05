import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface MyRequestCardProps {
  ownerName: string | null
  ownerImage: string | null
  bookTitle: string
  transferType: string
  deliveryMethod: string
  status: string
  createdAt: Date
}

export function MyRequestCard({
  ownerName,
  ownerImage,
  bookTitle,
  transferType,
  deliveryMethod,
  status,
  createdAt,
}: MyRequestCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={ownerImage || ""} />
              <AvatarFallback>{ownerName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Requested from {ownerName}</p>
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
