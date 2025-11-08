import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BookCopyCardProps {
  bookCopyId: string
  title: string
  author: string
  condition: string
  hasListing: boolean
}

export function BookCopyCard({
  bookCopyId,
  title,
  author,
  condition,
  hasListing,
}: BookCopyCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">by {author}</p>
            <div className="flex gap-2 mt-2">
              <Badge>{condition.replace("_", " ")}</Badge>
              {hasListing ? (
                <Badge className="bg-success/10 text-success border-success/20">
                  Listed
                </Badge>
              ) : (
                <Badge>Not Listed</Badge>
              )}
            </div>
          </div>
          {!hasListing && (
            <Link href={`/listings/create?bookCopyId=${bookCopyId}`}>
              <Button variant="outline">Create Listing</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
