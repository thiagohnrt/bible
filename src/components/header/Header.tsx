"use client";

import { db } from "@/database/bibleDB";
import { BibleContext } from "@/providers/bibleProvider";
import { Translation } from "@/services/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { VersionChange } from "./VersionChange";
import { cn } from "@/lib/utils";
import Image from "next/image";
import imgLogoLight from "../../../public/bible_light.png";
import imgLogoDark from "../../../public/bible_dark.png";
import { Container } from "../root/Container";

interface Props {
  className?: string;
}

export default function Header({ className }: Props) {
  const { translation: translationCurrent, setTranslationsOffline, setLoading } = useContext(BibleContext);
  const pathname = usePathname();
  const router = useRouter();

  const saveTranslation = useCallback(
    async (translationId: string) => {
      await db.saveTranslation(translationId);
      setTranslationsOffline(db.getTranslationsOffline());
    },
    [setTranslationsOffline]
  );

  const onTranslationSelected = async (translation: Translation) => {
    setLoading(true);
    await saveTranslation(translation.identifier);
    setLoading(false);
    router.push(pathname.replace(translationCurrent?.identifier!, translation.identifier));
  };

  const onTranslationDeleted = async (translationId: string) => {
    if (db.util.hasTranslationSaved(translationId)) {
      db.deleteTranslation(translationId)
        .then(() => {
          const translationsUpdated = db.getTranslationsOffline();
          delete translationsUpdated[translationId];
          setTranslationsOffline(translationsUpdated);
        })
        .catch(() => {
          const translationsUpdated = db.getTranslationsOffline();
          translationsUpdated[translationId] = "errorDeleting";
          setTranslationsOffline(translationsUpdated);
        });

      const translationsUpdated = db.getTranslationsOffline();
      translationsUpdated[translationId] = "deleting";
      setTranslationsOffline(translationsUpdated);
    }
  };

  useEffect(() => {
    const handleAppInstalled = (event: Event) => {
      if (translationCurrent) {
        db.saveLanguages();
        saveTranslation(translationCurrent.identifier);
      }
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [saveTranslation, translationCurrent]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 h-16 z-10 flex bg-background border-b",
        "transition-transform duration-500",
        className
      )}
    >
      <Container className="flex px-6 items-center justify-between">
        <div className="content-left">
          <Link href="/" className="flex flex-nowrap items-center gap-2">
            <Image src={imgLogoLight} alt="Bíblia" width={18} className="block dark:hidden" />
            <Image src={imgLogoDark} alt="Bíblia" width={18} className="hidden dark:block" />
            <h1 className="text-xl">Bíblia</h1>
          </Link>
        </div>
        <div className="content-right">
          {pathname.includes("/bible") && translationCurrent ? (
            <VersionChange onTranslationSelected={onTranslationSelected} onTranslationDeleted={onTranslationDeleted}>
              <div className="border border-neutral-600 rounded-full active:bg-primary/30 transition-colors px-3 py-1 cursor-pointer">
                {translationCurrent.short_name}
              </div>
            </VersionChange>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </header>
  );
}
