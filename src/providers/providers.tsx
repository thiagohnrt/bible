import { ReactNode } from "react";
import { BibleProvider } from "./bibleProvider";
import { ThemeProvider } from "./themeProvider";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import { RootProvider } from "./rootProvider";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  const { device } = userAgent({ headers: headers() });
  return (
    <RootProvider device={device}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <BibleProvider>{children}</BibleProvider>
      </ThemeProvider>
    </RootProvider>
  );
}
