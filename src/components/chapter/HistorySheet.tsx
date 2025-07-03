"use client";

import { ChapterRead } from "@/app/bible/[version]/[book]/[chapter]/page";
import { bibleUtils } from "@/lib/bibleUtils";
import { verseFont } from "@/lib/fonts";
import { cn } from "@/lib/shad";
import { getBibleHistory } from "@/lib/utils";
import { Verse as IVerse } from "@/services/api";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MdHistory } from "react-icons/md";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

export function HistorySheet({ className }: { className?: string }) {
  const [bibleHistory, setBibleHistory] = useState<ChapterRead[]>([]);

  // Agrupa por data formatada
  const groupedHistory = useMemo(() => {
    const groups: { [label: string]: ChapterRead[] } = {};
    bibleHistory.forEach((history) => {
      const label = bibleUtils.formatHistoryDate(history.date);
      if (!groups[label]) groups[label] = [];
      groups[label].push(history);
    });
    return groups;
  }, [bibleHistory]);

  return (
    <Sheet onOpenChange={() => setBibleHistory(getBibleHistory().reverse())}>
      <SheetTrigger asChild>
        <div
          title="Histórico de leitura"
          className={cn("fixed h-14 w-14 z-10 cursor-pointer", "transition-all duration-500", className)}
        >
          <div
            className={cn(
              "flex h-full w-full rounded-full items-center justify-center bg-highlight-active shadow-sm shadow-black "
            )}
          >
            <MdHistory size={24} />
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="h-full flex flex-col">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>Histórico de leitura</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex-1 px-0 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {Object.entries(groupedHistory).map(([label, items]) => (
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
