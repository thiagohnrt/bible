"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { PiLeafFill } from "react-icons/pi";
import { VersionChange } from "./VersionChange";
import { usePathname, useRouter } from "next/navigation";
import { getTranslation } from "@/lib/utils";
import { Translation } from "@/services/api";
import { BibleContext } from "@/providers/bibleProvider";
import { TRANSLATIONS_DEFAULT } from "@/constants/bible";
import { db } from "@/database/bibleDB";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [version, setVersion] = useState("");
  const { setLoading } = useContext(BibleContext);

  useEffect(() => {
    setVersion(getTranslation(pathname));
  }, [pathname]);

  const onTranslationSelected = async (translation: Translation) => {
    setLoading(true);
    await db.saveTranslation(translation.short_name);
    setLoading(false);
    const translationCurrent = getTranslation(pathname);
    router.push(pathname.replace(translationCurrent, translation.short_name));
  };

  useEffect(() => {
    const handleAppInstalled = (event: Event) => {
      db.saveLanguages();
      db.saveTranslation(getTranslation(pathname) || TRANSLATIONS_DEFAULT);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
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
        <VersionChange className={version || "hidden"} onTranslationSelected={onTranslationSelected}>
          <div className="border border-neutral-600 rounded-full active:bg-primary/30 transition-colors px-3 py-1 cursor-pointer">
            {version}
          </div>
        </VersionChange>
      </div>
    </header>
  );
}
