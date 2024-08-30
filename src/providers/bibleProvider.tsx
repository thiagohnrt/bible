"use client";

import { getTranslationPathname, getTranslationStorage, setTranslationStorage } from "@/lib/utils";
import { Translation } from "@/services/api";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, Dispatch, SetStateAction, useState, useEffect } from "react";

export const BibleContext = createContext<{
  translation: Translation | null;
  setTranslation: Dispatch<SetStateAction<Translation | null>> | (() => void);
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>> | (() => void);
}>({
  translation: null,
  setTranslation: () => null,
  isLoading: false,
  setLoading: () => null,
});

export function BibleProvider({ children }: { children: ReactNode }) {
  const [translationContext, setTranslationContext] = useState<Translation | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setTranslationContext(getTranslationStorage());
  }, []);

  useEffect(() => {
    const translationPathname = getTranslationPathname(pathname);
    if (pathname.includes("/bible") && !isVerified && translationPathname && translationContext) {
      setVerified(true);
      if (translationPathname.short_name !== translationContext.short_name) {
        setTranslationContext(translationPathname);
        setTranslationStorage(translationPathname);
      }
    }
  }, [isVerified, pathname, translationContext]);

  return (
    <BibleContext.Provider
      value={{ translation: translationContext, setTranslation: setTranslationContext, isLoading, setLoading }}
    >
      {isLoading ? (
        <div className="z-50 bg-background fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center">
          Carregando...
        </div>
      ) : (
        <></>
      )}
      {children}
    </BibleContext.Provider>
  );
}
