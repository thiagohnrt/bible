"use client";

import { BibleContext } from "@/providers/bibleProvider";
import { api, Verse as IVerse } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import Verse from "../chapter/Verse";

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
      <h1 className="text-lg font-bold">Versículo do dia</h1>
      <div className="text-lg py-4">Hebreus 4:12 - {translation?.short_name}</div>
      <Verse className="pb-2" text={verse.text} />
    </div>
  );
}
