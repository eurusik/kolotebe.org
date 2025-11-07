import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Kolotebe - Book Sharing Platform",
  description: "Share books, earn Kolocoins, and build a reading community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <SessionProvider>
          <LocaleProvider>
            {children}
          </LocaleProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
