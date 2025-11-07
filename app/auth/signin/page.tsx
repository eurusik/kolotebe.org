"use client"

import { signIn } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { useRouter } from "next/navigation"

type Step = "email" | "password" | "magic" | "signup"

export default function SignInPage() {
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Check if user exists
      const res = await fetch(`/api/auth/check-user?email=${encodeURIComponent(email)}`)
      const data = await res.json()

      if (data.exists && data.hasPassword) {
        // Existing user with password - show password field
        setStep("password")
      } else if (data.exists && !data.hasPassword) {
        // Existing user without password (OAuth) - show magic link
        setStep("magic")
      } else {
        // New user - show signup options
        setStep("signup")
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid password")
      setIsLoading(false)
    } else {
      router.push("/")
      router.refresh()
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const password = formData.get("password") as string

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registration failed")
        setIsLoading(false)
        return
      }

      // Auto sign in
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Registration successful but login failed")
        setIsLoading(false)
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (err) {
      setError("Something went wrong")
      setIsLoading(false)
    }
  }

  const handleMagicLink = async () => {
    setIsLoading(true)
    const provider = process.env.NODE_ENV === "production" ? "resend" : "nodemailer"
    await signIn(provider, { email, callbackUrl: "/" })
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    await signIn("google", { callbackUrl: "/" })
  }

  const resetToEmail = () => {
    setStep("email")
    setError("")
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-primary mb-2">
            Kolotebe
          </CardTitle>
          <CardDescription>
            {step === "email" && "Sign in to start sharing books and earning Kolocoins"}
            {step === "password" && "Welcome back! Enter your password"}
            {step === "magic" && "Welcome back! We'll send you a magic link"}
            {step === "signup" && "Create your account or use magic link"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md">
              {error}
            </div>
          )}

          {/* Step 1: Email Input */}
          {step === "email" && (
            <>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Checking..." : "Continue"}
                </Button>
              </form>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                  or
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </>
          )}

          {/* Step 2: Password (Existing User) */}
          {step === "password" && (
            <>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Signing in as</p>
                <p className="font-medium">{email}</p>
                <button
                  type="button"
                  onClick={resetToEmail}
                  className="text-xs text-primary hover:underline"
                >
                  Change email
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    disabled={isLoading}
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleMagicLink}
                  disabled={isLoading}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password? Send magic link instead
                </button>
              </div>
            </>
          )}

          {/* Step 2b: Magic Link (Existing User without Password) */}
          {step === "magic" && (
            <>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Signing in as</p>
                <p className="font-medium">{email}</p>
                <button
                  type="button"
                  onClick={resetToEmail}
                  className="text-xs text-primary hover:underline"
                >
                  Change email
                </button>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={handleMagicLink}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Magic Link"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  We'll send you a secure link to sign in without a password
                </p>
              </div>
            </>
          )}

          {/* Step 3: Signup / Magic Link Options */}
          {step === "signup" && (
            <>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Creating account for</p>
                <p className="font-medium">{email}</p>
                <button
                  type="button"
                  onClick={resetToEmail}
                  className="text-xs text-primary hover:underline"
                >
                  Change email
                </button>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={handleMagicLink}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Continue with Magic Link"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  We'll send you a link to sign in without a password
                </p>
              </div>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                  or create password
                </span>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" variant="outline" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Account with Password"}
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
