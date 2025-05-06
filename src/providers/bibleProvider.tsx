"use client";

import { db, TranslationsOffline } from "@/database/bibleDB";
import { getTranslationPathname, getTranslationStorage, setTranslationStorage } from "@/lib/utils";
import { Translation } from "@/services/api";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, Dispatch, SetStateAction, useState, useEffect } from "react";

interface ContextProps {
  translation: Translation | null;
  setTranslation: Dispatch<SetStateAction<Translation | null>> | (() => void);
  translationsOffline: TranslationsOffline;
  setTranslationsOffline: Dispatch<SetStateAction<TranslationsOffline>> | (() => void);
}

export const BibleContext = createContext<ContextProps>({
  translation: null,
  setTranslation: () => null,
  translationsOffline: {},
  setTranslationsOffline: () => null,
});

export function BibleProvider({ children }: { children: ReactNode }) {
  const [translationCurrent, setTranslationCurrent] = useState<Translation | null>(null);
  const [translationsOffline, setTranslationsOffline] = useState<TranslationsOffline>({ INITIAL: "deleteFailed" });
  const [isVerified, setVerified] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setTranslationCurrent(getTranslationStorage());
    setTranslationsOffline(db.getTranslationsOffline());
  }, []);

  useEffect(() => {
    if (translationCurrent) {
      setTranslationStorage(translationCurrent);
    }
  }, [translationCurrent]);

  useEffect(() => {
    if (!translationsOffline["INITIAL"]) {
      db.setTranslationsOffline(translationsOffline);
    }
  }, [translationsOffline]);

  useEffect(() => {
    const translationPathname = getTranslationPathname(pathname);
    if (pathname.includes("/bible") && !isVerified && translationPathname && translationCurrent) {
      setVerified(true);
      if (translationPathname.identifier !== translationCurrent.identifier) {
        setTranslationCurrent(translationPathname);
        setTranslationStorage(translationPathname);
      }
    }
  }, [isVerified, pathname, translationCurrent]);

  return (
    <BibleContext.Provider
      value={{
        translation: translationCurrent,
        setTranslation: setTranslationCurrent,
        translationsOffline,
        setTranslationsOffline,
      }}
    >
      {children}
    </BibleContext.Provider>
  );
}
