import { prisma } from "@/lib/db/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        copies: {
          where: { deletedAt: null },
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            listing: {
              select: {
                id: true,
                slug: true,
                status: true,
              },
            },
          },
        },
      },
    })

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json({ book })
  } catch (error) {
    console.error("Error fetching book:", error)
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    )
  }
}
