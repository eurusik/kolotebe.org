import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "./providers";
import { getLocale } from "@/lib/i18n/get-locale";
import { auth } from "@/lib/auth/config";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Kolotebe - Book Sharing Platform",
  description: "Share books, earn Kolocoins, and build a reading community",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale()
  const session = await auth()
  
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers locale={locale}>
          <Header session={session} />
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
