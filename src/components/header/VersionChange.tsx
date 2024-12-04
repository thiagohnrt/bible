"use client";

import { db } from "@/database/bibleDB";
import { sortTranslations } from "@/lib/utils";
import { BibleContext } from "@/providers/bibleProvider";
import { api, Language, Translation } from "@/services/api";
import { useCallback, useContext, useEffect, useState } from "react";
import { HiCheck, HiDownload, HiOutlineMinusCircle } from "react-icons/hi";
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
import { DeleteVersionConfirm } from "./DeleteVersionConfirm";
import { CgSpinner } from "react-icons/cg";
import { RiErrorWarningLine } from "react-icons/ri";

interface Props {
  children: React.ReactNode;
  className?: string;
  onTranslationSelected: (translation: Translation) => void;
  onTranslationDeleted: (translationId: string) => void;
}

interface Data {
  current: {
    language: Language | undefined;
    translation: string;
  };
  downloaded: Translation[];
  languages: Language[];
}

export function VersionChange({ children, className, onTranslationSelected, onTranslationDeleted }: Props) {
  const { translation: translationContext, translationsOffline } = useContext(BibleContext);
  const [data, setData] = useState<Data>({
    current: {
      language: {} as Language,
      translation: "",
    },
    downloaded: [],
    languages: [],
  });

  useEffect(() => {
    if (!translationContext) {
      return;
    }
    (async () => {
      const languages = await api.getLanguages();

      const languageCurrent = languages.find(
        (lang) =>
          lang.translations.findIndex((translation) => translation.identifier === translationContext.identifier) > -1
      );

      const downloaded = languages
        .map((language) =>
          language.translations
            .map<Translation | null>((translation) =>
              translationsOffline[translation.identifier] === "downloaded" ? translation : null
            )
            .filter((translation) => translation != null)
        )
        .flat();

      setData({
        current: {
          language: languageCurrent,
          translation: translationContext.identifier,
        },
        downloaded,
        languages,
      });
    })();
  }, [translationContext, translationsOffline]);

  const setLanguage = (language: Language) => {
    setData({ ...data, current: { ...data.current, language } });
  };

  return (
    <Dialog id="translations">
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
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
                  <div className="flex items-center" key={t}>
                    <DialogClose asChild>
                      <button
                        type="button"
                        onClick={() => onTranslationSelected(translation)}
                        className="py-2 mb-1 flex items-center w-full outline-none"
                      >
                        <div className="flex-auto flex flex-col text-left">
                          <span>{translation.short_name}</span>
                          <small className="opacity-50">{translation.full_name}</small>
                        </div>
                        <div className="flex-initial flex justify-center">
                          {translation.identifier === data.current.translation ? <HiCheck /> : <></>}
                        </div>
                      </button>
                    </DialogClose>
                    <>
                      {translation.identifier !== data.current.translation ? (
                        <DeleteVersionConfirm translation={translation} onDelete={onTranslationDeleted}>
                          <div className="p-3 -mr-3">
                            <HiOutlineMinusCircle />
                          </div>
                        </DeleteVersionConfirm>
                      ) : (
                        <></>
                      )}
                    </>
                  </div>
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
                            onClick={() => onTranslationSelected(translation)}
                            className="py-2 mb-1 flex flex-col w-full text-left outline-none"
                          >
                            <div className="w-full flex justify-between items-end">
                              <span>{translation.short_name}</span>
                              {!translationsOffline[translation.identifier] ? <HiDownload /> : <></>}
                              {translationsOffline[translation.identifier] === "downloading" ? (
                                <CgSpinner className="animate-spin" />
                              ) : (
                                <></>
                              )}
                              {translationsOffline[translation.identifier] === "downloadFailed" ? (
                                <RiErrorWarningLine />
                              ) : (
                                <></>
                              )}
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
