"use client";

import { db } from "@/database/bibleDB";
import { BibleContext } from "@/providers/bibleProvider";
import { Translation } from "@/services/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { VersionChange } from "./VersionChange";
import * as bolls from "@/custom/bolls";
import { cn } from "@/lib/utils";
import Image from "next/image";
import imgLogoLight from "../../../public/bible_light.png";
import imgLogoDark from "../../../public/bible_dark.png";

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
    <header
      className={cn(
        "fixed left-0 right-0 px-6 h-16 z-10",
        "bg-background border-b flex items-center justify-between",
        "transition-all duration-500"
      )}
    >
      <div className="content-left">
        <Link href="/" className="flex flex-nowrap items-center gap-2">
          <Image src={imgLogoLight} alt="Bíblia" width={18} className="block dark:hidden" />
          <Image src={imgLogoDark} alt="Bíblia" width={18} className="hidden dark:block" />
          <h1 className="text-xl">Bíblia</h1>
        </Link>
      </div>
      <div className="content-right">
        {pathname.includes("/bible") && translationCurrent ? (
          <VersionChange onTranslationSelected={onTranslationSelected}>
            <div className="border border-neutral-600 rounded-full active:bg-primary/30 transition-colors px-3 py-1 cursor-pointer">
              {bolls.translation(translationCurrent).short_name}
            </div>
          </VersionChange>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
