"use client";

import { Verse } from "@/services/api";
import { createContext, ReactNode, Dispatch, SetStateAction, useState } from "react";

export const ChapterContext = createContext<{
  verses: Verse[];
  setVerses: Dispatch<SetStateAction<Verse[]>> | (() => void);
  verseComment: Verse | null;
  setVerseComment: Dispatch<SetStateAction<Verse | null>> | (() => void);
}>({
  verses: [],
  setVerses: () => null,
  verseComment: null,
  setVerseComment: () => null,
});

export function ChapterProvider({ children }: { children: ReactNode }) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [verseComment, setVerseComment] = useState<Verse | null>(null);
  return (
    <ChapterContext.Provider value={{ verses, setVerses, verseComment, setVerseComment }}>
      {children}
    </ChapterContext.Provider>
  );
}
