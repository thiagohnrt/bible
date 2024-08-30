import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { cn } from "@/lib/utils";
import BottomNavigator from "@/components/home/BottomNavigator";
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
      <body className={cn(inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <BibleProvider>
            <DialogProvider>
              <Header />
              <main className="px-6 pt-6 pb-24 relative">{children}</main>
              <BottomNavigator />
            </DialogProvider>
          </BibleProvider>
          <Toaster />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
