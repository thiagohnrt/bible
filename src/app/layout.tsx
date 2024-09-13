import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { CookieConsent } from "@/components/home/CookieConsent";
import { Body } from "@/components/root/Body";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/providers/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bíblia",
  description: "Bíblia",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Body className={inter.className}>
        <Providers>
          <Header />
          <main className="px-6 py-20 relative">{children}</main>
          <Footer />
          <Toaster />
          <CookieConsent />
        </Providers>
      </Body>
    </html>
  );
}
