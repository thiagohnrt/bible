"use client";

import { cn } from "@/lib/shad";
import { ChapterContext } from "@/providers/chapterProvider";
import { Verse as IVerse } from "@/services/api";
import { Merriweather } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { TfiCommentAlt } from "react-icons/tfi";
import { CommentDrawer } from "./CommentDrawer";
import Verse from "./Verse";

const font = Merriweather({ subsets: ["latin"], weight: "300" });

interface VerseProps {
  translationId: string;
  verse: IVerse;
  className?: string;
}

export default function VerseAction({ translationId, verse: verseObj, className }: VerseProps) {
  const { data, versesSelected, setVersesSelected } = useContext(ChapterContext);
  const [isSelected, setIsSelected] = useState(false);
  const { verse, text, comment } = verseObj;

  const handleVerseSelection = () => {
    setIsSelected((isSelected) => !isSelected);
    document.querySelector("#chapter-container")?.classList.remove("highlight-verse");
  };

  useEffect(() => {
    setVersesSelected((verses) => {
      if (isSelected) {
        verses.push(verseObj);
        verses.sort((a, b) => a.verse - b.verse);
      } else {
        const index = verses.findIndex((verse) => verse.verse === verseObj.verse);
        verses.splice(index, 1);
      }
      return [...verses];
    });
  }, [verseObj, isSelected, setVersesSelected]);

  useEffect(() => {
    if (!versesSelected.length) {
      setIsSelected(false);
    }
  }, [versesSelected]);

  if (!data.length) {
    return <></>;
  }

  return (
    <div className="flex gap-2 justify-between">
      <Verse
        translationId={translationId}
        number={verse}
        text={text}
        className={cn(
          className,
          "verse cursor-pointer flex-auto",
          isSelected ? "underline decoration-dashed decoration-1 underline-offset-4" : ""
        )}
        onClick={handleVerseSelection}
      />
      <div className="flex flex-grow-0 flex-shrink-0 basis-8">
        {comment ? (
          <CommentDrawer translationId={translationId} book={data[0].book} chapter={data[0].chapter} verse={verseObj}>
            <div className="verse-comment flex justify-center flex-1 pt-3 cursor-pointer">
              <TfiCommentAlt size={12} />
            </div>
          </CommentDrawer>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
