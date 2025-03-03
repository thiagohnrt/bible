import * as utils from "@/lib/utils";
import { api, Book, Translation, Verse } from "@/services/api";
import { useEffect, useLayoutEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import VerseAction from "./VerseAction";
import { cn } from "@/lib/shad";

interface Props {
  version: string;
  book: Book;
  chapter: number;
  inComparisonMode: boolean;
  data?: {
    translation: Translation;
    verses: Verse[];
  };
  onReady?: (translation: Translation, verses: Verse[]) => void;
}

interface Data {
  translation: Translation;
  verses: Verse[];
}

export function VersesOfChapter({ version, book, chapter, data, inComparisonMode, onReady }: Props) {
  const [{ verses, translation }, setData] = useState<Data>({ verses: [], translation: {} as Translation });

  useEffect(() => {
    if (data) {
      setData(data);
      return;
    }
    Promise.all([api.getTranslation(version), api.getVerses(version, book.book, chapter)]).then(
      ([translation, verses]) => setData({ translation, verses })
    );
  }, [book, chapter, data, version]);

  useLayoutEffect(() => {
    if (translation.identifier && verses?.length) {
      onReady?.(translation, verses);
    }
  }, [verses, onReady, translation]);

  return (
    <div className={cn("pb-40 md:pb-4 flex-1")} dir={translation.dir}>
      {verses.length === 0 ? (
        <>
          <Skeleton className="w-1/2 h-10 mb-8 bg-highlight" />
          {utils.repeat(10, (i) => {
            return (
              <div key={i}>
                <Skeleton className="mt-2 h-28 bg-highlight" />
                <Skeleton className="w-2/3 h-7 bg-highlight" />
              </div>
            );
          })}
        </>
      ) : (
        <div className={cn("pb-4", !inComparisonMode && "hidden")}>{translation.full_name}</div>
      )}
      {verses.map((data) => (
        <VerseAction book={book} chapter={chapter} data={data} key={data.verse} />
      ))}
    </div>
  );
}
