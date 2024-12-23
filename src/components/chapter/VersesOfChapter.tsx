import { useEffect, useState } from "react";
import VerseAction from "./VerseAction";
import { api, Book, Translation, Verse } from "@/services/api";
import { Skeleton } from "../ui/skeleton";
import { cn, getBibleHistory, repeat, setBibleHistory } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { BibleHistory } from "@/app/bible/[version]/[book]/[chapter]/page";

interface Props {
  version: string;
  book: Book;
  chapter: number;
  isVersionParallel: boolean;
  showTranslation: boolean;
  verse?: string;
  data?: {
    translation: Translation;
    verses: Verse[];
  };
}

interface Data {
  translation: Translation;
  verses: Verse[];
}

export function VersesOfChapter({ version, book, chapter, verse, data, isVersionParallel, showTranslation }: Props) {
  const [{ verses, translation }, setData] = useState<Data>({ verses: [], translation: {} as Translation });
  const pathname = usePathname();

  useEffect(() => {
    if (data) {
      setData(data);
      return;
    }
    Promise.all([api.getTranslation(version), api.getVerses(version, book.book, chapter)]).then(
      ([translation, verses]) => setData({ translation, verses })
    );
  }, [book, chapter, data, version]);

  useEffect(() => {
    if (!isVersionParallel && verses?.length && verse) {
      const num = decodeURIComponent(verse).split(",")[0].split("-")[0];
      document.querySelector(`#verse-${num}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [verses, verse, isVersionParallel]);

  useEffect(() => {
    const history = getBibleHistory();
    if (!isVersionParallel && book && verses?.length && history.url !== pathname) {
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
  }, [pathname, book, chapter, verses, translation, isVersionParallel]);

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
    <div className="pb-40 md:pb-4 flex-1" dir={translation.dir}>
      {verses.length === 0 ? (
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
      ) : (
        <div className={cn("pb-4", !showTranslation && "hidden")}>{translation.full_name}</div>
      )}
      {verses.map((data, i) => (
        <VerseAction
          data={data}
          className={isVerseInInterval(data.verse, verse) ? "[&[data-verse]]:font-bold" : ""}
          key={i}
        />
      ))}
    </div>
  );
}
