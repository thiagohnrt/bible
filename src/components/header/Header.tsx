"use client";

import { db } from "@/database/bibleDB";
import { cn } from "@/lib/shad";
import { BibleContext } from "@/providers/bibleProvider";
import { api, Translation } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import imgLogo from "../../../public/biblehonor_logo.png";
import { Container } from "../root/Container";
import { DialogConfirm } from "../root/DialogConfirm";
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
  const [translations, setTranslations] = useState<Translation[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const parallels = useMemo(() => searchParams.get("parallel")?.split(" ") || [], [searchParams]);

  const onTranslationSelected = async (translation: Translation) => {
    // Por algum motivo a navegação não funciona sem esse sleep abaixo
    await new Promise((resolve) => setTimeout(resolve, 100));
    db.saveTranslation(translation.identifier, setTranslationsOffline);
    navigateToTranslation(translation);
    setTranslationContext(translation);
  };

  const onTranslationParallelSelected = async (translation: Translation, translationToReplace?: Translation) => {
    // Por algum motivo a navegação não funciona sem esse sleep abaixo
    await new Promise((resolve) => setTimeout(resolve, 100));
    db.saveTranslation(translation.identifier, setTranslationsOffline);
    const versions = searchParams.get("parallel")?.split(" ") || [];
    if (translationToReplace) {
      const index = versions.indexOf(translationToReplace.identifier);
      versions[index] = translation.identifier;
    } else {
      versions.push(translation.identifier);
    }
    const path = `${pathname}?parallel=${versions.join("+")}`;
    router.push(path);
  };

  const onTranslationParallelRemove = async (translationId: string) => {
    // Por algum motivo a navegação não funciona sem esse sleep abaixo
    await new Promise((resolve) => setTimeout(resolve, 100));
    const versions = searchParams.get("parallel")?.split(" ") || [];
    const index = versions.indexOf(translationId);
    versions.splice(index, 1);
    const path = versions.length ? `${pathname}?parallel=${versions.join("+")}` : pathname;
    router.push(path);
  };

  const onTranslationDeleted = (translationId: string) => {
    db.deleteTranslation(translationId, setTranslationsOffline);
  };

  const navigateToTranslation = async (translation: Translation) => {
    const newPath = pathname.replace(translationCurrent?.identifier!, translation.identifier);
    router.push(newPath);
  };

  useEffect(() => {
    if (translationCurrent) {
      const versions = [translationCurrent.identifier, ...parallels];
      api.getTranslations().then((translations) => {
        setTranslations(
          translations
            .filter((t) => versions.includes(t.identifier))
            .sort((a, b) => versions.indexOf(a.identifier) - versions.indexOf(b.identifier))
        );
      });
    }
  }, [parallels, translationCurrent]);

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
            <Image src={imgLogo} alt="BibleHonor" width={28} />
            <h1 className="text-xl">BibleHonor</h1>
          </Link>
        </div>
        <div className="content-right flex">
          {pathname.includes("/bible") && translationCurrent ? (
            <div className="flex items-stretch border border-neutral-600 rounded-full">
              {translations.map((translation, i) => {
                return (
                  <div
                    key={translation.identifier}
                    className={cn(
                      "flex items-center hover:bg-primary/20 cursor-pointer transition-colors",
                      i === 0 ? "px-2 rounded-l-full" : ""
                    )}
                  >
                    <VersionChange
                      onTranslationSelected={
                        translation.identifier === translationCurrent.identifier
                          ? onTranslationSelected
                          : (translationSelected) => onTranslationParallelSelected(translationSelected, translation)
                      }
                      onTranslationDeleted={onTranslationDeleted}
                    >
                      <div title={translation.full_name} className={cn("flex items-center self-stretch px-2 py-1")}>
                        {translation.short_name}
                      </div>
                    </VersionChange>
                    {translation.identifier !== translationCurrent.identifier ? (
                      <DialogConfirm
                        message={
                          <>
                            <span>Deseja remover essa versão paralela?</span>
                            <span className="flex items-center gap-2">
                              <span>{translation.short_name}</span>
                              <span className="opacity-50">{translation.full_name}</span>
                            </span>
                          </>
                        }
                        onConfirm={() => onTranslationParallelRemove(translation.identifier)}
                      >
                        <div
                          title="Clique para remover esta versão paralela"
                          className={cn(
                            "hidden sm:flex items-center self-stretch px-1 hover:bg-primary/30 transition-colors"
                          )}
                        >
                          <RiCloseCircleLine />
                        </div>
                      </DialogConfirm>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
              <div
                title="Clique para adicionar uma versão paralela"
                className="hidden sm:flex items-center py-2 pl-2 pr-3 rounded-r-full hover:bg-primary/20 cursor-pointer transition-colors"
              >
                <VersionChange
                  onTranslationSelected={onTranslationParallelSelected}
                  onTranslationDeleted={onTranslationDeleted}
                >
                  <FiPlus />
                </VersionChange>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </header>
  );
}
