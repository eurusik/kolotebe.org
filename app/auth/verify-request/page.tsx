import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 text-6xl">📧</div>
          <CardTitle className="text-2xl font-bold">
            Check your email
          </CardTitle>
          <CardDescription>
            A sign-in link has been sent to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Click the link in the email to sign in to your account.</p>
            <p>If you don't see the email, check your spam folder.</p>
          </div>
          <Link href="/auth/signin" className="block">
            <Button variant="outline" className="w-full">
              Back to Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
