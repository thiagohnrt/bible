"use client";

import { Verse } from "@/services/api";
import { createContext, ReactNode, Dispatch, SetStateAction, useState } from "react";

export const ChapterContext = createContext<{
  verses: Verse[];
  setVerses: Dispatch<SetStateAction<Verse[]>> | (() => void);
}>({
  verses: [],
  setVerses: () => null,
});

export function ChapterProvider({ children }: { children: ReactNode }) {
  const [verses, setVerses] = useState<Verse[]>([]);
  return <ChapterContext.Provider value={{ verses, setVerses }}>{children}</ChapterContext.Provider>;
}
