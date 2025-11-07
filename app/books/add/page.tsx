import { auth } from "@/lib/auth/config"
import { redirect } from "next/navigation"
import { AddBookForm } from "@/components/add-book-form"

export default async function AddBookPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Add a Book</h1>
        <p className="text-muted-foreground">
          Share a book from your collection with the community
        </p>
      </div>
      
      <AddBookForm userId={session.user.id} />
    </div>
  )
}
