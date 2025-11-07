'use client'

export function CatalogLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-2" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-sidebar border border-border rounded-lg p-4 animate-pulse">
            <div className="aspect-[2/3] bg-muted rounded mb-3" />
            <div className="h-5 bg-muted rounded mb-2" />
            <div className="h-4 bg-muted rounded w-3/4 mb-3" />
            <div className="flex gap-2 mb-3">
              <div className="h-6 w-16 bg-muted rounded-full" />
              <div className="h-6 w-16 bg-muted rounded-full" />
            </div>
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}
