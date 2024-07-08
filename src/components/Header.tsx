"use client";

import { BibleContext } from "@/contexts/bibleContext";
import Link from "next/link";
import { useContext } from "react";
import { PiLeafFill } from "react-icons/pi";

export default function Header() {
  const { version } = useContext(BibleContext);
  return (
    <header className="px-4 h-[60px] border-b flex items-center justify-between">
      <div className="content-left">
        <Link href="/" className="flex flex-nowrap items-center gap-1">
          <PiLeafFill size={18} />
          <h1>Bíblia</h1>
        </Link>
      </div>
      <div className="content-right">
        <div className="border border-neutral-600 rounded-full active:bg-neutral-900 transition-colors px-3 py-1 text-sm uppercase">
          {version}
        </div>
      </div>
    </header>
  );
}
