"use client";

import { BibleHistory } from "@/app/bible/[version]/[book]/[chapter]/page";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Verse from "../chapter/Verse";

interface Props {
  history: BibleHistory;
  className?: string;
}

export function ContinueReading({ history: bibleHistory, className }: Props) {
  return (
    <Link href={bibleHistory.url} className={cn("block rounded-md p-4 bg-highlight-active", className)}>
      <div className="flex justify-between">
        <p>Continue a leitura</p>
        <p className="text-sm leading-6 font-bold">Ver mais</p>
      </div>
      <div className="pt-4">
        <p className="text-lg font-bold pb-3">
          {bibleHistory.book.name} {bibleHistory.chapter} {bibleHistory.translation}
        </p>
        <Verse text={bibleHistory.firstVerse} className=" line-clamp-2 text-base leading-7" />
      </div>
    </Link>
  );
}
