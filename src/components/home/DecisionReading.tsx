"use client";

import { ChapterRead } from "@/app/bible/[version]/[book]/[chapter]/page";
import { cn } from "@/lib/shad";
import { getLastChapterRead } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ContinueReading } from "./ContinueReading";
import { HistoryReading } from "./HistoryReading";
import { SuggestedReading } from "./SuggestedReading";

interface Props {
  className?: string;
}

export function DecisionReading({ className }: Props) {
  const [lastChapterRead, setLastChapterRead] = useState<ChapterRead>({ url: "nothing" } as ChapterRead);

  useEffect(() => {
    setLastChapterRead(getLastChapterRead());
  }, []);

  return (
    <div className={cn(`grid grid-cols-1 sm:grid-cols-2 gap-4`, className)}>
      {lastChapterRead.url === "nothing" ? <Skeleton className="rounded-md h-[140px]"></Skeleton> : <></>}
      {!lastChapterRead.url ? <SuggestedReading></SuggestedReading> : <></>}
      {lastChapterRead.url && lastChapterRead.url !== "nothing" ? (
        <ContinueReading history={lastChapterRead}></ContinueReading>
      ) : (
        <></>
      )}
      <HistoryReading />
    </div>
  );
}
