"use client";

import { Container } from "@/components/root/Container";
import { bibleUtils } from "@/lib/bibleUtils";
import { verseFont } from "@/lib/fonts";
import { cn } from "@/lib/shad";
import { getBibleHistory } from "@/lib/utils";
import { Verse as IVerse } from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChapterRead } from "../bible/[version]/[book]/[chapter]/page";

export default function HistoryPage() {
  const [bibleHistory, setBibleHistory] = useState<{ [label: string]: ChapterRead[] }>({});

  useEffect(() => {
    const bibleHistory = getBibleHistory().reverse();
    const groups: { [label: string]: ChapterRead[] } = {};
    bibleHistory.forEach((history) => {
      const label = bibleUtils.formatHistoryDate(history.date);
      if (!groups[label]) groups[label] = [];
      groups[label].push(history);
    });
    setBibleHistory(groups);
  }, []);

  return (
    <Container className="flex flex-col px-0">
      <h1 className="text-2xl font-bold mb-4 px-6">Histórico de Leitura</h1>
      <div className="flex flex-col gap-2">
        {Object.entries(bibleHistory).map(([label, items]) => (
          <div key={label} className="pb-4 px-3">
            <div className="text-sm font-bold px-3">{label}</div>
            {items.map((item, index) => (
              <Link
                href={`/bible/${item.translationId}/${item.book.id}/${item.chapter}${
                  item.verse?.verse ? `/${item.verse.verse}` : ""
                }`}
                key={index}
                className="flex items-center leading-10 px-3 rounded-md active:bg-neutral-200 hover:bg-neutral-200 dark:active:bg-neutral-800 dark:hover:bg-neutral-800 transition-colors"
              >
                <span className="whitespace-nowrap">
                  {item.book.name} {item.chapter}:{item.verse?.verse ?? 1} {item.translation}
                </span>
                <span
                  className={cn(
                    "opacity-50 ml-2 align-middle overflow-hidden text-ellipsis whitespace-nowrap flex-1",
                    verseFont.className
                  )}
                >
                  {" - "}
                  {bibleUtils.versesToString([{ text: item.verse.text } as IVerse], { withNumb: false })}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
}
