import { Separator } from "@/components/ui/separator"
import { DeliveryMethod } from "@prisma/client"

interface ListingBookDetailsProps {
  book: {
    isbn: string | null
    publicationYear: number | null
    genre: string | null
  }
  deliveryMethods: DeliveryMethod[]
}

export function ListingBookDetails({ book, deliveryMethods }: ListingBookDetailsProps) {
  return (
    <>
      <Separator className="my-6" />

      <div className="space-y-3 mb-6">
        <h3 className="font-semibold mb-3">Book Details</h3>
        
        {book.isbn && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">ISBN</span>
            <span className="font-mono text-sm">{book.isbn}</span>
          </div>
        )}

        {book.publicationYear && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Year Published</span>
            <span>{book.publicationYear}</span>
          </div>
        )}

        {book.genre && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Genre</span>
            <span>{book.genre}</span>
          </div>
        )}

        {deliveryMethods.length > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span className="text-sm">{deliveryMethods.join(', ')}</span>
          </div>
        )}
      </div>

      <Separator className="my-6" />
    </>
  )
}
