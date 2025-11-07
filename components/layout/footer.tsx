'use client'

import Link from "next/link"
import { useTranslation } from "@/lib/i18n/locale-provider"

export function Footer() {
  const { t } = useTranslation()
  
  return (
    <footer className="border-t border-border mt-auto bg-sidebar">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Kolotebe</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-primary transition-colors">
                  {t('footer.browseBooks')}
                </Link>
              </li>
              <li>
                <Link href="/books/add" className="hover:text-primary transition-colors">
                  {t('footer.addBook')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-primary transition-colors">
                  {t('footer.helpCenter')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  {t('footer.contactUs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  {t('footer.termsOfService')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 Kolotebe. {t('footer.tagline')}
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Made with ❤️ in Ukraine</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
