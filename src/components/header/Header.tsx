"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PiLeafFill } from "react-icons/pi";
import { VersionChange } from "./VersionChange";
import { usePathname } from "next/navigation";
import { getVersion } from "@/lib/utils";

export default function Header() {
  const path = usePathname();
  const [version, setVersion] = useState("");

  useEffect(() => {
    setVersion(getVersion(path));
  }, [path]);

  return (
    <header className="px-4 h-[60px] border-b flex items-center justify-between">
      <div className="content-left">
        <Link href="/" className="flex flex-nowrap items-center gap-1">
          <PiLeafFill size={18} />
          <h1>Bíblia</h1>
        </Link>
      </div>
      <div className="content-right">
        <VersionChange className={version || "hidden"}>
          <div className="border border-neutral-600 rounded-full active:bg-neutral-900 transition-colors px-3 py-1 text-sm uppercase">
            {version}
          </div>
        </VersionChange>
      </div>
    </header>
  );
}
