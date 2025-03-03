"use client";

import { Verse } from "@/services/api";
import { createContext, ReactNode, Dispatch, SetStateAction, useState, useMemo } from "react";

export const ChapterContext = createContext<{
  verses: Verse[];
  setVerses: Dispatch<SetStateAction<Verse[]>> | (() => void);
}>({
  verses: [],
  setVerses: () => null,
});

export function ChapterProvider({ children }: { children: ReactNode }) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const value = useMemo(() => ({ verses, setVerses }), [verses, setVerses]);
  return <ChapterContext.Provider value={value}>{children}</ChapterContext.Provider>;
}
