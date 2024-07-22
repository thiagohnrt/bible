"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PiLeafFill } from "react-icons/pi";
import { VersionChange } from "./VersionChange";
import { usePathname } from "next/navigation";
import { getTranslation } from "@/lib/utils";

export const BIBLE_HISTORY = "bible_history";

export default function Header() {
  const pathname = usePathname();
  const [version, setVersion] = useState("");

  useEffect(() => {
    setVersion(getTranslation(pathname));
    if (pathname.startsWith("/bible")) {
      localStorage.setItem(BIBLE_HISTORY, pathname);
    }
  }, [pathname]);

  return (
    <header className="px-6 h-16 border-b flex items-center justify-between">
      <div className="content-left">
        <Link href="/" className="flex flex-nowrap items-center gap-1">
          <PiLeafFill size={18} />
          <h1 className="text-lg">Bíblia</h1>
        </Link>
      </div>
      <div className="content-right">
        <VersionChange className={version || "hidden"}>
          <div className="border border-neutral-600 rounded-full active:bg-primary/30 transition-colors px-3 py-1">
            {version}
          </div>
        </VersionChange>
      </div>
    </header>
  );
}
