import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const bookCopies = await prisma.bookCopy.findMany({
      where: {
        ownerId: session.user.id,
        deletedAt: null,
      },
      include: {
        book: true,
        listing: {
          select: {
            id: true,
            slug: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ bookCopies })
  } catch (error) {
    console.error("Error fetching book copies:", error)
    return NextResponse.json(
      { error: "Failed to fetch book copies" },
      { status: 500 }
    )
  }
}
