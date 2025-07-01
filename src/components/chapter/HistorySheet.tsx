"use client";

import { ChapterRead } from "@/app/bible/[version]/[book]/[chapter]/page";
import { bibleUtils } from "@/lib/bibleUtils";
import { cn } from "@/lib/shad";
import { getBibleHistory } from "@/lib/utils";
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
        <div className="flex-1 px-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {Object.entries(groupedHistory).map(([label, items]) => (
              <div key={label}>
                <div className="text-sm font-bold">{label}</div>
                {items.map((history, index) => (
                  <Link
                    href={`/bible/${history.translationId}/${history.book.id}/${history.chapter}`}
                    key={index}
                    className="block py-1 hover:underline"
                  >
                    {history.book.name} {history.chapter}
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
