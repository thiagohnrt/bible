"use client";

import { createContext, ReactNode, Dispatch, SetStateAction, useState } from "react";

export const BibleContext = createContext<{
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>> | (() => void);
}>({
  isLoading: false,
  setLoading: () => null,
});

export function BibleProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(false);
  return (
    <BibleContext.Provider value={{ isLoading, setLoading }}>
      {isLoading ? (
        <div className="z-50 bg-background fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center">
          Carregando...
        </div>
      ) : (
        <></>
      )}
      {children}
    </BibleContext.Provider>
  );
}
