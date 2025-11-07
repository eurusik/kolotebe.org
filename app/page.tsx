import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ListingCard } from "@/components/listing-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function HomePage() {
  const session = await auth()
  
  // For authenticated users, show full catalog like /listings page
  if (session) {
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
    })

    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Browse Books</h1>
              <p className="text-muted-foreground">
                Discover books shared by the community
              </p>
            </div>
            <Link href="/books/add">
              <Button>Add Your Book</Button>
            </Link>
          </div>

          {listings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                No listings available yet. Be the first to share a book!
              </p>
              <Link href="/books/add">
                <Button>Add Book</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
        <Footer />
      </>
    )
  }

  // Fetch latest listings for catalog
  const listings = await prisma.listing.findMany({
    where: {
      status: 'ACTIVE',
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
      createdAt: 'desc',
    },
    take: 12, // Show first 12 books
  })

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main content */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Share Books, Earn Kolocoins
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join our community of book lovers. List your books, borrow from others, and earn Kolocoins for every share.
              </p>
            </div>

            {/* Feature cards grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <div className="bg-sidebar border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-semibold mb-2">List Books</h3>
                <p className="text-sm text-muted-foreground">Share your books with the community</p>
              </div>
              
              <div className="bg-sidebar border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="font-semibold mb-2">Trade & Loan</h3>
                <p className="text-sm text-muted-foreground">Exchange or lend books to others</p>
              </div>
              
              <div className="bg-sidebar border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                <div className="text-4xl mb-3">🪙</div>
                <h3 className="font-semibold mb-2">Earn Kolocoins</h3>
                <p className="text-sm text-muted-foreground">Get 1 KLC for every book shared</p>
              </div>
              
              <div className="bg-sidebar border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                <div className="text-4xl mb-3">🎁</div>
                <h3 className="font-semibold mb-2">Share for Free</h3>
                <p className="text-sm text-muted-foreground">Give books away to build community</p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
              {session ? (
                <>
                  <Button size="lg" asChild>
                    <Link href="/books/add">Add Your Book</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/listings">Browse All Books</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link href="/auth/signin">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#catalog">Browse Catalog</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Transfer types showcase */}
            <div className="mt-12 flex justify-center">
              <div className="inline-flex flex-wrap gap-3 items-center px-6 py-4 bg-sidebar/50 border border-border rounded-full">
                <span className="text-sm text-muted-foreground">Available options:</span>
                <span className="px-3 py-1 text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                  Free
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full">
                  1 KLC
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                  Trade
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">
                  Loan
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Catalog Section */}
      <div id="catalog" className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Available Books</h2>
            <p className="text-muted-foreground">
              Discover books shared by our community
            </p>
          </div>
          <Link href="/listings">
            <Button variant="outline">View All →</Button>
          </Link>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                showActions={!!session}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No books available yet. Be the first to share!
            </p>
            {session && (
              <Link href="/books/add">
                <Button>Add Your First Book</Button>
              </Link>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
