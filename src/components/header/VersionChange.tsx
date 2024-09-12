"use client";

import { db } from "@/database/bibleDB";
import { setTranslationStorage } from "@/lib/utils";
import { BibleContext } from "@/providers/bibleProvider";
import { api, Language, Translation } from "@/services/api";
import { useCallback, useContext, useEffect, useState } from "react";
import { HiCheck, HiDownload } from "react-icons/hi";
import { IoLanguage } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { LanguageChange } from "./LanguageChange";
import * as bolls from "@/custom/bolls";

interface Props {
  children: React.ReactNode;
  className?: string;
  onTranslationSelected: (translation: Translation) => void;
}

interface Data {
  current: {
    language: Language | undefined;
    translation: string;
  };
  downloaded: Translation[];
  languages: Language[];
}

export function VersionChange({ children, className, onTranslationSelected }: Props) {
  const { translation: translationContext, setTranslation: setTranslationContext } = useContext(BibleContext);
  const [data, setData] = useState<Data>({
    current: {
      language: {} as Language,
      translation: "",
    },
    downloaded: [],
    languages: [],
  });

  const fetchLanguages = useCallback(async (translationCurrent: Translation) => {
    const languages = await api.getLanguages();
    const saved = db.getTranslationsSaved();

    const languageCurrent = languages.find(
      (lang) =>
        lang.translations.findIndex((translation) => translation.short_name === translationCurrent.short_name) > -1
    );

    const downloaded = languages
      .map((language) =>
        language.translations
          .map<Translation | null>((translation) => (saved[translation.short_name] === "done" ? translation : null))
          .filter((translation) => translation != null)
      )
      .flat();

    setData({
      current: {
        language: languageCurrent,
        translation: translationCurrent.short_name,
      },
      downloaded,
      languages,
    });
  }, []);

  useEffect(() => {
    if (translationContext) {
      fetchLanguages(translationContext);
    }
  }, [fetchLanguages, translationContext]);

  const setLanguage = (language: Language) => {
    setData({ ...data, current: { ...data.current, language } });
  };

  const sortTranslations = (translations: Translation[]) =>
    translations.sort((a, b) => a.short_name.localeCompare(b.short_name));

  const handleTranslationSelected = (translation: Translation) => {
    setTranslationContext(translation);
    setTranslationStorage(translation);
    onTranslationSelected(translation);
  };

  return (
    <Dialog id="translations">
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col h-svh w-lvw p-0">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>Versões</DialogTitle>
          <DialogDescription></DialogDescription>
          <LanguageChange languages={data.languages} current={data.current.language} onLanguageSelected={setLanguage}>
            <div className="pt-4">
              <div className="rounded-full flex justify-between gap-4 px-4 py-3 items-center bg-highlight-active cursor-pointer [&>*]:cursor-pointer">
                <IoLanguage />
                <label className="flex-auto">{data.current.language?.language}</label>
                <MdOutlineFilterList />
              </div>
            </div>
          </LanguageChange>
        </DialogHeader>
        <div className="p-6 pt-0 overflow-y-auto">
          {data.downloaded.length ? (
            <>
              <h2 className="text-lg font-bold mb-2">Minhas versões ({data.downloaded.length})</h2>
              {sortTranslations(data.downloaded).map((translation, t) => {
                return (
                  <DialogClose asChild key={t}>
                    <button
                      type="button"
                      onClick={() => handleTranslationSelected(translation)}
                      className="py-2 mb-1 flex flex-col w-full text-left outline-none"
                    >
                      <div className="w-full flex justify-between items-end">
                        <span>{bolls.translation(translation).short_name}</span>
                        {translation.short_name === data.current.translation ? <HiCheck /> : <></>}
                      </div>
                      <small className="opacity-50">{bolls.translation(translation).full_name}</small>
                    </button>
                  </DialogClose>
                );
              })}
            </>
          ) : (
            <></>
          )}
          {data.languages
            .filter((lang) => lang.language === data.current.language?.language)
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
                            onClick={() => handleTranslationSelected(translation)}
                            className="py-2 mb-1 flex flex-col w-full text-left outline-none"
                          >
                            <div className="w-full flex justify-between items-end">
                              <span>{bolls.translation(translation).short_name}</span>
                              {!db.util.hasTranslationSaved(translation.short_name) ? <HiDownload /> : <></>}
                            </div>
                            <small className="opacity-50">{bolls.translation(translation).full_name}</small>
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
