"use client";

import { db } from "@/database/bibleDB";
import { BibleContext } from "@/providers/bibleProvider";
import { Translation } from "@/services/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PiLeafFill } from "react-icons/pi";
import { VersionChange } from "./VersionChange";

export default function Header() {
  const { translation: translationCurrent, setLoading } = useContext(BibleContext);
  const pathname = usePathname();
  const router = useRouter();

  const onTranslationSelected = async (translation: Translation) => {
    setLoading(true);
    await db.saveTranslation(translation.short_name);
    setLoading(false);
    router.push(pathname.replace(translationCurrent?.short_name!, translation.short_name));
  };

  useEffect(() => {
    const handleAppInstalled = (event: Event) => {
      if (translationCurrent) {
        db.saveLanguages();
        db.saveTranslation(translationCurrent.short_name);
      }
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [translationCurrent]);

  return (
    <header className="px-6 h-16 border-b flex items-center justify-between">
      <div className="content-left">
        <Link href="/" className="flex flex-nowrap items-center gap-1">
          <PiLeafFill size={18} />
          <h1 className="text-lg">Bíblia</h1>
        </Link>
      </div>
      <div className="content-right">
        {pathname.includes("/bible") && translationCurrent ? (
          <VersionChange onTranslationSelected={onTranslationSelected}>
            <div className="border border-neutral-600 rounded-full active:bg-primary/30 transition-colors px-3 py-1 cursor-pointer">
              {translationCurrent.short_name}
            </div>
          </VersionChange>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
