import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      author,
      isbn,
      genre,
      publicationYear,
      description,
      condition,
      notes,
    } = body

    if (!title || !author || !condition) {
      return NextResponse.json(
        { error: "Title, author, and condition are required" },
        { status: 400 }
      )
    }

    // Check if book already exists by ISBN or title+author
    let book
    if (isbn) {
      book = await prisma.book.findUnique({
        where: { isbn },
      })
    }
    
    if (!book) {
      // Try to find by title and author
      const existingBooks = await prisma.book.findMany({
        where: {
          title: {
            equals: title,
            mode: "insensitive",
          },
          author: {
            equals: author,
            mode: "insensitive",
          },
          deletedAt: null,
        },
        take: 1,
      })
      
      book = existingBooks[0]
    }

    // Create book if it doesn't exist
    if (!book) {
      book = await prisma.book.create({
        data: {
          title,
          author,
          isbn: isbn || null,
          genre: genre || null,
          publicationYear: publicationYear ? parseInt(publicationYear) : null,
          description: description || null,
        },
      })
    }

    // Create book copy
    const bookCopy = await prisma.bookCopy.create({
      data: {
        bookId: book.id,
        ownerId: session.user.id,
        condition,
        notes: notes || null,
        isAvailable: true,
      },
    })

    // Initialize user balance if doesn't exist
    const existingBalance = await prisma.userBalance.findUnique({
      where: { userId: session.user.id },
    })

    if (!existingBalance) {
      await prisma.userBalance.create({
        data: {
          userId: session.user.id,
          balance: 0,
        },
      })
    }

    return NextResponse.json({
      bookId: book.id,
      bookCopyId: bookCopy.id,
    })
  } catch (error) {
    console.error("Error creating book:", error)
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json(
        { error: "Search query required" },
        { status: 400 }
      )
    }

    const books = await prisma.book.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            author: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 10,
    })

    return NextResponse.json({ books })
  } catch (error) {
    console.error("Error searching books:", error)
    return NextResponse.json(
      { error: "Failed to search books" },
      { status: 500 }
    )
  }
}
