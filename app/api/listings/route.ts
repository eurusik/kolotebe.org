import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db/prisma"
import { ListingStatus } from "@prisma/client"
import { generateListingSlug } from "@/lib/utils/slugify"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      bookCopyId,
      description,
      photos,
      transferTypes,
      deliveryMethods,
      pickupLocation,
    } = body

    if (!bookCopyId || !transferTypes || !deliveryMethods) {
      return NextResponse.json(
        { error: "Missing required fields: bookCopyId, transferTypes, deliveryMethods" },
        { status: 400 }
      )
    }

    if (!Array.isArray(transferTypes) || transferTypes.length === 0) {
      return NextResponse.json(
        { error: "transferTypes must be a non-empty array" },
        { status: 400 }
      )
    }

    if (!Array.isArray(deliveryMethods) || deliveryMethods.length === 0) {
      return NextResponse.json(
        { error: "deliveryMethods must be a non-empty array" },
        { status: 400 }
      )
    }

    // Verify book copy ownership and get book info for slug
    const bookCopy = await prisma.bookCopy.findUnique({
      where: {
        id: bookCopyId,
        ownerId: session.user.id,
      },
      include: {
        book: true,
      },
    })

    if (!bookCopy) {
      return NextResponse.json(
        { error: "Book copy not found or access denied" },
        { status: 404 }
      )
    }

    // Check if listing already exists for this book copy
    const existingListing = await prisma.listing.findUnique({
      where: { bookCopyId },
    })

    if (existingListing) {
      return NextResponse.json(
        { error: "Listing already exists for this book copy" },
        { status: 400 }
      )
    }

    // Generate slug from book title, author, and bookCopyId
    const slug = generateListingSlug(
      bookCopy.book.title,
      bookCopy.book.author,
      bookCopyId
    )

    // Create listing
    const listing = await prisma.listing.create({
      data: {
        bookCopyId,
        userId: session.user.id,
        slug,
        description: description || null,
        photos: photos || [],
        transferTypes,
        deliveryMethods,
        pickupLocation: pickupLocation || null,
        status: ListingStatus.ACTIVE,
      },
    })

    return NextResponse.json({ listing })
  } catch (error) {
    console.error("Error creating listing:", error)
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')
    const transferType = searchParams.get('transferType')
    const deliveryMethod = searchParams.get('deliveryMethod')
    const search = searchParams.get('search')

    const listings = await prisma.listing.findMany({
      where: {
        status: ListingStatus.ACTIVE,
        deletedAt: null,
        ...(genre && {
          bookCopy: {
            book: {
              genre: {
                contains: genre,
                mode: 'insensitive',
              },
            },
          },
        }),
        ...(transferType && {
          transferTypes: {
            has: transferType as any,
          },
        }),
        ...(deliveryMethod && {
          deliveryMethods: {
            has: deliveryMethod as any,
          },
        }),
        ...(search && {
          bookCopy: {
            book: {
              OR: [
                {
                  title: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  author: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            },
          },
        }),
      },
      include: {
        bookCopy: {
          include: {
            book: true,
            owner: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ listings })
  } catch (error) {
    console.error("Error fetching listings:", error)
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    )
  }
}
