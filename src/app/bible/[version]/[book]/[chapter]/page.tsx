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

async function getData(version: string, bookId: number, chapter: number): Promise<Data> {
  const [translation, book, verses] = await Promise.all([
    api.getTranslation(version),
    api.getBook(version, bookId),
    api.getVerses(version, bookId, chapter),
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
}

export default function ChapterPage({ params: { version, book: bookId, chapter } }: ChapterProps) {
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
      };
      setBibleHistory(data);
    }
  }, [pathname, book, chapter, verses, translation]);

  useEffect(() => {
    getData(version, bookId, chapter).then((data) => setData(data));
  }, [bookId, chapter, version]);

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

  return (
    <ChapterProvider>
      <h1 className={cn("text-3xl pb-8", translation.dir ? "text-right" : "")}>
        {book.name} {chapter}
      </h1>
      <div className="pb-20" dir={translation.dir}>
        {verses.map((verse, i) => (
          <VerseAction data={verse} key={i} />
        ))}
      </div>
      <VerseDrawer book={book} chapter={chapter} />
      <CommentDrawer book={book} chapter={chapter} />
    </ChapterProvider>
  );
}
