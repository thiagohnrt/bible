import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { cn } from "@/lib/utils";
import BottomNavigator from "@/components/home/BottomNavigator";
import { BibleProvider } from "@/providers/bibleProvider";

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
      <body className={cn(inter.className, "dark")}>
        <BibleProvider>
          <Header />
          <main className="px-6 pt-6 pb-24 relative">{children}</main>
          <BottomNavigator />
        </BibleProvider>
      </body>
    </html>
  );
}
