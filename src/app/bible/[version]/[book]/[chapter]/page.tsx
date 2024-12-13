"use client";

import { api, Book, Translation, Verse as IVerse } from "@/services/api";
import { ChapterProps } from "./layout";
import { cn, getBibleHistory, repeat, setBibleHistory } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { VerseDrawer } from "@/components/chapter/VerseDrawer";
import { ChapterProvider } from "@/providers/chapterProvider";
import VerseAction from "@/components/chapter/VerseAction";
import { CommentDrawer } from "@/components/chapter/CommentDrawer";

interface Data {
  translation: Translation;
  book: Book;
  verses: IVerse[];
}

async function getData(translationId: string, bookId: number, chapter: number): Promise<Data> {
  const [translation, book, verses] = await Promise.all([
    api.getTranslation(translationId),
    api.getBook(translationId, bookId),
    api.getVerses(translationId, bookId, chapter),
  ]);
  return {
    translation,
    book,
    verses,
  };
}

export interface BibleHistory {
  url: string;
  book: {
    id: number;
    name: string;
  };
  chapter: number;
  firstVerse: string;
  translation: string;
  translationId: string;
}

export default function ChapterPage({ params: { version, book: bookId, chapter, verse } }: ChapterProps) {
  const pathname = usePathname();
  const [{ translation, book, verses }, setData] = useState<Data>({} as Data);

  useEffect(() => {
    const history = getBibleHistory();
    if (book && history.url !== pathname) {
      const data: BibleHistory = {
        url: pathname,
        book: {
          id: book.book,
          name: book.name,
        },
        chapter,
        firstVerse: verses[0].text,
        translation: translation.short_name,
        translationId: translation.identifier,
      };
      setBibleHistory(data);
    }
  }, [pathname, book, chapter, verses, translation]);

  useEffect(() => {
    getData(version, bookId, chapter).then((data) => setData(data));
  }, [bookId, chapter, version]);

  useEffect(() => {
    if (verses?.length && verse) {
      const num = decodeURIComponent(verse).split(",")[0].split("-")[0];
      document.querySelector(`#verse-${num}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [verses, verse]);

  if (!book) {
    return (
      <>
        <Skeleton className="w-1/2 h-10 mb-8 bg-highlight" />
        {repeat(10, (i) => {
          return (
            <div key={i}>
              <Skeleton className="mt-2 h-28 bg-highlight" />
              <Skeleton className="w-2/3 h-7 bg-highlight" />
            </div>
          );
        })}
      </>
    );
  }

  const isVerseInInterval = (verse: number, interval?: string): boolean => {
    if (!interval) {
      return false;
    }

    const ranges = decodeURIComponent(interval)
      .split(",")
      .map((range) => range.trim());

    for (const range of ranges) {
      if (range.includes("-")) {
        const [start, end] = range.split("-").map(Number);
        if (verse >= start && verse <= end) {
          return true;
        }
      } else {
        const singleNum = Number(range);
        if (verse == singleNum) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <ChapterProvider>
      <h1 className={cn("text-3xl pb-8", translation.dir ? "text-right" : "")}>
        {book.name} {chapter}
      </h1>
      <div className="pb-40 md:pb-4" dir={translation.dir}>
        {verses.map((data, i) => (
          <VerseAction
            data={data}
            className={isVerseInInterval(data.verse, verse) ? "[&[data-verse]]:font-bold" : ""}
            key={i}
          />
        ))}
      </div>
      <VerseDrawer book={book} chapter={chapter} />
      <CommentDrawer book={book} chapter={chapter} />
    </ChapterProvider>
  );
}
