"use client";

import { api, Language, Translation } from "@/services/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getTranslation } from "@/lib/utils";
import { IoLanguage } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import { LanguageChange } from "./LanguageChange";
import { HiDownload } from "react-icons/hi";
import { db } from "@/database/bibleDB";

interface Props {
  children: React.ReactNode;
  className?: string;
  onTranslationSelected: (translation: Translation) => void;
}

interface Languages {
  downloaded: Translation[];
  languages: Language[];
}

export function VersionChange({ children, className, onTranslationSelected }: Props) {
  const [language, setLanguage] = useState<Language | undefined>({} as Language);
  const [languages, setLanguages] = useState<Languages>({ downloaded: [], languages: [] });
  const pathname = usePathname();

  const setLanguageCurrent = useCallback(
    (languages: Language[]) => {
      const translationCurrent = getTranslation(pathname);

      const languageCurrent = languages.find(
        (lang) => lang.translations.findIndex((translation) => translation.short_name === translationCurrent) > -1
      );

      setLanguage(languageCurrent);
    },
    [pathname]
  );

  const fetchLanguages = useCallback(async () => {
    const languages = await api.getLanguages();
    const saved = db.getTranslationsSaved();
    const downloaded = languages
      .map((language) =>
        language.translations
          .map<Translation | null>((translation) => (saved[translation.short_name] === "done" ? translation : null))
          .filter((translation) => translation != null)
      )
      .flat();
    setLanguages({
      downloaded,
      languages,
    });
    setLanguageCurrent(languages);
  }, [setLanguageCurrent]);

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  const sortTranslations = (translations: Translation[]) =>
    translations.sort((a, b) => a.short_name.localeCompare(b.short_name));

  const checkTranslationDownloaded = (translation: string): string =>
    db.util.hasTranslationSaved(translation) ? "hidden" : "";

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col h-svh w-lvw p-0">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>Versões</DialogTitle>
          <DialogDescription></DialogDescription>
          <LanguageChange languages={languages.languages} onLanguageSelected={setLanguage}>
            <div className="pt-4">
              <div className="rounded-full flex justify-between gap-4 px-4 py-3 items-center bg-highlight-active">
                <IoLanguage />
                <label className="flex-auto">{language?.language}</label>
                <MdOutlineFilterList />
              </div>
            </div>
          </LanguageChange>
        </DialogHeader>
        <div className="p-6 pt-0 overflow-y-auto">
          {languages.downloaded.length ? (
            <>
              <h2 className="text-lg font-bold mb-2">Minhas versões ({languages.downloaded.length})</h2>
              {sortTranslations(languages.downloaded).map((translation, t) => {
                return (
                  <DialogClose asChild key={t}>
                    <button
                      type="button"
                      onClick={() => onTranslationSelected(translation)}
                      className="py-2 mb-1 flex flex-col w-full text-left outline-none"
                    >
                      <div className="w-full flex justify-between items-end">
                        <span>{translation.short_name}</span>
                        <HiDownload className={checkTranslationDownloaded(translation.short_name)} />
                      </div>
                      <small className="opacity-50">{translation.full_name}</small>
                    </button>
                  </DialogClose>
                );
              })}
            </>
          ) : (
            <></>
          )}
          {languages.languages
            .filter((lang) => lang.language === language?.language)
            .map((language, l) => {
              return (
                <div key={l}>
                  <h2 className="text-lg font-bold mb-2 mt-4">Disponíveis ({language.translations.length})</h2>
                  <div>
                    {sortTranslations(language.translations).map((translation, t) => {
                      return (
                        <DialogClose asChild key={t}>
                          <button
                            type="button"
                            onClick={() => onTranslationSelected(translation)}
                            className="py-2 mb-1 flex flex-col w-full text-left outline-none"
                          >
                            <div className="w-full flex justify-between items-end">
                              <span>{translation.short_name}</span>
                              <HiDownload className={checkTranslationDownloaded(translation.short_name)} />
                            </div>
                            <small className="opacity-50">{translation.full_name}</small>
                          </button>
                        </DialogClose>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
