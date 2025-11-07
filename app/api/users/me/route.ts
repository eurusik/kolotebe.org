import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db/prisma"
import { ListingStatus } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        balance: true,
        _count: {
          select: {
            bookCopies: { where: { deletedAt: null } },
            listings: { where: { status: ListingStatus.ACTIVE, deletedAt: null } },
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, bio, location } = body

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || undefined,
        bio: bio || undefined,
        location: location || undefined,
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    )
  }
}
