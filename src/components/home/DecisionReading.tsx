"use client";

import { ChapterRead } from "@/app/bible/[version]/[book]/[chapter]/page";
import { getLastChapterRead } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ContinueReading } from "./ContinueReading";
import { SuggestedReading } from "./SuggestedReading";

interface Props {
  className?: string;
}

export function DecisionReading({ className }: Props) {
  const [lastChapterRead, setLastChapterRead] = useState<ChapterRead>({ url: "nothing" } as ChapterRead);

  useEffect(() => {
    setLastChapterRead(getLastChapterRead());
  }, []);

  if (lastChapterRead.url === "nothing") {
    return <div className="rounded-md bg-highlight h-[140px]"></div>;
  } else if (!lastChapterRead.url) {
    return <SuggestedReading className={className}></SuggestedReading>;
  } else {
    return <ContinueReading history={lastChapterRead} className={className}></ContinueReading>;
  }
}
