import * as utils from "@/lib/utils";
import { api, Book, Story, Translation, Verse } from "@/services/api";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
    stories: Story[];
  };
  onReady?: (translation: Translation, verses: Verse[]) => void;
}

interface Data {
  translation: Translation;
  verses: Verse[];
  stories: Story[];
}

export function VersesOfChapter({ version, book, chapter, data, inComparisonMode, onReady }: Props) {
  const [{ translation, verses, stories }, setData] = useState<Data>({
    translation: {} as Translation,
    verses: [],
    stories: [],
  });

  useEffect(() => {
    if (data) {
      setData(data);
      return;
    }
    Promise.all([
      api.getTranslation(version),
      api.getVerses(version, book.book, chapter),
      api.getStoriesByChapter(version, book.book, chapter),
    ]).then(([translation, verses, stories]) => setData({ translation, verses, stories }));
  }, [book, chapter, data, version]);

  useLayoutEffect(() => {
    if (translation.identifier && verses?.length) {
      onReady?.(translation, verses);
    }
  }, [verses, onReady, translation]);

  const getStoriesByVerse = (verse: Verse, stories: Story[]): Story[] => {
    return stories
      .filter((story) => story.verse === verse.verse)
      .toSorted((a, b) => a.order_if_several - b.order_if_several);
  };

  return (
    <div className={cn("pb-40 md:pb-4 flex-1")} dir={translation.dir}>
      {verses.length === 0 ? (
        <>
          <Skeleton className="w-1/2 h-10 mb-8 bg-highlight" />
          {utils.repeat(10, (i) => {
            return (
              <div key={`skltn-voc-${i}`}>
                <Skeleton className="mt-2 h-28 bg-highlight" />
                <Skeleton className="w-2/3 h-7 bg-highlight" />
              </div>
            );
          })}
        </>
      ) : (
        <div className={cn("pb-4", !inComparisonMode && "hidden")}>{translation.full_name}</div>
      )}
      {verses.map((data) => {
        return (
          <React.Fragment key={`verse-action-${data.verse}`}>
            {getStoriesByVerse(data, stories).map((story, i) => {
              return (
                <div
                  key={`story-${story.verse}-${story.order_if_several}`}
                  className={cn(
                    "verse-story text-xl font-bold pb-2",
                    i === 0 && data.verse > 1 ? "pt-5" : "",
                    "[&>x]:text-base [&>x]:font-normal [&>x]:italic"
                  )}
                  dangerouslySetInnerHTML={{ __html: story.title }}
                ></div>
              );
            })}
            <VerseAction book={book} chapter={chapter} data={data} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
