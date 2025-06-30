"use client";

import { VerseDrawer } from "@/components/chapter/VerseDrawer";
import { VersesOfChapter } from "@/components/chapter/VersesOfChapter";
import { Skeleton } from "@/components/ui/skeleton";
import * as bolls from "@/custom/bolls";
import * as utils from "@/lib/utils";
import { ChapterContext } from "@/providers/chapterProvider";
import { Translation, Verse } from "@/services/api";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { ChapterProps } from "./layout";

export interface ChapterRead {
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
  date?: string;
}

export default function ChapterPage({ params: { verse } }: Readonly<ChapterProps>) {
  const { data } = useContext(ChapterContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onFocusVerse = useCallback(
    (verses: Verse[]) => {
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
    },
    [verse]
  );

  const onSaveHistory = useCallback(
    (translation: Translation, verses: Verse[]) => {
      const lastChapter = utils.getLastChapterRead();
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
      if (lastChapter.url === url || !data.length) return;

      let numVerse: number = +decodeURIComponent(verse ?? "")
        .split(",")[0]
        .split("-")[0];
      if (numVerse <= 0) {
        numVerse = 1;
      }

      const history: ChapterRead = {
        url: url,
        book: {
          id: data[0].book.book,
          name: data[0].book.name,
        },
        chapter: data[0].chapter,
        verse: {
          verse: numVerse,
          text: verses[numVerse - 1].text,
        },
        translation: translation.short_name,
        translationId: translation.identifier,
      };
      utils.setBibleHistory(history);
    },
    [data, pathname, searchParams, verse]
  );

  useEffect(() => {
    if (data.length > 0) {
      const translation = data[0];
      onFocusVerse(translation.verses);
      onSaveHistory(translation.translation, translation.verses);
    }
  }, [data, onFocusVerse, onSaveHistory]);

  useEffect(() => {
    if (!verse) return;
    const handleScroll = () => {
      if (document.querySelector("#chapter-container")?.classList.contains("highlight-verse")) {
        document.querySelector("#chapter-container")?.classList.remove("highlight-verse");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [verse]);

  useEffect(() => {
    if (data.length) {
      const version = data[0].translation.short_name;
      const book = data[0].book;
      const chapter = data[0].chapter;
      const translation: Translation = { identifier: version, short_name: version, full_name: version };
      document.title = `${book.name} ${chapter} - ${bolls.translation(translation).short_name} | BibleHonor`;
    }
  }, [data]);

  if (!data.length) {
    return (
      <>
        <Skeleton className="w-1/2 h-10 mb-8 bg-highlight" />
        <div className="flex gap-4">
          {utils.repeat((searchParams.get("parallel")?.split(" ") || []).length + 1, (i) => (
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
    <div className="flex gap-4" id="chapter-container">
      {data.map((item, i) => (
        <VersesOfChapter
          translation={item.translation}
          book={item.book}
          chapter={item.chapter}
          verses={item.verses}
          stories={item.stories}
          key={`version-${i}`}
        />
      ))}
      <VerseDrawer />
    </div>
  );
}
