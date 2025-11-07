import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db/prisma"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { CatalogSection } from "@/components/home/catalog-section"

// Force dynamic rendering to avoid DB connection during build
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const session = await auth()
  
  // Fetch listings for catalog
  const listings = await prisma.listing.findMany({
      where: {
        status: "ACTIVE",
        deletedAt: null,
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
      },
      orderBy: {
        createdAt: "desc",
      },
      take: session ? undefined : 12, // Show all for authenticated, 12 for guests
    })

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      
      {/* Show Hero only for guests */}
      {!session && <HeroSection />}

      {/* Catalog Section */}
      <CatalogSection listings={listings} />

      <Footer />
    </main>
  )
}
