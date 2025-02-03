"use client";

import { cn } from "@/lib/shad";
import { BibleContext } from "@/providers/bibleProvider";
import { api, Book, Verse as IVerse } from "@/services/api";
import { Merriweather } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import Verse from "../chapter/Verse";
import { bibleUtils } from "@/lib/bibleUtils";
import { getVerseOfTheDay } from "@/services/verseOfTheDay";

const font = Merriweather({ subsets: ["latin"], weight: "400" });

interface Props {
  className?: string;
}

export function VerseOfTheDayText({ className }: Props) {
  const { translation } = useContext(BibleContext);
  const [data, setData] = useState<{ book: Book; chapter: number; verses: IVerse[] } | null>(null);

  useEffect(() => {
    if (translation) {
      (async () => {
        const {
          verse: { bookId, chapter, verses },
        } = await getVerseOfTheDay();
        const [book, versesArr] = await Promise.all([
          api.getBook(translation.identifier, bookId),
          Promise.all(verses.map((verse) => api.getVerse(translation.identifier, bookId, chapter, verse))),
        ]);

        setData({ book, chapter, verses: versesArr.map((v) => ({ ...v, text: bibleUtils.versesToString([v]) })) });
      })();
    }
  }, [translation]);

  return (
    <div
      className={cn("transition-opacity text-white", data ? "opacity-100" : "opacity-0", className)}
      style={{ zIndex: 2 }}
    >
      {data?.verses.map((item, i) => {
        return <Verse text={item.text} key={item.verse} className="votd-verse inline" />;
      })}
      <div className="votd-book mt-4">
        {data && bibleUtils.formatVerseAddress(data?.book, data?.chapter, data?.verses, translation!)}
      </div>
    </div>
  );
}
