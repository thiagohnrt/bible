import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { CookieConsent } from "@/components/home/CookieConsent";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/providers/providers";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BibleHonor",
  description:
    "BibleHonor é um aplicativo bíblico gratuito que permite que você leia a Bíblia em vários idiomas e versões.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="py-20 md:pb-0 relative">{children}</main>
          <Footer />
          <Sonner />
          <Toaster />
          <CookieConsent />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
