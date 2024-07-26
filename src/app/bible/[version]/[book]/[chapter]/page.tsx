"use client";

import { api, Book, Translation, Verse as IVerse } from "@/services/api";
import { ChapterProps } from "./layout";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Verse from "@/components/chapter/Verse";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function ChapterPage({ params: { version, book: bookId, chapter } }: ChapterProps) {
  const [{ translation, book, verses }, setData] = useState<Data>({} as Data);

  useEffect(() => {
    getData(version, bookId, chapter).then((data) => setData(data));
  }, [bookId, chapter, version]);

  if (!book) {
    return (
      <>
        <Skeleton className="w-1/2 h-10" />
        <Skeleton className="h-svh mt-10" />
      </>
    );
  }

  return (
    <>
      <h1 className={cn("text-3xl pb-8", translation.dir ? "text-right" : "")}>
        {book.name} {chapter}
      </h1>
      <div className="pb-20" dir={translation.dir}>
        {verses.map((verse, i) => (
          <Verse number={verse.verse} text={verse.text} key={i} />
        ))}
      </div>
    </>
  );
}
