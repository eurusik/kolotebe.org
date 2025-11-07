'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { useSession } from "next-auth/react"

export function HeroSection() {
  const { t } = useTranslation()
  const { data: session } = useSession()

  return (
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
              {t('home.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.description')}
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-sidebar border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-semibold mb-2">{t('home.features.listBooks')}</h3>
              <p className="text-sm text-muted-foreground">{t('home.features.listBooksDesc')}</p>
            </div>
            
            <div className="bg-sidebar border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-semibold mb-2">{t('home.features.tradeLoan')}</h3>
              <p className="text-sm text-muted-foreground">{t('home.features.tradeLoanDesc')}</p>
            </div>
            
            <div className="bg-sidebar border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="text-4xl mb-3">🪙</div>
              <h3 className="font-semibold mb-2">{t('home.features.earnCoins')}</h3>
              <p className="text-sm text-muted-foreground">{t('home.features.earnCoinsDesc')}</p>
            </div>
            
            <div className="bg-sidebar border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="font-semibold mb-2">{t('home.features.shareFree')}</h3>
              <p className="text-sm text-muted-foreground">{t('home.features.shareFreeDesc')}</p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            {session ? (
              <>
                <Button size="lg" asChild>
                  <Link href="/books/add">{t('listings.addYourBook')}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/listings">{t('listings.title')}</Link>
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/auth/signin">{t('home.getStarted')}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#catalog">{t('home.browseCatalog')}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Transfer types showcase */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex flex-wrap gap-3 items-center px-6 py-4 bg-sidebar/50 border border-border rounded-full">
              <span className="text-sm text-muted-foreground">{t('home.availableOptions')}:</span>
              <span className="px-3 py-1 text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                {t('transferTypes.FREE')}
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full">
                1 KLC
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                {t('transferTypes.TRADE')}
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">
                {t('transferTypes.LOAN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
