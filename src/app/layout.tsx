import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import BottomNavigator from "@/components/BottomNavigator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bíblia",
  description: "Bíblia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark")}>
        <Header />
        <main className="px-4 pt-3 pb-24">{children}</main>
      </body>
    </html>
  );
}
