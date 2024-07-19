"use client";

import { api, Language, Translation } from "@/services/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getTranslation } from "@/lib/utils";
import { IoLanguage } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import { LanguageChange } from "./LanguageChange";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function VersionChange({ children, className }: Props) {
  const [language, setLanguage] = useState<Language | undefined>(
    {} as Language
  );
  const [languages, setLanguages] = useState<Language[]>([]);
  const path = usePathname();
  const router = useRouter();

  const setLanguageCurrent = useCallback(
    (languages: Language[]) => {
      const translationCurrent = getTranslation(path);

      const languageCurrent = languages.find(
        (lang) =>
          lang.translations.findIndex(
            (translation) => translation.short_name === translationCurrent
          ) > -1
      );

      setLanguage(languageCurrent);
    },
    [path]
  );

  const fetchLanguages = useCallback(async () => {
    const data = await api.getLanguages();
    setLanguages(data);
    setLanguageCurrent(data);
  }, [setLanguageCurrent]);

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  const onTranslationSelected = (translation: Translation) => {
    const translationCurrent = getTranslation(path);
    router.push(path.replace(translationCurrent, translation.short_name));
  };

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col h-lvh w-lvw p-0">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>Versões</DialogTitle>
          <LanguageChange
            languages={languages}
            onLanguageSelected={setLanguage}
          >
            <div className="pt-4">
              <div className="bg-primary/25 rounded-full flex justify-between gap-4 px-4 py-2 items-center">
                <IoLanguage />
                <label className="flex-auto">{language?.language}</label>
                <MdOutlineFilterList />
              </div>
            </div>
          </LanguageChange>
        </DialogHeader>
        <div className="p-6 pt-0 overflow-y-auto">
          {languages
            .filter((lang) => lang.language === language?.language)
            .map((language, l) => {
              return (
                <div key={l}>
                  {language.translations.map((translation, t) => {
                    return (
                      <DialogClose asChild key={t}>
                        <button
                          type="button"
                          onClick={() => onTranslationSelected(translation)}
                          className="py-1 mb-1 flex flex-col w-full text-left outline-none"
                        >
                          <span className="opacity-50">
                            {translation.short_name}
                          </span>
                          <small>{translation.full_name}</small>
                        </button>
                      </DialogClose>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
