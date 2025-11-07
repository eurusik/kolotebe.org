import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CatalogLoading } from '@/components/shared/catalog-loading'

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <CatalogLoading />
      <Footer />
    </main>
  )
}
