"use client";

import { ChapterRead } from "@/app/bible/[version]/[book]/[chapter]/page";
import { bibleUtils } from "@/lib/bibleUtils";
import { cn } from "@/lib/shad";
import { Verse as IVerse } from "@/services/api";
import Link from "next/link";
import { IoIosArrowDropright } from "react-icons/io";
import Verse from "../chapter/Verse";

interface Props {
  history: ChapterRead;
  className?: string;
}

export function ContinueReading({ history: bibleHistory, className }: Props) {
  const verseText = bibleHistory.verse?.text ?? JSON.parse(JSON.stringify(bibleHistory)).firstVerse;
  return (
    <Link href={bibleHistory.url} className={cn("block rounded-md p-4 bg-highlight-active", className)}>
      <div className="flex items-center gap-2">
        <p>Continue a leitura</p>
        <IoIosArrowDropright />
      </div>
      <div className="pt-4">
        <p className="text-lg font-medium pb-3">
          {bibleHistory.book.name} {bibleHistory.chapter}:{bibleHistory.verse?.verse ?? 1} {bibleHistory.translation}
        </p>
        <Verse
          text={bibleUtils.versesToString([{ text: verseText } as IVerse], { withNumb: false })}
          formatting="text"
          classNameVerse="line-clamp-2 text-base leading-7"
        />
      </div>
    </Link>
  );
}
