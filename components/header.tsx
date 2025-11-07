import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth, signOut } from "@/lib/auth/config"
import { checkUserRole } from "@/lib/auth/roles"

export async function Header() {
  const session = await auth()
  
  let isDeveloper = false
  if (session?.user?.email) {
    const { isDeveloper: dev, role } = await checkUserRole(session.user.email)
    isDeveloper = dev
  }

  return (
    <header className="border-b border-border bg-sidebar sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Kolotebe
        </Link>
        <nav className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/listings">
                <Button variant="ghost">Browse Books</Button>
              </Link>
              <Link href="/books/add">
                <Button variant="ghost">Add Book</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              {isDeveloper ? (
                <Link href="/api/reference/internal">
                  <Button variant="ghost">API Docs</Button>
                </Link>
              ) : (
                <Link href="/api/reference/public">
                  <Button variant="ghost">API Docs</Button>
                </Link>
              )}
              <form
                action={async () => {
                  "use server"
                  await signOut()
                }}
              >
                <Button variant="outline" type="submit">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/listings">
                <Button variant="ghost">Browse Books</Button>
              </Link>
              <Link href="/api/reference/public">
                <Button variant="ghost">API Docs</Button>
              </Link>
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
