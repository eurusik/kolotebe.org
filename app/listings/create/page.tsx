import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db/prisma"
import { redirect } from "next/navigation"
import { CreateListingForm } from "@/components/create-listing-form"

export default async function CreateListingPage({
  searchParams,
}: {
  searchParams: Promise<{ bookCopyId?: string }>
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/auth/signin")
  }

  const params = await searchParams
  
  if (!params.bookCopyId) {
    redirect("/books/add")
  }

  const bookCopy = await prisma.bookCopy.findUnique({
    where: {
      id: params.bookCopyId,
      ownerId: session.user.id,
    },
    include: {
      book: true,
    },
  })

  if (!bookCopy) {
    redirect("/books/add")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Create Listing</h1>
        <p className="text-muted-foreground">
          {bookCopy.book.title} by {bookCopy.book.author}
        </p>
      </div>
      
      <CreateListingForm bookCopy={bookCopy} />
    </div>
  )
}
