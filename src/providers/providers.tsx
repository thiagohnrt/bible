import { ReactNode } from "react";
import { BibleProvider } from "./bibleProvider";
import { DialogProvider } from "./dialogProvider";
import { ThemeProvider } from "./themeProvider";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <BibleProvider>
        <DialogProvider>{children}</DialogProvider>
      </BibleProvider>
    </ThemeProvider>
  );
}
