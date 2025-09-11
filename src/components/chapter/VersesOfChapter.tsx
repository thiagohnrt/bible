import { cn } from "@/lib/shad";
import { ChapterContext } from "@/providers/chapterProvider";
import { Book, Story, Translation, Verse } from "@/services/api";
import React, { useContext } from "react";
import VerseAction from "./VerseAction";

interface Props {
  translation: Translation;
  book: Book;
  chapter: number;
  verses: Verse[];
  stories: Story[];
}

export function VersesOfChapter({ translation, book, chapter, verses, stories }: Props) {
  const { data } = useContext(ChapterContext);
  const getStoriesByVerse = (verse: Verse, stories: Story[]): Story[] => {
    return stories
      .filter((story) => story.verse === verse.verse)
      .toSorted((a, b) => a.order_if_several - b.order_if_several);
  };

  if (!data.length) return <>Carregando...</>;

  return (
    <div className={cn("pb-40 md:pb-4 flex-1")} dir={translation.dir}>
      <div className="flex pb-8">
        <h1 className={cn("flex-1 text-3xl ", translation.dir ? "text-right" : "")}>
          {book.name} {chapter}
        </h1>
      </div>
      <div className={cn("pb-4", data.length <= 1 && "hidden")}>{translation.full_name}</div>
      {verses.map((verse) => {
        return (
          <React.Fragment key={`verse-action-${verse.verse}`}>
            {getStoriesByVerse(verse, stories).map((story, i) => {
              return (
                <div
                  id={`story-${story.verse}-${story.order_if_several}`}
                  key={`story-${story.verse}-${story.order_if_several}`}
                  className={cn(
                    "verse-story text-lg font-bold pb-2",
                    i === 0 && verse.verse > 1 ? "pt-5" : "",
                    "[&>i]:text-base [&>i]:font-normal [&>i]:italic"
                  )}
                  dangerouslySetInnerHTML={{ __html: story.title }}
                ></div>
              );
            })}
            <VerseAction translationId={translation.identifier} verse={verse} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
