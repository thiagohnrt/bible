"use client";

import { api, Book, Story, Translation, Verse } from "@/services/api";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { BibleContext } from "./bibleProvider";

interface ChapterData {
  translation: Translation;
  book: Book;
  chapter: number;
  verses: Verse[];
  stories: Story[];
}

export const ChapterContext = createContext<{
  data: ChapterData[];
  versesSelected: Verse[];
  setVersesSelected: Dispatch<SetStateAction<Verse[]>> | (() => void);
}>({
  data: [],
  versesSelected: [],
  setVersesSelected: () => null,
});

export function ChapterProvider({ children }: { readonly children: ReactNode }) {
  const { getTranslation, getBook } = useContext(BibleContext);
  const [data, setData] = useState<ChapterData[]>([]);
  const [versesSelected, setVersesSelected] = useState<Verse[]>([]);
  const value = useMemo(() => ({ data, versesSelected, setVersesSelected }), [data, versesSelected, setVersesSelected]);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isModified = (translationsId: string[], bookId: number, chapter: number) => {
      if (data.length === 0) {
        return true;
      }
      if (data.length !== translationsId.length) {
        return true;
      }
      if (translationsId.some((id) => !data.some((d) => d.translation.identifier === id))) {
        return true;
      }
      if (data[0].book.book !== bookId) {
        return true;
      }
      if (data[0].chapter !== chapter) {
        return true;
      }
    };

    const getVerses = (translationId: string, bookId: number, chapter: number) => {
      const translation = data.find((d) => d.translation.identifier === translationId);
      if (translation) {
        const result = translation.verses.some((v) => v.book === bookId && v.chapter === chapter);
        if (result) {
          return translation.verses;
        }
      }
      return api.getVerses(translationId, bookId, chapter);
    };
    const getStoriesByChapter = (id: string, bookId: number, chapter: number) => {
      const translation = data.find((d) => d.translation.identifier === id);
      if (translation) {
        const result = translation.stories.some((s) => s.book === bookId && s.chapter === chapter);
        if (result) {
          return translation.stories;
        }
      }
      return api.getStoriesByChapter(id, bookId, chapter);
    };

    const pathParts = pathname.split("/").slice(2);
    const translationId = pathParts[0];
    const bookId = parseInt(pathParts[1]);
    const chapter = parseInt(pathParts[2]);
    const parallels = searchParams.get("parallel")?.split(" ") || [];
    const translationsId = [translationId, ...parallels];

    if (isModified(translationsId, bookId, chapter)) {
      const translations = Promise.all(
        translationsId.map((id) =>
          Promise.all([
            getTranslation(id),
            getBook(id, bookId),
            getVerses(id, bookId, chapter),
            getStoriesByChapter(id, bookId, chapter),
          ]).then(([translation, book, verses, stories]) => ({
            translation,
            book,
            chapter,
            verses,
            stories,
          }))
        )
      );

      Promise.all([translations]).then(([results]) => {
        setData(results);
      });
    }
  }, [data, getBook, getTranslation, pathname, searchParams]);

  return <ChapterContext.Provider value={value}>{children}</ChapterContext.Provider>;
}
