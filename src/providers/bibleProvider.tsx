"use client";

import { db, TranslationsOffline } from "@/database/bibleDB";
import { getTranslationPathname, getTranslationStorage, setTranslationStorage } from "@/lib/utils";
import { api, Book, Language, Translation } from "@/services/api";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";

interface ContextProps {
  // Current translation
  translation: Translation | null;
  setTranslation: Dispatch<SetStateAction<Translation | null>> | (() => void);
  // Parallel translations
  translationsParallel: Translation[] | null;
  setTranslationsParallel: Dispatch<SetStateAction<Translation[] | null>> | (() => void);
  // Translations offline
  translationsOffline: TranslationsOffline;
  setTranslationsOffline: Dispatch<SetStateAction<TranslationsOffline>> | (() => void);
  // Books of the current translation
  books: Book[];
  getBook: (translationId: string, bookId: number) => Promise<Book>;
  // All translations
  translations: Translation[];
  getTranslation: (translationId: string) => Promise<Translation>;
  // All languages
  languages: Language[];
  setLanguages: Dispatch<SetStateAction<Language[]>> | (() => void);
}

export const BibleContext = createContext<ContextProps>({
  translation: null,
  setTranslation: () => null,
  translationsParallel: [],
  setTranslationsParallel: () => null,
  translationsOffline: {},
  setTranslationsOffline: () => null,
  books: [],
  getBook: (translationId: string, bookId: number) => {
    return new Promise((resolve) => {
      resolve({} as Book);
    });
  },
  translations: [],
  getTranslation: (translationId: string) => {
    return new Promise((resolve) => {
      resolve({} as Translation);
    });
  },
  languages: [],
  setLanguages: () => null,
});

export function BibleProvider({ children }: { children: ReactNode }) {
  const [translationCurrent, setTranslationCurrent] = useState<Translation | null>(null);
  const [translationsParallel, setTranslationsParallel] = useState<Translation[] | null>(null);
  const [translationsOffline, setTranslationsOffline] = useState<TranslationsOffline>({ INITIAL: "deleteFailed" });
  const [books, setBooks] = useState<Book[]>([]);
  const booksRef = useRef<Book[]>(books);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const translationsRef = useRef<Translation[]>(translations);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isVerified, setVerified] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    if (translations.length === 0) {
      return;
    }
    const parallels = searchParams.get("parallel")?.split(" ") || [];
    const translationsParallel = parallels.map((p) => {
      const translation = translations.find((t) => t.identifier === p);
      if (translation) {
        return translation;
      }
      return null;
    });
    setTranslationsParallel(translationsParallel.filter((t) => t !== null) as Translation[]);
  }, [searchParams, translations]);

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

  useEffect(() => {
    if (translationCurrent && translationsParallel) {
      const translationsId = translationsParallel.map((t) => t.identifier);
      translationsId.push(translationCurrent.identifier);

      if (books.length === 0) {
        api.getBooks2(translationsId).then((books) => {
          booksRef.current = books;
          setBooks(books);
        });
      } else {
        const translationsToDownload = translationsId.filter((id) => {
          return !booksRef.current.some((b) => b.translation === id);
        });
        if (translationsToDownload.length > 0) {
          api.getBooks2(translationsToDownload).then((books) => {
            booksRef.current = [...booksRef.current, ...books];
            setBooks(booksRef.current);
          });
        }
      }
    }
  }, [books, translationCurrent, translationsParallel]);

  useEffect(() => {
    api.getLanguages().then(setLanguages);
  }, []);

  useEffect(() => {
    if (languages.length > 0) {
      const translations = languages.map((l) => l.translations).flat();
      setTranslations(translations);
      translationsRef.current = translations;
    }
  }, [languages]);

  const getBook = async (translationId: string, bookId: number): Promise<Book> => {
    let tries = 0;
    while (booksRef.current.filter((b) => b.translation === translationId).length === 0 && tries < 300) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      tries++;
    }

    const getById = (translationId: string, bookId: number) => {
      return booksRef.current.find((b) => b.translation === translationId && b.book == bookId);
    };

    const book = getById(translationId, bookId);
    if (book) {
      return {
        ...book,
        bookPrev: getById(translationId, +bookId - 1),
        bookNext: getById(translationId, +bookId + 1),
      };
    } else {
      throw new Error("Book not found");
    }
  };

  const getTranslation = async (translationId: string) => {
    let tries = 0;
    while (translationsRef.current.length === 0 && tries < 300) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      tries++;
    }
    const translation = translationsRef.current.find((t) => t.identifier === translationId);
    if (translation) {
      return translation;
    } else {
      throw new Error("Translation not found");
    }
  };

  return (
    <BibleContext.Provider
      value={{
        translation: translationCurrent,
        setTranslation: setTranslationCurrent,
        translationsParallel,
        setTranslationsParallel,
        translationsOffline,
        setTranslationsOffline,
        books,
        getBook,
        translations,
        getTranslation,
        languages,
        setLanguages,
      }}
    >
      {children}
    </BibleContext.Provider>
  );
}
