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

  const randomImage = (max: number): string => {
    const currentDate = new Date();
    const dayOfYear =
      (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
        Date.UTC(currentDate.getFullYear(), 0, 0)) /
      86400000;
    return `/img/verseOfDay/${(dayOfYear % max) + 1}.jpg`;
  };

  if (!verse) {
    return <></>;
  }

  return (
    <div className={className}>
      <h1 className="text-lg font-bold mb-2">Versículo do dia</h1>
      <div
        className={cn(
          "flex flex-col justify-center gap-4 text-center text-white py-6 px-8 min-h-80 rounded-lg",
          "bg-center bg-cover bg-blend-saturation"
        )}
        style={{
          backgroundImage: `linear-gradient(black, black), url(${randomImage(5)})`,
          textShadow: "1px 1px 5px #000",
        }}
      >
        <Verse className="pb-2 text-base leading-9" text={verse.text} />
        <div className="text-sm">Hebreus 4:12 </div>
      </div>
    </div>
  );
}
