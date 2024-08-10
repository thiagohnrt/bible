"use client";

import { cn } from "@/lib/utils";
import Verse from "../chapter/Verse";
import { BibleHistory } from "@/app/bible/[version]/[book]/[chapter]/page";
import Link from "next/link";
import { BIBLE_HISTORY } from "@/constants/bible";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
}

export function ContinueReading({ className }: Props) {
  const [bibleHistory, setBibleHistory] = useState<BibleHistory>({} as BibleHistory);

  useEffect(() => {
    setBibleHistory(JSON.parse(localStorage.getItem(BIBLE_HISTORY) ?? "{}"));
  }, []);

  if (!bibleHistory.url) {
    return <></>;
  }

  return (
    <Link
      href={bibleHistory.url}
      className={cn("block bg-secondary/50 rounded-md p-4 active:bg-secondary/70 transition-colors", className)}
    >
      <div className="flex justify-between">
        <p>Continue a leitura</p>
        <p className="text-sm leading-6 font-bold">Ver mais</p>
      </div>
      <div className="pt-4">
        <p className="text-lg font-bold pb-3">
          {bibleHistory.book} {bibleHistory.chapter}
        </p>
        <Verse text={bibleHistory.firstVerse} className=" line-clamp-2 text-base leading-7" />
      </div>
    </Link>
  );
}
