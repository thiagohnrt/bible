"use client";

import { cn } from "@/lib/shad";
import { ChapterContext } from "@/providers/chapterProvider";
import { Verse as IVerse } from "@/services/api";
import { Merriweather } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { TfiCommentAlt } from "react-icons/tfi";
import Verse from "./Verse";

const font = Merriweather({ subsets: ["latin"], weight: "300" });

interface VerseProps {
  data: IVerse;
  className?: string;
}

export default function VerseAction({ data, className }: VerseProps) {
  const { verses, setVerses, setVerseComment } = useContext(ChapterContext);
  const [isSelected, setIsSelected] = useState(false);
  const { verse, text, comment } = data;

  const handleVerseSelection = () => {
    setIsSelected((isSelected) => !isSelected);
    document.querySelector("#chapter-container")?.classList.remove("highlight-verse");
  };

  useEffect(() => {
    setVerses((verses) => {
      if (isSelected) {
        verses.push(data);
        verses.sort((a, b) => a.verse - b.verse);
      } else {
        const index = verses.findIndex((verse) => verse.verse === data.verse);
        verses.splice(index, 1);
      }
      return [...verses];
    });
  }, [data, isSelected, setVerses]);

  useEffect(() => {
    if (!verses.length) {
      setIsSelected(false);
    }
  }, [verses]);

  return (
    <div className="flex gap-2 justify-between">
      <Verse
        number={verse}
        text={text}
        className={cn(
          className,
          "cursor-pointer flex-auto",
          isSelected ? "underline decoration-dashed decoration-1 underline-offset-4" : ""
        )}
        onClick={handleVerseSelection}
      />
      <div className="flex flex-grow-0 flex-shrink-0 basis-8">
        {comment ? (
          <div className="flex justify-center flex-1 pt-3 cursor-pointer" onClick={() => setVerseComment(data)}>
            <TfiCommentAlt size={12} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
