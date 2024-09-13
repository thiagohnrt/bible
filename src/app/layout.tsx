import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Body } from "@/components/root/Body";
import { BibleProvider } from "@/providers/bibleProvider";
import { DialogProvider } from "@/providers/dialogProvider";
import { CookieConsent } from "@/components/home/CookieConsent";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/themeProvider";

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
        <ThemeProvider attribute="class" defaultTheme="system">
          <BibleProvider>
            <DialogProvider>
              <Header />
              <main className="px-6 py-20 relative">{children}</main>
              <Footer />
            </DialogProvider>
          </BibleProvider>
          <Toaster />
          <CookieConsent />
        </ThemeProvider>
      </Body>
    </html>
  );
}
