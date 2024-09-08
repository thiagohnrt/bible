"use client";

import { cn, getBibleHistory } from "@/lib/utils";
import Verse from "../chapter/Verse";
import { BibleHistory } from "@/app/bible/[version]/[book]/[chapter]/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SuggestedReading } from "./SuggestedReading";
import { ContinueReading } from "./ContinueReading";

interface Props {
  className?: string;
}

export function DecisionReading({ className }: Props) {
  const [bibleHistory, setBibleHistory] = useState<BibleHistory>({ url: "nothing" } as BibleHistory);

  useEffect(() => {
    setBibleHistory(getBibleHistory());
  }, []);

  if (bibleHistory.url === "nothing") {
    return <></>;
  } else if (!bibleHistory.url) {
    return <SuggestedReading className={className}></SuggestedReading>;
  } else {
    return <ContinueReading history={bibleHistory} className={className}></ContinueReading>;
  }
}
