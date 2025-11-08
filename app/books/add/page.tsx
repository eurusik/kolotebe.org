import { auth } from "@/lib/auth/config"
import { redirect } from "next/navigation"
import { AddBookPageContent } from "@/components/books/add-book-page-content"

export default async function AddBookPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/auth/signin")
  }

  return <AddBookPageContent userId={session.user.id} />
}
