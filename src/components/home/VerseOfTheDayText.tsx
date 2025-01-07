"use client";

import { cn } from "@/lib/shad";
import { BibleContext } from "@/providers/bibleProvider";
import { api, Verse as IVerse } from "@/services/api";
import { Merriweather } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import Verse from "../chapter/Verse";

const font = Merriweather({ subsets: ["latin"], weight: "400" });

interface Props {
  className?: string;
}

export function VerseOfTheDayText({ className }: Props) {
  const { translation } = useContext(BibleContext);
  const [verse, setVerse] = useState<IVerse | null>(null);

  useEffect(() => {
    if (translation) {
      api.getVerse(translation.identifier, 58, 4, 12).then((data) => setVerse(data));
    }
  }, [translation]);

  return (
    <div
      className={cn("transition-opacity text-white", verse ? "opacity-100" : "opacity-0", className)}
      style={{ zIndex: 2 }}
    >
      <Verse className={cn(font.className, "pb-2 leading-6", "votd-verse")} text={verse?.text ?? ""} />
      <div className="votd-book text-sm mt-4">Hebreus 4:12 {translation?.short_name ?? ""}</div>
    </div>
  );
}
