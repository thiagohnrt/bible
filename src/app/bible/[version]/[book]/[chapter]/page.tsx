"use client";

import { CommentDrawer } from "@/components/chapter/CommentDrawer";
import { VerseDrawer } from "@/components/chapter/VerseDrawer";
import { VersesOfChapter } from "@/components/chapter/VersesOfChapter";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, repeat } from "@/lib/utils";
import { ChapterProvider } from "@/providers/chapterProvider";
import { api, Book, Translation } from "@/services/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChapterProps } from "./layout";

interface Data {
  translation: Translation;
  book: Book;
}

async function getData(translationId: string, bookId: number, chapter: number): Promise<Data> {
  const [translation, book] = await Promise.all([
    api.getTranslation(translationId),
    api.getBook(translationId, bookId),
  ]);
  return {
    translation,
    book,
  };
}

export interface BibleHistory {
  url: string;
  book: {
    id: number;
    name: string;
  };
  chapter: number;
  verse: {
    verse: number;
    text: string;
  };
  translation: string;
  translationId: string;
}

export default function ChapterPage({ params: { version, book: bookId, chapter, verse } }: ChapterProps) {
  const [{ translation, book }, setData] = useState<Data>({} as Data);
  const searchParams = useSearchParams();
  const versions = searchParams.get("parallel")?.split(" ") || [];
  versions.unshift(version);

  useEffect(() => {
    getData(version, bookId, chapter).then((data) => setData(data));
  }, [bookId, chapter, version]);

  useEffect(() => {
    if (book) {
      document.title = `${book.name} ${chapter} - ${translation.short_name} | BibleHonor`;
    }
  }, [book, chapter, translation]);

  if (!book) {
    return (
      <>
        <Skeleton className="w-1/2 h-10 mb-8 bg-highlight" />
        <div className="flex gap-4">
          {repeat(versions.length, (i) => (
            <div className="flex-1" key={i}>
              {repeat(10, (i) => {
                return (
                  <div key={i}>
                    <Skeleton className="mt-2 h-28 bg-highlight" />
                    <Skeleton className="w-2/3 h-7 bg-highlight" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <ChapterProvider>
      <h1 className={cn("text-3xl pb-8", translation.dir ? "text-right" : "")}>
        {book.name} {chapter}
      </h1>
      <div className="flex gap-4">
        {versions.map((v, i) => (
          <VersesOfChapter
            version={v}
            book={book}
            chapter={chapter}
            verse={verse}
            isVersionParallel={i > 0}
            showTranslation={versions.length > 1}
            key={i}
          />
        ))}
      </div>
      <VerseDrawer book={book} chapter={chapter} />
      <CommentDrawer book={book} chapter={chapter} />
    </ChapterProvider>
  );
}
