"use client";

import { BibleHistory } from "@/app/bible/[version]/[book]/[chapter]/page";
import { getBibleHistory } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ContinueReading } from "./ContinueReading";
import { SuggestedReading } from "./SuggestedReading";

interface Props {
  className?: string;
}

export function DecisionReading({ className }: Props) {
  const [bibleHistory, setBibleHistory] = useState<BibleHistory>({ url: "nothing" } as BibleHistory);

  useEffect(() => {
    setBibleHistory(getBibleHistory());
  }, []);

  if (bibleHistory.url === "nothing") {
    return <div className="rounded-md bg-highlight h-[140px]"></div>;
  } else if (!bibleHistory.url) {
    return <SuggestedReading className={className}></SuggestedReading>;
  } else {
    return <ContinueReading history={bibleHistory} className={className}></ContinueReading>;
  }
}
