import { Card, CardContent } from "@/components/ui/card"

interface TransactionItemProps {
  amount: number
  type: string
  bookTitle?: string
  description?: string | null
  createdAt: Date
}

export function TransactionItem({
  amount,
  type,
  bookTitle,
  description,
  createdAt,
}: TransactionItemProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`text-2xl ${
                amount > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {amount > 0 ? "+" : ""}
              {amount}
            </div>
            <div>
              <p className="font-medium">
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </p>
              {bookTitle && (
                <p className="text-sm text-muted-foreground">{bookTitle}</p>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
