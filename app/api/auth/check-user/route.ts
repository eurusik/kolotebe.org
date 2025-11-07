import { prisma } from "@/lib/db/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    })

    return NextResponse.json({
      exists: !!user,
      hasPassword: !!user?.password,
    })
  } catch (error) {
    console.error("Check user error:", error)
    return NextResponse.json(
      { error: "Failed to check user" },
      { status: 500 }
    )
  }
}
