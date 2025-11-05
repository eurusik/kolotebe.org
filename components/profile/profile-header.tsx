import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ProfileHeader() {
  return (
    <div className="mb-8">
      <Link href="/">
        <Button variant="ghost" className="mb-4">← Back to Home</Button>
      </Link>
      <h1 className="text-4xl font-bold text-primary mb-2">My Profile</h1>
      <p className="text-muted-foreground">
        Manage your books, listings, and Kolokoin balance
      </p>
    </div>
  )
}
