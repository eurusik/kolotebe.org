import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import type { Listing, BookCopy, Book, User } from "@prisma/client"

interface ListingCardProps {
  listing: Listing & {
    bookCopy: BookCopy & {
      book: Book
      owner: Pick<User, "id" | "name" | "image">
    }
  }
  showActions?: boolean
}

const conditionLabels = {
  NEW: "New",
  LIKE_NEW: "Like New",
  GOOD: "Good",
  FAIR: "Fair",
  POOR: "Poor",
}

const transferTypeLabels = {
  FREE: "Free",
  FOR_KOLOCOINS: "1 KLC",
  TRADE: "Trade",
  LOAN: "Loan",
}

export function ListingCard({ listing, showActions = true }: ListingCardProps) {
  const { bookCopy } = listing
  const { book } = bookCopy

  const coverImage = listing.photos[0] || book.coverImage || "/placeholder-book.svg"

  return (
    <Link href={`/listings/${listing.slug}`}>
      <Card className="h-full hover:border-primary transition-colors cursor-pointer">
        <CardContent className="p-4">
          <div className="aspect-[3/4] relative mb-4 rounded-lg overflow-hidden bg-muted">
            <Image
              src={coverImage}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{book.author}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {listing.transferTypes.map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {transferTypeLabels[type as keyof typeof transferTypeLabels]}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Condition: {conditionLabels[bookCopy.condition as keyof typeof conditionLabels]}</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {bookCopy.owner.image && (
              <Image
                src={bookCopy.owner.image}
                alt={bookCopy.owner.name || "User"}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>{bookCopy.owner.name}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}