import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "./providers";
import { getLocale } from "@/lib/i18n/get-locale";
import { auth } from "@/lib/auth/config";
import { checkUserRole } from "@/lib/auth/roles";
import { ProgressBar } from "@/components/shared/progress-bar";
import { NavigationEvents } from "@/components/shared/navigation-events";

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

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
  
  // Check if user is developer (server-side)
  let isDeveloper = false
  if (session?.user?.email) {
    const roleCheck = await checkUserRole(session.user.email)
    isDeveloper = roleCheck.isDeveloper
  }
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} font-sans`} suppressHydrationWarning>
        <ProgressBar />
        <NavigationEvents />
        <Providers locale={locale}>
          <Header session={session} isDeveloper={isDeveloper} />
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
