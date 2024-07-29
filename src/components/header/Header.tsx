"use client";

import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import { PiLeafFill } from "react-icons/pi";
import { VersionChange } from "./VersionChange";
import { usePathname, useRouter } from "next/navigation";
import { getTranslation } from "@/lib/utils";
import { api, Translation, Verse } from "@/services/api";
import { SettingIDB, useIndexedDB } from "@/services/idb";
import { BibleContext } from "@/providers/bibleProvider";

export const BIBLE_HISTORY = "bible_history";
export const TRANSLATION_SAVED = "translation_saved";

const openIDB: SettingIDB = {
  dbName: "bibleDB",
  dbVersion: 1,
  store: {
    name: "translation",
    keyPath: "id",
    autoIncrement: true,
  },
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [version, setVersion] = useState("");
  const idb = useIndexedDB<Verse>(openIDB);
  const { setLoading } = useContext(BibleContext);

  useEffect(() => {
    setVersion(getTranslation(pathname));
    if (pathname.startsWith("/bible")) {
      localStorage.setItem(BIBLE_HISTORY, pathname);
    }
  }, [pathname]);

  const saveTranslation = useCallback(
    async (translation: string) => {
      const saved: string[] = JSON.parse(localStorage.getItem(TRANSLATION_SAVED) || "[]");
      if (!saved.includes(translation)) {
        setLoading(true);
        const data = await api.getTranslationData(translation);
        await idb.addAll(data);
        localStorage.setItem(TRANSLATION_SAVED, JSON.stringify([...saved, translation]));
        setLoading(false);
      }
      const translationCurrent = getTranslation(pathname);
      router.push(pathname.replace(translationCurrent, translation));
    },
    [idb, pathname, router, setLoading]
  );

  useEffect(() => {
    if (version && version !== getTranslation(pathname)) {
      saveTranslation(version);
    }
  }, [pathname, saveTranslation, version]);

  const onTranslationSelected = async (translation: Translation) => {
    setVersion(translation.short_name);
  };

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
          <div className="border border-neutral-600 rounded-full active:bg-primary/30 transition-colors px-3 py-1">
            {version}
          </div>
        </VersionChange>
      </div>
    </header>
  );
}
