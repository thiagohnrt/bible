"use client";

import { CommentDrawer } from "@/components/chapter/CommentDrawer";
import { VerseDrawer } from "@/components/chapter/VerseDrawer";
import { VersesOfChapter } from "@/components/chapter/VersesOfChapter";
import { Skeleton } from "@/components/ui/skeleton";
import * as utils from "@/lib/utils";
import { ChapterProvider } from "@/providers/chapterProvider";
import { api, Book, Translation, Verse } from "@/services/api";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChapterProps } from "./layout";
import { cn } from "@/lib/shad";

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
  const pathname = usePathname();
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

  useEffect(() => {
    if (!verse) return;
    const handleScroll = () => {
      if (document.querySelector("#chapter-container")?.classList.contains("highlight-verse")) {
        document.querySelector("#chapter-container")?.classList.remove("highlight-verse");
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [verse]);

  const onTranslationReady = (translation: Translation, verses: Verse[]) => {
    if (translation.identifier == version) {
      onFocusVerse(verses);
      onSaveHistory(translation, verses);
    }
  };

  const onFocusVerse = (verses: Verse[]) => {
    if (!verse) return;
    const num = decodeURIComponent(verse).split(",")[0].split("-")[0];
    utils.scrollToElement(document.querySelector(`#verse-${num}`)).then(() => {
      const versesToHighlight = verses.filter((v) => utils.isVerseInInterval(v.verse, verse)).map((v) => v.verse);
      versesToHighlight.forEach((v) => {
        document.querySelector(`#verse-${v}`)?.classList.add("verse-to-highlight");
      });

      setTimeout(() => {
        document.querySelector("#chapter-container")?.classList.add("highlight-verse");
      }, 300);
    });
  };

  const onSaveHistory = (translation: Translation, verses: Verse[]) => {
    const history = utils.getBibleHistory();
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    if (history.url === url) return;

    let numVerse: number = +decodeURIComponent(verse ?? "")
      .split(",")[0]
      .split("-")[0];
    if (numVerse <= 0) {
      numVerse = 1;
    }

    const data: BibleHistory = {
      url: url,
      book: {
        id: book.book,
        name: book.name,
      },
      chapter,
      verse: {
        verse: numVerse,
        text: verses[numVerse - 1].text,
      },
      translation: translation.short_name,
      translationId: translation.identifier,
    };
    utils.setBibleHistory(data);
  };

  if (!book) {
    return (
      <>
        <Skeleton className="w-1/2 h-10 mb-8 bg-highlight" />
        <div className="flex gap-4">
          {utils.repeat(versions.length, (i) => (
            <div className="flex-1" key={i}>
              {utils.repeat(10, (i) => {
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
      <div className="flex gap-4" id="chapter-container">
        {versions.map((v) => (
          <VersesOfChapter
            version={v}
            book={book}
            chapter={chapter}
            inComparisonMode={versions.length > 1}
            onReady={onTranslationReady}
            key={v}
          />
        ))}
      </div>
      <VerseDrawer book={book} chapter={chapter} />
      <CommentDrawer book={book} chapter={chapter} />
    </ChapterProvider>
  );
}
