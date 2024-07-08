"use client";

import { BibleContext } from "@/contexts/bibleContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}
export function BibleProvider({ children }: Props) {
  const path = usePathname();

  const getVersion = () => {
    return (path.substring(1).split("/")[1] ?? "nvi").toLowerCase();
  };

  const [version, setVersion] = useState(getVersion());
  return (
    <BibleContext.Provider value={{ version, setVersion }}>
      {children}
    </BibleContext.Provider>
  );
}
