"use client";

import { db } from "@/database/bibleDB";
import { cn } from "@/lib/utils";
import { BibleContext } from "@/providers/bibleProvider";
import { Translation } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import imgLogoDark from "../../../public/bible_dark.png";
import imgLogoLight from "../../../public/bible_light.png";
import { Container } from "../root/Container";
import { VersionChange } from "./VersionChange";

interface Props {
  className?: string;
}

export default function Header({ className }: Props) {
  const {
    translation: translationCurrent,
    setTranslation: setTranslationContext,
    setTranslationsOffline,
  } = useContext(BibleContext);
  const pathname = usePathname();
  const router = useRouter();

  const onTranslationSelected = async (translation: Translation) => {
    // Por algum motivo a navegação não funciona sem esse sleep abaixo
    await new Promise((resolve) => setTimeout(resolve, 100));
    db.saveTranslation(translation.identifier, setTranslationsOffline);
    navigateToTranslation(translation);
    setTranslationContext(translation);
  };

  const onTranslationDeleted = (translationId: string) => {
    db.deleteTranslation(translationId, setTranslationsOffline);
  };

  const navigateToTranslation = async (translation: Translation) => {
    const newPath = pathname.replace(translationCurrent?.identifier!, translation.identifier);
    router.push(newPath);
  };

  useEffect(() => {
    const beforeunload = () => {
      const translationsOffline = db.getTranslationsOffline();
      for (let key in translationsOffline) {
        if (translationsOffline[key] === "downloading") {
          translationsOffline[key] = "downloadFailed";
        }
        if (translationsOffline[key] === "deleting") {
          translationsOffline[key] = "deleteFailed";
        }
      }
      db.setTranslationsOffline(translationsOffline);
    };

    window.addEventListener("beforeunload", beforeunload);

    return () => {
      window.removeEventListener("beforeunload", beforeunload);
    };
  }, [setTranslationsOffline]);

  useEffect(() => {
    const handleAppInstalled = (event: Event) => {
      if (translationCurrent) {
        db.saveLanguages();
        db.saveTranslation(translationCurrent.identifier, setTranslationsOffline);
      }
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [setTranslationsOffline, translationCurrent]);

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
