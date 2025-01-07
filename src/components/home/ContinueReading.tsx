"use client";

import { BibleHistory } from "@/app/bible/[version]/[book]/[chapter]/page";
import { cn } from "@/lib/shad";
import Link from "next/link";
import { IoIosArrowDropright } from "react-icons/io";
import Verse from "../chapter/Verse";

interface Props {
  history: BibleHistory;
  className?: string;
}

export function ContinueReading({ history: bibleHistory, className }: Props) {
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
          text={bibleHistory.verse?.text ?? JSON.parse(JSON.stringify(bibleHistory)).firstVerse}
          className=" line-clamp-2 text-base leading-7"
        />
      </div>
    </Link>
  );
}
