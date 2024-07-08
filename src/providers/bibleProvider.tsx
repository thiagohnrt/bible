"use client";

import { BibleContext } from "@/contexts/bibleContext";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}
export function BibleProvider({ children }: Props) {
  const [version, setVersion] = useState("nvi");
  return (
    <BibleContext.Provider value={{ version, setVersion }}>
      {children}
    </BibleContext.Provider>
  );
}
