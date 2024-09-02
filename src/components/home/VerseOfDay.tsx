"use client";

import { BibleContext } from "@/providers/bibleProvider";
import { api, Verse as IVerse } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import Verse from "../chapter/Verse";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function VerseOfDay({ className }: Props) {
  const { translation } = useContext(BibleContext);
  const [verse, setVerse] = useState<IVerse | null>(null);

  useEffect(() => {
    if (translation) {
      api.getVerse(translation.short_name, 58, 4, 12).then((data) => setVerse(data));
    }
  }, [translation]);

  if (!verse) {
    return <></>;
  }

  return (
    <div className={className}>
      <h1 className="text-lg font-bold mb-2">Versículo do dia</h1>
      <div
        className={cn("flex flex-col gap-4 text-center p-6 rounded-lg", "bg-center bg-cover bg-blend-saturation")}
        style={{
          backgroundImage: "linear-gradient(black, black), url('/img/verseOfDay/1.jpg')",
          textShadow: "1px 1px 5px #000",
        }}
      >
        <Verse className="pb-2 text-base leading-9" text={verse.text} />
        <div className="text-sm">Hebreus 4:12 </div>
      </div>
    </div>
  );
}
