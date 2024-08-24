"use client";

import { cn } from "@/lib/utils";
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
  const { verses, setVerses } = useContext(ChapterContext);
  const [isSelected, setSelected] = useState(false);
  const { verse, text, comment } = data;

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
      setSelected(false);
    }
  }, [verses]);

  return (
    <div className="flex justify-between">
      <Verse
        number={verse}
        text={text}
        onClick={() => setSelected(!isSelected)}
        className={cn(isSelected ? "underline decoration-dashed decoration-1 underline-offset-4" : "")}
        style={{ width: "calc(100% - 18px)" }}
      />
      {comment ? <TfiCommentAlt size={12} className="mt-3" /> : <></>}
    </div>
  );
}
