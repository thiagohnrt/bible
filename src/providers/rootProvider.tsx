"use client";

import { createContext, ReactNode } from "react";

interface RootProps {
  device: {
    model?: string;
    type?: string;
    vendor?: string;
  };
}

interface ProviderProps extends RootProps {
  children: ReactNode;
}

export const RootContext = createContext<RootProps>({
  device: {},
});

export function RootProvider({ children, device }: ProviderProps) {
  return <RootContext.Provider value={{ device }}>{children}</RootContext.Provider>;
}
